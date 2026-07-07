import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Avatar } from "@/components/Avatar";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/equipe")({
  head: () => ({
    meta: [
      { title: "Notre équipe — AfriLink" },
      {
        name: "description",
        content: "L'équipe fondatrice derrière AfriLink, née de l'aventure Les Bons Plans du Bled, fondée en 2022.",
      },
    ],
  }),
  component: TeamPage,
});

const team = [
  { name: "Odile-Grâce Ebongue", role: "Fondatrice", initials: "OE", color: "var(--forest)" },
  { name: "Roudolph Doualla", role: "Co-fondateur", initials: "RD", color: "var(--accent)" },
  { name: "Charles Etame Yescot", role: "Co-fondateur", initials: "CE", color: "var(--forest-light)" },
];

function TeamPage() {
  return (
    <div>
      <SiteHeader />

      {/* INTRO */}
      <section className="section-cream">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center md:px-8 md:py-28">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Qui sommes-nous
            </span>
            <h1 className="mt-4 text-3xl font-bold md:text-5xl">
              L'Afrique a tout pour plaire. Une seule chose manque : la visibilité.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              AfriLink prolonge l'aventure Les Bons Plans du Bled, fondée en 2022 pour donner de la
              visibilité aux professionnels comme aux particuliers du continent.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ÉQUIPE */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              L'équipe
            </span>
            <h2 className="mt-4 text-2xl font-bold md:text-4xl">L'équipe fondatrice</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 80}>
                <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-medium">
                  <div className="flex justify-center">
                    <Avatar initials={m.initials} color={m.color} size={72} />
                  </div>
                  <p className="mt-5 font-display text-lg font-semibold">{m.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
