import { createFileRoute } from "@tanstack/react-router";
import { RecipePage } from "@/components/RecipePage";
import { getRecipe } from "@/data/recipes";

const recipe = getRecipe("shrimp-poboy")!;

export const Route = createFileRoute("/recipes/shrimp-poboy")({
  component: () => <RecipePage recipe={recipe} />,
  head: () => ({
    meta: [
      { title: `${recipe.title.replace(/\*\*/g, "")} — From the Kitchen` },
      { name: "description", content: recipe.description },
      { property: "og:title", content: recipe.title.replace(/\*\*/g, "") },
      { property: "og:description", content: recipe.description },
      { property: "og:image", content: recipe.heroImage },
      { name: "twitter:image", content: recipe.heroImage },
    ],
  }),
});
