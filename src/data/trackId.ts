// src/data/trackId.ts
const normalize = (s: string) =>
  s
    .normalize("NFKC")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " "); // collapse spaces

// 32-bit FNV-1a hash
// Hashcode simplifier identity with numeric print and safe data handleing and storage
const fnv1a32 = (str: string): number => {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = (hash +
      ((hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24))) >>> 0;
  }
  return hash >>> 0;
};

// Convert to short text (base36)
const toBase36 = (n: number) => n.toString(36);

// Main function
export const trackIdOf = (title: string, composer: string, extra?: string) => {
  const key = extra
    ? `${normalize(title)}|${normalize(composer)}|${normalize(extra)}`
    : `${normalize(title)}|${normalize(composer)}`;
  return `trk_${toBase36(fnv1a32(key))}`;
};
