import { PLANNED_FOLLOW_UP } from "./planned-follow-up";

export type FaqItem = { q: string; a: string };
export type FaqCategory = { id: string; label: string; items: FaqItem[] };

export const FAQ: FaqCategory[] = [
  {
    id: "logement", label: "Parcours logement prévu", items: [
      { q: "Une annonce référencée est-elle contrôlée ?", a: "Pas nécessairement. Référencé signifie que l'information est intégrée sans validation globale. Recommandé renvoie à une expérience membre, avec contexte et date. Contrôlé par AfriLink renverra à des vérifications précises par un membre habilité, avec objet, date et méthode. Ce protocole est prévu au lancement : il ne requalifie pas les fiches historiques." },
      { q: "Une demande confirme-t-elle une visite ?", a: "Non. Dans le parcours en préparation, une demande envoyée ne confirmera pas une visite. Seule l'acceptation de l'annonceur permettra de la présenter comme confirmée. Aucune visite n'est actuellement réservable sur ce site." },
      { q: "Que se passera-t-il sans réponse de l'annonceur ?", a: `La règle prévue est un rappel à ${PLANNED_FOLLOW_UP.reminderAfterHours} h si la demande est encore ouverte, puis une clôture à ${PLANNED_FOLLOW_UP.closeAfterHours} h${PLANNED_FOLLOW_UP.closeAtSlotStartIfEarlier ? " ou au début du créneau si celui-ci arrive plus tôt" : ""}. Ce suivi fait partie du parcours en préparation : aucune automatisation de rappel ou de clôture n'est actuellement implémentée.` },
      { q: "Les frais peuvent-ils changer ?", a: "Oui. Dans le parcours prévu, la source et la date des frais annoncés seront précisées. Toute différence devra être clarifiée avant un engagement. Une modification significative imposera une nouvelle vérification des frais avant de les présenter comme contrôlés." },
      { q: "AfriLink est-il réservé aux expatriés ?", a: "Non. Le premier service en préparation s'adresse aux personnes qui s'installent ou déménagent à Douala, qu'elles viennent d'une autre région du Cameroun ou de l'étranger." },
    ],
  },
  {
    id: "confiance", label: "Contrôles & limites", items: [
      { q: "Que signifie « Contrôlé par AfriLink » ?", a: "Ce libellé désignera des contrôles précis et documentés, pas une certification globale. Contact, autorisation de diffusion, visite physique ou contrôle vidéo, frais et disponibilité devront rester distincts. Une information déclarée ne deviendra pas contrôlée par simple référencement." },
      { q: "« Équipe AfriLink » est-il un niveau de confiance ?", a: "Non. C'est un rôle dans le projet, pas un niveau de confiance d'une annonce. Odile Ebongue et Roudolph Doualla sont les fondateurs d'AfriLink." },
      { q: "Un contrôle prouve-t-il la propriété du logement ?", a: "Non. Un contact joignable ne prouve pas la propriété. Une visite n'est ni une expertise technique ni une validation juridique. Le protocole prévu conservera les inconnues visibles et les preuves justificatives privées. Un badge favorable ne s'achète pas." },
    ],
  },
  {
    id: "demo", label: "Démonstration actuelle", items: [
      { q: "Que puis-je faire dans la démonstration ?", a: "Explorer les écrans, essayer une publication, des favoris ou des messages locaux. Les demandes, les réponses et les messages sont simulés et conservés sur cet appareil : rien n'est envoyé à l'équipe ni à un annonceur. Les contenus de la démo ne constituent ni des offres actuelles validées ni des visites réservables." },
      { q: "Comment fonctionne la connexion dans la démo ?", a: "Les écrans de connexion et d'inscription créent une session locale de démonstration, pas un compte opérationnel pour le futur service logement. N'utilisez pas un mot de passe personnel ou des informations sensibles pour cet essai." },
      { q: "Comment modifier mon profil de démonstration ?", a: "L'onglet Profil permet de modifier le nom, la ville, la présentation et la photo. Ces modifications restent locales à cet appareil et ne sont pas transmises à l'équipe." },
      { q: "Comment accéder à la bibliothèque de la démo ?", a: "Les aperçus des ouvrages sont visibles sans session. La lecture complète et les favoris nécessitent une connexion locale de démonstration. Les sources indiquées sur chaque fiche restent à consulter pour les informations sur l'ouvrage." },
    ],
  },
];
export const COMMUNITY_RULES = [
  "Recommander uniquement à partir d'une expérience personnelle, en précisant le contexte et la date.",
  "Distinguer les informations annoncées des éléments réellement contrôlés.",
  "Respecter la vie privée : ne pas diffuser les coordonnées d'un tiers sans accord.",
  "Clarifier les écarts de frais avant tout engagement.",
];
export const PRIVACY_POINTS = [
  "Dans /app, session, favoris, publications et messages de démonstration restent sur cet appareil.",
  "Aucune demande de visite ni aucun message de la démo n'est transmis à l'équipe ou à un annonceur.",
  "N'entrez pas de données sensibles dans la démonstration.",
  "Les justificatifs de contrôle du futur service seront privés.",
];
