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
    // Nitro's SSR pass loads the emitted CSS through a `virtual:nitro:raw:…file.css`
    // module. Vite's built-in CSS plugin sees the trailing `.css` in the id and
    // re-parses the JS wrapper text with Lightning CSS, which fails with
    // "Unexpected end of input" past the file boundary. Switching Vite's CSS
    // transformer to PostCSS avoids that re-parse; Tailwind still handles the
    // client CSS pipeline normally.
    css: { transformer: "postcss" },
  },
});
