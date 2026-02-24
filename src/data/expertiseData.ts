// Types pour l'expertise
export interface Technology {
  id: string;
  nameKey: string;
  category: 'frontend' | 'backend' | 'mobile' | 'database' | 'devops' | 'design';
  icon: string;
  proficiency: number; // 0-100
  color: string;
  gradient: string;
  descriptionKey: string;
  image: string;
  experience: string;
  projects: number;
}

export interface Methodology {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  color: string;
  gradient: string;
  image: string;
  phases: {
    nameKey: string;
    descriptionKey: string;
    icon: string;
    duration: string;
  }[];
  benefits: string[];
}

export interface QualityCommitment {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  color: string;
  gradient: string;
  image: string;
  standards: {
    nameKey: string;
    descriptionKey: string;
    icon: string;
    certification?: string;
  }[];
  metrics: {
    labelKey: string;
    value: string;
    icon: string;
  }[];
}

// Technologies
export const technologies: Technology[] = [
  {
    id: 'react',
    nameKey: 'expertise.technologies.react.name',
    category: 'frontend',
    icon: 'bx bxl-react',
    proficiency: 95,
    color: '#61DAFB',
    gradient: 'from-cyan-400 to-blue-500',
    descriptionKey: 'expertise.technologies.react.description',
    image: '/images/expertise/react.jpg',
    experience: '5+ ans',
    projects: 45
  },
  {
    id: 'vue',
    nameKey: 'expertise.technologies.vue.name',
    category: 'frontend',
    icon: 'bx bxl-vuejs',
    proficiency: 90,
    color: '#42B883',
    gradient: 'from-green-400 to-emerald-500',
    descriptionKey: 'expertise.technologies.vue.description',
    image: '/images/expertise/vue.jpg',
    experience: '4+ ans',
    projects: 30
  },
  {
    id: 'node',
    nameKey: 'expertise.technologies.node.name',
    category: 'backend',
    icon: 'bx bxl-nodejs',
    proficiency: 92,
    color: '#68A063',
    gradient: 'from-green-500 to-teal-500',
    descriptionKey: 'expertise.technologies.node.description',
    image: '/images/expertise/node.jpg',
    experience: '5+ ans',
    projects: 50
  },
  {
    id: 'python',
    nameKey: 'expertise.technologies.python.name',
    category: 'backend',
    icon: 'bx bxl-python',
    proficiency: 88,
    color: '#3776AB',
    gradient: 'from-blue-500 to-indigo-500',
    descriptionKey: 'expertise.technologies.python.description',
    image: '/images/expertise/python.jpg',
    experience: '4+ ans',
    projects: 35
  },
  {
    id: 'flutter',
    nameKey: 'expertise.technologies.flutter.name',
    category: 'mobile',
    icon: 'bx bxl-flutter',
    proficiency: 85,
    color: '#02569B',
    gradient: 'from-blue-400 to-cyan-500',
    descriptionKey: 'expertise.technologies.flutter.description',
    image: '/images/expertise/flutter.jpg',
    experience: '3+ ans',
    projects: 20
  },
  {
    id: 'react-native',
    nameKey: 'expertise.technologies.react-native.name',
    category: 'mobile',
    icon: 'bx bxl-react',
    proficiency: 90,
    color: '#61DAFB',
    gradient: 'from-purple-400 to-pink-500',
    descriptionKey: 'expertise.technologies.react-native.description',
    image: '/images/expertise/react-native.jpg',
    experience: '4+ ans',
    projects: 25
  },
  {
    id: 'mongodb',
    nameKey: 'expertise.technologies.mongodb.name',
    category: 'database',
    icon: 'bx bxl-mongodb',
    proficiency: 87,
    color: '#47A248',
    gradient: 'from-green-500 to-lime-500',
    descriptionKey: 'expertise.technologies.mongodb.description',
    image: '/images/expertise/mongodb.jpg',
    experience: '4+ ans',
    projects: 40
  },
  {
    id: 'postgresql',
    nameKey: 'expertise.technologies.postgresql.name',
    category: 'database',
    icon: 'bx bxl-postgresql',
    proficiency: 85,
    color: '#336791',
    gradient: 'from-blue-600 to-indigo-600',
    descriptionKey: 'expertise.technologies.postgresql.description',
    image: '/images/expertise/postgresql.jpg',
    experience: '4+ ans',
    projects: 38
  },
  {
    id: 'docker',
    nameKey: 'expertise.technologies.docker.name',
    category: 'devops',
    icon: 'bx bxl-docker',
    proficiency: 82,
    color: '#2496ED',
    gradient: 'from-blue-400 to-sky-500',
    descriptionKey: 'expertise.technologies.docker.description',
    image: '/images/expertise/docker.jpg',
    experience: '3+ ans',
    projects: 30
  },
  {
    id: 'aws',
    nameKey: 'expertise.technologies.aws.name',
    category: 'devops',
    icon: 'bx bxl-aws',
    proficiency: 80,
    color: '#FF9900',
    gradient: 'from-orange-400 to-yellow-500',
    descriptionKey: 'expertise.technologies.aws.description',
    image: '/images/expertise/aws.jpg',
    experience: '3+ ans',
    projects: 25
  }
];

// Méthodologies
export const methodologies: Methodology[] = [
  {
    id: 'agile',
    titleKey: 'expertise.methodology.agile.title',
    descriptionKey: 'expertise.methodology.agile.description',
    icon: 'bx bx-cycle',
    color: '#00e676',
    gradient: 'from-green-400 to-blue-500',
    image: '/images/expertise/agile.jpg',
    phases: [
      {
        nameKey: 'expertise.methodology.agile.phases.discovery.name',
        descriptionKey: 'expertise.methodology.agile.phases.discovery.description',
        icon: 'bx bx-search-alt',
        duration: '1-2 semaines'
      },
      {
        nameKey: 'expertise.methodology.agile.phases.planning.name',
        descriptionKey: 'expertise.methodology.agile.phases.planning.description',
        icon: 'bx bx-calendar-check',
        duration: '1 semaine'
      },
      {
        nameKey: 'expertise.methodology.agile.phases.sprints.name',
        descriptionKey: 'expertise.methodology.agile.phases.sprints.description',
        icon: 'bx bx-run',
        duration: '2-4 semaines'
      },
      {
        nameKey: 'expertise.methodology.agile.phases.review.name',
        descriptionKey: 'expertise.methodology.agile.phases.review.description',
        icon: 'bx bx-show',
        duration: 'Continue'
      },
      {
        nameKey: 'expertise.methodology.agile.phases.deployment.name',
        descriptionKey: 'expertise.methodology.agile.phases.deployment.description',
        icon: 'bx bx-rocket',
        duration: '1 semaine'
      }
    ],
    benefits: [
      'expertise.methodology.agile.benefits.flexibility',
      'expertise.methodology.agile.benefits.visibility',
      'expertise.methodology.agile.benefits.quality',
      'expertise.methodology.agile.benefits.satisfaction'
    ]
  },
  {
    id: 'devops',
    titleKey: 'expertise.methodology.devops.title',
    descriptionKey: 'expertise.methodology.devops.description',
    icon: 'bx bx-server',
    color: '#00a8e8',
    gradient: 'from-blue-400 to-purple-500',
    image: '/images/expertise/devops.jpg',
    phases: [
      {
        nameKey: 'expertise.methodology.devops.phases.plan.name',
        descriptionKey: 'expertise.methodology.devops.phases.plan.description',
        icon: 'bx bx-planet',
        duration: 'Continue'
      },
      {
        nameKey: 'expertise.methodology.devops.phases.code.name',
        descriptionKey: 'expertise.methodology.devops.phases.code.description',
        icon: 'bx bx-code-alt',
        duration: 'Continue'
      },
      {
        nameKey: 'expertise.methodology.devops.phases.build.name',
        descriptionKey: 'expertise.methodology.devops.phases.build.description',
        icon: 'bx bx-build',
        duration: 'Automatisé'
      },
      {
        nameKey: 'expertise.methodology.devops.phases.test.name',
        descriptionKey: 'expertise.methodology.devops.phases.test.description',
        icon: 'bx bx-test-tube',
        duration: 'Automatisé'
      },
      {
        nameKey: 'expertise.methodology.devops.phases.deploy.name',
        descriptionKey: 'expertise.methodology.devops.phases.deploy.description',
        icon: 'bx bx-upload',
        duration: 'Continue'
      },
      {
        nameKey: 'expertise.methodology.devops.phases.monitor.name',
        descriptionKey: 'expertise.methodology.devops.phases.monitor.description',
        icon: 'bx bx-line-chart',
        duration: '24/7'
      }
    ],
    benefits: [
      'expertise.methodology.devops.benefits.speed',
      'expertise.methodology.devops.benefits.reliability',
      'expertise.methodology.devops.benefits.scalability',
      'expertise.methodology.devops.benefits.security'
    ]
  }
];

// Engagements qualité
export const qualityCommitments: QualityCommitment[] = [
  {
    id: 'quality',
    titleKey: 'expertise.quality.title',
    descriptionKey: 'expertise.quality.description',
    icon: 'bx bx-check-shield',
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-pink-500',
    image: '/images/expertise/quality.jpg',
    standards: [
      {
        nameKey: 'expertise.quality.standards.code.name',
        descriptionKey: 'expertise.quality.standards.code.description',
        icon: 'bx bx-code-curly',
        certification: 'ISO 25010'
      },
      {
        nameKey: 'expertise.quality.standards.testing.name',
        descriptionKey: 'expertise.quality.standards.testing.description',
        icon: 'bx bx-check-circle',
        certification: 'ISTQB'
      },
      {
        nameKey: 'expertise.quality.standards.security.name',
        descriptionKey: 'expertise.quality.standards.security.description',
        icon: 'bx bx-lock-alt',
        certification: 'OWASP'
      },
      {
        nameKey: 'expertise.quality.standards.performance.name',
        descriptionKey: 'expertise.quality.standards.performance.description',
        icon: 'bx bx-tachometer',
        certification: 'Lighthouse'
      },
      {
        nameKey: 'expertise.quality.standards.accessibility.name',
        descriptionKey: 'expertise.quality.standards.accessibility.description',
        icon: 'bx bx-universal-access',
        certification: 'WCAG 2.1'
      }
    ],
    metrics: [
      {
        labelKey: 'expertise.quality.metrics.coverage',
        value: '85%+',
        icon: 'bx bx-code-block'
      },
      {
        labelKey: 'expertise.quality.metrics.uptime',
        value: '99.9%',
        icon: 'bx bx-time'
      },
      {
        labelKey: 'expertise.quality.metrics.security',
        value: '0 faille',
        icon: 'bx bx-shield'
      },
      {
        labelKey: 'expertise.quality.metrics.satisfaction',
        value: '98%',
        icon: 'bx bx-smile'
      }
    ]
  }
];

// Images pour les pages
export const expertiseImages = {
  technologies: '/images/expertise/tech-hero.jpg',
  methodology: '/images/services/backend.jpg',
  quality: '/images/services/ui-ux-design.jpg'
};