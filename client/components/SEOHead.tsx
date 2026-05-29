import { useEffect } from "react";

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

const BASE_URL = "https://drdarshanareddy.com";
const DEFAULT_IMAGE = "https://drdarshanareddy.com/og-image.jpg";
const SITE_NAME = "Dr. Darshana Reddy";

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

  useEffect(() => {
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
      setMeta("robots", "index, follow");
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

    if (jsonLd) {
      let script = document.querySelector("#seo-jsonld");
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
    }
  }, [fullTitle, description, url, ogImage, ogType, keywords, noIndex, jsonLd]);

  return null;
}
