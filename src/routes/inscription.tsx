import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/inscription")({
  head: () => ({
    meta: [
      { title: "Inscription à la démo — AfriLink" },
      { name: "description", content: "Essayez AfriLink avec une session locale. Le service logement à Douala est en préparation." },
      { property: "og:title", content: "Inscription à la démo — AfriLink" },
      { property: "og:description", content: "Essayez AfriLink avec une session locale. Le service logement à Douala est en préparation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <AuthForm mode="signup" />,
});
