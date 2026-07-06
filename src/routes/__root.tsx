import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { MapPinOff } from "lucide-react";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Logo } from "../components/Logo";
import { Button } from "../components/ui/button";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center">
      <Logo />
      <span className="icon-circle">
        <MapPinOff className="h-6 w-6" />
      </span>
      <div>
        <h1 className="font-display text-3xl font-bold">Page introuvable</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Cette page n'existe pas ou a été déplacée — même les meilleurs réseaux ont leurs impasses.
        </p>
      </div>
      <Button variant="pill" size="pill" asChild>
        <Link to="/">Retour à l'accueil</Link>
      </Button>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Cette page n'a pas pu se charger</h1>
        <p className="mt-2 text-sm text-muted-foreground">Réessayez ou revenez à l'accueil.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Réessayer
          </button>
          <a href="/" className="rounded-full border border-input px-5 py-2.5 text-sm font-semibold">
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AfriLink — Les Bons Plans du Bled" },
      { name: "description", content: "Le réseau de confiance pour réussir votre arrivée en Afrique. Trouvez les bonnes personnes avant les bonnes adresses." },
      { property: "og:title", content: "AfriLink — Les Bons Plans du Bled" },
      { property: "og:description", content: "Le réseau de confiance pour réussir votre arrivée en Afrique. Trouvez les bonnes personnes avant les bonnes adresses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AfriLink — Les Bons Plans du Bled" },
      { name: "twitter:description", content: "Le réseau de confiance pour réussir votre arrivée en Afrique. Trouvez les bonnes personnes avant les bonnes adresses." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c8a3e043-f152-48c4-b721-62fd4ee79aad/id-preview-f82c46c2--5585286a-b916-48aa-8740-35edc7d0eafb.lovable.app-1783221184700.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c8a3e043-f152-48c4-b721-62fd4ee79aad/id-preview-f82c46c2--5585286a-b916-48aa-8740-35edc7d0eafb.lovable.app-1783221184700.png" },
      { name: "theme-color", content: "#0F2B1E" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { rel: "icon", href: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Poppins:wght@500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark");}catch(e){}})();`;

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
