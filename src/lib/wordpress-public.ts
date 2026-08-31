export type WordPressPost = {
  id: number;
  date: string;
  /** Last-edited timestamp; later than `date` when a post has been updated. */
  modified?: string;
  title: string;
  excerpt: string;
  url: string;
  /** Local, website-safe route slug used by TanStack Router links. */
  slug: string;
  /** Original WordPress slug, decoded when possible, used only for lookup fallbacks. */
  wordpressSlug: string;
  featuredImage: string | null;
  categories: string[];
};

export type WordPressPostFull = WordPressPost & {
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

function safeDecodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

function decodeSlugRepeatedly(slug: string): string {
  let current = slug;
  for (let i = 0; i < 2; i += 1) {
    const decoded = safeDecodeSlug(current);
    if (decoded === current) return decoded;
    current = decoded;
  }
  return current;
}

function routeSlugForWordPressSlug(slug: string): string {
  const decoded = decodeSlugRepeatedly(slug);
  const normalized = decoded
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || decoded;
}

function encodeWordPressSlugForApi(slug: string): string {
  return encodeURIComponent(decodeSlugRepeatedly(slug));
}

function normalize(post: RawPost): WordPressPost {
  const decodedSlug = decodeSlugRepeatedly(post.slug);
  return {
    id: post.ID,
    date: post.date,
    modified: post.modified,
    title: stripHtml(post.title),
    excerpt: stripHtml(post.excerpt),
    url: post.URL,
    slug: routeSlugForWordPressSlug(decodedSlug),
    wordpressSlug: decodedSlug,
    featuredImage: post.featured_image && post.featured_image.length > 0 ? post.featured_image : null,
    categories: post.categories ? Object.values(post.categories).map((category) => decodeHtmlEntities(category.name).trim()) : [],
  };
}

async function findWordPressSlugForRouteSlug(routeSlug: string): Promise<string | null> {
  const targetRouteSlug = routeSlugForWordPressSlug(routeSlug);
  const targetDecoded = decodeSlugRepeatedly(routeSlug);

  for (let page = 1; page <= 10; page += 1) {
    const data = await fetchPublicWordPressApi<{ posts?: Pick<RawPost, "slug">[] }>(
      `/posts?number=100&page=${page}&fields=slug`,
    );
    const posts = data?.posts ?? [];
    const match = posts.find((post) => {
      const decoded = decodeSlugRepeatedly(post.slug);
      return decoded === targetDecoded || routeSlugForWordPressSlug(decoded) === targetRouteSlug;
    });

    if (match) return match.slug;
    if (posts.length < 100) break;
  }

  return null;
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
  const fields = "ID,date,modified,title,excerpt,URL,slug,featured_image,categories";
  const posts: RawPost[] = [];

  for (let page = 1; page <= 10; page += 1) {
    const params = new URLSearchParams({
      number: "100",
      page: String(page),
      fields,
    });

    const data = await fetchPublicWordPressApi<{ posts?: RawPost[] }>(`/posts?${params.toString()}`);
    const batch = data?.posts ?? [];
    posts.push(...batch);
    if (batch.length < 100) break;
  }

  return posts.map(normalize);
}

export async function getPublicWordPressPostBySlug(slug: string): Promise<WordPressPostFull | null> {
  let resolvedRaw = await fetchPublicWordPressApi<RawPost>(`/posts/slug:${encodeWordPressSlugForApi(slug)}`, {
    allowNotFound: true,
  });

  if (!resolvedRaw) {
    const wordpressSlug = await findWordPressSlugForRouteSlug(slug);
    if (wordpressSlug) {
      resolvedRaw = await fetchPublicWordPressApi<RawPost>(`/posts/slug:${encodeWordPressSlugForApi(wordpressSlug)}`, {
        allowNotFound: true,
      });
    }
  }

  if (!resolvedRaw) return null;

  return {
    ...normalize(resolvedRaw),
    content: sanitizePostHtml(resolvedRaw.content ?? ""),
  };
}
