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
import louisianaGumboImg from "@/assets/recipe-louisiana-gumbo.jpg";
import chickenDumplingsImg from "@/assets/recipe-chicken-dumplings.jpg";
import natchitochesMeatpiesImg from "@/assets/recipe-natchitoches-meatpies.jpg";
import jambalayaImg from "@/assets/recipe-jambalaya.jpg";
import slowCookerDogFoodImg from "@/assets/recipe-slow-cooker-dog-food.jpg";
import codDogFoodImg from "@/assets/recipe-cod-dog-food.jpg";

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
  /** When true, this recipe is for dogs — shown with a 🐾 paw indicator. */
  forDogs?: boolean;
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
  {
    slug: "louisiana-gumbo",
    categorySlug: "from-the-kitchen",
    kicker: "low and slow, the bayou way",
    title: "My Bad Ass **Louisiana Gumbo**",
    intro:
      "Shrimp, crawfish, boudin, and shredded chicken simmered low and slow with a deep caramel roux, gold potatoes, and a generous hand of cayenne. The kind of pot that fills the whole house and tastes even better the next day — when it bites back a little harder.",
    heroImage: louisianaGumboImg,
    heroAlt: "A steaming bowl of dark Louisiana gumbo with shrimp, sausage, and crawfish tails",
    description:
      "A slow-cooked Louisiana gumbo with shrimp, crawfish, boudin, and chicken in a deep caramel roux. Spicy, soulful, and even better the next day.",
    meta: [
      { icon: "clock", label: "Prep", value: "30 min" },
      { icon: "flame", label: "Cook", value: "2+ hr (slow cooker)" },
      { icon: "users", label: "Serves", value: "8" },
      { icon: "utensils-crossed", label: "Course", value: "Main" },
    ],
    ingredientGroups: [
      {
        title: "For the proteins",
        items: [
          "1 lb shrimp, peeled and deveined",
          "1 package boudin sausage",
          "3 large chicken breasts",
          "1 bag Louisiana crawfish tails",
        ],
      },
      {
        title: "For the pot",
        items: [
          "½ lb small gold potatoes, quartered",
          "1 large box chicken broth",
          "3 garlic cloves, minced",
          "2 bay leaves",
        ],
      },
      {
        title: "For the roux",
        items: [
          "1 cup vegetable oil",
          "1 cup white flour",
          "½ cup chopped fresh green onion",
        ],
      },
      {
        title: "Seasonings",
        items: [
          "3 tsp Worcestershire sauce",
          "2 tsp Old Bay seasoning",
          "1 tbsp onion pepper",
          "1 tbsp cayenne pepper",
          "2 tsp kosher salt (plus more to taste)",
        ],
      },
    ],
    steps: [
      {
        title: "Brown the sausage",
        body:
          "Cut the boudin sausage into ¼-inch pieces and brown them in a skillet over medium heat until the edges are crisp and rendered.",
      },
      {
        title: "Cook the chicken",
        body:
          "Shred the chicken breasts and cook them through in a skillet with a little vegetable oil. Set aside.",
      },
      {
        title: "Start the crockpot",
        body:
          "Quarter the potatoes and drop them into the crockpot. Pour in the entire box of chicken broth and turn the slow cooker on high.",
      },
      {
        title: "Add the proteins",
        body:
          "Add the shrimp, crawfish tails, cooked shredded chicken, and browned sausage to the pot. Stir gently to combine.",
      },
      {
        title: "Make the roux",
        body:
          "This part matters. Heat the vegetable oil in a medium skillet over medium-low heat for about 5 minutes. Gradually add the flour, stirring it in as you go. Add the chopped green onion and keep stirring — constantly — until the roux turns a rich, deep caramel color. Don't walk away. Don't rush it.",
      },
      {
        title: "Combine and season",
        body:
          "Stir the finished roux into the crockpot. Add the Worcestershire sauce, Old Bay, onion pepper, cayenne, kosher salt, garlic, and bay leaves while stirring everything together until the broth turns dark and silky.",
      },
      {
        title: "Slow cook",
        body:
          "Cover and cook on the slow cooker's high setting for at least 2 hours. The longer it goes, the more tender the meat and the deeper the flavor. Taste and adjust the seasoning before serving — these amounts are a starting point, not a rule.",
      },
      {
        title: "Serve it up",
        body:
          "Ladle over white rice with a hunk of crusty French bread on the side for soaking up every last drop.",
      },
    ],
    cooksNote:
      "Feel free to add or subtract the suggested seasoning amounts — mine are never exact. And save some for tomorrow: the leftovers are MUCH spicier and somehow even better the next day.",
    signOff: {
      kicker: "laissez les bons temps rouler",
      body:
        "Make a big pot, invite people over, and let it simmer while the afternoon goes by. That's the whole point.",
    },
  },
  {
    slug: "easy-chicken-and-dumplings",
    categorySlug: "from-the-kitchen",
    kicker: "the cure for a long week",
    title: "Easy **Chicken & Dumplings**",
    intro:
      "Creamy, soul-warming, and on the table in under thirty minutes. Pantry soup and canned biscuits do all the heavy lifting — pillowy dumplings simmered into a rich, savory broth with shredded chicken. The kind of weeknight shortcut that tastes like Sunday.",
    heroImage: chickenDumplingsImg,
    heroAlt: "A rustic bowl of creamy chicken and dumplings with fresh parsley",
    description:
      "An easy, creamy chicken and dumplings recipe using canned biscuits and pantry soup — comfort food on the table in under 30 minutes.",
    meta: [
      { icon: "clock", label: "Prep", value: "5 min" },
      { icon: "flame", label: "Cook", value: "20 min" },
      { icon: "users", label: "Serves", value: "6" },
      { icon: "utensils-crossed", label: "Course", value: "Main" },
    ],
    ingredientGroups: [
      {
        title: "From the pantry",
        items: [
          "2 (10.5 oz) cans condensed cream of chicken soup",
          "3 (14 oz) cans chicken broth",
          "3 cups shredded cooked chicken",
          "2 (10 oz) cans refrigerated biscuit dough",
        ],
      },
    ],
    steps: [
      {
        title: "Gather everything",
        body:
          "Pull out your ingredients and a large saucepan or Dutch oven. Having the biscuits opened and the chicken pre-shredded makes the whole thing come together fast.",
      },
      {
        title: "Build the broth",
        body:
          "Stir the condensed cream of chicken soup, chicken broth, and shredded chicken together in a large saucepan over medium-high heat. Keep stirring occasionally until the mixture begins to gently simmer.",
      },
      {
        title: "Cut and drop the dumplings",
        body:
          "Cut each refrigerated biscuit into quarters. Gently drop them into the simmering soup, stirring just enough to keep them from clumping together.",
      },
      {
        title: "Cover and simmer",
        body:
          "Reduce the heat to medium-low, cover the pot, and let everything simmer for 10 to 15 minutes — until the biscuits have puffed up and are no longer doughy in the center.",
      },
      {
        title: "Serve it warm",
        body:
          "Ladle into deep bowls, crack some fresh black pepper over the top, and serve right away while the dumplings are at their pillowy best.",
      },
    ],
    cooksNote:
      "Rotisserie chicken is a perfect shortcut here. And if the broth gets too thick as it sits, just splash in a little more chicken broth to loosen it back up.",
    signOff: {
      kicker: "easy like that",
      body:
        "Some nights call for fancy. Most nights call for this. A warm bowl, a soft couch, and not much else.",
    },
  },
  {
    slug: "natchitoches-meatpies",
    categorySlug: "from-the-kitchen",
    kicker: "passed down from my grandmother",
    title: "My Grandmother's **Natchitoches Meat Pies**",
    intro:
      "If you're not from Louisiana, you've probably never heard of these — and that's a shame. Spiced ground beef and green onion tucked inside a flaky biscuit shell, fried golden in a hot skillet. My mom passed this recipe down from my dad's mother, whom I only met once at age two. Every time I make them, a little piece of her shows up in the kitchen.",
    heroImage: natchitochesMeatpiesImg,
    heroAlt: "Golden-fried Louisiana Natchitoches meat pies on a dark wooden board, one broken open showing seasoned beef filling",
    description:
      "A family recipe for Louisiana Natchitoches meat pies — spiced ground beef and green onion fried golden in flaky biscuit dough. Passed down through three generations.",
    meta: [
      { icon: "clock", label: "Prep", value: "20 min + chill" },
      { icon: "flame", label: "Cook", value: "15 min" },
      { icon: "users", label: "Serves", value: "8 pies" },
      { icon: "utensils-crossed", label: "Course", value: "Appetizer / Main" },
    ],
    ingredientGroups: [
      {
        title: "For the filling",
        items: [
          "1 lb lean ground beef",
          "½ cup chopped green onion",
          "1½ tbsp flour",
          "Garlic powder (or 1 fresh garlic clove, minced)",
          "Cayenne pepper, to taste",
          "2 tbsp water",
          "Salt and pepper, to taste",
        ],
      },
      {
        title: "For the shell",
        items: [
          "1 can refrigerated jumbo biscuits",
          "Vegetable oil, for frying",
        ],
      },
    ],
    steps: [
      {
        title: "Brown the filling",
        body:
          "In a skillet over medium heat, brown the ground beef together with the green onion, flour, garlic powder, cayenne, water, salt, and pepper. Cook until the meat is fully done and the mixture is well combined and slightly thickened.",
      },
      {
        title: "Chill the meat",
        body:
          "Transfer the cooked filling to a bowl and let it chill in the refrigerator. Cooling it down makes the pies much easier to fill and seal — don't skip this step.",
      },
      {
        title: "Roll out the biscuits",
        body:
          "Open the can of jumbo biscuits and roll each one out flat with a rolling pin. (Or in my case, a glass bottle when I forgot to grab the rolling pin earlier — it works just fine.)",
      },
      {
        title: "Fill and fold",
        body:
          "Spoon a generous portion of the chilled meat onto one side of each rolled biscuit. Fold over like a taco, then press and crimp the edges firmly with the tines of a fork to seal.",
      },
      {
        title: "Fry until golden",
        body:
          "Heat oil in a skillet until hot but not smoking. Fry the meat pies a few at a time, browning each side until deeply golden and crisp. Drain on paper towels and serve hot.",
      },
    ],
    cooksNote:
      "These have a rich history — Natchitoches is a small Louisiana town that takes its meat pies seriously. Don't be afraid of the cayenne; that little kick is what makes them feel like home.",
    signOff: {
      kicker: "from her kitchen to mine",
      body:
        "Some recipes are more than food — they're a way of keeping people close. ENJOY!!",
    },
  },
  {
    slug: "moms-jambalaya",
    categorySlug: "from-the-kitchen",
    kicker: "the way mom always made it",
    title: "Mom's **Jambalaya**",
    intro:
      "One pot, a deep red simmer, and just about every good thing Louisiana has to offer — chicken, sausage, shrimp, and long-grain rice soaking up all that tomato and Old Bay. The kind of dinner that fills the house with the smell of home before you even sit down.",
    heroImage: jambalayaImg,
    heroAlt: "A rustic cast-iron pot of Louisiana jambalaya with shrimp, sausage, chicken, and green onions",
    description:
      "A classic Louisiana jambalaya — chicken, sausage, and shrimp simmered with long-grain rice, crushed tomatoes, and Old Bay. Mom's one-pot recipe.",
    meta: [
      { icon: "clock", label: "Prep", value: "15 min" },
      { icon: "flame", label: "Cook", value: "35 min" },
      { icon: "users", label: "Serves", value: "6" },
      { icon: "utensils-crossed", label: "Course", value: "Main" },
    ],
    ingredientGroups: [
      {
        title: "The base",
        items: [
          "1 tbsp extra-virgin olive oil",
          "1 onion, chopped",
          "2 bell peppers, chopped",
          "Kosher salt and freshly ground black pepper",
          "1 tsp dried oregano",
          "2 cloves garlic, minced",
          "2 tbsp tomato paste",
        ],
      },
      {
        title: "The proteins",
        items: [
          "1 rotisserie chicken, shredded",
          "6 oz sausage, sliced",
          "1 lb medium shrimp, peeled and deveined (or 12 oz crawfish tails)",
        ],
      },
      {
        title: "The pot",
        items: [
          "2 cups chicken stock",
          "1 (15 oz) can crushed tomatoes",
          "1 cup long-grain rice",
          "2 tsp Old Bay seasoning",
          "2 green onions, sliced",
        ],
      },
    ],
    steps: [
      {
        title: "Sweat the trinity",
        body:
          "In a large pot over medium heat, warm the olive oil. Add the onion and bell peppers, season with salt and pepper, and cook until softened, about 5 minutes.",
      },
      {
        title: "Build the flavor",
        body:
          "Stir in the shredded rotisserie chicken and season with another pinch of salt, pepper, and the oregano. Cook for about 5 minutes, then add the sausage, garlic, and tomato paste. Cook until everything turns deep and fragrant, about 1 minute more.",
      },
      {
        title: "Simmer the rice",
        body:
          "Pour in the chicken stock, crushed tomatoes, rice, and Old Bay. Stir well, reduce heat to medium-low, and cover with a tight-fitting lid. Cook until the rice is tender and most of the liquid is absorbed, about 20 minutes.",
      },
      {
        title: "Add the shellfish",
        body:
          "Stir in the shrimp (or crawfish tails) and cook just until the shrimp turn pink and curl, 2 to 5 minutes. Don't walk away — they cook fast.",
      },
      {
        title: "Finish and serve",
        body:
          "Stir in the sliced green onions right before serving so they stay bright and fresh. Ladle into bowls and serve straight from the pot.",
      },
    ],
    cooksNote:
      "A rotisserie chicken from the grocery store keeps this a true weeknight one-pot. If you like a little more heat, a few dashes of hot sauce at the end never hurt anybody.",
    signOff: {
      kicker: "thanks, mom",
      body:
        "Some recipes you cook. Others you inherit. This one's both — and it tastes better every time you make it.",
    },
  },
  {
    slug: "slow-cooker-homemade-dog-food",
    categorySlug: "from-the-kitchen",
    forDogs: true,
    kicker: "made with love, for the pups 🐾",
    title: "Slow Cooker **Homemade Dog Food**",
    intro:
      "A wholesome, vet-friendly bowl for the four-legged loves of my life — lean turkey or chicken slow-simmered with brown rice, sweet potato, and garden vegetables. No salt, no onions, no garlic — just real food that makes tails wag and bellies happy.",
    heroImage: slowCookerDogFoodImg,
    heroAlt: "A rustic bowl of homemade slow cooker dog food with turkey, brown rice, sweet potato, carrots, green beans, and peas",
    description:
      "An easy slow-cooker homemade dog food recipe with turkey or chicken, brown rice, sweet potato, and vegetables — plus optional senior and puppy add-ins.",
    meta: [
      { icon: "clock", label: "Prep", value: "15 min" },
      { icon: "flame", label: "Cook", value: "6–7 hr (low)" },
      { icon: "users", label: "Makes", value: "~1 week" },
      { icon: "utensils-crossed", label: "For", value: "Dogs 🐾" },
    ],
    ingredientGroups: [
      {
        title: "The base",
        items: [
          "2–3 lbs ground turkey or chicken",
          "1 cup brown rice",
          "½ cup quinoa",
          "1 large sweet potato, cubed",
          "1 cup carrots, chopped",
          "1 cup green beans (fresh or frozen)",
          "½ cup peas",
          "1 cup spinach",
          "1 zucchini, chopped",
          "1 raw egg",
          "4 cups water or unsalted chicken broth",
        ],
      },
      {
        title: "Stir in at the end",
        items: [
          "1 tbsp olive oil or fish oil",
          "1 tsp ground eggshell powder (for calcium)",
        ],
      },
      {
        title: "Optional nutrition boosters",
        items: [
          "Blueberries",
          "Pumpkin (plain puree)",
          "Sardines in water",
          "Plain Greek yogurt",
          "Chopped spinach",
        ],
      },
      {
        title: "For senior dogs (joint support add-ins)",
        items: [
          "Fish oil (omega-3 for joints)",
          "A pinch of turmeric (anti-inflammatory)",
          "Plain pumpkin (easy digestion)",
          "Ground eggshell powder (calcium)",
          "Sardines in water (1–2 a week)",
          "Bone broth",
          "Green-lipped mussel powder (optional)",
        ],
      },
      {
        title: "For young dogs (extra growth fuel)",
        items: [
          "About 25% more meat than a senior portion",
          "1 egg a few times per week",
          "Fish oil or olive oil",
          "Cottage cheese",
          "Plain Greek yogurt",
          "Blueberries",
        ],
      },
    ],
    steps: [
      {
        title: "Layer the slow cooker",
        body:
          "Add the ground turkey or chicken to the slow cooker, followed by the brown rice and all of the chopped vegetables.",
      },
      {
        title: "Add the liquid",
        body:
          "Pour in the water or unsalted chicken broth and stir everything together so the rice and vegetables are evenly distributed.",
      },
      {
        title: "Slow cook",
        body:
          "Cover and cook on low for 6–7 hours, or on high for 3–4 hours, until the meat is fully cooked, the rice is tender, and the sweet potato is soft.",
      },
      {
        title: "Break it up",
        body:
          "Stir well, breaking up the ground meat with a spoon so there are no big clumps. Make sure everything is mixed evenly.",
      },
      {
        title: "Cool and finish",
        body:
          "Let the food cool completely before serving. Once cool, mix in the olive oil or fish oil and the ground eggshell powder for calcium.",
      },
      {
        title: "Portion and serve",
        body:
          "Serve based on your dog's size — small dogs ½–1 cup per meal, medium dogs 1–1½ cups, large dogs 2–3 cups. Refrigerate leftovers up to 4 days, or freeze portions for 2–3 months.",
      },
      {
        title: "Bonus: joint support gravy for seniors",
        body:
          "Warm 2 cups unsalted bone broth in a saucepan (don't boil). Mash in 1 small can of drained sardines in water, then stir in ½ tsp turmeric, ½ tsp ground ginger, 1 tbsp plain pumpkin puree, and (optional) a pinch of black pepper to help turmeric absorption. Simmer gently for 5 minutes, remove from heat, and stir in 1 tsp fish oil. Blend smooth if you like. Spoon 2–4 tablespoons over your senior dog's food at mealtime — it keeps in the fridge up to 5 days, or freeze in ice cube trays for easy portions.",
      },
    ],
    cooksNote:
      "⚠️ Never season dog food with salt, onions, or garlic — those can be harmful. Senior dogs do best with two smaller meals a day and slightly fewer calories to ease the hips. Warming their bowl slightly and adding a splash of bone broth makes everything easier to eat and digest.",
    signOff: {
      kicker: "wag, wag 🐾",
      body:
        "Made with love for the pups who follow us from kitchen to porch and back again. As always — check with your vet before any big diet changes, especially for puppies, seniors, or dogs with health conditions.",
    },
  },
  {
    slug: "slow-cooker-cod-dog-food",
    categorySlug: "from-the-kitchen",
    forDogs: true,
    kicker: "made with love, for the pups 🐾",
    title: "Slow Cooker **Cod Dog Food**",
    intro:
      "A lighter, fish-forward bowl for the pups — flaky cod simmered low and slow with white rice, sweet potato, broccoli, and a little fresh rosemary. No salt, no onions, no garlic — just clean, gentle nourishment for happy bellies and shiny coats.",
    heroImage: codDogFoodImg,
    heroAlt: "A rustic bowl of homemade slow cooker cod dog food with white rice, sweet potato, broccoli, carrots, green beans, peas, spinach, and fresh rosemary",
    description:
      "An easy slow-cooker homemade dog food recipe with cod, white rice, sweet potato, broccoli, and garden vegetables — a fish-based variation for variety.",
    meta: [
      { icon: "clock", label: "Prep", value: "15 min" },
      { icon: "flame", label: "Cook", value: "6–7 hr (low)" },
      { icon: "users", label: "Makes", value: "~1 week" },
      { icon: "utensils-crossed", label: "For", value: "Dogs 🐾" },
    ],
    ingredientGroups: [
      {
        title: "The base",
        items: [
          "3 lbs cod fillets (boneless, skinless)",
          "1 cup white rice",
          "1 large sweet potato, cubed",
          "1 cup carrots, chopped",
          "1 cup broccoli florets, chopped",
          "1 cup green beans (fresh or frozen)",
          "½ cup peas",
          "1 cup spinach",
          "1 raw egg",
          "1 tsp fresh rosemary, finely chopped (or ½ tsp dried)",
          "4 cups water or unsalted chicken broth",
        ],
      },
      {
        title: "Stir in at the end",
        items: [
          "1 tbsp olive oil",
          "1 tsp ground eggshell powder (for calcium)",
        ],
      },
      {
        title: "Optional nutrition boosters",
        items: [
          "Blueberries",
          "Pumpkin (plain puree)",
          "Plain Greek yogurt",
          "Chopped spinach",
        ],
      },
      {
        title: "For senior dogs (joint support add-ins)",
        items: [
          "A pinch of turmeric (anti-inflammatory)",
          "Plain pumpkin (easy digestion)",
          "Ground eggshell powder (calcium)",
          "Bone broth",
        ],
      },
      {
        title: "For young dogs (extra growth fuel)",
        items: [
          "About 25% more cod than a senior portion",
          "1 egg a few times per week",
          "Olive oil",
          "Cottage cheese",
          "Plain Greek yogurt",
          "Blueberries",
        ],
      },
    ],
    steps: [
      {
        title: "Layer the slow cooker",
        body:
          "Add the cod fillets to the slow cooker, followed by the white rice and all of the chopped vegetables. Sprinkle the rosemary over the top.",
      },
      {
        title: "Add the liquid",
        body:
          "Pour in the water or unsalted chicken broth and stir gently so the rice and vegetables are evenly distributed around the fish.",
      },
      {
        title: "Slow cook",
        body:
          "Cover and cook on low for 6–7 hours, or on high for 3–4 hours, until the cod flakes easily, the rice is tender, and the sweet potato is soft.",
      },
      {
        title: "Flake it up",
        body:
          "Stir well, breaking the cod into small flakes with a spoon and checking carefully for any stray bones. Make sure everything is mixed evenly.",
      },
      {
        title: "Cool and finish",
        body:
          "Let the food cool completely before serving. Once cool, mix in the olive oil, ground eggshell powder, and the raw egg for an extra protein and nutrient boost.",
      },
      {
        title: "Portion and serve",
        body:
          "Serve based on your dog's size — small dogs ½–1 cup per meal, medium dogs 1–1½ cups, large dogs 2–3 cups. Refrigerate leftovers up to 4 days, or freeze portions for 2–3 months.",
      },
    ],
    cooksNote:
      "⚠️ Never season dog food with salt, onions, or garlic — those can be harmful. Always double-check cod for tiny pin bones before serving. This fish-based bowl is a nice rotation from the turkey or chicken version — variety keeps mealtime interesting and balances nutrients across the week.",
    signOff: {
      kicker: "wag, wag 🐾",
      body:
        "A little something different for the pups who deserve the world. As always — check with your vet before any big diet changes, especially for puppies, seniors, or dogs with health conditions.",
    },
  },
];

export function getRecipe(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

export function getRecipesByCategory(categorySlug: string): Recipe[] {
  return recipes.filter((r) => r.categorySlug === categorySlug);
}
