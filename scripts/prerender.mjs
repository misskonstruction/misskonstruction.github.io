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
  "/gallery/maternity",
  "/gallery/nature-wildlife",
  "/gallery/flowers",
  "/gallery/boats",
];

const OUT = "dist-static";
const PORT = 4321;

// Find Vite client build output (usually .output/public or dist/client)
function findClientDir() {
  const candidates = [".output/public", "dist/client", "dist", ".vinxi/build/client"];
  for (const c of candidates) if (existsSync(c) && readdirSync(c).length) return c;
  throw new Error("Could not locate built client assets. Did `vite build` run?");
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

    for (const route of ROUTES) {
      const res = await fetch(`http://localhost:${PORT}${route}`);
      if (!res.ok) {
        console.warn(`⚠️  ${route} → ${res.status}`);
        continue;
      }
      const html = await res.text();
      const filePath =
        route === "/"
          ? join(OUT, "index.html")
          : join(OUT, route.replace(/^\//, ""), "index.html");
      mkdirSync(dirname(filePath), { recursive: true });
      writeFileSync(filePath, html);
      console.log(`✅ ${route}`);
    }
    console.log(`\n✨ Prerendered ${ROUTES.length} routes → ${OUT}/`);
  } finally {
    cleanup();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
