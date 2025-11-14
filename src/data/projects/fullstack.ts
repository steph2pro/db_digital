import { Project } from "../../types";

export const fullstackProjects: Project[] = [
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
      "TypeScript",
      "Adonis js"
    ],
    images: ["/images/projects/projet-web/workMillearnia.png"],
    category: "fullstack",
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
  category: "fullstack",
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
    id: "esmod-app",
    title: {
      fr: "Application ESMOD",
      en: "ESMOD Application",
    },
    description: {
      fr: "Système complet de gestion d'institut universitaire.",
      en: "Comprehensive university management system.",
    },
    fullDescription: {
      fr: "Application Laravel pour la gestion d'un institut universitaire (étudiants, enseignants, cours, notes, emplois du temps).",
      en: "Laravel application for managing a university institute (students, teachers, courses, grades, timetables).",
    },
    technologies: [
      "Laravel",
      "Blade",
      "MySQL",
      "Livewire",
      "Bootstrap",
      "Tailwind CSS",
    ],
    images: ["/images/projects/projet-web/workEsmod.png"],
    category: "fullstack",
    featured: true,
    githubUrl: "https://github.com/steph2pro/ESMOD-ScoolManagment.git",
    status: "completed",
    startDate: "2022-08-10",
    endDate: "2022-12-30",
    challenges: {
      fr: ["Gestion de rôles multiples.", "Sécurité et performance.", "Modularité du code."],
      en: ["Multi-role management.", "Security and performance.", "Code modularity."],
    },
    solutions: {
      fr: [
        "Eloquent ORM pour la gestion des relations.",
        "Système d'authentification robuste.",
        "Architecture MVC bien structurée.",
      ],
      en: [
        "Eloquent ORM for relationship management.",
        "Robust authentication system.",
        "Well-structured MVC architecture.",
      ],
    },
    features: {
      fr: ["Gestion des étudiants et enseignants.", "Administration complète.", "Suivi académique."],
      en: ["Student and teacher management.", "Full administration.", "Academic tracking."],
    },
  },
  {
    id: "elearning-platform",
    title: {
      fr: "Application E-Learning",
      en: "E-Learning Platform",
    },
    description: {
      fr: "Plateforme d'apprentissage en ligne interactive.",
      en: "Interactive online learning platform.",
    },
    fullDescription: {
      fr: "Application E-Learning en PHP MVC permettant d'accéder à des cours interactifs, de suivre sa progression et d'interagir avec des formateurs.",
      en: "PHP MVC E-Learning platform allowing users to access courses, track progress, and interact with instructors.",
    },
    technologies: ["PHP", "MVC", "MySQL", "Twig", "Bootstrap"],
    images: ["/images/projects/projet-web/workElearning.png"],
    category: "fullstack",
    featured: false,
    githubUrl: "https://github.com/steph2pro/e-learning.git",
    status: "completed",
    startDate: "2022-04-05",
    endDate: "2022-07-30",
    client: "Educational Institution",
    teamSize: 1,
    challenges: {
      fr: [
        "Gestion des cours et utilisateurs",
        "Interface interactive",
        "Authentification sécurisée"
      ],
      en: [
        "Course and user management",
        "Interactive interface",
        "Secure authentication"
      ]
    },
    solutions: {
      fr: [
        "Utilisation du modèle MVC",
        "Twig pour le templating",
        "Base de données MySQL relationnelle"
      ],
      en: [
        "MVC pattern usage",
        "Twig for templating",
        "Relational MySQL database"
      ]
    },
    features: {
      fr: [
        "Cours interactifs",
        "Suivi de progression",
        "Gestion des rôles",
        "Interface administrateur",
        "Système d'évaluation"
      ],
      en: [
        "Interactive courses",
        "Progress tracking",
        "Role management",
        "Admin interface",
        "Evaluation system"
      ]
    }
  },
  {
    id: "messaging-app",
    title: {
      fr: "Application de Messagerie",
      en: "Messaging Application",
    },
    description: {
      fr: "Application combinant messagerie instantanée et plateforme de publication.",
      en: "Application combining instant messaging and publication platform.",
    },
    fullDescription: {
      fr: "Cette application combine un système de messagerie instantanée et une plateforme de publication d'actualités. Les utilisateurs peuvent envoyer des messages privés, créer des publications et interagir via des commentaires et likes.",
      en: "This application combines an instant messaging system and a news publication platform. Users can send private messages, create posts and interact through comments and likes.",
    },
    technologies: [
      "PHP",
      "MVC",
      "MySQL",
      "AJAX",
      "WebSockets",
      "Bootstrap",
      "Node js"
    ],
    images: ["/images/projects/projet-web/workMessage.png"],
    category: "fullstack",
    featured: false,
    githubUrl: "https://github.com/steph2pro/messageApp.git",
    status: "completed",
    startDate: "2022-03-01",
    endDate: "2022-06-15",
    client: "Personal Project",
    teamSize: 1,
    challenges: {
      fr: [
        "Messagerie en temps réel",
        "Gestion des publications",
        "Interactions sociales"
      ],
      en: [
        "Real-time messaging",
        "Post management",
        "Social interactions"
      ]
    },
    solutions: {
      fr: [
        "WebSockets pour le temps réel",
        "Architecture MVC modulaire",
        "Système de notifications"
      ],
      en: [
        "WebSockets for real-time",
        "Modular MVC architecture",
        "Notification system"
      ]
    },
    features: {
      fr: [
        "Messagerie instantanée",
        "Publication d'actualités",
        "Commentaires et likes",
        "Système de followers",
        "Notifications en temps réel"
      ],
      en: [
        "Instant messaging",
        "News publication",
        "Comments and likes",
        "Follower system",
        "Real-time notifications"
      ]
    }
  },
  {
    id: "school-management-app",
    title: {
      fr: "Application de Gestion Scolaire",
      en: "School Management Application",
    },
    description: {
      fr: "Application web de gestion d'établissement scolaire.",
      en: "School management web application.",
    },
    fullDescription: {
      fr: "Application web qui permet la gestion d'un établissement scolaire notamment les salles de classe, les étudiants et le personnel.",
      en: "Web application for managing a school institution including classrooms, students and staff.",
    },
    technologies: ["PHP", "MVC", "MySQL", "JavaScript",
      "Node js"],
    images: ["/images/projects/projet-web/school.JPG"],
    category: "fullstack",
    featured: false,
    githubUrl: "https://github.com/steph2pro/school-manager.git",
    status: "completed",
    startDate: "2022-07-01",
    endDate: "2022-10-15",
    client: "Educational Institution",
    teamSize: 1,
    challenges: {
      fr: [
        "Gestion des salles de classe",
        "Administration des utilisateurs",
        "Rapports et statistiques"
      ],
      en: [
        "Classroom management",
        "User administration",
        "Reports and statistics"
      ]
    },
    solutions: {
      fr: [
        "Architecture MVC robuste",
        "Base de données relationnelle",
        "Interface d'administration"
      ],
      en: [
        "Robust MVC architecture",
        "Relational database",
        "Admin interface"
      ]
    },
    features: {
      fr: [
        "Gestion des salles de classe",
        "Administration des étudiants",
        "Gestion du personnel",
        "Rapports automatisés",
        "Interface administrateur"
      ],
      en: [
        "Classroom management",
        "Student administration",
        "Staff management",
        "Automated reports",
        "Admin interface"
      ]
    }
  },
  {
    id: "pressing-management-app",
    title: {
      fr: "Application de Gestion de Pressing",
      en: "Pressing Management Application",
    },
    description: {
      fr: "Application web de gestion complète pour pressing.",
      en: "Complete management web application for dry cleaning.",
    },
    fullDescription: {
      fr: "Application web qui permet de gérer et contrôler les différents aspects d'un Pressing. Fonctionnalités clés : gestion des clients, gestion des dépôts de vêtements, gestion des retraits, notification par email des clients lorsque leurs vêtements sont prêts.",
      en: "Web application for managing and controlling various aspects of a Dry Cleaner. Key features: customer management, clothing deposit management, withdrawal management, email notification to customers when their clothes are ready.",
    },
    technologies: ["PHP", "MVC", "MySQL", "Email API",
      "Node js"],
    images: ["/images/projects/projet-web/pressingApp.JPG"],
    category: "fullstack",
    featured: false,
    githubUrl: "https://github.com/steph2pro/MB-PressingApp2.git",
    status: "completed",
    startDate: "2022-11-01",
    endDate: "2023-01-15",
    client: "MB-Pressing",
    teamSize: 1,
    challenges: {
      fr: [
        "Gestion des stocks de vêtements",
        "Notifications automatiques",
        "Suivi des commandes"
      ],
      en: [
        "Clothing inventory management",
        "Automatic notifications",
        "Order tracking"
      ]
    },
    solutions: {
      fr: [
        "Système de suivi des commandes",
        "Intégration d'API email",
        "Base de données relationnelle"
      ],
      en: [
        "Order tracking system",
        "Email API integration",
        "Relational database"
      ]
    },
    features: {
      fr: [
        "Gestion des clients",
        "Dépôt et retrait de vêtements",
        "Notifications par email",
        "Suivi des commandes",
        "Rapports de gestion"
      ],
      en: [
        "Customer management",
        "Clothing deposit and withdrawal",
        "Email notifications",
        "Order tracking",
        "Management reports"
      ]
    }
  }
];