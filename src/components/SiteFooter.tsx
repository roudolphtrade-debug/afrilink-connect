import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { SITE_LINKS } from "@/lib/site-nav";

export function SiteFooter() {
  return (
    <footer className="section-forest">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <div className="inline-block rounded-2xl bg-card p-3"><Logo loading="lazy" /></div>
            <p className="mt-6 max-w-md font-display text-lg font-semibold">Les bonnes personnes avant les bonnes adresses.</p>
            <p className="mt-3 text-base text-forest-foreground/80">Premier service logement à Douala en préparation.</p>
          </div>
          <nav aria-label="Navigation de pied de page">
            <h2 className="mb-4 text-sm font-semibold text-accent">AfriLink</h2>
            <ul className="space-y-3 text-base text-forest-foreground/80">
              {SITE_LINKS.map((link) => <li key={link.to}><Link to={link.to} {...("hash" in link ? { hash: link.hash } : {})}>{link.label}</Link></li>)}
              <li><Link to="/guide">Guide d'arrivée</Link></li>
              <li><Link to="/connexion">Se connecter</Link></li>
            </ul>
          </nav>
        </div>
        <div className="mt-12 border-t border-border/30 pt-6 text-sm text-forest-foreground/70">© {new Date().getFullYear()} AfriLink. Les Bons Plans du Bled.</div>
      </div>
    </footer>
  );
}
