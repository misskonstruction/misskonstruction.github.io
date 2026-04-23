/**
 * Recipe registry.
 *
 * To add a new recipe:
 *   1. Add an entry below with a unique `slug`.
 *   2. Drop the hero image into `src/assets/recipe-{slug}.jpg` (or AI-generated).
 *   3. Create a route file `src/routes/recipes.{slug}.tsx` that renders
 *      <RecipePage recipe={getRecipe("{slug}")!} />.
 *
 * The blog category page automatically lists every recipe whose
 * `categorySlug` matches, and the entry counts on the journal index
 * pick this up too.
 */

import shrimpPoboyImg from "@/assets/recipe-shrimp-poboy.jpg";
import glazedSalmonImg from "@/assets/recipe-glazed-salmon.jpg";

export type IngredientGroup = {
  title: string;
  items: string[];
};

export type RecipeStep = {
  title: string;
  body: string;
};

export type RecipeMetaItem = {
  /** Lucide icon name as it appears on lucide.dev (kebab-case). */
  icon: "clock" | "flame" | "users" | "utensils-crossed";
  label: string;
  value: string;
};

export type Recipe = {
  /** URL slug — also the route filename. */
  slug: string;
  /** Which blog category this recipe lives under (e.g. "from-the-kitchen"). */
  categorySlug: string;
  /** Short kicker above the title in handwriting font. */
  kicker: string;
  /**
   * Title with optional emphasis. The substring inside `**...**` is
   * rendered in primary color italic — like the original po'boy hero.
   */
  title: string;
  /** Optional second line below the title (e.g. "with Homemade Remoulade"). */
  subtitle?: string;
  /** Italic intro paragraph under the hero. */
  intro: string;
  /** Hero image import. */
  heroImage: string;
  /** Alt text for the hero image. */
  heroAlt: string;
  /** Meta strip: prep/cook/serves/course (or whatever fits). */
  meta: RecipeMetaItem[];
  ingredientGroups: IngredientGroup[];
  steps: RecipeStep[];
  /** Optional handwritten "cook's note" callout under the steps. */
  cooksNote?: string;
  /** Sign-off block at the bottom. */
  signOff: {
    /** Big handwritten line, e.g. "bon appétit, y'all". */
    kicker: string;
    /** Italic invitation line below it. */
    body: string;
  };
  /** SEO meta description. */
  description: string;
};

export const recipes: Recipe[] = [
  {
    slug: "shrimp-poboy",
    categorySlug: "from-the-kitchen",
    kicker: "a little taste of New Orleans",
    title: "Crispy Cajun **Shrimp Po'Boy**",
    subtitle: "with Homemade Remoulade",
    intro:
      "Buttermilk-marinated shrimp fried golden in a cornmeal crust, piled high on toasted French bread with cool, tangy remoulade. The kind of sandwich that asks for a porch, a paper towel, and a slow afternoon.",
    heroImage: shrimpPoboyImg,
    heroAlt: "Crispy Cajun shrimp po'boy on toasted French bread with remoulade",
    description:
      "A New Orleans classic — buttermilk-marinated shrimp fried golden, piled on toasted French bread with a tangy homemade remoulade.",
    meta: [
      { icon: "clock", label: "Prep", value: "20 min" },
      { icon: "flame", label: "Cook", value: "15 min" },
      { icon: "users", label: "Serves", value: "4" },
      { icon: "utensils-crossed", label: "Course", value: "Sandwich" },
    ],
    ingredientGroups: [
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
    ],
    steps: [
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
    ],
    cooksNote:
      "Make the remoulade the day before if you can — it's worth the wait. And don't skip toasting the bread in butter; that crisp shell against the soft inside is half the magic of a real po'boy.",
    signOff: {
      kicker: "bon appétit, y'all",
      body:
        "If you make this one, I'd love to hear about it. Tag me, write me, or just sit on the porch and enjoy every bite.",
    },
  },
  {
    slug: "sweet-and-spicy-glazed-salmon",
    categorySlug: "from-the-kitchen",
    kicker: "weeknight magic, sticky and bright",
    title: "Sweet and Spicy **Glazed Salmon**",
    intro:
      "Salmon fillets bathed in a soy, brown sugar, and red wine vinegar marinade, then broiled until the glaze turns deep and lacquered. The leftover marinade reduces into a glossy sauce you'll want to spoon over everything on the plate.",
    heroImage: glazedSalmonImg,
    heroAlt: "Sweet and spicy glazed salmon fillets on a dark plate with green onions and lemon",
    description:
      "Broiled salmon with a sticky soy, brown sugar, and red wine vinegar glaze — bright, savory, and ready in under 25 minutes (after a good marinade soak).",
    meta: [
      { icon: "clock", label: "Prep", value: "10 min + 2 hr marinade" },
      { icon: "flame", label: "Cook", value: "10–15 min" },
      { icon: "users", label: "Serves", value: "4–6" },
      { icon: "utensils-crossed", label: "Course", value: "Main" },
    ],
    ingredientGroups: [
      {
        title: "For the salmon",
        items: [
          "4 to 6 fresh salmon fillets",
          "Salt and ground black pepper, to taste",
          "Chopped green onion and parsley, to finish",
        ],
      },
      {
        title: "For the marinade",
        items: [
          "¼ cup red wine vinegar",
          "¼ cup olive oil",
          "¼ cup soy sauce",
          "¼ cup water",
          "1 tbsp lemon juice",
          "⅓ cup brown sugar",
          "½ tsp onion powder",
          "½ tsp garlic powder",
        ],
      },
    ],
    steps: [
      {
        title: "Marinate the salmon",
        body:
          "Place the salmon fillets in a shallow, flat dish and set aside. In a medium-large bowl, whisk together the red wine vinegar, olive oil, soy sauce, water, lemon juice, brown sugar, onion powder, and garlic powder until the sugar dissolves. Pour over the salmon, cover, and refrigerate for about 2 hours.",
      },
      {
        title: "Prep the pan",
        body:
          "Line a broiling pan with foil. Lift the salmon out of the marinade and lay the fillets on the pan, then season to taste with salt and pepper. Pour the remaining marinade into a small saucepan — you'll cook it down for the sauce.",
      },
      {
        title: "Heat the broiler",
        body:
          "Turn the broiler on to low and let it come up to temperature while you finish prepping.",
      },
      {
        title: "Broil and baste",
        body:
          "Broil the salmon about 6 inches from the heat for 5 minutes, then brush generously with the marinade. Continue broiling for another 5–10 minutes, brushing periodically, until the salmon is no longer bright red and flakes easily with a fork.",
      },
      {
        title: "Reduce the sauce",
        body:
          "While the salmon broils, simmer the reserved marinade over low heat for 5–10 minutes, until it thickens slightly and reduces. Use it as a dipping sauce — or do like we do and spoon it over everything on the plate.",
      },
      {
        title: "Finish and serve",
        body:
          "Scatter chopped green onion and parsley over the top, drizzle with the warm glaze, and serve right away while the lacquer is still glossy.",
      },
    ],
    cooksNote:
      "Don't skip the full 2-hour marinade — that's where the depth comes from. And keep a close eye under the broiler; the brown sugar can go from beautifully caramelized to charred in about a minute.",
    signOff: {
      kicker: "easy does it",
      body:
        "Serve it over rice, with greens, or just straight off the foil. However you plate it, that sticky glaze does the heavy lifting.",
    },
  },
];

export function getRecipe(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

export function getRecipesByCategory(categorySlug: string): Recipe[] {
  return recipes.filter((r) => r.categorySlug === categorySlug);
}
