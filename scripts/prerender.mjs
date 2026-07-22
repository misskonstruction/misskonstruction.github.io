/**
 * Static prerender for GitHub Pages.
 *
 * Approach: spin up the built app on a local port using the generated server,
 * crawl every known route with fetch, and write each response as
 * dist-static/<route>/index.html. Copies static assets (css/js/images)
 * from the Vite client build folder into dist-static so Pages can serve them.
 *
 * Routes are listed explicitly — add new ones here when you create a route.
 */
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, cpSync, existsSync, readdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";

const ROUTES = [
  "/",
  "/about",
  "/contact",
  "/blog",
  "/blog/coastal-photography",
  "/blog/from-the-kitchen",
  "/blog/platy-pals",
  "/blog/faith-scripture",
  "/blog/reflections",
  "/blog/wander-roam",
  "/gallery/maternity",
  "/gallery/newborns",
  "/gallery/florida-birding",
  "/gallery/birding-wildlife",
  "/gallery/flowers",
  "/gallery/boats",
  "/gallery/travel",
  "/gallery/texture-form",
  "/gallery/konstruction-character",
  "/gallery/loose-frames",
  "/blog/raw-and-unhinged",
  "/recipes/shrimp-poboy",
  "/recipes/bitchin-slow-cooker-porkchops",
  "/recipes/deep-fried-tilapia",
  "/recipes/high-protein-dill-chicken-orzo",
  "/recipes/honey-glazed-chicken",
  "/recipes/lemon-turmeric-cabbage-white-bean-soup",
  "/recipes/my-lovely-lasagne",
  "/recipes/pulled-pork-tacos",
  "/recipes/saag-aloo-matar",
  "/recipes/slow-cooker-cod-dog-food",
  "/recipes/slow-cooker-homemade-dog-food",
  "/recipes/superb-spaghetti-and-meatballs",
  "/recipes/thanksgiving-table",
  "/recipes/velvet-butter-chicken",
  "/prayers/fold-the-arms-of-thy-faith-macdonald",
  "/prayers/household-troubles-de-sales",
  "/prayers/in-celebration-maisie-renee",
  "/prayers/one-step-is-enough-grou",
  "/prayers/the-will-of-god-chittister",
  "/prayers/walking-on-the-waves-chambers",
];

// Category slugs known to the site (must match src/data/journalCategories.ts)
const KNOWN_CATEGORIES = new Set([
  "coastal-photography",
  "from-the-kitchen",
  "platy-pals",
  "faith-scripture",
  "reflections",
  "wander-roam",
  "raw-and-unhinged",
]);

// Map a WordPress category name to one of our local category slugs.
function mapCategoryToSlug(names) {
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  for (const n of names) {
    const s = norm(n);
    if (KNOWN_CATEGORIES.has(s)) return s;
    if (s.includes("kitchen") || s.includes("recipe") || s.includes("food")) return "from-the-kitchen";
    if (s.includes("coastal") || s.includes("photo")) return "coastal-photography";
    if (s.includes("platy") || s.includes("fish")) return "platy-pals";
    if (s.includes("faith") || s.includes("scripture") || s.includes("bible")) return "faith-scripture";
    if (s.includes("wander") || s.includes("travel") || s.includes("roam")) return "wander-roam";
    if (s.includes("raw") || s.includes("unhinged")) return "raw-and-unhinged";
  }
  return "reflections";
}

function safeDecodeSlug(slug) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

function decodeSlugRepeatedly(slug) {
  let current = slug;
  for (let i = 0; i < 2; i += 1) {
    const decoded = safeDecodeSlug(current);
    if (decoded === current) return decoded;
    current = decoded;
  }
  return current;
}

function routeSlugForWordPressSlug(slug) {
  const decoded = decodeSlugRepeatedly(slug);
  const normalized = decoded
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || encodeURIComponent(decoded);
}

function routeSlugVariantsForWordPressSlug(slug) {
  const decoded = decodeSlugRepeatedly(slug);
  const clean = routeSlugForWordPressSlug(decoded);
  const variants = new Set([clean]);

  // Compatibility for older deployed links that used WordPress' encoded slug
  // directly, or encoded it twice through TanStack Link params. The clean slug
  // is canonical, but these keep already-shared journal links from 404ing.
  if (decoded !== clean) {
    variants.add(decoded);
    variants.add(encodeURIComponent(decoded));
    variants.add(encodeURIComponent(decoded).toLowerCase());
  }
  if (slug !== clean) {
    variants.add(slug);
    variants.add(encodeURIComponent(slug));
  }

  return [...variants].filter(Boolean);
}

// Fetch all WordPress posts directly from the public API so we can build
// a route for each one. This runs at build time only.
async function fetchWordPressPostRoutes() {
  const SITE_ID = "195471483";
  const routes = [];
  try {
    for (let page = 1; page <= 10; page += 1) {
      const url = `https://public-api.wordpress.com/rest/v1.1/sites/${SITE_ID}/posts?number=100&page=${page}&fields=ID,slug,categories`;
      const res = await fetch(url);
      if (!res.ok) {
        console.warn(`⚠️  Could not fetch WordPress post list (${res.status}). Skipping post prerender.`);
        return [];
      }
      const data = await res.json();
      const posts = data.posts ?? [];
      for (const p of posts) {
        const catNames = p.categories ? Object.values(p.categories).map((c) => c.name) : [];
        const slug = mapCategoryToSlug(catNames);
        for (const postSlug of routeSlugVariantsForWordPressSlug(p.slug)) {
          routes.push(`/blog/${slug}/${postSlug}`);
        }
      }
      if (posts.length < 100) break;
    }

    return [...new Set(routes)];
  } catch (e) {
    console.warn(`⚠️  WordPress fetch failed: ${e.message}. Skipping post prerender.`);
    return [];
  }
}

const OUT = "dist-static";
const PORT = 4321;
// Strict by default — a broken prerender must fail the build so we don't
// silently ship without blog post HTML. Opt out only with STRICT_PRERENDER=false.
const STRICT_PRERENDER = process.env.STRICT_PRERENDER !== "false";

// Find Vite client build output (usually .output/public or dist/client)
function findClientDir() {
  const candidates = [".output/public", "dist/client", "dist", ".vinxi/build/client"];
  for (const c of candidates) if (existsSync(c) && readdirSync(c).length) return c;
  throw new Error("Could not locate built client assets. Did `vite build` run?");
}

function ensurePreviewServerEntry() {
  const serverDir = join("dist", "server");
  const serverEntry = join("dist", "server", "server.js");
  if (existsSync(serverEntry)) return;
  const candidates = [
    join("dist", "server", "index.js"),
    join("dist", "server", "index.mjs"),
    join("dist", "server", "server.mjs"),
    // Nitro/Vinxi default output path used by TanStack Start
    join(".output", "server", "index.mjs"),
    join(".output", "server", "server.mjs"),
  ];
  const found = candidates.find(existsSync);
  if (!found) {
    throw new Error(
      `No server bundle found. Checked: ${candidates.join(", ")}. ` +
        `Run \`ls -R dist .output\` in CI to see the actual build output path and add it here.`,
    );
  }
  mkdirSync(serverDir, { recursive: true });
  // The server entry has relative imports to sibling files like ./_libs/*.mjs.
  // If the build landed in .output/server/, we must bring the whole tree
  // along — copying only the entry file leaves its dependencies behind and
  // Node fails with ERR_MODULE_NOT_FOUND at preview time.
  const sourceDir = dirname(found);
  if (sourceDir !== serverDir) {
    cpSync(sourceDir, serverDir, { recursive: true });
  }
  // Ensure the canonical dist/server/server.js entry exists regardless of the
  // original filename (index.mjs, server.mjs, etc.).
  const relocated = join(serverDir, found.split(/[\\/]/).pop());
  if (existsSync(relocated) && !existsSync(serverEntry)) {
    cpSync(relocated, serverEntry);
  }
}


function warnOrThrow(message) {
  if (STRICT_PRERENDER) throw new Error(message);
  console.warn(`⚠️  ${message}`);
}

async function waitForServer(url, server, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (server.exitCode !== null) {
      throw new Error(`Server process exited before becoming ready (exit code ${server.exitCode})`);
    }
    try {
      const r = await fetch(url);
      // A stub/broken server can trivially return 404 immediately; require
      // a real 200 so readiness reflects an actually functional app.
      if (r.status === 200) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server at ${url} did not return 200 within ${timeoutMs}ms`);
}

async function main() {
  const clientDir = findClientDir();
  ensurePreviewServerEntry();
  console.log(`📦 Using client assets from: ${clientDir}`);

  // Start from a clean output folder so old checked-in/static route files
  // cannot be republished if a route fails to prerender.
  rmSync(OUT, { recursive: true, force: true });

  // Copy static assets first
  mkdirSync(OUT, { recursive: true });
  cpSync(clientDir, OUT, { recursive: true });
  if (existsSync("public")) cpSync("public", OUT, { recursive: true });

  // Detect the nitro preset used for the server build. In CI the vite config
    // requests `node-server`, so the generated server can be launched directly.
  // In the sandbox preview environment the plugin forces `cloudflare-module`
  // regardless of user config; fall back to `wrangler dev` for that case
  // (works for local prerender testing; note that workerd inside the sandbox
  // does not have outbound network access, so dynamic-loader routes may 500).
  let preset = "node-server";
  try {
    const nitroInfo = JSON.parse(
      (await import("node:fs")).readFileSync(join("dist", "nitro.json"), "utf8"),
    );
    if (typeof nitroInfo?.preset === "string") preset = nitroInfo.preset;
  } catch {}

  let server;
  if (preset.startsWith("cloudflare")) {
    // Wrangler needs env vars via .dev.vars beside the config
    const passthroughEnv = [
      "LOVABLE_API_KEY",
      "WORDPRESS_COM_API_KEY",
      "SUPABASE_URL",
      "SUPABASE_PUBLISHABLE_KEY",
      "SUPABASE_SERVICE_ROLE_KEY",
    ];
    const devVarsLines = passthroughEnv
      .filter((k) => process.env[k])
      .map((k) => `${k}=${JSON.stringify(process.env[k])}`)
      .join("\n");
    if (devVarsLines) {
      writeFileSync(join("dist", "server", ".dev.vars"), devVarsLines + "\n");
    }
    console.log(`🚀 Starting wrangler dev on :${PORT} (preset=${preset})`);
    server = spawn(
      "bunx",
      [
        "wrangler",
        "dev",
        "--config",
        join("dist", "server", "wrangler.json"),
        "--port",
        String(PORT),
        "--ip",
        "127.0.0.1",
        "--log-level",
        "warn",
      ],
      { stdio: "inherit", env: { ...process.env, PORT: String(PORT) } },
    );
  } else {
    const nodeEntry = join("dist", "server", "server.js");
    console.log(`🚀 Starting built Node server on :${PORT} (preset=${preset})`);
    server = spawn(
      "node",
      [nodeEntry],
      { stdio: "inherit", env: { ...process.env, PORT: String(PORT) } },
    );
  }

  const cleanup = () => { try { server.kill("SIGTERM"); } catch {} };
  process.on("exit", cleanup);
  process.on("SIGINT", () => { cleanup(); process.exit(1); });

  try {
    try {
      await waitForServer(`http://localhost:${PORT}/`, server, 90000);
    } catch (error) {
      warnOrThrow(
        `Prerender server did not become ready. ${error.message}`,
      );
      return;
    }

    // Discover dynamic blog post routes from WordPress
    const postRoutes = await fetchWordPressPostRoutes();
    const allRoutes = [...ROUTES, ...postRoutes];
    if (postRoutes.length) {
      console.log(`📝 Discovered ${postRoutes.length} WordPress post route(s) to prerender`);
    }

    const failures = [];
    for (const route of allRoutes) {
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
      warnOrThrow(
        `Prerender skipped ${failures.length} route(s): ${failures.join(", ")}. The SPA fallback will serve them on GitHub Pages.`,
      );
    }
    console.log(`\n✨ Prerendered ${allRoutes.length} routes → ${OUT}/`);
  } finally {
    cleanup();
  }
}

main().catch((e) => {
  if (STRICT_PRERENDER) {
    console.error(e);
    process.exit(1);
  }
  console.warn(`⚠️  Prerender could not complete. ${e.message}`);
});
