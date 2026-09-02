import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase unique côté frontend. N'utilise QUE l'URL du projet et la
 * clé publishable/anon (soumise à RLS de bout en bout) — jamais une clé
 * service_role/secrète, qui ne doit exister que côté serveur.
 *
 * `detectSessionInUrl: true` (par défaut) fait tenter à supabase-js la
 * récupération automatique d'une session depuis l'URL au chargement de la
 * page (hash flow legacy). Pour le PKCE / code flow (voir
 * src/routes/finaliser-mon-compte.tsx pour l'échange explicite via
 * exchangeCodeForSession), cette détection automatique ne suffit pas à elle
 * seule — elle est conservée ici par défaut sans dommage (no-op si aucun
 * fragment de session n'est présent dans l'URL), mais ne doit jamais être
 * supposée suffisante pour le flux d'invitation.
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // Erreur explicite plutôt qu'un client silencieusement cassé : évite un
  // échec opaque plus tard (ex. "fetch failed" sans contexte) si les
  // variables d'environnement ne sont pas renseignées.
  throw new Error(
    "VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY doivent être définies (voir .env.example)."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
