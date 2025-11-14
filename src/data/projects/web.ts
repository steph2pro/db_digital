import { Project } from "../../types";

export const webProjects: Project[] = [
  {
  id: "devtech-management",
  title: {
    fr: "DevTech Management - Gestion d'Entreprise IT",
    en: "DevTech Management - IT Company Management"
  },
  description: {
    fr: "Application web complète de gestion pour entreprise de vente d'équipements informatiques.",
    en: "Complete web management application for IT equipment sales company."
  },
  fullDescription: {
    fr: "DevTech Management est une application fullstack complète conçue pour la gestion d'une entreprise spécialisée dans la vente d'équipements informatiques. Le système couvre l'ensemble du cycle de vente, de la gestion des stocks à la facturation en passant par le suivi client. Architecture Clean Architecture implémentée à la fois côté frontend et backend pour une maintenabilité optimale.",
    en: "DevTech Management is a complete fullstack application designed for managing a company specialized in IT equipment sales. The system covers the entire sales cycle, from inventory management to invoicing and customer tracking. Clean Architecture implemented on both frontend and backend for optimal maintainability."
  },
  technologies: [
    "React",
    "TypeScript",
    "Clean Architecture",
    "Redux Toolkit",
    "React Query",
    "Vite",
    "React Router DOM",
    "Tailwind CSS",
    "AdonisJS",
    "Drizzle ORM",
    "PostgreSQL",
    "Vine Validator",
    "Data Caching",
    "JWT Authentication",
    "Docker",
    "Redis"
  ],
  images: [
    "/images/projects/projet-web/workDevTech.png",
    "/images/projects/projet-web/workDevTech2.png",
    "/images/projects/projet-web/workDevTech3.png"
  ],
  category: "web",
  featured: true,
  githubUrl:"https://github.com/steph2pro/devtech-management-frontend.git",
  status: "completed",
  startDate: "2023-11-01",
  endDate: "2024-02-28",
  client: "DevTech Solutions",
  isPrivate:true,
  teamSize: 3,
  challenges: {
    fr: [
      "Architecture complexe avec multiples modules métier",
      "Gestion de stock en temps réel avec synchronisation",
      "Système de facturation et suivi financier",
      "Performances avec grandes bases de données produits",
      "Sécurité des données clients et transactions"
    ],
    en: [
      "Complex architecture with multiple business modules",
      "Real-time inventory management with synchronization",
      "Invoicing system and financial tracking",
      "Performance with large product databases",
      "Customer data and transaction security"
    ]
  },
  solutions: {
    fr: [
      "Clean Architecture pour séparation stricte des couches",
      "Drizzle ORM pour performances base de données optimisées",
      "Cache Redis pour données fréquemment accédées",
      "Validation robuste avec Vine Validator",
      "API RESTful avec pagination et filtres avancés"
    ],
    en: [
      "Clean Architecture for strict layer separation",
      "Drizzle ORM for optimized database performance",
      "Redis cache for frequently accessed data",
      "Robust validation with Vine Validator",
      "RESTful API with pagination and advanced filters"
    ]
  },
  features: {
    fr: [
      "Gestion complète du catalogue produits et stocks",
      "Système de vente avec panier et facturation",
      "Gestion des clients et historique d'achats",
      "Tableau de bord analytique avec indicateurs KPI",
      "Gestion des fournisseurs et commandes d'approvisionnement",
      "Système de reporting et statistiques de vente",
      "Interface multi-utilisateurs avec rôles et permissions",
      "Synchronisation en temps réel des données",
      "Export de données (PDF, Excel, CSV)",
      "Système de notifications et alertes stock"
    ],
    en: [
      "Complete product catalog and inventory management",
      "Sales system with cart and invoicing",
      "Customer management and purchase history",
      "Analytical dashboard with KPI indicators",
      "Supplier management and procurement orders",
      "Reporting system and sales statistics",
      "Multi-user interface with roles and permissions",
      "Real-time data synchronization",
      "Data export (PDF, Excel, CSV)",
      "Notification system and stock alerts"
    ]
  },
},
  {
  id: "koople-admin",
  title: {
    fr: "Koople Admin - Plateforme d'Administration",
    en: "Koople Admin - Administration Platform"
  },
  description: {
    fr: "Plateforme d'administration et de validation pour application de rencontre avec interface moderne et performante.",
    en: "Administration and validation platform for dating application with modern and performant interface."
  },
  fullDescription: {
    fr: "Koople Admin est une plateforme complète d'administration conçue pour gérer et valider les différents éléments d'une application de rencontre. Elle offre une interface intuitive pour la modération des profils, la gestion des contenus et le suivi des activités utilisateurs. Implémentation frontend avancée avec architecture moderne et optimisations performances.",
    en: "Koople Admin is a comprehensive administration platform designed to manage and validate various elements of a dating application. It provides an intuitive interface for profile moderation, content management and user activity tracking. Advanced frontend implementation with modern architecture and performance optimizations."
  },
  technologies: [
    "React",
    "TypeScript",
    "Clean Architecture",
    "Redux Toolkit",
    "React Query",
    "Vite",
    "React Router DOM",
    "Tailwind CSS",
    "Push Notifications",
    "Data Caching",
    "Axios",
    "React Hook Form"
  ],
  images: [
    "/images/projects/projet-web/workKoople.png",
    "/images/projects/projet-web/workKoople2.png",
    "/images/projects/projet-web/workKoople3.png"
  ],
  category: "web",
  featured: true,
  // githubUrl: "https://github.com/steph2pro/koople-admin.git",
  isPrivate:true,
  status: "completed",
  startDate: "2024-01-15",
  endDate: "2024-03-20",
  client: "Koople Dating App",
  teamSize: 2,
  challenges: {
    fr: [
      "Gestion d'état complexe avec multiples sources de données",
      "Interface d'administration riche avec nombreuses fonctionnalités",
      "Performances avec grandes quantités de données utilisateur",
      "Système de notifications en temps réel",
      "Cache et synchronisation des données"
    ],
    en: [
      "Complex state management with multiple data sources",
      "Rich admin interface with numerous features",
      "Performance with large amounts of user data",
      "Real-time notification system",
      "Data caching and synchronization"
    ]
  },
  solutions: {
    fr: [
      "Clean Architecture pour séparation claire des responsabilités",
      "Redux Toolkit pour gestion d'état prévisible",
      "React Query pour cache et synchronisation automatique",
      "Optimistic updates pour meilleure UX",
      "Lazy loading et code splitting pour performances"
    ],
    en: [
      "Clean Architecture for clear separation of concerns",
      "Redux Toolkit for predictable state management",
      "React Query for caching and automatic synchronization",
      "Optimistic updates for better UX",
      "Lazy loading and code splitting for performance"
    ]
  },
  features: {
    fr: [
      "Dashboard analytique avec métriques en temps réel",
      "Modération des profils utilisateurs avec workflow de validation",
      "Gestion des signalements et content moderation",
      "Système de push notifications pour alertes admin",
      "Cache intelligent des données fréquemment consultées",
      "Interface responsive avec dark/light mode",
      "Export de données et rapports automatisés",
      "Gestion des rôles et permissions administrateur"
    ],
    en: [
      "Analytical dashboard with real-time metrics",
      "User profile moderation with validation workflow",
      "Report management and content moderation",
      "Push notification system for admin alerts",
      "Smart caching for frequently accessed data",
      "Responsive interface with dark/light mode",
      "Data export and automated reports",
      "Admin roles and permissions management"
    ]
  }
},
  {
    id: "millearnia-web",
    title: {
      fr: "Application Millearnia",
      en: "Millearnia Application",
    },
    description: {
      fr: "Plateforme d'orientation scolaire intelligente avec recommandations personnalisées.",
      en: "Intelligent school orientation platform with personalized recommendations.",
    },
    fullDescription: {
      fr: "Millearnia est une application d'orientation scolaire conçue pour aider les étudiants à choisir leur parcours académique et professionnel en fonction de leurs compétences et intérêts. Elle propose une interface intuitive et moderne avec une expérience utilisateur optimisée grâce à des outils performants.",
      en: "Millearnia is a school orientation application helping students choose academic and professional paths based on their skills and interests. It provides a modern and intuitive interface with an optimized user experience through powerful tools.",
    },
    technologies: [
      "React",
      "Clean Architecture",
      "React Query",
      "Yup",
      "Transactable",
      "Tailwind CSS",
      "ShadCN",
      "TypeScript"
    ],
    images: ["/images/projects/projet-web/workMillearnia.png"],
    category: "web",
    featured: true,
    githubUrl: "https://github.com/steph2pro/Millearnia-web.git",
    // liveUrl: "https://millearnia.com",
    status: "completed",
    startDate: "2023-01-15",
    endDate: "2023-06-20",
    client: "Startup EdTech",
    isPrivate:true,
    teamSize: 4,
    challenges: {
      fr: [
        "Gérer les données complexes d'orientation scolaire",
        "Créer une interface intuitive pour différents profils",
        "Assurer des performances optimales des recommandations IA"
      ],
      en: [
        "Manage complex orientation data",
        "Build an intuitive UI for different profiles",
        "Ensure high performance of AI recommendations"
      ]
    },
    solutions: {
      fr: [
        "Utilisation de la Clean Architecture",
        "Design system cohérent avec Tailwind CSS",
        "API d'IA pour recommandations personnalisées"
      ],
      en: [
        "Implemented Clean Architecture",
        "Consistent design system using Tailwind CSS",
        "AI API integration for recommendations"
      ]
    },
    features: {
      fr: [
        "Tests de compétences interactifs",
        "Recommandations personnalisées",
        "Suivi de progression",
        "Interface multilingue",
        "Tableau de bord administrateur"
      ],
      en: [
        "Interactive skills tests",
        "Personalized recommendations",
        "Progress tracking",
        "Multilingual interface",
        "Admin dashboard"
      ]
    }
  },
  {
    id: "mb-pressing-site",
    title: {
      fr: "Site Web MB-Pressing",
      en: "MB-Pressing Website",
    },
    description: {
      fr: "Site vitrine professionnel avec partie administration dynamique.",
      en: "Professional showcase website with dynamic admin panel.",
    },
    fullDescription: {
      fr: "Site web de prestation de service pour l'entreprise MB-Pressing, permettant à l'administrateur d'ajouter du contenu dynamiquement.",
      en: "Service website for MB-Pressing company with dynamic content management for admins.",
    },
    technologies: ["React", "Node.js", "Tailwind CSS"],
    images: ["/images/projects/projet-web/pressing.JPG"],
    category: "web",
    featured: false,
    liveUrl: "https://mb-pressing-infos-8owk.onrender.com",
    status: "completed",
    startDate: "2023-10-01",
    client: "MB-Pressing",
    teamSize: 1,
    challenges: {
      fr: [
        "Dynamisation du contenu",
        "Design réactif et professionnel"
      ],
      en: [
        "Dynamic content",
        "Responsive professional design"
      ]
    },
    solutions: {
      fr: [
        "Utilisation de React et Tailwind",
        "Back-office d'administration simple"
      ],
      en: [
        "React + Tailwind stack",
        "Simple admin back-office"
      ]
    },
    features: {
      fr: [
        "Section services",
        "Gestion dynamique du contenu"
      ],
      en: [
        "Services section",
        "Dynamic content management"
      ]
    }
  },
  {
    id: "asdev-site",
    title: {
      fr: "Site Web As-DEV",
      en: "As-DEV Website",
    },
    description: {
      fr: "Site vitrine professionnel pour l'entreprise As-DEV.",
      en: "Professional showcase website for As-DEV company.",
    },
    fullDescription: {
      fr: "Site web de prestation de service pour l'entreprise As-DEV présentant leurs services de développement.",
      en: "Service website for As-DEV company showcasing their development services.",
    },
    technologies: ["HTML", "CSS", "JavaScript","Vue JS"],
    images: ["/images/projects/projet-web/asdev.JPG"],
    category: "web",
    featured: false,
    liveUrl: "https://asdev.onrender.com",
    status: "completed",
    startDate: "2023-09-01",
    client: "As-DEV",
    teamSize: 1,
    challenges: {
      fr: [
        "Design professionnel et attractif",
        "Performance et accessibilité"
      ],
      en: [
        "Professional and attractive design",
        "Performance and accessibility"
      ]
    },
    solutions: {
      fr: [
        "Design responsive moderne",
        "Optimisation des performances"
      ],
      en: [
        "Modern responsive design",
        "Performance optimization"
      ]
    },
    features: {
      fr: [
        "Présentation des services",
        "Design responsive",
        "Interface utilisateur moderne"
      ],
      en: [
        "Services presentation",
        "Responsive design",
        "Modern user interface"
      ]
    }
  },
  {
    id: "dynamic-search",
    title: {
      fr: "Application de Recherche Dynamique",
      en: "Dynamic Search Application",
    },
    description: {
      fr: "Application de recherche dynamique et fluide utilisant une API.",
      en: "Dynamic and fluid search application using an API.",
    },
    fullDescription: {
      fr: "Application web de recherche dynamique offrant une expérience utilisateur fluide avec des résultats en temps réel via une API.",
      en: "Dynamic search web application providing a fluid user experience with real-time results via an API.",
    },
    technologies: ["JavaScript", "API", "HTML", "CSS","Vue JS"],
    images: ["/images/projects/projet-web/recherche.JPG"],
    category: "web",
    featured: false,
    liveUrl: "https://apprecherche.onrender.com/",
    status: "completed",
    startDate: "2023-05-01",
    client: "Personal Project",
    teamSize: 1,
    challenges: {
      fr: [
        "Recherche en temps réel",
        "Performance avec grandes quantités de données"
      ],
      en: [
        "Real-time search",
        "Performance with large data volumes"
      ]
    },
    solutions: {
      fr: [
        "Intégration d'API externe",
        "Optimisation des requêtes"
      ],
      en: [
        "External API integration",
        "Query optimization"
      ]
    },
    features: {
      fr: [
        "Recherche en temps réel",
        "Interface intuitive",
        "Résultats dynamiques"
      ],
      en: [
        "Real-time search",
        "Intuitive interface",
        "Dynamic results"
      ]
    }
  },
  {
    id: "website-mockup",
    title: {
      fr: "Maquette de Site Web",
      en: "Website Mockup",
    },
    description: {
      fr: "Modèle de site web démontrant l'organisation des éléments et les animations.",
      en: "Website model demonstrating element organization and animations.",
    },
    fullDescription: {
      fr: "Maquette interactive montrant l'organisation des éléments, la structure et l'animation des composants pour un site web moderne.",
      en: "Interactive mockup showing element organization, structure and component animations for a modern website.",
    },
    technologies: ["HTML", "CSS", "JavaScript","Angular JS"],
    images: ["/images/projects/projet-web/maquette.JPG"],
    category: "web",
    featured: false,
    liveUrl: "https://steph2pro-maquette.onrender.com/",
    status: "completed",
    startDate: "2023-04-01",
    client: "Personal Project",
    teamSize: 1,
    challenges: {
      fr: [
        "Animations fluides",
        "Structure organisée"
      ],
      en: [
        "Smooth animations",
        "Organized structure"
      ]
    },
    solutions: {
      fr: [
        "CSS animations avancées",
        "Architecture claire des composants"
      ],
      en: [
        "Advanced CSS animations",
        "Clear component architecture"
      ]
    },
    features: {
      fr: [
        "Animations interactives",
        "Design moderne",
        "Structure organisée"
      ],
      en: [
        "Interactive animations",
        "Modern design",
        "Organized structure"
      ]
    }
  },
  {
    id: "geolocation-platform",
    title: {
      fr: "Plateforme de Géolocalisation",
      en: "Geolocation Platform",
    },
    description: {
      fr: "Plateforme dynamique de géolocalisation des lieux.",
      en: "Dynamic geolocation platform for places.",
    },
    fullDescription: {
      fr: "Application web de géolocalisation permettant de localiser et visualiser différents lieux sur une carte interactive.",
      en: "Web geolocation application allowing to locate and visualize different places on an interactive map.",
    },
    technologies: ["JavaScript", "Geolocation API", "HTML", "CSS"],
    images: ["/images/projects/projet-web/lacalise.JPG"],
    category: "web",
    featured: false,
    status: "completed",
    startDate: "2023-06-01",
    client: "Personal Project",
    teamSize: 1,
    challenges: {
      fr: [
        "Intégration de cartes",
        "Géolocalisation précise"
      ],
      en: [
        "Map integration",
        "Accurate geolocation"
      ]
    },
    solutions: {
      fr: [
        "API de géolocalisation",
        "Interface cartographique"
      ],
      en: [
        "Geolocation API",
        "Mapping interface"
      ]
    },
    features: {
      fr: [
        "Carte interactive",
        "Géolocalisation en temps réel",
        "Interface utilisateur intuitive"
      ],
      en: [
        "Interactive map",
        "Real-time geolocation",
        "Intuitive user interface"
      ]
    }
  },
  {
    id: "todo-list",
    title: {
      fr: "Application Todo List",
      en: "Todo List Application",
    },
    description: {
      fr: "Gestionnaire de tâches conçu en JavaScript.",
      en: "Task manager built with JavaScript.",
    },
    fullDescription: {
      fr: "Application de gestion de tâches simple et efficace permettant d'organiser ses activités quotidiennes.",
      en: "Simple and effective task management application for organizing daily activities.",
    },
    technologies: ["JavaScript", "HTML", "CSS"],
    images: ["/images/projects/projet-web/todo-list.JPG"],
    category: "web",
    featured: false,
    liveUrl: "https://steph-todo-list.onrender.com/",
    status: "completed",
    startDate: "2023-03-01",
    client: "Personal Project",
    teamSize: 1,
    challenges: {
      fr: [
        "Interface simple et intuitive",
        "Gestion d'état des tâches"
      ],
      en: [
        "Simple and intuitive interface",
        "Task state management"
      ]
    },
    solutions: {
      fr: [
        "JavaScript vanilla",
        "Gestion d'état local"
      ],
      en: [
        "Vanilla JavaScript",
        "Local state management"
      ]
    },
    features: {
      fr: [
        "Ajout/suppression de tâches",
        "Marquage des tâches complétées",
        "Interface minimaliste"
      ],
      en: [
        "Add/remove tasks",
        "Completed tasks marking",
        "Minimalist interface"
      ]
    }
  },
  {
    id: "mystery-number-game",
    title: {
      fr: "Jeu du Nombre Mystère",
      en: "Mystery Number Game",
    },
    description: {
      fr: "Jeu où le but est de trouver le nombre mystère avec un nombre d'essais limité.",
      en: "Game where the goal is to find the mystery number with limited attempts.",
    },
    fullDescription: {
      fr: "Jeu interactif de devinette où les joueurs doivent trouver un nombre mystère en recevant des indices et avec un nombre limité d'essais.",
      en: "Interactive guessing game where players must find a mystery number using clues and with limited attempts.",
    },
    technologies: ["JavaScript", "HTML", "CSS"],
    images: ["/images/projects/projet-web/jeux.JPG"],
    category: "web",
    featured: false,
    liveUrl: "https://nombre-mistere.onrender.com/",
    status: "completed",
    startDate: "2023-02-01",
    client: "Personal Project",
    teamSize: 1,
    challenges: {
      fr: [
        "Logique de jeu",
        "Interface engageante"
      ],
      en: [
        "Game logic",
        "Engaging interface"
      ]
    },
    solutions: {
      fr: [
        "Algorithme de génération aléatoire",
        "Feedback visuel des tentatives"
      ],
      en: [
        "Random generation algorithm",
        "Visual feedback for attempts"
      ]
    },
    features: {
      fr: [
        "Génération aléatoire de nombres",
        "Système d'indices",
        "Compteur d'essais"
      ],
      en: [
        "Random number generation",
        "Hint system",
        "Attempt counter"
      ]
    }
  }
];