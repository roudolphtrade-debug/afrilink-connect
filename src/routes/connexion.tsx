import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/connexion")({
  head: () => ({
    meta: [
      { title: "Connexion à la démo — AfriLink" },
      { name: "description", content: "Ouvrez une session locale de démonstration AfriLink, sans demande de visite ni message transmis." },
      { property: "og:title", content: "Connexion à la démo — AfriLink" },
      { property: "og:description", content: "Ouvrez une session locale de démonstration AfriLink, sans demande de visite ni message transmis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <AuthForm mode="login" />,
});
