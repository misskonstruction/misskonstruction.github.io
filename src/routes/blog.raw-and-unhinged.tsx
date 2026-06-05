import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, X } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import deskScene from "@/assets/raw-unhinged/desk-scene.jpg";
import paperTexture from "@/assets/raw-unhinged/paper-texture.jpg";
import {
  rawUnhingedEntries,
  formatEntryDate,
  formatEntryDateShort,
  type RawUnhingedEntry,
} from "@/data/rawUnhingedEntries";

export const Route = createFileRoute("/blog/raw-and-unhinged")({
  component: RawAndUnhinged,
  head: () => ({
    meta: [
      { title: "Raw & Unhinged — The Journal | MissKonstruction" },
      {
        name: "description",
        content:
          "Handwritten pages from my desk. Unfiltered, ink-on-paper journaling — photos of the real thing.",
      },
      { property: "og:title", content: "Raw & Unhinged — The Journal" },
      {
        property: "og:description",
        content:
          "Handwritten pages from my desk. Unfiltered, ink-on-paper journaling — photos of the real thing.",
      },
      { property: "og:image", content: deskScene },
      { name: "twitter:image", content: deskScene },
    ],
  }),
});

/* -------------------------------------------------------------------------- */
/* Spread model                                                                */
/* -------------------------------------------------------------------------- */

type Spread =
  | { kind: "toc"; entries: RawUnhingedEntry[] }
  | { kind: "entry"; entry: RawUnhingedEntry; pageOfEntry: number; totalPagesInEntry: number }
  | { kind: "final-photos"; entry: RawUnhingedEntry };

/**
 * Build the full list of spreads. The book opens to the TOC, then each entry
 * gets one spread per entry image (entry photo on the left, right-page photos
 * on the right). If an entry has finalPagePhotos, an extra spread follows.
 */
function buildSpreads(entries: RawUnhingedEntry[]): Spread[] {
  const spreads: Spread[] = [{ kind: "toc", entries }];
  for (const e of entries) {
    const total = e.entryImages.length;
    e.entryImages.forEach((_, i) => {
      spreads.push({ kind: "entry", entry: e, pageOfEntry: i, totalPagesInEntry: total });
    });
    if (e.finalPagePhotos && e.finalPagePhotos.length > 0) {
      spreads.push({ kind: "final-photos", entry: e });
    }
  }
  return spreads;
}

/** Index of the first spread for a given entry id. */
function spreadIndexForEntry(spreads: Spread[], entryId: string): number {
  return spreads.findIndex((s) => s.kind === "entry" && s.entry.id === entryId);
}

/* -------------------------------------------------------------------------- */
/* Route component                                                             */
/* -------------------------------------------------------------------------- */

function RawAndUnhinged() {
  const [open, setOpen] = useState(false);

  return (
    <SiteLayout>
      <style>{rawUnhingedStyles}</style>
      <section className="relative ru-stage">
        {/* Back to journal link */}
        <Link
          to="/blog"
          className="absolute top-4 left-4 z-30 inline-flex items-center gap-2 text-amber-100/80 hover:text-amber-100 transition-colors text-sm"
          style={{ fontFamily: "var(--font-journal)" }}
        >
          <ArrowLeft className="h-4 w-4" />
          The Journal
        </Link>

        {/* Title overlay */}
        <div className="absolute top-4 right-4 z-30 text-right">
          <p className="text-amber-200/90 text-2xl md:text-3xl leading-none" style={{ fontFamily: "var(--font-hand)" }}>
            ink on paper —
          </p>
          <h1
            className="text-amber-50 text-3xl md:text-5xl mt-1"
            style={{ fontFamily: "var(--font-journal)", fontWeight: 400 }}
          >
            <em className="text-amber-300">Raw &amp; Unhinged</em>
          </h1>
        </div>

        {/* Desk scene */}
        <div className="relative w-full ru-scene">
          <img
            src={deskScene}
            alt="Overhead view of a writer's desk at evening with a rose-leather journal, candle, tea, fountain pen, vintage camera, sleeping ginger cat, plant, and an ocean sunset through a window"
            className="block w-full h-auto"
            width={1536}
            height={1024}
          />

          {/* Animated candle flame, positioned over the wick */}
          <CandleFlame />

          {/* Clickable journal hot-spot, sized & positioned over the journal */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open the journal"
            className="ru-journal-hotspot group"
          >
            <span className="ru-journal-glow" aria-hidden="true" />
            <span className="ru-journal-hint" style={{ fontFamily: "var(--font-hand)" }}>
              <BookOpen className="h-4 w-4 inline-block mr-1.5" />
              click to open
            </span>
          </button>
        </div>

        {/* Soft caption under the scene */}
        <div className="container mx-auto px-4 py-8 md:py-10 text-center">
          <p
            className="max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
          >
            What you see here is exactly what I wrote — photographed straight from the page.
            Click the journal to turn through it.
          </p>
        </div>
      </section>

      {open && <BookOverlay onClose={() => setOpen(false)} />}
    </SiteLayout>
  );
}

/* -------------------------------------------------------------------------- */
/* Candle flame                                                                */
/* -------------------------------------------------------------------------- */

function CandleFlame() {
  return (
    <div className="ru-flame" aria-hidden="true">
      <div className="ru-flame-halo" />
      <svg viewBox="0 0 40 70" width="40" height="70" className="ru-flame-svg">
        <defs>
          <radialGradient id="ruFlameGrad" cx="50%" cy="65%" r="55%">
            <stop offset="0%" stopColor="#fff8d6" />
            <stop offset="35%" stopColor="#ffd47a" />
            <stop offset="70%" stopColor="#f59a2a" />
            <stop offset="100%" stopColor="#9a3a05" stopOpacity="0.6" />
          </radialGradient>
          <radialGradient id="ruFlameCore" cx="50%" cy="75%" r="35%">
            <stop offset="0%" stopColor="#7ec8ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7ec8ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          className="ru-flame-outer"
          d="M20 68 C 6 60, 4 38, 20 4 C 36 38, 34 60, 20 68 Z"
          fill="url(#ruFlameGrad)"
        />
        <ellipse className="ru-flame-core" cx="20" cy="56" rx="5" ry="9" fill="url(#ruFlameCore)" />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Book overlay                                                                */
/* -------------------------------------------------------------------------- */

function BookOverlay({ onClose }: { onClose: () => void }) {
  const spreads = useMemo(() => buildSpreads(rawUnhingedEntries), []);
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [flip, setFlip] = useState<{ direction: "next" | "prev"; fromIndex: number } | null>(null);
  const [opened, setOpened] = useState(false);

  // Trigger the cover-open animation on mount
  useEffect(() => {
    const t = window.setTimeout(() => setOpened(true), 50);
    return () => window.clearTimeout(t);
  }, []);

  const total = spreads.length;
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const turn = useCallback(
    (direction: "next" | "prev") => {
      if (flip) return;
      const target = direction === "next" ? spreadIndex + 1 : spreadIndex - 1;
      if (target < 0 || target >= total) return;
      if (reducedMotion) {
        setSpreadIndex(target);
        return;
      }
      setFlip({ direction, fromIndex: spreadIndex });
      window.setTimeout(() => {
        setSpreadIndex(target);
        setFlip(null);
      }, 750);
    },
    [flip, spreadIndex, total, reducedMotion],
  );

  const jumpTo = useCallback(
    (target: number) => {
      if (target === spreadIndex || flip) return;
      if (reducedMotion) {
        setSpreadIndex(target);
        return;
      }
      // Single quick flip in the right direction
      const direction = target > spreadIndex ? "next" : "prev";
      setFlip({ direction, fromIndex: spreadIndex });
      window.setTimeout(() => {
        setSpreadIndex(target);
        setFlip(null);
      }, 750);
    },
    [flip, spreadIndex, reducedMotion],
  );

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") turn("next");
      if (e.key === "ArrowLeft") turn("prev");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, turn]);

  const current = spreads[spreadIndex];
  const nextSpread = spreads[spreadIndex + 1];
  const prevSpread = spreads[spreadIndex - 1];

  return (
    <div
      className="fixed inset-0 z-[80] ru-overlay flex flex-col items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Raw and Unhinged journal"
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-amber-100 hover:text-amber-300 transition-colors"
        aria-label="Close journal"
      >
        <X className="h-7 w-7" />
      </button>

      {/* Page counter */}
      <p
        className="absolute top-5 left-5 z-10 text-amber-100/70 text-sm"
        style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
      >
        spread {spreadIndex + 1} of {total}
      </p>

      {/* Ribbon bookmark / entry jump menu */}
      <RibbonMenu
        spreads={spreads}
        currentIndex={spreadIndex}
        onJump={jumpTo}
      />

      {/* The book */}
      <div className={`ru-book ${opened ? "is-opened" : ""}`}>
        <div className="ru-book-inner">
          {/* Left page (current) */}
          <div className="ru-page ru-page-left">
            <PageContent spread={current} side="left" onJumpToEntry={(id) => jumpTo(spreadIndexForEntry(spreads, id))} />
          </div>
          {/* Right page (current) */}
          <div className="ru-page ru-page-right">
            <PageContent spread={current} side="right" onJumpToEntry={(id) => jumpTo(spreadIndexForEntry(spreads, id))} />
          </div>

          {/* Flipping page (forward = right page flips left) */}
          {flip?.direction === "next" && nextSpread && (
            <div className="ru-flip ru-flip-next">
              <div className="ru-flip-face ru-flip-front">
                <PageContent spread={current} side="right" onJumpToEntry={() => {}} />
              </div>
              <div className="ru-flip-face ru-flip-back">
                <PageContent spread={nextSpread} side="left" onJumpToEntry={() => {}} />
              </div>
            </div>
          )}

          {/* Flipping page (back = left page flips right) */}
          {flip?.direction === "prev" && prevSpread && (
            <div className="ru-flip ru-flip-prev">
              <div className="ru-flip-face ru-flip-front">
                <PageContent spread={current} side="left" onJumpToEntry={() => {}} />
              </div>
              <div className="ru-flip-face ru-flip-back">
                <PageContent spread={prevSpread} side="right" onJumpToEntry={() => {}} />
              </div>
            </div>
          )}

          {/* Page-turn arrows */}
          <button
            type="button"
            className="ru-turn ru-turn-prev"
            onClick={() => turn("prev")}
            disabled={spreadIndex === 0 || !!flip}
            aria-label="Previous page"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="ru-turn ru-turn-next"
            onClick={() => turn("next")}
            disabled={spreadIndex >= total - 1 || !!flip}
            aria-label="Next page"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <p
        className="mt-4 text-amber-100/60 text-xs"
        style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
      >
        Use the arrows, the keyboard ← →, or pull the ribbon to jump to any entry.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Ribbon bookmark with entry menu                                             */
/* -------------------------------------------------------------------------- */

function RibbonMenu({
  spreads,
  currentIndex,
  onJump,
}: {
  spreads: Spread[];
  currentIndex: number;
  onJump: (index: number) => void;
}) {
  const [open, setOpen] = useState(false);
  // Build entry index for jump menu
  const entryJumps = spreads
    .map((s, i) => ({ s, i }))
    .filter(({ s }) => s.kind === "entry" && (s as Extract<Spread, { kind: "entry" }>).pageOfEntry === 0);

  return (
    <div className="ru-ribbon-wrap">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="ru-ribbon"
        aria-label="Open entry menu"
        aria-expanded={open}
      >
        <span className="ru-ribbon-cloth" />
        <span className="ru-ribbon-tassel" />
      </button>
      {open && (
        <div className="ru-ribbon-menu" style={{ fontFamily: "var(--font-journal)" }}>
          <p className="text-amber-900/80 text-xs uppercase tracking-widest mb-2">Jump to</p>
          <button
            type="button"
            onClick={() => {
              onJump(0);
              setOpen(false);
            }}
            className={`block w-full text-left px-2 py-1.5 rounded hover:bg-amber-900/10 ${
              currentIndex === 0 ? "text-amber-900 font-medium" : "text-amber-950/80"
            }`}
          >
            Table of Contents
          </button>
          <div className="my-2 h-px bg-amber-900/20" />
          <ul className="space-y-0.5 max-h-72 overflow-y-auto pr-1">
            {entryJumps.map(({ s, i }) => {
              const entry = (s as Extract<Spread, { kind: "entry" }>).entry;
              return (
                <li key={entry.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onJump(i);
                      setOpen(false);
                    }}
                    className={`block w-full text-left px-2 py-1.5 rounded hover:bg-amber-900/10 ${
                      currentIndex === i ? "text-amber-900 font-medium" : "text-amber-950/80"
                    }`}
                  >
                    <span className="text-xs text-amber-900/60 mr-2">
                      {formatEntryDateShort(entry.date)}
                    </span>
                    {entry.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page contents                                                               */
/* -------------------------------------------------------------------------- */

function PageContent({
  spread,
  side,
  onJumpToEntry,
}: {
  spread: Spread;
  side: "left" | "right";
  onJumpToEntry: (entryId: string) => void;
}) {
  if (spread.kind === "toc") {
    return side === "left" ? (
      <TocPage entries={spread.entries} onJump={onJumpToEntry} />
    ) : (
      <TitlePage />
    );
  }

  if (spread.kind === "entry") {
    const img = spread.entry.entryImages[spread.pageOfEntry];
    if (side === "left") {
      return <EntryImagePage entry={spread.entry} image={img} pageNumber={spread.pageOfEntry + 1} totalPages={spread.totalPagesInEntry} />;
    }
    // Right page: accompanying photos if first page of entry has them
    const photos = spread.pageOfEntry === 0 ? spread.entry.rightPagePhotos ?? [] : [];
    return <RightPhotoPage entry={spread.entry} photos={photos} />;
  }

  // final-photos
  if (side === "left") {
    return <BlankPage entry={spread.entry} note="continued —" />;
  }
  return <ScrapbookPage photos={spread.entry.finalPagePhotos ?? []} />;
}

function TocPage({ entries, onJump }: { entries: RawUnhingedEntry[]; onJump: (id: string) => void }) {
  return (
    <div className="ru-page-inner ru-paper">
      <header className="text-center mb-6">
        <p className="ru-script-sm">Table of</p>
        <h2 className="ru-script-lg">Contents</h2>
        <div className="mx-auto mt-3 h-px w-12 bg-amber-900/40" />
      </header>
      {entries.length === 0 ? (
        <p className="ru-body text-center italic mt-12">No entries yet.</p>
      ) : (
        <ul className="space-y-3">
          {entries.map((e) => (
            <li key={e.id}>
              <button
                type="button"
                onClick={() => onJump(e.id)}
                className="group w-full text-left flex items-baseline gap-3"
              >
                <span className="ru-body text-amber-900/70 whitespace-nowrap text-sm">
                  {formatEntryDateShort(e.date)}
                </span>
                <span className="flex-1 border-b border-dotted border-amber-900/30 translate-y-[-3px]" />
                <span className="ru-body text-amber-950 group-hover:text-amber-700 transition-colors">
                  {e.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="ru-script-xs mt-10 text-center text-amber-900/50">
        — click any line to flip there —
      </p>
    </div>
  );
}

function TitlePage() {
  return (
    <div className="ru-page-inner ru-paper flex flex-col items-center justify-center text-center">
      <p className="ru-script-sm mb-2">the journal of</p>
      <h2 className="ru-script-xl">Raw &amp; Unhinged</h2>
      <div className="mt-4 mb-6 h-px w-16 bg-amber-900/40" />
      <p className="ru-body italic max-w-[28ch]">
        Pages photographed straight from the page. Nothing typed up, nothing tidied.
      </p>
      <p className="ru-script-sm mt-10">— Cami</p>
    </div>
  );
}

function EntryImagePage({
  entry,
  image,
  pageNumber,
  totalPages,
}: {
  entry: RawUnhingedEntry;
  image: { src: string; alt: string };
  pageNumber: number;
  totalPages: number;
}) {
  return (
    <div className="ru-page-inner ru-paper flex flex-col">
      <header className="flex items-baseline justify-between mb-3">
        <p className="ru-script-sm text-amber-900/80">{formatEntryDate(entry.date)}</p>
        {totalPages > 1 && (
          <p className="ru-body text-xs text-amber-900/60">
            page {pageNumber} of {totalPages}
          </p>
        )}
      </header>
      <div className="relative flex-1 min-h-0 flex items-center justify-center pb-[calc((1em+0.75rem)/2)]">
        <span className="ru-photo-mount relative inline-flex h-full max-w-full items-center justify-center">
          <img
            src={image.src}
            alt={image.alt}
            className="block h-full w-auto max-w-full object-contain ru-photo"
            loading="lazy"
          />
          <span className="ru-corner ru-corner-tl" />
          <span className="ru-corner ru-corner-tr" />
          <span className="ru-corner ru-corner-bl" />
          <span className="ru-corner ru-corner-br" />
        </span>
      </div>
    </div>
  );
}

function RightPhotoPage({ entry, photos }: { entry: RawUnhingedEntry; photos: { src: string; alt: string }[] }) {
  if (photos.length === 0) {
    return <BlankPage entry={entry} />;
  }
  if (photos.length === 1) {
    return (
      <div className="ru-page-inner ru-paper flex flex-col">
        <header className="text-right mb-3">
          <p className="ru-script-sm text-amber-900/70">{formatEntryDate(entry.date)}</p>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <PhotoCorners>
            <img
              src={photos[0].src}
              alt={photos[0].alt}
              className="block max-h-full max-w-full object-contain ru-photo"
              loading="lazy"
            />
          </PhotoCorners>
        </div>
      </div>
    );
  }
  return <ScrapbookPage photos={photos} dateLabel={formatEntryDate(entry.date)} />;
}

function BlankPage({ entry, note }: { entry: RawUnhingedEntry; note?: string }) {
  return (
    <div className="ru-page-inner ru-paper flex flex-col">
      <header className="text-right mb-3">
        <p className="ru-script-sm text-amber-900/70">{formatEntryDate(entry.date)}</p>
      </header>
      <div className="flex-1 flex items-center justify-center">
        {note ? (
          <p className="ru-script-sm text-amber-900/40">{note}</p>
        ) : (
          <p className="ru-script-xs text-amber-900/30">{/* intentionally blank */}</p>
        )}
      </div>
    </div>
  );
}

function ScrapbookPage({
  photos,
  dateLabel,
}: {
  photos: { src: string; alt: string }[];
  dateLabel?: string;
}) {
  // Pre-computed scattered positions for up to 6 photos
  const layouts = [
    { top: "4%", left: "6%", w: "55%", rot: -4 },
    { top: "14%", left: "42%", w: "52%", rot: 3.5 },
    { top: "48%", left: "3%", w: "48%", rot: 2 },
    { top: "52%", left: "44%", w: "54%", rot: -3 },
    { top: "30%", left: "22%", w: "50%", rot: 1 },
    { top: "66%", left: "26%", w: "48%", rot: -2 },
  ];
  return (
    <div className="ru-page-inner ru-paper relative">
      {dateLabel && (
        <p className="absolute top-3 right-4 ru-script-sm text-amber-900/70 z-10">{dateLabel}</p>
      )}
      <div className="relative w-full h-full">
        {photos.slice(0, 6).map((p, i) => {
          const L = layouts[i % layouts.length];
          return (
            <div
              key={i}
              className="absolute"
              style={{
                top: L.top,
                left: L.left,
                width: L.w,
                transform: `rotate(${L.rot}deg)`,
              }}
            >
              <PhotoCorners>
                <img src={p.src} alt={p.alt} className="block w-full h-auto ru-photo" loading="lazy" />
              </PhotoCorners>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Adds little black photo-corner mounts at the four corners of the wrapped image. */
function PhotoCorners({ children }: { children: React.ReactNode }) {
  return (
    <span className="ru-photo-mount relative inline-block">
      {children}
      <span className="ru-corner ru-corner-tl" />
      <span className="ru-corner ru-corner-tr" />
      <span className="ru-corner ru-corner-bl" />
      <span className="ru-corner ru-corner-br" />
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Styles (scoped to this route)                                               */
/* -------------------------------------------------------------------------- */

const rawUnhingedStyles = `
.ru-stage { background: radial-gradient(ellipse at center, #1a0e07 0%, #0a0604 80%); }

.ru-scene { position: relative; max-width: 1400px; margin: 0 auto; }

/* ----- Candle flame: positioned over the wick in desk-scene.jpg ----- */
.ru-flame {
  position: absolute;
  left: 17.4%;
  top: 17.2%;
  width: 3.6%;
  aspect-ratio: 40 / 70;
  transform: translate(-50%, -94%);
  pointer-events: none;
  z-index: 2;
}
.ru-flame-halo {
  position: absolute;
  inset: -260% -260% -200% -260%;
  background: radial-gradient(circle, rgba(255, 190, 110, 0.35) 0%, rgba(255, 150, 60, 0.18) 30%, transparent 65%);
  filter: blur(8px);
  animation: ruFlameHalo 2.6s ease-in-out infinite alternate;
}
.ru-flame-svg {
  position: relative;
  width: 100%;
  height: 100%;
  transform-origin: 50% 100%;
  animation: ruFlameSway 2.4s ease-in-out infinite;
  filter: drop-shadow(0 -6px 10px rgba(255, 170, 70, 0.55));
}
.ru-flame-outer { transform-origin: 50% 100%; animation: ruFlameFlicker 1.6s ease-in-out infinite; }
.ru-flame-core  { transform-origin: 50% 100%; animation: ruFlameCorePulse 1.2s ease-in-out infinite; }

@keyframes ruFlameSway {
  0%, 100% { transform: rotate(-1.5deg) scaleY(1); }
  25% { transform: rotate(1.2deg) scaleY(1.04); }
  50% { transform: rotate(-0.8deg) scaleY(0.97); }
  75% { transform: rotate(2deg) scaleY(1.02); }
}
@keyframes ruFlameFlicker {
  0%, 100% { transform: scale(1, 1); opacity: 1; }
  30% { transform: scale(0.96, 1.05); opacity: 0.92; }
  60% { transform: scale(1.04, 0.95); opacity: 1; }
  80% { transform: scale(0.98, 1.02); opacity: 0.96; }
}
@keyframes ruFlameCorePulse {
  0%, 100% { opacity: 0.6; transform: scale(1, 1); }
  50% { opacity: 0.9; transform: scale(1.08, 1.04); }
}
@keyframes ruFlameHalo {
  0% { opacity: 0.7; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.06); }
}

@media (prefers-reduced-motion: reduce) {
  .ru-flame-svg, .ru-flame-outer, .ru-flame-core, .ru-flame-halo { animation: none; }
}

/* ----- Clickable journal hotspot (overlaid on the journal in the photo) ----- */
.ru-journal-hotspot {
  position: absolute;
  /* Journal bounds in desk-scene.jpg (1536x1024): ~x 510-985, y 240-830 */
  left: 33.2%;
  top: 23.4%;
  width: 31%;
  height: 57.6%;
  border: 0;
  background: transparent;
  cursor: pointer;
  z-index: 3;
  transition: transform 400ms ease;
}
.ru-journal-hotspot:hover { transform: scale(1.015) translateY(-3px); }
.ru-journal-hotspot:focus-visible { outline: 2px solid #ffd47a; outline-offset: 6px; border-radius: 6px; }
.ru-journal-glow {
  position: absolute; inset: -6%;
  border-radius: 8px;
  background: radial-gradient(ellipse at center, rgba(255, 200, 120, 0.28), transparent 70%);
  opacity: 0; transition: opacity 400ms ease;
  pointer-events: none;
}
.ru-journal-hotspot:hover .ru-journal-glow,
.ru-journal-hotspot:focus-visible .ru-journal-glow { opacity: 1; }
.ru-journal-hint {
  position: absolute; bottom: -42px; left: 50%;
  transform: translateX(-50%);
  color: #fde7b8;
  font-size: 1.5rem;
  text-shadow: 0 2px 8px rgba(0,0,0,0.6);
  white-space: nowrap;
  opacity: 0.85;
  transition: opacity 300ms, transform 300ms;
}
.ru-journal-hotspot:hover .ru-journal-hint { opacity: 1; transform: translateX(-50%) translateY(2px); }

/* ----- Book overlay ----- */
.ru-overlay {
  background:
    radial-gradient(ellipse at center, rgba(60, 30, 12, 0.85) 0%, rgba(8, 4, 2, 0.96) 70%),
    url(${JSON.stringify(deskScene)});
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.ru-book {
  position: relative;
  width: min(95vw, 1100px);
  aspect-ratio: 11 / 7;
  perspective: 2200px;
  transform: scale(0.85);
  opacity: 0;
  transition: transform 700ms cubic-bezier(.2,.7,.2,1), opacity 500ms ease;
}
.ru-book.is-opened { transform: scale(1); opacity: 1; }
.ru-book-inner {
  position: relative;
  width: 100%; height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: linear-gradient(180deg, #2a0f08 0%, #1a0a04 100%);
  box-shadow:
    0 40px 80px -20px rgba(0,0,0,0.7),
    0 0 0 8px #6a2c14,
    0 0 0 10px #3a1808;
  border-radius: 6px;
  transform-style: preserve-3d;
}
.ru-book-inner::before {
  /* Center gutter shadow */
  content: "";
  position: absolute;
  left: 50%; top: 0; bottom: 0;
  width: 28px; transform: translateX(-50%);
  background: linear-gradient(90deg, transparent, rgba(0,0,0,0.45) 50%, transparent);
  pointer-events: none;
  z-index: 5;
}

.ru-page {
  position: relative;
  overflow: hidden;
  background-color: #f8efd9;
  background-image: url(${JSON.stringify(paperTexture)});
  background-size: cover;
}
.ru-page-left  { border-radius: 4px 0 0 4px; box-shadow: inset -8px 0 16px -8px rgba(60,30,10,0.35); }
.ru-page-right { border-radius: 0 4px 4px 0; box-shadow: inset 8px 0 16px -8px rgba(60,30,10,0.35); }
.ru-paper { position: absolute; inset: 0; padding: clamp(18px, 3.5%, 36px); }
.ru-page-inner { width: 100%; height: 100%; color: #3a1d0a; }

/* Page typography */
.ru-script-xs { font-family: var(--font-hand); font-size: clamp(0.9rem, 1.3vw, 1.1rem); color: #6b3614; }
.ru-script-sm { font-family: var(--font-hand); font-size: clamp(1.1rem, 1.6vw, 1.4rem); color: #6b3614; }
.ru-script-lg { font-family: var(--font-journal); font-style: italic; font-size: clamp(2rem, 4vw, 3rem); color: #4a2208; font-weight: 500; letter-spacing: 0.01em; }
.ru-script-xl { font-family: var(--font-journal); font-style: italic; font-size: clamp(2.4rem, 5vw, 3.8rem); color: #4a2208; font-weight: 500; letter-spacing: 0.01em; }
.ru-body { font-family: var(--font-journal); font-size: clamp(0.95rem, 1.25vw, 1.1rem); color: #3a1d0a; line-height: 1.55; }

/* Photo mounts */
.ru-photo-mount { line-height: 0; }
.ru-photo { box-shadow: 0 8px 24px -8px rgba(60,30,10,0.5), 0 2px 4px rgba(0,0,0,0.15); border-radius: 2px; max-height: 100%; }
.ru-corner {
  position: absolute;
  width: 18px; height: 18px;
  background:
    linear-gradient(135deg, #2a1408 50%, transparent 50.5%);
  opacity: 0.85;
}
.ru-corner-tl { top: -2px; left: -2px; }
.ru-corner-tr { top: -2px; right: -2px; transform: rotate(90deg); }
.ru-corner-br { bottom: -2px; right: -2px; transform: rotate(180deg); }
.ru-corner-bl { bottom: -2px; left: -2px; transform: rotate(270deg); }

/* Page turn buttons */
.ru-turn {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 38px; height: 38px;
  border-radius: 999px;
  background: rgba(60, 28, 10, 0.85);
  color: #fde7b8;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid rgba(253, 231, 184, 0.3);
  cursor: pointer;
  z-index: 20;
  transition: background 200ms, opacity 200ms;
}
.ru-turn:hover { background: rgba(120, 60, 24, 0.95); }
.ru-turn:disabled { opacity: 0.25; cursor: not-allowed; }
.ru-turn-prev { left: -50px; }
.ru-turn-next { right: -50px; }
@media (max-width: 700px) {
  .ru-turn-prev { left: 6px; }
  .ru-turn-next { right: 6px; }
}

/* Page flip animation */
.ru-flip {
  position: absolute;
  top: 0; bottom: 0;
  width: 50%;
  transform-style: preserve-3d;
  z-index: 15;
  pointer-events: none;
}
.ru-flip-next {
  right: 0;
  transform-origin: left center;
  animation: ruFlipNext 750ms ease-in-out forwards;
}
.ru-flip-prev {
  left: 0;
  transform-origin: right center;
  animation: ruFlipPrev 750ms ease-in-out forwards;
}
.ru-flip-face {
  position: absolute; inset: 0;
  backface-visibility: hidden;
  background-color: #f8efd9;
  background-image: url(${JSON.stringify(paperTexture)});
  background-size: cover;
}
.ru-flip-front { z-index: 2; }
.ru-flip-back  { transform: rotateY(180deg); }
.ru-flip-next .ru-flip-front { border-radius: 0 4px 4px 0; box-shadow: inset 8px 0 16px -8px rgba(60,30,10,0.35); }
.ru-flip-next .ru-flip-back  { border-radius: 4px 0 0 4px; box-shadow: inset -8px 0 16px -8px rgba(60,30,10,0.35); }
.ru-flip-prev .ru-flip-front { border-radius: 4px 0 0 4px; box-shadow: inset -8px 0 16px -8px rgba(60,30,10,0.35); }
.ru-flip-prev .ru-flip-back  { border-radius: 0 4px 4px 0; box-shadow: inset 8px 0 16px -8px rgba(60,30,10,0.35); }

@keyframes ruFlipNext {
  0% { transform: rotateY(0deg); box-shadow: 0 0 30px rgba(0,0,0,0.2); }
  100% { transform: rotateY(-180deg); box-shadow: -30px 0 40px rgba(0,0,0,0.4); }
}
@keyframes ruFlipPrev {
  0% { transform: rotateY(0deg); box-shadow: 0 0 30px rgba(0,0,0,0.2); }
  100% { transform: rotateY(180deg); box-shadow: 30px 0 40px rgba(0,0,0,0.4); }
}

/* Ribbon bookmark */
.ru-ribbon-wrap { position: absolute; top: 0; right: calc(50% - 18px); z-index: 30; }
.ru-ribbon {
  position: relative;
  display: block;
  width: 26px;
  height: 90px;
  background: transparent;
  border: 0;
  cursor: pointer;
  padding: 0;
}
.ru-ribbon-cloth {
  position: absolute;
  top: 0; left: 0;
  width: 26px; height: 78px;
  background: linear-gradient(180deg, #b5793a 0%, #8a4a18 100%);
  box-shadow: inset -3px 0 4px rgba(0,0,0,0.25);
}
.ru-ribbon-tassel {
  position: absolute;
  bottom: 0; left: 50%;
  transform: translateX(-50%);
  width: 22px; height: 18px;
  background: radial-gradient(ellipse at top, #d49a4e 0%, #7a3d10 100%);
  clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
}
.ru-ribbon:hover .ru-ribbon-cloth { filter: brightness(1.1); }

.ru-ribbon-menu {
  position: absolute;
  top: 100px;
  right: -8px;
  width: 320px;
  background:
    linear-gradient(180deg, #fbf3df, #f3e7c8);
  border: 1px solid rgba(120, 60, 20, 0.3);
  border-radius: 4px;
  padding: 14px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.4);
  color: #3a1d0a;
}

/* Mobile: stack pages */
@media (max-width: 760px) {
  .ru-book { width: min(88vw, 480px); max-width: 88vw; aspect-ratio: 8 / 11; }
  .ru-book-inner { grid-template-columns: 1fr; grid-template-rows: 1fr 1fr; }
  .ru-book-inner::before {
    left: 0; right: 0; top: 50%; bottom: auto;
    width: auto; height: 28px; transform: translateY(-50%);
    background: linear-gradient(180deg, transparent, rgba(0,0,0,0.45) 50%, transparent);
  }
  .ru-page-left { border-radius: 4px 4px 0 0; box-shadow: inset 0 -8px 16px -8px rgba(60,30,10,0.35); }
  .ru-page-right { border-radius: 0 0 4px 4px; box-shadow: inset 0 8px 16px -8px rgba(60,30,10,0.35); }
  .ru-flip { width: 100%; height: 50%; }
  .ru-flip-next { right: 0; top: 50%; bottom: auto; transform-origin: top center; animation-name: ruFlipNextMobile; }
  .ru-flip-prev { left: 0; top: 0; transform-origin: bottom center; animation-name: ruFlipPrevMobile; }
  @keyframes ruFlipNextMobile {
    0% { transform: rotateX(0deg); }
    100% { transform: rotateX(180deg); }
  }
  @keyframes ruFlipPrevMobile {
    0% { transform: rotateX(0deg); }
    100% { transform: rotateX(-180deg); }
  }
  .ru-ribbon-menu { width: 260px; right: -120px; }
}
`;
