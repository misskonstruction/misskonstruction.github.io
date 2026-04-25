import { useEffect, useRef, useState, useCallback } from "react";
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
  const [groups, setGroups] = useState<CarouselItem[][]>([]);
  const [mounted, setMounted] = useState(false);
  const [lightbox, setLightbox] = useState<{ items: CarouselItem[]; index: number } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const root = containerRef.current;

    // Find all top-level children
    const children = Array.from(root.children) as HTMLElement[];

    const collected: CarouselItem[][] = [];
    let run: { node: HTMLElement; item: CarouselItem }[] = [];

    const flushRun = () => {
      if (run.length >= 2) {
        // Replace the first node with a placeholder marker, remove the rest
        const groupIndex = collected.length;
        const placeholder = document.createElement("div");
        placeholder.setAttribute("data-journal-carousel", String(groupIndex));
        run[0].node.replaceWith(placeholder);
        for (let i = 1; i < run.length; i++) run[i].node.remove();
        collected.push(run.map((r) => r.item));
      }
      run = [];
    };

    const extract = (el: HTMLElement): CarouselItem | null => {
      let img: HTMLImageElement | null = null;
      let caption: string | undefined;
      if (el.tagName === "IMG") {
        img = el as HTMLImageElement;
      } else if (el.tagName === "FIGURE") {
        img = el.querySelector("img");
        const fc = el.querySelector("figcaption");
        if (fc?.textContent) caption = fc.textContent.trim();
      } else if (el.tagName === "P" && el.children.length === 1 && el.firstElementChild?.tagName === "IMG") {
        // <p><img></p> wrapper produced by some editors
        img = el.firstElementChild as HTMLImageElement;
      }
      if (!img || !img.src) return null;
      return { src: img.src, alt: img.alt ?? "", caption };
    };

    for (const child of children) {
      const item = extract(child);
      if (item) {
        run.push({ node: child, item });
      } else {
        flushRun();
      }
    }
    flushRun();

    setGroups(collected);
    setMounted(true);
  }, [html]);

  const openLightbox = useCallback((items: CarouselItem[], index: number) => {
    setLightbox({ items, index });
  }, []);
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

  // Render carousels into placeholder slots after mount
  useEffect(() => {
    if (!containerRef.current) return;
    const placeholders = containerRef.current.querySelectorAll<HTMLElement>("[data-journal-carousel]");
    placeholders.forEach((p) => {
      // mark for React-managed slot rendering via portals would be heavier;
      // instead we build the DOM directly and attach click handlers.
      const idx = Number(p.getAttribute("data-journal-carousel"));
      const items = groups[idx];
      if (!items || p.dataset.rendered === "1") return;
      p.dataset.rendered = "1";

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

      p.appendChild(wrap);
    });
  }, [groups, mounted, openLightbox]);

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
