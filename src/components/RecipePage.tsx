import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { SharePostBar } from "@/components/SharePostBar";
import {
  ArrowLeft,
  Clock,
  Flame,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { Recipe, RecipeMetaItem } from "@/data/recipes";

const iconMap: Record<RecipeMetaItem["icon"], LucideIcon> = {
  clock: Clock,
  flame: Flame,
  users: Users,
  "utensils-crossed": UtensilsCrossed,
};

/** Renders a title string with **bold-emphasis** turned into <em class="text-primary">. */
function renderTitle(title: string) {
  const parts = title.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <em key={i} className="text-primary">
          {part.slice(2, -2)}
        </em>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function RecipePage({ recipe }: { recipe: Recipe }) {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img
            src={recipe.heroImage}
            alt={recipe.heroAlt}
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
        </div>

        <div className="relative container mx-auto px-4 pt-20 pb-16 md:pt-28 md:pb-24 max-w-4xl text-center">
          <Link
            to="/blog/$category"
            params={{ category: recipe.categorySlug }}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span style={{ fontFamily: "var(--font-journal)" }}>From the Kitchen</span>
          </Link>

          {recipe.forDogs && (
            <div
              className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/40 text-primary"
              style={{ fontFamily: "var(--font-journal)" }}
            >
              <span aria-hidden>🐾</span>
              <span className="text-sm uppercase tracking-wider">For the Pups — not for humans</span>
            </div>
          )}

          <p
            className="text-primary text-2xl md:text-3xl mb-2"
            style={{ fontFamily: "var(--font-hand)" }}
          >
            {recipe.kicker}
          </p>
          <h1
            className="text-4xl md:text-6xl text-foreground leading-tight"
            style={{ fontFamily: "var(--font-journal)", fontWeight: 400 }}
          >
            {renderTitle(recipe.title)}
            {recipe.subtitle && (
              <>
                <br />
                {recipe.subtitle}
              </>
            )}
          </h1>
          <div className="mx-auto mt-6 mb-6 h-px w-20 bg-primary/60" />
          <p
            className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed"
            style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
          >
            {recipe.intro}
          </p>
        </div>
      </section>

      {/* Meta strip */}
      <section className="border-b border-border bg-card/30">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recipe.meta.map((m) => {
              const Icon = iconMap[m.icon];
              return (
                <div
                  key={m.label}
                  className="flex items-center gap-3 justify-center md:justify-start"
                >
                  <Icon className="h-5 w-5 text-primary" />
                  <div>
                    <p
                      className="text-xs uppercase tracking-wider text-muted-foreground"
                      style={{ fontFamily: "var(--font-journal)" }}
                    >
                      {m.label}
                    </p>
                    <p
                      className="text-lg text-foreground"
                      style={{ fontFamily: "var(--font-journal)", fontWeight: 500 }}
                    >
                      {m.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container mx-auto px-4 py-16 md:py-20 max-w-5xl">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-16">
          {/* Ingredients */}
          <aside className="md:sticky md:top-24 md:self-start">
            <p
              className="text-primary text-2xl mb-2"
              style={{ fontFamily: "var(--font-hand)" }}
            >
              gather
            </p>
            <h2 className="text-3xl md:text-4xl mb-8" style={{ fontFamily: "var(--font-journal)" }}>
              Ingredients
            </h2>

            <div className="space-y-8">
              {recipe.ingredientGroups.map((group) => (
                <div key={group.title}>
                  <h3
                    className="text-xl text-primary mb-3"
                    style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
                  >
                    {group.title}
                  </h3>
                  <ul className="space-y-2 border-l border-primary/30 pl-4">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="text-foreground leading-relaxed"
                        style={{ fontFamily: "var(--font-journal)" }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>

          {/* Steps */}
          <div>
            <p
              className="text-primary text-2xl mb-2"
              style={{ fontFamily: "var(--font-hand)" }}
            >
              the method
            </p>
            <h2 className="text-3xl md:text-4xl mb-8" style={{ fontFamily: "var(--font-journal)" }}>
              Instructions
            </h2>

            <ol className="space-y-8">
              {recipe.steps.map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div
                      className="h-12 w-12 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center text-primary text-2xl"
                      style={{ fontFamily: "var(--font-journal)", fontWeight: 500 }}
                    >
                      {i + 1}
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3
                      className="text-2xl mb-2 text-foreground"
                      style={{ fontFamily: "var(--font-journal)", fontWeight: 500 }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-muted-foreground leading-relaxed text-lg"
                      style={{ fontFamily: "var(--font-journal)" }}
                    >
                      {step.body}
                    </p>
                    {step.image && (
                      <figure
                        className={`mt-5 overflow-hidden rounded-sm border border-primary/20 shadow-lg ${
                          i % 2 === 0 ? "rotate-[-0.5deg]" : "rotate-[0.5deg]"
                        }`}
                      >
                        <img
                          src={step.image}
                          alt={step.imageAlt ?? step.title}
                          width={1200}
                          height={1200}
                          loading="lazy"
                          className="h-auto w-full object-cover"
                        />
                      </figure>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            {recipe.cooksNote && (
              <div className="mt-12 relative bg-primary/5 border border-primary/20 rounded-sm p-6 md:p-8 rotate-[-0.4deg]">
                <span
                  className="absolute -top-4 left-6 bg-background px-3 text-primary text-2xl"
                  style={{ fontFamily: "var(--font-hand)" }}
                >
                  cook's note
                </span>
                <p
                  className="text-foreground/90 leading-relaxed text-lg"
                  style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
                >
                  {recipe.cooksNote}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Share */}
      <section className="container mx-auto px-4 max-w-4xl">
        <SharePostBar
          title={recipe.title.replace(/\*\*/g, "")}
          url={typeof window !== "undefined" ? window.location.href : `https://misskonstruction.com/recipes/${recipe.slug}`}
          image={recipe.heroImage}
          description={recipe.description}
          kicker="✦ tasted something good?"
          heading="Pass the plate — share this recipe"
        />
      </section>

      {/* Sign-off */}
      <section className="border-t border-border bg-card/30 mt-12">
        <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
          <p
            className="text-primary text-3xl mb-3"
            style={{ fontFamily: "var(--font-hand)" }}
          >
            {recipe.signOff.kicker}
          </p>
          <p
            className="text-muted-foreground text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
          >
            {recipe.signOff.body}
          </p>
          <Link
            to="/blog/$category"
            params={{ category: recipe.categorySlug }}
            className="inline-flex items-center gap-2 mt-8 text-primary border-b border-primary/40 pb-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span style={{ fontFamily: "var(--font-journal)" }} className="text-lg">
              More from the kitchen
            </span>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
