export interface Experience {
  period: string;
  role: { fr: string; en: string };
  company: string;
  description: { fr: string; en: string };
  technologies: string[];
}

export interface Education {
  year: string;
  degree: { fr: string; en: string };
  school: string;
  description: { fr: string; en: string };
}

export const experiences: Experience[] = [
  {
    period: "2025 - Présent",
    role: { 
      fr: "Développeur Full-Stack Web & Mobile Freelance", 
      en: "Full-Stack Web & Mobile Freelance Developer" 
    },
    company: "Indépendant",
    description: {
      fr: "Développement d'applications web et mobiles sur mesure pour clients internationaux. Expertise en React.js, Next.js, Flutter et Node.js. Conception d'architectures scalables, intégration d'APIs et déploiement de solutions cloud.",
      en: "Development of custom web and mobile applications for international clients. Expertise in React.js, Next.js, Flutter and Node.js. Design of scalable architectures, API integration and cloud solution deployment."
    },
    technologies: ["React.js", "Next.js", "Flutter", "Node.js", "TypeScript", "Firebase", "AWS", "Docker"]
  },
  {
    period: "2025",
    role: { 
      fr: "Développeur Front-End Web & Mobile", 
      en: "Front-End Web & Mobile Developer" 
    },
    company: "KAKOTEL Douala",
    description: {
      fr: "Développement d'interfaces utilisateurs pour solutions de paiement en ligne avec React.js. Développement de modules de paiement mobile avec Flutter. Intégration d'API de paiement et optimisation des performances.",
      en: "Development of user interfaces for online payment solutions with React.js. Mobile payment module development with Flutter. Payment API integration and performance optimization."
    },
    technologies: ["React.js", "Flutter", "Dart", "REST API", "BLoC", "Provider", "Android", "iOS"]
  },
  {
    period: "2022 - 2023",
    role: { 
      fr: "Développeur Full-Stack Web & Mobile", 
      en: "Full-Stack Web & Mobile Developer" 
    },
    company: "MiSofe Bafoussam",
    description: {
      fr: "Conception et développement d'une plateforme de suivi scolaire avec React.js et AdonisJS. Développement d'application mobile multiplateforme avec Flutter. Gestion de bases de données PostgreSQL/MySQL.",
      en: "Design and development of a school monitoring platform with React.js and AdonisJS. Cross-platform mobile application development with Flutter. PostgreSQL/MySQL database management."
    },
    technologies: ["React.js", "AdonisJS", "Flutter", "PostgreSQL", "MySQL", "RESTful API"]
  },
  {
    period: "2021 - 2022",
    role: { 
      fr: "Développeur Web Full-Stack", 
      en: "Full-Stack Web Developer" 
    },
    company: "Genious Concept",
    description: {
      fr: "Développement d'applications web responsive avec React, Angular et Vue.js. Création d'API RESTful avec Laravel. Optimisation des performances et déploiement de sites web.",
      en: "Development of responsive web applications with React, Angular and Vue.js. RESTful API creation with Laravel. Performance optimization and website deployment."
    },
    technologies: ["React", "Angular", "Vue.js", "Laravel", "React Query", "REST API"]
  },
  {
    period: "2021 - 2024",
    role: { 
      fr: "Formateur & Enseignant en Développement", 
      en: "Development Trainer & Teacher" 
    },
    company: "ADA, Digital Solution, ISSTECOA",
    description: {
      fr: "Animation de formations en technologies web et mobile. Enseignement du génie logiciel et encadrement de projets académiques. Formation sur React, Laravel, Flutter et bonnes pratiques de développement.",
      en: "Leading training sessions in web and mobile technologies. Teaching software engineering and supervising academic projects. Training on React, Laravel, Flutter and development best practices."
    },
    technologies: ["React", "Laravel", "Flutter", "Angular", "Git", "Methodologies Agiles"]
  }
];

export const education: Education[] = [
  {
    year: "2024",
    degree: { 
      fr: "Master 1 en Génie Logiciel", 
      en: "Master 1 in Software Engineering" 
    },
    school: "INSAM Bafoussam",
    description: {
      fr: "Formation avancée en génie logiciel, architectures logicielles et méthodologies de développement.",
      en: "Advanced training in software engineering, software architectures and development methodologies."
    }
  },
  {
    year: "2023",
    degree: { 
      fr: "Licence en Conception et Développement Réseau Internet", 
      en: "Bachelor's in Internet Network Design and Development" 
    },
    school: "IUT-FV de Bandjoun",
    description: {
      fr: "Spécialisation en conception et développement d'applications web et réseaux.",
      en: "Specialization in web application and network design and development."
    }
  },
  {
    year: "2022",
    degree: { 
      fr: "BTS en Génie Logiciel", 
      en: "Technical Degree in Software Engineering" 
    },
    school: "INSAM Bafoussam",
    description: {
      fr: "Formation technique en développement logiciel et conception d'applications.",
      en: "Technical training in software development and application design."
    }
  },
  {
    year: "2021 - 2023",
    degree: { 
      fr: "Formations en Développement Web Avancé", 
      en: "Advanced Web Development Training" 
    },
    school: "MiSofe Bafoussam & Genious Concept",
    description: {
      fr: "Formations spécialisées en React, Laravel et développement full-stack.",
      en: "Specialized training in React, Laravel and full-stack development."
    }
  }
];

export const stats = {
  projectsCompleted: 35,
  yearsExperience: 5,
  technologies: 18,
  happyClients: 20
};