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
      { title: "Explorer la démonstration — AfriLink" },
      { name: "description", content: "Démonstration locale AfriLink : demandes, publications et messages simulés, sans offres actuelles validées ni visites réservables." },
      { property: "og:title", content: "Explorer la démonstration — AfriLink" },
      { property: "og:description", content: "Le service logement à Douala est en préparation. Rien n'est transmis à l'équipe depuis cette démonstration." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AppShell,
});
