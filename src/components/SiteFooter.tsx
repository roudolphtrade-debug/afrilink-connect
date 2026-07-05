import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Facebook, Mail } from "lucide-react";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="section-forest">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="rounded-2xl bg-white p-3 inline-block">
              <Logo />
            </div>
            <p className="mt-6 max-w-md text-lg font-display font-semibold">
              Les bonnes personnes. Les bons plans. La bonne connexion.
            </p>
            <div className="mt-6 flex gap-3">
              <a className="rounded-xl bg-white/10 px-4 py-3 text-sm font-medium hover:bg-white/20" href="#">App Store</a>
              <a className="rounded-xl bg-white/10 px-4 py-3 text-sm font-medium hover:bg-white/20" href="#">Google Play</a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-accent">Explorer</h4>
            <ul className="space-y-2 text-sm text-forest-foreground/80">
              <li><a href="/#solution">La solution</a></li>
              <li><a href="/#univers">Univers</a></li>
              <li><a href="/#temoignages">Communauté</a></li>
              <li><Link to="/app">Entrer</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-accent">Contact</h4>
            <ul className="space-y-3 text-sm text-forest-foreground/80">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@afrilink.co</li>
              <li className="flex gap-3 pt-2">
                <a href="#" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
                <a href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
                <a href="#" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-forest-foreground/60">
          © {new Date().getFullYear()} AfriLink. Les Bons Plans du Bled.
        </div>
      </div>
    </footer>
  );
}
