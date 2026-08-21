const KEY = "nava:recent";
const MAX = 8;

export function pushRecent(productId: string) {
  try {
    const raw = localStorage.getItem(KEY);
    const prev: string[] = raw ? JSON.parse(raw) : [];
    const next = [productId, ...prev.filter((id) => id !== productId)].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function getRecent(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
