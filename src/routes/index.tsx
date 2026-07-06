import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck, Users, MessageCircle, Compass, Search, Send, Handshake, Sparkles,
  Hammer, HeartPulse, GraduationCap, Truck, FileText, Home as HomeIcon, Briefcase,
  Plane, Building2, Wallet, Rocket, Baby, BookOpen, Palmtree, Star, ArrowRight, Check, X,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Avatar } from "@/components/Avatar";
import { JoinCommunityCta } from "@/components/JoinCommunityCta";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

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
  return (
    <div>
      <SiteHeader />

      {/* HERO */}
      <section className="section-cream relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-forest/10 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:px-8 md:py-28 md:items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-card px-4 py-1.5 text-xs font-semibold text-foreground">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Le réseau de confiance africain
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] md:text-6xl">
              Le réseau de confiance pour réussir votre <span className="text-accent">arrivée en Afrique</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Trouvez les bonnes personnes avant les bonnes adresses.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <JoinCommunityCta size="pill-lg" className="shadow-elevated">
                Rejoindre la communauté
              </JoinCommunityCta>
              <Button variant="pill-outline" size="pill-lg" asChild>
                <a href="#solution">Découvrir AfriLink</a>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6">
              <Stat value="12 000+" label="Membres actifs" />
              <Stat value="1 200+" label="Pros vérifiés" />
              <Stat value="4,7/5" label="Satisfaction" />
            </div>
          </Reveal>
          <Reveal delay={150} className="relative">
            <div className="relative rounded-3xl bg-card p-6 shadow-elevated">
              <div className="flex items-center gap-3">
                <span className="icon-circle"><Search className="h-5 w-5" /></span>
                <div className="flex-1 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
                  Plombier de confiance à Dakar…
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  { name: "Aïcha D.", cat: "Décoratrice · Dakar", rating: 4.9, color: "var(--forest-light)", initials: "AD" },
                  { name: "Kwame M.", cat: "Médecin · Accra", rating: 4.7, color: "var(--accent)", initials: "KM" },
                  { name: "Amina K.", cat: "Immobilier · Abidjan", rating: 4.8, color: "var(--forest)", initials: "AK" },
                ].map((c) => (
                  <div key={c.name} className="flex items-center gap-3 rounded-2xl border border-border p-3">
                    <Avatar initials={c.initials} color={c.color} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate font-semibold">{c.name}</p>
                        <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold text-accent">Vérifié</span>
                      </div>
                      <p className="truncate text-xs text-muted-foreground">{c.cat}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      <Star className="h-4 w-4 fill-accent text-accent" /> {c.rating}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-forest p-4 text-forest-foreground shadow-floating md:block">
              <p className="text-xs opacity-70">Nouveau membre</p>
              <p className="font-display font-semibold">Bienvenue à Nairobi 👋</p>
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
                  <p className="mt-5 leading-relaxed">"{t.quote}"</p>
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
                <Stat value="12 000+" label="Membres" />
                <Stat value="1 200+" label="Pros vérifiés" />
                <Stat value="4,7/5" label="Satisfaction" />
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
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Les bonnes personnes. Les bons plans. La bonne connexion.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="pill" size="pill-lg" className="shadow-elevated" asChild>
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
