import { useState, useCallback, useEffect } from "react";
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
 */
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
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
              className="group aspect-square overflow-hidden rounded-md bg-card relative focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={`View ${item.title ?? "photo"}`}
            >
              <img
                src={item.src}
                alt={item.title ?? ""}
                width={600}
                height={600}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors flex items-end p-3">
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
          role="dialog"
          aria-modal="true"
        >
          <button onClick={close} className="absolute top-4 right-4 text-foreground hover:text-primary" aria-label="Close">
            <X className="h-7 w-7" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            className="absolute left-4 text-foreground hover:text-primary"
            aria-label="Previous"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); step(1); }}
            className="absolute right-4 text-foreground hover:text-primary"
            aria-label="Next"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <figure onClick={(e) => e.stopPropagation()} className="max-w-6xl w-full">
            <img
              src={current.large ?? current.src}
              alt={current.title ?? ""}
              className="max-h-[80vh] w-auto mx-auto object-contain rounded"
            />
            {current.title && (
              <figcaption className="text-center text-sm text-muted-foreground mt-3">
                {current.title}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </>
  );
}
