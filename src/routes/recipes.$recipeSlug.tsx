import { createFileRoute, notFound } from "@tanstack/react-router";
import { RecipePage } from "@/components/RecipePage";
import { getRecipe } from "@/data/recipes";
import { SiteLayout } from "@/components/SiteLayout";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/recipes/$recipeSlug")({
  loader: ({ params }) => {
    const recipe = getRecipe(params.recipeSlug);
    if (!recipe) throw notFound();
    return { recipe };
  },
  component: RecipeRouteComponent,
  head: ({ loaderData }) => {
    const recipe = loaderData?.recipe;
    if (!recipe) {
      return { meta: [{ title: "Recipe not found" }] };
    }
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
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl mb-4" style={{ fontFamily: "var(--font-journal)" }}>
          Recipe not found
        </h1>
        <Link
          to="/blog/$category"
          params={{ category: "from-the-kitchen" }}
          className="text-primary underline"
        >
          Back to From the Kitchen
        </Link>
      </div>
    </SiteLayout>
  ),
});

function RecipeRouteComponent() {
  const { recipe } = Route.useLoaderData();
  return <RecipePage recipe={recipe} />;
}
