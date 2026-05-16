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

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&hellip;/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#0*39;|&#8217;|&#8216;/g, "'")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 10)));
}

function stripHtml(html: string): string {
  return decodeHtmlEntities(html.replace(/<[^>]*>/g, "")).trim();
}

function sanitizePostHtml(html: string): string {
  // Preserve YouTube / Vimeo embeds: before stripping iframes, convert any
  // YouTube/Vimeo iframe into a bare URL paragraph so JournalPostBody's
  // embed handler can re-render it as a responsive player.
  const withEmbeds = html.replace(
    /<iframe\b[^>]*\bsrc=["']([^"']+)["'][^>]*>\s*<\/iframe>/gi,
    (match, src: string) => {
      const isYouTube = /(?:youtube\.com|youtube-nocookie\.com|youtu\.be)/i.test(src);
      const isVimeo = /vimeo\.com/i.test(src);
      if (!isYouTube && !isVimeo) return match;
      return `<p>${src}</p>`;
    },
  );
  return withEmbeds
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
    categories: post.categories ? Object.values(post.categories).map((category) => decodeHtmlEntities(category.name).trim()) : [],
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
