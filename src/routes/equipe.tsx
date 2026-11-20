import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Avatar } from "@/components/Avatar";
import { ODILE_PHOTO, ROUDOLPH_PHOTO } from "@/lib/portraits";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/equipe")({
  head: () => ({ meta: [
    { title: "Notre histoire — AfriLink" },
    { name: "description", content: "De Les Bons Plans du Bled à AfriLink : Odile Ebongue et Roudolph Doualla préparent un premier service logement à Douala." },
    { property: "og:title", content: "Notre histoire — Des contacts partagés à un service suivi" },
    { property: "og:description", content: "L'histoire d'AfriLink, les rôles de ses fondateurs et un développement conditionné à la capacité de suivi." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: TeamPage,
});
const team = [
  { name: "Odile Ebongue", role: "Fondatrice", initials: "OE", color: "var(--forest)", photo: ODILE_PHOTO, bio: "Odile porte les relations locales, l'organisation des contrôles et la qualité de l'accompagnement." },
  { name: "Roudolph Doualla", role: "Cofondateur", initials: "RD", color: "var(--accent)", photo: ROUDOLPH_PHOTO, bio: "Roudolph porte le produit, le fonctionnement technique et la traçabilité des démarches." },
];
function TeamPage() {
  return <div>
    <SiteHeader />
    <section className="section-cream">
      <Reveal className="mx-auto max-w-4xl px-4 py-16 text-center md:px-8 md:py-24">
        <span className="text-sm font-semibold uppercase tracking-widest text-accent">Notre histoire</span>
        <h1 className="mt-4 text-3xl font-bold md:text-5xl">Des contacts partagés à un service suivi.</h1>
        <div className="mt-6 space-y-5 text-left text-lg leading-relaxed text-muted-foreground">
          <p>AfriLink prolonge l'histoire de Les Bons Plans du Bled.</p>
          <p>À son installation au Cameroun, Odile constate combien les adresses utiles et les contacts circulent par les relations personnelles. Elle crée Les Bons Plans du Bled pour les rendre plus accessibles.</p>
          <p>Roudolph rejoint cette démarche pour construire le produit et son fonctionnement technique. Ensemble, ils développent AfriLink autour d'une exigence : expliquer l'origine des informations, rendre les contrôles compréhensibles et suivre les mises en relation.</p>
          <p>Le projet commence à Douala, avec un premier service consacré à la recherche de logement et aux demandes de visite. Son développement suivra la capacité de l'équipe à assurer le même niveau de suivi dans chaque nouvelle zone.</p>
        </div>
      </Reveal>
    </section>
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <h2 className="text-center text-3xl font-bold">L'équipe fondatrice</h2>
        <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">{team.map((m, i) => <Reveal key={m.name} delay={i * 80}><article className="h-full rounded-3xl border border-border bg-card p-8 text-center shadow-soft"><div className="flex justify-center"><Avatar initials={m.initials} color={m.color} src={m.photo} alt={m.name} size={104} /></div><h3 className="mt-5 text-xl font-semibold">{m.name}</h3><p className="mt-1 text-sm text-accent">{m.role}</p><p className="mt-4 text-left text-base leading-relaxed text-muted-foreground">{m.bio}</p></article></Reveal>)}</div>
      </div>
    </section>
    <SiteFooter />
  </div>;
}
