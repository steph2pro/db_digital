export interface Project {
  id: string;
  category: string;
  url: string;
  image: string;
  accent: string;
  year: number;
  tags: string[];
  title: { fr: string; en: string };
  tagline: { fr: string; en: string };
  description: { fr: string; en: string };
  challenge: { fr: string; en: string };
  result: { fr: string; en: string };
}

export const REALISATIONS_DATA: Project[] = [
  {
    id: "hotel",
    category: "web",
    url: "https://quorixtechnology.com",
    image: "/images/realisations/hotel.png",
    accent: "#c9a96e",
    year: 2024,
    tags: ["React", "Tailwind", "Booking API"],
    title: { fr: "Site Hôtel Premium", en: "Premium Hotel Website" },
    tagline: {
      fr: "Expérience de réservation haut de gamme",
      en: "High-end booking experience",
    },
    description: {
      fr: "Site vitrine et système de réservation pour un établissement hôtelier haut de gamme.",
      en: "Showcase site and booking system for a premium hotel.",
    },
    challenge: {
      fr: "Créer une expérience de réservation fluide tout en maintenant une esthétique luxueuse.",
      en: "Build a seamless booking experience while maintaining luxury aesthetics.",
    },
    result: {
      fr: "+42% de conversions en ligne et réduction de 60% des appels téléphoniques.",
      en: "+42% online conversions and 60% reduction in phone calls.",
    },
  },
  {
    id: "tara-delivery",
    category: "web",
    url: "https://tara-delivery-web.vercel.app",
    image: "/images/realisations/tara-delivery.png",
    accent: "#f97316",
    year: 2024,
    tags: ["Next.js", "Maps API", "Real-time"],
    title: { fr: "Tara Delivery", en: "Tara Delivery" },
    tagline: {
      fr: "Plateforme de livraison express",
      en: "Express delivery platform",
    },
    description: {
      fr: "Application web complète pour une agence de livraison : gestion des colis et suivi en temps réel.",
      en: "Full web app for a delivery agency: parcel management and real-time tracking.",
    },
    challenge: {
      fr: "Synchroniser le suivi GPS en temps réel avec la gestion des commandes.",
      en: "Synchronise real-time GPS tracking with order management.",
    },
    result: {
      fr: "Réduction du délai moyen de livraison de 18% grâce à l'optimisation automatique.",
      en: "Average delivery time reduced by 18% thanks to automatic optimisation.",
    },
  },
  {
    id: "perfect-agency",
    category: "marketing",
    url: "https://perfect-agency-frontend.vercel.app",
    image: "/images/realisations/perfect-agency.png",
    accent: "#a855f7",
    year: 2024,
    tags: ["React", "GSAP", "Framer Motion"],
    title: { fr: "Perfect Agency", en: "Perfect Agency" },
    tagline: {
      fr: "Site vitrine agence marketing créative",
      en: "Creative marketing agency showcase",
    },
    description: {
      fr: "Site portfolio animé pour une agence marketing : animations GSAP au scroll.",
      en: "Animated portfolio site for a marketing agency with GSAP scroll animations.",
    },
    challenge: {
      fr: "Traduire l'identité visuelle de l'agence en animations web performantes.",
      en: "Translate the agency's visual identity into performant web animations.",
    },
    result: {
      fr: "Score Lighthouse de 94/100 malgré les animations intensives.",
      en: "Lighthouse score of 94/100 despite intensive animations.",
    },
  },
  {
    id: "tresorbtp",
    category: "btp",
    url: "https://tresorbtp.vercel.app",
    image: "/images/realisations/tresorbtp.png",
    accent: "#eab308",
    year: 2024,
    tags: ["Next.js", "CMS", "SEO"],
    title: { fr: "Trésor BTP", en: "Trésor BTP" },
    tagline: {
      fr: "Présence digitale pour le secteur BTP",
      en: "Digital presence for the construction sector",
    },
    description: {
      fr: "Site institutionnel pour une entreprise du bâtiment.",
      en: "Institutional site for a construction firm.",
    },
    challenge: {
      fr: "Concevoir une interface professionnelle qui inspire confiance.",
      en: "Design a professional interface that inspires trust.",
    },
    result: {
      fr: "Première page Google sur les requêtes locales en moins de 3 mois.",
      en: "First Google page for local queries in under 3 months.",
    },
  },
  {
    id: "medolia",
    category: "sante",
    url: "https://medolia.vercel.app",
    image: "/images/realisations/medolia.png",
    accent: "#22c55e",
    year: 2024,
    tags: ["React", "TypeScript", "UX Medical"],
    title: { fr: "Medolia", en: "Medolia" },
    tagline: {
      fr: "Pharmacie & centre de santé en ligne",
      en: "Online pharmacy & health centre",
    },
    description: {
      fr: "Plateforme digitale pour une pharmacie / centre de santé.",
      en: "Digital platform for a pharmacy / health centre.",
    },
    challenge: {
      fr: "Respecter les contraintes réglementaires du secteur médical.",
      en: "Meet medical sector regulatory constraints.",
    },
    result: {
      fr: "Accessibilité WCAG AA certifiée.",
      en: "WCAG AA accessibility certified.",
    },
  },
];

export const CATEGORIES: Record<string, { fr: string; en: string }> = {
  all:       { fr: "Tous",        en: "All" },
  web:       { fr: "Web & App",   en: "Web & App" },
  marketing: { fr: "Marketing",   en: "Marketing" },
  btp:       { fr: "BTP",         en: "Construction" },
  sante:     { fr: "Santé",       en: "Health" },
};

export const STATS = [
  { value: "5+",  fr: "Projets livrés",   en: "Projects delivered" },
  { value: "4",   fr: "Secteurs couverts", en: "Sectors covered" },
  { value: "100%", fr: "Clients satisfaits", en: "Satisfied clients" },
];