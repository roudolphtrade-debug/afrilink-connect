export type FaqItem = { q: string; a: string };
export type FaqCategory = { id: string; label: string; items: FaqItem[] };

export const FAQ: FaqCategory[] = [
  {
    id: "compte",
    label: "Compte & profil",
    items: [
      {
        q: "Comment créer un compte AfriLink ?",
        a: "Depuis « S'inscrire », renseignez votre nom, votre email et un mot de passe. Dans cette version de démonstration, la session est conservée localement sur votre appareil : aucune donnée n'est envoyée à un serveur.",
      },
      {
        q: "Comment modifier mon profil ?",
        a: "Onglet Profil → « Modifier le profil ». Vous pouvez changer votre nom affiché, votre ville et votre présentation. Les modifications sont enregistrées sur votre appareil tant que le backend n'est pas branché.",
      },
      {
        q: "J'ai oublié mon mot de passe, que faire ?",
        a: "Sur l'écran de connexion, utilisez « Mot de passe oublié ». En démonstration, aucun email n'est réellement envoyé : l'écran vous confirme la procédure et vous pouvez vous reconnecter avec n'importe quel mot de passe.",
      },
      {
        q: "Comment supprimer mon compte ?",
        a: "Paramètres → Sécurité → « Supprimer mon compte ». La suppression efface immédiatement vos favoris, filtres et session enregistrés sur cet appareil. L'action est irréversible.",
      },
    ],
  },
  {
    id: "confiance",
    label: "Statuts & confiance",
    items: [
      {
        q: "Que signifie « Référencé » ?",
        a: "La fiche existe dans l'annuaire AfriLink mais n'a pas encore reçu de recommandation de la communauté. C'est un point de départ, pas une garantie.",
      },
      {
        q: "Que signifie « Recommandé » ?",
        a: "Plusieurs membres ont travaillé avec ce contact et l'ont recommandé publiquement. La recommandation vient de la communauté, pas de l'équipe.",
      },
      {
        q: "Que signifie « Vérifié AfriLink » ?",
        a: "L'équipe a contrôlé manuellement l'identité, l'activité réelle et au moins deux références du professionnel. C'est notre niveau de confiance le plus élevé pour un prestataire.",
      },
      {
        q: "Qu'est-ce que le badge « Équipe AfriLink » ?",
        a: "Il identifie les membres fondateurs de la plateforme : Odile Ebongue et Roudolph Doualla. Ils ne sont pas des prestataires mais les responsables de la communauté.",
      },
    ],
  },
  {
    id: "usage",
    label: "Rechercher & publier",
    items: [
      {
        q: "Comment trouver un professionnel ?",
        a: "Onglet Explorer : tapez un métier, un besoin ou une ville, puis affinez par univers, statut, pays, ville et tri (pertinence, distance, prix, nouveauté). Le compteur indique le nombre de résultats pour chaque filtre.",
      },
      {
        q: "Comment publier une demande ou un bon plan ?",
        a: "Onglet Accueil : choisissez « Demande » ou « Bon plan » dans le composeur, sélectionnez un univers, écrivez votre message et publiez. Votre publication apparaît immédiatement en haut du fil.",
      },
      {
        q: "Comment signaler un problème ou un contact douteux ?",
        a: "Utilisez « Signaler un problème » depuis l'Aide. Décrivez la situation : l'équipe traite les signalements sous 48 h et peut retirer un statut ou une fiche.",
      },
      {
        q: "Quelles villes sont couvertes ?",
        a: "Douala, Yaoundé, Dakar et Abidjan sont ouvertes. Libreville, Cotonou, Lomé et Brazzaville sont en cours d'ouverture. D'autres villes apparaissent dans l'annuaire mais avec une couverture partielle.",
      },
    ],
  },
  {
    id: "bibliotheque",
    label: "Bibliothèque",
    items: [
      {
        q: "Comment accéder à la bibliothèque ?",
        a: "Les fiches et l'aperçu de chaque ouvrage sont visibles par tous. La lecture complète, le sommaire et l'enregistrement en favoris sont réservés aux membres connectés.",
      },
      {
        q: "D'où viennent les ouvrages proposés ?",
        a: "Uniquement d'œuvres du domaine public (Project Gutenberg, Wikisource, Gallica/BnF). Chaque fiche indique l'auteur, l'année, la licence et un lien vers la source officielle.",
      },
    ],
  },
  {
    id: "securite",
    label: "Sécurité & confidentialité",
    items: [
      {
        q: "Mes données sont-elles protégées ?",
        a: "Cette version de démonstration ne stocke rien sur un serveur : session, favoris, filtres et préférences restent dans le stockage local de votre navigateur et peuvent être effacés à tout moment depuis les Paramètres.",
      },
      {
        q: "Qui voit mon profil et mes publications ?",
        a: "Par défaut, votre profil est visible par les membres connectés. Paramètres → Confidentialité permet de le passer en visibilité restreinte et de masquer votre ville.",
      },
      {
        q: "Comment sécuriser mon compte ?",
        a: "Paramètres → Sécurité : changement de mot de passe et double authentification (à venir sur la version production). Ne partagez jamais vos identifiants dans la messagerie.",
      },
    ],
  },
];

export const COMMUNITY_RULES = [
  "Recommander uniquement des personnes avec qui on a réellement traité.",
  "Indiquer un prix ou un ordre de grandeur quand on partage un bon plan.",
  "Pas de démarchage commercial déguisé ni de publication en série.",
  "Respect strict de la vie privée : aucun numéro ni adresse d'un tiers sans accord.",
  "Signaler plutôt que régler un litige publiquement dans le fil.",
];

export const PRIVACY_POINTS = [
  "Aucune donnée n'est vendue ni transmise à des tiers.",
  "Les informations de session sont stockées localement sur votre appareil.",
  "Vous pouvez exporter ou supprimer vos données depuis les Paramètres.",
  "Les échanges en messagerie ne sont pas utilisés à des fins publicitaires.",
];
