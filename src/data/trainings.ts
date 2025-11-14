// data/trainings.ts
import { Training } from '../types';
import { getFutureDate } from '../utils/futureDate';

export const trainingsData: Training[] = [
  {
    id: 'php-laravel-advanced',
    title: {
      fr: "Développement Web Avancé - PHP, Laravel, MySQL",
      en: "Advanced Web Development - PHP, Laravel, MySQL"
    },
    description: {
      fr: "Formation avancée en développement web avec PHP, le framework Laravel et MySQL pour créer des applications robustes et scalables.",
      en: "Advanced web development training with PHP, Laravel framework and MySQL to create robust and scalable applications."
    },
    category: 'backend',
    level: 'advanced',
    duration: '2 Mois',
    format: 'hybrid',
    price: {
      fr: "À partir de 120 000 XAF",
      en: "Starting from 120 000 XAF"
    },
    image: "/images/formations/php-laravel-advanced.JPG",
    objectives: {
      fr: [
        "Maîtriser PHP orienté objet avancé",
        "Développer des applications avec Laravel",
        "Concevoir et optimiser des bases de données MySQL",
        "Mettre en place l'authentification et la sécurité"
      ],
      en: [
        "Master advanced object-oriented PHP",
        "Develop applications with Laravel",
        "Design and optimize MySQL databases",
        "Implement authentication and security"
      ]
    },
    program: {
      fr: [
        "PHP avancé : namespaces, traits, générateurs",
        "Architecture MVC avec Laravel",
        "Eloquent ORM et relations avancées",
        "API REST avec Laravel",
        "Sécurité et validation des données",
        "Optimisation des performances"
      ],
      en: [
        "Advanced PHP: namespaces, traits, generators",
        "MVC architecture with Laravel",
        "Eloquent ORM and advanced relationships",
        "REST API with Laravel",
        "Security and data validation",
        "Performance optimization"
      ]
    },
    technologies: ["PHP 8", "Laravel", "MySQL", "Eloquent", "Composer"],
    featured: true,
    studentsCount: 150,
    rating: 4.8,
    nextSession: getFutureDate(2),
    institution: "Tech Training Center"
  },
  {
    id: 'flutter-mobile-complete',
    title: {
      fr: "Développement Mobile - Dart, Flutter, Firebase",
      en: "Mobile Development - Dart, Flutter, Firebase"
    },
    description: {
      fr: "Formation complète en développement d'applications mobiles cross-platform avec Dart, Flutter et Firebase.",
      en: "Complete training in cross-platform mobile application development with Dart, Flutter and Firebase."
    },
    category: 'mobile',
    level: 'beginner',
    duration: '4 Mois',
    format: 'in-person',
    price: {
      fr: "À partir de 140 000 XAF",
      en: "Starting from 140 000 XAF"
    },
    image: "/images/formations/flutter-mobile-complete.JPG",
    objectives: {
      fr: [
        "Maîtriser le langage Dart",
        "Développer des apps avec Flutter",
        "Intégrer Firebase pour le backend",
        "Publier sur les stores"
      ],
      en: [
        "Master Dart programming language",
        "Develop apps with Flutter",
        "Integrate Firebase for backend",
        "Publish to app stores"
      ]
    },
    program: {
      fr: [
        "Fondamentaux du langage Dart",
        "Widgets et interface utilisateur Flutter",
        "Gestion d'état avec Provider/Bloc",
        "Firebase Auth et Firestore",
        "Stockage cloud et bases de données temps réel",
        "Publication iOS et Android"
      ],
      en: [
        "Dart language fundamentals",
        "Flutter widgets and user interface",
        "State management with Provider/Bloc",
        "Firebase Auth and Firestore",
        "Cloud storage and real-time databases",
        "iOS and Android publishing"
      ]
    },
    technologies: ["Dart", "Flutter", "Firebase", "Provider", "Firestore"],
    featured: true,
    studentsCount: 180,
    rating: 4.7,
    nextSession: getFutureDate(4)
  },
  {
    id: 'general-computing',
    title: {
      fr: "Informatique Générale - Développement, Data, Bureautique",
      en: "General Computing - Development, Data, Office"
    },
    description: {
      fr: "Formation polyvalente couvrant le développement web, mobile, l'analyse de données, la bureautique professionnelle et l'infographie.",
      en: "Versatile training covering web development, mobile development, data analysis, professional office skills and graphic design."
    },
    category: 'web',
    level: 'beginner',
    duration: '8 semaines',
    format: 'in-person',
    price: {
      fr: "À partir de 50 000 XAF",
      en: "Starting from 50 000 XAF"
    },
    image: "/images/formations/general-computing.JPG",
    objectives: {
      fr: [
        "Acquérir des compétences informatiques complètes",
        "Maîtriser les outils de développement web et mobile",
        "Apprendre l'analyse de données et la bureautique",
        "Développer des compétences en infographie"
      ],
      en: [
        "Acquire comprehensive IT skills",
        "Master web and mobile development tools",
        "Learn data analysis and office automation",
        "Develop graphic design skills"
      ]
    },
    program: {
      fr: [
        "Développement web : HTML, CSS, JavaScript",
        "Développement mobile : concepts de base",
        "Analyse de données avec Excel et outils simples",
        "Suite bureautique professionnelle",
        "Infographie avec Photoshop/Illustrator",
        "Projet final intégrateur"
      ],
      en: [
        "Web development: HTML, CSS, JavaScript",
        "Mobile development: basic concepts",
        "Data analysis with Excel and simple tools",
        "Professional office suite",
        "Graphic design with Photoshop/Illustrator",
        "Final integrative project"
      ]
    },
    technologies: ["HTML/CSS", "JavaScript", "Excel", "Photoshop", "Office Suite"],
    featured: false,
    studentsCount: 95,
    rating: 4.6,
    nextSession: getFutureDate(2)
  },
  {
    id: 'spss-data-analysis',
    title: {
      fr: "Analyse de Données SPSS - Recherche et Statistiques",
      en: "SPSS Data Analysis - Research and Statistics"
    },
    description: {
      fr: "Formation complète à l'analyse statistique avec SPSS, de la création de bases de données à l'analyse avancée pour la recherche.",
      en: "Complete training in statistical analysis with SPSS, from database creation to advanced analysis for research."
    },
    category: 'data',
    level: 'intermediate',
    duration: '3 mois',
    format: 'online',
    price: {
      fr: "À partir de 100 000 XAF",
      en: "Starting from 100 000 XAF"
    },
    image: "/images/formations/spss-data-analysis.png",
    objectives: {
      fr: [
        "Créer et gérer des bases de données SPSS",
        "Maîtriser les statistiques descriptives",
        "Analyser les données croisées",
        "Conduire des analyses statistiques de base"
      ],
      en: [
        "Create and manage SPSS databases",
        "Master descriptive statistics",
        "Analyze cross-tabulated data",
        "Conduct basic statistical analysis"
      ]
    },
    program: {
      fr: [
        "Interface SPSS et gestion des données",
        "Création de bases de données et codification",
        "Statistiques descriptives : moyennes, médianes, écarts-types",
        "Tableaux croisés et tests du chi-deux",
        "Tests T et analyse de variance",
        "Corrélations et régression linéaire simple",
        "Assistance à la rédaction de projets de recherche"
      ],
      en: [
        "SPSS interface and data management",
        "Database creation and coding",
        "Descriptive statistics: means, medians, standard deviations",
        "Cross-tabulations and chi-square tests",
        "T-tests and variance analysis",
        "Correlations and simple linear regression",
        "Assistance with research project writing"
      ]
    },
    technologies: ["SPSS", "Excel", "Statistical Methods"],
    featured: false,
    studentsCount: 75,
    rating: 4.8,
    nextSession: getFutureDate(3)
  },
  {
    id: 'secretarial-office',
    title: {
      fr: "Secrétariat Bureautique Professionnel",
      en: "Professional Office Secretarial Skills"
    },
    description: {
      fr: "Formation complète aux compétences secrétariales modernes incluant la bureautique, la communication et la gestion professionnelle.",
      en: "Complete training in modern secretarial skills including office software, communication and professional management."
    },
    category: 'office',
    level: 'beginner',
    duration: '4 semaines',
    format: 'in-person',
    price: {
      fr: "À partir de 50 000 XAF",
      en: "Starting from 50 000 XAF"
    },
    image: "/images/formations/secretarial-office.JPG",
    objectives: {
      fr: [
        "Maîtriser les logiciels de bureautique",
        "Organiser et gérer les fichiers numériques",
        "Développer des compétences en communication",
        "Utiliser internet professionnellement"
      ],
      en: [
        "Master office software",
        "Organize and manage digital files",
        "Develop communication skills",
        "Use internet professionally"
      ]
    },
    program: {
      fr: [
        "Suite Microsoft Office complète",
        "Gestion électronique des documents",
        "Communication écrite et orale professionnelle",
        "Recherche internet avancée",
        "Pratiques professionnelles et éthique",
        "Organisation et gestion du temps"
      ],
      en: [
        "Complete Microsoft Office suite",
        "Electronic document management",
        "Professional written and oral communication",
        "Advanced internet research",
        "Professional practices and ethics",
        "Organization and time management"
      ]
    },
    technologies: ["Microsoft Office", "Google Workspace", "PDF Tools", "Communication Software"],
    featured: false,
    studentsCount: 120,
    rating: 4.5,
    nextSession: getFutureDate(1)
  },
  {
    id: 'web-development-internship',
    title: {
      fr: "Formation et Stage en Développement Web",
      en: "Web Development Training and Internship"
    },
    description: {
      fr: "Programme complet avec stage pratique couvrant l'analyse, le développement frontend/backend et la création d'APIs REST.",
      en: "Complete program with practical internship covering analysis, frontend/backend development and REST API creation."
    },
    category: 'backend',
    level: 'intermediate',
    duration: '12 semaines',
    format: 'hybrid',
    price: {
      fr: "À partir de 60 000 XAF",
      en: "Starting from 60 000 XAF"
    },
    image: "/images/formations/web-development-internship.png",
    objectives: {
      fr: [
        "Maîtriser UML et MERISE pour l'analyse",
        "Développer des interfaces modernes",
        "Créer des applications backend avec Laravel",
        "Développer des APIs REST",
        "Réaliser un projet complet avec stage"
      ],
      en: [
        "Master UML and MERISE for analysis",
        "Develop modern interfaces",
        "Create backend applications with Laravel",
        "Develop REST APIs",
        "Complete a project with internship"
      ]
    },
    program: {
      fr: [
        "Conception : UML et MERISE",
        "Frontend : HTML5, CSS3, JavaScript ES6",
        "Framework CSS : Bootstrap",
        "Backend PHP et bases de données",
        "Framework Laravel avancé",
        "JavaScript moderne et React",
        "Création d'API REST",
        "Stage pratique en entreprise"
      ],
      en: [
        "Design: UML and MERISE",
        "Frontend: HTML5, CSS3, JavaScript ES6",
        "CSS Framework: Bootstrap",
        "PHP backend and databases",
        "Advanced Laravel framework",
        "Modern JavaScript and React",
        "REST API creation",
        "Practical company internship"
      ]
    },
    technologies: ["UML", "HTML5", "CSS3", "JavaScript ES6", "Bootstrap", "PHP", "Laravel", "React", "REST API"],
    featured: true,
    studentsCount: 65,
    rating: 4.9,
    nextSession: "15 Avril 2024"
  },
  {
    id: 'fullstack-web-development',
    title: {
      fr: "Développement Web FullStack - HTML à Laravel",
      en: "FullStack Web Development - HTML to Laravel"
    },
    description: {
      fr: "Formation intensive FullStack couvrant le frontend moderne avec React et TypeScript, et le backend avec Laravel et PostgreSQL.",
      en: "Intensive FullStack training covering modern frontend with React and TypeScript, and backend with Laravel and PostgreSQL."
    },
    category: 'web',
    level: 'advanced',
    duration: '4 mois',
    format: 'online',
    price: {
      fr: "À partir de 100 000 XAF",
      en: "Starting from 100 000 XAF"
    },
    image: "/images/formations/fullstack-web-development.png",
    objectives: {
      fr: [
        "Développer des interfaces React avec TypeScript",
        "Créer des APIs robustes avec Laravel",
        "Maîtriser PostgreSQL avancé",
        "Déployer des applications complètes"
      ],
      en: [
        "Develop React interfaces with TypeScript",
        "Create robust APIs with Laravel",
        "Master advanced PostgreSQL",
        "Deploy complete applications"
      ]
    },
    program: {
      fr: [
        "HTML5 sémantique et CSS3 avancé",
        "JavaScript moderne et TypeScript",
        "React.js avec hooks avancés",
        "Laravel et architecture MVC",
        "PostgreSQL et optimisation BDD",
        "Intégration frontend/backend",
        "Déploiement et DevOps de base"
      ],
      en: [
        "Semantic HTML5 and advanced CSS3",
        "Modern JavaScript and TypeScript",
        "React.js with advanced hooks",
        "Laravel and MVC architecture",
        "PostgreSQL and database optimization",
        "Frontend/backend integration",
        "Deployment and basic DevOps"
      ]
    },
    technologies: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Laravel", "PostgreSQL"],
    featured: true,
    studentsCount: 110,
    rating: 4.7,
    nextSession: getFutureDate(2)
  },
  {
    id: 'standard-web-development',
    title: {
      fr: "Développement Web Standard - HTML5, CSS3, JavaScript",
      en: "Standard Web Development - HTML5, CSS3, JavaScript"
    },
    description: {
      fr: "Formation fondamentale aux technologies web de base pour créer des sites web modernes et responsives.",
      en: "Fundamental training in basic web technologies to create modern and responsive websites."
    },
    category: 'web',
    level: 'beginner',
    duration: '2 mois',
    format: 'hybrid',
    price: {
      fr: "À partir de 70 000 XAF",
      en: "Starting from 70 000 XAF"
    },
    image: "/images/formations/standard-web-development.JPG",
    objectives: {
      fr: [
        "Maîtriser HTML5 et CSS3",
        "Créer des sites web responsives",
        "Programmer en JavaScript ES5",
        "Déployer un site web"
      ],
      en: [
        "Master HTML5 and CSS3",
        "Create responsive websites",
        "Program in JavaScript ES5",
        "Deploy a website"
      ]
    },
    program: {
      fr: [
        "HTML5 : structure sémantique et formulaires",
        "CSS3 : flexbox, grid et animations",
        "JavaScript ES5 : bases de la programmation",
        "Responsive design et mobile-first",
        "Optimisation des performances",
        "Hébergement et déploiement"
      ],
      en: [
        "HTML5: semantic structure and forms",
        "CSS3: flexbox, grid and animations",
        "JavaScript ES5: programming basics",
        "Responsive design and mobile-first",
        "Performance optimization",
        "Hosting and deployment"
      ]
    },
    technologies: ["HTML5", "CSS3", "JavaScript ES5", "Responsive Design"],
    featured: false,
    studentsCount: 200,
    rating: 4.6,
    nextSession: getFutureDate(2)
  },
  {
    id: 'artificial-intelligence',
    title: {
      fr: "Utilisation de l'Intelligence Artificielle",
      en: "Artificial Intelligence Utilization"
    },
    description: {
      fr: "Formation pratique à l'utilisation des outils d'IA modernes pour améliorer la productivité et résoudre des problèmes complexes.",
      en: "Practical training in using modern AI tools to enhance productivity and solve complex problems."
    },
    category: 'cloud',
    level: 'beginner',
    duration: '2 semaines',
    format: 'online',
    price: {
      fr: "À partir de 25 000 XAf",
      en: "Starting from 25 000 XAf"
    },
    image: "/images/formations/artificial-intelligence.jpeg",
    objectives: {
      fr: [
        "Comprendre les bases de l'IA",
        "Utiliser les outils d'IA générative",
        "Automatiser des tâches avec l'IA",
        "Intégrer l'IA dans les workflows"
      ],
      en: [
        "Understand AI basics",
        "Use generative AI tools",
        "Automate tasks with AI",
        "Integrate AI into workflows"
      ]
    },
    program: {
      fr: [
        "Fondamentaux de l'intelligence artificielle",
        "Outils d'IA générative (ChatGPT, Midjourney, etc.)",
        "Prompt engineering et optimisation",
        "Automatisation de tâches répétitives",
        "IA pour la créativité et la résolution de problèmes",
        "Éthique et limites de l'IA"
      ],
      en: [
        "Artificial intelligence fundamentals",
        "Generative AI tools (ChatGPT, Midjourney, etc.)",
        "Prompt engineering and optimization",
        "Automation of repetitive tasks",
        "AI for creativity and problem solving",
        "Ethics and limitations of AI"
      ]
    },
    technologies: ["ChatGPT", "AI Tools", "Prompt Engineering", "Automation"],
    featured: true,
    studentsCount: 300,
    rating: 4.9,
    nextSession: getFutureDate(1)
  }
];