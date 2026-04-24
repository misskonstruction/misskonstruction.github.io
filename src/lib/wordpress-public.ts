export type WordPressPost = {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  url: string;
  slug: string;
  featuredImage: string | null;
  categories: string[];
};

export type WordPressPostFull = WordPressPost & {
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

const SITE_ID = "195471483";
const PUBLIC_API_URL = `https://public-api.wordpress.com/rest/v1.1/sites/${SITE_ID}`;

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

function sanitizePostHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "");
}

function normalize(post: RawPost): WordPressPost {
  return {
    id: post.ID,
    date: post.date,
    title: stripHtml(post.title),
    excerpt: stripHtml(post.excerpt),
    url: post.URL,
    slug: post.slug,
    featuredImage: post.featured_image && post.featured_image.length > 0 ? post.featured_image : null,
    categories: post.categories ? Object.values(post.categories).map((category) => category.name) : [],
  };
}

async function fetchPublicWordPressApi<T>(endpoint: string, options?: { allowNotFound?: boolean }): Promise<T | null> {
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch(`${PUBLIC_API_URL}${endpoint}`);

      if (response.status === 404 && options?.allowNotFound) return null;
      if (!response.ok) {
        const body = await response.text();
        if (attempt < 2 && (response.status === 429 || response.status >= 500)) {
          continue;
        }
        throw new Error(`WordPress.com fetch failed [${response.status}]: ${body}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      if (attempt === 2) {
        throw error instanceof Error ? error : new Error(String(error));
      }
    }
  }

  return null;
}

export async function getPublicWordPressPosts(): Promise<WordPressPost[]> {
  const params = new URLSearchParams({
    number: "30",
    fields: "ID,date,title,excerpt,URL,slug,featured_image,categories",
  });

  const data = await fetchPublicWordPressApi<{ posts?: RawPost[] }>(`/posts?${params.toString()}`);
  return (data?.posts ?? []).map(normalize);
}

export async function getPublicWordPressPostBySlug(slug: string): Promise<WordPressPostFull | null> {
  const raw = await fetchPublicWordPressApi<RawPost>(`/posts/slug:${encodeURIComponent(slug)}`, {
    allowNotFound: true,
  });

  if (!raw) return null;

  return {
    ...normalize(raw),
    content: sanitizePostHtml(raw.content ?? ""),
  };
}
