import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowLeft, Clock, Flame, Users, UtensilsCrossed } from "lucide-react";
import heroImg from "@/assets/recipe-shrimp-poboy.jpg";

export const Route = createFileRoute("/recipes/shrimp-poboy")({
  component: ShrimpPoboyRecipe,
  head: () => ({
    meta: [
      { title: "Crispy Cajun Shrimp Po'Boy with Remoulade — From the Kitchen" },
      {
        name: "description",
        content:
          "A New Orleans classic — buttermilk-marinated shrimp fried golden, piled on toasted French bread with a tangy homemade remoulade.",
      },
      { property: "og:title", content: "Crispy Cajun Shrimp Po'Boy with Remoulade" },
      {
        property: "og:description",
        content:
          "A New Orleans classic — buttermilk-marinated shrimp fried golden, piled on toasted French bread with a tangy homemade remoulade.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
});

const meta = [
  { icon: Clock, label: "Prep", value: "20 min" },
  { icon: Flame, label: "Cook", value: "15 min" },
  { icon: Users, label: "Serves", value: "4" },
  { icon: UtensilsCrossed, label: "Course", value: "Sandwich" },
];

const ingredientGroups = [
  {
    title: "For the fried shrimp",
    items: [
      "1 lb medium or large shrimp, peeled and deveined",
      "1 cup buttermilk",
      "1 tbsp hot sauce (Tabasco or Crystal)",
      "1 cup cornmeal",
      "½ cup all-purpose flour",
      "2 tbsp Cajun or Creole seasoning, divided",
      "Vegetable or peanut oil, for frying",
    ],
  },
  {
    title: "For the sandwich",
    items: [
      "4 soft French bread or hoagie rolls",
      "Shredded iceberg lettuce",
      "Tomato slices",
      "Sliced dill pickles",
    ],
  },
  {
    title: "For the remoulade sauce",
    items: [
      "1 cup mayonnaise",
      "1 tbsp Creole mustard or Dijon mustard",
      "1 tsp hot sauce",
      "1 tsp Worcestershire sauce",
      "1 tbsp lemon juice",
      "1 tsp prepared horseradish",
      "1 garlic clove, minced",
      "½ tsp paprika",
      "Salt and pepper to taste",
    ],
  },
];

const steps = [
  {
    title: "Make the remoulade",
    body:
      "In a small bowl, whisk together all the remoulade ingredients. Season with salt and pepper to taste. For the best flavor, let the sauce sit in the refrigerator for at least 30 minutes — it gets better the longer it rests.",
  },
  {
    title: "Marinate the shrimp",
    body:
      "Toss the peeled shrimp with 1 tablespoon of Cajun seasoning. In a medium bowl, combine the buttermilk and hot sauce. Add the seasoned shrimp and let them marinate for 10–15 minutes in the refrigerator.",
  },
  {
    title: "Prepare the breading",
    body:
      "In a shallow dish, mix the cornmeal, flour, and the remaining 1 tablespoon of Cajun seasoning until evenly combined.",
  },
  {
    title: "Heat the oil",
    body:
      "Pour 2–3 inches of oil into a deep pot or heavy skillet and heat to 350°F. A pinch of breading should sizzle gently when it hits the oil.",
  },
  {
    title: "Bread the shrimp",
    body:
      "Lift the shrimp from the buttermilk, letting the excess drip off, then dredge in the cornmeal mixture, pressing gently so it sticks. Place the breaded shrimp on a wire rack while you work in batches.",
  },
  {
    title: "Fry until golden",
    body:
      "Fry the shrimp in batches for 2–3 minutes, until golden brown and crispy. Don't overcrowd the pan. Remove with a slotted spoon and rest on a paper-towel-lined plate to drain.",
  },
  {
    title: "Assemble the po'boy",
    body:
      "Slice the French bread rolls lengthwise and — for extra crunch — toast them lightly in a pan with butter. Spread a generous layer of remoulade on both sides, then layer shredded lettuce, tomato slices, and pickles on the bottom half. Pile the crispy shrimp on top, close the sandwich, press gently, and serve immediately.",
  },
];

function ShrimpPoboyRecipe() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Crispy Cajun shrimp po'boy on toasted French bread with remoulade"
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
        </div>

        <div className="relative container mx-auto px-4 pt-20 pb-16 md:pt-28 md:pb-24 max-w-4xl text-center">
          <Link
            to="/blog/$category"
            params={{ category: "from-the-kitchen" }}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span style={{ fontFamily: "var(--font-journal)" }}>From the Kitchen</span>
          </Link>

          <p
            className="text-primary text-2xl md:text-3xl mb-2"
            style={{ fontFamily: "var(--font-hand)" }}
          >
            a little taste of New Orleans
          </p>
          <h1
            className="text-4xl md:text-6xl text-foreground leading-tight"
            style={{ fontFamily: "var(--font-journal)", fontWeight: 400 }}
          >
            Crispy Cajun <em className="text-primary">Shrimp Po'Boy</em>
            <br />
            with Homemade Remoulade
          </h1>
          <div className="mx-auto mt-6 mb-6 h-px w-20 bg-primary/60" />
          <p
            className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed"
            style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
          >
            Buttermilk-marinated shrimp fried golden in a cornmeal crust, piled high on toasted French
            bread with cool, tangy remoulade. The kind of sandwich that asks for a porch, a paper towel,
            and a slow afternoon.
          </p>
        </div>
      </section>

      {/* Meta strip */}
      <section className="border-b border-border bg-card/30">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {meta.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="flex items-center gap-3 justify-center md:justify-start">
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
            <h2
              className="text-3xl md:text-4xl mb-8"
              style={{ fontFamily: "var(--font-journal)" }}
            >
              Ingredients
            </h2>

            <div className="space-y-8">
              {ingredientGroups.map((group) => (
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
            <h2
              className="text-3xl md:text-4xl mb-8"
              style={{ fontFamily: "var(--font-journal)" }}
            >
              Instructions
            </h2>

            <ol className="space-y-8">
              {steps.map((step, i) => (
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
                  </div>
                </li>
              ))}
            </ol>

            {/* Cook's note */}
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
                Make the remoulade the day before if you can — it's worth the wait. And don't skip toasting
                the bread in butter; that crisp shell against the soft inside is half the magic of a real po'boy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sign-off */}
      <section className="border-t border-border bg-card/30">
        <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
          <p
            className="text-primary text-3xl mb-3"
            style={{ fontFamily: "var(--font-hand)" }}
          >
            bon appétit, y'all
          </p>
          <p
            className="text-muted-foreground text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-journal)", fontStyle: "italic" }}
          >
            If you make this one, I'd love to hear about it. Tag me, write me, or just sit on the porch
            and enjoy every bite.
          </p>
          <Link
            to="/blog/$category"
            params={{ category: "from-the-kitchen" }}
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
