import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { signIn } from "@/lib/auth-store";
import { STATS } from "@/lib/mock-data";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const isSignup = mode === "signup";
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.includes("@")) return setError("Entrez une adresse email valide.");
    if (password.length < 6) return setError("Le mot de passe doit contenir au moins 6 caractères.");
    if (isSignup && name.trim().length < 2) return setError("Indiquez votre nom.");
    setLoading(true);
    setTimeout(() => {
      signIn(email, isSignup ? name : undefined);
      navigate({ to: "/app" });
    }, 700);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* FORM */}
      <div className="flex items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="inline-block">
            <Logo />
          </Link>
          <h1 className="mt-10 font-display text-3xl font-bold tracking-tight">
            {isSignup ? "Créer votre compte" : "Content de vous revoir"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isSignup
              ? "Rejoignez la communauté et accédez à la bibliothèque AfriLink."
              : "Connectez-vous pour retrouver votre réseau et vos échanges."}
          </p>

          <form onSubmit={submit} className="mt-8 space-y-3">
            {isSignup && (
              <Field icon={<User className="h-4 w-4" />}>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nom et prénom"
                  autoComplete="name"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </Field>
            )}
            <Field icon={<Mail className="h-4 w-4" />}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Adresse email"
                autoComplete="email"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </Field>
            <Field icon={<Lock className="h-4 w-4" />}>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={show ? "text" : "password"}
                placeholder="Mot de passe"
                autoComplete={isSignup ? "new-password" : "current-password"}
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

            {error && (
              <p className="rounded-2xl bg-destructive/10 px-4 py-2.5 text-xs font-medium text-destructive">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90 disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSignup ? "Créer mon compte" : "Se connecter"}
            </button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            {isSignup ? "Déjà membre ? " : "Pas encore de compte ? "}
            <Link
              to={isSignup ? "/connexion" : "/inscription"}
              className="font-semibold text-accent hover:underline"
            >
              {isSignup ? "Se connecter" : "Créer un compte"}
            </Link>
          </p>
          <p className="mt-8 text-xs text-muted-foreground">
            Aperçu produit — la session est simulée localement sur votre appareil.
          </p>
        </div>
      </div>

      {/* SIDE */}
      <div className="relative hidden overflow-hidden section-forest lg:flex lg:items-center">
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative px-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Depuis 2022</p>
          <p className="mt-6 max-w-md font-display text-3xl font-bold leading-tight">
            Trouvez les bonnes personnes avant les bonnes adresses.
          </p>
          <div className="mt-12 space-y-6">
            {[
              [STATS.plans, STATS.plansLabel],
              [STATS.members, STATS.membersLabel],
              [STATS.pros, STATS.prosLabel],
            ].map(([v, l]) => (
              <div key={l} className="border-l-2 border-accent/60 pl-4">
                <p className="font-display text-3xl font-bold text-accent">{v}</p>
                <p className="text-sm text-forest-foreground/70">{l}</p>
              </div>
            ))}
          </div>
        </div>
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
