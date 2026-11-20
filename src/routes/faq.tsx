import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FaqAccordion } from "@/components/HelpDrawer";
import { FAQ } from "@/lib/help-data";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [
    { title: "FAQ — Le parcours logement prévu d'AfriLink" },
    { name: "description", content: "Référencement, contrôles, confirmation des visites, frais et suivi : les réponses sur le premier service logement AfriLink en préparation à Douala." },
    { property: "og:title", content: "FAQ — AfriLink à Douala" },
    { property: "og:description", content: "Distinguer le futur parcours logement des essais locaux de la démonstration AfriLink." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: FaqPage,
});
function FaqPage() {
  return <div>
    <SiteHeader />
    <section className="section-cream"><div className="mx-auto max-w-4xl px-4 py-16 text-center md:px-8 md:py-24"><span className="text-sm font-semibold uppercase tracking-widest text-accent">FAQ</span><h1 className="mt-4 text-3xl font-bold md:text-5xl">Vos questions, des réponses précises.</h1><p className="mt-6 text-lg text-muted-foreground">Le premier service logement à Douala est en préparation. Les engagements ci-dessous décrivent le parcours prévu, pas un service déjà ouvert.</p></div></section>
    <section className="bg-background"><div className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-20"><FaqAccordion groups={FAQ} /></div></section>
    <SiteFooter />
  </div>;
}
