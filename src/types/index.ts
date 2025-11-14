export interface Project {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  fullDescription: {
    fr: string;
    en: string;
  };
  technologies: string[];
  images: string[];
  category: 'web' | 'mobile' | 'backend' | 'fullstack';
  featured: boolean;
  isPrivate?: boolean; // Nouvelle propriété
  githubUrl?: string;
  liveUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  status: 'completed' | 'in-progress' | 'planned';
  startDate: string;
  endDate?: string;
  client?: string;
  teamSize?: number;
  challenges: {
    fr: string[];
    en: string[];
  };
  solutions: {
    fr: string[];
    en: string[];
  };
  features: {
    fr: string[];
    en: string[];
  };
  testimonials?: {
    name: string;
    role: string;
    text: {
      fr: string;
      en: string;
    };
    avatar?: string;
  }[];
}
export interface BlogPost {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  excerpt: {
    fr: string;
    en: string;
  };
  content: {
    fr: string;
    en: string;
  };
  author: string;
  publishDate: string;
  category: string;
  tags: string[];
  image: string;
  readTime: number;
  featured: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  icon: string;
  category: 'frontend' | 'backend' | 'mobile' | 'tools' | 'soft';
  yearsOfExperience: number;
  projectsCount: number;
}

export interface NavigationItem {
  id: string;
  path: string;
  label: {
    fr: string;
    en: string;
  };
  icon: string;
  type: 'internal' | 'external';
  submenu?: NavigationItem[];
}



export interface Formation {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  category: 'web' | 'mobile' | 'backend' | 'cloud' | 'agile';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  studentsCount?: number;
  rating?: number;
  image: string;
  featured: boolean;
  technologies: string[];
  startDate: string;
  endDate?: string;
  institution: {
    fr: string;
    en: string;
  };
  format: 'online' | 'in-person' | 'hybrid';
}


// types/index.ts
export interface Training {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  category: 'web' | 'mobile' | 'backend' | 'cloud' | 'agile' | 'devops' |string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  format: 'online' | 'in-person' | 'hybrid';
  price?: {
    fr: string;
    en: string;
  };
  image: string;
  objectives: {
    fr: string[];
    en: string[];
  };
  program: {
    fr: string[];
    en: string[];
  };
  technologies: string[];
  featured: boolean;
  studentsCount?: number;
  rating?: number;
  nextSession?: string;
  institution?: string;
  testimonials?: {
    name: string;
    role: string;
    text: {
      fr: string;
      en: string;
    };
    avatar?: string;
  }[];
}