import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { JoinCommunityCta } from "./JoinCommunityCta";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="/#confiance" className="text-sm font-medium hover:text-accent">
              Confiance
            </a>
            <a href="/#villes" className="text-sm font-medium hover:text-accent">
              Nos villes
            </a>
            <a href="/#univers" className="text-sm font-medium hover:text-accent">
              Univers
            </a>
            <Link to="/app" className="text-sm font-medium hover:text-accent">
              Entrer
            </Link>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Link to="/connexion" className="text-sm font-medium hover:text-accent">
              Se connecter
            </Link>
            <JoinCommunityCta className="shadow-soft">Rejoindre la communauté</JoinCommunityCta>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <div
          inert={!open}
          className={`overflow-hidden transition-[max-height] duration-300 ease-out md:hidden ${
            open ? "max-h-96 border-t border-border" : "max-h-0 border-t-0"
          }`}
        >
          <div
            className={`flex flex-col gap-4 px-4 py-5 transition-all duration-300 ease-out ${
              open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
            }`}
          >
            <a href="/#confiance" onClick={() => setOpen(false)}>
              Confiance
            </a>
            <a href="/#villes" onClick={() => setOpen(false)}>
              Nos villes
            </a>
            <a href="/#univers" onClick={() => setOpen(false)}>
              Univers
            </a>
            <a href="/#univers" onClick={() => setOpen(false)}>
              Univers
            </a>
            <Link to="/app" onClick={() => setOpen(false)}>
              Entrer
            </Link>
            <Link to="/connexion" onClick={() => setOpen(false)}>
              Se connecter
            </Link>
            <JoinCommunityCta onBeforeOpen={() => setOpen(false)}>
              Rejoindre la communauté
            </JoinCommunityCta>
          </div>
        </div>
      </header>
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-30 bg-forest/60 backdrop-blur-sm transition-opacity duration-300 ease-out md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
    </>
  );
}
