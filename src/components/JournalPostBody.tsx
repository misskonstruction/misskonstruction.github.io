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
