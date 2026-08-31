import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type CarouselItem = { src: string; alt: string; caption?: string };

/**
 * Renders WordPress post HTML with the .journal-prose styling, and automatically
 * groups any run of 2+ consecutive images/figures into a side-by-side carousel
 * (preserving the existing soft, feathered journal image style).
 *
 * Authors don't need to do anything special in WordPress — just upload multiple
 * photos in a row and they become a carousel on the site.
 */
export function JournalPostBody({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ items: CarouselItem[]; index: number } | null>(null);

  const openLightbox = useCallback((items: CarouselItem[], index: number) => {
    setLightbox({ items, index });
  }, []);

  // Use a layout effect so mutations happen before paint and we never flash
  // the un-grouped images. Build the carousel DOM directly here too.
  const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
  useIsoLayoutEffect(() => {
    if (!containerRef.current) return;
    const root = containerRef.current;

    // --- 1) Convert bare YouTube/Vimeo URLs into responsive embeds ---
    const getYouTubeId = (url: string): string | null => {
      try {
        const u = new URL(url);
        const host = u.hostname.replace(/^www\./, "");
        if (host === "youtu.be") return u.pathname.slice(1).split("/")[0] || null;
        if (host.endsWith("youtube.com") || host === "youtube-nocookie.com") {
          if (u.pathname === "/watch") return u.searchParams.get("v");
          const m = u.pathname.match(/^\/(embed|shorts|live)\/([^/?#]+)/);
          if (m) return m[2];
        }
        return null;
      } catch {
        return null;
      }
    };

    const buildVideo = (id: string): HTMLElement => {
      const wrap = document.createElement("div");
      wrap.className = "journal-video";
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}`;
      iframe.title = "YouTube video";
      iframe.loading = "lazy";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      wrap.appendChild(iframe);
      return wrap;
    };

    // Replace <p> elements that contain only a YouTube URL (text or single link)
    const paragraphs = Array.from(root.querySelectorAll("p"));
    for (const p of paragraphs) {
      // Skip if it contains an image — leave for the carousel pass below
      if (p.querySelector("img")) continue;
      const text = (p.textContent ?? "").trim();
      let id: string | null = null;
      const onlyLink = p.children.length === 1 && p.firstElementChild?.tagName === "A";
      if (onlyLink) {
        const href = (p.firstElementChild as HTMLAnchorElement).getAttribute("href") ?? "";
        // Treat as embed only if the visible text is also just the URL (or empty)
        const linkText = p.firstElementChild!.textContent?.trim() ?? "";
        if (!linkText || linkText === href) id = getYouTubeId(href);
      } else if (p.children.length === 0) {
        // Bare URL as text
        if (/^https?:\/\/\S+$/.test(text)) id = getYouTubeId(text);
      }
      if (id) p.replaceWith(buildVideo(id));
    }

    // --- 2) Group consecutive images into carousels (existing behavior) ---
    const children = Array.from(root.children) as HTMLElement[];
    const collectedGroups: CarouselItem[][] = [];
    let run: { node: HTMLElement; item: CarouselItem }[] = [];

    const buildCarousel = (items: CarouselItem[]): HTMLElement => {
      const wrap = document.createElement("div");
      wrap.className = "journal-carousel";
      const track = document.createElement("div");
      track.className = "journal-carousel-track";
      wrap.appendChild(track);
      items.forEach((it, i) => {
        const fig = document.createElement("figure");
        fig.className = "journal-carousel-item";
        const img = document.createElement("img");
        img.src = it.src;
        img.alt = it.alt;
        img.loading = "lazy";
        img.decoding = "async";
        img.addEventListener("click", () => openLightbox(items, i));
        fig.appendChild(img);
        if (it.caption) {
          const cap = document.createElement("figcaption");
          cap.textContent = it.caption;
          fig.appendChild(cap);
        }
        track.appendChild(fig);
      });
      return wrap;
    };

    const flushRun = () => {
      if (run.length >= 2) {
        const items = run.map((r) => r.item);
        run[0].node.replaceWith(buildCarousel(items));
        for (let i = 1; i < run.length; i++) run[i].node.remove();
        collectedGroups.push(items);
      }
      run = [];
    };

    const extract = (el: HTMLElement): CarouselItem | null => {
      const images = Array.from(el.querySelectorAll("img"));
      let img: HTMLImageElement | null = null;
      let caption: string | undefined;
      if (el.tagName === "IMG") {
        img = el as HTMLImageElement;
      } else if ((el.tagName === "FIGURE" || el.tagName === "P") && images.length === 1) {
        img = images[0];
        const fc = el.querySelector("figcaption");
        if (fc?.textContent) caption = fc.textContent.trim();
      }
      if (!img || !img.src) return null;
      return { src: img.src, alt: img.alt ?? "", caption };
    };

    for (const child of children) {
      const galleryImages = Array.from(child.querySelectorAll("img"));
      if (galleryImages.length >= 2) {
        flushRun();
        const items = galleryImages.map((img) => ({
          src: img.src,
          alt: img.alt ?? "",
          caption: img.closest("figure")?.querySelector("figcaption")?.textContent?.trim(),
        }));
        child.replaceWith(buildCarousel(items));
        collectedGroups.push(items);
        continue;
      }
      const item = extract(child);
      if (item) {
        run.push({ node: child, item });
      } else {
        flushRun();
      }
    }
    flushRun();

    // --- 3) Tag the last "Update:" section so margin notes can deep-link to it ---
    const blocks = Array.from(
      root.querySelectorAll("h1, h2, h3, h4, h5, h6, p"),
    ) as HTMLElement[];
    const updateHeadings = blocks.filter((el) =>
      /^update:/i.test((el.textContent ?? "").trim()),
    );
    const latest = updateHeadings[updateHeadings.length - 1];
    if (latest) {
      latest.id = "latest-update";
      latest.style.scrollMarginTop = "6rem";
    }
  }, [html, openLightbox]);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const stepLightbox = useCallback((dir: 1 | -1) => {
    setLightbox((lb) => {
      if (!lb) return lb;
      const next = (lb.index + dir + lb.items.length) % lb.items.length;
      return { ...lb, index: next };
    });
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") stepLightbox(1);
      if (e.key === "ArrowLeft") stepLightbox(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, stepLightbox]);

  return (
    <>
      <div
        ref={containerRef}
        className="journal-prose"
        style={{ fontFamily: "var(--font-journal)" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-foreground hover:text-primary"
            aria-label="Close"
          >
            <X className="h-7 w-7" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); stepLightbox(-1); }}
            className="absolute left-4 text-foreground hover:text-primary"
            aria-label="Previous"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); stepLightbox(1); }}
            className="absolute right-4 text-foreground hover:text-primary"
            aria-label="Next"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <figure onClick={(e) => e.stopPropagation()} className="max-w-6xl w-full">
            <img
              src={lightbox.items[lightbox.index].src}
              alt={lightbox.items[lightbox.index].alt}
              className="max-h-[80vh] w-auto mx-auto object-contain rounded"
            />
            {lightbox.items[lightbox.index].caption && (
              <figcaption className="text-center text-sm text-muted-foreground mt-3">
                {lightbox.items[lightbox.index].caption}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </>
  );
}
