import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Search, Star, Heart, MessageCircle, ShieldCheck, X, Send, Home as HomeIcon,
  Bell, MapPin, User, Settings, LogOut, Sparkles, ThumbsUp, ArrowRight, ArrowLeft,
  Compass, Bookmark, HelpCircle, PenSquare, Hammer, HeartPulse, GraduationCap,
  Truck, FileText, Briefcase, Users, BookOpen, Library, Lock, LogIn, Download, RotateCcw, CheckCheck, ArrowUpDown,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Avatar } from "@/components/Avatar";
import { LocationMap } from "@/components/LocationMap";
import { StatusBadge } from "@/components/StatusBadge";
import { EmptyState, ProCardSkeleton, PostSkeleton, Shimmer } from "@/components/Skeletons";
import { useSession, signOut } from "@/lib/auth-store";
import { usePersistedState, seededUnit } from "@/lib/use-persisted-state";

import {
  PROS, CATEGORIES, CITIES, COUNTRIES, CITY_COORDS, MOCK_REVIEWS, MOCK_CONVERSATIONS,
  CURRENT_USER, portrait, FEED, NOTIFICATIONS, LIBRARY, MAIN_CITIES, OPENING_CITIES, STATS, FOUNDER,
  STATUS_META,
  type Pro, type FeedPost, type ProStatus,
} from "@/lib/mock-data";

const CATEGORY_ICONS: Record<string, typeof Hammer> = {
  Hammer, HeartPulse, GraduationCap, Truck, FileText, Sparkles, Home: HomeIcon, Briefcase,
};

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "AfriLink — Votre réseau" },
      { name: "description", content: "Fil d'actualité, recommandations et messagerie AfriLink." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AppShell,
});

type Tab = "feed" | "search" | "community" | "guides" | "library" | "messages" | "favorites" | "profile";

/** Petit délai simulé pour afficher les skeletons de chargement. */
function useLoading(deps: unknown[], ms = 500) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return loading;
}

export function AppShell() {
  const session = useSession();
  const [tab, setTab] = useState<Tab>("feed");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = usePersistedState<string[]>("afrilink.favorites", ["pro-5", "pro-9"]);
  const [favLibrary, setFavLibrary] = usePersistedState<string[]>("afrilink.favLibrary", []);
  const [openPro, setOpenPro] = useState<Pro | null>(null);
  const [activeConv, setActiveConv] = useState<string | null>("c1");
  const [notifOpen, setNotifOpen] = useState(false);
  const [readConvs, setReadConvs] = usePersistedState<string[]>("afrilink.readConvs", []);

  const unreadMap = useMemo(() => {
    const m: Record<string, number> = {};
    MOCK_CONVERSATIONS.forEach((c) => { m[c.id] = readConvs.includes(c.id) ? 0 : c.unread; });
    return m;
  }, [readConvs]);
  const unreadTotal = Object.values(unreadMap).reduce((a, b) => a + b, 0);
  const unreadConvs = MOCK_CONVERSATIONS.filter((c) => (unreadMap[c.id] ?? 0) > 0)
    .map((c) => ({ ...c, unread: unreadMap[c.id], pro: PROS.find((p) => p.id === c.proId)! }));
  const markRead = (id: string) => setReadConvs((r) => (r.includes(id) ? r : [...r, id]));
  const markAllRead = () => setReadConvs(MOCK_CONVERSATIONS.map((c) => c.id));


  const user = session
    ? { name: session.name, initials: session.initials, color: "#0F2B1E", city: CURRENT_USER.city, role: "Membre AfriLink", avatar: portrait(session.name) }
    : CURRENT_USER;

  const toggleFav = (id: string) =>
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const toggleLibFav = (id: string) =>
    setFavLibrary((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const openMessagesFor = (pro: Pro) => {
    setOpenPro(null);
    setActiveConv("new-" + pro.id);
    setTab("messages");
  };

  const nav: { id: Tab; label: string; icon: typeof HomeIcon; badge?: number }[] = [
    { id: "feed", label: "Accueil", icon: HomeIcon },
    { id: "search", label: "Explorer", icon: Compass },
    { id: "community", label: "Communauté", icon: Users },
    { id: "guides", label: "Guides", icon: BookOpen },
    { id: "library", label: "Bibliothèque", icon: Library },
    { id: "messages", label: "Messages", icon: MessageCircle, badge: unreadTotal || undefined },
    { id: "favorites", label: "Mes favoris", icon: Heart, badge: (favorites.length + favLibrary.length) || undefined },
    { id: "profile", label: "Profil", icon: User },
  ];

  const mobileNav = nav.filter((n) => ["feed", "search", "library", "favorites", "messages"].includes(n.id));


  const unreadNotif = NOTIFICATIONS.filter((n) => n.unread).length + unreadTotal;

  return (
    <div className="min-h-screen bg-cream/40">
      {/* TOP BAR */}
      <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 md:px-6">
          <Link to="/" className="shrink-0"><Logo /></Link>
          <div className="hidden flex-1 md:flex">
            <div className="relative w-full max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setTab("search"); }}
                placeholder="Rechercher un pro, un service, une ville…"
                onFocus={() => setTab("search")}
                className="w-full rounded-full border border-border bg-muted/40 py-2.5 pl-11 pr-4 text-sm outline-none focus:border-primary focus:bg-white"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setNotifOpen((o) => !o)}
                className="relative rounded-full border border-border bg-white p-2.5 hover:border-primary/40"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                {unreadNotif > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                    {unreadNotif}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-[22rem] overflow-hidden rounded-2xl border border-border bg-white shadow-elevated">
                  <div className="flex items-center justify-between gap-2 border-b border-border p-3">
                    <span className="text-sm font-semibold">Notifications</span>
                    {unreadTotal > 0 && (
                      <button
                        onClick={markAllRead}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold transition hover:border-primary/40"
                      >
                        <CheckCheck className="h-3.5 w-3.5" /> Tout marquer comme lu
                      </button>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="flex items-center justify-between bg-muted/40 px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      <span>Messages non lus</span>
                      <span>{unreadTotal}</span>
                    </div>
                    {unreadConvs.length === 0 ? (
                      <p className="px-3 py-4 text-sm text-muted-foreground">Aucun message non lu.</p>
                    ) : (
                      unreadConvs.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => { setActiveConv(c.id); markRead(c.id); setTab("messages"); setNotifOpen(false); }}
                          className="flex w-full items-start gap-3 border-b border-border bg-accent/5 p-3 text-left text-sm transition hover:bg-accent/10"
                        >
                          <Avatar initials={c.pro.initials} color={c.pro.color} src={c.pro.avatar} alt={c.pro.name} size={32} />
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-semibold">{c.pro.name}</p>
                            <p className="truncate text-xs text-muted-foreground">{c.lastMessage}</p>
                          </div>
                          <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">{c.unread}</span>
                        </button>
                      ))
                    )}
                    <div className="bg-muted/40 px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Activité
                    </div>
                    {NOTIFICATIONS.map((n) => (
                      <div key={n.id} className={`flex items-start gap-3 border-b border-border p-3 text-sm last:border-0 ${n.unread ? "bg-accent/5" : ""}`}>
                        <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.unread ? "bg-accent" : "bg-transparent"}`} />
                        <div className="flex-1">
                          <p>{n.text}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
            {session ? (
              <button
                onClick={() => setTab("profile")}
                className="flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-3 transition hover:border-primary/40"
              >
                <Avatar initials={user.initials} color={user.color} src={user.avatar} size={32} />
                <span className="hidden text-sm font-semibold md:inline">{user.name}</span>
              </button>
            ) : (
              <>
                <Link
                  to="/connexion"
                  className="hidden rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition hover:border-primary/40 sm:inline-flex"
                >
                  Se connecter
                </Link>
                <Link
                  to="/inscription"
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
                >
                  <LogIn className="h-4 w-4" /> S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-6 md:grid-cols-[220px_1fr] md:px-6 lg:grid-cols-[240px_1fr_320px]">
        {/* SIDEBAR */}
        <aside className="hidden md:block">
          <nav className="sticky top-24 space-y-1 rounded-2xl border border-border bg-white p-2 shadow-soft">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => setTab(n.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                  tab === n.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <n.icon className="h-4 w-4" />
                <span className="flex-1">{n.label}</span>
                {n.badge && (
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${tab === n.id ? "bg-white/20" : "bg-accent text-accent-foreground"}`}>
                    {n.badge}
                  </span>
                )}
              </button>
            ))}
            <div className="my-2 h-px bg-border" />
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted">
              <Settings className="h-4 w-4" /> Paramètres
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted">
              <HelpCircle className="h-4 w-4" /> Aide
            </button>
          </nav>
        </aside>

        {/* MAIN */}
        <main className="min-w-0">
          {tab === "feed" && <FeedView user={user} onOpenSearch={() => setTab("search")} />}
          {tab === "search" && <SearchView query={query} setQuery={setQuery} favorites={favorites} toggleFav={toggleFav} onOpen={setOpenPro} />}
          {tab === "community" && <CommunityView onOpen={setOpenPro} />}
          {tab === "guides" && <GuidesView />}
          {tab === "library" && <LibraryView locked={!session} favLibrary={favLibrary} toggleLibFav={toggleLibFav} />}
          {tab === "favorites" && <FavoritesView favorites={favorites} toggleFav={toggleFav} favLibrary={favLibrary} toggleLibFav={toggleLibFav} onOpen={setOpenPro} onExplore={() => setTab("search")} onLibrary={() => setTab("library")} />}
          {tab === "messages" && <MessagingView activeConv={activeConv} setActiveConv={setActiveConv} unreadMap={unreadMap} markRead={markRead} />}

          {tab === "profile" && <ProfileView user={user} isAuthed={!!session} onFavorites={() => setTab("favorites")} />}
        </main>

        {/* RIGHT RAIL */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <CoverageCard />
            <TrendingCard />
            <SuggestedProsCard onOpen={setOpenPro} />
            <div className="rounded-2xl border border-dashed border-accent/40 bg-accent/5 p-4 text-xs text-muted-foreground">
              <p className="font-semibold text-accent">Vous êtes en aperçu</p>
              <p className="mt-1">Cette version utilise des données de démonstration. Les vraies connexions arrivent bientôt.</p>
            </div>
          </div>
        </aside>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        <div className="grid grid-cols-5">
          {mobileNav.map((n) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={`relative flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold ${
                tab === n.id ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <n.icon className="h-5 w-5" />
              {n.label}
              {n.badge && (
                <span className="absolute right-4 top-1.5 rounded-full bg-accent px-1.5 text-[9px] font-bold text-accent-foreground">{n.badge}</span>
              )}
            </button>
          ))}
        </div>
      </nav>
      <div className="h-16 md:hidden" />

      {/* DISCREET DEMO BADGE */}
      <div className="pointer-events-none fixed bottom-20 right-4 z-30 md:bottom-4">
        <span className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-accent shadow-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Démo
        </span>
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
    </div>
  );
}

/* ---------------- FEED ---------------- */

type AppUser = { name: string; initials: string; color: string; city: string; role: string };

function FeedView({ user, onOpenSearch }: { user: AppUser; onOpenSearch: () => void }) {
  const loading = useLoading([]);
  const [posts, setPosts] = useState(FEED);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [composer, setComposer] = useState("");

  const toggleLike = (id: string) => {
    setLiked((l) => ({ ...l, [id]: !l[id] }));
    setPosts((ps) => ps.map((p) => p.id === id ? { ...p, likes: p.likes + (liked[id] ? -1 : 1) } : p));
  };

  const publish = () => {
    if (!composer.trim()) return;
    const newPost: FeedPost = {
      id: "new-" + Date.now(),
      kind: "demande",
      author: { name: user.name, initials: user.initials, color: user.color, city: user.city },
      time: "à l'instant",
      title: composer.slice(0, 80),
      body: composer,
      replies: 0,
      likes: 0,
    };
    setPosts((ps) => [newPost, ...ps]);
    setComposer("");
  };

  return (
    <div className="space-y-4">
      {/* WELCOME */}
      <div className="overflow-hidden rounded-3xl bg-forest p-6 text-forest-foreground shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Bonjour {user.name.split(" ")[0]}</p>
            <h1 className="mt-2 font-display text-2xl font-bold md:text-3xl">Bienvenue à {user.city} 👋</h1>
            <p className="mt-2 max-w-md text-forest-foreground/80">
              Voici ce qui se passe autour de vous aujourd'hui.
            </p>
          </div>
          <button onClick={onOpenSearch} className="hidden shrink-0 items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90 md:inline-flex">
            <Compass className="h-4 w-4" /> Explorer les pros
          </button>
        </div>
      </div>

      {/* COMPOSER */}
      <div className="rounded-3xl border border-border bg-white p-4 shadow-soft">
        <div className="flex gap-3">
          <Avatar initials={user.initials} color={user.color} src={user.avatar} />
          <div className="flex-1">
            <textarea
              value={composer}
              onChange={(e) => setComposer(e.target.value)}
              placeholder="Posez une question à la communauté, partagez un bon plan…"
              rows={2}
              className="w-full resize-none rounded-2xl border border-border bg-muted/30 px-4 py-2.5 text-sm outline-none focus:border-primary focus:bg-white"
            />
            <div className="mt-2 flex items-center justify-between">
              <div className="flex gap-1.5 text-xs text-muted-foreground">
                <span className="rounded-full bg-muted px-2.5 py-1 font-medium">Demande</span>
                <span className="rounded-full bg-muted px-2.5 py-1 font-medium">Bon plan</span>
              </div>
              <button
                onClick={publish}
                disabled={!composer.trim()}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-40"
              >
                <PenSquare className="h-3.5 w-3.5" /> Publier
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY CHIPS */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        <button className="shrink-0 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">Pour vous</button>
        {CATEGORIES.slice(0, 6).map((c) => {
          const Icon = CATEGORY_ICONS[c.icon];
          return (
            <button key={c.slug} className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold hover:border-primary/40">
              <Icon className="h-3.5 w-3.5" />
              {c.label}
            </button>
          );
        })}
      </div>

      {/* POSTS */}
      {loading
        ? [0, 1, 2].map((i) => <PostSkeleton key={i} />)
        : posts.map((p) => (
            <PostCard key={p.id} post={p} liked={!!liked[p.id]} onLike={() => toggleLike(p.id)} />
          ))}
    </div>
  );
}

function PostCard({ post, liked, onLike }: { post: FeedPost; liked: boolean; onLike: () => void }) {
  const cat = CATEGORIES.find((c) => c.slug === post.category);
  const kindLabel: Record<FeedPost["kind"], { label: string; className: string }> = {
    demande: { label: "Demande", className: "bg-forest/10 text-forest" },
    "bon-plan": { label: "Bon plan", className: "bg-accent/15 text-accent" },
    annonce: { label: "Annonce", className: "bg-blue-500/10 text-blue-700" },
    verif: { label: "AfriLink", className: "bg-primary text-primary-foreground" },
  };
  const k = kindLabel[post.kind];
  return (
    <article className="rounded-3xl border border-border bg-white p-5 shadow-soft transition hover:shadow-elevated">
      <div className="flex items-start gap-3">
        <Avatar initials={post.author.initials} color={post.author.color} src={post.author.avatar} alt={post.author.name} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold">{post.author.name}</p>
            {post.author.verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] font-bold text-accent">
                <ShieldCheck className="h-2.5 w-2.5" /> Vérifié
              </span>
            )}
            <span className="text-xs text-muted-foreground">·</span>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {post.author.city}
            </span>
            <span className="text-xs text-muted-foreground">· {post.time}</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${k.className}`}>{k.label}</span>
            {cat && <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">{cat.label}</span>}
          </div>
        </div>
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{post.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-forest/85">{post.body}</p>
      <div className="mt-4 flex items-center gap-4 border-t border-border pt-3 text-xs">
        <button onClick={onLike} className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 font-semibold transition ${liked ? "bg-accent/15 text-accent" : "text-muted-foreground hover:bg-muted"}`}>
          <ThumbsUp className={`h-3.5 w-3.5 ${liked ? "fill-accent" : ""}`} /> {post.likes}
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 font-semibold text-muted-foreground hover:bg-muted">
          <MessageCircle className="h-3.5 w-3.5" /> {post.replies} réponses
        </button>
        <button className="ml-auto inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 font-semibold text-muted-foreground hover:bg-muted">
          <Bookmark className="h-3.5 w-3.5" /> Enregistrer
        </button>
      </div>
    </article>
  );
}

/* ---------------- RIGHT RAIL ---------------- */

function TrendingCard() {
  const trends = [
    { tag: "#Bonapriso", posts: "42 posts cette semaine" },
    { tag: "#PermisDeConduire", posts: "28 discussions" },
    { tag: "#Kribi", posts: "19 bons plans" },
    { tag: "#RetourAuBled", posts: "15 posts" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-white p-4 shadow-soft">
      <h3 className="flex items-center gap-2 font-semibold"><Sparkles className="h-4 w-4 text-accent" /> Tendances au Cameroun</h3>
      <ul className="mt-3 space-y-2">
        {trends.map((t) => (
          <li key={t.tag} className="rounded-xl p-2 hover:bg-muted">
            <p className="text-sm font-semibold">{t.tag}</p>
            <p className="text-xs text-muted-foreground">{t.posts}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SuggestedProsCard({ onOpen }: { onOpen: (p: Pro) => void }) {
  const suggested = PROS.filter((p) => p.verified && ["Douala", "Yaoundé", "Kribi"].includes(p.city)).slice(0, 3);
  return (
    <div className="rounded-2xl border border-border bg-white p-4 shadow-soft">
      <h3 className="font-semibold">Suggestions près de vous</h3>
      <ul className="mt-3 space-y-3">
        {suggested.map((p) => (
          <li key={p.id}>
            <button onClick={() => onOpen(p)} className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-muted">
              <Avatar initials={p.initials} color={p.color} src={p.avatar} alt={p.name} size={40} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{p.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {CATEGORIES.find((c) => c.slug === p.category)?.label} · {p.city}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- SEARCH ---------------- */

type SortKey = "pertinence" | "distance" | "prix" | "nouveaute";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "pertinence", label: "Pertinence" },
  { value: "distance", label: "Distance" },
  { value: "prix", label: "Prix croissant" },
  { value: "nouveaute", label: "Nouveauté" },
];

/** Distance simulée (km), stable par profil. */
const proDistance = (p: Pro) => Math.round((0.4 + seededUnit(p.id) * 24) * 10) / 10;
/** Prix indicatif extrait du libellé, sinon très haut pour finir la liste. */
const proPrice = (p: Pro) => {
  const digits = (p.price ?? "").replace(/[^\d]/g, "");
  return digits ? Number(digits) : Number.MAX_SAFE_INTEGER;
};
/** Ancienneté simulée (jours depuis l'arrivée sur AfriLink). */
const proFreshness = (p: Pro) => Math.round(seededUnit(p.id + "-new") * 400);

function SearchView({

  query, setQuery, favorites, toggleFav, onOpen,
}: {
  query: string; setQuery: (v: string) => void;
  favorites: string[]; toggleFav: (id: string) => void; onOpen: (p: Pro) => void;
}) {
  const q = query;
  const setQ = setQuery;
  const [cat, setCat] = usePersistedState<string>("afrilink.filters.cat", "all");
  const [status, setStatus] = usePersistedState<ProStatus | "all">("afrilink.filters.status", "all");
  const [country, setCountry] = usePersistedState<string>("afrilink.filters.country", "all");
  const [city, setCity] = usePersistedState<string>("afrilink.filters.city", "all");
  const [sort, setSort] = usePersistedState<SortKey>("afrilink.filters.sort", "pertinence");


  const citiesForCountry = country === "all" ? CITIES : (COUNTRIES.find((c) => c.name === country)?.cities ?? []);

  const handleCountryChange = (next: string) => {
    setCountry(next);
    setCity("all");
  };

  const matches = (p: Pro, o: { cat?: string; status?: ProStatus | "all" } = {}) => {
    const term = q.trim().toLowerCase();
    const c = o.cat ?? cat;
    const s = o.status ?? status;
    const matchQ = !term
      || p.name.toLowerCase().includes(term)
      || p.bio.toLowerCase().includes(term)
      || (CATEGORIES.find((x) => x.slug === p.category)?.label ?? "").toLowerCase().includes(term)
      || p.city.toLowerCase().includes(term);
    return matchQ
      && (c === "all" || p.category === c)
      && (s === "all" || (p.status ?? "reference") === s)
      && (country === "all" || p.country === country)
      && (city === "all" || p.city === city);
  };

  const results = useMemo(() => {
    const list = PROS.filter((p) => matches(p));
    const weight = (s?: ProStatus) => (s === "equipe" ? 0 : s === "verifie" ? 1 : s === "recommande" ? 2 : 3);
    return list.sort((a, b) => {
      if (sort === "distance") return proDistance(a) - proDistance(b);
      if (sort === "prix") return proPrice(a) - proPrice(b);
      if (sort === "nouveaute") return proFreshness(a) - proFreshness(b);
      return weight(a.status) - weight(b.status) || b.rating - a.rating;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, cat, status, country, city, sort]);

  const countFor = (o: { cat?: string; status?: ProStatus | "all" }) => PROS.filter((p) => matches(p, o)).length;

  const hasFilters = cat !== "all" || status !== "all" || country !== "all" || city !== "all" || q.trim() !== "" || sort !== "pertinence";
  const reset = () => { setQ(""); setCat("all"); setStatus("all"); setCountry("all"); setCity("all"); setSort("pertinence"); };

  const loading = useLoading([q, cat, status, country, city, sort], 350);



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
            value={country}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="hidden rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium md:block"
          >
            <option value="all">Tous les pays</option>
            {COUNTRIES.map((c) => <option key={c.name}>{c.name}</option>)}
          </select>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="hidden rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium md:block"
          >
            <option value="all">Toutes les villes</option>
            {citiesForCountry.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <FilterChip active={cat === "all"} onClick={() => setCat("all")}>
            Toutes catégories <span className="opacity-60">{countFor({ cat: "all" })}</span>
          </FilterChip>
          {CATEGORIES.map((c) => {
            const Icon = CATEGORY_ICONS[c.icon];
            const n = countFor({ cat: c.slug });
            return (
              <FilterChip key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>
                <Icon className="h-3.5 w-3.5" /> {c.label} <span className="opacity-60">{n}</span>
              </FilterChip>
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border pt-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Statut</span>
          <FilterChip active={status === "all"} onClick={() => setStatus("all")}>
            Tous <span className="opacity-60">{countFor({ status: "all" })}</span>
          </FilterChip>
          {(Object.keys(STATUS_META) as ProStatus[]).map((s) => (
            <FilterChip key={s} active={status === s} onClick={() => setStatus(s)}>
              {STATUS_META[s].label} <span className="opacity-60">{countFor({ status: s })}</span>
            </FilterChip>
          ))}
        </div>

        <div className="mt-3 flex flex-col gap-2 md:hidden">
          <select value={country} onChange={(e) => handleCountryChange(e.target.value)} className="w-full rounded-full border border-border bg-muted px-4 py-2 text-sm">
            <option value="all">Tous les pays</option>
            {COUNTRIES.map((c) => <option key={c.name}>{c.name}</option>)}
          </select>
          <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full rounded-full border border-border bg-muted px-4 py-2 text-sm">
            <option value="all">Toutes les villes</option>
            {citiesForCountry.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-6 flex min-h-[32px] flex-wrap items-center justify-between gap-3">
        {loading ? (
          <Shimmer className="h-4 w-40" />
        ) : (
          <p className="text-sm text-muted-foreground">{results.length} professionnel(s) trouvé(s)</p>
        )}
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <ArrowUpDown className="h-3.5 w-3.5" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground"
              aria-label="Trier les résultats"
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </label>
          {hasFilters && (
            <button
              onClick={reset}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold transition hover:border-primary/40"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Réinitialiser
            </button>
          )}
        </div>
      </div>



      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {loading ? (
          [0, 1, 2, 3].map((i) => <ProCardSkeleton key={i} />)
        ) : results.length === 0 ? (
          <div className="col-span-full">
            <EmptyState
              icon={<Search className="h-5 w-5" />}
              title="Aucun résultat"
              desc="Essayez une autre ville, une autre catégorie, ou élargissez votre recherche."
            />
          </div>
        ) : (
          results.map((p) => (
            <ProCard key={p.id} pro={p} isFav={favorites.includes(p.id)} onFav={() => toggleFav(p.id)} onOpen={() => onOpen(p)} />
          ))
        )}
      </div>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
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
  const highlighted = pro.status === "verifie" || pro.status === "equipe";
  return (
    <div
      className={`group relative flex flex-col rounded-3xl border bg-card p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-elevated ${
        highlighted ? "border-accent/40 ring-1 ring-accent/20" : "border-border"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="transition-transform duration-300 group-hover:scale-105">
          <Avatar initials={pro.initials} color={pro.color} src={pro.avatar} alt={pro.name} size={56} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate font-semibold">{pro.name}</p>
            <StatusBadge status={pro.status ?? "reference"} />
          </div>
          <p className="mt-1 truncate text-sm text-muted-foreground">
            {category?.label} · {pro.city}{pro.neighborhood ? `, ${pro.neighborhood}` : ""}
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
      {pro.price && <p className="mt-2 text-xs font-semibold text-accent">{pro.price}</p>}
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
  const isTeam = pro.status === "equipe";
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-forest/60 p-0 backdrop-blur-sm md:items-center md:p-6" onClick={onClose}>
      <div
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-card p-0 shadow-elevated md:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {isTeam && (
          <div className="flex items-center gap-2 bg-gradient-to-r from-forest to-forest-light px-6 py-2.5 text-xs font-semibold text-forest-foreground">
            <ShieldCheck className="h-4 w-4 text-accent" /> Profil Équipe AfriLink — vérifié par la plateforme
          </div>
        )}
        <div className="p-6 md:p-8">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className={isTeam ? "rounded-full ring-2 ring-accent ring-offset-2 ring-offset-card" : ""}>
              <Avatar initials={pro.initials} color={pro.color} src={pro.avatar} alt={pro.name} size={72} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-2xl font-bold">{pro.name}</h3>
                <StatusBadge status={pro.status ?? "reference"} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {pro.role ? `${pro.role} · ` : `${cat?.label} · `}{pro.city}{pro.neighborhood ? `, ${pro.neighborhood}` : ""}
              </p>
              <div className="mt-2 flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="font-semibold">{pro.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">· {pro.reviews} avis</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-muted"><X /></button>
        </div>

        <div className="relative mt-6 flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-forest via-forest-light to-forest-sage">
          <span className="font-display text-5xl font-bold tracking-tight text-forest-foreground/90">
            {pro.initials}
          </span>
          <span className="absolute bottom-3 left-4 rounded-full bg-black/25 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
            {pro.kind === "place"
              ? "Visuels officiels en cours de collecte"
              : `${cat?.label} · ${pro.city}`}
          </span>
        </div>


        <div className="mt-6 flex gap-3 rounded-2xl bg-accent/10 p-4 text-sm">
          <ShieldCheck className="h-5 w-5 shrink-0 text-accent" />
          <p>
            <strong>{STATUS_META[pro.status ?? "reference"].label} :</strong>{" "}
            {STATUS_META[pro.status ?? "reference"].description}
          </p>
        </div>

        <p className="mt-6 leading-relaxed text-forest/90">{pro.bio}</p>
        {pro.price && (
          <p className="mt-3 inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">{pro.price}</p>
        )}

        {CITY_COORDS[pro.city] && (
          <div className="mt-8">
            <h4 className="mb-3 font-semibold">Localisation</h4>
            <LocationMap
              lat={CITY_COORDS[pro.city][0]}
              lng={CITY_COORDS[pro.city][1]}
              label={`${pro.name} · ${pro.city}${pro.neighborhood ? `, ${pro.neighborhood}` : ""}`}
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Position approximative (centre-ville de {pro.city}) — pas d'adresse précise vérifiée.
            </p>
          </div>
        )}

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

        <div className="sticky bottom-0 -mx-6 mt-8 flex flex-wrap gap-3 border-t border-border bg-card/95 px-6 py-4 backdrop-blur md:static md:mx-0 md:border-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
          <button onClick={onContact} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-90">
            <MessageCircle className="h-4 w-4" /> Contacter
          </button>
          <button onClick={onFav} className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition ${isFav ? "border-accent bg-accent/10 text-accent" : "border-border hover:border-primary/40"}`}>
            <Heart className={`h-4 w-4 ${isFav ? "fill-accent" : ""}`} /> {isFav ? "Ajouté" : "Ajouter aux favoris"}
          </button>
        </div>
        </div>
      </div>
    </div>

  );
}

/* ---------------- FAVORITES ---------------- */

function FavoritesView({
  favorites, toggleFav, favLibrary, toggleLibFav, onOpen, onExplore, onLibrary,
}: {
  favorites: string[]; toggleFav: (id: string) => void;
  favLibrary: string[]; toggleLibFav: (id: string) => void;
  onOpen: (p: Pro) => void; onExplore: () => void; onLibrary: () => void;
}) {
  const [tab, setTab] = useState<"pros" | "resources">("pros");
  const list = PROS.filter((p) => favorites.includes(p.id));
  const resources = LIBRARY.filter((i) => favLibrary.includes(i.id));

  return (
    <div>
      <h2 className="mb-4 font-display text-2xl font-bold">Mes favoris</h2>
      <div className="mb-5 flex flex-wrap gap-2">
        <FilterChip active={tab === "pros"} onClick={() => setTab("pros")}>Professionnels ({list.length})</FilterChip>
        <FilterChip active={tab === "resources"} onClick={() => setTab("resources")}>Ressources ({resources.length})</FilterChip>
      </div>

      {tab === "pros" ? (
        list.length === 0 ? (
          <EmptyState
            icon={<Heart className="h-5 w-5" />}
            title="Aucun favori pour l'instant"
            desc="Ajoutez des profils depuis Explorer pour les retrouver ici en un geste."
            action={
              <button onClick={onExplore} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
                <Compass className="h-4 w-4" /> Explorer les pros
              </button>
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {list.map((p) => <ProCard key={p.id} pro={p} isFav onFav={() => toggleFav(p.id)} onOpen={() => onOpen(p)} />)}
          </div>
        )
      ) : resources.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="h-5 w-5" />}
          title="Aucune ressource enregistrée"
          desc="Enregistrez des guides depuis la Bibliothèque pour les retrouver ici."
          action={
            <button onClick={onLibrary} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              <Library className="h-4 w-4" /> Ouvrir la bibliothèque
            </button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {resources.map((item) => (
            <div key={item.id} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{item.format}</span>
                <button onClick={() => toggleLibFav(item.id)} aria-label="Retirer des favoris" className="rounded-full border border-border p-2 text-accent">
                  <Heart className="h-4 w-4 fill-current" />
                </button>
              </div>
              <p className="mt-3 font-display text-lg font-semibold leading-snug">{item.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                <Download className="h-4 w-4" /> Consulter
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


/* ---------------- MESSAGING ---------------- */

function MessagingView({
  activeConv, setActiveConv, unreadMap, markRead,
}: { activeConv: string | null; setActiveConv: (id: string | null) => void; unreadMap: Record<string, number>; markRead: (id: string) => void }) {

  const [drafts, setDrafts] = useState<Record<string, { from: string; text: string; time: string }[]>>({});
  const [input, setInput] = useState("");
  const [mobileThread, setMobileThread] = useState(false);

  const isNew = activeConv?.startsWith("new-");
  const newProId = isNew ? activeConv!.replace("new-", "") : null;
  const newPro = newProId ? PROS.find((p) => p.id === newProId) : null;

  const convs = MOCK_CONVERSATIONS.map((c) => ({ ...c, unread: unreadMap[c.id] ?? 0, pro: PROS.find((p) => p.id === c.proId)! }));
  const current = convs.find((c) => c.id === activeConv);
  const currentPro = current?.pro ?? newPro ?? null;
  const currentMessages = current
    ? [...current.messages, ...(drafts[current.id] ?? [])]
    : newProId
      ? drafts[activeConv!] ?? []
      : [];

  const openConv = (id: string) => {
    setActiveConv(id);
    setMobileThread(true);
    markRead(id);
  };


  const send = () => {
    if (!input.trim() || !activeConv) return;
    const text = input.trim();
    const id = activeConv;
    setDrafts((d) => ({
      ...d,
      [id]: [...(d[id] ?? []), { from: "me", text, time: "À l'instant" }],
    }));
    setInput("");
    setTimeout(() => {
      setDrafts((d) => ({
        ...d,
        [id]: [
          ...(d[id] ?? []),
          { from: "them", text: "Merci pour votre message ! Je reviens vers vous très vite.", time: "À l'instant" },
        ],
      }));
    }, 1600);
  };


  return (
    <div className="grid gap-0 overflow-hidden rounded-3xl border border-border bg-card shadow-soft md:grid-cols-[280px_1fr]">
      <div className={`border-b border-border md:block md:border-b-0 md:border-r ${mobileThread ? "hidden" : "block"}`}>
        <div className="p-4">
          <h3 className="font-semibold">Conversations</h3>
        </div>
        <div className="max-h-96 overflow-y-auto md:max-h-[560px]">
          {convs.map((c) => (
            <button
              key={c.id}
              onClick={() => openConv(c.id)}
              className={`flex w-full items-center gap-3 border-t border-border p-4 text-left transition hover:bg-muted/50 ${activeConv === c.id ? "bg-muted/60" : ""}`}
            >
              <Avatar initials={c.pro.initials} color={c.pro.color} src={c.pro.avatar} alt={c.pro.name} />
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
            <button
              onClick={() => openConv(activeConv!)}
              className="flex w-full items-center gap-3 border-t border-border bg-accent/10 p-4 text-left"
            >
              <Avatar initials={newPro.initials} color={newPro.color} src={newPro.avatar} alt={newPro.name} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{newPro.name}</p>
                <p className="truncate text-xs text-muted-foreground">Nouvelle conversation</p>
              </div>
            </button>
          )}
        </div>
      </div>

      <div className={`min-h-[520px] flex-col md:flex ${mobileThread ? "flex" : "hidden"}`}>
        {currentPro ? (
          <>
            <div className="flex items-center gap-3 border-b border-border p-4">
              <button
                onClick={() => setMobileThread(false)}
                className="rounded-full p-2 text-muted-foreground hover:bg-muted md:hidden"
                aria-label="Retour aux conversations"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <Avatar initials={currentPro.initials} color={currentPro.color} src={currentPro.avatar} alt={currentPro.name} />
              <div className="min-w-0">
                <p className="flex items-center gap-2 truncate font-semibold">
                  {currentPro.name}
                  <StatusBadge status={currentPro.status ?? "reference"} />
                </p>
                <p className="truncate text-xs text-muted-foreground">{CATEGORIES.find((c) => c.slug === currentPro.category)?.label} · {currentPro.city}</p>
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

/* ---------------- PROFILE ---------------- */

function ProfileView({
  user, isAuthed, onFavorites,
}: { user: AppUser; isAuthed: boolean; onFavorites: () => void }) {
  if (!isAuthed) {
    return (
      <EmptyState
        icon={<User className="h-5 w-5" />}
        title="Créez votre profil AfriLink"
        desc="Connectez-vous pour publier, échanger avec les pros et retrouver vos favoris sur tous vos appareils."
        action={
          <div className="flex flex-wrap justify-center gap-2">
            <Link to="/inscription" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              Créer un compte
            </Link>
            <Link to="/connexion" className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold">
              Se connecter
            </Link>
          </div>
        }
      />
    );
  }
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
        <div className="h-32 bg-gradient-to-br from-forest to-forest-light" />
        <div className="-mt-12 flex flex-col items-start gap-4 p-6 md:flex-row md:items-end">
          <div className="rounded-full ring-4 ring-card">
            <Avatar initials={user.initials} color={user.color} src={user.avatar} size={96} />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-2xl font-bold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.role} · {user.city}</p>
          </div>
          <button className="rounded-full border border-border px-4 py-2 text-sm font-semibold transition hover:border-primary/40">
            Modifier le profil
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Favoris", value: 2, onClick: onFavorites },
          { label: "Conversations", value: 3 },
          { label: "Posts publiés", value: 1 },
        ].map((s) => (
          <button
            key={s.label}
            onClick={s.onClick}
            className="rounded-2xl border border-border bg-card p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-medium"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-3xl font-bold">{s.value}</p>
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h3 className="font-semibold">Statuts de la communauté</h3>
        <div className="mt-4 space-y-3">
          {(Object.keys(STATUS_META) as ProStatus[]).map((s) => (
            <div key={s} className="flex items-start gap-3">
              <StatusBadge status={s} className="mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">{STATUS_META[s].description}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={signOut}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-muted-foreground transition hover:border-destructive/40 hover:text-destructive"
      >
        <LogOut className="h-4 w-4" /> Se déconnecter
      </button>
    </div>
  );
}

/* ---------------- COMMUNAUTÉ ---------------- */

function CommunityView({ onOpen }: { onOpen: (p: Pro) => void }) {
  const loading = useLoading([]);
  const highlights = useMemo(
    () => PROS.filter((p) => p.status === "verifie" || p.status === "equipe").slice(0, 6),
    [],
  );
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">La communauté</p>
        <h2 className="mt-2 font-display text-2xl font-bold">Une confiance construite depuis 2022</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            [STATS.plans, STATS.plansLabel],
            [STATS.members, STATS.membersLabel],
            [STATS.pros, STATS.prosLabel],
          ].map(([v, l]) => (
            <div key={l} className="rounded-2xl bg-muted/50 p-4">
              <p className="font-display text-2xl font-bold text-accent">{v}</p>
              <p className="mt-1 text-xs text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center gap-4">
          <Avatar initials={FOUNDER.initials} color="var(--forest)" src={FOUNDER.avatar} alt={FOUNDER.name} size={64} />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-lg font-semibold">{FOUNDER.name}</h3>
              <StatusBadge status="equipe" />
            </div>
            <p className="text-sm text-muted-foreground">{FOUNDER.role} · {FOUNDER.city}</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{FOUNDER.bio}</p>
        <button
          onClick={() => onOpen(FOUNDER)}
          className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold transition hover:border-primary/40"
        >
          Voir le profil <ArrowRight className="h-4 w-4" />
        </button>
      </section>

      <section>
        <h3 className="mb-4 font-display text-lg font-semibold">Membres mis en avant</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {loading
            ? [0, 1, 2, 3].map((i) => <ProCardSkeleton key={i} />)
            : highlights.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onOpen(p)}
                  className="flex items-center gap-3 rounded-3xl border border-border bg-card p-4 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-medium"
                >
                  <Avatar initials={p.initials} color={p.color} src={p.avatar} alt={p.name} size={44} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{p.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {CATEGORIES.find((c) => c.slug === p.category)?.label} · {p.city}
                    </p>
                  </div>
                  <StatusBadge status={p.status ?? "reference"} />
                </button>
              ))}
        </div>
      </section>
    </div>
  );
}

/* ---------------- GUIDES ---------------- */

function GuidesView() {
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Guides</p>
        <h2 className="mt-2 font-display text-2xl font-bold">Préparer votre arrivée, étape par étape</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Démarches, bonnes pratiques et contacts indispensables par pays.
        </p>
        <Link
          to="/guide"
          className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Ouvrir le guide d'arrivée <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {CATEGORIES.map((c) => {
          const Icon = CATEGORY_ICONS[c.icon];
          return (
            <div key={c.slug} className="rounded-3xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-medium">
              <span className="icon-circle mb-4"><Icon className="h-5 w-5" /></span>
              <p className="font-semibold">{c.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Les repères essentiels de l'univers {c.label.toLowerCase()} dans les villes couvertes.
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- BIBLIOTHÈQUE ---------------- */

function LibraryView({ locked, favLibrary, toggleLibFav }: { locked: boolean; favLibrary: string[]; toggleLibFav: (id: string) => void }) {
  const [cat, setCat] = useState<string>("all");
  const loading = useLoading([cat]);
  const items = LIBRARY.filter((i) => cat === "all" || i.category === cat);
  const libCats = CATEGORIES.filter((c) => LIBRARY.some((i) => i.category === c.slug));
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Bibliothèque</p>
        <h2 className="mt-2 font-display text-2xl font-bold">Les ressources de la communauté</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {locked
            ? "Visible par tous, accessible aux membres connectés."
            : "Accès complet — téléchargez et consultez librement."}
        </p>
        {locked && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Link to="/connexion" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              <Lock className="h-4 w-4" /> Débloquer la bibliothèque
            </Link>
            <Link to="/inscription" className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold">
              Créer un compte
            </Link>
          </div>
        )}
      </div>

      {!locked && (
        <div className="flex flex-wrap gap-2">
          <FilterChip active={cat === "all"} onClick={() => setCat("all")}>Toutes les ressources</FilterChip>
          {libCats.map((c) => (
            <FilterChip key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>{c.label}</FilterChip>
          ))}
        </div>
      )}

      {!loading && items.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="h-5 w-5" />}
          title="Aucune ressource ici"
          desc="Choisissez un autre univers pour retrouver les guides de la communauté."
          action={<button onClick={() => setCat("all")} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Voir tout</button>}
        />
      ) : (
      <div className="grid gap-4 sm:grid-cols-2">
        {loading
          ? [0, 1, 2, 3].map((i) => <ProCardSkeleton key={i} />)
          : items.map((item) => (
              <div key={item.id} className="relative overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-soft">
                <div className={locked ? "select-none blur-[3px]" : ""}>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                      {item.format}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {CATEGORIES.find((c) => c.slug === item.category)?.label}
                    </span>
                  </div>
                  <p className="mt-3 font-display text-lg font-semibold leading-snug">{item.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      <Download className="h-4 w-4" /> Consulter
                    </span>
                    {!locked && (
                      <button
                        onClick={() => toggleLibFav(item.id)}
                        aria-label={favLibrary.includes(item.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                        className={`rounded-full border p-2 transition ${favLibrary.includes(item.id) ? "border-accent/50 text-accent" : "border-border text-muted-foreground hover:border-accent/40 hover:text-accent"}`}
                      >
                        <Heart className={`h-4 w-4 ${favLibrary.includes(item.id) ? "fill-current" : ""}`} />
                      </button>
                    )}
                  </div>

                </div>
                {locked && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-card/55 backdrop-blur-[1px]">
                    <span className="icon-circle"><Lock className="h-5 w-5" /></span>
                    <Link to="/connexion" className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
                      Se connecter pour ouvrir
                    </Link>
                  </div>
                )}
              </div>
            ))}
      </div>
      )}
    </div>

  );
}

/* ---------------- COUVERTURE ---------------- */

function CoverageCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
      <h3 className="flex items-center gap-2 font-semibold"><MapPin className="h-4 w-4 text-accent" /> Villes couvertes</h3>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {MAIN_CITIES.map((c) => (
          <span key={c} className="rounded-full bg-forest/10 px-2.5 py-1 text-xs font-semibold text-forest">{c}</span>
        ))}
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">En cours d'ouverture</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {OPENING_CITIES.map((c) => (
          <span key={c} className="rounded-full border border-dashed border-accent/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">{c}</span>
        ))}
      </div>
    </div>
  );
}
