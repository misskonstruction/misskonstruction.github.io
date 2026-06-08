import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type CarouselItem = { src: string; alt: string; caption?: string };
type LightboxState = { items: CarouselItem[]; index: number };

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
  const closeTimerRef = useRef<number | null>(null);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const openLightbox = useCallback((items: CarouselItem[], index: number) => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
    setLightbox({ items, index });
  }, []);

  const closeLightbox = useCallback(() => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
    setLightbox(null);
  }, []);

  const stepLightbox = useCallback((direction: -1 | 1) => {
    setLightbox((current) => {
      if (!current) return current;
      const nextIndex = current.index + direction;
      if (nextIndex < 0) return current;
      if (nextIndex >= current.items.length) return null;
      return {
        ...current,
        index: nextIndex,
      };
    });
  }, []);

  useEffect(() => {
    if (!lightbox || lightbox.items.length < 2 || lightbox.index !== lightbox.items.length - 1) {
      return;
    }

    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      setLightbox(null);
    }, 1200);

    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    };
  }, [lightbox]);

  useEffect(() => {
    if (!lightbox) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") stepLightbox(-1);
      if (event.key === "ArrowRight") stepLightbox(1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeLightbox, lightbox, stepLightbox]);

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
        const button = document.createElement("button");
        button.type = "button";
        button.className = "journal-carousel-trigger";
        button.setAttribute("aria-label", `Open image ${i + 1} of ${items.length}`);
        button.addEventListener("click", () => openLightbox(items, i));
        const img = document.createElement("img");
        img.src = it.src;
        img.alt = it.alt;
        img.loading = "lazy";
        img.decoding = "async";
        button.appendChild(img);
        fig.appendChild(button);
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
      const galleryImages = child.matches(".wp-block-gallery, .blocks-gallery-grid, .gallery")
        ? Array.from(child.querySelectorAll("img"))
        : [];
      if (galleryImages.length >= 2) {
        flushRun();
        const items = galleryImages.map((img) => ({
          src: img.src,
          alt: img.alt ?? "",
          caption: img.closest("figure")?.querySelector("figcaption")?.textContent?.trim(),
        }));
        child.replaceWith(buildCarousel(items));
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
  }, [html, openLightbox]);

  return (
    <>
      <div
        ref={containerRef}
        className="journal-prose"
        style={{ fontFamily: "var(--font-journal)" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {lightbox ? (
        <div
          className="journal-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged journal photo"
          onClick={closeLightbox}
        >
          <button
            className="journal-lightbox-close"
            type="button"
            aria-label="Close image"
            onClick={closeLightbox}
          >
            ×
          </button>
          {lightbox.index > 0 ? (
            <button
              className="journal-lightbox-nav journal-lightbox-prev"
              type="button"
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation();
                stepLightbox(-1);
              }}
            >
              ‹
            </button>
          ) : null}
          <figure className="journal-lightbox-figure" onClick={(event) => event.stopPropagation()}>
            <img
              src={lightbox.items[lightbox.index].src}
              alt={lightbox.items[lightbox.index].alt}
              decoding="async"
            />
            {lightbox.items[lightbox.index].caption ? (
              <figcaption>{lightbox.items[lightbox.index].caption}</figcaption>
            ) : null}
          </figure>
          {lightbox.items.length > 1 ? (
            <button
              className="journal-lightbox-nav journal-lightbox-next"
              type="button"
              aria-label={
                lightbox.index === lightbox.items.length - 1 ? "Close gallery" : "Next image"
              }
              onClick={(event) => {
                event.stopPropagation();
                stepLightbox(1);
              }}
            >
              ›
            </button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
