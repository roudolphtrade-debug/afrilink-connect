import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, type Ref } from "react";
import {
  ShieldCheck, Users, MessageCircle, Compass, Search, Send, Handshake, Sparkles,
  Hammer, HeartPulse, GraduationCap, Truck, FileText, Home as HomeIcon, Briefcase,
  Plane, Wallet, Rocket, Baby, BookOpen, Palmtree, Star, Quote, ArrowRight, Check, X, MapPin,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Avatar } from "@/components/Avatar";
import { StatusBadge } from "@/components/StatusBadge";
import { JoinCommunityCta } from "@/components/JoinCommunityCta";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { useMagnetic } from "@/hooks/use-magnetic";
import { STATS, MAIN_CITIES, OPENING_CITIES, PROS, CATEGORIES, HISTORIC_PROS, TESTIMONIALS, JOURNEYS } from "@/lib/mock-data";

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
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    // Sans recherche : uniquement les contacts historiques réels de la communauté.
    if (!term) {
      const local = HISTORIC_PROS.filter((p) => p.city === city);
      return (local.length ? local : HISTORIC_PROS).slice(0, 5);
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
    <div className="mx-auto mt-10 max-w-2xl">
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
                <span className="inline-flex items-center gap-1 text-xs font-semibold">
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" /> {p.rating.toFixed(1)}
                </span>
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
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <div className="flex -space-x-3">
          {HISTORIC_PROS.slice(0, 4).map((p) => (
            <div key={p.id} className="rounded-full ring-2 ring-secondary">
              <Avatar initials={p.initials} color={p.color} src={p.avatar} alt={p.name} size={34} />
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">{STATS.members} membres</strong> et{" "}
          <strong className="text-foreground">{STATS.plans} bons plans &amp; contacts</strong> partagés depuis 2022.
        </p>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Bientôt : {OPENING_CITIES.join(" · ")}
      </p>
    </div>
  );
}


const pillars = [
  { icon: ShieldCheck, title: "Trois niveaux de confiance", desc: "Référencé, Recommandé par la communauté, puis Vérifié AfriLink après contrôle de notre équipe." },
  { icon: Users, title: "Recommandations humaines", desc: "Des avis réels de membres qui ont déjà testé pour vous." },
  { icon: MessageCircle, title: "Communauté active", desc: "Échangez, demandez conseil, partagez vos bons plans." },
  { icon: Compass, title: "Accompagnement complet", desc: "Avant, pendant et après votre arrivée sur le continent." },
];

const steps = [
  { icon: Users, title: "Créez votre profil", desc: "Deux minutes, une ville, vos besoins du moment." },
  { icon: Search, title: "Trouvez ou demandez", desc: "Cherchez un contact de confiance ou publiez votre demande à la communauté." },
  { icon: Send, title: "Échangez et recommandez", desc: "Discutez en direct, puis partagez votre retour pour faire monter le contact en confiance." },
];

const universes = [
  { icon: Hammer, label: "Maison", examples: "Menuiserie · Plomberie · Électricité · Ménage" },
  { icon: HeartPulse, label: "Santé", examples: "Pédiatrie · Kiné · Dentiste · Pharmacie" },
  { icon: GraduationCap, label: "Éducation", examples: "Cours à domicile · Langues · Écoles" },
  { icon: Truck, label: "Transport", examples: "Chauffeur · Aéroport · Déménagement" },
  { icon: FileText, label: "Services administratifs & juridiques", examples: "Visa · État civil · Avocat" },
  { icon: Sparkles, label: "Loisirs", examples: "Restaurants · Excursions · Événementiel" },
  { icon: HomeIcon, label: "Immobilier", examples: "Meublés · Longue durée · Saisonnier" },
  { icon: Briefcase, label: "Emploi & Business", examples: "Recrutement · Coaching · Freelance" },
  { icon: Wallet, label: "Finance & Assurance", examples: "Banque · Transfert · Assurance santé" },
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

function LandingPage() {
  
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

          <Reveal delay={160}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <JoinCommunityCta size="pill-lg" className="shadow-elevated">
                Rejoindre la communauté
              </JoinCommunityCta>
              <Button variant="pill-outline" size="pill-lg" asChild>
                <Link to="/connexion">Se connecter</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-6">
              <Stat value={STATS.plans} label="bons plans & contacts depuis 2022" />
              <Stat value={STATS.members} label="membres historiques" />
              <Stat value={STATS.pros} label="professionnels de confiance" />
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
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">Trois étapes, un vrai réseau</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
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
                <div className="group flex items-start gap-4 rounded-2xl border border-transparent bg-card p-5 shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/30 hover:shadow-medium">
                  <span className="icon-circle shrink-0 transition-transform duration-300 group-hover:scale-105">
                    <u.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium">{u.label}</p>
                    <p className="mt-1 max-h-0 overflow-hidden text-xs leading-relaxed text-muted-foreground opacity-0 transition-all duration-300 ease-out group-hover:max-h-16 group-hover:opacity-100">
                      {u.examples}
                    </p>
                  </div>
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

      {/* VILLES */}
      <section id="villes" className="section-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Nos villes</span>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">Là où la communauté est déjà active</h2>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {MAIN_CITIES.map((c, i) => (
              <Reveal key={c} delay={i * 60}>
                <div className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-medium">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-xl transition-transform duration-300 group-hover:scale-105">
                    {CITY_META[c].flag}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{c}</p>
                    <p className="text-xs text-muted-foreground">{CITY_META[c].country}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-forest-sage">
                    <span className="h-1.5 w-1.5 rounded-full bg-forest-sage" /> Ouverte
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="mt-10 text-center text-sm font-semibold text-muted-foreground">En cours d'ouverture</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {OPENING_CITIES.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-2 rounded-full border border-dashed border-border bg-card/60 px-4 py-2 text-sm text-muted-foreground transition hover:border-accent/40 hover:text-foreground"
                >
                  <span className="text-base leading-none">{CITY_META[c].flag}</span> {c}
                  <span className="text-xs text-muted-foreground/70">· {CITY_META[c].country}</span>
                </span>
              ))}
            </div>
          </Reveal>
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
            {TESTIMONIALS.map((t, ti) => (
              <Reveal key={t.name} delay={ti * 100}>
                <div className="rounded-3xl bg-white/5 p-8 backdrop-blur">
                  <Quote className="h-6 w-6 text-accent/70" aria-hidden="true" />
                  <p className="mt-5 font-display text-lg italic leading-relaxed text-forest-foreground/95">
                    "{t.quote}"
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <Avatar initials={t.initials} color={t.color} src={t.avatar} alt={t.name} />
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
                <Stat value={STATS.plans} label="bons plans & contacts depuis 2022" />
                <Stat value={STATS.members} label="membres historiques" />
                <Stat value={STATS.pros} label="professionnels de confiance" />
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
