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
  "sophie", "carine", "laure", "sarah", "aminata",
]);

function firstName(name: string) {
  return name.replace(/^Dr\.?\s*/i, "").trim().split(/[\s-]+/)[0]?.toLowerCase() ?? "";
}

function hash(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

/** Portrait photo réaliste, stable et déterministe pour les profils de démonstration. */
export function portrait(seed: string) {
  const key = firstName(seed);
  if (key === "odile") return ODILE_PHOTO;
  if (key === "roudolph") return ROUDOLPH_PHOTO;
  const pool = FEMALE_FIRST_NAMES.has(key) ? WOMEN : MEN;
  return pool[hash(seed) % pool.length];
}
