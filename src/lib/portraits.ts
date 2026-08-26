import p1 from "@/assets/portraits/p1.jpg";
import p2 from "@/assets/portraits/p2.jpg";
import p3 from "@/assets/portraits/p3.jpg";
import p4 from "@/assets/portraits/p4.jpg";
import p5 from "@/assets/portraits/p5.jpg";
import p6 from "@/assets/portraits/p6.jpg";
import p7 from "@/assets/portraits/p7.jpg";
import p8 from "@/assets/portraits/p8.jpg";
import odileAsset from "@/assets/odile.jpg.asset.json";
import roudolphAsset from "@/assets/roudolph.png.asset.json";

/** Photos réelles de l'équipe fondatrice. */
export const ODILE_PHOTO = odileAsset.url;
export const ROUDOLPH_PHOTO = roudolphAsset.url;

const WOMEN = [p1, p3, p5, p7];
const MEN = [p2, p4, p6, p8];

const FEMALE_FIRST_NAMES = new Set([
  "marie", "estelle", "nadège", "ariane", "christelle", "sandrine", "léa", "aline",
  "grace", "grâce", "clarisse", "amina", "aïcha", "fatou", "maria", "chidinma",
  "ablavi", "prisca", "bernadette", "amira", "aya", "odile", "awa", "nadia",
  "sophie", "carine", "laure", "sarah", "aminata", "teranga",
]);

function firstName(name: string) {
  return name.replace(/^Dr\.?\s*/i, "").trim().split(/[\s-]+/)[0]?.toLowerCase() ?? "";
}

/**
 * Attribution déterministe et *distincte* : chaque nouveau profil reçoit le
 * portrait suivant du pool de son genre (round-robin), ce qui évite les doublons
 * entre profils voisins (ex. Fatou D. et Nadia B.) tout en restant stable :
 * un même nom renvoie toujours la même photo partout dans l'app.
 */
const assigned = new Map<string, string>();
let womenCursor = 0;
let menCursor = 0;

export function portrait(seed: string) {
  const key = firstName(seed);
  if (key === "odile") return ODILE_PHOTO;
  if (key === "roudolph") return ROUDOLPH_PHOTO;

  const cacheKey = seed.trim().toLowerCase();
  const existing = assigned.get(cacheKey);
  if (existing) return existing;

  const female = FEMALE_FIRST_NAMES.has(key);
  const pool = female ? WOMEN : MEN;
  const idx = female ? womenCursor++ : menCursor++;
  const picked = pool[idx % pool.length];
  assigned.set(cacheKey, picked);
  return picked;
}
