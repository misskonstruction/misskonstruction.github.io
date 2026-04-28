/**
 * Thanksgiving Table — a single holiday post containing every dish
 * we make every year. Rendered by /recipes/thanksgiving-table as one
 * long page with botanical sprig dividers between dishes.
 */

import thanksgivingHero from "@/assets/recipe-thanksgiving-table.jpg";
import dishCornishHens from "@/assets/thanksgiving/dish-cornish-hens.jpg";
import dishGreenBeanCasserole from "@/assets/thanksgiving/dish-green-bean-casserole.jpg";
import dishSweetPotato from "@/assets/thanksgiving/dish-sweet-potato.jpg";
import dishMacAndCheese from "@/assets/thanksgiving/dish-mac-and-cheese.jpg";
import dishGlazedHam from "@/assets/thanksgiving/dish-glazed-ham.jpg";

export type ThanksgivingDish = {
  /** Anchor id for the in-page jump menu (kebab-case). */
  id: string;
  /** Display name. */
  name: string;
  /** Short italic intro under the dish name. */
  intro?: string;
  /** Optional honest aside in handwriting font. */
  note?: string;
  /** Small square thumbnail shown under the ingredients list. */
  image?: string;
  ingredientGroups: { title?: string; items: string[] }[];
  steps: string[];
};

export const thanksgivingHeroImage = thanksgivingHero;

export const thanksgivingDishes: ThanksgivingDish[] = [
  {
    id: "roasted-cornish-hens",
    name: "Roasted Cornish Hens",
    intro:
      "Our main — herb-rubbed Cornish hens roasted over a bed of onion, garlic, lemon, and rosemary. Crispy skin, juicy meat, and pan drippings worth fighting over.",
    note:
      "Smoked paprika is my secret weapon — it packs so much more flavor than regular paprika.",
    image: dishCornishHens,
    ingredientGroups: [
      {
        title: "For the hens",
        items: [
          "2 Cornish hens (about 1.5 lbs each)",
          "Fresh rosemary and thyme sprigs",
          "1 yellow onion, sliced (more or less to taste)",
          "1 head of garlic, cloves smashed",
          "1 lemon, sliced",
          "Olive oil (or avocado, safflower, sunflower, or vegetable oil)",
        ],
      },
      {
        title: "For the dry rub",
        items: [
          "Salt and pepper, to taste",
          "Italian seasoning (no-salt-added blend, if you can find it)",
          "Smoked paprika",
          "Red pepper flakes (more, less, or none — your call)",
        ],
      },
    ],
    steps: [
      "Prep the hens: combine all the dry rub ingredients in a small bowl. Pat the hens dry with paper towel and season generously with the dry rub, both inside and out.",
      "Preheat the oven to 425°F.",
      "Build the bed: scatter the fresh herbs, garlic, onion, and half the lemon slices across the bottom of the roasting pan — this is your au naturale roasting rack.",
      "Place the hens on top of the bed and drizzle olive oil all over them.",
      "Roast, uncovered, for 50 minutes — or until an instant-read thermometer registers 165°F in the thickest part of the breast.",
      "Let the hens rest for a full 20 minutes before serving. Don't skip this — that's where the juices settle.",
      "To serve: a whole hen per person is a lot of meat (especially with hens closer to 2 lbs). I like to halve them after resting — sharp long knife, cleaver, or kitchen shears work. Slice between the breasts with steady, intentional pressure all the way through.",
      "Serve over the remaining lemon slices, garnish with any leftover fresh herbs, and spoon those pan drippings over everything.",
    ],
  },
  {
    id: "green-bean-casserole",
    name: "Green Bean Casserole",
    intro:
      "The one dish nobody on the table will let me skip. Creamy, peppery, crowned with crispy fried onions.",
    note:
      "I detest mushrooms — and until I discovered cream of chicken as a stand-in, I never enjoyed this dish. But you do you.",
    image: dishGreenBeanCasserole,
    ingredientGroups: [
      {
        items: [
          "2 cans green beans, drained",
          "1 can cream of chicken soup (or cream of mushroom, if you must)",
          "1 dash garlic powder",
          "1 cup milk",
          "1 tsp Worcestershire sauce",
          "1 bag French fried onions",
          "Salt and pepper, to taste",
        ],
      },
    ],
    steps: [
      "Pre-heat oven to 350°F.",
      "In a medium bowl, stir the soup and milk together until smooth.",
      "Mix in the green beans, salt, pepper, garlic powder, Worcestershire sauce, and half the bag of French fried onions.",
      "Pour into a 9-inch square baking pan and bake uncovered for 30 minutes.",
      "Top with the remaining onions and bake 5 minutes more, uncovered, until the onions are deep golden.",
    ],
  },
  {
    id: "marcelos-sweet-potato-pie",
    name: "Marcelo's Sweet Potato Pie",
    intro:
      "Soft, brown-sugary sweet potatoes baked under a buttery pecan crumble — the way Marcelo taught me.",
    image: dishSweetPotato,
    ingredientGroups: [
      {
        title: "For the sweet potatoes",
        items: [
          "6 medium-to-large sweet potatoes, peeled and cubed",
          "2 large eggs, beaten",
          "½ cup packed brown sugar",
          "½ cup milk",
          "⅓ cup softened butter",
          "½ tsp vanilla extract",
          "¾ cup chopped pecans",
          "2 cups marshmallows (optional, if you like the toasted top)",
          "Pinch of salt",
        ],
      },
      {
        title: "For the pecan topping",
        items: [
          "½ cup packed brown sugar",
          "⅓ cup all-purpose flour",
          "3 tbsp softened butter",
          "½ cup chopped pecans",
        ],
      },
    ],
    steps: [
      "Preheat oven to 350°F (165°C).",
      "Put the cubed sweet potatoes in a medium saucepan and cover with water. Cook over medium-high heat until tender, 10 to 15 minutes. Drain and transfer to a large bowl.",
      "Mash the sweet potatoes with a fork. Add the beaten eggs and mix until well combined. Add the brown sugar, milk, butter, vanilla, and a pinch of salt; mix until smooth. Transfer to a 9×13-inch baking dish.",
      "Make the topping: in a medium bowl, mix the brown sugar and flour. Cut in the softened butter with a pastry cutter until the mixture is coarse and looks like peas — don't overmix. Stir in the chopped pecans.",
      "Sprinkle the topping evenly over the sweet potato mixture (and the marshmallows on top, if using).",
      "Bake at 350°F for about 30 minutes, until the topping is golden and the marshmallows are toasted.",
    ],
  },
  {
    id: "southern-mac-and-cheese",
    name: "Southern Mac & Cheese Casserole",
    intro:
      "Old Bay-spiked cheese sauce, layered noodles, panko butter crumb topping. The pan that disappears first.",
    image: dishMacAndCheese,
    ingredientGroups: [
      {
        title: "For the casserole",
        items: [
          "3 cups uncooked elbow macaroni",
          "4 tbsp salted butter, melted",
          "3 tbsp all-purpose flour",
          "3½ cups half & half",
          "2 tsp Old Bay seasoning",
          "1 tsp ground black pepper",
          "2 cups sharp cheddar cheese, shredded (divided)",
          "2 cups mozzarella cheese, shredded",
        ],
      },
      {
        title: "For the crunchy panko topping",
        items: [
          "½ cup Italian panko breadcrumbs",
          "2 tbsp salted butter, melted",
        ],
      },
    ],
    steps: [
      "Bring a large pot of salted water to a boil. Add 3 cups of elbow macaroni and cook until firm but not overdone. Drain.",
      "While the pasta cooks, melt 4 tablespoons of salted butter in a large saucepan over medium heat. Sprinkle in 3 tablespoons of flour and whisk until smooth and lump-free.",
      "Pour in the half & half and whisk until silky. Let it simmer until it starts to thicken, then reduce the heat to medium-low.",
      "Add 1 cup of the shredded sharp cheddar and stir until fully melted. Sprinkle in the Old Bay and black pepper.",
      "Place the drained macaroni in a large bowl, then fold the cheese sauce in batches until everything is well coated.",
      "Butter or grease a 9×13 casserole dish. Combine the remaining 1 cup of sharp cheddar with the 2 cups of mozzarella in a separate bowl.",
      "Layer half the mac in the dish, top with a heavy layer of the cheese mixture, then repeat with the rest.",
      "In a small bowl, mix the panko with 2 tablespoons of melted butter and sprinkle over the top.",
      "Bake uncovered at 350°F for 25–30 minutes, until bubbling and the topping is deep golden.",
    ],
  },
  {
    id: "double-glazed-spiral-ham",
    name: "Double-Glazed Brown Sugar Spiral Ham",
    intro:
      "We buy the pre-cooked ham that comes with the glaze packet. Not gonna lie — these directions came straight off the box, and they don't miss.",
    image: dishGlazedHam,
    ingredientGroups: [
      {
        items: [
          "1 pre-cooked spiral-cut ham (with glaze packet)",
          "Heavy-duty foil",
        ],
      },
    ],
    steps: [
      "Remove all packaging from the ham and cover tightly with foil.",
      "Warm at 325°F for 10–12 minutes per pound.",
      "Take the ham out of the oven and turn it up to broil.",
      "Remove the foil and carefully turn the ham onto its side, fanning the slices open.",
      "Baste liberally with the juices from the pan, then sprinkle the glaze powder generously over the entire surface and in between the slices.",
      "Place the ham back in the oven, uncovered, and broil until the glaze is bubbly and melted to a golden bronze color.",
      "DO NOT OVERCOOK — this takes less than 5 minutes under the broiler. Watch it the whole time.",
    ],
  },
];
