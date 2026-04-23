import { createServerFn } from "@tanstack/react-start";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/wordpress_com";
const SITE_ID = "195471483"; // misskonstruction.wordpress.com — "Still & Salted"

export type WPPost = {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  url: string;
  slug: string;
  featuredImage: string | null;
  categories: string[];
};

type RawPost = {
  ID: number;
  date: string;
  title: string;
  excerpt: string;
  URL: string;
  slug: string;
  featured_image?: string;
  categories?: Record<string, { name: string }>;
};

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&hellip;/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .trim();
}

function normalize(p: RawPost): WPPost {
  return {
    id: p.ID,
    date: p.date,
    title: stripHtml(p.title),
    excerpt: stripHtml(p.excerpt),
    url: p.URL,
    slug: p.slug,
    featuredImage: p.featured_image && p.featured_image.length > 0 ? p.featured_image : null,
    categories: p.categories ? Object.values(p.categories).map((c) => c.name) : [],
  };
}

export const getWordPressPosts = createServerFn({ method: "GET" }).handler(async () => {
  const lovableKey = process.env.LOVABLE_API_KEY;
  if (!lovableKey) throw new Error("LOVABLE_API_KEY is not configured");
  const wpKey = process.env.WORDPRESS_COM_API_KEY;
  if (!wpKey) throw new Error("WORDPRESS_COM_API_KEY is not configured");

  const params = new URLSearchParams({
    number: "30",
    fields: "ID,date,title,excerpt,URL,slug,featured_image,categories",
  });

  const res = await fetch(
    `${GATEWAY_URL}/rest/v1.1/sites/${SITE_ID}/posts?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": wpKey,
      },
    },
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`WordPress.com fetch failed [${res.status}]: ${body}`);
  }

  const data = (await res.json()) as { posts?: RawPost[] };
  return (data.posts ?? []).map(normalize);
});
