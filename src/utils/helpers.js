/**
 * Truncates text to a specified maximum length and appends ellipsis.
 * @param {string} text - The input text.
 * @param {number} maxLength - The maximum length before truncation.
 * @returns {string} The truncated text.
 */
export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

/**
 * Generates a clean URL slug from a title string.
 * @param {string} title - The title to slugify.
 * @returns {string} The URL-friendly slug.
 */
export const generateSlug = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-word characters (except spaces and hyphens)
    .replace(/[\s_]+/g, '-')  // replace spaces and underscores with hyphens
    .replace(/-+/g, '-');     // replace multiple consecutive hyphens with a single hyphen
};

/**
 * Sets dynamic SEO meta tags in the document head.
 */
export const updateMetaTags = ({ title, description, canonicalUrl, url, image, type = 'website', articleData }) => {
  if (typeof document === 'undefined') return;

  // Helper to update or create meta tags
  const setMeta = (selector, attribute, value) => {
    if (!value) return;
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      const attrMatch = selector.match(/\[(.*?)=["'](.*?)["']\]/);
      if (attrMatch) el.setAttribute(attrMatch[1], attrMatch[2]);
      document.head.appendChild(el);
    }
    el.setAttribute(attribute, value);
  };

  if (title) {
    document.title = title;
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[name="twitter:title"]', 'content', title);
  }

  if (description) {
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[name="twitter:description"]', 'content', description);
  }

  if (image) {
    setMeta('meta[property="og:image"]', 'content', image);
    setMeta('meta[name="twitter:image"]', 'content', image);
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
  }

  setMeta('meta[property="og:type"]', 'content', type);
  if (url) setMeta('meta[property="og:url"]', 'content', url);

  if (canonicalUrl) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
  }

  // JSON-LD Schema
  let schemaScript = document.querySelector('#schema-jsonld');
  if (articleData) {
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'schema-jsonld';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "NewsArticle",
          "headline": articleData.title || articleData.name,
          "image": [ image || "https://hotai.com/default-og.jpg" ],
          "datePublished": articleData.publishDate,
          "dateModified": articleData.publishDate,
          "author": [{
            "@type": "Person",
            "name": articleData.author?.name || "Hot AI Admin",
            "url": "https://hotai.com/page/about"
          }]
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://hotai.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": articleData.category || "Article",
              "item": `https://hotai.com/category/${encodeURIComponent(articleData.category || 'Article')}`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": articleData.title || articleData.name,
              "item": url || "https://hotai.com/"
            }
          ]
        }
      ]
    };
    schemaScript.textContent = JSON.stringify(schema);
  } else if (schemaScript) {
    schemaScript.remove();
  }
};
