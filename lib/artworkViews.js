// Shared helper to derive ordered multi-angle views from an artwork document.
// Works with both raw DB documents ({ images: [{src, alt, isPrimary}], src, image })
// and normalized client-side objects.

const DEFAULT_LABELS = [
  "Front View",
  "Texture Detail",
  "Profile & Frame",
  "In-Situ Room View",
];

/**
 * Automatically injects Cloudinary f_auto,q_auto transformations if the URL
 * is a Cloudinary URL that doesn't already have transformations.
 */
export function optimizeImageUrl(url, width = null) {
  if (!url || typeof url !== "string") return "";
  if (!url.includes("res.cloudinary.com") || !url.includes("/image/upload/")) {
    return url;
  }
  if (width && url.includes(`w_${width}`)) {
    return url;
  }
  if (url.includes("/image/upload/f_auto,q_auto/")) {
    if (!width) return url;
    return url.replace("/image/upload/f_auto,q_auto/", `/image/upload/f_auto,q_auto,w_${width}/`);
  }
  if (
    url.includes("/image/upload/f_") ||
    url.includes("/image/upload/q_") ||
    url.includes("/image/upload/w_") ||
    url.includes("/image/upload/c_")
  ) {
    return url;
  }
  const transform = width ? `f_auto,q_auto,w_${width}` : "f_auto,q_auto";
  return url.replace("/image/upload/", `/image/upload/${transform}/`);
}

/**
 * Returns an ordered array of { src, label } angle views for an artwork.
 * Primary image always comes first. Falls back to legacy src/image fields.
 */
export function angleViews(artwork) {
  if (!artwork) return [];

  const raw = Array.isArray(artwork.images) ? artwork.images : [];
  const valid = raw.filter(
    (img) => img && typeof img.src === "string" && img.src.trim()
  );

  // Primary angle first, preserve admin-defined order for the rest
  const ordered = [
    ...valid.filter((img) => img.isPrimary),
    ...valid.filter((img) => !img.isPrimary),
  ];

  const views = ordered.map((img, idx) => ({
    src: optimizeImageUrl(img.src),
    label: img.alt || img.label || DEFAULT_LABELS[idx % DEFAULT_LABELS.length],
  }));

  // Legacy single-image field (src or image) — include if not already covered
  const single =
    typeof artwork.src === "string" && artwork.src.trim()
      ? artwork.src
      : typeof artwork.image === "string" && artwork.image.trim()
        ? artwork.image
        : null;

  if (single && !views.some((v) => v.src === single || v.src === optimizeImageUrl(single))) {
    views.unshift({ src: optimizeImageUrl(single), label: "Front View" });
  }

  return views;
}

/**
 * Convenience: the primary (first) image src.
 * Returns empty string if no valid src found — Image components handle this gracefully.
 */
export function primarySrc(artwork) {
  return angleViews(artwork)[0]?.src || "";
}
