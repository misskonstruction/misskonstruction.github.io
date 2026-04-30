import { createFileRoute } from "@tanstack/react-router";
import { RecipePage } from "@/components/RecipePage";
import { getRecipe } from "@/data/recipes";

const recipe = getRecipe("saag-aloo-matar")!;

export const Route = createFileRoute("/recipes/saag-aloo-matar")({
  component: () => <RecipePage recipe={recipe} />,
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
