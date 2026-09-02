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
// Repli public par conception : URL de projet + clé "publishable" (nouveau
// format Supabase, équivalent de l'ancienne clé "anon" — protégée par RLS,
// faite pour être visible côté client, jamais une clé secrète). Utilisé
// uniquement si les variables d'environnement ne sont pas injectées au
// build (cas de Lovable Pro sans Build secrets Enterprise). N'écrit
// JAMAIS de `sb_secret_...`/`service_role` ici, ni ailleurs dans ce fichier.
const PUBLIC_SUPABASE_URL_FALLBACK = "https://nciikoptkugwwrexxtod.supabase.co";
const PUBLIC_SUPABASE_PUBLISHABLE_KEY_FALLBACK = "sb_publishable_yd1oAdYQlmZJU5sqHfNOkQ_FVBG8Yi2";

const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) || PUBLIC_SUPABASE_URL_FALLBACK;
const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
  PUBLIC_SUPABASE_PUBLISHABLE_KEY_FALLBACK;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
