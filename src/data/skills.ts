export interface Skill {
  id: number;
  name: string;
  level: number;
  icon: string;
  category: 'frontend' | 'backend' | 'mobile' | 'tools' | 'database' | 'service' | 'publication';
}

export const skills: Skill[] = [
  // --- FRONTEND ---
  { id: 1, name: "HTML5", level: 95, icon: "bx bxl-html5", category: "frontend" },
  { id: 2, name: "CSS3 (Bootstrap, Tailwind)", level: 85, icon: "bx bxl-css3", category: "frontend" },
  { id: 3, name: "JavaScript (ES6+)", level: 85, icon: "bx bxl-javascript", category: "frontend" },
  { id: 4, name: "TypeScript", level: 80, icon: "bx bxl-typescript", category: "frontend" },
  { id: 5, name: "React.js", level: 85, icon: "bx bxl-react", category: "frontend" },
  { id: 6, name: "Angular", level: 65, icon: "bx bxl-angular", category: "frontend" },
  { id: 7, name: "Vue.js", level: 60, icon: "bx bxl-vuejs", category: "frontend" },

  // --- BACKEND ---
  { id: 8, name: "Node.js (Express)", level: 70, icon: "bx bxl-nodejs", category: "backend" },
  { id: 9, name: "AdonisJS", level: 70, icon: "bx bx-server", category: "backend" },
  { id: 10, name: "PHP (Laravel)", level: 70, icon: "bx bxl-php", category: "backend" },

  // --- DATABASE ---
  { id: 11, name: "MySQL", level: 70, icon: "bx bxl-mysql", category: "database" },
  { id: 12, name: "PostgreSQL", level: 70, icon: "bx bxl-postgresql", category: "database" },
  { id: 13, name: "MongoDB", level: 60, icon: "bx bxl-mongodb", category: "database" },
  { id: 14, name: "Supabase", level: 65, icon: "bx bxl-supabase", category: "database" },
  { id: 15, name: "Hive", level: 55, icon: "bx bx-hive", category: "database" },
  { id: 16, name: "SQLite", level: 60, icon: "bx bxs-database", category: "database" },

  // --- MOBILE ---
  { id: 17, name: "Flutter", level: 85, icon: "bx bxl-flutter", category: "mobile" },
  { id: 18, name: "Dart", level: 80, icon: "bx bxl-dart", category: "mobile" },
  { id: 19, name: "BLoC", level: 75, icon: "bx bx-layer", category: "mobile" },
  { id: 20, name: "Provider", level: 70, icon: "bx bx-layer", category: "mobile" },
  { id: 21, name: "Riverpod", level: 65, icon: "bx bx-layer", category: "mobile" },

  // --- SERVICES ---
  { id: 22, name: "Firebase", level: 70, icon: "bx bxl-firebase", category: "service" },
  { id: 23, name: "API REST", level: 80, icon: "bx bx-server", category: "service" },
  { id: 24, name: "GraphQL", level: 65, icon: "bx bxl-graphql", category: "service" },
  { id: 25, name: "Supabase API", level: 65, icon: "bx bxl-supabase", category: "service" },

  // --- PUBLICATION ---
  { id: 26, name: "Google Play Console", level: 70, icon: "bx bxl-google", category: "publication" },
  { id: 27, name: "App Store Connect", level: 70, icon: "bx bxl-apple", category: "publication" },

  // --- TOOLS ---
  { id: 28, name: "Git & GitHub", level: 90, icon: "bx bxl-git", category: "tools" },
  { id: 29, name: "GitLab", level: 80, icon: "bx bxl-gitlab", category: "tools" },
  { id: 30, name: "Docker", level: 55, icon: "bx bxl-docker", category: "tools" },
  { id: 31, name: "Figma", level: 70, icon: "bx bxl-figma", category: "tools" },
  { id: 32, name: "npm / Yarn", level: 75, icon: "bx bx-package", category: "tools" }
];


