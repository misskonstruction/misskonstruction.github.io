import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { SharePostBar } from "@/components/SharePostBar";
import { ArrowLeft, Clock, Flame, Users, UtensilsCrossed } from "lucide-react";
import { getRecipe } from "@/data/recipes";
import {
  thanksgivingDishes,
  thanksgivingHeroImage,
  type ThanksgivingDish,
} from "@/data/thanksgiving-menu";
import sprigDivider from "@/assets/divider-botanical-sprig.png";

const recipe = getRecipe("thanksgiving-table")!;

export const Route = createFileRoute("/recipes/thanksgiving-table")({
  component: ThanksgivingTablePage,
  head: () => {
    const cleanTitle = recipe.title.replace(/\*\*/g, "");
    return {
      meta: [
        { title: `${cleanTitle} — From the Kitchen` },
        { name: "description", content: recipe.description },
        { property: "og:title", content: cleanTitle },
        { property: "og:description", content: recipe.description },
        { property: "og:image", content: recipe.heroImage },
        { name: "twitter:image", content: recipe.heroImage },
      ],
    };
  },
});

function SprigDivider() {
  return (
    <div className="my-14 md:my-16 flex justify-center" aria-hidden>
      <img
        src={sprigDivider}
        alt=""
        width={1280}
        height={512}
        loading="lazy"
        className="h-20 md:h-24 w-auto opacity-90 select-none pointer-events-none"
      />
    </div>
  );
}

function DishSection({ dish, index }: { dish: ThanksgivingDish; index: number }) {
  return (
    <article id={dish.id} className="scroll-mt-24">
      <header className="text-center mb-10 md:mb-12">
        <p
          className="text-primary text-xl md:text-2xl mb-2"
          style={{ fontFamily: "var(--font-hand)" }}
        >
          dish {String(index + 1).padStart(2, "0")}
        </p>
        <h2
          className="text-3xl md:text-5xl text-foreground leading-tight"
          style={{ fontFamily: "var(--font-journal)", fontWeight: 400 }}
        >
          {dish.name}
        </h2>
        {dish.intro && (
          <>
            <div className="mx-auto mt-5 mb-5 h-px w-16 bg-primary/50" />
            <p
              className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed"
              style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
            >
              {dish.intro}
            </p>
          </>
        )}
        {dish.note && (
          <p
            className="mx-auto mt-4 max-w-2xl text-primary/90 text-xl"
            style={{ fontFamily: "var(--font-hand)" }}
          >
            “{dish.note}”
          </p>
        )}
      </header>

      <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-14">
        {/* Ingredients */}
        <aside>
          <p
            className="text-primary text-xl mb-2"
            style={{ fontFamily: "var(--font-hand)" }}
          >
            gather
          </p>
          <h3
            className="text-2xl md:text-3xl mb-6"
            style={{ fontFamily: "var(--font-journal)" }}
          >
            Ingredients
          </h3>
          <div className="space-y-6">
            {dish.ingredientGroups.map((group, gi) => (
              <div key={gi}>
                {group.title && (
                  <h4
                    className="text-lg text-primary mb-2"
                    style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
                  >
                    {group.title}
                  </h4>
                )}
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
            className="text-primary text-xl mb-2"
            style={{ fontFamily: "var(--font-hand)" }}
          >
            the method
          </p>
          <h3
            className="text-2xl md:text-3xl mb-6"
            style={{ fontFamily: "var(--font-journal)" }}
          >
            Instructions
          </h3>
          <ol className="space-y-6">
            {dish.steps.map((step, i) => (
              <li key={i} className="flex gap-5">
                <div className="flex-shrink-0">
                  <div
                    className="h-10 w-10 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center text-primary text-xl"
                    style={{ fontFamily: "var(--font-journal)", fontWeight: 500 }}
                  >
                    {i + 1}
                  </div>
                </div>
                <p
                  className="pt-1.5 text-muted-foreground leading-relaxed text-lg"
                  style={{ fontFamily: "var(--font-journal)" }}
                >
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}

function ThanksgivingTablePage() {
  const cleanTitle = recipe.title.replace(/\*\*/g, "");
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img
            src={thanksgivingHeroImage}
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
            Our <em className="text-primary">Thanksgiving Table</em>
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
            {[
              { Icon: Users, label: "Feeds", value: "a full table" },
              { Icon: UtensilsCrossed, label: "Course", value: "Holiday menu" },
              { Icon: Clock, label: "When", value: "Thanksgiving + Christmas" },
              { Icon: Flame, label: "Dishes", value: `${thanksgivingDishes.length} favorites` },
            ].map(({ Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3 justify-center md:justify-start"
              >
                <Icon className="h-5 w-5 text-primary" />
                <div>
                  <p
                    className="text-xs uppercase tracking-wider text-muted-foreground"
                    style={{ fontFamily: "var(--font-journal)" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-lg text-foreground"
                    style={{ fontFamily: "var(--font-journal)", fontWeight: 500 }}
                  >
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The menu — what's on the table */}
      <section className="container mx-auto px-4 pt-16 md:pt-20 max-w-3xl">
        <div className="text-center mb-8">
          <p
            className="text-primary text-2xl mb-1"
            style={{ fontFamily: "var(--font-hand)" }}
          >
            on the table
          </p>
          <h2
            className="text-3xl md:text-4xl text-foreground"
            style={{ fontFamily: "var(--font-journal)" }}
          >
            The <em className="text-primary">menu</em>
          </h2>
        </div>
        <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-3 max-w-xl mx-auto">
          {thanksgivingDishes.map((d, i) => (
            <li
              key={d.id}
              className="flex items-baseline gap-3 text-lg text-foreground"
              style={{ fontFamily: "var(--font-journal)" }}
            >
              <span className="text-primary text-sm">
                {String(i + 1).padStart(2, "0")}
              </span>
              <a
                href={`#${d.id}`}
                className="border-b border-transparent hover:border-primary/60 transition-colors"
              >
                {d.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Dishes — stacked with sprig dividers */}
      <section className="container mx-auto px-4 pt-12 md:pt-16 pb-8 max-w-5xl">
        {thanksgivingDishes.map((dish, i) => (
          <div key={dish.id}>
            {i === 0 ? <SprigDivider /> : null}
            <DishSection dish={dish} index={i} />
            {i < thanksgivingDishes.length - 1 && <SprigDivider />}
          </div>
        ))}
      </section>

      {/* Share */}
      <section className="container mx-auto px-4 max-w-4xl mt-8">
        <SharePostBar
          title={cleanTitle}
          url={
            typeof window !== "undefined"
              ? window.location.href
              : `https://misskonstruction.com/recipes/${recipe.slug}`
          }
          image={recipe.heroImage}
          description={recipe.description}
          kicker="✦ pull up a chair"
          heading="Pass the plate — share the whole spread"
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
