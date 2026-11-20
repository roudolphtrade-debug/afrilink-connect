import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FaqAccordion, useFaqSearch } from "@/components/HelpDrawer";
import { Button } from "@/components/ui/button";
import { FAQ, COMMUNITY_RULES, PRIVACY_POINTS } from "@/lib/help-data";

export const Route = createFileRoute("/aide")({
  head: () => ({ meta: [
    { title: "Centre d'aide — AfriLink" },
    { name: "description", content: "Rechercher une réponse sur le parcours logement AfriLink en préparation et la démonstration locale." },
    { property: "og:title", content: "Centre d'aide — AfriLink" },
    { property: "og:description", content: "Questions, contrôles prévus et limites de la démonstration AfriLink." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: HelpPage,
});
function HelpPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const groups = useFaqSearch(q, cat);
  return <div>
    <SiteHeader />
    <section className="section-cream"><div className="mx-auto max-w-4xl px-4 py-16 text-center md:px-8 md:py-24">
      <span className="text-sm font-semibold uppercase tracking-widest text-accent">Aide</span>
      <h1 className="mt-4 text-3xl font-bold md:text-5xl">Comment pouvons-nous vous aider ?</h1>
      <p className="mt-4 text-base text-muted-foreground">Consultez les réponses sur le parcours en préparation et la démonstration. Aucun formulaire de contact ou de signalement n'est opérationnel sur ce site.</p>
      <div className="mx-auto mt-8 flex max-w-xl items-center gap-3 rounded-full border border-border bg-card px-5 py-3 shadow-soft"><Search className="h-5 w-5 text-muted-foreground" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher dans l'aide…" className="w-full bg-transparent text-base outline-none" aria-label="Rechercher dans l'aide" /></div>
      <div className="mt-5 flex flex-wrap justify-center gap-2"><Button variant={cat === "all" ? "pill" : "pill-outline"} onClick={() => setCat("all")}>Tout</Button>{FAQ.map((c) => <Button key={c.id} variant={cat === c.id ? "pill" : "pill-outline"} onClick={() => setCat(c.id)}>{c.label}</Button>)}</div>
    </div></section>
    <section className="bg-background"><div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1fr_320px] md:px-8 md:py-20">
      <div><h2 className="mb-6 text-2xl font-bold">Questions fréquentes</h2><FaqAccordion groups={groups} /></div>
      <aside className="space-y-8">{[{ title: "Règles communautaires", items: COMMUNITY_RULES }, { title: "Confidentialité", items: PRIVACY_POINTS }].map((section) => <section key={section.title}><h2 className="text-xl font-bold">{section.title}</h2><ul className="mt-4 list-disc space-y-3 pl-5 text-base text-muted-foreground">{section.items.map((r) => <li key={r}>{r}</li>)}</ul></section>)}</aside>
    </div></section>
    <SiteFooter />
  </div>;
}
