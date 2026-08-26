import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, LifeBuoy, Lock, Mail, Search, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FaqAccordion, useFaqSearch } from "@/components/HelpDrawer";
import { FAQ, COMMUNITY_RULES, PRIVACY_POINTS } from "@/lib/help-data";

export const Route = createFileRoute("/aide")({
  head: () => ({
    meta: [
      { title: "Centre d'aide — AfriLink" },
      {
        name: "description",
        content:
          "FAQ AfriLink : création de compte, statuts de confiance, recherche de professionnels, bibliothèque, signalement, sécurité et confidentialité.",
      },
      { property: "og:title", content: "Centre d'aide — AfriLink" },
      {
        property: "og:description",
        content: "Toutes les réponses sur les comptes, les statuts de confiance, la bibliothèque et la sécurité AfriLink.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HelpPage,
});

type FormKind = "contact" | "report" | null;

function HelpPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [form, setForm] = useState<FormKind>(null);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState<FormKind>(null);
  const groups = useFaqSearch(q, cat);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(form);
    setMessage("");
    setForm(null);
  };

  return (
    <div>
      <SiteHeader />

      <section className="section-cream">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center md:px-8 md:py-24">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">Aide</span>
          <h1 className="mt-4 font-display text-3xl font-bold md:text-5xl">Comment pouvons-nous vous aider ?</h1>
          <p className="mt-4 text-muted-foreground">
            Cherchez une réponse, parcourez la FAQ par catégorie ou écrivez-nous directement.
          </p>
          <div className="mx-auto mt-8 flex max-w-xl items-center gap-3 rounded-full border border-border bg-card px-5 py-3 shadow-soft">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Mot de passe, statut vérifié, bibliothèque…"
              className="w-full bg-transparent text-sm outline-none"
              aria-label="Rechercher dans l'aide"
            />
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setCat("all")}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${cat === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/40"}`}
            >
              Tout
            </button>
            {FAQ.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${cat === c.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/40"}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1fr_320px] md:px-8 md:py-24">
          <div>
            <h2 className="mb-6 font-display text-2xl font-bold">Questions fréquentes</h2>
            <FaqAccordion groups={groups} />
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
              <h3 className="flex items-center gap-2 font-semibold"><LifeBuoy className="h-4 w-4 text-accent" /> Besoin d'un humain ?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                L'équipe répond sous 48 h ouvrées.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => { setForm("contact"); setSent(null); }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  <Mail className="h-4 w-4" /> Contacter l'équipe
                </button>
                <button
                  onClick={() => { setForm("report"); setSent(null); }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold transition hover:border-destructive/40 hover:text-destructive"
                >
                  <AlertTriangle className="h-4 w-4" /> Signaler un problème
                </button>
              </div>

              {sent && (
                <p className="mt-4 flex items-start gap-2 rounded-2xl bg-forest-sage/10 p-3 text-xs text-forest-sage">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  {sent === "contact"
                    ? "Message enregistré en mode démonstration : aucun envoi réel n'a lieu tant que le backend n'est pas branché."
                    : "Signalement enregistré en mode démonstration. En production, il serait traité par l'équipe sous 48 h."}
                </p>
              )}

              {form && (
                <form onSubmit={submit} className="mt-4 space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground" htmlFor="help-message">
                    {form === "contact" ? "Votre message" : "Décrivez le problème"}
                  </label>
                  <textarea
                    id="help-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full rounded-2xl border border-border bg-muted/30 p-3 text-sm outline-none focus:border-primary"
                    placeholder={form === "contact" ? "Expliquez votre besoin…" : "Profil concerné, date, ce qui s'est passé…"}
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="flex-1 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-40"
                    >
                      Envoyer
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm(null)}
                      className="rounded-full border border-border px-4 py-2 text-xs font-semibold"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
              <h3 className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-4 w-4 text-accent" /> Règles communautaires</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {COMMUNITY_RULES.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
              <h3 className="flex items-center gap-2 font-semibold"><Lock className="h-4 w-4 text-accent" /> Confidentialité</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {PRIVACY_POINTS.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-sage" />
                    {r}
                  </li>
                ))}
              </ul>
              <Link to="/app" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                Gérer mes préférences <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
