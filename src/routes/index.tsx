import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type Ref } from "react";
import {
  ShieldCheck, Users, MessageCircle, Compass, Search, Send, Handshake, Sparkles,
  Hammer, HeartPulse, GraduationCap, Truck, FileText, Home as HomeIcon, Briefcase,
  Plane, Wallet, Rocket, Baby, BookOpen, Palmtree, Star, ArrowRight, Check, X, MapPin,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Avatar } from "@/components/Avatar";
import { JoinCommunityCta } from "@/components/JoinCommunityCta";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { useMagnetic } from "@/hooks/use-magnetic";
import { STATS, MAIN_CITIES, OPENING_CITIES } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const QUICK_SUGGESTIONS = [
  "Plombier",
  "Logement meublé",
  "Pédiatre",
  "Chauffeur aéroport",
  "Cours de soutien",
  "Démarches administratives",
];

function HeroSearch() {
  const navigate = useNavigate();
  const [city, setCity] = useState<string>(MAIN_CITIES[0]);
  const [q, setQ] = useState("");

  const go = () => navigate({ to: "/app" });

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <form
        onSubmit={(e) => { e.preventDefault(); go(); }}
        className="flex flex-col gap-2 rounded-3xl border border-border bg-card p-2 shadow-elevated sm:flex-row sm:items-center sm:rounded-full"
      >
        <div className="flex flex-1 items-center gap-3 px-4 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="De quoi avez-vous besoin ?"
            aria-label="Rechercher un service ou un professionnel"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-2 border-t border-border px-2 py-1 sm:border-l sm:border-t-0 sm:py-0">
          <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            aria-label="Choisir une ville"
            className="bg-transparent py-2 text-sm font-medium outline-none"
          >
            {MAIN_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            {OPENING_CITIES.map((c) => (
              <option key={c} value={c} disabled>{c} — en cours d'ouverture</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Rechercher <ArrowRight className="h-4 w-4" />
        </button>
      </form>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {QUICK_SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => { setQ(s); go(); }}
            className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-accent/50 hover:text-foreground"
          >
            {s}
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Bientôt : {OPENING_CITIES.join(" · ")}
      </p>
    </div>
  );
}

const pillars = [
  { icon: ShieldCheck, title: "Professionnels vérifiés", desc: "Chaque pro est validé par notre équipe et noté par la communauté." },
  { icon: Users, title: "Recommandations humaines", desc: "Des avis réels de membres qui ont déjà testé pour vous." },
  { icon: MessageCircle, title: "Communauté active", desc: "Échangez, demandez conseil, partagez vos bons plans." },
  { icon: Compass, title: "Accompagnement complet", desc: "Avant, pendant et après votre arrivée sur le continent." },
];

const steps = [
  { icon: Users, title: "Inscrivez-vous", desc: "Créez votre profil en 2 minutes." },
  { icon: Search, title: "Recherchez ou diffusez", desc: "Trouvez un pro ou publiez une demande." },
  { icon: Send, title: "Échangez", desc: "Discutez en direct avec la personne de confiance." },
  { icon: Handshake, title: "Contribuez", desc: "Laissez un avis, aidez la communauté." },
  { icon: Sparkles, title: "Faites grandir votre réseau", desc: "Restez connecté et découvrez de nouveaux membres." },
];

const universes = [
  { icon: Hammer, label: "Maison & Artisanat" },
  { icon: HeartPulse, label: "Santé & Bien-être" },
  { icon: GraduationCap, label: "Éducation" },
  { icon: Truck, label: "Transport & Logistique" },
  { icon: FileText, label: "Services administratifs" },
  { icon: Sparkles, label: "Loisirs & Lifestyle" },
  { icon: HomeIcon, label: "Immobilier" },
  { icon: Briefcase, label: "Emploi & Business" },
];

const profiles = [
  { icon: Plane, label: "Expatriés", color: "var(--forest)" },
  { icon: Users, label: "Diasporas", color: "var(--accent)" },
  { icon: Wallet, label: "Investisseurs", color: "var(--forest-light)" },
  { icon: Rocket, label: "Entrepreneurs", color: "var(--gold-dark)" },
  { icon: Baby, label: "Familles", color: "var(--forest-sage)" },
  { icon: BookOpen, label: "Étudiants", color: "var(--gold-bronze)" },
  { icon: Palmtree, label: "Voyageurs longue durée", color: "var(--forest)" },
  { icon: HomeIcon, label: "Retraités internationaux", color: "var(--accent)" },
];

const testimonials = [
  { name: "Sophie L.", role: "Expatriée à Douala", initials: "SL", color: "var(--forest-light)", quote: "Arrivée seule à Douala, je ne savais pas par où commencer. Grâce à AfriLink, j'ai trouvé un logement en une semaine et rencontré des gens qui sont devenus de vrais amis." },
  { name: "Marc D.", role: "Entrepreneur", initials: "MD", color: "var(--accent)", quote: "Les recommandations sur AfriLink m'ont évité plusieurs mauvaises expériences. C'est rassurant de savoir que la communauté a déjà testé pour moi." },
  { name: "Ava S.", role: "Membre active", initials: "AS", color: "var(--forest)", quote: "Une plateforme simple et humaine, qui donne vraiment envie de s'entraider. Je recommande AfriLink à toute personne qui débarque en Afrique." },
];

function LandingPage() {
  const outlineMagnetic = useMagnetic<HTMLAnchorElement>();
  const finalCtaMagnetic = useMagnetic<HTMLAnchorElement>();

  return (
    <div>
      <SiteHeader />

      {/* HERO */}
      <section className="section-cream relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-forest/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center md:px-8 md:py-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-card px-4 py-1.5 text-xs font-semibold text-foreground">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Le réseau de confiance africain — depuis 2022
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">
              Trouvez les bonnes personnes avant les <span className="text-accent">bonnes adresses</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Douala, Yaoundé, Dakar, Abidjan — un contact vérifié plutôt qu'une recherche au hasard.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <HeroSearch />
          </Reveal>

          <Reveal delay={200}>
            <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-6">
              <Stat value={STATS.plans} label="bons plans depuis 2022" />
              <Stat value={STATS.members} label="membres historiques" />
              <Stat value={STATS.pros} label="pros de confiance" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* LE CONSTAT */}
      <section className="section-forest">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Le constat</span>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              Arriver dans un nouveau pays, c'est arriver sans réseau.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {[
              "Difficile de trouver des personnes fiables",
              "Risque de mauvaises expériences",
              "Manque de recommandations vérifiées",
              "Perte de temps dans l'installation",
            ].map((t, i) => (
              <Reveal key={t} delay={i * 80}>
                <div className="flex items-start gap-4 rounded-2xl bg-white/5 p-6 backdrop-blur">
                  <span className="icon-circle shrink-0"><X className="h-5 w-5" /></span>
                  <p className="text-lg font-medium">{t}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mx-auto mt-14 max-w-2xl rounded-3xl border border-accent/40 bg-accent/10 p-8 text-center">
            <p className="font-display text-4xl font-bold text-accent md:text-5xl">Plusieurs mois</p>
            <p className="mt-3 text-forest-foreground/80">temps moyen pour reconstruire un réseau fiable en arrivant seul.</p>
          </Reveal>
        </div>
      </section>

      {/* LA SOLUTION */}
      <section id="solution" className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">La solution</span>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">Un réseau, quatre piliers</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="group rounded-3xl border border-border bg-card p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-medium">
                  <span className="icon-circle mb-6"><p.icon className="h-6 w-6" /></span>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AVANT / APRÈS */}
      <section className="section-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Avant / Après</span>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">La différence AfriLink</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <Reveal className="rounded-3xl border border-destructive/20 bg-card p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive"><X /></span>
                <h3 className="text-xl font-semibold">Avant</h3>
              </div>
              <ul className="mt-6 space-y-4 text-muted-foreground">
                <li>Vous ne connaissez personne sur place.</li>
                <li>Vous cherchez au hasard sur des groupes non filtrés.</li>
                <li>Vous perdez du temps et prenez des risques.</li>
              </ul>
            </Reveal>
            <Reveal delay={120} className="rounded-3xl border border-forest/20 bg-forest p-8 text-forest-foreground">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground"><Check /></span>
                <h3 className="text-xl font-semibold">Avec AfriLink</h3>
              </div>
              <ul className="mt-6 space-y-4 text-forest-foreground/85">
                <li>Recommandations fiables en quelques minutes.</li>
                <li>Personnes de confiance qui répondent vraiment.</li>
                <li>Gain de temps et meilleure intégration.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section id="comment" className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Comment ça marche</span>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">Cinq étapes, un vrai réseau</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-5">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="relative rounded-3xl border border-border bg-card p-6">
                  <span className="absolute -top-3 left-6 rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="icon-circle mb-5"><s.icon className="h-5 w-5" /></span>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* UNIVERS */}
      <section id="univers" className="section-cream">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Les univers couverts</span>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">Tout ce dont vous avez besoin</h2>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {universes.map((u, i) => (
              <Reveal key={u.label} delay={i * 60}>
                <div className="flex items-center gap-4 rounded-2xl bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-medium">
                  <span className="icon-circle"><u.icon className="h-5 w-5" /></span>
                  <p className="font-medium">{u.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* POUR QUI */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Pour qui ?</span>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">Un réseau pour chaque parcours</h2>
            <p className="mt-4 text-muted-foreground">
              AfriLink s'adresse à toute personne qui arrive, vit, travaille, investit ou voyage en Afrique.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {profiles.map((p, i) => (
              <Reveal key={p.label} delay={i * 60}>
                <div className="rounded-3xl border border-border bg-card p-6 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-medium">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-white" style={{ backgroundColor: p.color }}>
                    <p.icon className="h-6 w-6" />
                  </div>
                  <p className="mt-4 font-semibold">{p.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section id="temoignages" className="section-forest">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Ce que dit la communauté</span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Le problème n'est pas l'absence d'offres, mais l'absence de réseau local fiable.
            </h2>
            <p className="mt-4 text-forest-foreground/75">
              AfriLink transforme ce capital social informel en infrastructure de confiance accessible.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, ti) => (
              <Reveal key={t.name} delay={ti * 100}>
                <div className="rounded-3xl bg-white/5 p-8 backdrop-blur">
                  <div className="flex items-center gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-accent" />)}
                  </div>
                  <p className="mt-5 font-display text-lg italic leading-relaxed text-forest-foreground/95">
                    "{t.quote}"
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <Avatar initials={t.initials} color={t.color} />
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-forest-foreground/60">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT / MODÈLE */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">Impact & modèle</span>
              <h2 className="mt-4 text-3xl font-bold md:text-5xl">Un modèle vertueux et transparent</h2>
              <div className="mt-8 grid grid-cols-3 gap-6">
                <Stat value={STATS.plans} label="Bons plans" />
                <Stat value={STATS.members} label="Membres" />
                <Stat value={STATS.pros} label="Pros de confiance" />
              </div>
            </Reveal>
            <div className="space-y-4">
              {[
                { t: "Gratuit pour la communauté", d: "L'accès aux recommandations et à la messagerie reste gratuit." },
                { t: "Abonnement pros vérifiés", d: "Les professionnels validés bénéficient d'une visibilité premium." },
                { t: "Partenariats installation", d: "Banques, assurances, logement — les bons interlocuteurs à l'arrivée." },
              ].map((m, i) => (
                <Reveal key={m.t} delay={i * 80}>
                  <div className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                    <span className="icon-circle shrink-0"><Check className="h-5 w-5" /></span>
                    <div>
                      <h3 className="font-semibold">{m.t}</h3>
                      <p className="text-sm text-muted-foreground">{m.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section-cream">
        <Reveal className="mx-auto max-w-4xl px-4 py-20 text-center md:px-8">
          <h2 className="text-3xl font-bold md:text-5xl">
            Les bonnes personnes. Les bons plans. La bonne connexion.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              variant="pill"
              size="pill-lg"
              className="shadow-elevated"
              asChild
              ref={finalCtaMagnetic.ref as Ref<HTMLButtonElement>}
              style={finalCtaMagnetic.style}
              onMouseMove={finalCtaMagnetic.onMouseMove}
              onMouseLeave={finalCtaMagnetic.onMouseLeave}
            >
              <Link to="/app">
                Découvrir la plateforme <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-bold md:text-3xl">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground md:text-sm">{label}</p>
    </div>
  );
}
