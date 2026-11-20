import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/nos-controles")({
  head: () => ({ meta: [
    { title: "Nos contrôles — AfriLink" },
    { name: "description", content: "Le protocole de contrôle prévu pour le lancement d'AfriLink à Douala : objet, date, méthode et limites des vérifications." },
    { property: "og:title", content: "Ce qu'AfriLink contrôle, et ce qui reste à confirmer" },
    { property: "og:description", content: "Comprendre le référencement, la recommandation et les contrôles prévus, sans certification globale d'un logement." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ControlsPage,
});

const LEVELS = [
  { title: "Référencé", desc: "Une information intégrée à l'annuaire, sans validation globale. Le référencement seul ne prouve pas qu'un contrôle a été réalisé." },
  { title: "Recommandé", desc: "Une expérience partagée par un membre, avec son contexte et sa date. Elle ne remplace pas les vérifications précises du logement concerné." },
  { title: "Contrôlé par AfriLink", desc: "Des vérifications précises réalisées par un membre AfriLink habilité. Chacune devra indiquer son objet, sa date et sa méthode : ce n'est pas une certification globale." },
];
const CHECKS = [
  { title: "Contact de l'annonceur", desc: "Le moyen de contact devra être vérifié et sa méthode documentée. Un contact joignable ne prouve ni la propriété du logement ni le droit de le louer." },
  { title: "Autorisation de diffusion", desc: "L'accord de l'annonceur pour diffuser les informations et les images devra être documenté. Cet accord ne vaut pas validation de son titre de propriété." },
  { title: "Visite physique", desc: "Un déplacement sur place devra être indiqué comme tel, avec son objet, sa date et les éléments observés. Il ne constitue ni une expertise technique ni une validation juridique." },
  { title: "Contrôle vidéo", desc: "Un contrôle à distance devra être clairement distingué d'une visite physique. Le format et les éléments visibles ou non vérifiables devront être précisés." },
  { title: "Frais reconfirmés", desc: "Loyer, avances, caution et autres frais annoncés devront être reconfirmés avec leur source et leur date. Toute modification significative des frais imposera une nouvelle vérification des frais avant de les présenter comme contrôlés." },
  { title: "Disponibilité reconfirmée", desc: "La disponibilité annoncée devra être reconfirmée et datée. Elle ne remplace pas l'acceptation d'une demande de visite par l'annonceur." },
];
function ControlsPage() {
  return <div>
    <SiteHeader />
    <section className="section-cream">
      <Reveal className="mx-auto max-w-4xl px-4 py-16 text-center md:px-8 md:py-24">
        <span className="text-sm font-semibold uppercase tracking-widest text-accent">Protocole prévu au lancement</span>
        <h1 className="mt-4 text-3xl font-bold md:text-5xl">Ce qu'AfriLink contrôle, et ce qui reste à confirmer.</h1>
        <p className="mt-6 text-lg text-muted-foreground">Le premier service logement à Douala est en préparation. Cette page explique le protocole prévu au lancement, pas des contrôles déjà réalisés. Une information déclarée par l'annonceur restera distincte d'une information contrôlée. Aucun badge ne certifiera globalement un logement.</p>
      </Reveal>
    </section>
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <h2 className="text-3xl font-bold">Des indications à lire précisément</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">{LEVELS.map((level) => <article key={level.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft"><h3 className="text-xl font-bold">{level.title}</h3><p className="mt-3 text-base leading-relaxed text-muted-foreground">{level.desc}</p></article>)}</div>
        <p className="mt-6 text-base text-muted-foreground"><strong className="text-foreground">Équipe AfriLink</strong> désigne un rôle dans le projet, pas un niveau de confiance. Les fiches historiques restent référencées : ce protocole ne les requalifie pas automatiquement.</p>
      </div>
    </section>
    <section className="section-cream">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <h2 className="text-3xl font-bold">Ce que chaque contrôle devra préciser</h2>
        <p className="mt-4 text-base text-muted-foreground">Objet, date, méthode, résultat et informations restant à confirmer. Aucun contrôle ni horodatage réel n'est présenté ici.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">{CHECKS.map((check) => <article key={check.title} className="rounded-2xl border border-border bg-card p-6"><h3 className="text-xl font-bold">{check.title}</h3><p className="mt-3 text-base leading-relaxed text-muted-foreground">{check.desc}</p></article>)}</div>
      </div>
    </section>
    <section className="section-forest">
      <div className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-20">
        <h2 className="text-3xl font-bold">Les limites ne seront pas masquées</h2>
        <ul className="mt-6 list-disc space-y-4 pl-5 text-base leading-relaxed text-forest-foreground/80">
          <li>Les inconnues et les éléments non contrôlés devront rester visibles.</li>
          <li>Les preuves justificatives seront privées, et non publiées dans les annonces.</li>
          <li>Un badge favorable ne s'achète pas : il devra correspondre à des vérifications documentées.</li>
          <li>Une visite ne remplace ni l'avis d'un spécialiste technique ni un conseil juridique avant un engagement.</li>
        </ul>
      </div>
    </section>
    <SiteFooter />
  </div>;
}
