export function formatNumber(value: number): string {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `${m >= 10 ? Math.round(m) : m.toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (value >= 1_000) {
    const k = value / 1_000;
    return `${k >= 10 ? Math.round(k) : k.toFixed(1).replace(/\.0$/, "")}k`;
  }
  return value.toLocaleString("fr-FR");
}
