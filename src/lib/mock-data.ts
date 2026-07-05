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

export const CITIES = ["Douala", "Abidjan", "Dakar", "Nairobi", "Lagos", "Kigali", "Yaoundé", "Accra", "Casablanca", "Cotonou"];

export type Pro = {
  id: string;
  name: string;
  category: string;
  city: string;
  rating: number;
  reviews: number;
  verified: boolean;
  bio: string;
  color: string;
  initials: string;
};

const colors = ["#0F2B1E", "#D4A64A", "#2F6B4F", "#B8863A", "#3E7A5C", "#9C6E2B"];

const seed: Omit<Pro, "id" | "color" | "initials">[] = [
  { name: "Aïcha Diallo", category: "maison", city: "Dakar", rating: 4.9, reviews: 82, verified: true, bio: "Décoratrice d'intérieur spécialisée en artisanat local. 10 ans d'expérience auprès d'expatriés." },
  { name: "Kwame Mensah", category: "sante", city: "Accra", rating: 4.7, reviews: 54, verified: true, bio: "Médecin généraliste, consultations à domicile pour familles expatriées." },
  { name: "Fatou Ndiaye", category: "education", city: "Dakar", rating: 4.8, reviews: 41, verified: true, bio: "Professeure particulière (français, maths), primaire et collège." },
  { name: "Jean-Marc Ouattara", category: "transport", city: "Abidjan", rating: 4.6, reviews: 67, verified: true, bio: "Chauffeur privé et déménagements. Ponctuel, véhicule climatisé." },
  { name: "Nadia Bensalah", category: "admin", city: "Casablanca", rating: 4.9, reviews: 38, verified: true, bio: "Aide aux démarches administratives : visas, permis, création d'entreprise." },
  { name: "Samuel Njoku", category: "loisirs", city: "Lagos", rating: 4.5, reviews: 29, verified: false, bio: "Coach sportif et guide de sorties culturelles à Lagos." },
  { name: "Amina Kouassi", category: "immobilier", city: "Abidjan", rating: 4.8, reviews: 94, verified: true, bio: "Agent immobilier, spécialiste locations meublées expatriés à Cocody." },
  { name: "David Okonkwo", category: "emploi", city: "Lagos", rating: 4.7, reviews: 46, verified: true, bio: "Consultant RH, recrutement pour startups et PME internationales." },
  { name: "Marie Tchoumi", category: "maison", city: "Douala", rating: 4.6, reviews: 33, verified: true, bio: "Menuisière-ébéniste, mobilier sur-mesure en bois locaux." },
  { name: "Léa Mbeki", category: "sante", city: "Nairobi", rating: 4.9, reviews: 71, verified: true, bio: "Sage-femme et doula, accompagnement pré et post-natal." },
  { name: "Ibrahim Traoré", category: "education", city: "Yaoundé", rating: 4.4, reviews: 22, verified: false, bio: "Cours d'anglais pour adultes, niveaux débutant à avancé." },
  { name: "Sophie Rakoto", category: "transport", city: "Cotonou", rating: 4.7, reviews: 51, verified: true, bio: "Agence de logistique, import/export petits volumes." },
  { name: "Paul Adjovi", category: "admin", city: "Cotonou", rating: 4.5, reviews: 27, verified: true, bio: "Avocat, droit des affaires et immigration." },
  { name: "Clara Bello", category: "loisirs", city: "Kigali", rating: 4.8, reviews: 45, verified: true, bio: "Organisatrice d'événements et voyages découverte au Rwanda." },
  { name: "Youssef El Mansouri", category: "immobilier", city: "Casablanca", rating: 4.6, reviews: 58, verified: true, bio: "Courtier immobilier, biens résidentiels et investissement locatif." },
  { name: "Grace Mutombo", category: "emploi", city: "Kigali", rating: 4.9, reviews: 39, verified: true, bio: "Coach carrière et création de business pour la diaspora." },
  { name: "Hassan Diop", category: "maison", city: "Dakar", rating: 4.3, reviews: 18, verified: false, bio: "Plombier et petits travaux, interventions rapides." },
  { name: "Elodie Zongo", category: "sante", city: "Abidjan", rating: 4.8, reviews: 62, verified: true, bio: "Nutritionniste, accompagnement personnalisé et cuisine africaine équilibrée." },
];

export const PROS: Pro[] = seed.map((p, i) => ({
  ...p,
  id: `pro-${i + 1}`,
  color: colors[i % colors.length],
  initials: p.name.split(" ").map((n) => n[0]).slice(0, 2).join(""),
}));

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
    proId: "pro-7",
    lastMessage: "Parfait, je vous envoie les visites demain.",
    unread: 2,
    messages: [
      { from: "me", text: "Bonjour Amina, je cherche un 3 pièces meublé à Cocody pour septembre.", time: "09:12" },
      { from: "them", text: "Bonjour ! Ravie de vous lire. Budget et durée souhaités ?", time: "09:18" },
      { from: "me", text: "Autour de 800€, pour 12 mois minimum.", time: "09:20" },
      { from: "them", text: "Parfait, je vous envoie les visites demain.", time: "09:22" },
    ],
  },
  {
    id: "c2",
    proId: "pro-5",
    lastMessage: "Le rendez-vous à la préfecture est confirmé.",
    unread: 0,
    messages: [
      { from: "them", text: "Bonjour, j'ai déposé votre dossier ce matin.", time: "Hier" },
      { from: "me", text: "Merci Nadia !", time: "Hier" },
      { from: "them", text: "Le rendez-vous à la préfecture est confirmé.", time: "Hier" },
    ],
  },
  {
    id: "c3",
    proId: "pro-2",
    lastMessage: "Je passe vers 17h avec la trousse.",
    unread: 1,
    messages: [
      { from: "me", text: "Bonjour, ma fille a de la fièvre depuis ce matin.", time: "10:02" },
      { from: "them", text: "Je passe vers 17h avec la trousse.", time: "10:05" },
    ],
  },
];
