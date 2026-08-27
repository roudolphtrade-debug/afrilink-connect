import odileAsset from "@/assets/odile.jpg.asset.json";
import roudolphAsset from "@/assets/roudolph.png.asset.json";

/** Photos réelles de l'équipe fondatrice. */
export const ODILE_PHOTO = odileAsset.url;
export const ROUDOLPH_PHOTO = roudolphAsset.url;

// 18 portraits féminins + 18 portraits masculins, tous distincts.
const womenModules = import.meta.glob<{ default: string }>(
  "@/assets/portraits/w*.jpg",
  { eager: true },
);
const menModules = import.meta.glob<{ default: string }>(
  "@/assets/portraits/m*.jpg",
  { eager: true },
);

function toSortedUrls(mods: Record<string, { default: string }>) {
  return Object.keys(mods)
    .sort()
    .map((k) => mods[k]!.default);
}

const WOMEN = toSortedUrls(womenModules);
const MEN = toSortedUrls(menModules);

const FEMALE_FIRST_NAMES = new Set([
  "marie", "estelle", "nadège", "ariane", "christelle", "sandrine", "léa", "aline",
  "grace", "grâce", "clarisse", "amina", "aïcha", "fatou", "maria", "chidinma",
  "ablavi", "prisca", "bernadette", "amira", "aya", "odile", "awa", "nadia",
  "sophie", "carine", "laure", "sarah", "aminata", "teranga",
]);

function firstName(name: string) {
  return name.replace(/^Dr\.?\s*/i, "").trim().split(/[\s-]+/)[0]?.toLowerCase() ?? "";
}

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/**
 * Attribution déterministe et sans doublon : le portrait dépend uniquement du
 * nom (hash stable côté serveur comme côté client, donc pas de décalage
 * d'hydratation). En cas de collision sur un pool, on avance au slot libre
 * suivant (probing linéaire) afin que deux profils affichés ensemble n'aient
 * jamais la même photo.
 */
const assigned = new Map<string, string>();
const takenWomen = new Set<number>();
const takenMen = new Set<number>();

export function portrait(seed: string) {
  const key = firstName(seed);
  if (key === "odile") return ODILE_PHOTO;
  if (key === "roudolph") return ROUDOLPH_PHOTO;

  const cacheKey = seed.trim().toLowerCase();
  const existing = assigned.get(cacheKey);
  if (existing) return existing;

  const female = FEMALE_FIRST_NAMES.has(key);
  const pool = female ? WOMEN : MEN;
  const taken = female ? takenWomen : takenMen;
  if (pool.length === 0) return ODILE_PHOTO;

  let idx = hash(cacheKey) % pool.length;
  if (taken.size < pool.length) {
    let steps = 0;
    while (taken.has(idx) && steps < pool.length) {
      idx = (idx + 1) % pool.length;
      steps++;
    }
  }
  taken.add(idx);
  const picked = pool[idx]!;
  assigned.set(cacheKey, picked);
  return picked;
}
