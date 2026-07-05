import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "./demo";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "AfriLink — Votre réseau" },
      { name: "description", content: "Fil d'actualité, recommandations et messagerie AfriLink." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AppShell,
});
