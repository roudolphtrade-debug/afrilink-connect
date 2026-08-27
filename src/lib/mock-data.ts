export const CATEGORIES = [
  { slug: "maison", label: "Maison", icon: "Hammer" },
  { slug: "sante", label: "Santé", icon: "HeartPulse" },
  { slug: "education", label: "Éducation", icon: "GraduationCap" },
  { slug: "transport", label: "Transport", icon: "Truck" },
  { slug: "admin", label: "Services administratifs & juridiques", icon: "FileText" },
  { slug: "loisirs", label: "Loisirs", icon: "Sparkles" },
  { slug: "immobilier", label: "Immobilier", icon: "Home" },
  { slug: "emploi", label: "Emploi & Business", icon: "Briefcase" },
  { slug: "finance", label: "Finance & Assurance", icon: "Wallet" },
] as const;

/** Sous-catégories par univers (utilisées en filtre secondaire). */
export const SUBCATEGORIES: Record<string, string[]> = {
  maison: ["Menuiserie", "Plomberie", "Électricité", "Peinture & finitions", "Ménage & personnel de maison", "Décoration"],
  sante: ["Médecine générale", "Pédiatrie", "Dentaire", "Kinésithérapie", "Pharmacie", "Bien-être & beauté"],
  education: ["Cours à domicile", "Langues", "Écoles & crèches", "Formation professionnelle", "Préparation aux examens"],
  transport: ["Chauffeur privé", "Transfert aéroport", "Déménagement", "Fret & logistique", "Mécanique auto"],
  admin: ["Visa & immigration", "État civil", "Création d'entreprise", "Avocat & conseil juridique", "Ambassades & consulats"],
  loisirs: ["Restaurants & maquis", "Excursions", "Événementiel", "Sport", "Culture & sorties"],
  immobilier: ["Location meublée", "Location longue durée", "Achat & vente", "Séjour saisonnier", "Gestion locative"],
  emploi: ["Recrutement", "Coaching carrière", "Freelance & prestataires", "Accompagnement retour au pays", "Création d'activité"],
  finance: ["Banque & compte", "Transfert d'argent", "Assurance santé", "Assurance auto & habitation", "Microfinance", "Comptabilité"],
};

/** Parcours diaspora — points d'entrée thématiques vers les univers. */
export const JOURNEYS = [
  { slug: "installation", label: "Installation", desc: "Logement, administratif, premiers contacts.", cats: ["immobilier", "admin", "maison"] },
  { slug: "retour", label: "Retour au pays", desc: "Se réinstaller durablement et reconstruire son réseau.", cats: ["immobilier", "emploi", "finance"] },
  { slug: "etudes", label: "Études", desc: "Écoles, cours, logement étudiant.", cats: ["education", "immobilier"] },
  { slug: "famille", label: "Famille", desc: "Santé des enfants, école, personnel de maison.", cats: ["sante", "education", "maison"] },
  { slug: "travail", label: "Travail", desc: "Emploi, contrats, mobilité quotidienne.", cats: ["emploi", "admin", "transport"] },
  { slug: "entrepreneuriat", label: "Entrepreneuriat", desc: "Créer, financer et développer son activité.", cats: ["emploi", "finance", "admin"] },
  { slug: "voyage", label: "Séjour & voyage", desc: "Séjour, transferts, découvertes et bonnes tables.", cats: ["loisirs", "transport", "immobilier"] },
] as const;


// Pays en priorité (Cameroun, Côte d'Ivoire, Sénégal), puis expansion Afrique de l'Ouest / Centrale / du Nord
export const COUNTRIES: { name: string; cities: string[] }[] = [
  { name: "Cameroun", cities: ["Douala", "Yaoundé", "Bafoussam", "Kribi", "Limbé", "Buea", "Garoua", "Bamenda", "Ngaoundéré", "Dschang"] },
  { name: "Côte d'Ivoire", cities: ["Abidjan", "Yamoussoukro", "Bouaké", "San-Pédro"] },
  { name: "Sénégal", cities: ["Dakar", "Saint-Louis", "Thiès", "Mbour"] },
  { name: "Ghana", cities: ["Accra", "Kumasi"] },
  { name: "Nigeria", cities: ["Lagos", "Abuja"] },
  { name: "Togo", cities: ["Lomé"] },
  { name: "Bénin", cities: ["Cotonou", "Porto-Novo"] },
  { name: "Guinée équatoriale", cities: ["Malabo", "Bata"] },
  { name: "Maroc", cities: ["Casablanca", "Rabat", "Marrakech"] },
  { name: "Tunisie", cities: ["Tunis", "Sousse"] },
  { name: "Algérie", cities: ["Alger", "Oran"] },
  { name: "Congo", cities: ["Brazzaville", "Pointe-Noire"] },
  { name: "RDC", cities: ["Kinshasa", "Lubumbashi", "Goma"] },
  { name: "Centrafrique", cities: ["Bangui"] },
  { name: "Cap-Vert", cities: ["Praia", "Mindelo"] },
  { name: "Gabon", cities: ["Libreville", "Port-Gentil"] },
  { name: "Guinée", cities: ["Conakry"] },
  { name: "Mali", cities: ["Bamako"] },
  { name: "Rwanda", cities: ["Kigali"] },
  { name: "Burundi", cities: ["Bujumbura"] },
  { name: "Tchad", cities: ["N'Djamena"] },
  { name: "Burkina Faso", cities: ["Ouagadougou"] },
];

export const CITIES = COUNTRIES.flatMap((c) => c.cities);

const CITY_COUNTRY: Record<string, string> = Object.fromEntries(
  COUNTRIES.flatMap((c) => c.cities.map((city) => [city, c.name])),
);

// Coordonnées approximatives du centre-ville (pas d'adresse précise vérifiée par annonce)
export const CITY_COORDS: Record<string, [number, number]> = {
  "Douala": [4.0483, 9.7043],
  "Yaoundé": [3.8480, 11.5021],
  "Bafoussam": [5.4667, 10.4167],
  "Kribi": [2.9375, 9.9075],
  "Limbé": [4.0225, 9.2107],
  "Buea": [4.1560, 9.2420],
  "Garoua": [9.3017, 13.3921],
  "Bamenda": [5.9631, 10.1591],
  "Ngaoundéré": [7.3167, 13.5833],
  "Dschang": [5.4500, 10.0667],
  "Abidjan": [5.3600, -4.0083],
  "Yamoussoukro": [6.8276, -5.2893],
  "Bouaké": [7.6900, -5.0300],
  "San-Pédro": [4.7485, -6.6363],
  "Dakar": [14.7167, -17.4677],
  "Saint-Louis": [16.0326, -16.4818],
  "Thiès": [14.7910, -16.9359],
  "Mbour": [14.4200, -16.9600],
  "Accra": [5.6037, -0.1870],
  "Kumasi": [6.6885, -1.6244],
  "Lagos": [6.5244, 3.3792],
  "Abuja": [9.0765, 7.3986],
  "Lomé": [6.1725, 1.2314],
  "Cotonou": [6.3703, 2.3912],
  "Porto-Novo": [6.4969, 2.6289],
  "Malabo": [3.7523, 8.7742],
  "Bata": [1.8639, 9.7674],
  "Casablanca": [33.5731, -7.5898],
  "Rabat": [34.0209, -6.8416],
  "Marrakech": [31.6295, -7.9811],
  "Tunis": [36.8065, 10.1815],
  "Sousse": [35.8256, 10.6084],
  "Alger": [36.7538, 3.0588],
  "Oran": [35.6969, -0.6331],
  "Libreville": [0.4162, 9.4673],
  "Kinshasa": [-4.4419, 15.2663],
  "Bamako": [12.6392, -8.0029],
  "Ouagadougou": [12.3714, -1.5197],
  "Brazzaville": [-4.2634, 15.2429],
  "Pointe-Noire": [-4.7761, 11.8636],
  "Lubumbashi": [-11.6609, 27.4794],
  "Goma": [-1.6792, 29.2228],
  "Bangui": [4.3947, 18.5582],
  "Praia": [14.9330, -23.5133],
  "Mindelo": [16.8901, -24.9825],
};

export type ProStatus = "reference" | "recommande" | "verifie" | "equipe";

export const STATUS_META: Record<ProStatus, { label: string; description: string }> = {
  reference: {
    label: "Référencé",
    description: "Fiche ajoutée à l'annuaire AfriLink, en attente de recommandations de la communauté.",
  },
  recommande: {
    label: "Recommandé",
    description: "Plusieurs membres de la communauté ont recommandé ce contact.",
  },
  verifie: {
    label: "Vérifié AfriLink",
    description: "Identité, activité et références contrôlées manuellement par l'équipe AfriLink.",
  },
  equipe: {
    label: "Équipe AfriLink",
    description: "Membre de l'équipe fondatrice d'AfriLink.",
  },
};

export { portrait } from "./portraits";
import { portrait } from "./portraits";
import { LISTINGS } from "@/data/listings";


export type Pro = {
  id: string;
  name: string;
  category: string;
  city: string;
  country: string;
  neighborhood?: string;
  rating: number;
  reviews: number;
  verified: boolean;
  status?: ProStatus;
  role?: string;
  bio: string;
  price?: string;
  color: string;
  initials: string;
  /** "place" = établissement / institution réelle : jamais de portrait inventé. */
  kind: "person" | "place";
  /** Portrait homogène et stable pour les profils communautaires (jamais pour un lieu réel). */
  avatar?: string;
  /** Contact historique issu de Les Bons Plans du Bled (depuis 2022). */
  historic?: boolean;
  /* --- Champs issus de l'import historique LBPD --- */
  /** Type de contenu : fiche pro, bon plan, institution. */
  contentType?: "pro" | "offre" | "institution";
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  sourceUrl?: string;
  /** Médias historiques (archive LBPD hors ligne — repli monogramme). */
  media?: string[];
  importedAt?: string;
};


const colors = ["#0F2B1E", "#D4A64A", "#2F6B4F", "#B8863A", "#3E7A5C", "#9C6E2B"];

const seed: (Omit<Pro, "id" | "color" | "initials" | "country" | "kind" | "avatar"> & {
  historic?: boolean;
})[] = [

  // ==== Équipe AfriLink ====
  { name: "Odile Ebongue", category: "emploi", city: "Douala", rating: 5, reviews: 0, verified: true, status: "equipe", role: "Fondatrice AfriLink", historic: true, bio: "Fondatrice d'AfriLink et de Les Bons Plans du Bled. Installée à Douala, elle accompagne la diaspora et les nouveaux arrivants depuis 2022, en connectant les bonnes personnes avant les bonnes adresses." },
  { name: "Roudolph Doualla", category: "emploi", city: "Douala", rating: 5, reviews: 0, verified: true, status: "equipe", role: "Co-fondateur AfriLink", historic: true, bio: "Co-fondateur d'AfriLink, issu du monde de la tech. Il transforme le réseau de confiance né sur le terrain en une plateforme fiable, simple et accessible à toute la communauté." },


  // ==== Cameroun (priorité) ====
  { name: "Marie Tchoumi", category: "maison", city: "Douala", neighborhood: "Bonapriso", rating: 4.9, reviews: 87, verified: false, bio: "Menuisière-ébéniste, mobilier sur-mesure en bois locaux (iroko, sapelli). Livraison Douala & Yaoundé.", price: "à partir de 45 000 FCFA" },
  { name: "Achille Mbarga", category: "transport", city: "Yaoundé", neighborhood: "Bastos", rating: 4.8, reviews: 112, verified: false, bio: "Chauffeur privé bilingue, accueil aéroport NSI et courses longues. Véhicule climatisé récent.", price: "15 000 FCFA / course aéroport" },
  { name: "Dr. Estelle Ngo Bakang", category: "sante", city: "Douala", neighborhood: "Bonanjo", rating: 4.9, reviews: 68, verified: false, bio: "Pédiatre, consultations à domicile pour familles expatriées et diaspora en visite.", price: "25 000 FCFA / consultation" },
  { name: "Franck Kamdem", category: "immobilier", city: "Douala", neighborhood: "Bonapriso", rating: 4.8, reviews: 134, verified: false, bio: "Agent immobilier spécialisé locations meublées et longue durée pour cadres et diaspora.", price: "commission 1 mois" },
  { name: "Nadège Mbida", category: "admin", city: "Yaoundé", neighborhood: "Centre-ville", rating: 4.9, reviews: 54, verified: false, bio: "Aide aux démarches : visas, permis de conduire, création d'entreprise, ouverture de compte bancaire.", price: "à partir de 20 000 FCFA" },
  { name: "Ariane Foning", category: "education", city: "Bafoussam", rating: 4.7, reviews: 38, verified: false, bio: "Professeure particulière (français, maths, physique) — primaire, collège, lycée. Cours à domicile ou en visio." },
  { name: "Éric Talla", category: "maison", city: "Yaoundé", neighborhood: "Mvan", rating: 4.6, reviews: 42, verified: false, bio: "Plombier & électricien, interventions rapides 7j/7 sur Yaoundé.", price: "5 000 FCFA / déplacement" },
  { name: "Christelle Ekwalla", category: "loisirs", city: "Kribi", rating: 4.9, reviews: 63, verified: false, bio: "Organisatrice de séjours & excursions : chutes de la Lobé, plages de Kribi, pêche traditionnelle." },
  { name: "Serge Fotso", category: "emploi", city: "Douala", neighborhood: "Akwa", rating: 4.7, reviews: 45, verified: false, bio: "Consultant RH, recrutement et coaching carrière pour PME, startups et retour de diaspora." },
  { name: "Sandrine Etoundi", category: "sante", city: "Yaoundé", neighborhood: "Bastos", rating: 4.8, reviews: 51, verified: false, bio: "Kinésithérapeute & coach bien-être, séances à domicile ou en cabinet." },
  { name: "Patrick Njoya", category: "transport", city: "Douala", neighborhood: "Bonabéri", rating: 4.5, reviews: 29, verified: false, bio: "Déménagements et transport de mobilier, équipe de 3 manutentionnaires." },
  { name: "Léa Manga", category: "immobilier", city: "Kribi", rating: 4.9, reviews: 47, verified: false, bio: "Locations saisonnières et résidences pieds dans l'eau à Kribi. Idéal télétravail." },
  { name: "Hervé Tchakoua", category: "education", city: "Buea", rating: 4.6, reviews: 24, verified: false, bio: "Cours d'anglais et préparation TOEFL / IELTS, formateur natif zone anglophone." },
  { name: "Aline Bikoro", category: "admin", city: "Douala", neighborhood: "Bonanjo", rating: 4.8, reviews: 39, verified: false, bio: "Avocate, droit des affaires, immigration et contrats de travail expatriés." },
  { name: "Junior Mbappe", category: "loisirs", city: "Douala", neighborhood: "Bonapriso", rating: 4.7, reviews: 33, verified: false, bio: "Coach sportif personnel, séances en résidence ou en salle. Programmes remise en forme." },
  { name: "Grace Ndongo", category: "emploi", city: "Yaoundé", neighborhood: "Nlongkak", rating: 4.9, reviews: 41, verified: false, bio: "Coach entrepreneuriat et accompagnement retour au pays pour la diaspora." },
  { name: "Ibrahim Bello", category: "transport", city: "Garoua", rating: 4.4, reviews: 18, verified: false, bio: "Transport interurbain Nord Cameroun, véhicules 4x4, connaissance des pistes." },
  { name: "Clarisse Ateba", category: "maison", city: "Yaoundé", neighborhood: "Mvog-Mbi", rating: 4.7, reviews: 36, verified: false, bio: "Décoratrice d'intérieur, mise en valeur d'artisanat local et matières naturelles." },

  // ==== Reprises de Les Bons Plans du Bled (lbpdb.org) ====
  { historic: true, name: "Keva Lounge Restaurant", category: "loisirs", city: "Douala", rating: 4.6, reviews: 28, verified: true, bio: "Restaurant-lounge convivial, cuisine locale et internationale, ambiance soignée pour dîners entre amis ou en famille." },
  { historic: true, name: "L'Ethnic Restaurant", category: "loisirs", city: "Douala", rating: 4.5, reviews: 19, verified: true, bio: "Cuisine ethnique variée dans un cadre chaleureux, au cœur de Douala." },
  { historic: true, name: "Guide touristique Sénégal", category: "loisirs", city: "Dakar", rating: 4.8, reviews: 22, verified: true, bio: "Guide touristique local, circuits sur-mesure pour découvrir Dakar et ses environs." },

  // ==== Ambassades & consulats (Cameroun) ====
  { name: "Ambassade de France", category: "admin", city: "Yaoundé", rating: 4.4, reviews: 14, verified: false, bio: "Représentation diplomatique française au Cameroun : services consulaires, visas, état civil." },
  { name: "Consulat des États-Unis", category: "admin", city: "Douala", rating: 4.2, reviews: 8, verified: false, bio: "Agence consulaire américaine pour la région du Littoral." },

  // ==== Côte d'Ivoire ====
  { name: "Ambassade de France", category: "admin", city: "Abidjan", rating: 4.5, reviews: 12, verified: false, bio: "Représentation diplomatique française, services consulaires et visas pour ressortissants et binationaux." },
  { name: "Consulat des États-Unis", category: "admin", city: "Abidjan", rating: 4.3, reviews: 9, verified: false, bio: "Services consulaires américains pour la Côte d'Ivoire." },
  { name: "Le Wafou", category: "loisirs", city: "Abidjan", neighborhood: "Bietry", rating: 4.6, reviews: 210, verified: false, bio: "Maquis emblématique au bord de la lagune, spécialités ivoiriennes et ambiance conviviale en soirée." },
  { name: "Bushman Café", category: "loisirs", city: "Abidjan", neighborhood: "Zone 4", rating: 4.5, reviews: 156, verified: false, bio: "Bar-restaurant incontournable de Zone 4, terrasse animée et concerts live le week-end." },
  { name: "Dr. Koffi Adjoumani", category: "sante", city: "Abidjan", neighborhood: "Cocody", rating: 4.8, reviews: 41, verified: false, bio: "Médecin généraliste, consultations et suivi pour expatriés et familles." },
  { name: "Cabinet Dentaire Aya N'Guessan", category: "sante", city: "Abidjan", neighborhood: "Marcory", rating: 4.7, reviews: 33, verified: false, bio: "Chirurgien-dentiste, soins et urgences dentaires." },
  { name: "Garage Konan & Fils", category: "transport", city: "Abidjan", neighborhood: "Yopougon", rating: 4.5, reviews: 27, verified: false, bio: "Mécanique générale toutes marques, diagnostic électronique, dépannage rapide." },
  { name: "Salon Ivoire Beauté", category: "sante", city: "Abidjan", neighborhood: "Cocody", rating: 4.6, reviews: 38, verified: false, bio: "Salon de coiffure et esthétique, spécialiste coiffures naturelles et soins du visage." },
  { name: "Jean-Marc Ouattara", category: "transport", city: "Abidjan", rating: 4.6, reviews: 67, verified: false, bio: "Chauffeur privé et déménagements, ponctuel, véhicule climatisé." },
  { name: "Amina Kouassi", category: "immobilier", city: "Abidjan", rating: 4.8, reviews: 94, verified: false, bio: "Agent immobilier, locations meublées expatriés à Cocody." },

  // ==== Sénégal ====
  { name: "Ambassade de France", category: "admin", city: "Dakar", rating: 4.4, reviews: 15, verified: false, bio: "Représentation diplomatique française, services consulaires et visas." },
  { name: "Ambassade des États-Unis", category: "admin", city: "Dakar", rating: 4.3, reviews: 11, verified: false, bio: "Services consulaires américains pour le Sénégal." },
  { name: "Chez Loutcha", category: "loisirs", city: "Dakar", neighborhood: "Plateau", rating: 4.6, reviews: 187, verified: false, bio: "Institution dakaroise depuis des décennies, cuisine sénégalaise et capverdienne généreuse." },
  { name: "Just4U", category: "loisirs", city: "Dakar", neighborhood: "Point E", rating: 4.5, reviews: 142, verified: false, bio: "Club-restaurant mythique, scène live incontournable de la musique sénégalaise." },
  { name: "Dr. Fatou Sarr", category: "sante", city: "Dakar", neighborhood: "Almadies", rating: 4.9, reviews: 47, verified: false, bio: "Médecin généraliste, consultations à domicile pour familles et diaspora de passage." },
  { name: "Cabinet Dentaire Almadies", category: "sante", city: "Dakar", neighborhood: "Almadies", rating: 4.7, reviews: 29, verified: false, bio: "Soins dentaires et esthétique du sourire, équipe bilingue." },
  { name: "Garage Thiès Auto", category: "transport", city: "Thiès", rating: 4.4, reviews: 19, verified: false, bio: "Entretien et réparation automobile toutes marques, pièces d'occasion et neuves." },
  { name: "Teranga Beauté", category: "sante", city: "Dakar", neighborhood: "Ouakam", rating: 4.6, reviews: 34, verified: false, bio: "Salon de beauté et bien-être, soins capillaires, manucure, massages." },
  { name: "Aïcha Diallo", category: "maison", city: "Dakar", rating: 4.9, reviews: 82, verified: false, bio: "Décoratrice d'intérieur spécialisée en artisanat local, 10 ans d'expérience auprès d'expatriés." },

  // ==== Ghana ====
  { name: "Ambassade de France", category: "admin", city: "Accra", rating: 4.4, reviews: 10, verified: false, bio: "Représentation diplomatique française au Ghana, services consulaires et visas." },
  { name: "Ambassade des États-Unis", category: "admin", city: "Accra", rating: 4.3, reviews: 9, verified: false, bio: "Services consulaires américains pour le Ghana." },
  { name: "Buka Restaurant", category: "loisirs", city: "Accra", neighborhood: "Osu", rating: 4.5, reviews: 132, verified: false, bio: "Restaurant réputé d'Osu, cuisine ghanéenne et ouest-africaine dans un cadre chaleureux." },
  { name: "Dr. Kwame Asante", category: "sante", city: "Accra", rating: 4.7, reviews: 36, verified: false, bio: "Médecin généraliste, consultations pour expatriés et familles." },
  { name: "Accra Auto Garage", category: "transport", city: "Accra", rating: 4.4, reviews: 22, verified: false, bio: "Entretien et réparation automobile toutes marques." },
  { name: "Osu Beauty Salon", category: "sante", city: "Accra", neighborhood: "Osu", rating: 4.5, reviews: 27, verified: false, bio: "Salon de coiffure et esthétique, soins capillaires naturels." },

  // ==== Nigeria ====
  { name: "David Okonkwo", category: "emploi", city: "Lagos", rating: 4.7, reviews: 46, verified: false, bio: "Consultant RH, recrutement pour startups et PME internationales." },
  { name: "Ambassade de France", category: "admin", city: "Lagos", rating: 4.3, reviews: 11, verified: false, bio: "Consulat général de France à Lagos, services consulaires et visas." },
  { name: "Consulat des États-Unis", category: "admin", city: "Lagos", rating: 4.2, reviews: 13, verified: false, bio: "Services consulaires américains pour le Nigeria." },
  { name: "Terra Kulture", category: "loisirs", city: "Lagos", neighborhood: "Victoria Island", rating: 4.6, reviews: 178, verified: false, bio: "Lieu culturel emblématique de Lagos : restaurant, galerie d'art et scène spectacles." },
  { name: "Dr. Chidinma Okafor", category: "sante", city: "Lagos", rating: 4.8, reviews: 39, verified: false, bio: "Médecin généraliste, consultations à domicile pour familles et diaspora de passage." },
  { name: "Lagos Motors Garage", category: "transport", city: "Lagos", rating: 4.5, reviews: 31, verified: false, bio: "Mécanique toutes marques, diagnostic électronique, dépannage rapide." },

  // ==== Togo ====
  { name: "Ambassade de France", category: "admin", city: "Lomé", rating: 4.4, reviews: 9, verified: false, bio: "Représentation diplomatique française au Togo, services consulaires et visas." },
  { name: "Dr. Komla Agbeko", category: "sante", city: "Lomé", rating: 4.6, reviews: 21, verified: false, bio: "Médecin généraliste, consultations et suivi pour expatriés et familles." },
  { name: "Garage Lomé Auto", category: "transport", city: "Lomé", rating: 4.4, reviews: 17, verified: false, bio: "Entretien et réparation automobile toutes marques." },

  // ==== Bénin ====
  { name: "Ambassade de France", category: "admin", city: "Cotonou", rating: 4.4, reviews: 10, verified: false, bio: "Représentation diplomatique française au Bénin, services consulaires et visas." },
  { name: "Dr. Ablavi Houngbedji", category: "sante", city: "Cotonou", rating: 4.6, reviews: 19, verified: false, bio: "Médecin généraliste, consultations pour expatriés et familles." },
  { name: "Garage Cotonou Auto", category: "transport", city: "Cotonou", rating: 4.3, reviews: 15, verified: false, bio: "Mécanique générale toutes marques, dépannage rapide." },

  // ==== Guinée équatoriale ====
  { name: "Ambassade de France", category: "admin", city: "Malabo", rating: 4.2, reviews: 6, verified: false, bio: "Représentation diplomatique française en Guinée équatoriale, services consulaires et visas." },
  { name: "Dr. Maria Nsue", category: "sante", city: "Malabo", rating: 4.6, reviews: 14, verified: false, bio: "Médecin généraliste, consultations pour expatriés et familles." },
  { name: "Garage Malabo Auto", category: "transport", city: "Malabo", rating: 4.3, reviews: 11, verified: false, bio: "Entretien et réparation automobile toutes marques." },

  // ==== Maroc ====
  { name: "Ambassade de France", category: "admin", city: "Rabat", rating: 4.5, reviews: 18, verified: false, bio: "Représentation diplomatique française au Maroc, services consulaires et visas." },
  { name: "Consulat de France", category: "admin", city: "Casablanca", rating: 4.4, reviews: 16, verified: false, bio: "Consulat général de France à Casablanca, services consulaires et visas." },
  { name: "La Mamounia", category: "loisirs", city: "Marrakech", rating: 4.9, reviews: 320, verified: false, bio: "Palace historique et emblématique de Marrakech, jardins, restaurants et spa de renommée mondiale." },
  { name: "Dr. Youssef El Amrani", category: "sante", city: "Casablanca", rating: 4.7, reviews: 42, verified: false, bio: "Médecin généraliste, consultations pour expatriés et familles." },
  { name: "Garage Casablanca Auto", category: "transport", city: "Casablanca", rating: 4.5, reviews: 28, verified: false, bio: "Entretien et réparation automobile toutes marques." },
  { name: "Salon Marrakech Beauté", category: "sante", city: "Marrakech", rating: 4.6, reviews: 33, verified: false, bio: "Salon de beauté et bien-être, soins et hammam traditionnel." },

  // ==== Tunisie ====
  { name: "Ambassade de France", category: "admin", city: "Tunis", rating: 4.4, reviews: 17, verified: false, bio: "Représentation diplomatique française en Tunisie, services consulaires et visas." },
  { name: "Dr. Amira Ben Salah", category: "sante", city: "Tunis", rating: 4.7, reviews: 29, verified: false, bio: "Médecin généraliste, consultations pour expatriés et familles." },
  { name: "Garage Tunis Auto", category: "transport", city: "Tunis", rating: 4.4, reviews: 20, verified: false, bio: "Entretien et réparation automobile toutes marques." },

  // ==== Algérie ====
  { name: "Ambassade de France", category: "admin", city: "Alger", rating: 4.4, reviews: 19, verified: false, bio: "Représentation diplomatique française en Algérie, services consulaires et visas." },
  { name: "Dr. Karim Boumediene", category: "sante", city: "Alger", rating: 4.6, reviews: 25, verified: false, bio: "Médecin généraliste, consultations pour expatriés et familles." },
  { name: "Garage Alger Auto", category: "transport", city: "Alger", rating: 4.4, reviews: 18, verified: false, bio: "Entretien et réparation automobile toutes marques." },

  // ==== Congo ====
  { name: "Ambassade de France", category: "admin", city: "Brazzaville", rating: 4.3, reviews: 8, verified: false, bio: "Représentation diplomatique française au Congo, services consulaires et visas." },
  { name: "Dr. Prisca Mabiala", category: "sante", city: "Brazzaville", rating: 4.6, reviews: 17, verified: false, bio: "Médecin généraliste, consultations pour expatriés et familles." },
  { name: "Garage Brazzaville Auto", category: "transport", city: "Brazzaville", rating: 4.3, reviews: 14, verified: false, bio: "Entretien et réparation automobile toutes marques." },
  { name: "Le Mami Wata", category: "loisirs", city: "Pointe-Noire", rating: 4.4, reviews: 26, verified: false, bio: "Restaurant en bord de mer, cuisine locale et fruits de mer." },

  // ==== RDC ====
  { name: "Ambassade de France", category: "admin", city: "Kinshasa", rating: 4.3, reviews: 12, verified: false, bio: "Représentation diplomatique française en RDC, services consulaires et visas." },
  { name: "Consulat des États-Unis", category: "admin", city: "Kinshasa", rating: 4.2, reviews: 9, verified: false, bio: "Services consulaires américains pour la RDC." },
  { name: "Dr. Grace Kabongo", category: "sante", city: "Kinshasa", rating: 4.7, reviews: 31, verified: false, bio: "Médecin généraliste, consultations à domicile pour familles et diaspora de passage." },
  { name: "Garage Kinshasa Auto", category: "transport", city: "Kinshasa", rating: 4.4, reviews: 22, verified: false, bio: "Mécanique générale toutes marques, dépannage rapide." },
  { name: "Salon Beauté Lubumbashi", category: "sante", city: "Lubumbashi", rating: 4.5, reviews: 19, verified: false, bio: "Salon de coiffure et esthétique, soins capillaires et manucure." },

  // ==== Centrafrique ====
  { name: "Ambassade de France", category: "admin", city: "Bangui", rating: 4.2, reviews: 6, verified: false, bio: "Représentation diplomatique française en Centrafrique, services consulaires et visas." },
  { name: "Dr. Bernadette Koyamba", category: "sante", city: "Bangui", rating: 4.5, reviews: 13, verified: false, bio: "Médecin généraliste, consultations pour expatriés et familles." },
  { name: "Garage Bangui Auto", category: "transport", city: "Bangui", rating: 4.3, reviews: 10, verified: false, bio: "Entretien et réparation automobile toutes marques." },

  // ==== Cap-Vert ====
  { name: "Ambassade de France", category: "admin", city: "Praia", rating: 4.4, reviews: 9, verified: false, bio: "Représentation diplomatique française au Cap-Vert, services consulaires et visas." },
  { name: "Dr. Maria Fortes", category: "sante", city: "Praia", rating: 4.7, reviews: 21, verified: false, bio: "Médecin généraliste, consultations pour expatriés et familles." },
  { name: "Restaurant Sabor Crioulo", category: "loisirs", city: "Mindelo", rating: 4.5, reviews: 24, verified: false, bio: "Cuisine créole capverdienne, ambiance musicale, spécialités locales." },
  { name: "Garage Praia Auto", category: "transport", city: "Praia", rating: 4.3, reviews: 12, verified: false, bio: "Entretien et réparation automobile toutes marques." },
  { name: "Salon Praia Beauté", category: "sante", city: "Praia", rating: 4.5, reviews: 16, verified: false, bio: "Salon de beauté et bien-être, soins capillaires, manucure." },
];

/**
 * Règle de validation AfriLink : aucun statut n'est attribué automatiquement.
 * Seule l'équipe fondatrice porte le statut « Équipe » ; tout le reste est « Référencé »
 * tant que la communauté n'a pas recommandé ni l'équipe vérifié la fiche.
 */
function deriveStatus(p: (typeof seed)[number]): ProStatus {
  return p.status === "equipe" ? "equipe" : "reference";
}


/** Établissements, institutions et lieux réels : monogramme sobre, jamais de portrait inventé. */
const PLACE_PATTERN =
  /^(Ambassade|Consulat|Cabinet|Garage|Salon|Restaurant|Guide|Keva|L'Ethnic|Le |La |Chez |Just4U|Buka|Terra |Bushman|Teranga|Accra |Lagos |Osu )/i;

function deriveKind(name: string): "person" | "place" {
  return PLACE_PATTERN.test(name) ? "place" : "person";
}

const CURATED: Pro[] = seed.map((p, i) => {
  const id = `pro-${i + 1}`;
  const kind = deriveKind(p.name);
  return {
    ...p,
    id,
    kind,
    status: deriveStatus(p),
    country: CITY_COUNTRY[p.city] ?? "Autres",
    color: colors[i % colors.length],
    initials: p.name.replace(/^Dr\.?\s*/, "").split(" ").map((n) => n[0]?.toUpperCase()).slice(0, 2).join(""),
    // Portraits illustrés déterministes (même style pour tous), uniquement pour les personnes.
    avatar:
      kind === "person"
        ? portrait(p.name)
        : undefined,
  };
});

/**
 * Fiches historiques importées depuis l'export WordPress LBPD (120 fiches sélectionnées).
 * Règle stricte : statut « Référencé » pour toutes — aucun « Recommandé » ni
 * « Vérifié AfriLink » n'est attribué automatiquement.
 */
const IMPORTED: Pro[] = LISTINGS.map((l, i) => ({
  id: l.id,
  name: l.title,
  category: l.category,
  city: l.city,
  country: CITY_COUNTRY[l.city] ?? "Cameroun",
  neighborhood: l.location.split(",")[0]?.trim() || undefined,
  rating: 0,
  reviews: 0,
  verified: false,
  status: "reference" as ProStatus,
  bio: l.desc,
  color: colors[(i + 3) % colors.length],
  initials: l.title.replace(/[^A-Za-zÀ-ÿ ]/g, " ").trim().split(/\s+/).map((n) => n[0]?.toUpperCase() ?? "").slice(0, 2).join(""),
  kind: "place" as const,
  historic: true,
  contentType: l.type,
  phone: l.phone || undefined,
  email: l.email || undefined,
  website: l.website || undefined,
  address: l.location || undefined,
  sourceUrl: l.sourceUrl || undefined,
  media: [l.image, ...l.gallery].filter(Boolean),
  importedAt: l.date,
}));

export const PROS: Pro[] = [...CURATED, ...IMPORTED];

export const TEAM = PROS.filter((p) => p.status === "equipe");
export const FOUNDER = PROS.find((p) => p.name === "Odile Ebongue")!;
export const COFOUNDER = PROS.find((p) => p.name === "Roudolph Doualla")!;


/** Contacts historiques réels référencés depuis Les Bons Plans du Bled. */
export const HISTORIC_PROS = PROS.filter((p) => p.historic);

/** Types de contenu importés (filtre Explorer). */
export const CONTENT_TYPES = [
  { value: "pro", label: "Fiches pros" },
  { value: "offre", label: "Bons plans" },
  { value: "institution", label: "Institutions" },
] as const;



/* ---------- Chiffres réels AfriLink ---------- */

export const STATS = {
  plans: "+390",
  plansLabel: "bons plans & contacts partagés depuis 2022",
  members: "+200",
  membersLabel: "membres historiques de la communauté",
  pros: "20+",
  prosLabel: "professionnels référencés depuis 2022, revalidation en cours",
};

/* ---------- Villes ouvertes / prochaines ouvertures ---------- */

/** Villes actives : la communauté y est déjà présente. */
export const MAIN_CITIES = [
  "Douala", "Yaoundé", "Dakar", "Abidjan",
  "Libreville", "Cotonou", "Lomé", "Brazzaville",
] as const;

/** Prochaines ouvertures annoncées (aucune fiche publiée à ce stade). */
export const OPENING_CITIES = [
  "Kinshasa", "Conakry", "Bamako", "Kigali", "N'Djamena", "Bujumbura",
] as const;

/* ---------- Bibliothèque (ouvrages du domaine public + notes de lecture) ---------- */

export type LibraryItem = {
  id: string;
  title: string;
  author: string;
  year: number;
  format: string;
  pages: number;
  language: string;
  license: string;
  sourceLabel: string;
  sourceUrl: string;
  /** Dégradé de couverture (aucune image inventée). */
  cover: [string, string];
  desc: string;
  /** Note de lecture rédigée par AfriLink — aperçu ouvert à tous. */
  preview: string;
  /** Sommaire complet, réservé aux membres connectés. */
  chapters: string[];
  category: string;
};

export const LIBRARY: LibraryItem[] = [
  {
    id: "lib-1",
    title: "Voyage à Tombouctou",
    author: "René Caillié",
    year: 1830,
    format: "Livre",
    pages: 475,
    language: "Français",
    license: "Domaine public",
    sourceLabel: "Wikisource",
    sourceUrl: "https://fr.wikisource.org/wiki/Journal_d%E2%80%99un_voyage_%C3%A0_Tombouctou_et_%C3%A0_Jenn%C3%A9",
    cover: ["#0F2B1E", "#3E7A5C"],
    desc: "Le récit fondateur d'une traversée de l'Afrique de l'Ouest, du Sénégal au Niger, par un voyageur parti sans escorte.",
    preview:
      "Note de lecture AfriLink — Caillié raconte moins des exploits que des détails de terrain : négocier un passage, se loger chez l'habitant, comprendre les usages avant de demander un service. C'est exactement la logique qui fonde AfriLink : la bonne personne avant la bonne adresse.",
    chapters: [
      "Départ de Saint-Louis et préparatifs",
      "Séjour chez les Braknas",
      "La route de Kankan",
      "Djenné et le fleuve Niger",
      "Tombouctou",
      "La traversée du Sahara",
    ],
    category: "loisirs",
  },
  {
    id: "lib-2",
    title: "Travels in West Africa",
    author: "Mary H. Kingsley",
    year: 1897,
    format: "Livre",
    pages: 743,
    language: "Anglais",
    license: "Domaine public",
    sourceLabel: "Project Gutenberg",
    sourceUrl: "https://www.gutenberg.org/ebooks/5891",
    cover: ["#2F6B4F", "#D4A64A"],
    desc: "Observations de première main sur le Gabon, le Cameroun et le golfe de Guinée : commerce, langues, sociétés locales.",
    preview:
      "Note de lecture AfriLink — Kingsley décrit les circuits commerciaux du Wouri et du Gabon avec un souci du concret rare pour l'époque. Utile pour comprendre pourquoi les réseaux de confiance priment encore aujourd'hui sur les annuaires.",
    chapters: [
      "From Liverpool to Sierra Leone",
      "Along the Gold Coast",
      "In the Ogowé",
      "Fishing in the rapids",
      "Ascent of Mungo Mah Lobeh (Mont Cameroun)",
      "Trade and labour in West Africa",
    ],
    category: "education",
  },
  {
    id: "lib-3",
    title: "The Interesting Narrative of the Life of Olaudah Equiano",
    author: "Olaudah Equiano",
    year: 1789,
    format: "Livre",
    pages: 294,
    language: "Anglais",
    license: "Domaine public",
    sourceLabel: "Project Gutenberg",
    sourceUrl: "https://www.gutenberg.org/ebooks/15399",
    cover: ["#9C6E2B", "#0F2B1E"],
    desc: "L'autobiographie majeure d'un homme né en pays igbo, déporté, affranchi, devenu figure de l'abolitionnisme.",
    preview:
      "Note de lecture AfriLink — Un texte de référence sur l'identité, l'exil et le retour. À lire avant tout projet de réinstallation : il rappelle que revenir n'est jamais seulement une question logistique.",
    chapters: [
      "Enfance en pays igbo",
      "La traversée",
      "Les Antilles",
      "Le rachat de la liberté",
      "Voyages en Europe",
      "L'engagement abolitionniste",
    ],
    category: "education",
  },
  {
    id: "lib-4",
    title: "African Life and Customs",
    author: "Edward W. Blyden",
    year: 1908,
    format: "Essai",
    pages: 91,
    language: "Anglais",
    license: "Domaine public",
    sourceLabel: "Project Gutenberg",
    sourceUrl: "https://www.gutenberg.org/ebooks/60123",
    cover: ["#3E7A5C", "#B8863A"],
    desc: "Essai court sur l'organisation sociale africaine : famille élargie, entraide, transmission et institutions locales.",
    preview:
      "Note de lecture AfriLink — Blyden formalise ce que la communauté vit tous les jours : l'entraide comme institution. Une grille de lecture utile pour comprendre nos statuts Référencé, Recommandé et Vérifié.",
    chapters: [
      "The African family",
      "Communal life",
      "Property and land",
      "Education and transmission",
      "Religion and social order",
    ],
    category: "admin",
  },
  {
    id: "lib-5",
    title: "Fables sénégalaises recueillies de l'Ouolof",
    author: "Baron Roger",
    year: 1828,
    format: "Recueil",
    pages: 288,
    language: "Français",
    license: "Domaine public",
    sourceLabel: "Gallica (BnF)",
    sourceUrl: "https://gallica.bnf.fr/ark:/12148/bpt6k5822842f",
    cover: ["#D4A64A", "#2F6B4F"],
    desc: "L'un des premiers recueils de fables wolof transcrites, avec notes sur les usages et la langue.",
    preview:
      "Note de lecture AfriLink — Une porte d'entrée dans les codes de politesse et la manière de demander un service en Afrique de l'Ouest. Court, lisible, parfait avant un premier séjour à Dakar.",
    chapters: [
      "Avant-propos sur la langue ouolof",
      "Fables des animaux",
      "Fables des hommes",
      "Proverbes et dictons",
      "Notes sur les usages",
    ],
    category: "loisirs",
  },
  {
    id: "lib-6",
    title: "Voyage dans l'Afrique occidentale",
    author: "Anne Raffenel",
    year: 1846,
    format: "Livre",
    pages: 512,
    language: "Français",
    license: "Domaine public",
    sourceLabel: "Gallica (BnF)",
    sourceUrl: "https://gallica.bnf.fr/ark:/12148/bpt6k103765q",
    cover: ["#B8863A", "#0F2B1E"],
    desc: "Description détaillée du Sénégal et de la haute vallée du fleuve : routes, marchés, saisons, ravitaillement.",
    preview:
      "Note de lecture AfriLink — Le chapitre sur les marchés et les saisons reste étonnamment actuel pour anticiper les prix et les périodes creuses. Complément historique à nos guides d'arrivée.",
    chapters: [
      "Saint-Louis et la côte",
      "Le fleuve Sénégal",
      "Bakel et le haut fleuve",
      "Marchés et échanges",
      "Climat et saisons",
      "Retour et enseignements",
    ],
    category: "admin",
  },
];


/* ---------- Utilisateur simulé (session "connectée") ---------- */

export const CURRENT_USER = {
  name: "Odile Ebongue",
  initials: "OE",
  color: "#0F2B1E",
  city: "Douala",
  role: "Fondatrice AfriLink",
  avatar: portrait("Odile Ebongue"),
};

/* ---------- Fil d'actualité (bons plans, demandes, alertes) ---------- */

export type FeedPost = {
  id: string;
  kind: "demande" | "bon-plan" | "annonce" | "verif";
  author: { name: string; initials: string; color: string; city: string; verified?: boolean; avatar?: string };
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
    author: { name: "Sophie L.", initials: "SL", color: "#D4A64A", city: "Douala" , avatar: portrait("Sophie L.") },
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
    author: { name: "Marc D.", initials: "MD", color: "#0F2B1E", city: "Yaoundé", verified: false , avatar: portrait("Marc D.") },
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
    author: { name: "Awa T.", initials: "AT", color: "#3E7A5C", city: "Douala" , avatar: portrait("Awa T.") },
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
    author: { name: "Franck Kamdem", initials: "FK", color: "#B8863A", city: "Douala", verified: false , avatar: portrait("Franck Kamdem") },
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
    author: { name: "AfriLink", initials: "AL", color: "#0F2B1E", city: "Cameroun", verified: false },
    time: "aujourd'hui",
    title: "3 annonces vérifiées via Les Bons Plans du Bled",
    body: "Keva Lounge Restaurant et L'Ethnic Restaurant (Douala), ainsi que Guide touristique Sénégal (Dakar) rejoignent la communauté vérifiée AfriLink.",
    replies: 2,
    likes: 31,
  },
  {
    id: "f6",
    kind: "bon-plan",
    author: { name: "Nadia R.", initials: "NR", color: "#9C6E2B", city: "Kribi" , avatar: portrait("Nadia R.") },
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

/** Résolution par nom : les identifiants d'index ne sont jamais fiables après un ré-import. */
const proIdByName = (name: string) => PROS.find((p) => p.name === name)?.id ?? PROS[0]!.id;

export const MOCK_CONVERSATIONS = [
  {
    id: "c1",
    proId: proIdByName("Franck Kamdem"),
    lastMessage: "Parfait, je vous envoie les visites demain matin.",
    unread: 2,
    messages: [
      { from: "me", text: "Bonjour Franck, je cherche un 3 pièces meublé à Bonapriso pour septembre.", time: "09:12" },
      { from: "them", text: "Bonjour Odile ! Ravi de vous lire. Budget et durée souhaités ?", time: "09:18" },
      { from: "me", text: "Autour de 600 000 FCFA, pour 12 mois minimum.", time: "09:20" },
      { from: "them", text: "Parfait, je vous envoie les visites demain matin.", time: "09:22" },
    ],
  },
  {
    id: "c2",
    proId: proIdByName("Nadège Mbida"),
    lastMessage: "Le rendez-vous à la sous-préfecture est confirmé.",
    unread: 0,
    messages: [
      { from: "them", text: "Bonjour Odile, j'ai déposé votre dossier ce matin.", time: "Hier" },
      { from: "me", text: "Merci Nadège !", time: "Hier" },
      { from: "them", text: "Le rendez-vous à la sous-préfecture est confirmé.", time: "Hier" },
    ],
  },
  {
    id: "c3",
    proId: proIdByName("Dr. Estelle Ngo Bakang"),
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

/* ---------- Témoignages communauté (fictifs, illustratifs) ---------- */

export type Testimonial = {
  name: string;
  role: string;
  initials: string;
  color: string;
  quote: string;
  avatarSeed: string;
  avatar: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Nadia B.",
    role: "Rentrée à Douala après 11 ans à Lyon",
    initials: "NB",
    color: "#0F2B1E",
    quote:
      "Mon premier mois, j'ai passé plus de temps à chercher un électricien qu'à travailler. Ici, on m'a donné un nom, un prix et un avis — j'ai appelé, c'était réglé le lendemain.",
    avatarSeed: "Nadia B.",
  },
  {
    name: "Yannick T.",
    role: "Consultant, allers-retours Paris — Yaoundé",
    initials: "YT",
    color: "#B8863A",
    quote:
      "Ce qui change tout, c'est de savoir qui a déjà testé. Je ne cherche plus le meilleur prestataire du pays, je cherche celui que quelqu'un de la communauté recommande vraiment.",
    avatarSeed: "Yannick T.",
  },
  {
    name: "Fatou D.",
    role: "Maman de deux enfants, installée à Dakar",
    initials: "FD",
    color: "#3E7A5C",
    quote:
      "J'avais peur de déranger en posant des questions basiques. Personne ne m'a jugée : école, pédiatre, garde d'enfants, j'ai eu trois réponses utiles le même soir.",
    avatarSeed: "Fatou D.",
  },
].map((t) => ({ ...t, avatar: portrait(t.avatarSeed) }));

/* ---------- Géographie en cascade : Pays → Ville → Quartier ---------- */

/**
 * Quartiers réellement renseignés dans les fiches (aucun quartier inventé).
 * Une ville sans quartier documenté renvoie une liste vide.
 */
export const DISTRICTS_BY_CITY: Record<string, string[]> = PROS.reduce(
  (acc, p) => {
    if (!p.neighborhood) return acc;
    const list = (acc[p.city] ??= []);
    if (!list.includes(p.neighborhood)) list.push(p.neighborhood);
    return acc;
  },
  {} as Record<string, string[]>,
);
Object.values(DISTRICTS_BY_CITY).forEach((l) => l.sort((a, b) => a.localeCompare(b, "fr")));

export function districtsFor(city: string, country: string) {
  if (city && city !== "all") return DISTRICTS_BY_CITY[city] ?? [];
  const cities = country && country !== "all"
    ? (COUNTRIES.find((c) => c.name === country)?.cities ?? [])
    : Object.keys(DISTRICTS_BY_CITY);
  const set = new Set<string>();
  cities.forEach((c) => (DISTRICTS_BY_CITY[c] ?? []).forEach((d) => set.add(d)));
  return [...set].sort((a, b) => a.localeCompare(b, "fr"));
}
