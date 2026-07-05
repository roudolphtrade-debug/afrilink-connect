import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="/#solution" className="text-sm font-medium hover:text-accent">La solution</a>
          <a href="/#comment" className="text-sm font-medium hover:text-accent">Comment ça marche</a>
          <a href="/#univers" className="text-sm font-medium hover:text-accent">Univers</a>
          <a href="/#temoignages" className="text-sm font-medium hover:text-accent">Communauté</a>
          <Link to="/demo" className="text-sm font-medium hover:text-accent">Démo</Link>
        </nav>
        <div className="hidden md:flex">
          <Link
            to="/demo"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
          >
            Rejoindre la communauté
          </Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border md:hidden">
          <div className="flex flex-col gap-4 px-4 py-5">
            <a href="/#solution" onClick={() => setOpen(false)}>La solution</a>
            <a href="/#comment" onClick={() => setOpen(false)}>Comment ça marche</a>
            <a href="/#univers" onClick={() => setOpen(false)}>Univers</a>
            <a href="/#temoignages" onClick={() => setOpen(false)}>Communauté</a>
            <Link to="/demo" onClick={() => setOpen(false)}>Démo</Link>
            <Link to="/demo" onClick={() => setOpen(false)} className="rounded-full bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground">
              Rejoindre la communauté
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
