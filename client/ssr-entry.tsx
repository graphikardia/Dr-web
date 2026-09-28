import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppShell } from "./App";
import { SEOCollectorContext, type HeadData } from "./components/SEOHead";
import { specialtiesData } from "./pages/SpecialtyDetail";

/**
 * Build-time pre-render entry.
 *
 * The served HTML used to be a bare shell: title and metadata only, with no
 * body content and no <h1>, so crawlers had to execute JavaScript to read the
 * page. Each route below is rendered here at build time and written to a real
 * static file.
 *
 * The client still hydrates the same markup, so this is not a second rendering
 * path that can drift from the SPA - both run the same AppShell.
 */

const STATIC_ROUTES = [
  "/",
  "/about",
  "/videos",
  "/articles",
  "/testimonials",
  "/contact",
  "/privacy-policy",
  "/terms-conditions",
  "/cookie-policy",
  "/refund-policy",
];

// Derived from the page's own data so a new specialty cannot ship without
// being pre-rendered, which would leave it invisible to crawlers.
const SPECIALTY_ROUTES = Object.keys(specialtiesData).map(
  (slug) => `/specialties/${slug}`,
);

export const PRERENDER_ROUTES = [...STATIC_ROUTES, ...SPECIALTY_ROUTES];

/**
 * Rendered to dist/spa/404.html and served with a real 404 status for unknown
 * paths. Without this the SPA fallback returns the pre-rendered homepage with a
 * 200, which Google reads as a soft 404: the same content at unlimited URLs.
 * It hits the catch-all route, whose SEOHead is already noindex.
 */
export const NOT_FOUND_PROBE = "/__prerender_404__";

export function renderPage(path: string): { html: string; head: HeadData } {
  let head: HeadData | null = null;

  const html = renderToStaticMarkup(
    <SEOCollectorContext.Provider
      value={{
        push: (data: HeadData) => {
          // Last write wins: a page renders one SEOHead, and React's dev-mode
          // double render is idempotent here.
          head = data;
        },
      }}
    >
      <StaticRouter location={path}>
        <AppShell />
      </StaticRouter>
    </SEOCollectorContext.Provider>,
  );

  if (!head) {
    throw new Error(
      `No <SEOHead> rendered for ${path}; the head tags cannot be pre-rendered.`,
    );
  }

  return { html, head: head as HeadData };
}
