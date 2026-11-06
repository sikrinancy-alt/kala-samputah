/**
 * lib/sanitize.js
 * Lightweight input sanitization helpers — no external deps.
 * Purpose: strip dangerous characters before saving to MongoDB.
 */

/**
 * Strip HTML tags and dangerous characters from a string.
 * Used on all user-supplied text before DB save.
 */
export function stripHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/<[^>]*>/g, "")          // remove HTML tags
    .replace(/&lt;/g,  "<")
    .replace(/&gt;/g,  ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .trim();
}

/**
 * Normalize an email address — lowercase, trim, remove dots in local part.
 */
export function normalizeEmail(email) {
  if (typeof email !== "string") return "";
  return email.toLowerCase().trim();
}

/**
 * Sanitize a name — allow only letters, spaces, hyphens, apostrophes.
 * Max 100 chars.
 */
export function sanitizeName(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/<[^>]*>/g, "")
    .replace(/[^a-zA-Z\u00C0-\u024F\s'\-\.]/g, "")
    .trim()
    .slice(0, 100);
}

/**
 * Sanitize a plain text message — strip HTML, limit length.
 * Max 2000 chars.
 */
export function sanitizeMessage(str, maxLength = 2000) {
  if (typeof str !== "string") return "";
  return stripHtml(str).slice(0, maxLength);
}

/**
 * Sanitize a phone number — allow only digits, +, -, spaces, parentheses.
 * Max 20 chars.
 */
export function sanitizePhone(str) {
  if (typeof str !== "string") return "";
  return str.replace(/[^0-9+\-\s()]/g, "").trim().slice(0, 20);
}

/**
 * Sanitize a URL — only allow http/https, no javascript: or data: URIs.
 */
export function sanitizeUrl(str) {
  if (typeof str !== "string") return "";
  const trimmed = str.trim();
  if (/^javascript:/i.test(trimmed)) return "";
  if (/^data:/i.test(trimmed))       return "";
  return trimmed.slice(0, 500);
}

/**
 * Sanitize a slug — lowercase, alphanumeric + hyphens only.
 */
export function sanitizeSlug(str) {
  if (typeof str !== "string") return "";
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
}

/**
 * Sanitize a short text field (titles, labels, categories).
 * Max 200 chars.
 */
export function sanitizeText(str, maxLength = 200) {
  if (typeof str !== "string") return "";
  return stripHtml(str).slice(0, maxLength);
}
