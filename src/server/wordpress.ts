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

export type WPPostFull = WPPost & {
  /** Sanitized HTML content of the post body. */
  content: string;
};

type RawPost = {
  ID: number;
  date: string;
  title: string;
  excerpt: string;
  content?: string;
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
  const wpKey = process.env.WORDPRESS_COM_API_KEY;
  // During static prerender (e.g. GitHub Pages build), these env vars are not
  // present. Return an empty list instead of throwing so the page still renders.
  if (!lovableKey || !wpKey) {
    console.warn("[wordpress] Missing API keys — returning empty post list.");
    return [] as WPPost[];
  }

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

/**
 * Light sanitizer for WordPress post HTML.
 * Strips <script>/<style>/<iframe> blocks and inline event handlers,
 * but preserves the structural tags we want to style (p, h2, h3, ul, ol, li,
 * blockquote, img, a, em, strong, figure, figcaption, br).
 */
function sanitizePostHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "");
}

export const getWordPressPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => {
    if (typeof input !== "object" || input === null || !("slug" in input)) {
      throw new Error("slug is required");
    }
    const slug = (input as { slug: unknown }).slug;
    if (typeof slug !== "string" || slug.length === 0) {
      throw new Error("slug must be a non-empty string");
    }
    return { slug };
  })
  .handler(async ({ data }): Promise<WPPostFull | null> => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const wpKey = process.env.WORDPRESS_COM_API_KEY;
    if (!lovableKey || !wpKey) {
      console.warn("[wordpress] Missing API keys — returning null for post.");
      return null;
    }

    const res = await fetch(
      `${GATEWAY_URL}/rest/v1.1/sites/${SITE_ID}/posts/slug:${encodeURIComponent(data.slug)}`,
      {
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": wpKey,
        },
      },
    );

    if (res.status === 404) return null;
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`WordPress.com fetch failed [${res.status}]: ${body}`);
    }

    const raw = (await res.json()) as RawPost;
    const base = normalize(raw);
    return {
      ...base,
      content: sanitizePostHtml(raw.content ?? ""),
    };
  });
