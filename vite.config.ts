// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// The site is deployed as fully prerendered static HTML to GitHub Pages, so
// the server build only exists to serve routes to the prerender crawler.
// Force a Node preset so `wrangler` / `workerd` are not required — the
// resulting server can be started with plain Node and has full network access.
export default defineConfig({
  nitro: { preset: "node-server" },
  vite: {
    plugins: [
      {
        // Nitro wraps built CSS as `virtual:nitro:raw:…file.css` when inlining
        // it for the SSR bundle. The trailing `.css` in the module id makes
        // Vite's css plugin re-run Lightning CSS on the JS wrapper text, which
        // fails with "Unexpected end of input" past the file boundary.
        // Rewriting the resolved id to strip the .css suffix keeps the module
        // out of the CSS pipeline while Nitro still handles it as raw text.
        name: "skip-lightningcss-on-nitro-raw",
        enforce: "pre",
        resolveId(id) {
          if (id.startsWith("virtual:nitro:raw:") && id.endsWith(".css")) {
            return { id: id + "?nitro-raw", moduleSideEffects: false };
          }
          return null;
        },
      },
    ],
  },
});
