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
import { mkdirSync, writeFileSync, cpSync, existsSync, readdirSync, rmSync, readFileSync, statSync } from "node:fs";
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
  "/blog/in-loving-memory-of-blitz",
  "/blog/body-and-bones",
  "/blog/home-improvement",
  "/blog/game-reviews-walk-throughs",
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
  "in-loving-memory-of-blitz",
  "body-and-bones",
]);

// Map a WordPress category name to one of our local category slugs.
function mapCategoryToSlug(names) {
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  for (const n of names) {
    const s = norm(n);
    if (KNOWN_CATEGORIES.has(s)) return s;
    if (s.includes("blitz") || s.includes("loving-memory")) return "in-loving-memory-of-blitz";
    if (s.includes("kitchen") || s.includes("recipe") || s.includes("food")) return "from-the-kitchen";
    if (s.includes("coastal") || s.includes("photo")) return "coastal-photography";
    if (s.includes("platy") || s.includes("fish")) return "platy-pals";
    if (s.includes("faith") || s.includes("scripture") || s.includes("bible")) return "faith-scripture";
    if (s.includes("wander") || s.includes("travel") || s.includes("roam")) return "wander-roam";
    if (s.includes("raw") || s.includes("unhinged")) return "raw-and-unhinged";
    if (
      s.includes("body") ||
      s.includes("bones") ||
      s.includes("health") ||
      s.includes("wellness") ||
      s.includes("fitness")
    )
      return "body-and-bones";
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

// Find Vite client build output. The two empirically-observed layouts are
// `.output/public` (Nitro node-server preset, used in CI) and `dist/client`
// (Nitro cloudflare-module preset, used in the sandbox). A candidate only
// qualifies if it contains an `assets/` subdirectory with at least one JS
// chunk — a generic `dist/` root that happens to exist as a parent of
// `client/` + `server/` must never be picked up as a client dir.
function findClientDir() {
  const candidates = [".output/public", "dist/client"];
  const rejected = [];
  for (const c of candidates) {
    if (!existsSync(c)) {
      rejected.push(`${c} (does not exist)`);
      continue;
    }
    const assetsDir = join(c, "assets");
    if (!existsSync(assetsDir)) {
      rejected.push(`${c} (no assets/ subdirectory)`);
      continue;
    }
    const hasJs = readdirSync(assetsDir).some((f) => f.endsWith(".js"));
    if (!hasJs) {
      rejected.push(`${c} (assets/ contains no .js chunks)`);
      continue;
    }
    return c;
  }
  throw new Error(
    `Could not locate a valid client build. Checked:\n  - ${rejected.join("\n  - ")}\n` +
      `Did \`vite build\` run and emit an assets/ folder with hashed JS chunks?`,
  );
}

// Walk every prerendered HTML file and verify that every /assets/* reference
// it makes actually exists on disk under dist-static/. This is the last line
// of defense against the asset-hash-drift bug — if HTML asks for
// SiteLayout-mhJp_l7G.js and only SiteLayout-DcbVI9ki.js was copied over,
// this fails the build before it can be published.
function walkHtmlFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walkHtmlFiles(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
  return out;
}

const ASSET_REF_RE = /(?:src|href)\s*=\s*["']([^"']*\/assets\/[^"']+)["']/gi;

function extractAssetRefs(html) {
  const refs = new Set();
  let m;
  ASSET_REF_RE.lastIndex = 0;
  while ((m = ASSET_REF_RE.exec(html)) !== null) {
    let p = m[1];
    // Strip query strings and fragments
    p = p.replace(/[?#].*$/, "");
    // Normalize protocol-relative or absolute URLs to same-origin path only
    if (/^https?:\/\//i.test(p)) continue; // external, ignore
    // Only keep the /assets/... portion
    const idx = p.indexOf("/assets/");
    if (idx === -1) continue;
    refs.add(p.slice(idx)); // starts with /assets/
  }
  return [...refs];
}

function closestExisting(rootDir, missingRef) {
  const assetsDir = join(rootDir, "assets");
  if (!existsSync(assetsDir)) return null;
  const base = missingRef.split("/").pop() || "";
  // e.g. SiteLayout-mhJp_l7G.js -> match on "SiteLayout-" prefix + ".js" suffix
  const dot = base.lastIndexOf(".");
  const ext = dot >= 0 ? base.slice(dot) : "";
  const dash = base.indexOf("-");
  const prefix = dash > 0 ? base.slice(0, dash + 1) : base;
  const candidates = readdirSync(assetsDir).filter(
    (f) => f.startsWith(prefix) && f.endsWith(ext),
  );
  return candidates.length ? candidates : null;
}

function verifyAssetReferences(rootDir) {
  if (!existsSync(rootDir)) {
    throw new Error(`Asset verifier: ${rootDir} does not exist`);
  }
  const htmlFiles = walkHtmlFiles(rootDir);
  let totalRefs = 0;
  const missing = []; // { file, ref, closest }
  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf8");
    const refs = extractAssetRefs(html);
    totalRefs += refs.length;
    for (const ref of refs) {
      const onDisk = join(rootDir, ref.replace(/^\//, ""));
      if (!existsSync(onDisk)) {
        missing.push({ file, ref, closest: closestExisting(rootDir, ref) });
      }
    }
  }
  if (missing.length) {
    console.error(`❌ Asset verifier: ${missing.length} missing reference(s) across ${htmlFiles.length} HTML file(s):`);
    for (const { file, ref, closest } of missing) {
      console.error(`   ${file}`);
      console.error(`     wants:   ${ref}`);
      console.error(`     closest: ${closest && closest.length ? closest.join(", ") : "(no similar filename)"}`);
    }
    throw new Error(
      `Asset verifier failed: ${missing.length} missing /assets/* reference(s). Refusing to publish.`,
    );
  }
  console.log(
    `🔎 Asset verifier: ${totalRefs} reference(s) across ${htmlFiles.length} HTML file(s) all resolve on disk.`,
  );
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

  // Final gate: refuse to hand off dist-static/ if any HTML references an
  // asset that isn't on disk. Runs after cleanup so the server is stopped
  // regardless of the verifier's outcome.
  verifyAssetReferences(OUT);
}


// Standalone verifier mode: `node scripts/prerender.mjs --verify-assets [dir]`
// Re-runs the asset-reference check without spinning up the server. Used by
// the CI workflow after the HTML-injection step to guarantee the exact bytes
// about to be published still pass.
if (process.argv.includes("--verify-assets")) {
  const idx = process.argv.indexOf("--verify-assets");
  const dir = process.argv[idx + 1] && !process.argv[idx + 1].startsWith("-")
    ? process.argv[idx + 1]
    : OUT;
  try {
    verifyAssetReferences(dir);
    process.exit(0);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
} else {
  main().catch((e) => {
    if (STRICT_PRERENDER) {
      console.error(e);
      process.exit(1);
    }
    console.warn(`⚠️  Prerender could not complete. ${e.message}`);
  });
}

