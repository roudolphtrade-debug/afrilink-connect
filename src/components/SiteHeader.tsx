import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { SITE_LINKS } from "@/lib/site-nav";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <Link to="/" aria-label="Accueil AfriLink" className="shrink-0"><Logo /></Link>
          <nav aria-label="Navigation principale" className="hidden items-center gap-5 xl:flex">
            {SITE_LINKS.map((link) => <Link key={link.to} to={link.to} {...("hash" in link ? { hash: link.hash } : {})} className="text-sm font-medium hover:text-accent">{link.label}</Link>)}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
            <Link to="/connexion" className="hidden text-sm font-medium hover:text-accent xl:inline">Se connecter</Link>
            <Button variant="ghost" size="icon" className="xl:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} aria-controls="mobile-menu">
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        <div id="mobile-menu" inert={!open} className={`overflow-hidden transition-[max-height] duration-300 ease-out xl:hidden ${open ? "max-h-[32rem] border-t border-border" : "max-h-0"}`}>
          <nav aria-label="Navigation mobile" className="flex flex-col gap-4 px-4 py-5 text-base">
            {SITE_LINKS.map((link) => <Link key={link.to} to={link.to} {...("hash" in link ? { hash: link.hash } : {})} onClick={() => setOpen(false)}>{link.label}</Link>)}
            <Link to="/connexion" onClick={() => setOpen(false)}>Se connecter</Link>
          </nav>
        </div>
      </header>
      <div aria-hidden="true" onClick={() => setOpen(false)} className={`fixed inset-0 z-30 bg-forest/60 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`} />
    </>
  );
}
