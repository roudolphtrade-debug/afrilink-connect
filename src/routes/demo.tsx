import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search, Star, Heart, MessageCircle, ShieldCheck, X, Send, Upload,
  Check, ArrowRight, ArrowLeft, User, Briefcase,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Avatar } from "@/components/Avatar";
import { PROS, CATEGORIES, CITIES, MOCK_REVIEWS, MOCK_CONVERSATIONS, type Pro } from "@/lib/mock-data";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Démo — AfriLink" },
      { name: "description", content: "Explorez la plateforme AfriLink avec des données fictives." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DemoPage,
});

type Tab = "search" | "favorites" | "messages" | "signup";

function DemoPage() {
  const [tab, setTab] = useState<Tab>("search");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [openPro, setOpenPro] = useState<Pro | null>(null);
  const [activeConv, setActiveConv] = useState<string | null>(null);

  const toggleFav = (id: string) =>
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const openMessagesFor = (pro: Pro) => {
    setOpenPro(null);
    setActiveConv("new-" + pro.id);
    setTab("messages");
  };

  return (
    <div className="min-h-screen bg-cream/60">
      <SiteHeader />

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold md:text-4xl">Découvrir la plateforme</h1>
            <p className="mt-2 text-muted-foreground">Aperçu interactif — le vrai backend arrive bientôt.</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-accent/15 px-4 py-2 text-xs font-bold uppercase tracking-wide text-accent">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Démo — données fictives
          </span>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 rounded-full border border-border bg-white p-1.5 shadow-soft w-fit">
          {[
            { id: "search", label: "Recherche", icon: Search },
            { id: "favorites", label: `Favoris${favorites.length ? ` (${favorites.length})` : ""}`, icon: Heart },
            { id: "messages", label: "Messagerie", icon: MessageCircle },
            { id: "signup", label: "Inscription", icon: User },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as Tab)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === t.id ? "bg-primary text-primary-foreground" : "text-forest hover:bg-muted"
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "search" && (
            <SearchView favorites={favorites} toggleFav={toggleFav} onOpen={setOpenPro} />
          )}
          {tab === "favorites" && (
            <FavoritesView favorites={favorites} toggleFav={toggleFav} onOpen={setOpenPro} />
          )}
          {tab === "messages" && (
            <MessagingView activeConv={activeConv} setActiveConv={setActiveConv} />
          )}
          {tab === "signup" && <SignupView />}
        </div>
      </div>

      {openPro && (
        <ProfileModal
          pro={openPro}
          isFav={favorites.includes(openPro.id)}
          onFav={() => toggleFav(openPro.id)}
          onContact={() => openMessagesFor(openPro)}
          onClose={() => setOpenPro(null)}
        />
      )}

      <SiteFooter />
    </div>
  );
}

/* ---------------- SEARCH ---------------- */

function SearchView({
  favorites, toggleFav, onOpen,
}: {
  favorites: string[]; toggleFav: (id: string) => void; onOpen: (p: Pro) => void;
}) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [city, setCity] = useState<string>("all");

  const results = useMemo(() => {
    return PROS.filter((p) => {
      const matchQ = !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.bio.toLowerCase().includes(q.toLowerCase());
      const matchC = cat === "all" || p.category === cat;
      const matchCity = city === "all" || p.city === city;
      return matchQ && matchC && matchCity;
    });
  }, [q, cat, city]);

  return (
    <div>
      <div className="rounded-3xl border border-border bg-white p-5 shadow-soft">
        <div className="flex items-center gap-3">
          <span className="icon-circle"><Search className="h-5 w-5" /></span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un pro, un service, une compétence…"
            className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="hidden rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium md:block"
          >
            <option value="all">Toutes les villes</option>
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <FilterChip active={cat === "all"} onClick={() => setCat("all")}>Toutes catégories</FilterChip>
          {CATEGORIES.map((c) => (
            <FilterChip key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>{c.label}</FilterChip>
          ))}
        </div>
        <div className="mt-3 md:hidden">
          <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full rounded-full border border-border bg-muted px-4 py-2 text-sm">
            <option value="all">Toutes les villes</option>
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">{results.length} professionnel(s) trouvé(s)</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((p) => (
          <ProCard key={p.id} pro={p} isFav={favorites.includes(p.id)} onFav={() => toggleFav(p.id)} onOpen={() => onOpen(p)} />
        ))}
        {results.length === 0 && (
          <div className="col-span-full rounded-3xl border border-dashed border-border bg-white p-12 text-center text-muted-foreground">
            Aucun résultat pour ces filtres.
          </div>
        )}
      </div>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
        active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-white text-forest hover:border-primary/40"
      }`}
    >
      {children}
    </button>
  );
}

function ProCard({
  pro, isFav, onFav, onOpen,
}: { pro: Pro; isFav: boolean; onFav: () => void; onOpen: () => void }) {
  const category = CATEGORIES.find((c) => c.slug === pro.category);
  return (
    <div className="group flex flex-col rounded-3xl border border-border bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-elevated">
      <div className="flex items-start gap-4">
        <Avatar initials={pro.initials} color={pro.color} size={56} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate font-semibold">{pro.name}</p>
            {pro.verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold text-accent">
                <ShieldCheck className="h-3 w-3" /> Vérifié
              </span>
            )}
          </div>
          <p className="mt-1 truncate text-sm text-muted-foreground">
            {category?.label} · {pro.city}
          </p>
          <div className="mt-2 flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-semibold">{pro.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({pro.reviews})</span>
          </div>
        </div>
        <button
          onClick={onFav}
          className={`rounded-full p-2 transition ${isFav ? "bg-accent/15 text-accent" : "text-muted-foreground hover:bg-muted"}`}
          aria-label="Favori"
        >
          <Heart className={`h-5 w-5 ${isFav ? "fill-accent" : ""}`} />
        </button>
      </div>
      <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">{pro.bio}</p>
      <button onClick={onOpen} className="mt-5 inline-flex items-center justify-center gap-1 rounded-full border border-border py-2 text-sm font-semibold hover:border-primary/40">
        Voir le profil <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ---------------- PROFILE MODAL ---------------- */

function ProfileModal({
  pro, isFav, onFav, onContact, onClose,
}: { pro: Pro; isFav: boolean; onFav: () => void; onContact: () => void; onClose: () => void }) {
  const cat = CATEGORIES.find((c) => c.slug === pro.category);
  const reviews = MOCK_REVIEWS.default;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-forest/60 p-0 backdrop-blur-sm md:items-center md:p-6" onClick={onClose}>
      <div
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-elevated md:rounded-3xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Avatar initials={pro.initials} color={pro.color} size={72} />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-2xl font-bold">{pro.name}</h3>
                {pro.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-bold text-accent">
                    <ShieldCheck className="h-3.5 w-3.5" /> Vérifié AfriLink
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{cat?.label} · {pro.city}</p>
              <div className="mt-2 flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="font-semibold">{pro.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">· {pro.reviews} avis</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-muted"><X /></button>
        </div>

        {pro.verified && (
          <div className="mt-6 flex gap-3 rounded-2xl bg-accent/10 p-4 text-sm">
            <ShieldCheck className="h-5 w-5 shrink-0 text-accent" />
            <p>
              <strong>Badge Vérifié :</strong> pièce d'identité, activité et références validées manuellement par l'équipe AfriLink.
            </p>
          </div>
        )}

        <p className="mt-6 leading-relaxed text-forest/90">{pro.bio}</p>

        <div className="mt-8">
          <h4 className="font-semibold">Derniers avis</h4>
          <div className="mt-4 space-y-3">
            {reviews.map((r, i) => (
              <div key={i} className="rounded-2xl border border-border p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{r.author}</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-accent text-accent" />)}
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={onContact} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-90">
            <MessageCircle className="h-4 w-4" /> Contacter
          </button>
          <button onClick={onFav} className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition ${isFav ? "border-accent bg-accent/10 text-accent" : "border-border hover:border-primary/40"}`}>
            <Heart className={`h-4 w-4 ${isFav ? "fill-accent" : ""}`} /> {isFav ? "Ajouté" : "Ajouter aux favoris"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- FAVORITES ---------------- */

function FavoritesView({
  favorites, toggleFav, onOpen,
}: { favorites: string[]; toggleFav: (id: string) => void; onOpen: (p: Pro) => void }) {
  const list = PROS.filter((p) => favorites.includes(p.id));
  if (list.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-white p-12 text-center">
        <Heart className="mx-auto h-10 w-10 text-muted-foreground" />
        <p className="mt-4 font-semibold">Aucun favori pour l'instant</p>
        <p className="mt-1 text-sm text-muted-foreground">Ajoutez des profils depuis la recherche pour les retrouver ici.</p>
      </div>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((p) => <ProCard key={p.id} pro={p} isFav onFav={() => toggleFav(p.id)} onOpen={() => onOpen(p)} />)}
    </div>
  );
}

/* ---------------- MESSAGING ---------------- */

function MessagingView({
  activeConv, setActiveConv,
}: { activeConv: string | null; setActiveConv: (id: string | null) => void }) {
  const [drafts, setDrafts] = useState<Record<string, { from: string; text: string; time: string }[]>>({});
  const [input, setInput] = useState("");

  const isNew = activeConv?.startsWith("new-");
  const newProId = isNew ? activeConv!.replace("new-", "") : null;
  const newPro = newProId ? PROS.find((p) => p.id === newProId) : null;

  const convs = MOCK_CONVERSATIONS.map((c) => ({ ...c, pro: PROS.find((p) => p.id === c.proId)! }));
  const current = convs.find((c) => c.id === activeConv);
  const currentPro = current?.pro ?? newPro ?? null;
  const currentMessages = current
    ? [...current.messages, ...(drafts[current.id] ?? [])]
    : newProId
      ? drafts[activeConv!] ?? []
      : [];

  const send = () => {
    if (!input.trim() || !activeConv) return;
    setDrafts((d) => ({
      ...d,
      [activeConv]: [...(d[activeConv] ?? []), { from: "me", text: input, time: "maintenant" }],
    }));
    setInput("");
  };

  return (
    <div className="grid gap-4 rounded-3xl border border-border bg-white shadow-soft md:grid-cols-[320px_1fr] md:overflow-hidden">
      <div className="border-b border-border md:border-b-0 md:border-r">
        <div className="p-4">
          <h3 className="font-semibold">Conversations</h3>
        </div>
        <div className="max-h-96 overflow-y-auto md:max-h-[560px]">
          {convs.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveConv(c.id)}
              className={`flex w-full items-center gap-3 border-t border-border p-4 text-left transition hover:bg-muted/50 ${activeConv === c.id ? "bg-muted/60" : ""}`}
            >
              <Avatar initials={c.pro.initials} color={c.pro.color} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{c.pro.name}</p>
                <p className="truncate text-xs text-muted-foreground">{c.lastMessage}</p>
              </div>
              {c.unread > 0 && (
                <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">{c.unread}</span>
              )}
            </button>
          ))}
          {isNew && newPro && (
            <div className="flex items-center gap-3 border-t border-border bg-accent/10 p-4">
              <Avatar initials={newPro.initials} color={newPro.color} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{newPro.name}</p>
                <p className="truncate text-xs text-muted-foreground">Nouvelle conversation</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex min-h-[420px] flex-col">
        {currentPro ? (
          <>
            <div className="flex items-center gap-3 border-b border-border p-4">
              <Avatar initials={currentPro.initials} color={currentPro.color} />
              <div>
                <p className="font-semibold">{currentPro.name}</p>
                <p className="text-xs text-muted-foreground">{CATEGORIES.find((c) => c.slug === currentPro.category)?.label} · {currentPro.city}</p>
              </div>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto bg-cream/50 p-4">
              {currentMessages.length === 0 && (
                <p className="text-center text-sm text-muted-foreground">Envoyez le premier message ✨</p>
              )}
              {currentMessages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.from === "me" ? "bg-primary text-primary-foreground" : "bg-white border border-border"}`}>
                    <p>{m.text}</p>
                    <p className={`mt-1 text-[10px] ${m.from === "me" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{m.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 border-t border-border p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Écrire un message…"
                className="flex-1 rounded-full border border-border bg-muted/50 px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
              <button onClick={send} className="rounded-full bg-primary p-3 text-primary-foreground hover:opacity-90">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center p-8 text-center text-muted-foreground">
            <div>
              <MessageCircle className="mx-auto h-10 w-10" />
              <p className="mt-4 font-semibold">Sélectionnez une conversation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- SIGNUP ---------------- */

function SignupView() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"member" | "pro" | null>(null);
  const [form, setForm] = useState({ name: "", email: "", city: "" });
  const [doc, setDoc] = useState<string | null>(null);

  const totalSteps = role === "pro" ? 4 : 3;

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-white p-6 shadow-soft md:p-10">
      <div className="mb-8 flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i < step ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>

      {step === 1 && (
        <div>
          <h3 className="font-display text-2xl font-bold">Vous êtes…</h3>
          <p className="mt-2 text-muted-foreground">Choisissez le type de compte à créer.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { id: "member", icon: User, title: "Membre", desc: "Trouver des pros, poser des questions." },
              { id: "pro", icon: Briefcase, title: "Professionnel", desc: "Proposer vos services, être vérifié." },
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id as "member" | "pro")}
                className={`rounded-2xl border-2 p-5 text-left transition ${role === r.id ? "border-primary bg-cream" : "border-border hover:border-primary/40"}`}
              >
                <span className="icon-circle mb-3"><r.icon className="h-5 w-5" /></span>
                <p className="font-semibold">{r.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <button
              disabled={!role}
              onClick={next}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-40"
            >
              Continuer <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="font-display text-2xl font-bold">Vos infos</h3>
          <p className="mt-2 text-muted-foreground">On garde ça simple.</p>
          <div className="mt-6 space-y-4">
            <Field label="Nom complet" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Aïcha Diallo" />
            <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="vous@exemple.com" />
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Ville</label>
              <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary">
                <option value="">Sélectionner une ville…</option>
                {CITIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <StepNav onPrev={prev} onNext={next} disabled={!form.name || !form.email || !form.city} isLast={role === "member" ? false : false} />
        </div>
      )}

      {step === 3 && role === "pro" && (
        <div>
          <h3 className="font-display text-2xl font-bold">Vérification professionnelle</h3>
          <p className="mt-2 text-muted-foreground">Téléchargez une pièce justificative (identité, KBIS, diplôme…).</p>
          <label className="mt-6 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-border bg-cream p-10 text-center hover:border-primary/50">
            <span className="icon-circle"><Upload className="h-6 w-6" /></span>
            <p className="font-semibold">{doc ?? "Cliquez pour importer un document"}</p>
            <p className="text-xs text-muted-foreground">PDF, JPG, PNG — 5 Mo max</p>
            <input type="file" className="hidden" onChange={(e) => setDoc(e.target.files?.[0]?.name ?? null)} />
          </label>
          {doc && (
            <div className="mt-4 rounded-2xl bg-accent/10 p-4 text-sm">
              <p><strong>Vérification en cours sous 48h.</strong> Vous recevrez un email dès validation.</p>
            </div>
          )}
          <StepNav onPrev={prev} onNext={next} disabled={!doc} />
        </div>
      )}

      {((step === 3 && role === "member") || (step === 4 && role === "pro")) && (
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Check className="h-8 w-8" />
          </div>
          <h3 className="mt-6 font-display text-2xl font-bold">Bienvenue, {form.name.split(" ")[0] || "membre"} !</h3>
          <p className="mt-3 text-muted-foreground">
            {role === "pro"
              ? "Votre dossier est en cours de vérification. Vous recevrez un email sous 48h."
              : "Votre compte est prêt. Commencez à explorer le réseau AfriLink."}
          </p>
          <button
            onClick={() => { setStep(1); setRole(null); setForm({ name: "", email: "", city: "" }); setDoc(null); }}
            className="mt-8 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:border-primary/40"
          >
            Recommencer la démo
          </button>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}

function StepNav({ onPrev, onNext, disabled, isLast }: { onPrev: () => void; onNext: () => void; disabled?: boolean; isLast?: boolean }) {
  return (
    <div className="mt-8 flex justify-between">
      <button onClick={onPrev} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-primary/40">
        <ArrowLeft className="h-4 w-4" /> Retour
      </button>
      <button
        disabled={disabled}
        onClick={onNext}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-40"
      >
        {isLast ? "Terminer" : "Continuer"} <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
