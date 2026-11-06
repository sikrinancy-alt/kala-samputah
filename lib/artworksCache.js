// In-memory artworks cache for client side to prevent parallel duplicate fetches

let cache = null;
let inflightPromise = null;
let cacheTime = 0;
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes

export async function getCachedArtworks() {
  const now = Date.now();
  if (cache && now - cacheTime < CACHE_TTL) {
    return cache;
  }

  if (inflightPromise) {
    return inflightPromise;
  }

  inflightPromise = fetch("/api/artworks?light=1")
    .then((res) => (res.ok ? res.json() : { artworks: [] }))
    .then((data) => {
      const all = data.artworks || [];
      // Only keep artworks with valid Cloudinary URLs or absolute https URLs
      // Skip old local /art/ and /uploads/ paths that no longer exist
      cache = all.filter((a) => {
        const src = a.src || (Array.isArray(a.images) && a.images[0]?.src) || "";
        if (!src) return false;
        // Accept https (Cloudinary) or relative paths that are NOT the old /art/ or /uploads/ folders
        if (src.startsWith("https://")) return true;
        if (src.startsWith("/art/"))     return false;
        if (src.startsWith("/uploads/")) return false;
        return true;
      });
      cacheTime = Date.now();
      inflightPromise = null;
      return cache;
    })
    .catch((err) => {
      inflightPromise = null;
      return cache || [];
    });

  return inflightPromise;
}

export function clearArtworksCache() {
  cache = null;
  cacheTime = 0;
}
