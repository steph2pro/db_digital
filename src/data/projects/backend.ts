import { Project } from "../../types";

export const backendProjects: Project[] = [
  {
    id: "millearnia-backend",
    title: {
      fr: "Backend Millearnia",
      en: "Millearnia Backend",
    },
    description: {
      fr: "API sécurisée et performante pour l'application Millearnia.",
      en: "Secure and performant API for the Millearnia app.",
    },
    fullDescription: {
      fr: "Backend de Millearnia conçu avec AdonisJS pour fournir une API robuste gérant les utilisateurs, recommandations et interactions. Il repose sur Prisma, PostgreSQL et Firebase Auth pour la sécurité.",
      en: "Millearnia backend built with AdonisJS, providing a robust API managing users, recommendations, and interactions. It uses Prisma, PostgreSQL, and Firebase Auth for security.",
    },
    technologies: [
      "AdonisJS",
      "Prisma",
      "PostgreSQL",
      "Supabase",
      "Firebase Authentication",
      "Vine Validator",
    ],
    images: ["/images/projects/projet-backend/workAdonis.png"],
    category: "backend",
    featured: false,
    githubUrl: "https://github.com/steph2pro/backend-architecture.git",
    status: "completed",
    startDate: "2025-03-01",
    endDate: "2024-10-14",
    client: "Misofe Bafoussam CM",
    teamSize: 4,
    isPrivate:true,
    challenges: {
      fr: [
        "Assurer la sécurité des utilisateurs et des données",
        "Optimiser les performances de l'API",
        "Maintenir une architecture modulaire et scalable"
      ],
      en: [
        "Ensure user and data security",
        "Optimize API performance",
        "Maintain modular and scalable architecture"
      ]
    },
    solutions: {
      fr: [
        "Architecture MVC avec AdonisJS",
        "ORM Prisma pour la gestion des données",
        "Authentification Firebase sécurisée"
      ],
      en: [
        "MVC architecture with AdonisJS",
        "Prisma ORM for efficient database management",
        "Secure Firebase Authentication"
      ]
    },
    features: {
      fr: [
        "Gestion complète des utilisateurs",
        "Recommandations IA dynamiques",
        "API RESTful optimisée",
        "Sécurité des données avec validation",
        "Intégration Firebase Auth"
      ],
      en: [
        "Full user management",
        "Dynamic AI recommendations",
        "Optimized RESTful API",
        "Data security with validation",
        "Firebase Auth integration"
      ]
    }
  },
  {
    id: "devtech-management-backend",
    title: {
      fr: "Backend DevTech Management",
      en: "DevTech Management Backend",
    },
    description: {
      fr: "API robuste pour système de gestion d'entreprise IT avec architecture moderne.",
      en: "Robust API for IT company management system with modern architecture.",
    },
    fullDescription: {
      fr: "Backend complet pour l'application DevTech Management, implémentant une Clean Architecture avec AdonisJS. Gestion des produits, stocks, ventes, clients et fournisseurs avec une API performante et sécurisée. Intégration de Drizzle ORM pour des performances database optimales et validation robuste avec Vine.",
      en: "Complete backend for DevTech Management application, implementing Clean Architecture with AdonisJS. Management of products, inventory, sales, customers and suppliers with a performant and secure API. Drizzle ORM integration for optimal database performance and robust validation with Vine.",
    },
    technologies: [
      "AdonisJS",
      "Clean Architecture",
      "Drizzle ORM",
      "PostgreSQL",
      "Vine Validator",
      "JWT Authentication",
      "Redis",
      "Docker",
      "TypeScript",
      "API RESTful",
      "Data Caching",
      "WebSocket",
    ],
    images: [
      "/images/projects/projet-backend/backend-devtech.jpeg",
      "/images/projects/projet-backend/backend-devtech2.jpeg",
    ],
    category: "backend",
    featured: true,
    githubUrl: "https://github.com/steph2pro/devtech-management-backend.git",
    status: "completed",
    startDate: "2025-11-01",
    endDate: "2025-05-01",
    client: "DevTech Solutions",
    teamSize: 2,
    isPrivate:true,
    challenges: {
      fr: [
        "Implémentation de Clean Architecture dans AdonisJS",
        "Gestion de transactions complexes (stocks, ventes, facturation)",
        "Performances avec grandes volumes de données produits",
        "Sécurisation des données financières et clients",
        "Synchronisation en temps réel des stocks"
      ],
      en: [
        "Clean Architecture implementation in AdonisJS",
        "Management of complex transactions (inventory, sales, invoicing)",
        "Performance with large product data volumes",
        "Securing financial and customer data",
        "Real-time inventory synchronization"
      ]
    },
    solutions: {
      fr: [
        "Clean Architecture avec séparation Domain/Application/Infrastructure",
        "Drizzle ORM pour requêtes optimisées et type-safety",
        "Cache Redis pour données fréquemment accédées",
        "Validation robuste avec Vine Validator",
        "WebSocket pour mises à jour temps réel"
      ],
      en: [
        "Clean Architecture with Domain/Application/Infrastructure separation",
        "Drizzle ORM for optimized queries and type-safety",
        "Redis cache for frequently accessed data",
        "Robust validation with Vine Validator",
        "WebSocket for real-time updates"
      ]
    },
    features: {
      fr: [
        "API RESTful complète avec documentation Swagger",
        "Gestion des produits et catégories avec stocks",
        "Système de vente avec panier et facturation",
        "Gestion clients et historique d'achats",
        "Module fournisseurs et commandes d'achat",
        "Système d'authentification JWT sécurisé",
        "Cache Redis pour performances optimisées",
        "WebSocket pour notifications temps réel",
        "Système de rapports et statistiques",
        "Export de données (JSON, CSV)"
      ],
      en: [
        "Complete RESTful API with Swagger documentation",
        "Product and category management with inventory",
        "Sales system with cart and invoicing",
        "Customer management and purchase history",
        "Suppliers module and purchase orders",
        "Secure JWT authentication system",
        "Redis cache for optimized performance",
        "WebSocket for real-time notifications",
        "Reporting system and statistics",
        "Data export (JSON, CSV)"
      ]
    },
    testimonials: [
      {
        name: "Thomas Dubois",
        role: "CEO DevTech Solutions",
        text: {
          fr: "Le backend développé par Stéphane a considérablement amélioré l'efficacité de notre gestion d'entreprise. L'architecture est solide et les performances sont exceptionnelles.",
          en: "The backend developed by Stéphane significantly improved our business management efficiency. The architecture is robust and the performance is exceptional."
        },
        avatar: "/images/testimonials/thomas-dubois.jpg"
      }
    ]
  },
  {
    id: "school-management-backend",
    title: {
      fr: "Backend School Management",
      en: "School Management Backend",
    },
    description: {
      fr: "API Laravel pour système de gestion scolaire complet.",
      en: "Laravel API for complete school management system.",
    },
    fullDescription: {
      fr: "Backend robuste développé avec Laravel pour un système de gestion scolaire complet. Gestion des étudiants, enseignants, cours, notes, emplois du temps et inscriptions. Architecture MVC avec Eloquent ORM pour une gestion efficace des relations complexes entre entités éducatives.",
      en: "Robust backend developed with Laravel for a complete school management system. Management of students, teachers, courses, grades, schedules and enrollments. MVC architecture with Eloquent ORM for efficient management of complex relationships between educational entities.",
    },
    technologies: [
      "Laravel",
      "PHP 8.x",
      "MySQL",
      "Eloquent ORM",
      "RESTful API",
      "JWT Authentication",
      "Laravel Sanctum",
      "Laravel Validation",
      "Laravel Migrations",
      "Laravel Seeding",
      "API Resources",
      "Middleware"
    ],
    images: [
      "/images/projects/projet-backend/backend.jpeg",
    ],
    category: "backend",
    featured: false,
    githubUrl: "https://github.com/steph2pro/ESMOD-ScoolManagment",
    status: "completed",
    startDate: "2022-08-01",
    endDate: "2022-12-15",
    client: "Educational Institution",
    teamSize: 2,
    challenges: {
      fr: [
        "Gestion des relations complexes (étudiants-cours-enseignants)",
        "Système de notes et calculs de moyennes",
        "Gestion des emplois du temps avec contraintes",
        "Sécurité des données étudiants sensibles",
        "Performance avec nombreux utilisateurs simultanés"
      ],
      en: [
        "Management of complex relationships (students-courses-teachers)",
        "Grading system and average calculations",
        "Schedule management with constraints",
        "Security of sensitive student data",
        "Performance with multiple concurrent users"
      ]
    },
    solutions: {
      fr: [
        "Architecture MVC structurée avec Laravel",
        "Eloquent ORM pour relations avancées",
        "Validation Laravel robuste pour l'intégrité des données",
        "JWT avec Laravel Sanctum pour l'authentification",
        "Optimisation des requêtes avec eager loading"
      ],
      en: [
        "Structured MVC architecture with Laravel",
        "Eloquent ORM for advanced relationships",
        "Robust Laravel validation for data integrity",
        "JWT with Laravel Sanctum for authentication",
        "Query optimization with eager loading"
      ]
    },
    features: {
      fr: [
        "Gestion complète des étudiants et profils",
        "Module enseignants avec attribution de cours",
        "Système de cours et programmes d'études",
        "Gestion des notes et calcul de moyennes",
        "Emplois du temps avec contraintes de salles",
        "Système d'inscription et de prérequis",
        "API RESTful sécurisée avec JWT",
        "Rôles et permissions (Admin, Enseignant, Étudiant)",
        "Export de données académiques",
        "Système de notifications et alertes"
      ],
      en: [
        "Complete student and profile management",
        "Teachers module with course assignment",
        "Course and curriculum system",
        "Grading system and average calculation",
        "Schedules with room constraints",
        "Enrollment system and prerequisites",
        "Secure RESTful API with JWT",
        "Roles and permissions (Admin, Teacher, Student)",
        "Academic data export",
        "Notification and alert system"
      ]
    },
    testimonials: [
      {
        name: "Dr. Marie Laurent",
        role: "Directrice d'Établissement",
        text: {
          fr: "Le système backend a révolutionné notre gestion administrative. Les performances sont excellentes et l'interface API est très bien documentée.",
          en: "The backend system revolutionized our administrative management. The performance is excellent and the API interface is very well documented."
        },
        avatar: "/images/testimonials/marie-laurent.jpg"
      }
    ]
  },
  {
    id: "pts-backend",
    title: {
      fr: "PTS Backend - Plateforme de Voyage",
      en: "PTS Backend - Travel Platform"
    },
    description: {
      fr: "Backend complet pour plateforme de voyage Patrick Travel Service avec API robuste et sécurisée.",
      en: "Complete backend for Patrick Travel Service travel platform with robust and secure API."
    },
    fullDescription: {
      fr: "Backend développé avec AdonisJS pour la plateforme de voyage Patrick Travel Service. Gestion complète des réservations, vols, hôtels, utilisateurs et paiements. Architecture modulaire avec système d'authentification avancé, gestion des rôles et API RESTful performante pour une plateforme de voyage complète.",
      en: "Backend developed with AdonisJS for the Patrick Travel Service platform. Complete management of bookings, flights, hotels, users and payments. Modular architecture with advanced authentication system, role management and performant RESTful API for a complete travel platform."
    },
    technologies: [
      "AdonisJS",
      "Node.js",
      "PostgreSQL",
      "JWT Authentication",
      "RESTful API",
      "Lucid ORM",
      "Validator",
      "Redis",
      "Docker",
      "Swagger",
      "Email Service",
      "Payment Integration"
    ],
    images: [
      "/images/projects/projet-backend/backend.jpeg",
    ],
    category: "backend",
    featured: true,
    githubUrl: "https://github.com/steph2pro/pts-backend",
    status: "completed",
    startDate: "2023-09-01",
    endDate: "2024-01-15",
    client: "Patrick Travel Service",
    teamSize: 3,
    challenges: {
      fr: [
        "Gestion complexe des réservations et disponibilités",
        "Système de paiement sécurisé et fiable",
        "Synchronisation des données en temps réel",
        "Gestion des annulations et remboursements",
        "Performance avec haute charge utilisateur"
      ],
      en: [
        "Complex management of bookings and availability",
        "Secure and reliable payment system",
        "Real-time data synchronization",
        "Management of cancellations and refunds",
        "Performance under high user load"
      ]
    },
    solutions: {
      fr: [
        "Architecture modulaire avec AdonisJS",
        "ORM Lucid pour gestion des relations complexes",
        "Système de transactions pour l'intégrité des données",
        "Cache Redis pour les données fréquemment consultées",
        "API documentée avec Swagger"
      ],
      en: [
        "Modular architecture with AdonisJS",
        "Lucid ORM for complex relationship management",
        "Transaction system for data integrity",
        "Redis cache for frequently accessed data",
        "Documented API with Swagger"
      ]
    },
    features: {
      fr: [
        "Gestion complète des utilisateurs et profils",
        "Système de réservation vols/hôtels/activités",
        "Intégration paiement sécurisée",
        "Gestion des disponibilités en temps réel",
        "Système de promotion et codes de réduction",
        "Notifications email et push",
        "Gestion des annulations et remboursements",
        "Rapports et statistiques de réservation",
        "API RESTful complètement documentée",
        "Système de rôles et permissions"
      ],
      en: [
        "Complete user and profile management",
        "Flight/hotel/activity booking system",
        "Secure payment integration",
        "Real-time availability management",
        "Promotion and discount code system",
        "Email and push notifications",
        "Cancellation and refund management",
        "Booking reports and statistics",
        "Fully documented RESTful API",
        "Role and permission system"
      ]
    },
    testimonials: [
      {
        name: "Patrick Nkono",
        role: "Fondateur Patrick Travel Service",
        text: {
          fr: "Le backend développé par Stéphane a permis à notre plateforme de voyage de gérer des milliers de réservations avec une fiabilité exceptionnelle. L'architecture est solide et l'API très bien conçue.",
          en: "The backend developed by Stéphane allowed our travel platform to manage thousands of bookings with exceptional reliability. The architecture is robust and the API is very well designed."
        },
        avatar: "/images/testimonials/patrick-nkono.jpg"
      }
    ]
  },
  {
    id: "pressing-pro-backend",
    title: {
      fr: "Pressing Pro Backend - Gestion de Pressing",
      en: "Pressing Pro Backend - Dry Cleaning Management"
    },
    description: {
      fr: "Backend Laravel pour application de gestion complète de pressing avec suivi des commandes et clients.",
      en: "Laravel backend for complete dry cleaning management application with order and customer tracking."
    },
    fullDescription: {
      fr: "Backend robuste développé avec Laravel pour une application de gestion de pressing. Gestion complète des commandes, clients, stocks, employés et finances. Système de suivi en temps réel des commandes, génération de factures et rapports détaillés pour une gestion optimale d'un pressing moderne.",
      en: "Robust backend developed with Laravel for a dry cleaning management application. Complete management of orders, customers, inventory, employees and finances. Real-time order tracking system, invoice generation and detailed reports for optimal management of a modern dry cleaner."
    },
    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "Eloquent ORM",
      "RESTful API",
      "JWT Authentication",
      "Laravel Sanctum",
      "Laravel Queue",
      "PDF Generation",
      "Email Notification",
      "API Resources"
    ],
    images: [
      "/images/projects/projet-backend/backend.jpeg",
    ],
    category: "backend",
    featured: false,
    githubUrl: "https://github.com/steph2pro/pressing_pro-backend",
    status: "completed",
    startDate: "2023-05-01",
    endDate: "2023-08-15",
    client: "Pressing Pro",
    teamSize: 2,
    challenges: {
      fr: [
        "Gestion du cycle complet des commandes (dépôt, traitement, livraison)",
        "Suivi en temps réel du statut des vêtements",
        "Gestion des stocks de produits de nettoyage",
        "Système de facturation automatique",
        "Notifications clients pour retrait des commandes"
      ],
      en: [
        "Management of complete order cycle (deposit, processing, delivery)",
        "Real-time tracking of clothing status",
        "Management of cleaning product inventory",
        "Automatic invoicing system",
        "Customer notifications for order pickup"
      ]
    },
    solutions: {
      fr: [
        "Architecture MVC robuste avec Laravel",
        "Eloquent ORM pour relations complexes commandes-clients",
        "Système de queues pour envoi d'emails asynchrone",
        "Génération PDF pour factures et reçus",
        "API sécurisée avec Laravel Sanctum"
      ],
      en: [
        "Robust MVC architecture with Laravel",
        "Eloquent ORM for complex order-customer relationships",
        "Queue system for asynchronous email sending",
        "PDF generation for invoices and receipts",
        "Secure API with Laravel Sanctum"
      ]
    },
    features: {
      fr: [
        "Gestion complète des commandes et suivi en temps réel",
        "Base de données clients avec historique des commandes",
        "Gestion des stocks de produits et matériaux",
        "Système de facturation et paiements",
        "Gestion des employés et plannings",
        "Rapports financiers et statistiques",
        "Notifications SMS/email pour les clients",
        "Génération automatique de factures PDF",
        "API mobile pour application compagnon",
        "Système de promotions et fidélité"
      ],
      en: [
        "Complete order management and real-time tracking",
        "Customer database with order history",
        "Product and material inventory management",
        "Invoicing and payment system",
        "Employee and schedule management",
        "Financial reports and statistics",
        "SMS/email notifications for customers",
        "Automatic PDF invoice generation",
        "Mobile API for companion app",
        "Promotion and loyalty system"
      ]
    }
  },
  {
    id: "ecommerce-backend",
    title: {
      fr: "Ecommerce Backend - Vente d'Électronique",
      en: "Ecommerce Backend - Electronics Sales"
    },
    description: {
      fr: "Backend Laravel pour plateforme e-commerce spécialisée en appareils électroniques.",
      en: "Laravel backend for e-commerce platform specialized in electronic devices."
    },
    fullDescription: {
      fr: "Backend complet développé avec Laravel pour une plateforme e-commerce de vente d'appareils électroniques. Gestion des produits, catégories, paniers, commandes, paiements et livraisons. Architecture scalable avec système de recommandations, gestion des stocks avancée et intégration de multiples gateways de paiement.",
      en: "Complete backend developed with Laravel for an e-commerce platform selling electronic devices. Management of products, categories, carts, orders, payments and deliveries. Scalable architecture with recommendation system, advanced inventory management and integration of multiple payment gateways."
    },
    technologies: [
      "Laravel",
      "PHP 8.x",
      "MySQL",
      "Eloquent ORM",
      "RESTful API",
      "Payment Gateway",
      "Laravel Passport",
      "Redis Caching",
      "Queue System",
      "Search Engine",
      "API Rate Limiting"
    ],
    images: [
      "/images/projects/projet-backend/backend.jpeg",
    ],
    category: "backend",
    featured: true,
    githubUrl: "https://github.com/steph2pro/ecomerce_backend",
    status: "completed",
    startDate: "2023-03-01",
    endDate: "2023-07-20",
    client: "TechStore Ecommerce",
    teamSize: 3,
    challenges: {
      fr: [
        "Gestion de catalogue produit complexe avec multiples variantes",
        "Système de panier et commandes haute performance",
        "Intégration de multiples gateways de paiement",
        "Gestion des stocks en temps réel",
        "Système de recommandations personnalisées"
      ],
      en: [
        "Management of complex product catalog with multiple variants",
        "High performance cart and order system",
        "Integration of multiple payment gateways",
        "Real-time inventory management",
        "Personalized recommendation system"
      ]
    },
    solutions: {
      fr: [
        "Architecture API RESTful scalable avec Laravel",
        "Eloquent ORM pour relations produits-catégories avancées",
        "Cache Redis pour performances des requêtes produits",
        "Système de queues pour traitement asynchrone",
        "Algorithme de recommandations basé sur l'historique"
      ],
      en: [
        "Scalable RESTful API architecture with Laravel",
        "Eloquent ORM for advanced product-category relationships",
        "Redis cache for product query performance",
        "Queue system for asynchronous processing",
        "Recommendation algorithm based on history"
      ]
    },
    features: {
      fr: [
        "Gestion complète du catalogue produits avec variantes",
        "Système de panier utilisateur persistant",
        "Processus de commande et paiement sécurisé",
        "Gestion des stocks et alertes de réapprovisionnement",
        "Système de recommandations personnalisées",
        "Gestion des avis et notations produits",
        "Module de livraison et suivi colis",
        "Système de promotion et codes promo",
        "API admin pour gestion complète",
        "Rapports de vente et analytiques"
      ],
      en: [
        "Complete product catalog management with variants",
        "Persistent user cart system",
        "Secure order and payment process",
        "Inventory management and restocking alerts",
        "Personalized recommendation system",
        "Product reviews and ratings management",
        "Delivery and package tracking module",
        "Promotion and promo code system",
        "Admin API for complete management",
        "Sales reports and analytics"
      ]
    },
    testimonials: [
      {
        name: "Sarah Chen",
        role: "CEO TechStore",
        text: {
          fr: "Le backend e-commerce a parfaitement géré notre croissance avec des milliers de produits et commandes. Les performances sont excellentes et l'API est très flexible.",
          en: "The e-commerce backend perfectly handled our growth with thousands of products and orders. The performance is excellent and the API is very flexible."
        },
        avatar: "/images/testimonials/sarah-chen.jpg"
      }
    ]
  },
  {
    id: "adonis-api-prisma",
    title: {
      fr: "Adonis API Prisma - CRUD Avancé",
      en: "Adonis API Prisma - Advanced CRUD"
    },
    description: {
      fr: "API CRUD moderne avec AdonisJS et Prisma pour gestion utilisateurs, livres et catégories.",
      en: "Modern CRUD API with AdonisJS and Prisma for users, books and categories management."
    },
    fullDescription: {
      fr: "API RESTful moderne développée avec AdonisJS et Prisma ORM. Démonstration d'implémentation CRUD complète pour la gestion d'utilisateurs, livres et catégories avec relations avancées. Architecture propre avec validation robuste, pagination, filtres et système d'authentification JWT.",
      en: "Modern RESTful API developed with AdonisJS and Prisma ORM. Demonstration of complete CRUD implementation for users, books and categories management with advanced relationships. Clean architecture with robust validation, pagination, filters and JWT authentication system."
    },
    technologies: [
      "AdonisJS",
      "Prisma ORM",
      "PostgreSQL",
      "TypeScript",
      "RESTful API",
      "JWT Authentication",
      "Input Validation",
      "Pagination",
      "Filtering",
      "Swagger Documentation",
      "Docker"
    ],
    images: [
      "/images/projects/projet-backend/backend.jpeg",
    ],
    category: "backend",
    featured: false,
    githubUrl: "https://github.com/steph2pro/adonis-api-prisma",
    status: "completed",
    startDate: "2024-01-10",
    endDate: "2024-02-28",
    client: "Personal Project",
    teamSize: 1,
    challenges: {
      fr: [
        "Intégration fluide de Prisma ORM avec AdonisJS",
        "Gestion des relations complexes utilisateurs-livres-catégories",
        "Système de validation robuste et cohérent",
        "Pagination et filtres avancés pour les requêtes",
        "Documentation API complète et automatique"
      ],
      en: [
        "Smooth integration of Prisma ORM with AdonisJS",
        "Management of complex user-book-category relationships",
        "Robust and consistent validation system",
        "Pagination and advanced filters for queries",
        "Complete and automatic API documentation"
      ]
    },
    solutions: {
      fr: [
        "Configuration Prisma optimisée pour AdonisJS",
        "Schéma de base de données relationnel bien structuré",
        "Validation des données avec le validateur intégré d'Adonis",
        "Système de pagination et filtres réutilisables",
        "Génération automatique de documentation Swagger"
      ],
      en: [
        "Prisma configuration optimized for AdonisJS",
        "Well-structured relational database schema",
        "Data validation with Adonis built-in validator",
        "Reusable pagination and filter system",
        "Automatic Swagger documentation generation"
      ]
    },
    features: {
      fr: [
        "CRUD complet pour utilisateurs avec authentification",
        "Gestion des livres avec relations auteurs-catégories",
        "Système de catégories hiérarchique",
        "API RESTful avec endpoints bien structurés",
        "Pagination et filtres avancés",
        "Validation robuste des données d'entrée",
        "Système d'authentification JWT sécurisé",
        "Documentation API interactive avec Swagger",
        "Conteneurisation Docker pour déploiement",
        "Tests unitaires et d'intégration"
      ],
      en: [
        "Complete CRUD for users with authentication",
        "Books management with author-category relationships",
        "Hierarchical category system",
        "RESTful API with well-structured endpoints",
        "Pagination and advanced filters",
        "Robust input data validation",
        "Secure JWT authentication system",
        "Interactive API documentation with Swagger",
        "Docker containerization for deployment",
        "Unit and integration tests"
      ]
    }
  }
];