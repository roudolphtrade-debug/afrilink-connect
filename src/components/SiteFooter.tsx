import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Facebook, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "./ui/tooltip";

const SOCIALS = [
  { icon: Instagram, label: "Instagram" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Facebook, label: "Facebook" },
];

export function SiteFooter() {
  return (
    <footer className="section-forest">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="rounded-2xl bg-white p-3 inline-block">
              <Logo loading="lazy" />
            </div>
            <p className="mt-6 max-w-md text-lg font-display font-semibold">
              Les bonnes personnes. Les bons plans. La bonne connexion.
            </p>
            <TooltipProvider delayDuration={200}>
              <div className="mt-6 flex gap-3">
                {["App Store", "Google Play"].map((store) => (
                  <Tooltip key={store}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        aria-disabled="true"
                        aria-label={`${store} (bientôt disponible)`}
                        onClick={(e) => e.preventDefault()}
                        className="cursor-not-allowed rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-forest-foreground/40"
                      >
                        {store}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Bientôt disponible</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
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
              <li className="pt-2">
                <TooltipProvider delayDuration={200}>
                  <div className="flex gap-3">
                    {SOCIALS.map(({ icon: Icon, label }) => (
                      <Tooltip key={label}>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            aria-disabled="true"
                            aria-label={`${label} (bientôt disponible)`}
                            onClick={(e) => e.preventDefault()}
                            className="cursor-not-allowed text-forest-foreground/40"
                          >
                            <Icon className="h-5 w-5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Bientôt disponible</TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </TooltipProvider>
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
