import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/connexion")({
  head: () => ({
    meta: [
      { title: "Connexion — AfriLink" },
      { name: "description", content: "Connectez-vous à AfriLink pour retrouver votre réseau, vos échanges et la bibliothèque de la communauté." },
      { property: "og:title", content: "Connexion — AfriLink" },
      { property: "og:description", content: "Accédez à votre réseau de confiance AfriLink." },
    ],
  }),
  component: () => <AuthForm mode="login" />,
});
