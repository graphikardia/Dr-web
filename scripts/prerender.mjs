/**
 * Build-time pre-render.
 *
 * Writes one static HTML file per route into dist/spa so crawlers receive real
 * content (headings, body copy, links, per-page head tags) in the first byte
 * response, instead of a shell they can only read by executing JavaScript.
 *
 * Two rules this script enforces:
 *
 *  1. Page JSON-LD is MERGED into the base graph from index.html, never used to
 *     replace it. Home passes no jsonLd of its own; the Physician,
 *     MedicalOrganization, WebSite, VideoObject and FAQPage nodes live only in
 *     the base graph, so replacing would silently delete all of them.
 *
 *  2. Only the marked regions of the template are touched, so site-wide tags
 *     (favicons, preconnect, geo, Google Search Console verification) survive
 *     on every page.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const spaDir = path.join(root, "dist", "spa");

const { PRERENDER_ROUTES, NOT_FOUND_PROBE, renderPage } = await import(
  path.join(root, "dist", "ssr", "entry.mjs")
);

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const meta = (attr, key, content) =>
  `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`;

/** Mirrors what SEOHead writes to the DOM on the client. */
function buildHead(head) {
  const robots = head.noIndex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1";

  const tags = [
    `<title>${escapeAttr(head.title)}</title>`,
    meta("name", "title", head.title),
    meta("name", "description", head.description),
    head.keywords ? meta("name", "keywords", head.keywords) : "",
    meta("name", "robots", robots),
    // A canonical on a noindex page points at the wrong URL, so omit it.
    head.noIndex ? "" : `<link rel="canonical" href="${escapeAttr(head.url)}" />`,
    meta("property", "og:type", head.ogType),
    meta("property", "og:url", head.url),
    meta("property", "og:title", head.title),
    meta("property", "og:description", head.description),
    meta("property", "og:image", head.ogImage),
    meta("property", "og:site_name", "Dr. Darshana Reddy"),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:url", head.url),
    meta("name", "twitter:title", head.title),
    meta("name", "twitter:description", head.description),
    meta("name", "twitter:image", head.ogImage),
  ];
  return tags.filter(Boolean).join("\n    ");
}

/** Base graph + page nodes, de-duplicated by @id so a page can refine a node. */
function buildJsonLd(baseGraph, pageNodes) {
  if (!pageNodes || pageNodes.length === 0) return baseGraph;

  const byId = new Map();
  const nodes = [...baseGraph];
  for (const node of nodes) {
    if (node && node["@id"]) byId.set(node["@id"], node);
  }
  for (const node of pageNodes) {
    if (node && node["@id"]) byId.set(node["@id"], node);
    else nodes.push(node);
  }
  return nodes.map((n) => byId.get(n?.["@id"]) ?? n);
}

function replaceRegion(html, start, end, replacement) {
  const from = html.indexOf(start);
  const to = html.indexOf(end);
  if (from === -1 || to === -1) {
    throw new Error(`Template is missing the ${start} region; cannot pre-render.`);
  }
  return html.slice(0, from) + replacement + html.slice(to + end.length);
}

// --- Load the built template once, before any route overwrites it -----------
const templatePath = path.join(spaDir, "index.html");
if (!fs.existsSync(templatePath)) {
  console.error("dist/spa/index.html is missing. Run the client build first.");
  process.exit(1);
}
const template = fs.readFileSync(templatePath, "utf8");

// The base graph is read from the SOURCE template, not the built one. Reading
// it from dist would mean re-running this script on its own output, which would
// fold the previously written page breadcrumbs into the base.
const sourceTemplate = fs.readFileSync(path.join(root, "index.html"), "utf8");

const baseBlock = sourceTemplate.slice(
  sourceTemplate.indexOf("<!--jsonld:start-->"),
  sourceTemplate.indexOf("<!--jsonld:end-->"),
);
const baseMatch = baseBlock.match(
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
);
if (!baseMatch) {
  console.error("No base JSON-LD graph found in index.html.");
  process.exit(1);
}
const baseGraph = JSON.parse(baseMatch[1])["@graph"];

let written = 0;
const failures = [];

for (const route of PRERENDER_ROUTES) {
  let head;
  let markup;
  try {
    ({ head, html: markup } = renderPage(route));
  } catch (error) {
    failures.push([route, error.message]);
    continue;
  }

  // Markers are re-emitted so a standalone `pnpm prerender` stays idempotent.
  let out = replaceRegion(
    template,
    "<!--seo:start-->",
    "<!--seo:end-->",
    `<!--seo:start-->\n    ${buildHead(head)}\n    <!--seo:end-->`,
  );

  const graph = buildJsonLd(baseGraph, head.jsonLd);
  out = replaceRegion(
    out,
    "<!--jsonld:start-->",
    "<!--jsonld:end-->",
    `<!--jsonld:start-->\n    <script type="application/ld+json">\n${JSON.stringify(
      { "@context": "https://schema.org", "@graph": graph },
      null,
      2,
    )}\n    </script>\n    <!--jsonld:end-->`,
  );

  out = replaceRegion(
    out,
    "<!--app:start-->",
    "<!--app:end-->",
    `<!--app:start-->${markup}<!--app:end-->`,
  );

  const dir = route === "/" ? spaDir : path.join(spaDir, route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), out);
  written++;
}

console.log(`pre-rendered ${written}/${PRERENDER_ROUTES.length} routes`);

// 404 page, served with a 404 status by server/node-build.ts
try {
  const { head, html: markup } = renderPage(NOT_FOUND_PROBE);
  let out = replaceRegion(
    template,
    "<!--seo:start-->",
    "<!--seo:end-->",
    `<!--seo:start-->\n    ${buildHead(head)}\n    <!--seo:end-->`,
  );
  const graph = buildJsonLd(baseGraph, head.jsonLd);
  out = replaceRegion(
    out,
    "<!--jsonld:start-->",
    "<!--jsonld:end-->",
    `<!--jsonld:start-->\n    <script type="application/ld+json">\n${JSON.stringify(
      { "@context": "https://schema.org", "@graph": graph },
      null,
      2,
    )}\n    </script>\n    <!--jsonld:end-->`,
  );
  out = replaceRegion(
    out,
    "<!--app:start-->",
    "<!--app:end-->",
    `<!--app:start-->${markup}<!--app:end-->`,
  );
  fs.writeFileSync(path.join(spaDir, "404.html"), out);
  console.log("pre-rendered 404.html (noindex)");
} catch (error) {
  console.error(`  FAILED 404.html: ${error.message}`);
  process.exit(1);
}

const sitemap = path.join(root, "public", "sitemap.xml");
if (fs.existsSync(sitemap)) {
  const listed = [...fs.readFileSync(sitemap, "utf8").matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map(
    (m) => new URL(m[1]).pathname.replace(/\/$/, "") || "/",
  );
  const missing = PRERENDER_ROUTES.filter((r) => !listed.includes(r));
  if (missing.length) {
    console.log(`warning: pre-rendered but absent from sitemap.xml -> ${missing.join(", ")}`);
  }
}

if (failures.length) {
  for (const [route, message] of failures) {
    console.error(`  FAILED ${route}: ${message}`);
  }
  process.exit(1);
}
