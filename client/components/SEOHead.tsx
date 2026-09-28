import { createContext, useContext, useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown>[];
}

import { SITE } from "@/data/site";

const BASE_URL = SITE.url;
const DEFAULT_IMAGE = SITE.ogImage;
const SITE_NAME = SITE.title;

export interface HeadData {
  title: string;
  description: string;
  url: string;
  ogImage: string;
  ogType: string;
  keywords?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown>[];
}

// Populated only by the build-time pre-render, which has no DOM to write to.
// Last write wins, so React's dev-mode double render is harmless.
export const SEOCollectorContext = createContext<{
  push: (data: HeadData) => void;
} | null>(null);

export function SEOHead({
  title,
  description,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
  keywords,
  noIndex,
  jsonLd,
}: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

  const collector = useContext(SEOCollectorContext);

  // Build-time pre-render: hand the head tags to the collector instead of
  // touching the DOM. This runs during render rather than in an effect
  // because renderToStaticMarkup never flushes effects, and the tags have to
  // exist before the markup is serialised into the static HTML.
  if (collector) {
    collector.push({
      title: fullTitle,
      description,
      url,
      ogImage,
      ogType,
      keywords,
      noIndex,
      jsonLd,
    });
  }

  useEffect(() => {
    // The pre-render already wrote these into the served HTML.
    if (collector) return;

    document.title = fullTitle;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    if (noIndex) {
      setMeta("robots", "noindex, nofollow");
    } else {
      setMeta(
        "robots",
        "index, follow, max-image-preview:large, max-snippet:-1",
      );
    }
    setMeta("title", fullTitle);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:url", url, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:type", ogType, true);
    setMeta("og:site_name", SITE_NAME, true);
    setMeta("twitter:card", "summary_large_image", true);
    setMeta("twitter:url", url, true);
    setMeta("twitter:title", fullTitle, true);
    setMeta("twitter:description", description, true);
    setMeta("twitter:image", ogImage, true);

    let canonicalEl = document.querySelector("link[rel='canonical']");
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", url);

    const existingJsonLd = document.querySelector("#seo-jsonld");

    if (jsonLd) {
      let script = existingJsonLd as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = "seo-jsonld";
        script.setAttribute("type", "application/ld+json");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(
        { "@context": "https://schema.org", "@graph": jsonLd },
        null,
        2,
      );
    } else if (existingJsonLd) {
      existingJsonLd.remove();
    }
  }, [fullTitle, description, url, ogImage, ogType, keywords, noIndex, jsonLd]);

  return null;
}
