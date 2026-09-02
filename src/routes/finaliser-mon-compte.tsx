import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { supabase } from "@/lib/supabase-client";

/**
 * Page d'atterrissage du lien d'invitation Supabase (envoyé par
 * `inviteUserByEmail` / "Send invitation" depuis le Dashboard).
 *
 * NE REMPLACE PAS le système de connexion actuel (auth-store.ts, session
 * simulée en localStorage) : cette route est un point d'entrée dédié et
 * isolé, dont le seul rôle est de rendre le parcours d'invitation Supabase
 * fonctionnel. `signIn()` (auth-store) reste inchangé et n'est pas appelé
 * ici — la session issue de cette page est portée uniquement par
 * supabase-js (cookies/localStorage propres à Supabase), pas par
 * `afrilink.session`.
 */

type SearchParams = { code?: string; token_hash?: string; type?: string };

export const Route = createFileRoute("/finaliser-mon-compte")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    code: typeof search.code === "string" ? search.code : undefined,
    token_hash: typeof search.token_hash === "string" ? search.token_hash : undefined,
    type: typeof search.type === "string" ? search.type : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Finaliser mon compte — AfriLink" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: FinaliserMonCompte,
});

type Status = "loading" | "ready" | "error" | "success";

function FinaliserMonCompte() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [status, setStatus] = useState<Status>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  // Empêche une double exécution de la récupération de session (ex. sous
  // React StrictMode, qui monte les effets deux fois en développement) :
  // exchangeCodeForSession()/verifyOtp() ne sont pas idempotents (un code
  // ou un token_hash n'est utilisable qu'une seule fois côté serveur).
  const sessionResolutionStarted = useRef(false);

  useEffect(() => {
    if (sessionResolutionStarted.current) return;
    sessionResolutionStarted.current = true;

    async function resolveSession() {
      try {
        // CORRECTION (audit) : ne jamais supposer que detectSessionInUrl
        // (hash flow implicite) suffit seul. Le lien envoyé par Supabase
        // peut relever de 3 mécanismes distincts selon la configuration
        // du projet ; on les couvre dans l'ordre de spécificité :
        //   1. PKCE / code flow — paramètre `code` dans l'URL.
        //   2. Flow par vérification explicite — `token_hash` + `type`.
        //   3. Hash flow implicite — déjà traité automatiquement par
        //      supabase-js AVANT le premier rendu (detectSessionInUrl,
        //      comportement par défaut) ; on se contente alors de relire
        //      la session déjà établie via getSession().
        if (search.code) {
          const { error } = await supabase.auth.exchangeCodeForSession(search.code);
          if (error) throw error;
        } else if (search.token_hash && search.type) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: search.token_hash,
            type: search.type as "invite" | "recovery" | "email_change" | "signup" | "email",
          });
          if (error) throw error;
        }

        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (!data.session) {
          setStatus("error");
          setErrorMessage(
            "Aucune session valide n'a pu être récupérée. Le lien a peut-être déjà été utilisé ou a expiré."
          );
          return;
        }

        setStatus("ready");
      } catch (err) {
        setStatus("error");
        setErrorMessage(
          err instanceof Error
            ? err.message
            : "Une erreur inattendue est survenue lors de la vérification du lien."
        );
      }
    }

    void resolveSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- résolu une seule fois au montage (cf. sessionResolutionStarted)
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (password.length < 8) {
      setFormError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (password !== confirmPassword) {
      setFormError("Les deux mots de passe ne correspondent pas.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSubmitting(false);
    if (error) {
      setFormError(error.message);
      return;
    }
    setStatus("success");
    setTimeout(() => {
      void navigate({ to: "/app" });
    }, 1500);
  };

  return (
    <div className="grid min-h-screen place-items-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        {status === "loading" && (
          <div className="flex flex-col items-center gap-3 text-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Vérification de votre lien d'invitation…</p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-3 text-center">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <h1 className="font-display text-xl font-bold">Lien invalide ou expiré</h1>
            <p className="text-sm text-muted-foreground">{errorMessage}</p>
            <p className="text-xs text-muted-foreground">
              Contactez l'équipe AfriLink pour recevoir une nouvelle invitation.
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-3 text-center">
            <CheckCircle2 className="h-8 w-8 text-primary" />
            <h1 className="font-display text-xl font-bold">Mot de passe défini</h1>
            <p className="text-sm text-muted-foreground">Redirection en cours…</p>
          </div>
        )}

        {status === "ready" && (
          <>
            <h1 className="font-display text-2xl font-bold tracking-tight">Finaliser mon compte</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Choisissez votre mot de passe pour activer votre compte AfriLink.
            </p>

            <form onSubmit={submit} className="mt-8 space-y-3">
              <Field icon={<Lock className="h-4 w-4" />}>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={show ? "text" : "password"}
                  placeholder="Nouveau mot de passe"
                  autoComplete="new-password"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? "Masquer" : "Afficher"}
                  className="text-muted-foreground transition hover:text-foreground"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </Field>
              <Field icon={<Lock className="h-4 w-4" />}>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={show ? "text" : "password"}
                  placeholder="Confirmer le mot de passe"
                  autoComplete="new-password"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </Field>

              {formError && (
                <p className="rounded-2xl bg-destructive/10 px-4 py-2.5 text-xs font-medium text-destructive">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90 disabled:opacity-60"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Activer mon compte
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-muted/30 px-4 py-3 transition focus-within:border-primary focus-within:bg-background">
      <span className="text-muted-foreground">{icon}</span>
      {children}
    </div>
  );
}
