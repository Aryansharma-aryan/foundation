import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_IMAGE,
  SITE_NAME,
  SITE_URL,
  findRouteSeo,
  organizationJsonLd,
} from "./siteSeo";

const setMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const setLink = (rel, href) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
};

const setJsonLd = (id, value) => {
  let element = document.getElementById(id);
  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(value);
};

const SeoManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = findRouteSeo(pathname);
    const canonicalPath = seo.path === "/" ? "/" : seo.path;
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;
    const isAdmin = pathname.startsWith("/admin");
    const robots = isAdmin
      ? "noindex, nofollow, noarchive"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

    document.title = seo.title;
    document.documentElement.lang = "en-IN";

    setMeta('meta[name="description"]', { name: "description", content: seo.description });
    setMeta('meta[name="keywords"]', { name: "keywords", content: seo.keywords.join(", ") });
    setMeta('meta[name="robots"]', { name: "robots", content: robots });
    setMeta('meta[name="googlebot"]', { name: "googlebot", content: robots });

    setLink("canonical", canonicalUrl);

    setMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    setMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    setMeta('meta[property="og:title"]', { property: "og:title", content: seo.title });
    setMeta('meta[property="og:description"]', {
      property: "og:description",
      content: seo.description,
    });
    setMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    setMeta('meta[property="og:image"]', { property: "og:image", content: DEFAULT_IMAGE });
    setMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: "Davis Girdhar Foundation community support work",
    });
    setMeta('meta[property="og:locale"]', { property: "og:locale", content: "en_IN" });

    setMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
    setMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: seo.description,
    });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: DEFAULT_IMAGE });

    setJsonLd("organization-schema", organizationJsonLd);
    setJsonLd("webpage-schema", {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: seo.title,
      description: seo.description,
      url: canonicalUrl,
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
      },
      about: organizationJsonLd,
    });
  }, [pathname]);

  return null;
};

export default SeoManager;
