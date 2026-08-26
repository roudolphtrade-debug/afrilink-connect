import { Link } from "@tanstack/react-router";
import { ChevronDown, HelpCircle, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { FAQ } from "@/lib/help-data";

export function useFaqSearch(query: string, category: string) {
  return useMemo(() => {
    const term = query.trim().toLowerCase();
    return FAQ.filter((c) => category === "all" || c.id === category)
      .map((c) => ({
        ...c,
        items: c.items.filter(
          (i) => !term || i.q.toLowerCase().includes(term) || i.a.toLowerCase().includes(term),
        ),
      }))
      .filter((c) => c.items.length > 0);
  }, [query, category]);
}

export function FaqAccordion({ groups }: { groups: ReturnType<typeof useFaqSearch> }) {
  const [open, setOpen] = useState<string | null>(null);
  if (groups.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
        Aucune réponse ne correspond à votre recherche. Contactez l'équipe, nous répondons sous 48 h.
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {groups.map((g) => (
        <section key={g.id}>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">{g.label}</h3>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            {g.items.map((item) => {
              const id = g.id + item.q;
              const isOpen = open === id;
              return (
                <div key={id} className="border-b border-border last:border-0">
                  <button
                    onClick={() => setOpen(isOpen ? null : id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-3 p-4 text-left text-sm font-semibold transition hover:bg-muted/50"
                  >
                    <span className="flex-1">{item.q}</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

export function HelpDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const groups = useFaqSearch(q, cat);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-forest/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-label="Aide AfriLink"
        inert={!open}
        className={`fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col bg-background shadow-elevated transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center gap-3 border-b border-border p-4">
          <span className="icon-circle"><HelpCircle className="h-5 w-5" /></span>
          <div className="flex-1">
            <p className="font-display font-semibold">Centre d'aide</p>
            <p className="text-xs text-muted-foreground">Réponses rapides et règles de la communauté</p>
          </div>
          <button onClick={onClose} aria-label="Fermer l'aide" className="rounded-full p-2 hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="border-b border-border p-4">
          <div className="flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher une réponse…"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <button
              onClick={() => setCat("all")}
              className={`rounded-full border px-3 py-1 text-[11px] font-semibold transition ${cat === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/40"}`}
            >
              Tout
            </button>
            {FAQ.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`rounded-full border px-3 py-1 text-[11px] font-semibold transition ${cat === c.id ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/40"}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <FaqAccordion groups={groups} />
        </div>

        <footer className="border-t border-border p-4">
          <Link
            to="/aide"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Ouvrir le centre d'aide complet
          </Link>
        </footer>
      </aside>
    </>
  );
}

/** Bouton flottant « ? Aide » + drawer FAQ. */
export function HelpFab({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-20 left-4 z-40 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-bold shadow-elevated transition hover:-translate-y-0.5 hover:border-primary/40 md:bottom-4 ${className}`}
        aria-label="Ouvrir l'aide"
      >
        <HelpCircle className="h-4 w-4 text-accent" /> Aide
      </button>
      <HelpDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
