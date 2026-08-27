import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, type Ref } from "react";
import {
  ShieldCheck, Users, Compass, Search, Send, Handshake, Sparkles,
  Hammer, HeartPulse, GraduationCap, Truck, FileText, Home as HomeIcon, Briefcase,
  Wallet, Star, ArrowRight, MapPin, BadgeCheck, Clock,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Avatar } from "@/components/Avatar";
import { StatusBadge } from "@/components/StatusBadge";
import { JoinCommunityCta } from "@/components/JoinCommunityCta";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { useMagnetic } from "@/hooks/use-magnetic";
import { STATS, MAIN_CITIES, OPENING_CITIES, PROS, CATEGORIES, HISTORIC_PROS, JOURNEYS } from "@/lib/mock-data";

const CITY_META: Record<string, { country: string; flag: string }> = {
  Douala: { country: "Cameroun", flag: "🇨🇲" },
  "Yaoundé": { country: "Cameroun", flag: "🇨🇲" },
  Dakar: { country: "Sénégal", flag: "🇸🇳" },
  Abidjan: { country: "Côte d\u2019Ivoire", flag: "🇨🇮" },
  Libreville: { country: "Gabon", flag: "🇬🇦" },
  Cotonou: { country: "Bénin", flag: "🇧🇯" },
  "Lomé": { country: "Togo", flag: "🇹🇬" },
  Brazzaville: { country: "Congo", flag: "🇨🇬" },
  Kinshasa: { country: "RDC", flag: "🇨🇩" },
  Conakry: { country: "Guinée", flag: "🇬🇳" },
  Bamako: { country: "Mali", flag: "🇲🇱" },
  Kigali: { country: "Rwanda", flag: "🇷🇼" },
  "N'Djamena": { country: "Tchad", flag: "🇹🇩" },
  Bujumbura: { country: "Burundi", flag: "🇧🇮" },
};

/** Pays → villes ouvertes, dérivé des villes réellement actives. */
const OPEN_BY_COUNTRY = MAIN_CITIES.reduce<Record<string, string[]>>((acc, city) => {
  const country = CITY_META[city].country;
  (acc[country] ??= []).push(city);
  return acc;
}, {});
const OPEN_COUNTRIES = Object.keys(OPEN_BY_COUNTRY);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AfriLink — Les bons contacts, ville par ville" },
      {
        name: "description",
        content:
          "Cherchez un contact de confiance, demandez à la communauté ou partagez un bon plan. Douala, Yaoundé, Dakar, Abidjan et 4 autres villes.",
      },
      { property: "og:title", content: "AfriLink — Les bons contacts, ville par ville" },
      {
        property: "og:description",
        content: "Le réseau de confiance de la diaspora africaine, actif depuis 2022.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
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
  const [country, setCountry] = useState<string>(CITY_META[MAIN_CITIES[0]].country);
  const [city, setCity] = useState<string>(MAIN_CITIES[0]);
  const [editingPlace, setEditingPlace] = useState(false);
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    // Sans recherche : uniquement les contacts historiques réels de la communauté.
    if (!term) {
      const pool = HISTORIC_PROS.filter((p) => p.status !== "equipe");
      const local = pool.filter((p) => p.city === city);
      return (local.length ? local : pool).slice(0, 5);
    }
    const matched = PROS.filter((p) => p.city === city).filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.bio.toLowerCase().includes(term) ||
        (CATEGORIES.find((c) => c.slug === p.category)?.label ?? "").toLowerCase().includes(term),
    );
    const weight = (s?: string) => (s === "equipe" ? 0 : s === "verifie" ? 1 : s === "recommande" ? 2 : 3);
    return [...matched].sort((a, b) => weight(a.status) - weight(b.status) || b.rating - a.rating).slice(0, 5);
  }, [q, city]);

  const go = () => navigate({ to: "/app" });
  const open = focused && results.length > 0;

  return (
    <div className="mx-auto mt-8 max-w-2xl">
      {/* Pays → Ville */}
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
        {!editingPlace ? (
          <button
            type="button"
            onClick={() => setEditingPlace(true)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-semibold shadow-soft transition hover:border-accent/50"
          >
            <MapPin className="h-4 w-4 text-accent" />
            <span>{country} · {city}</span>
            <span className="text-xs font-medium text-muted-foreground underline underline-offset-2">Modifier</span>
          </button>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 shadow-soft">
            <MapPin className="h-4 w-4 shrink-0 text-accent" />
            <select
              value={country}
              aria-label="Choisir un pays"
              onChange={(e) => {
                const next = e.target.value;
                setCountry(next);
                setCity(OPEN_BY_COUNTRY[next][0]);
              }}
              className="bg-transparent py-1 text-sm font-semibold outline-none"
            >
              {OPEN_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <span className="text-muted-foreground">·</span>
            <select
              value={city}
              aria-label="Choisir une ville"
              onChange={(e) => setCity(e.target.value)}
              className="bg-transparent py-1 text-sm font-semibold outline-none"
            >
              {OPEN_BY_COUNTRY[country].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); go(); }}
        className="relative flex flex-col gap-2 rounded-3xl border border-border bg-card p-2 shadow-elevated sm:flex-row sm:items-center sm:rounded-full"
      >
        <div className="flex flex-1 items-center gap-3 px-4 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder={`De quoi avez-vous besoin à ${city} ?`}
            aria-label="Rechercher un service ou un professionnel"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Rechercher <ArrowRight className="h-4 w-4" />
        </button>

        {open && (
          <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-3xl border border-border bg-card text-left shadow-elevated">
            <p className="border-b border-border px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {q.trim() ? `Résultats à ${city}` : "Contacts historiques de la communauté"}
            </p>
            {results.map((p) => (
              <button
                key={p.id}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={go}
                className={`flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left transition last:border-0 hover:bg-muted/60 ${
                  p.status === "verifie" || p.status === "equipe" ? "bg-accent/5" : ""
                }`}
              >
                <Avatar initials={p.initials} color={p.color} src={p.avatar} alt={p.name} size={38} />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="truncate text-sm font-semibold">{p.name}</span>
                    <StatusBadge status={p.status ?? "reference"} />
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                    {CATEGORIES.find((c) => c.slug === p.category)?.label} · {p.city}
                    {p.neighborhood ? `, ${p.neighborhood}` : ""}
                  </span>
                </span>
                {p.rating > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" /> {p.rating.toFixed(1)}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </form>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {QUICK_SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => { setQ(s); setFocused(true); }}
            className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-accent/50 hover:text-foreground"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Deux CTA explicites, juste sous le moteur */}
      <div className="mt-5 grid gap-3 text-left sm:grid-cols-2">
        <Link
          to="/app"
          className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-medium"
        >
          <span className="icon-circle shrink-0"><Handshake className="h-5 w-5" /></span>
          <span>
            <span className="block text-sm font-semibold">Vous ne trouvez pas ? Demandez à la communauté</span>
            <span className="mt-1 block text-xs text-muted-foreground">
              Publiez votre besoin, les membres répondent avec leurs contacts éprouvés.
            </span>
          </span>
        </Link>
        <Link
          to="/app"
          className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-medium"
        >
          <span className="icon-circle shrink-0"><Send className="h-5 w-5" /></span>
          <span>
            <span className="block text-sm font-semibold">Vous avez un bon plan ? Partagez-le</span>
            <span className="mt-1 block text-xs text-muted-foreground">
              Un artisan fiable, un médecin, une adresse : faites-en profiter les autres.
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}

const ACTIONS = [
  { icon: Search, title: "Rechercher", desc: "Un contact référencé par la communauté, dans votre ville et votre quartier." },
  { icon: Handshake, title: "Demander", desc: "Posez votre besoin à la communauté et recevez des réponses utiles." },
  { icon: Send, title: "Partager", desc: "Transmettez vos bons plans pour renforcer le réseau." },
];

const universes = [
  { icon: Hammer, label: "Maison", examples: "Menuiserie · Plomberie · Électricité · Ménage" },
  { icon: HeartPulse, label: "Santé", examples: "Pédiatrie · Kiné · Dentiste · Pharmacie" },
  { icon: GraduationCap, label: "Éducation", examples: "Cours à domicile · Langues · Écoles" },
  { icon: Truck, label: "Transport", examples: "Chauffeur · Aéroport · Déménagement" },
  { icon: FileText, label: "Administratif & juridique", examples: "Visa · État civil · Avocat" },
  { icon: Sparkles, label: "Loisirs", examples: "Restaurants · Excursions · Événementiel" },
  { icon: HomeIcon, label: "Immobilier", examples: "Meublés · Longue durée · Saisonnier" },
  { icon: Briefcase, label: "Emploi & Business", examples: "Recrutement · Coaching · Freelance" },
  { icon: Wallet, label: "Finance & Assurance", examples: "Banque · Transfert · Assurance santé" },
];

const TRUST_LEVELS = [
  { label: "Référencé", desc: "Fiche issue de l'historique Les Bons Plans du Bled, en attente de revalidation." },
{ label: "Recommandé", desc: "Au moins un membre a recommandé ce contact à partir de son expérience." },
  { label: "Vérifié AfriLink", desc: "Contrôle effectué par l'équipe : identité, activité et joignabilité." },
  { label: "Équipe AfriLink", desc: "Membres fondateurs et équipe officielle AfriLink." },
];

function LandingPage() {
  const finalCtaMagnetic = useMagnetic<HTMLAnchorElement>();

  /** Activité réelle : fiches historiques réellement importées, sans contenu inventé. */
  const activity = useMemo(() => HISTORIC_PROS.filter((p) => p.status !== "equipe").slice(0, 6), []);
  const cityCounts = useMemo(
    () =>
      Object.fromEntries(
        MAIN_CITIES.map((c) => [c, PROS.filter((p) => p.city === c && p.historic).length]),
      ) as Record<string, number>,
    [],
  );

  return (
    <div>
      <SiteHeader />

      {/* HERO */}
      <section className="section-cream relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-forest/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center md:px-8 md:py-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-card px-4 py-1.5 text-xs font-semibold text-foreground">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Le réseau de confiance africain — depuis 2022
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">
              Trouvez les bonnes personnes avant les <span className="text-accent">bonnes adresses</span>
            </h1>
<p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              Cherchez. Demandez. Partagez. Votre réseau de confiance, ville par ville.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <HeroSearch />
          </Reveal>

          {/* 3 ACTIONS */}
          <Reveal delay={140}>
            <div className="mt-10 grid gap-3 text-left sm:grid-cols-3">
              {ACTIONS.map((a) => (
                <Link
                  key={a.title}
                  to="/app"
                  className="rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-medium"
                >
                  <span className="icon-circle mb-3 inline-flex"><a.icon className="h-5 w-5" /></span>
                  <p className="font-semibold">{a.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <JoinCommunityCta size="pill-lg" className="shadow-elevated">
                Rejoindre la communauté
              </JoinCommunityCta>
              <Button variant="pill-outline" size="pill-lg" asChild>
                <Link to="/connexion">Se connecter</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-6">
              <Stat value={STATS.plans} label="bons plans & contacts partagés depuis 2022" />
              <Stat value={STATS.members} label="membres historiques" />
              <Stat value={STATS.pros} label="professionnels référencés depuis 2022, revalidation en cours" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ACTIVITÉ RÉELLE */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Activité réelle</span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Des contacts déjà partagés par la communauté</h2>
            <p className="mt-4 text-muted-foreground">
              Ces fiches proviennent de l'historique Les Bons Plans du Bled et sont progressivement revalidées dans
              AfriLink. Les membres de l'équipe AfriLink n'y figurent pas.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activity.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <Link
                  to="/app"
                  className="flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-medium"
                >
                  <Avatar initials={p.initials} color={p.color} src={p.avatar} alt={p.name} size={44} />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate font-semibold">{p.name}</p>
                      <StatusBadge status={p.status ?? "reference"} />
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {CATEGORIES.find((c) => c.slug === p.category)?.label} · {p.city}
                      {p.neighborhood ? `, ${p.neighborhood}` : ""}
                    </p>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.bio}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={80} className="mt-8 text-center">
            <Button variant="pill-outline" asChild>
              <Link to="/app">Voir toute l'activité <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* UNIVERS */}
      <section id="univers" className="section-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Les 9 univers</span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Tout ce dont vous avez besoin</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {universes.map((u, i) => (
              <Reveal key={u.label} delay={i * 50}>
                <Link
                  to="/app"
                  className="group flex items-start gap-4 rounded-2xl border border-transparent bg-card p-5 shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/30 hover:shadow-medium"
                >
                  <span className="icon-circle shrink-0 transition-transform duration-300 group-hover:scale-105">
                    <u.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium">{u.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{u.examples}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARCOURS */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Parcours</span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Par où commencer ?</h2>
            <p className="mt-4 text-muted-foreground">
              Chaque parcours regroupe les univers utiles à un moment précis de votre vie sur le continent.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEYS.map((j, i) => (
              <Reveal key={j.slug} delay={i * 50}>
                <Link
                  to="/app"
                  className="block h-full rounded-2xl border border-border bg-card p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-medium"
                >
                  <p className="font-semibold">{j.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{j.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VILLES */}
      <section id="villes" className="section-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Nos villes</span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Là où la communauté est déjà active</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {MAIN_CITIES.map((c, i) => (
              <Reveal key={c} delay={i * 50}>
                <div className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-medium">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-xl transition-transform duration-300 group-hover:scale-105">
                    {CITY_META[c].flag}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{c}</p>
                    <p className="text-xs text-muted-foreground">
                      {CITY_META[c].country}
                      {cityCounts[c] > 0 ? ` · ${cityCounts[c]} fiches` : ""}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <p className="mt-10 text-center text-sm font-semibold text-muted-foreground">En cours d'ouverture</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {OPENING_CITIES.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-2 rounded-full border border-dashed border-border bg-card/60 px-4 py-2 text-sm text-muted-foreground"
                >
                  <span className="text-base leading-none">{CITY_META[c].flag}</span> {c}
                  <span className="text-xs text-muted-foreground/70">· {CITY_META[c].country}</span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONFIANCE */}
      <section id="confiance" className="section-forest">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Confiance</span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Un niveau de confiance affiché, jamais supposé</h2>
            <p className="mt-4 text-forest-foreground/75">
              Chaque fiche porte son niveau réel. Aucun contact n'est présenté comme vérifié tant que
              l'équipe ne l'a pas revalidé.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_LEVELS.map((t, i) => (
              <Reveal key={t.label} delay={i * 60}>
                <div className="h-full rounded-2xl bg-white/5 p-6 backdrop-blur">
                  <span className="icon-circle mb-4 inline-flex"><ShieldCheck className="h-5 w-5" /></span>
                  <p className="font-semibold">{t.label}</p>
                  <p className="mt-2 text-sm text-forest-foreground/75">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PREUVES HISTORIQUES */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Preuves historiques</span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Ce qui existe déjà, avant la plateforme</h2>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <span className="icon-circle mb-4 inline-flex"><Users className="h-5 w-5" /></span>
                <p className="font-display text-3xl font-bold">{STATS.members}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  membres réunis depuis 2022 autour de Les Bons Plans du Bled.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <span className="icon-circle mb-4 inline-flex"><BadgeCheck className="h-5 w-5" /></span>
                <p className="font-display text-3xl font-bold">{HISTORIC_PROS.length}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  fiches historiques réellement importées, conservées au statut Référencé.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={80} className="mt-6 flex flex-wrap items-center justify-center gap-3 text-center text-sm text-muted-foreground">
            <Compass className="h-4 w-4 text-accent" />
            <span>Ces deux chiffres proviennent de l'historique de la communauté. Aucune donnée inventée.</span>
          </Reveal>
          <Reveal delay={120} className="mx-auto mt-10 max-w-2xl rounded-2xl border border-dashed border-border bg-card/60 p-6 text-center">
            <span className="icon-circle mb-4 inline-flex"><Clock className="h-5 w-5" /></span>
            <p className="font-display text-2xl font-bold">Des semaines, parfois des mois</p>
            <p className="mt-2 text-sm text-muted-foreground">
              le temps qu'il faut pour reconstruire un réseau fiable en arrivant seul. Constat qualitatif recueilli
              auprès de la communauté, et non une statistique mesurée.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section-cream">
        <Reveal className="mx-auto max-w-4xl px-4 py-16 text-center md:px-8 md:py-20">
          <h2 className="text-3xl font-bold leading-[1.15] md:text-5xl">
            <span className="block">Les bonnes <span className="text-forest-sage">personnes</span>.</span>
            <span className="mt-1 block">Les bons <span className="text-accent">plans</span>.</span>
            <span className="mt-1 block">La bonne <span className="text-forest-light">connexion</span>.</span>
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
