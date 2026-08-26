import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/inscription")({
  head: () => ({
    meta: [
      { title: "Inscription — AfriLink" },
      { name: "description", content: "Créez votre compte AfriLink et rejoignez une communauté de confiance à Douala, Yaoundé, Dakar et Abidjan." },
      { property: "og:title", content: "Inscription — AfriLink" },
      { property: "og:description", content: "Rejoignez la communauté AfriLink en quelques secondes." },
    ],
  }),
  component: () => <AuthForm mode="signup" />,
});
