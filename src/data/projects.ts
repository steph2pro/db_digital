// import { Project } from "../types";

// export const projects: Project[] = [


// {
//     id: "perfectpay-app",
//     title: {
//       fr: "Application PerfectPay",
//       en: "PerfectPay App",
//     },
//     description: {
//       fr: "Application mobile de transactions financières pour dépôts, retraits et transferts sécurisés.",
//       en: "Mobile financial transactions app for secure deposits, withdrawals and transfers.",
//     },
//     fullDescription: {
//       fr: "PerfectPay est une application mobile de transactions financières, conçue pour faciliter les opérations de dépôt, de retrait et de transfert d’argent de manière rapide et sécurisée. Elle propose une interface intuitive, gestion sécurisée des comptes et suivi en temps réel des transactions.",
//       en: "PerfectPay is a mobile financial transactions app designed to simplify deposits, withdrawals and transfers quickly and securely. It provides an intuitive UI, secure account management and real-time transaction tracking.",
//     },
//     technologies: [
//       "Flutter",
//       "Clean Architecture",
//       "BLoC",
//       "Firebase Authentication",
//       "Cloud Firestore",
//       "SecureStorage",
//       "Dio",
//       "QR Code"
//     ],
//     images: ["/images/projects/projet-mobile/perfectpay.png"],
//     category: "mobile",
//     featured: true,
//     githubUrl: "https://github.com/steph2pro/perfectpay.git",
//     status: "completed",
//     startDate: "2023-08-01",
//     endDate: "2024-02-01",
//     client: "Private / Internal",
//     teamSize: 3,
//     challenges: {
//       fr: [
//         "Sécuriser les transactions et les tokens.",
//         "Offrir une UX fluide pour opérations financières rapides.",
//         "Synchronisation temps réel des opérations."
//       ],
//       en: [
//         "Securing transactions and tokens.",
//         "Deliver a smooth UX for fast financial operations.",
//         "Real-time synchronization of transactions."
//       ]
//     },
//     solutions: {
//       fr: [
//         "Utilisation de SecureStorage pour les tokens.",
//         "Flux BLoC clair pour la gestion d'état.",
//         "Cloud Firestore pour le suivi temps réel."
//       ],
//       en: [
//         "Used SecureStorage for tokens.",
//         "Clear BLoC flows for state management.",
//         "Cloud Firestore for real-time tracking."
//       ]
//     },
//     features: {
//       fr: [
//         "Dépôts / retraits / transferts",
//         "QR Code pour paiements rapides",
//         "Gestion sécurisée du PIN",
//         "Suivi en temps réel des transactions"
//       ],
//       en: [
//         "Deposits / withdrawals / transfers",
//         "QR Code for fast payments",
//         "Secure PIN management",
//         "Real-time transaction tracking"
//       ]
//     }
//   },
//   {
//     id: "nimmoapp-app",
//     title: {
//       fr: "Application NimmoApp",
//       en: "NimmoApp",
//     },
//     description: {
//       fr: "Application de location d’immobilier, terrains et véhicules avec géolocalisation et réservation.",
//       en: "Rental app for properties, lands and vehicles with geolocation and booking features.",
//     },
//     fullDescription: {
//       fr: "NimmoApp connecte propriétaires et locataires grâce à une interface moderne, intégrant géolocalisation, gestion des réservations et un flux d'annonces performant.",
//       en: "NimmoApp connects landlords and renters through a modern interface, integrating geolocation, bookings management and a performant listings flow.",
//     },
//     technologies: [
//       "Flutter",
//       "Clean Architecture",
//       "Riverpod",
//       "Firebase",
//       "Google Maps API",
//       "Dio",
//       "AutoRoute"
//     ],
//     images: ["/images/projects/projet-mobile/nimmoApp.png"],
//     category: "mobile",
//     featured: true,
//     githubUrl: "https://github.com/steph2pro/nimmoapp.git",
//     status: "completed",
//     startDate: "2023-03-01",
//     endDate: "2023-09-01",
//     client: "Real Estate Startup",
//     teamSize: 2,
//     challenges: {
//       fr: [
//         "Intégration cartes et géolocalisation performante.",
//         "Gestion des disponibilités et des réservations.",
//         "Affichage efficace des nombreuses annonces."
//       ],
//       en: [
//         "Integration of maps and performant geolocation.",
//         "Managing availability and bookings.",
//         "Efficient display of many listings."
//       ]
//     },
//     solutions: {
//       fr: [
//         "Google Maps API pour géolocalisation.",
//         "Architecture modulaire avec Riverpod.",
//         "Pagination et cache pour lister les annonces."
//       ],
//       en: [
//         "Google Maps API for geolocation.",
//         "Modular architecture with Riverpod.",
//         "Pagination and caching for listings."
//       ]
//     },
//     features: {
//       fr: [
//         "Recherche géolocalisée",
//         "Réservations et calendrier",
//         "Profil propriétaire / locataire",
//         "Notifications"
//       ],
//       en: [
//         "Geolocated search",
//         "Bookings and calendar",
//         "Owner / renter profiles",
//         "Notifications"
//       ]
//     }
//   },
//   {
//     id: "mymemolife-app",
//     title: {
//       fr: "Application MyMemoLife",
//       en: "MyMemoLife",
//     },
//     description: {
//       fr: "Application de prise de notes et journal intime sécurisée et personnalisable.",
//       en: "Notes and diary mobile app that is secure and customizable.",
//     },
//     fullDescription: {
//       fr: "MyMemoLife permet d’organiser des notes, garder des souvenirs et planifier le quotidien. L’app propose personnalisation, sécurité et synchronisation des données.",
//       en: "MyMemoLife helps organize notes, keep memories and plan daily life. The app offers customization, security and data sync.",
//     },
//     technologies: [
//       "Flutter",
//       "Clean Architecture",
//       "Riverpod",
//       "SQLite",
//       "Firebase Authentication",
//       "Dio",
//       "AutoRoute"
//     ],
//     images: ["/images/projects/projet-mobile/memoLife.png"],
//     category: "mobile",
//     featured: false,
//     githubUrl: "https://github.com/steph2pro/MyMomoLife.git",
//     status: "completed",
//     startDate: "2022-11-01",
//     endDate: "2023-02-28",
//     client: "Personal / Demo",
//     teamSize: 1,
//     challenges: {
//       fr: [
//         "Stockage local sécurisé et sync.",
//         "Offrir interface simple et personnalisable.",
//         "Gestion multimedia légère."
//       ],
//       en: [
//         "Secure local storage and sync.",
//         "Provide a simple and customizable UI.",
//         "Manage light multimedia content."
//       ]
//     },
//     solutions: {
//       fr: [
//         "SQLite pour stockage local.",
//         "Auth Firebase pour comptes sécurisés.",
//         "Design épuré et composants réutilisables."
//       ],
//       en: [
//         "SQLite for local storage.",
//         "Firebase Auth for secure accounts.",
//         "Clean UI and reusable components."
//       ]
//     },
//     features: {
//       fr: [
//         "Prise de notes rich-text",
//         "Journal intime sécurisé",
//         "Sauvegarde locale & sync",
//         "Thèmes et personnalisation"
//       ],
//       en: [
//         "Rich-text notes",
//         "Secure diary",
//         "Local backup & sync",
//         "Themes and customization"
//       ]
//     }
//   },











//   {
//     id: "millearnia-web",
//     title: {
//       fr: "Application Millearnia",
//       en: "Millearnia Application",
//     },
//     description: {
//       fr: "Plateforme d'orientation scolaire intelligente avec recommandations personnalisées.",
//       en: "Intelligent school orientation platform with personalized recommendations.",
//     },
//     fullDescription: {
//       fr: "Millearnia est une application d'orientation scolaire conçue pour aider les étudiants à choisir leur parcours académique et professionnel selon leurs compétences et intérêts. L’interface moderne et intuitive offre une expérience utilisateur fluide.",
//       en: "Millearnia is a school orientation application helping students choose academic and professional paths based on their skills and interests. It provides a modern and intuitive interface.",
//     },
//     technologies: [
//       "React",
//       "TypeScript",
//       "Tailwind CSS",
//       "React Query",
//       "Clean Architecture",
//       "Yup",
//       "Transactable",
//       "ShadCN",
//     ],
//     images: ["/images/projects/projet-web/workMillearnia.png"],
//     category: "web",
//     featured: true,
//     githubUrl: "https://github.com/steph2pro/Millearnia-web.git",
//     liveUrl: "https://millearnia.com",
//     status: "completed",
//     startDate: "2023-01-15",
//     endDate: "2023-06-20",
//     client: "Startup EdTech",
//     teamSize: 4,
//     challenges: {
//       fr: [
//         "Gérer les données complexes d'orientation scolaire.",
//         "Créer une interface intuitive pour différents profils.",
//         "Assurer des performances optimales des recommandations IA.",
//       ],
//       en: [
//         "Manage complex orientation data.",
//         "Build an intuitive UI for different profiles.",
//         "Ensure high performance of AI recommendations.",
//       ],
//     },
//     solutions: {
//       fr: [
//         "Utilisation de la Clean Architecture.",
//         "Design system cohérent avec Tailwind CSS.",
//         "API d'IA pour recommandations personnalisées.",
//       ],
//       en: [
//         "Implemented Clean Architecture.",
//         "Consistent design system using Tailwind CSS.",
//         "AI API integration for recommendations.",
//       ],
//     },
//     features: {
//       fr: [
//         "Tests de compétences interactifs.",
//         "Recommandations personnalisées.",
//         "Suivi de progression.",
//         "Interface multilingue.",
//         "Tableau de bord administrateur.",
//       ],
//       en: [
//         "Interactive skills tests.",
//         "Personalized recommendations.",
//         "Progress tracking.",
//         "Multilingual interface.",
//         "Admin dashboard.",
//       ],
//     },
//   },
//   {
//     id: "millearnia-backend",
//     title: {
//       fr: "Backend Millearnia",
//       en: "Millearnia Backend",
//     },
//     description: {
//       fr: "API sécurisée et performante pour l’application Millearnia.",
//       en: "Secure and performant API for the Millearnia app.",
//     },
//     fullDescription: {
//       fr: "Backend de Millearnia conçu avec AdonisJS pour fournir une API robuste gérant les utilisateurs, recommandations et interactions. Il repose sur Prisma, PostgreSQL et Firebase Auth pour la sécurité.",
//       en: "Millearnia backend built with AdonisJS, providing a robust API managing users, recommendations, and interactions. It uses Prisma, PostgreSQL, and Firebase Auth for security.",
//     },
//     technologies: [
//       "AdonisJS",
//       "Prisma",
//       "PostgreSQL",
//       "Supabase",
//       "Firebase Authentication",
//       "Vine Validator",
//     ],
//     images: ["/images/projects/projet-backend/workAdonis.png"],
//     category: "backend",
//     featured: true,
//     githubUrl: "https://github.com/steph2pro/backend-architecture.git",
//     status: "completed",
//     startDate: "2023-02-01",
//     endDate: "2023-06-01",
//     challenges: {
//       fr: [
//         "Assurer la sécurité des utilisateurs et des données.",
//         "Optimiser les performances de l’API.",
//         "Maintenir une architecture modulaire et scalable.",
//       ],
//       en: [
//         "Ensure user and data security.",
//         "Optimize API performance.",
//         "Maintain modular and scalable architecture.",
//       ],
//     },
//     solutions: {
//       fr: [
//         "Architecture MVC avec AdonisJS.",
//         "ORM Prisma pour la gestion des données.",
//         "Authentification Firebase sécurisée.",
//       ],
//       en: [
//         "MVC architecture with AdonisJS.",
//         "Prisma ORM for efficient database management.",
//         "Secure Firebase Authentication.",
//       ],
//     },
//     features: {
//       fr: [
//         "Gestion complète des utilisateurs.",
//         "Recommandations IA dynamiques.",
//         "API RESTful optimisée.",
//       ],
//       en: [
//         "Full user management.",
//         "Dynamic AI recommendations.",
//         "Optimized RESTful API.",
//       ],
//     },
//   },
//   {
//     id: "esmod-app",
//     title: {
//       fr: "Application ESMOD",
//       en: "ESMOD Application",
//     },
//     description: {
//       fr: "Système complet de gestion d’institut universitaire.",
//       en: "Comprehensive university management system.",
//     },
//     fullDescription: {
//       fr: "Application Laravel pour la gestion d’un institut universitaire (étudiants, enseignants, cours, notes, emplois du temps).",
//       en: "Laravel application for managing a university institute (students, teachers, courses, grades, timetables).",
//     },
//     technologies: [
//       "Laravel",
//       "Blade",
//       "MySQL",
//       "Livewire",
//       "Bootstrap",
//       "Tailwind CSS",
//     ],
//     images: ["/images/projects/projet-web/workEsmod.png"],
//     category: "fullstack",
//     featured: true,
//     githubUrl: "https://github.com/steph2pro/ESMOD-ScoolManagment.git",
//     status: "completed",
//     startDate: "2022-08-10",
//     endDate: "2022-12-30",
//     challenges: {
//       fr: ["Gestion de rôles multiples.", "Sécurité et performance.", "Modularité du code."],
//       en: ["Multi-role management.", "Security and performance.", "Code modularity."],
//     },
//     solutions: {
//       fr: [
//         "Eloquent ORM pour la gestion des relations.",
//         "Système d’authentification robuste.",
//         "Architecture MVC bien structurée.",
//       ],
//       en: [
//         "Eloquent ORM for relationship management.",
//         "Robust authentication system.",
//         "Well-structured MVC architecture.",
//       ],
//     },
//     features: {
//       fr: ["Gestion des étudiants et enseignants.", "Administration complète.", "Suivi académique."],
//       en: ["Student and teacher management.", "Full administration.", "Academic tracking."],
//     },
//   },
//   {
//     id: "elearning-platform",
//     title: {
//       fr: "Application E-Learning",
//       en: "E-Learning Platform",
//     },
//     description: {
//       fr: "Plateforme d’apprentissage en ligne interactive.",
//       en: "Interactive online learning platform.",
//     },
//     fullDescription: {
//       fr: "Application E-Learning en PHP MVC permettant d’accéder à des cours interactifs, de suivre sa progression et d’interagir avec des formateurs.",
//       en: "PHP MVC E-Learning platform allowing users to access courses, track progress, and interact with instructors.",
//     },
//     technologies: ["PHP", "MVC", "MySQL", "Twig", "Bootstrap"],
//     images: ["/images/projects/projet-web/workElearning.png"],
//     category: "web",
//     featured: false,
//     githubUrl: "https://github.com/steph2pro/e-learning.git",
//     status: "completed",
//     startDate: "2022-04-05",
//     endDate: "2022-07-30",
//     challenges: {
//       fr: ["Gestion des cours et utilisateurs.", "Interface interactive.", "Authentification sécurisée."],
//       en: ["Course and user management.", "Interactive interface.", "Secure authentication."],
//     },
//     solutions: {
//       fr: ["Utilisation du modèle MVC.", "Twig pour le templating.", "Base de données MySQL relationnelle."],
//       en: ["MVC pattern usage.", "Twig for templating.", "Relational MySQL database."],
//     },
//     features: {
//       fr: ["Cours interactifs.", "Suivi de progression.", "Gestion des rôles."],
//       en: ["Interactive courses.", "Progress tracking.", "Role management."],
//     },
//   },
//   {
//     id: "mb-pressing-site",
//     title: {
//       fr: "Site Web MB-Pressing",
//       en: "MB-Pressing Website",
//     },
//     description: {
//       fr: "Site vitrine professionnel avec partie administration dynamique.",
//       en: "Professional showcase website with dynamic admin panel.",
//     },
//     fullDescription: {
//       fr: "Site web de prestation de service pour l’entreprise MB-Pressing, permettant à l’administrateur d’ajouter du contenu dynamiquement.",
//       en: "Service website for MB-Pressing company with dynamic content management for admins.",
//     },
//     technologies: ["React", "Node.js", "Tailwind CSS"],
//     images: ["/images/projects/projet-web/pressing.JPG"],
//     category: "web",
//     featured: false,
//     liveUrl: "https://mb-pressing-infos-8owk.onrender.com",
//     status: "completed",
//     startDate: "2023-10-01",
//     challenges: {
//       fr: ["Dynamisation du contenu.", "Design réactif et professionnel."],
//       en: ["Dynamic content.", "Responsive professional design."],
//     },
//     solutions: {
//       fr: ["Utilisation de React et Tailwind.", "Back-office d’administration simple."],
//       en: ["React + Tailwind stack.", "Simple admin back-office."],
//     },
//     features: {
//       fr: ["Section services.", "Gestion dynamique du contenu."],
//       en: ["Services section.", "Dynamic content management."],
//     },
//   },
// //projet mobile
  
//   {
//     id: "myschool-app",
//     title: {
//       fr: "Application MySchool",
//       en: "MySchool",
//     },
//     description: {
//       fr: "Application éducative pour la présentation d’établissements scolaires et l’orientation.",
//       en: "Educational app for presenting schools and academic orientation.",
//     },
//     fullDescription: {
//       fr: "MySchool présente établissements, programmes et outils d'orientation pour aider élèves et parents à choisir leur parcours. Elle propose conseils personnalisés et contenu pédagogique.",
//       en: "MySchool showcases institutions, programs and orientation tools to help students and parents choose their paths. It provides personalized advice and educational content.",
//     },
//     technologies: [
//       "Flutter",
//       "BLoC Pattern",
//       "Clean Architecture",
//       "Firebase",
//       "Dio",
//       "AutoRoute"
//     ],
//     images: ["/images/projects/projet-mobile/schoolApp.png"],
//     category: "mobile",
//     featured: true,
//     githubUrl: "https://github.com/steph2pro/mySchoolApp.git",
//     status: "completed",
//     startDate: "2023-05-01",
//     endDate: "2023-09-15",
//     client: "Educational Institution",
//     teamSize: 3,
//     challenges: {
//       fr: [
//         "Structurer contenu éducatif varié.",
//         "Offrir navigation claire pour parents et élèves.",
//         "Multiplateforme et performance."
//       ],
//       en: [
//         "Structure varied educational content.",
//         "Provide clear navigation for parents and students.",
//         "Cross-platform performance."
//       ]
//     },
//     solutions: {
//       fr: [
//         "Architecture modulable avec BLoC.",
//         "Design épuré centré utilisateur.",
//         "Optimisations pour mobile et tablettes."
//       ],
//       en: [
//         "Modular architecture with BLoC.",
//         "Clean, user-centered design.",
//         "Optimizations for phones and tablets."
//       ]
//     },
//     features: {
//       fr: [
//         "Fiches programmes",
//         "Conseils d'orientation",
//         "Outils de recherche d'établissements",
//         "Multilingue"
//       ],
//       en: [
//         "Program profiles",
//         "Orientation advice",
//         "Institution search tools",
//         "Multilingual"
//       ]
//     }
//   },
//   {
//     id: "myproperties-app",
//     title: {
//       fr: "Application MyProperties",
//       en: "MyProperties",
//     },
//     description: {
//       fr: "Application de gestion de biens immobiliers pour agences et investisseurs.",
//       en: "Property management app for agencies and investors.",
//     },
//     fullDescription: {
//       fr: "MyProperties centralise la gestion, le suivi et la publication d'annonces immobilières, offrant des outils pour agences et particuliers afin d’optimiser la publication et le suivi des biens.",
//       en: "MyProperties centralizes management, tracking and publishing of property listings, providing tools for agencies and individuals to optimize publishing and monitoring of assets.",
//     },
//     technologies: [
//       "Flutter",
//       "Clean Architecture",
//       "BLoC Pattern",
//       "Firebase",
//       "Google Maps API",
//       "Dio",
//       "AutoRoute"
//     ],
//     images: ["/images/projects/projet-mobile/my_properties.png"],
//     category: "mobile",
//     featured: false,
//     githubUrl: "https://github.com/steph2pro/AppImmo.git",
//     status: "completed",
//     startDate: "2022-09-01",
//     endDate: "2023-01-15",
//     client: "Real Estate Clients",
//     teamSize: 2,
//     challenges: {
//       fr: [
//         "Gestion de grandes listes d'annonces.",
//         "Intégration cartographique efficace.",
//         "Filtrage et recherche performants."
//       ],
//       en: [
//         "Managing large listing volumes.",
//         "Efficient map integration.",
//         "High-performance filtering and search."
//       ]
//     },
//     solutions: {
//       fr: [
//         "Pagination côté client / cache.",
//         "Google Maps pour géolocalisation.",
//         "Filtres avancés et cache local."
//       ],
//       en: [
//         "Client-side pagination / caching.",
//         "Google Maps for geolocation.",
//         "Advanced filters and local cache."
//       ]
//     },
//     features: {
//       fr: [
//         "Publication d'annonces",
//         "Recherche filtrée",
//         "Géolocalisation des biens",
//         "Gestion contacts"
//       ],
//       en: [
//         "Publish listings",
//         "Filtered search",
//         "Property geolocation",
//         "Contact management"
//       ]
//     }
//   },
//   {
//     id: "mywellbeing-app",
//     title: {
//       fr: "Application My Wellbeing",
//       en: "My Wellbeing",
//     },
//     description: {
//       fr: "Application dédiée au bien-être et à la santé avec suivi d'habitudes et conseils personnalisés.",
//       en: "Wellbeing and health app with habit tracking and personalized advice.",
//     },
//     fullDescription: {
//       fr: "My Wellbeing aide les utilisateurs à suivre leurs habitudes, améliorer leur mode de vie et accéder à des conseils personnalisés pour une meilleure santé physique et mentale. L’app propose une interface moderne et des outils d'analyse.",
//       en: "My Wellbeing helps users track habits, improve lifestyles and access personalized advice for better physical and mental health. The app offers a modern interface and analytics tools.",
//     },
//     technologies: [
//       "Flutter",
//       "MVVM",
//       "Riverpod",
//       "SQLite",
//       "Dio",
//       "PHP (REST API)",
//       "AutoRoute"
//     ],
//     images: [
//       "/images/projects/projet-mobile/myWellbeing/page_principale.png",
//       "/images/projects/projet-mobile/myWellbeing/actualites.png",
//       "/images/projects/projet-mobile/myWellbeing/acceuil.png",
//       "/images/projects/projet-mobile/myWellbeing/compte.png",
//       ""
//     ],
//     category: "mobile",
//     featured: false,
//     githubUrl: "https://github.com/steph2pro/mywellbeingApp.git",
//     status: "completed",
//     startDate: "2023-02-01",
//     endDate: "2023-07-01",
//     client: "Health Startup",
//     teamSize: 2,
//     challenges: {
//       fr: [
//         "Collecte et stockage sécurisé de données sensibles.",
//         "Fournir recommandations personnalisées.",
//         "Conserver une UI engageante."
//       ],
//       en: [
//         "Collecting and securely storing sensitive data.",
//         "Providing personalized recommendations.",
//         "Maintaining an engaging UI."
//       ]
//     },
//     solutions: {
//       fr: [
//         "Stockage local avec SQLite + API sécurisée.",
//         "Algorithme simple de recommandation basé sur habitudes.",
//         "Design centrée utilisateur et micro-interactions."
//       ],
//       en: [
//         "Local storage with SQLite + secure API.",
//         "Simple recommendation algorithm based on habits.",
//         "User-centered design and micro-interactions."
//       ]
//     },
//     features: {
//       fr: [
//         "Suivi d'habitudes",
//         "Conseils personnalisés",
//         "Statistiques et historique",
//         "Mode hors-ligne"
//       ],
//       en: [
//         "Habit tracking",
//         "Personalized advice",
//         "Statistics and history",
//         "Offline mode"
//       ]
//     }
//   },
//   {
//     id: "millearnia-app",
//     title: {
//       fr: "Application Millearnia",
//       en: "Millearnia",
//     },
//     description: {
//       fr: "Application d'orientation scolaire et professionnelle avec recommandations personnalisées.",
//       en: "School and career orientation app with personalized recommendations.",
//     },
//     fullDescription: {
//       fr: "Millearnia aide les étudiants à choisir leur parcours académique et professionnel en fonction de leurs compétences et intérêts, via tests interactifs et recommandations personnalisées.",
//       en: "Millearnia helps students choose academic and career paths based on skills and interests, using interactive tests and personalized recommendations.",
//     },
//     technologies: [
//       "Flutter",
//       "Clean Architecture",
//       "BLoC",
//       "Firebase Authentication",
//       "Supabase (Postgres)",
//       "Dio",
//       "AutoRoute"
//     ],
//     images: ["/images/projects/projet-mobile/millearnia.png"],
//     category: "mobile",
//     featured: true,
//     githubUrl: "https://github.com/steph2pro/millearnia.git",
//     status: "completed",
//     startDate: "2023-01-15",
//     endDate: "2023-06-20",
//     client: "EdTech Startup",
//     teamSize: 4,
//     challenges: {
//       fr: [
//         "Collecte de données utilisateurs pertinentes.",
//         "Fournir recommandations précises et utiles.",
//         "Interface adaptée à des profils variés."
//       ],
//       en: [
//         "Collecting relevant user data.",
//         "Delivering accurate and useful recommendations.",
//         "UI adapted to varied profiles."
//       ]
//     },
//     solutions: {
//       fr: [
//         "Tests interactifs pour profilage.",
//         "Moteur de règles pour recommandations.",
//         "Design adaptatif pour tous les profils."
//       ],
//       en: [
//         "Interactive tests for profiling.",
//         "Rule engine for recommendations.",
//         "Adaptive design for all profiles."
//       ]
//     },
//     features: {
//       fr: [
//         "Tests de compétences",
//         "Recommandations personnalisées",
//         "Suivi de progression",
//         "Tableau de bord étudiant"
//       ],
//       en: [
//         "Skills tests",
//         "Personalized recommendations",
//         "Progress tracking",
//         "Student dashboard"
//       ]
//     }
//   },
//   {
//     id: "revvizer-app",
//     title: {
//       fr: "Application Revvizer",
//       en: "Revvizer",
//     },
//     description: {
//       fr: "Application d'aide à la révision et préparation aux examens pour étudiants.",
//       en: "Study and exam preparation app for students.",
//     },
//     fullDescription: {
//       fr: "Revvizer propose des cours adaptés, outils interactifs et suivi personnalisé pour optimiser l’apprentissage et la réussite académique.",
//       en: "Revvizer offers adapted courses, interactive tools and personalized tracking to optimize learning and academic success.",
//     },
//     technologies: [
//       "Flutter",
//       "BLoC",
//       "Clean Architecture",
//       "Firebase",
//       "Dio",
//       "AutoRoute"
//     ],
//     images: ["/images/projects/projet-mobile/revvizer.png"],
//     category: "mobile",
//     featured: false,
//     githubUrl: "https://github.com/steph2pro/Revvizer.git",
//     status: "completed",
//     startDate: "2022-10-01",
//     endDate: "2023-03-01",
//     client: "Education",
//     teamSize: 2,
//     challenges: {
//       fr: [
//         "Adapter contenus pour niveaux variés.",
//         "Maintenir engagement utilisateur.",
//         "Suivi des progrès efficace."
//       ],
//       en: [
//         "Adapt content for varied levels.",
//         "Maintain user engagement.",
//         "Effective progress tracking."
//       ]
//     },
//     solutions: {
//       fr: [
//         "Modules adaptatifs selon profil.",
//         "Gamification légère pour engagement.",
//         "Dashboards de performance."
//       ],
//       en: [
//         "Adaptive modules per profile.",
//         "Light gamification for engagement.",
//         "Performance dashboards."
//       ]
//     },
//     features: {
//       fr: [
//         "Cours modulaires",
//         "Quiz interactifs",
//         "Suivi personnalisé"
//       ],
//       en: [
//         "Modular courses",
//         "Interactive quizzes",
//         "Personalized tracking"
//       ]
//     }
//   },
//   {
//     id: "yougo-driver-app",
//     title: {
//       fr: "Application Yougo Driver",
//       en: "Yougo Driver",
//     },
//     description: {
//       fr: "Application de covoiturage connectant conducteurs et passagers avec suivi en temps réel.",
//       en: "Ridesharing app connecting drivers and passengers with real-time tracking.",
//     },
//     fullDescription: {
//       fr: "Yougo Driver facilite les déplacements en connectant conducteurs et passagers, avec suivi temps réel, gestion des trajets et sécurité renforcée.",
//       en: "Yougo Driver facilitates transportation by connecting drivers and passengers, with real-time tracking, trip management and enhanced security.",
//     },
//     technologies: [
//       "Flutter",
//       "Riverpod",
//       "Clean Architecture",
//       "Firebase",
//       "Google Maps",
//       "Dio",
//       "AutoRoute"
//     ],
//     images: ["/images/projects/projet-mobile/yougo_drive.png"],
//     category: "mobile",
//     featured: false,
//     githubUrl: "https://github.com/steph2pro/Yougo-drive.git",
//     status: "completed",
//     startDate: "2023-04-01",
//     endDate: "2023-09-01",
//     client: "Mobility Startup",
//     teamSize: 3,
//     challenges: {
//       fr: [
//         "Géolocalisation et suivi temps réel.",
//         "Sécurité des trajets et paiements.",
//         "Optimisation du matching conducteur/passager."
//       ],
//       en: [
//         "Geolocation and real-time tracking.",
//         "Trip and payment security.",
//         "Optimizing driver/passenger matching."
//       ]
//     },
//     solutions: {
//       fr: [
//         "Intégration Google Maps en temps réel.",
//         "Protocoles sécurisés pour paiements.",
//         "Algorithme simple de matching."
//       ],
//       en: [
//         "Real-time Google Maps integration.",
//         "Secure protocols for payments.",
//         "Simple matching algorithm."
//       ]
//     },
//     features: {
//       fr: [
//         "Réservation de trajets",
//         "Suivi en temps réel",
//         "Historique des courses"
//       ],
//       en: [
//         "Trip booking",
//         "Real-time tracking",
//         "Trip history"
//       ]
//     }
//   },
//   {
//     id: "crush-app",
//     title: {
//       fr: "Application Crush App",
//       en: "Crush App",
//     },
//     description: {
//       fr: "Application de rencontre moderne et sécurisée pour trouver des personnes compatibles.",
//       en: "Modern and secure dating app to find compatible people.",
//     },
//     fullDescription: {
//       fr: "Crush App aide les utilisateurs à rencontrer des personnes compatibles via un système de matching et une interface intuitive axée sur la sécurité et la confidentialité.",
//       en: "Crush App helps users meet compatible people via matching systems and an intuitive interface focused on security and privacy.",
//     },
//     technologies: [
//       "Flutter",
//       "Provider",
//       "Clean Architecture",
//       "Dio",
//       "Firebase",
//       "AutoRoute"
//     ],
//     images: [/* pas d'image fournie */],
//     category: "mobile",
//     featured: false,
//     githubUrl: "https://github.com/steph2pro/app-dev-1.git",
//     status: "completed",
//     startDate: "2022-06-01",
//     endDate: "2022-11-01",
//     client: "Personal / Demo",
//     teamSize: 2,
//     challenges: {
//       fr: [
//         "Assurer confiance et sécurité des utilisateurs.",
//         "Construire un matching pertinent.",
//         "Gérer médias utilisateurs efficacement."
//       ],
//       en: [
//         "Ensure user trust and security.",
//         "Build meaningful matching.",
//         "Efficiently manage user media."
//       ]
//     },
//     solutions: {
//       fr: [
//         "Système d'authentification robuste.",
//         "Logique de matching basée sur préférences.",
//         "Compression et stockage média optimisé."
//       ],
//       en: [
//         "Robust authentication system.",
//         "Matching logic based on preferences.",
//         "Optimized media compression and storage."
//       ]
//     },
//     features: {
//       fr: [
//         "Matching",
//         "Chats sécurisés",
//         "Profils personnalisables"
//       ],
//       en: [
//         "Matching",
//         "Secure chats",
//         "Customizable profiles"
//       ]
//     }
//   },
//   {
//     id: "game-store-app",
//     title: {
//       fr: "Application Game Store",
//       en: "Game Store",
//     },
//     description: {
//       fr: "Catalogue d'applications et jeux similaire à un store, avec navigation et découverte.",
//       en: "Catalog of apps and games similar to an app store, with discovery and navigation.",
//     },
//     fullDescription: {
//       fr: "Game Store propose un catalogue riche d'applications et jeux, avec pages détaillées, catégories et système de découverte pour aider l'utilisateur à trouver des contenus pertinents.",
//       en: "Game Store provides a rich catalog of apps and games with detailed pages, categories and discovery features to help users find relevant content.",
//     },
//     technologies: [
//       "Flutter",
//       "Clean Architecture",
//       "Dio",
//       "Firebase",
//       "AutoRoute"
//     ],
//     images: ["/images/projects/projet-mobile/game_store.png"],
//     category: "mobile",
//     featured: false,
//     githubUrl: "https://github.com/steph2pro/gameStore-app.git",
//     status: "completed",
//     startDate: "2021-09-01",
//     endDate: "2022-01-15",
//     client: "Personal / Portfolio",
//     teamSize: 1,
//     challenges: {
//       fr: [
//         "Afficher catalogue riche sans perte de performance.",
//         "Système de découverte pertinent.",
//         "Gestion médias et miniatures."
//       ],
//       en: [
//         "Show large catalog without performance loss.",
//         "Relevant discovery system.",
//         "Media and thumbnail handling."
//       ]
//     },
//     solutions: {
//       fr: [
//         "Pagination et lazy-loading.",
//         "Algorithme simple de recommandation.",
//         "Optimisation images et cache."
//       ],
//       en: [
//         "Pagination and lazy-loading.",
//         "Simple recommendation algorithm.",
//         "Image optimization and caching."
//       ]
//     },
//     features: {
//       fr: [
//         "Catalogue",
//         "Fiches détaillées",
//         "Système de recherche"
//       ],
//       en: [
//         "Catalog",
//         "Detail pages",
//         "Search system"
//       ]
//     }
//   },
//   {
//     id: "agropro-app",
//     title: {
//       fr: "Application Ago Pro",
//       en: "Agro Pro",
//     },
//     description: {
//       fr: "Application d’accompagnement pour agriculteurs avec conseils, prévisions et formations.",
//       en: "Farmers support app with advice, forecasting and training.",
//     },
//     fullDescription: {
//       fr: "Ago Pro fournit aux agriculteurs des recommandations techniques, des prévisions météorologiques et des ressources de formation pour améliorer les rendements et la durabilité.",
//       en: "Agro Pro provides farmers with technical recommendations, weather forecasts and training resources to improve yields and sustainability.",
//     },
//     technologies: [
//       "Flutter",
//       "Dio",
//       "PHP (REST API)",
//       "MySQL / SQLite",
//       "AutoRoute"
//     ],
//     images: ["/images/projects/projet-mobile/pasteque3.PNG"],
//     category: "mobile",
//     featured: false,
//     githubUrl: "https://github.com/steph2pro/AgroPro-2024.git",
//     status: "completed",
//     startDate: "2023-07-01",
//     endDate: "2023-12-01",
//     client: "Agriculture NGO",
//     teamSize: 2,
//     challenges: {
//       fr: [
//         "Fournir recommandations locales adaptées.",
//         "Intégration météo fiable.",
//         "Accessibilité hors-ligne."
//       ],
//       en: [
//         "Provide locally adapted recommendations.",
//         "Reliable weather integration.",
//         "Offline accessibility."
//       ]
//     },
//     solutions: {
//       fr: [
//         "API météo intégrée + cache local.",
//         "Modules de formation intégrés.",
//         "Mode hors-ligne pour conseils essentiels."
//       ],
//       en: [
//         "Weather API integration + local cache.",
//         "Integrated training modules.",
//         "Offline mode for essential advice."
//       ]
//     },
//     features: {
//       fr: [
//         "Conseils techniques",
//         "Prévisions météos",
//         "Ressources de formation"
//       ],
//       en: [
//         "Technical advice",
//         "Weather forecasts",
//         "Training resources"
//       ]
//     }
//   }












// ];
