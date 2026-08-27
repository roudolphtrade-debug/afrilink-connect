import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Check, FileText, ShieldAlert } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Guide d'arrivée — AfriLink" },
      {
        name: "description",
        content: "Démarches essentielles, bonnes pratiques et contacts indispensables pour réussir votre arrivée au Cameroun, en Côte d'Ivoire et au Sénégal.",
      },
    ],
  }),
  component: GuidePage,
});

type CountryGuide = {
  country: string;
  demarches: string[];
  pratiques: string[];
  contact: string;
};

const guides: CountryGuide[] = [
  {
    country: "Cameroun",
    demarches: [
      "Enregistrez-vous auprès de votre ambassade dès votre arrivée.",
      "Renseignez-vous sur le titre de séjour adapté à la durée de votre présence.",
      "Prévoyez l'ouverture d'un compte bancaire local dès que possible.",
    ],
    pratiques: [
      "Souscrivez une assurance santé internationale valable localement.",
      "Gardez une copie numérique de tous vos documents importants.",
      "Renseignez-vous sur les quartiers et horaires à privilégier selon la ville.",
    ],
    contact: "Ambassade de France à Yaoundé",
  },
  {
    country: "Côte d'Ivoire",
    demarches: [
      "Enregistrement consulaire auprès de votre ambassade.",
      "Vérifiez le type de visa ou carte de séjour requis selon la durée du séjour.",
      "Prévoyez les démarches douanières si vous importez un véhicule.",
    ],
    pratiques: [
      "Vérifiez les exigences sanitaires actuelles avant le départ (certaines vaccinations peuvent être exigées à l'entrée).",
      "Souscrivez une assurance santé internationale.",
      "Gardez une copie numérique de vos documents importants.",
    ],
    contact: "Ambassade de France à Abidjan",
  },
  {
    country: "Sénégal",
    demarches: [
      "Enregistrement consulaire auprès de votre ambassade dès l'arrivée.",
      "Renseignez-vous sur la carte de séjour adaptée à votre situation.",
      "Prévoyez l'ouverture d'un compte bancaire local.",
    ],
    pratiques: [
      "Souscrivez une assurance santé internationale.",
      "Restez vigilant dans les zones très fréquentées (marchés, plages touristiques).",
      "Gardez une copie numérique de vos documents importants.",
    ],
    contact: "Ambassade de France à Dakar",
  },
];

function GuidePage() {
  return (
    <div>
      <SiteHeader />

      {/* INTRO */}
      <section className="section-cream">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center md:px-8 md:py-28">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Guide d'arrivée
            </span>
            <h1 className="mt-4 text-3xl font-bold md:text-5xl">
              Les bons réflexes avant et pendant votre arrivée
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Un point de départ pour le Cameroun, la Côte d'Ivoire et le Sénégal — démarches,
              bonnes pratiques et le contact à connaître en priorité. D'autres pays suivront.
            </p>
          </Reveal>
          <Reveal
            delay={100}
            className="mx-auto mt-8 flex max-w-xl items-start gap-3 rounded-2xl border border-accent/30 bg-white p-4 text-left text-sm text-muted-foreground"
          >
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <p>
              Ces informations sont générales et peuvent évoluer. Vérifiez toujours les exigences
              à jour (visas, santé, sécurité) auprès de votre ambassade ou d'une source officielle
              avant de voyager.
            </p>
          </Reveal>
        </div>
      </section>

      {/* GUIDES PAYS */}
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
          <div className="grid gap-6 lg:grid-cols-3">
            {guides.map((g, i) => (
              <Reveal key={g.country} delay={i * 100}>
                <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-soft">
                  <h2 className="font-display text-2xl font-bold">{g.country}</h2>

                  <div className="mt-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                      <FileText className="h-4 w-4" /> Démarches essentielles
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {g.demarches.map((d) => (
                        <li key={d} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                      <ShieldAlert className="h-4 w-4" /> Bonnes pratiques
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {g.pratiques.map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="rounded-2xl bg-muted/50 p-4 text-sm">
                      <p className="font-semibold text-forest">Contact indispensable</p>
                      <p className="mt-1 text-muted-foreground">{g.contact}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section-cream">
        <div className="mx-auto max-w-2xl px-4 py-20 text-center md:px-8 md:py-28">
          <Reveal>
            <h2 className="text-2xl font-bold md:text-4xl">
              Une info à corriger ou un pays à ajouter ?
            </h2>
<p className="mt-4 text-muted-foreground">
              Ce guide s'enrichira avec la communauté. Revenez bientôt pour contribuer.
            </p>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
