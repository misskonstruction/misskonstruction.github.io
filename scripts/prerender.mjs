/**
 * Static prerender for GitHub Pages.
 *
 * Approach: spin up the built app on a local port using `vite preview`,
 * crawl every known route with fetch, and write each response as
 * dist-static/<route>/index.html. Copies static assets (css/js/images)
 * from the Vite client build folder into dist-static so Pages can serve them.
 *
 * Routes are listed explicitly — add new ones here when you create a route.
 */
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, cpSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";

const ROUTES = [
  "/",
  "/about",
  "/contact",
  "/blog",
  "/blog/coastal-photography",
  "/blog/from-the-kitchen",
  "/blog/creative-life",
  "/blog/faith-scripture",
  "/blog/reflections",
  "/blog/wander-roam",
  "/gallery/maternity",
  "/gallery/newborns",
  "/gallery/florida-birding",
  "/gallery/flowers",
  "/gallery/boats",
  "/recipes/shrimp-poboy",
];

// Category slugs known to the site (must match src/data/journalCategories.ts)
const KNOWN_CATEGORIES = new Set([
  "coastal-photography",
  "from-the-kitchen",
  "creative-life",
  "faith-scripture",
  "reflections",
  "wander-roam",
]);

// Map a WordPress category name to one of our local category slugs.
function mapCategoryToSlug(names) {
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  for (const n of names) {
    const s = norm(n);
    if (KNOWN_CATEGORIES.has(s)) return s;
    if (s.includes("kitchen") || s.includes("recipe") || s.includes("food")) return "from-the-kitchen";
    if (s.includes("coastal") || s.includes("photo")) return "coastal-photography";
    if (s.includes("creative")) return "creative-life";
    if (s.includes("faith") || s.includes("scripture") || s.includes("bible")) return "faith-scripture";
    if (s.includes("wander") || s.includes("travel") || s.includes("roam")) return "wander-roam";
  }
  return "reflections";
}

// Fetch all WordPress posts directly from the public API so we can build
// a route for each one. This runs at build time only.
async function fetchWordPressPostRoutes() {
  const SITE_ID = "195471483";
  const url = `https://public-api.wordpress.com/rest/v1.1/sites/${SITE_ID}/posts?number=100&fields=ID,slug,categories`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`⚠️  Could not fetch WordPress post list (${res.status}). Skipping post prerender.`);
      return [];
    }
    const data = await res.json();
    const posts = data.posts ?? [];
    return posts.map((p) => {
      const catNames = p.categories ? Object.values(p.categories).map((c) => c.name) : [];
      const slug = mapCategoryToSlug(catNames);
      return `/blog/${slug}/${p.slug}`;
    });
  } catch (e) {
    console.warn(`⚠️  WordPress fetch failed: ${e.message}. Skipping post prerender.`);
    return [];
  }
}

const OUT = "dist-static";
const PORT = 4321;

// Find Vite client build output (usually .output/public or dist/client)
function findClientDir() {
  const candidates = [".output/public", "dist/client", "dist", ".vinxi/build/client"];
  for (const c of candidates) if (existsSync(c) && readdirSync(c).length) return c;
  throw new Error("Could not locate built client assets. Did `vite build` run?");
}

function ensurePreviewServerEntry() {
  const serverEntry = join("dist", "server", "server.js");
  const fallbackEntry = join("dist", "server", "index.js");

  if (!existsSync(serverEntry) && existsSync(fallbackEntry)) {
    cpSync(fallbackEntry, serverEntry);
  }
}

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(url);
      if (r.ok || r.status === 404) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server at ${url} did not become ready`);
}

async function main() {
  const clientDir = findClientDir();
  ensurePreviewServerEntry();
  console.log(`📦 Using client assets from: ${clientDir}`);

  // Copy static assets first
  mkdirSync(OUT, { recursive: true });
  cpSync(clientDir, OUT, { recursive: true });
  if (existsSync("public")) cpSync("public", OUT, { recursive: true });

  // Start preview server
  console.log(`🚀 Starting preview server on :${PORT}`);
  const server = spawn("bunx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
    stdio: "inherit",
    env: { ...process.env, PORT: String(PORT) },
  });

  const cleanup = () => { try { server.kill("SIGTERM"); } catch {} };
  process.on("exit", cleanup);
  process.on("SIGINT", () => { cleanup(); process.exit(1); });

  try {
    await waitForServer(`http://localhost:${PORT}/`);

    const failures = [];
    for (const route of ROUTES) {
      const res = await fetch(`http://localhost:${PORT}${route}`);
      if (!res.ok) {
        console.error(`❌ ${route} → ${res.status}`);
        failures.push(`${route} (${res.status})`);
        continue;
      }
      const html = await res.text();
      const filePath =
        route === "/"
          ? join(OUT, "index.html")
          : join(OUT, route.replace(/^\//, ""), "index.html");
      mkdirSync(dirname(filePath), { recursive: true });
      writeFileSync(filePath, html);
      console.log(`✅ ${route}  (${html.length} bytes)`);
    }
    if (failures.length) {
      throw new Error(`Prerender failed for ${failures.length} route(s): ${failures.join(", ")}`);
    }
    console.log(`\n✨ Prerendered ${ROUTES.length} routes → ${OUT}/`);
  } finally {
    cleanup();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
