import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "./demo";

/** Contexte transmis depuis la homepage : Pays → Ville → Quartier → Univers. */
export type AppSearch = {
  q?: string;
  country?: string;
  city?: string;
  district?: string;
  cat?: string;
};

const str = (v: unknown) => (typeof v === "string" && v.trim() !== "" ? v : undefined);

export const Route = createFileRoute("/app")({
  validateSearch: (search: Record<string, unknown>): AppSearch => ({
    q: str(search.q),
    country: str(search.country),
    city: str(search.city),
    district: str(search.district),
    cat: str(search.cat),
  }),
  head: () => ({
    meta: [
      { title: "AfriLink — Votre réseau" },
      { name: "description", content: "Fil d'actualité, recommandations et messagerie AfriLink." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AppShell,
});
