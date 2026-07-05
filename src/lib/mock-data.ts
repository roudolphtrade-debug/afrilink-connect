export const CATEGORIES = [
  { slug: "maison", label: "Maison & Artisanat", icon: "Hammer" },
  { slug: "sante", label: "Santé & Bien-être", icon: "HeartPulse" },
  { slug: "education", label: "Éducation", icon: "GraduationCap" },
  { slug: "transport", label: "Transport & Logistique", icon: "Truck" },
  { slug: "admin", label: "Services administratifs", icon: "FileText" },
  { slug: "loisirs", label: "Loisirs & Lifestyle", icon: "Sparkles" },
  { slug: "immobilier", label: "Immobilier", icon: "Home" },
  { slug: "emploi", label: "Emploi & Business", icon: "Briefcase" },
] as const;

// Villes camerounaises en priorité, puis quelques autres capitales africaines
export const CITIES = [
  "Douala",
  "Yaoundé",
  "Bafoussam",
  "Kribi",
  "Limbé",
  "Buea",
  "Garoua",
  "Bamenda",
  "Ngaoundéré",
  "Dschang",
  "Abidjan",
  "Dakar",
  "Libreville",
  "Kinshasa",
  "Lagos",
];

export type Pro = {
  id: string;
  name: string;
  category: string;
  city: string;
  neighborhood?: string;
  rating: number;
  reviews: number;
  verified: boolean;
  bio: string;
  price?: string;
  color: string;
  initials: string;
};

const colors = ["#0F2B1E", "#D4A64A", "#2F6B4F", "#B8863A", "#3E7A5C", "#9C6E2B"];

const seed: Omit<Pro, "id" | "color" | "initials">[] = [
  // ==== Cameroun (priorité) ====
  { name: "Marie Tchoumi", category: "maison", city: "Douala", neighborhood: "Bonapriso", rating: 4.9, reviews: 87, verified: true, bio: "Menuisière-ébéniste, mobilier sur-mesure en bois locaux (iroko, sapelli). Livraison Douala & Yaoundé.", price: "à partir de 45 000 FCFA" },
  { name: "Achille Mbarga", category: "transport", city: "Yaoundé", neighborhood: "Bastos", rating: 4.8, reviews: 112, verified: true, bio: "Chauffeur privé bilingue, accueil aéroport NSI et courses longues. Véhicule climatisé récent.", price: "15 000 FCFA / course aéroport" },
  { name: "Dr. Estelle Ngo Bakang", category: "sante", city: "Douala", neighborhood: "Bonanjo", rating: 4.9, reviews: 68, verified: true, bio: "Pédiatre, consultations à domicile pour familles expatriées et diaspora en visite.", price: "25 000 FCFA / consultation" },
  { name: "Franck Kamdem", category: "immobilier", city: "Douala", neighborhood: "Bonapriso", rating: 4.8, reviews: 134, verified: true, bio: "Agent immobilier spécialisé locations meublées et longue durée pour cadres et diaspora.", price: "commission 1 mois" },
  { name: "Nadège Mbida", category: "admin", city: "Yaoundé", neighborhood: "Centre-ville", rating: 4.9, reviews: 54, verified: true, bio: "Aide aux démarches : visas, permis de conduire, création d'entreprise, ouverture de compte bancaire.", price: "à partir de 20 000 FCFA" },
  { name: "Ariane Foning", category: "education", city: "Bafoussam", rating: 4.7, reviews: 38, verified: true, bio: "Professeure particulière (français, maths, physique) — primaire, collège, lycée. Cours à domicile ou en visio." },
  { name: "Éric Talla", category: "maison", city: "Yaoundé", neighborhood: "Mvan", rating: 4.6, reviews: 42, verified: true, bio: "Plombier & électricien, interventions rapides 7j/7 sur Yaoundé.", price: "5 000 FCFA / déplacement" },
  { name: "Christelle Ekwalla", category: "loisirs", city: "Kribi", rating: 4.9, reviews: 63, verified: true, bio: "Organisatrice de séjours & excursions : chutes de la Lobé, plages de Kribi, pêche traditionnelle." },
  { name: "Serge Fotso", category: "emploi", city: "Douala", neighborhood: "Akwa", rating: 4.7, reviews: 45, verified: true, bio: "Consultant RH, recrutement et coaching carrière pour PME, startups et retour de diaspora." },
  { name: "Sandrine Etoundi", category: "sante", city: "Yaoundé", neighborhood: "Bastos", rating: 4.8, reviews: 51, verified: true, bio: "Kinésithérapeute & coach bien-être, séances à domicile ou en cabinet." },
  { name: "Patrick Njoya", category: "transport", city: "Douala", neighborhood: "Bonabéri", rating: 4.5, reviews: 29, verified: false, bio: "Déménagements et transport de mobilier, équipe de 3 manutentionnaires." },
  { name: "Léa Manga", category: "immobilier", city: "Kribi", rating: 4.9, reviews: 47, verified: true, bio: "Locations saisonnières et résidences pieds dans l'eau à Kribi. Idéal télétravail." },
  { name: "Hervé Tchakoua", category: "education", city: "Buea", rating: 4.6, reviews: 24, verified: true, bio: "Cours d'anglais et préparation TOEFL / IELTS, formateur natif zone anglophone." },
  { name: "Aline Bikoro", category: "admin", city: "Douala", neighborhood: "Bonanjo", rating: 4.8, reviews: 39, verified: true, bio: "Avocate, droit des affaires, immigration et contrats de travail expatriés." },
  { name: "Junior Mbappe", category: "loisirs", city: "Douala", neighborhood: "Bonapriso", rating: 4.7, reviews: 33, verified: true, bio: "Coach sportif personnel, séances en résidence ou en salle. Programmes remise en forme." },
  { name: "Grace Ndongo", category: "emploi", city: "Yaoundé", neighborhood: "Nlongkak", rating: 4.9, reviews: 41, verified: true, bio: "Coach entrepreneuriat et accompagnement retour au pays pour la diaspora." },
  { name: "Ibrahim Bello", category: "transport", city: "Garoua", rating: 4.4, reviews: 18, verified: false, bio: "Transport interurbain Nord Cameroun, véhicules 4x4, connaissance des pistes." },
  { name: "Clarisse Ateba", category: "maison", city: "Yaoundé", neighborhood: "Mvog-Mbi", rating: 4.7, reviews: 36, verified: true, bio: "Décoratrice d'intérieur, mise en valeur d'artisanat local et matières naturelles." },

  // ==== Autres pays (secondaire) ====
  { name: "Aïcha Diallo", category: "maison", city: "Dakar", rating: 4.9, reviews: 82, verified: true, bio: "Décoratrice d'intérieur spécialisée en artisanat local, 10 ans d'expérience auprès d'expatriés." },
  { name: "Jean-Marc Ouattara", category: "transport", city: "Abidjan", rating: 4.6, reviews: 67, verified: true, bio: "Chauffeur privé et déménagements, ponctuel, véhicule climatisé." },
  { name: "Amina Kouassi", category: "immobilier", city: "Abidjan", rating: 4.8, reviews: 94, verified: true, bio: "Agent immobilier, locations meublées expatriés à Cocody." },
  { name: "David Okonkwo", category: "emploi", city: "Lagos", rating: 4.7, reviews: 46, verified: true, bio: "Consultant RH, recrutement pour startups et PME internationales." },
];

export const PROS: Pro[] = seed.map((p, i) => ({
  ...p,
  id: `pro-${i + 1}`,
  color: colors[i % colors.length],
  initials: p.name.replace(/^Dr\.?\s*/, "").split(" ").map((n) => n[0]).slice(0, 2).join(""),
}));

/* ---------- Utilisateur simulé (session "connectée") ---------- */

export const CURRENT_USER = {
  name: "Sandra M.",
  initials: "SM",
  color: "#2F6B4F",
  city: "Douala",
  role: "Nouvellement arrivée",
};

/* ---------- Fil d'actualité (bons plans, demandes, alertes) ---------- */

export type FeedPost = {
  id: string;
  kind: "demande" | "bon-plan" | "annonce" | "verif";
  author: { name: string; initials: string; color: string; city: string; verified?: boolean };
  time: string;
  category?: string;
  title: string;
  body: string;
  replies: number;
  likes: number;
};

export const FEED: FeedPost[] = [
  {
    id: "f1",
    kind: "demande",
    author: { name: "Sophie L.", initials: "SL", color: "#D4A64A", city: "Douala" },
    time: "il y a 12 min",
    category: "maison",
    title: "Cherche un bon plombier à Bonapriso ce week-end 🙏",
    body: "Fuite sous l'évier, ça devient urgent. Quelqu'un a une recommandation fiable ?",
    replies: 7,
    likes: 4,
  },
  {
    id: "f2",
    kind: "bon-plan",
    author: { name: "Marc D.", initials: "MD", color: "#0F2B1E", city: "Yaoundé", verified: true },
    time: "il y a 1 h",
    category: "loisirs",
    title: "Super brunch découvert à Bastos ce dimanche",
    body: "Le nouveau spot en face de la station Total, cuisine locale revisitée. Environ 8 000 FCFA / personne, service au top.",
    replies: 12,
    likes: 23,
  },
  {
    id: "f3",
    kind: "demande",
    author: { name: "Awa T.", initials: "AT", color: "#3E7A5C", city: "Douala" },
    time: "il y a 2 h",
    category: "education",
    title: "Prof de maths pour 4e — 2 fois par semaine",
    body: "Mon fils est au Lycée Français, il a besoin d'un soutien régulier à domicile. Quartier Bonapriso.",
    replies: 5,
    likes: 2,
  },
  {
    id: "f4",
    kind: "annonce",
    author: { name: "Franck Kamdem", initials: "FK", color: "#B8863A", city: "Douala", verified: true },
    time: "il y a 4 h",
    category: "immobilier",
    title: "3 pièces meublé disponible à Bonapriso — septembre",
    body: "Résidence sécurisée, groupe électrogène, fibre. 650 000 FCFA / mois charges comprises. Photos en MP.",
    replies: 9,
    likes: 18,
  },
  {
    id: "f5",
    kind: "verif",
    author: { name: "AfriLink", initials: "AL", color: "#0F2B1E", city: "Cameroun", verified: true },
    time: "aujourd'hui",
    title: "3 nouveaux pros vérifiés à Yaoundé cette semaine",
    body: "Nadège (démarches admin), Sandrine (kiné) et Achille (chauffeur privé) rejoignent la communauté vérifiée.",
    replies: 2,
    likes: 31,
  },
  {
    id: "f6",
    kind: "bon-plan",
    author: { name: "Nadia R.", initials: "NR", color: "#9C6E2B", city: "Kribi" },
    time: "hier",
    category: "loisirs",
    title: "Week-end télétravail à Kribi — logement testé approuvé",
    body: "Wifi stable (test à 45 Mbps), pieds dans l'eau, environ 35 000 FCFA / nuit. Contact d'une hôte adorable.",
    replies: 6,
    likes: 15,
  },
];

export const MOCK_REVIEWS: Record<string, { author: string; rating: number; text: string }[]> = {
  default: [
    { author: "Sophie L.", rating: 5, text: "Ultra pro, très à l'écoute. Recommandation top !" },
    { author: "Marc D.", rating: 5, text: "Rapide, sérieux, exactement ce que j'attendais." },
    { author: "Ava S.", rating: 4, text: "Bon contact, service à la hauteur des avis." },
  ],
};

export const MOCK_CONVERSATIONS = [
  {
    id: "c1",
    proId: "pro-4", // Franck Kamdem
    lastMessage: "Parfait, je vous envoie les visites demain matin.",
    unread: 2,
    messages: [
      { from: "me", text: "Bonjour Franck, je cherche un 3 pièces meublé à Bonapriso pour septembre.", time: "09:12" },
      { from: "them", text: "Bonjour Sandra ! Ravi de vous lire. Budget et durée souhaités ?", time: "09:18" },
      { from: "me", text: "Autour de 600 000 FCFA, pour 12 mois minimum.", time: "09:20" },
      { from: "them", text: "Parfait, je vous envoie les visites demain matin.", time: "09:22" },
    ],
  },
  {
    id: "c2",
    proId: "pro-5", // Nadège Mbida
    lastMessage: "Le rendez-vous à la sous-préfecture est confirmé.",
    unread: 0,
    messages: [
      { from: "them", text: "Bonjour Sandra, j'ai déposé votre dossier ce matin.", time: "Hier" },
      { from: "me", text: "Merci Nadège !", time: "Hier" },
      { from: "them", text: "Le rendez-vous à la sous-préfecture est confirmé.", time: "Hier" },
    ],
  },
  {
    id: "c3",
    proId: "pro-3", // Dr. Estelle Ngo Bakang
    lastMessage: "Je passe vers 17h avec la trousse.",
    unread: 1,
    messages: [
      { from: "me", text: "Bonjour docteur, ma fille a de la fièvre depuis ce matin.", time: "10:02" },
      { from: "them", text: "Je passe vers 17h avec la trousse.", time: "10:05" },
    ],
  },
];

/* ---------- Notifications ---------- */

export const NOTIFICATIONS = [
  { id: "n1", text: "Franck Kamdem vous a répondu", time: "12 min", unread: true },
  { id: "n2", text: "Nouveau bon plan dans votre quartier : Bonapriso", time: "1 h", unread: true },
  { id: "n3", text: "Votre profil a été consulté 8 fois cette semaine", time: "3 h", unread: false },
  { id: "n4", text: "Dr. Estelle a validé votre rendez-vous", time: "hier", unread: false },
];
