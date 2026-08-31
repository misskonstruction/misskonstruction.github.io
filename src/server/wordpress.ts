import { createServerFn } from "@tanstack/react-start";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/wordpress_com";
const SITE_ID = "195471483"; // misskonstruction.wordpress.com — "Still & Salted"
const PUBLIC_API_URL = `https://public-api.wordpress.com/rest/v1.1/sites/${SITE_ID}`;

export type WPPost = {
  id: number;
  date: string;
  modified?: string;
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
  modified?: string;
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
    modified: p.modified,
    title: stripHtml(p.title),
    excerpt: stripHtml(p.excerpt),
    url: p.URL,
    slug: p.slug,
    featuredImage: p.featured_image && p.featured_image.length > 0 ? p.featured_image : null,
    categories: p.categories ? Object.values(p.categories).map((c) => c.name) : [],
  };
}

async function fetchWordPressApi<T>(endpoint: string, options?: { allowNotFound?: boolean }): Promise<T | null> {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const wpKey = process.env.WORDPRESS_COM_API_KEY;

  if (lovableKey && wpKey) {
    try {
      const gatewayRes = await fetch(`${GATEWAY_URL}/rest/v1.1/sites/${SITE_ID}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": wpKey,
        },
      });

      if (gatewayRes.status === 404 && options?.allowNotFound) return null;
      if (gatewayRes.ok) return (await gatewayRes.json()) as T;

      const body = await gatewayRes.text();
      console.warn(`[wordpress] Gateway fetch failed [${gatewayRes.status}], falling back to public API: ${body}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`[wordpress] Gateway request threw, falling back to public API: ${message}`);
    }
  }

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const publicRes = await fetch(`${PUBLIC_API_URL}${endpoint}`);
      if (publicRes.status === 404 && options?.allowNotFound) return null;
      if (!publicRes.ok) {
        const body = await publicRes.text();
        if (attempt < 2 && (publicRes.status === 429 || publicRes.status >= 500)) {
          console.warn(`[wordpress] Public API fetch failed [${publicRes.status}], retrying once: ${body}`);
          continue;
        }
        throw new Error(`WordPress.com fetch failed [${publicRes.status}]: ${body}`);
      }

      return (await publicRes.json()) as T;
    } catch (error) {
      if (attempt === 2) {
        throw error instanceof Error ? error : new Error(String(error));
      }

      const message = error instanceof Error ? error.message : String(error);
      console.warn(`[wordpress] Public API request failed, retrying once: ${message}`);
    }
  }

  return null;
}

export const getWordPressPosts = createServerFn({ method: "GET" }).handler(async () => {
  const params = new URLSearchParams({
    number: "30",
    fields: "ID,date,modified,title,excerpt,URL,slug,featured_image,categories",
  });

  const data = await fetchWordPressApi<{ posts?: RawPost[] }>(`/posts?${params.toString()}`);
  return (data?.posts ?? []).map(normalize);
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
    const raw = await fetchWordPressApi<RawPost>(`/posts/slug:${encodeURIComponent(data.slug)}`, {
      allowNotFound: true,
    });
    if (!raw) return null;

    const base = normalize(raw);
    return {
      ...base,
      content: sanitizePostHtml(raw.content ?? ""),
    };
  });
