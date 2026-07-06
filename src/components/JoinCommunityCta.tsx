import { useNavigate } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function JoinCommunityCta({
  className,
  size = "pill",
  children,
  onBeforeOpen,
}: {
  className?: string;
  size?: "pill" | "pill-lg";
  children: ReactNode;
  onBeforeOpen?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="pill"
        size={size}
        className={className}
        onClick={() => {
          onBeforeOpen?.();
          setOpen(true);
        }}
      >
        {children}
      </Button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-forest/60 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-card p-6 text-center text-card-foreground shadow-floating"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="icon-circle mx-auto">
              <Sparkles className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold">
              Vous allez découvrir un aperçu
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Cette section utilise des données de démonstration pour illustrer le fonctionnement
              d'AfriLink. Aucune vraie mise en relation n'est encore disponible.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Button variant="pill" size="pill" onClick={() => navigate({ to: "/app" })}>
                Voir l'aperçu
              </Button>
              <Button
                variant="ghost"
                size="pill"
                className="rounded-full font-medium text-muted-foreground hover:bg-muted hover:text-muted-foreground"
                onClick={() => setOpen(false)}
              >
                Annuler
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
