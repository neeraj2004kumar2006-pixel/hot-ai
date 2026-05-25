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
