export function formatArtworkPrice(price) {
  if (price === null || price === undefined || price === "") return null;

  const amount = Number(price);
  if (!Number.isFinite(amount) || amount < 1) return null;

  return `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}
