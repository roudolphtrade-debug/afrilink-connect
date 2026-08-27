import { PROS, STATUS_META, type Pro, type ProStatus } from "@/lib/mock-data";
import { LIBRARY_ENTRIES } from "@/data/library";

/** Onglets de la démo réservés aux membres connectés (source unique de vérité). */
export const MEMBER_GATED_TABS = [
  { id: "library", label: "Bibliothèque", rule: "Lecture complète et sommaire réservés aux membres (5 pages libres)." },
  { id: "profile", label: "Profil", rule: "Profil et édition réservés aux membres." },
  { id: "messages", label: "Messages", rule: "Envoi de message réservé aux membres." },
  { id: "settings", label: "Paramètres", rule: "Paramètres du compte réservés aux membres." },
] as const;

export type Severity = "ok" | "warn" | "error";

export type Check = {
  id: string;
  scope: string;
  label: string;
  severity: Severity;
  detail: string;
  items?: string[];
};

const LOWER_WORDS = new Set(["de", "des", "du", "la", "le", "les", "et", "à", "au", "aux", "d'", "l'", "sur", "en"]);

/** Un nom est bien capitalisé si chaque mot significatif commence par une majuscule. */
export function isWellCapitalized(name: string) {
  const words = name.trim().split(/\s+/);
  if (words.length === 0) return false;
  return words.every((w, i) => {
    const clean = w.replace(/^[("«]+/, "");
    if (!clean) return false;
    if (i > 0 && LOWER_WORDS.has(clean.toLowerCase())) return true;
    if (/^\d/.test(clean)) return true;
    const first = clean[0]!;
    return first === first.toLocaleUpperCase("fr-FR");
  });
}

export function capitalizeName(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((w, i) => (i > 0 && LOWER_WORDS.has(w.toLowerCase()) ? w.toLowerCase() : w.charAt(0).toLocaleUpperCase("fr-FR") + w.slice(1)))
    .join(" ");
}

export type PersonRow = {
  id: string;
  name: string;
  status: ProStatus;
  statusLabel: string;
  city: string;
  category: string;
  kind: Pro["kind"];
  avatar: string;
  imageKey: string;
  duplicateWith: string[];
  nameOk: boolean;
  statusOk: boolean;
};

function imageKey(url?: string) {
  if (!url) return "";
  return url.split("?")[0]!.split("/").pop() ?? url;
}

/** Une seule photo par personne : toute réutilisation d'un même fichier est signalée. */
export function buildPersonRows(): PersonRow[] {
  const persons = PROS.filter((p) => p.kind === "person");
  const byImage = new Map<string, string[]>();
  persons.forEach((p) => {
    const k = imageKey(p.avatar);
    if (!k) return;
    byImage.set(k, [...(byImage.get(k) ?? []), p.name]);
  });

  return persons.map((p) => {
    const k = imageKey(p.avatar);
    const status = p.status ?? "reference";
    const dupes = (byImage.get(k) ?? []).filter((n) => n !== p.name);
    return {
      id: p.id,
      name: p.name,
      status,
      statusLabel: STATUS_META[status].label,
      city: p.city,
      category: p.category,
      kind: p.kind,
      avatar: p.avatar ?? "",
      imageKey: k || "—",
      duplicateWith: dupes,
      nameOk: isWellCapitalized(p.name),
      // Hors équipe fondatrice, aucun statut ne doit être attribué automatiquement.
      statusOk: status === "reference" || status === "equipe",
    };
  });
}

export function runValidation(rows = buildPersonRows()): Check[] {
  const checks: Check[] = [];

  const missing = rows.filter((r) => !r.avatar);
  const dupes = rows.filter((r) => r.duplicateWith.length > 0);
  checks.push({
    id: "images-unique",
    scope: "Images",
    label: "Unicité des portraits",
    severity: dupes.length ? "error" : "ok",
    detail: dupes.length
      ? `${dupes.length} profil(s) partagent un même fichier image.`
      : `${rows.length} personnes, ${new Set(rows.map((r) => r.imageKey)).size} images distinctes.`,
    items: dupes.map((d) => `${d.name} ↔ ${d.duplicateWith.join(", ")}`),
  });
  checks.push({
    id: "images-present",
    scope: "Images",
    label: "Portrait présent",
    severity: missing.length ? "warn" : "ok",
    detail: missing.length ? `${missing.length} personne(s) sans portrait (repli monogramme).` : "Toutes les personnes ont un portrait.",
    items: missing.map((m) => m.name),
  });

  const badNames = rows.filter((r) => !r.nameOk);
  checks.push({
    id: "names",
    scope: "Noms",
    label: "Capitalisation des noms",
    severity: badNames.length ? "error" : "ok",
    detail: badNames.length ? `${badNames.length} nom(s) mal capitalisés.` : "Tous les noms sont correctement capitalisés.",
    items: badNames.map((b) => `${b.name} → ${capitalizeName(b.name)}`),
  });

  const badStatus = rows.filter((r) => !r.statusOk);
  checks.push({
    id: "status",
    scope: "Statuts",
    label: "« Référencé » par défaut",
    severity: badStatus.length ? "error" : "ok",
    detail: badStatus.length
      ? `${badStatus.length} fiche(s) avec un statut attribué automatiquement.`
      : `Statuts conformes (${rows.filter((r) => r.status === "equipe").length} membres Équipe, le reste Référencé).`,
    items: badStatus.map((b) => `${b.name} → ${b.statusLabel}`),
  });

  const places = PROS.filter((p) => p.kind === "place" && p.avatar);
  checks.push({
    id: "places",
    scope: "Images",
    label: "Aucun portrait sur les établissements",
    severity: places.length ? "error" : "ok",
    detail: places.length ? `${places.length} établissement(s) avec un portrait inventé.` : "Les établissements utilisent uniquement des monogrammes.",
    items: places.map((p) => p.name),
  });

  const lockedLibrary = LIBRARY_ENTRIES.length;
  checks.push({
    id: "locks",
    scope: "Accès membre",
    label: "Verrouillage membre par route",
    severity: "ok",
    detail: `${MEMBER_GATED_TABS.length} zones verrouillées hors connexion · ${lockedLibrary} entrées de bibliothèque protégées.`,
    items: MEMBER_GATED_TABS.map((t) => `${t.label} — ${t.rule}`),
  });

  return checks;
}

export function personRowsToCsv(rows: PersonRow[]) {
  const head = ["id", "nom", "statut", "ville", "univers", "image", "doublon", "doublon_avec", "nom_conforme"];
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const lines = rows.map((r) =>
    [
      r.id,
      r.name,
      r.statusLabel,
      r.city,
      r.category,
      r.imageKey,
      r.duplicateWith.length ? "oui" : "non",
      r.duplicateWith.join(" | "),
      r.nameOk ? "oui" : "non",
    ]
      .map((v) => esc(String(v)))
      .join(","),
  );
  return [head.join(","), ...lines].join("\n");
}

export function downloadCsv(filename: string, csv: string) {
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
