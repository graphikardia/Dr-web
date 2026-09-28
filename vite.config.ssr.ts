import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Bundles client/ssr-entry.tsx for Node so scripts/prerender.mjs can render
// every route at build time. React is left external so there is a single copy
// of it at runtime, shared with react-dom/server.
export default defineConfig({
  plugins: [react()],
  build: {
    ssr: true,
    outDir: "dist/ssr",
    target: "node22",
    minify: false,
    sourcemap: false,
    cssCodeSplit: false,
    rollupOptions: {
      input: path.resolve(__dirname, "client/ssr-entry.tsx"),
      // react-router-dom/server is deliberately NOT external: the package has
      // no "exports" map, so Node's ESM resolver cannot resolve the bare
      // subpath. Bundling it is safe because it imports the bare
      // react-router-dom, which stays external, so there is still exactly one
      // router instance at runtime.
      external: [
        "react",
        "react/jsx-runtime",
        "react-dom",
        "react-dom/server",
        "react-router-dom",
        "react-router",
        "@remix-run/router",
        "history",
      ],
      output: {
        format: "es",
        entryFileNames: "entry.mjs",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
});
