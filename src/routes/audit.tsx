import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AlertTriangle, ArrowLeft, CheckCircle2, Download, ShieldCheck, XCircle } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { StatusBadge } from "@/components/StatusBadge";
import { PROS } from "@/lib/mock-data";
import {
  buildPersonRows, downloadCsv, personRowsToCsv, runValidation, type Severity,
} from "@/lib/validation";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "AfriLink — Audit de la démo" },
      { name: "description", content: "Audit interne : unicité des portraits, cohérence des noms, statuts et verrouillage membre." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuditPage,
});

const SEV_STYLES: Record<Severity, { className: string; icon: typeof CheckCircle2 }> = {
  ok: { className: "text-forest-sage", icon: CheckCircle2 },
  warn: { className: "text-accent", icon: AlertTriangle },
  error: { className: "text-destructive", icon: XCircle },
};

function AuditPage() {
  const rows = useMemo(() => buildPersonRows(), []);
  const checks = useMemo(() => runValidation(rows), [rows]);
  const [onlyIssues, setOnlyIssues] = useState(false);

  const visible = onlyIssues ? rows.filter((r) => r.duplicateWith.length || !r.nameOk || !r.statusOk || !r.avatar) : rows;
  const errors = checks.filter((c) => c.severity === "error").length;
  const warns = checks.filter((c) => c.severity === "warn").length;

  return (
    <div className="min-h-screen bg-cream/40 pb-16">
      <header className="sticky top-0 z-30 border-b border-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-3 md:px-6">
          <Link to="/app" className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-semibold hover:border-primary/40">
            <ArrowLeft className="h-4 w-4" /> Démo
          </Link>
          <h1 className="font-display text-lg font-bold">Audit de la démo</h1>
          <span
            className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
              errors ? "bg-destructive/10 text-destructive" : "bg-forest-sage/15 text-forest-sage"
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            {errors ? `${errors} anomalie(s)` : "Conforme"}{warns ? ` · ${warns} alerte(s)` : ""}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] space-y-6 px-4 py-6 md:px-6">
        {/* Mode validation continue */}
        <section className="grid gap-3 md:grid-cols-2">
          {checks.map((c) => {
            const s = SEV_STYLES[c.severity];
            const Icon = s.icon;
            return (
              <article key={c.id} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
                <div className="flex items-start gap-3">
                  <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${s.className}`} />
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{c.scope}</p>
                    <p className="font-semibold">{c.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{c.detail}</p>
                    {c.items && c.items.length > 0 && (
                      <ul className="mt-2 max-h-40 space-y-1 overflow-y-auto text-xs text-muted-foreground">
                        {c.items.slice(0, 40).map((it) => (
                          <li key={it} className="rounded bg-muted/50 px-2 py-1">{it}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* Table des profils */}
        <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
            <h2 className="font-semibold">Profils par personne</h2>
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
              {visible.length} / {rows.length}
            </span>
            <span className="text-xs text-muted-foreground">
              {PROS.filter((p) => p.kind === "place").length} établissements exclus (monogrammes)
            </span>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setOnlyIssues((v) => !v)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  onlyIssues ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/40"
                }`}
              >
                Anomalies uniquement
              </button>
              <button
                onClick={() => downloadCsv("afrilink-audit-profils.csv", personRowsToCsv(rows))}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
              >
                <Download className="h-3.5 w-3.5" /> Export CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="bg-muted/50 text-left text-[11px] uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="p-3">Personne</th>
                  <th className="p-3">Statut</th>
                  <th className="p-3">Ville</th>
                  <th className="p-3">Fichier image</th>
                  <th className="p-3">Contrôles</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((r) => {
                  const dup = r.duplicateWith.length > 0;
                  return (
                    <tr key={r.id} className={`border-t border-border ${dup ? "bg-destructive/5" : ""}`}>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className={dup ? "rounded-full outline outline-2 outline-offset-2 outline-destructive" : ""}>
                            <Avatar initials={r.name.slice(0, 2).toUpperCase()} color="#0F2B1E" src={r.avatar} alt={r.name} size={36} />
                          </div>
                          <span className="font-semibold">{r.name}</span>
                        </div>
                      </td>
                      <td className="p-3"><StatusBadge status={r.status} /></td>
                      <td className="p-3 text-muted-foreground">{r.city}</td>
                      <td className="p-3 font-mono text-xs text-muted-foreground">{r.imageKey}</td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold">
                          {dup ? (
                            <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-destructive" title={r.duplicateWith.join(", ")}>
                              Doublon image : {r.duplicateWith.join(", ")}
                            </span>
                          ) : (
                            <span className="rounded-full bg-forest-sage/15 px-2 py-0.5 text-forest-sage">Image unique</span>
                          )}
                          {!r.nameOk && <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-destructive">Capitalisation</span>}
                          {!r.statusOk && <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-destructive">Statut non conforme</span>}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
