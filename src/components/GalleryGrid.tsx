import { useState, useCallback, useEffect, useRef } from "react";
import { Plus, X, ChevronLeft, ChevronRight } from "lucide-react";

export type GalleryItem = {
  /** Image URL — leave empty for an empty placeholder slot. */
  src?: string;
  /** Title shown on hover and in lightbox caption. */
  title?: string;
  /** Optional larger version for lightbox (defaults to src). */
  large?: string;
};

/**
 * Renders a fixed 4×4 grid of 16 photo slots with a built-in lightbox.
 * To add a new photo: drop an entry into the `items` array of the gallery
 * route file. Empty slots show a "+ add photo" placeholder you can fill later.
 *
 * `protect` adds casual anti-download deterrents (no right-click, no drag,
 * no long-press save, transparent overlay). It does NOT prevent screenshots.
 */
export function GalleryGrid({ items, protect = false }: { items: GalleryItem[]; protect?: boolean }) {
  const slotCount = Math.max(16, Math.ceil(items.length / 4) * 4);
  const slots: (GalleryItem | null)[] = Array.from({ length: slotCount }, (_, i) => items[i] ?? null);
  const filledIndexes = slots
    .map((s, i) => (s && s.src ? i : -1))
    .filter((i) => i !== -1);

  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      if (active === null) return;
      const pos = filledIndexes.indexOf(active);
      const next = filledIndexes[(pos + dir + filledIndexes.length) % filledIndexes.length];
      setActive(next);
    },
    [active, filledIndexes],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, step]);

  const current = active !== null ? slots[active] : null;

  return (
    <>
      {protect && (
        <p className="mb-4 text-center text-xs text-muted-foreground/80">
          Images are watermarked and protected. Please do not download or reproduce without permission.
        </p>
      )}

      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4"
        onContextMenu={protect ? (e) => e.preventDefault() : undefined}
      >
        {slots.map((item, i) => {
          if (!item || !item.src) {
            return (
              <div
                key={i}
                className="aspect-square rounded-md border border-dashed border-border/60 bg-card/40 flex flex-col items-center justify-center text-muted-foreground/60 text-xs gap-1"
              >
                <Plus className="h-5 w-5" />
                <span>Slot {i + 1}</span>
              </div>
            );
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              onContextMenu={protect ? (e) => e.preventDefault() : undefined}
              className="group aspect-square overflow-hidden rounded-md bg-card relative focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={`View ${item.title ?? "photo"}`}
            >
              {protect ? (
                <div
                  role="img"
                  aria-label={item.title ?? ""}
                  className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${item.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    WebkitUserSelect: "none",
                    userSelect: "none",
                    WebkitTouchCallout: "none",
                  } as React.CSSProperties}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.title ?? ""}
                  width={600}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors flex items-end p-3 pointer-events-none">
                <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity text-foreground">
                  {item.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {current && (
        <div
          className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
          onContextMenu={protect ? (e) => e.preventDefault() : undefined}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
            touchStartY.current = e.touches[0].clientY;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null || touchStartY.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            const dy = e.changedTouches[0].clientY - touchStartY.current;
            touchStartX.current = null;
            touchStartY.current = null;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
              step(dx < 0 ? 1 : -1);
            }
          }}
          role="dialog"
          aria-modal="true"
        >
          <button onClick={close} className="absolute top-4 right-4 z-20 text-foreground hover:text-primary rounded-full bg-background/60 p-2" aria-label="Close">
            <X className="h-6 w-6 md:h-7 md:w-7" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            className="absolute left-2 md:left-4 z-20 text-foreground hover:text-primary rounded-full bg-background/60 p-2"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); step(1); }}
            className="absolute right-2 md:right-4 z-20 text-foreground hover:text-primary rounded-full bg-background/60 p-2"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
          </button>


          <figure onClick={(e) => e.stopPropagation()} className="max-w-6xl w-full relative">
            <div className="relative">
              {protect ? (
                <div
                  role="img"
                  aria-label={current.title ?? ""}
                  className="mx-auto rounded"
                  style={{
                    backgroundImage: `url(${current.large ?? current.src})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "min(100%, 1200px)",
                    height: "80vh",
                    WebkitUserSelect: "none",
                    userSelect: "none",
                    WebkitTouchCallout: "none",
                  } as React.CSSProperties}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              ) : (
                <img
                  src={current.large ?? current.src}
                  alt={current.title ?? ""}
                  className="max-h-[80vh] w-auto mx-auto object-contain rounded"
                />
              )}
            </div>
            {current.title && (
              <figcaption className="text-center text-sm text-muted-foreground mt-3">
                {current.title}
              </figcaption>
            )}
            {protect && (
              <figcaption className="text-center text-xs text-muted-foreground/70 mt-2">
                Images are watermarked and protected. Please do not download or reproduce without permission.
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </>
  );
}
