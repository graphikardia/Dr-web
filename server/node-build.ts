import fs from "fs";
import path from "path";
import { createServer } from "./index";
import * as express from "express";

const app = createServer();
const port = process.env.PORT || 3000;

// In production, serve the built SPA files
const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "../spa");

// Serve static files
app.use(express.static(distPath));

// Handle React Router - every real route is pre-rendered to
// dist/spa/<route>/index.html by scripts/prerender.mjs and is already served by
// express.static above. Anything reaching here is a genuinely unknown path, so
// it gets the pre-rendered 404 page and a real 404 status. Falling back to
// index.html here would serve the homepage body with a 200, which Google
// treats as a soft 404 (the same content at unlimited URLs).
// Registered via app.use() (no path pattern) because Express 5 / path-to-regexp
// v8 rejects the old app.get("*") wildcard syntax.
app.use((req, res, next) => {
  // Don't serve index.html for API routes. Matched exactly (not by prefix)
  // so asset directories like /health-videos/ are not swallowed.
  if (req.path.startsWith("/api/") || req.path === "/health") {
    return res.status(404).json({ error: "API endpoint not found" });
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    return next();
  }

  const notFound = path.join(distPath, "404.html");
  if (fs.existsSync(notFound)) {
    return res.status(404).sendFile(notFound);
  }
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
