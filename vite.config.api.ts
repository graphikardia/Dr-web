import { defineConfig } from "vite";
import path from "path";

// Bundles the Express API (createServer) into a single self-contained file
// inside api/ so Vercel's legacy function builder has nothing to resolve:
// the old api/chat.ts pattern (a fully self-contained handler) mounted fine,
// while api/index.ts importing up into ../../server was silently dropped.
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "server/index.ts"),
      name: "api",
      fileName: "index",
      formats: ["es"],
    },
    outDir: "api/_bundle",
    target: "node22",
    ssr: true,
    rollupOptions: {
      external: [
        // Node.js built-ins
        "fs",
        "path",
        "url",
        "http",
        "https",
        "os",
        "crypto",
        "stream",
        "util",
        "events",
        "buffer",
        "querystring",
        "child_process",
        // Runtime deps re-installed into the Vercel function by the platform
        "express",
        "cors",
        "helmet",
        "express-rate-limit",
        "dotenv",
      ],
      output: {
        format: "es",
        entryFileNames: "[name].mjs",
      },
    },
    minify: true,
    sourcemap: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});