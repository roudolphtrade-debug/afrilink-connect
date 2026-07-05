import { useNavigate } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { useState, type ReactNode } from "react";

export function JoinCommunityCta({
  className,
  children,
  onBeforeOpen,
}: {
  className?: string;
  children: ReactNode;
  onBeforeOpen?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => {
          onBeforeOpen?.();
          setOpen(true);
        }}
      >
        {children}
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-forest/60 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-elevated"
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
              <button
                type="button"
                onClick={() => navigate({ to: "/app" })}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Voir l'aperçu
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full px-5 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
