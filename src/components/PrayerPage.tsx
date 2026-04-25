import { Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Flame } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { SharePostBar } from "@/components/SharePostBar";
import type { Prayer } from "@/data/prayers";
import { prayerSharedHero } from "@/data/prayers";

/** Renders a title string with **bold-emphasis** turned into <em class="text-ember">. */
function renderTitle(title: string) {
  const parts = title.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <em key={i} className="text-[var(--prayer-ember)]">
          {part.slice(2, -2)}
        </em>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function PrayerPage({ prayer }: { prayer: Prayer }) {
  const hero = prayer.heroImage ?? prayerSharedHero;
  const heroAlt = prayer.heroAlt ?? "A candle burning beside an open Bible at dusk";
  const isQuote = prayer.format === "quote";

  return (
    <SiteLayout>
      <div className="prayer-theme">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--prayer-border)]">
          <div className="absolute inset-0">
            <img
              src={hero}
              alt={heroAlt}
              width={1920}
              height={1080}
              className="h-full w-full object-cover opacity-60"
            />
            {/* Warm ember-to-deep gradient wash */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--prayer-bg)_55%,transparent),color-mix(in_oklab,var(--prayer-bg)_75%,transparent),var(--prayer-bg))]" />
            {/* Soft golden vignette glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--prayer-glow)_18%,transparent),transparent_60%)]" />
          </div>

          <div className="relative container mx-auto px-4 pt-20 pb-16 md:pt-28 md:pb-24 max-w-3xl text-center">
            <Link
              to="/blog/$category"
              params={{ category: prayer.categorySlug }}
              className="inline-flex items-center gap-2 text-[var(--prayer-muted)] hover:text-[var(--prayer-ember)] transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              <span style={{ fontFamily: "var(--font-journal)" }}>Faith & Scripture</span>
            </Link>

            <p
              className="text-[var(--prayer-ember)] text-2xl md:text-3xl mb-2"
              style={{ fontFamily: "var(--font-hand)" }}
            >
              {prayer.kicker}
            </p>
            <h1
              className="text-4xl md:text-6xl text-[var(--prayer-fg)] leading-tight"
              style={{ fontFamily: "var(--font-journal)", fontWeight: 400 }}
            >
              {renderTitle(prayer.title)}
            </h1>

            <div className="mx-auto mt-6 mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[var(--prayer-ember)]/50" />
              <Flame
                className="h-4 w-4 text-[var(--prayer-ember)]"
                aria-hidden
              />
              <span className="h-px w-10 bg-[var(--prayer-ember)]/50" />
            </div>

            <p
              className="text-[var(--prayer-fg)] text-lg"
              style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
            >
              {prayer.author.startsWith("for ") ? prayer.author : `by ${prayer.author}`}
            </p>
            {prayer.attribution && (
              <p
                className="text-[var(--prayer-muted)] text-base mt-1"
                style={{ fontFamily: "var(--font-hand)" }}
              >
                {prayer.attribution}
              </p>
            )}

            <p
              className="mx-auto max-w-2xl mt-8 text-lg md:text-xl text-[var(--prayer-muted)] leading-relaxed"
              style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
            >
              {prayer.intro}
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="bg-[var(--prayer-bg)]">
          <div className="container mx-auto px-4 py-16 md:py-24 max-w-2xl">
            {/* Scripture callout */}
            {prayer.scripture && (
              <figure className="mb-14 relative bg-[var(--prayer-card)] border border-[var(--prayer-border)] rounded-sm p-8 md:p-10 rotate-[-0.3deg] shadow-[0_10px_40px_-20px_color-mix(in_oklab,var(--prayer-ember)_50%,transparent)]">
                <span
                  className="absolute -top-4 left-6 bg-[var(--prayer-bg)] px-3 text-[var(--prayer-ember)] text-2xl inline-flex items-center gap-2"
                  style={{ fontFamily: "var(--font-hand)" }}
                >
                  <BookOpen className="h-4 w-4" aria-hidden />
                  scripture
                </span>
                <blockquote
                  className="text-xl md:text-2xl text-[var(--prayer-fg)] leading-relaxed text-center"
                  style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
                >
                  &ldquo;{prayer.scripture.text}&rdquo;
                </blockquote>
                <figcaption
                  className="mt-5 text-center text-[var(--prayer-ember)] text-base tracking-wider uppercase"
                  style={{ fontFamily: "var(--font-journal)" }}
                >
                  {prayer.scripture.reference}
                  {prayer.scripture.translation ? ` · ${prayer.scripture.translation}` : ""}
                </figcaption>
              </figure>
            )}

            {/* Prayer body */}
            {isQuote ? (
              <article style={{ fontFamily: "var(--font-journal)" }}>
                <div className="text-center">
                  <span
                    className="block text-[var(--prayer-ember)]/60 text-[6rem] md:text-[8rem] leading-none"
                    style={{ fontFamily: "var(--font-hand)" }}
                    aria-hidden
                  >
                    &ldquo;
                  </span>
                </div>
                <blockquote
                  className="space-y-7 text-2xl md:text-3xl text-[var(--prayer-fg)] leading-[1.55] text-center"
                  style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
                >
                  {prayer.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </blockquote>
                <p
                  className="mt-10 text-center text-[var(--prayer-ember)] tracking-[0.2em] uppercase text-sm"
                  style={{ fontFamily: "var(--font-journal)" }}
                >
                  — {prayer.author}
                </p>
              </article>
            ) : (
              <article
                className="prayer-prose"
                style={{ fontFamily: "var(--font-journal)" }}
              >
                {prayer.body.map((para, i) =>
                  para.trim() === "" ? (
                    <div key={i} className="h-4" aria-hidden />
                  ) : (
                    <p key={i}>{para}</p>
                  ),
                )}
              </article>
            )}

            {prayer.reflection && (
              <>
                {/* Ornament */}
                <div className="my-16 flex items-center justify-center gap-4">
                  <span className="h-px w-16 bg-[var(--prayer-ember)]/40" />
                  <span
                    className="text-[var(--prayer-ember)] text-2xl"
                    style={{ fontFamily: "var(--font-hand)" }}
                    aria-hidden
                  >
                    ✦
                  </span>
                  <span className="h-px w-16 bg-[var(--prayer-ember)]/40" />
                </div>

                {/* Reflection */}
                <div className="mt-4">
                  <p
                    className="text-[var(--prayer-ember)] text-2xl mb-1"
                    style={{ fontFamily: "var(--font-hand)" }}
                  >
                    {prayer.reflection.kicker}
                  </p>
                  <h2
                    className="text-3xl md:text-4xl text-[var(--prayer-fg)] mb-6"
                    style={{ fontFamily: "var(--font-journal)", fontWeight: 500 }}
                  >
                    {prayer.reflection.heading}
                  </h2>
                  <div className="space-y-5 text-[var(--prayer-fg)]/90 text-lg leading-relaxed" style={{ fontFamily: "var(--font-journal)" }}>
                    {prayer.reflection.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Share */}
        <section className="container mx-auto px-4 max-w-3xl">
          <SharePostBar
            title={prayer.title.replace(/\*\*/g, "")}
            url={
              typeof window !== "undefined"
                ? window.location.href
                : `https://misskonstruction.com/prayers/${prayer.slug}`
            }
            image={prayer.heroImage ?? prayerSharedHero}
            description={isQuote ? "A quiet word to carry with you." : "A prayer to keep its lamp lit."}
            kicker="✦ did this stir your spirit?"
            heading="Share this with a heart that needs it"
          />
        </section>

        {/* Sign-off */}
        <section className="border-t border-[var(--prayer-border)] bg-[var(--prayer-card)]/40 mt-12">
          <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
            <p
              className="text-[var(--prayer-ember)] text-3xl mb-3"
              style={{ fontFamily: "var(--font-hand)" }}
            >
              {isQuote ? "selah." : "amen."}
            </p>
            <p
              className="text-[var(--prayer-muted)] text-lg leading-relaxed"
              style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
            >
              {isQuote
                ? "A few words to carry into the quiet hours."
                : "May this prayer keep its lamp lit in the quiet hours."}
            </p>
            <Link
              to="/blog/$category"
              params={{ category: prayer.categorySlug }}
              className="inline-flex items-center gap-2 mt-8 text-[var(--prayer-ember)] border-b border-[var(--prayer-ember)]/40 pb-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span style={{ fontFamily: "var(--font-journal)" }} className="text-lg">
                More prayers & scripture
              </span>
            </Link>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
