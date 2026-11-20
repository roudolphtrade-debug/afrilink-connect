import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, ClipboardCheck, FileSearch, Handshake, MessageSquareText, Scale, UserCheck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AfriLink — Votre installation à Douala commence par les bons contacts" },
      { name: "description", content: "AfriLink prépare à Douala un premier parcours pour comprendre les conditions d'un logement, les contrôles réalisés et la confirmation d'une visite." },
      { property: "og:title", content: "AfriLink — Votre installation à Douala" },
      { property: "og:description", content: "Premier service logement à Douala en préparation. Les bonnes personnes avant les bonnes adresses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const PILLARS = [
  { icon: Scale, title: "Comprendre les conditions avant de vous déplacer", desc: "Le loyer ne suffit pas à comparer deux logements. Le parcours prévu distinguera les avances demandées, la caution et les autres frais annoncés, ainsi que les informations restant à confirmer." },
  { icon: ClipboardCheck, title: "Savoir ce qui a été contrôlé", desc: "Chaque contrôle devra préciser son objet, sa date et sa méthode. Une information déclarée par l'annonceur restera distinguée d'une information contrôlée." },
  { icon: MessageSquareText, title: "Suivre votre demande", desc: "Le parcours prévu distinguera une demande envoyée d'une visite confirmée par l'annonceur, avec relance et clôture en l'absence de réponse." },
];

const STEPS = [
  { icon: FileSearch, title: "Comparer les logements", desc: "Consulter les caractéristiques, les conditions financières annoncées et les contrôles indiqués pour chaque logement." },
  { icon: CalendarCheck, title: "Demander une visite", desc: "Proposer vos disponibilités. La visite ne sera confirmée qu'après acceptation par l'annonceur." },
  { icon: Handshake, title: "Partager le résultat", desc: "Indiquer si la visite a eu lieu et signaler les écarts constatés avec les informations annoncées." },
];

function LandingPage() {
  return (
    <div>
      <SiteHeader />
      <section className="section-cream relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center md:px-8 md:py-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold">
              <span className="h-2 w-2 rounded-full bg-accent" /> Premier service logement à Douala en préparation
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[1.08] md:text-6xl">
              Votre installation à Douala commence par les <span className="text-accent">bons contacts</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Pour votre recherche de logement, AfriLink prépare un parcours pour consulter les conditions annoncées, comprendre les contrôles réalisés et suivre la confirmation de votre visite.
            </p>
            <p className="mt-5 font-display text-lg font-semibold">Les bonnes personnes avant les bonnes adresses.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button variant="pill" size="pill-lg" asChild><a href="#parcours">Découvrir le parcours</a></Button>
              <Button variant="pill-outline" size="pill-lg" asChild><Link to="/nos-controles">Comprendre nos contrôles</Link></Button>
            </div>
            <Link to="/app" className="mt-5 inline-block text-base font-semibold underline underline-offset-4 hover:text-accent">Explorer la démonstration</Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-16 md:grid-cols-3 md:px-8 md:py-20">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <article className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
                <span className="icon-circle mb-4"><p.icon className="h-5 w-5" /></span>
                <h2 className="text-xl font-bold">{p.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{p.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="parcours" className="section-cream scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">Service en préparation</span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Le parcours logement prévu à Douala</h2>
            <p className="mt-4 text-base text-muted-foreground">Ce parcours n'est pas encore ouvert. Il décrit le fonctionnement prévu au lancement : aucune annonce ni visite n'est actuellement réservable par ce site.</p>
          </Reveal>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="flex items-center gap-3"><span className="icon-circle"><s.icon className="h-5 w-5" /></span><span className="text-sm font-semibold text-muted-foreground">Étape {i + 1}</span></div>
                <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-base text-muted-foreground">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-forest">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-[auto_1fr] md:px-8 md:py-20">
          <span className="icon-circle"><UserCheck className="h-5 w-5" /></span>
          <div>
            <h2 className="text-3xl font-bold">Un accompagnement humain</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-forest-foreground/80">L'organisation prévue confiera les contrôles et le suivi des demandes à un membre AfriLink habilité. Son rôle sera de documenter ce qui a été vérifié, de relancer les demandes restées ouvertes et d'indiquer clairement ce qui reste à confirmer. Les modalités et la disponibilité seront précisées au lancement.</p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center md:px-8 md:py-20">
          <h2 className="text-3xl font-bold">Héritiers de Les Bons Plans du Bled</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">AfriLink prolonge une démarche de partage d'adresses utiles et de contacts. D'autres besoins liés à l'installation pourront être étudiés plus tard, sans engagement d'ouverture tant que le même niveau de suivi ne peut pas être assuré.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="pill" size="pill-lg" asChild><a href="#parcours">Découvrir le parcours</a></Button>
            <Button variant="pill-outline" size="pill-lg" asChild><Link to="/equipe">Notre histoire</Link></Button>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
