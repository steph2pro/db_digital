export interface BlogPost {
  id: string;
  title: string;
  titleKey: string;
  excerpt: string;
  excerptKey: string;
  content: string;
  contentKey: string;
  category: string;
  categoryKey: string;
  tags: string[];
  author: string;
  authorAvatar: string;
  date: string;
  readTime: number;
  image: string;
  featured: boolean;
  views: number;
  likes: number;
}

export const blogCategories = [
  { id: 'all', name: 'Tous les articles', nameKey: 'blog.categories.all', icon: 'bx bx-grid-alt' },
  { id: 'pricing', name: 'Tarifs & Devis', nameKey: 'blog.categories.pricing', icon: 'bx bx-euro' },
  { id: 'web-dev', name: 'Développement Web', nameKey: 'blog.categories.webDev', icon: 'bx bx-code-alt' },
  { id: 'ai-tech', name: 'IA & Technologies', nameKey: 'blog.categories.aiTech', icon: 'bx bx-brain' },
  { id: 'career', name: 'Carrière IT', nameKey: 'blog.categories.career', icon: 'bx bx-briefcase' },
  { id: 'trends', name: 'Tendances', nameKey: 'blog.categories.trends', icon: 'bx bx-trending-up' }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'prix-site-web',
    title: '💰 Combien coûte un site web en 2024 ? Guide complet des tarifs',
    titleKey: 'blog.posts.pricing.title',
    excerpt: 'Découvrez tous les facteurs qui influencent le prix d\'un site web : type de site, fonctionnalités, technologies et prestataires. De 500€ à 50 000€, on vous dit tout !',
    excerptKey: 'blog.posts.pricing.excerpt',
    content: `Le prix d'un site web varie considérablement selon de nombreux facteurs. Un site vitrine simple peut coûter entre 500€ et 3000€, tandis qu'une boutique e-commerce complexe peut atteindre 50 000€ ou plus.

**Facteurs influençant le prix :**

1. **Type de site** : Vitrine, e-commerce, application web, plateforme sur-mesure
2. **Nombre de pages** : Plus il y a de pages, plus le travail est important
3. **Fonctionnalités** : Formulaire de contact, paiement en ligne, espace membre, API
4. **Design** : Template prêt à l'emploi vs design sur-mesure
5. **SEO** : Optimisation pour les moteurs de recherche
6. **Maintenance** : Mises à jour, sécurité, hébergement

**Fourchettes de prix :**

- Site vitrine simple : 500€ - 3000€
- Site vitrine avec CMS : 1500€ - 5000€
- E-commerce basique : 3000€ - 8000€
- E-commerce avancé : 8000€ - 25000€
- Application sur-mesure : 15000€ - 50000€+
- Maintenance mensuelle : 50€ - 500€/mois

**Options pour réduire les coûts :**

- Utiliser des templates existants
- Commencer avec un MVP (Minimum Viable Product)
- Opter pour des solutions SaaS comme Shopify ou Wix
- Faire un devis précis avant de commencer`,
    contentKey: 'blog.posts.pricing.content',
    category: 'pricing',
    categoryKey: 'blog.categories.pricing',
    tags: ['prix', 'devis', 'budget', 'comparatif'],
    author: 'Sophie Martin',
    authorAvatar: 'https://ui-avatars.com/api/?name=Sophie+Martin&background=0D9488&color=fff',
    date: '2024-03-15',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    featured: true,
    views: 1250,
    likes: 89
  },
  {
    id: 'comment-estimer-prix-site',
    title: '📊 Comment estimer le prix de votre site web ? Méthode professionnelle',
    titleKey: 'blog.posts.estimate.title',
    excerpt: 'Apprenez à estimer vous-même le coût de votre futur site web grâce à notre méthode en 5 étapes. Évitez les mauvaises surprises !',
    excerptKey: 'blog.posts.estimate.excerpt',
    content: `Estimer le prix d'un site web peut sembler complexe. Voici une méthode professionnelle pour y voir plus clair.

**Étape 1 : Définissez vos objectifs**

- Quel est le but de votre site ? (Vendre, informer, générer des leads)
- Qui sont vos clients cibles ?
- Quelles actions voulez-vous qu'ils réalisent ?

**Étape 2 : Listez les fonctionnalités nécessaires**

- Pages statiques (À propos, Contact, Services...)
- Blog ou actualités
- Boutique en ligne
- Espace membre
- Formulaire de contact
- Chat en direct
- API / intégrations

**Étape 3 : Évaluez la complexité technique**

Niveau 1 - Simple : Site vitrine basique, 5-10 pages
Niveau 2 - Moyen : CMS, blog, responsive design
Niveau 3 - Complexe : E-commerce, paiement, comptes utilisateurs
Niveau 4 - Très complexe : Application web, API, temps réel

**Étape 4 : Choisissez votre prestataire**

- Freelance : 300€ - 800€/jour
- Agence : 500€ - 1500€/jour
- Plateformes (Malt, Codeur.com) : 400€ - 1000€/jour

**Étape 5 : Calculez le budget total**

Temps estimé (jours) × TJM = Budget approximatif

**Exemple concret :**
- Site vitrine avec 10 pages + blog
- Design sur-mesure
- 15 jours de travail
- Freelance à 500€/jour
- Total : 7500€

**À ne pas oublier :**
- Hébergement (5-50€/mois)
- Nom de domaine (10-15€/an)
- Maintenance (50-200€/mois)
- SEO (200-1000€/mois)
- Formation (optionnelle)`,
    contentKey: 'blog.posts.estimate.content',
    category: 'pricing',
    categoryKey: 'blog.categories.pricing',
    tags: ['estimation', 'budget', 'conseils', 'méthode'],
    author: 'Thomas Dubois',
    authorAvatar: 'https://ui-avatars.com/api/?name=Thomas+Dubois&background=2563EB&color=fff',
    date: '2024-03-10',
    readTime: 10,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    featured: true,
    views: 980,
    likes: 67
  },
  {
    id: 'reconversion-it',
    title: '🔄 Reconversion dans l\'IT : Guide complet pour réussir en 2024',
    titleKey: 'blog.posts.career.title',
    excerpt: 'Vous voulez vous reconvertir dans le numérique ? Découvrez les formations, les métiers qui recrutent et les salaires dans l\'IT.',
    excerptKey: 'blog.posts.career.excerpt',
    content: `La reconversion dans l'informatique est plus accessible que jamais. Voici tout ce qu'il faut savoir.

**Pourquoi se reconvertir dans l'IT ?**

- 70 000 postes à pourvoir chaque année
- Salaire moyen : 35k€ - 60k€
- Possibilité de télétravail
- Évolution rapide
- Formation accélérée possible

**Les métiers qui recrutent :**

1. **Développeur Web** (35k€ - 55k€)
   - Formation : 3-12 mois
   - Technologies : JavaScript, React, Node.js

2. **Développeur Mobile** (40k€ - 60k€)
   - Formation : 6-12 mois
   - Technologies : Flutter, React Native, Swift

3. **Data Analyst** (38k€ - 60k€)
   - Formation : 6-12 mois
   - Outils : SQL, Python, Tableau

4. **DevOps** (45k€ - 70k€)
   - Formation : 12-18 mois
   - Technologies : Docker, Kubernetes, AWS

5. **Chef de Projet Digital** (40k€ - 65k€)
   - Formation : 6-12 mois
   - Méthodes : Agile, Scrum

**Les formations recommandées :**

- **OpenClassrooms** : 3 à 12 mois, 300-400€/mois
- **Le Wagon** : 9 semaines, 8000€
- **42** : Gratuit, 3-5 ans
- **AFPA** : 6-12 mois, financé possible
- **Licence/Master Pro** : 1-2 ans, université

**Les soft skills importantes :**

- Autonomie et curiosité
- Résolution de problèmes
- Travail en équipe
- Anglais technique
- Veille technologique

**Conseils pour réussir :**

1. Commencez par des tutos gratuits (FreeCodeCamp, The Odin Project)
2. Construisez un portfolio de projets personnels
3. Contribuez à l'open source
4. Réseautez sur LinkedIn et lors de meetups
5. Passez des certifications`,
    contentKey: 'blog.posts.career.content',
    category: 'career',
    categoryKey: 'blog.categories.career',
    tags: ['reconversion', 'métiers', 'formation', 'salaires', 'conseils'],
    author: 'Marie Lambert',
    authorAvatar: 'https://ui-avatars.com/api/?name=Marie+Lambert&background=7C3AED&color=fff',
    date: '2024-03-05',
    readTime: 12,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop',
    featured: true,
    views: 2100,
    likes: 156
  },
  {
    id: 'technologies-pointe-2024',
    title: '⚡ Top 10 des technologies de pointe à maîtriser en 2024',
    titleKey: 'blog.posts.tech.title',
    excerpt: 'IA, Blockchain, Web3, Cloud... Découvrez les technologies qui vont révolutionner le développement web et les salaires associés.',
    excerptKey: 'blog.posts.tech.excerpt',
    content: `Le monde de la tech évolue rapidement. Voici les technologies à surveiller et à apprendre.

**1. Intelligence Artificielle Générative**
- Modèles : GPT-4, Claude, Gemini
- Frameworks : LangChain, LlamaIndex
- Applications : Chatbots, génération de contenu, code
- Salaire : 60k€ - 120k€

**2. WebAssembly (Wasm)**
- Langages : Rust, Go, C++
- Utilisations : Applications web haute performance
- Salaire : 55k€ - 90k€

**3. Blockchain & Web3**
- Technologies : Solidity, Ethereum, Smart Contracts
- Applications : dApps, DeFi, NFTs
- Salaire : 65k€ - 130k€

**4. Edge Computing**
- Plateformes : Cloudflare Workers, AWS Lambda@Edge
- Avantages : Latence réduite, sécurité
- Salaire : 60k€ - 100k€

**5. Progressive Web Apps (PWAs)**
- Technologies : Service Workers, IndexedDB
- Avantages : Installation, offline, notifications
- Salaire : 45k€ - 75k€

**6. Serverless Architecture**
- Providers : AWS Lambda, Vercel, Netlify
- Avantages : Scalabilité automatique, coûts optimisés
- Salaire : 60k€ - 95k€

**7. Low-Code/No-Code**
- Platforms : Bubble, Retool, FlutterFlow
- Avantages : Développement 10x plus rapide
- Salaire : 50k€ - 80k€

**8. Cybersecurity**
- Domaines : DevSecOps, Cloud Security
- Certifications : CEH, CISSP
- Salaire : 55k€ - 110k€

**9. Green IT & Eco-conception**
- Enjeux : Réduction de l'empreinte carbone
- Techniques : Code efficace, hébergement vert
- Salaire : 50k€ - 85k€

**10. Web3 & Décentralisation**
- Protocoles : IPFS, Filecoin
- Applications : Stockage décentralisé, identité numérique
- Salaire : 60k€ - 120k€

**Comment apprendre ces technologies ?**

- Cours en ligne (Udemy, Coursera)
- Documentation officielle
- Projets personnels
- Contributions open source
- Hackathons`,
    contentKey: 'blog.posts.tech.content',
    category: 'web-dev',
    categoryKey: 'blog.categories.webDev',
    tags: ['technologies', '2024', 'tendances', 'salaires', 'formation'],
    author: 'Lucas Bernard',
    authorAvatar: 'https://ui-avatars.com/api/?name=Lucas+Bernard&background=059669&color=fff',
    date: '2024-02-28',
    readTime: 15,
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=500&fit=crop',
    featured: false,
    views: 1560,
    likes: 112
  },
  {
    id: 'tendances-ia-2024',
    title: '🤖 Tendances IA 2024 : Ce qui va changer votre façon de travailler',
    titleKey: 'blog.posts.aiTrends.title',
    excerpt: 'Découvrez les tendances majeures de l\'IA en 2024 : IA générative, agents autonomes, éthique, et comment vous préparer.',
    excerptKey: 'blog.posts.aiTrends.excerpt',
    content: `L'intelligence artificielle transforme notre façon de travailler. Voici les tendances à suivre.

**1. IA Générative en entreprise**

Les entreprises intègrent massivement l'IA générative :
- Rédaction de documents, emails, rapports
- Génération de code et tests automatiques
- Création de contenus marketing
- Support client automatisé

**2. Agents IA autonomes**

Nouvelle génération d'agents capables de :
- Planifier des tâches complexes
- Utiliser des outils (API, navigateur)
- Apprendre de leurs erreurs
- Collaborer entre eux

Exemples : AutoGPT, BabyAGI, GPT-Engineer

**3. IA multimodale**

Modèles capables de comprendre :
- Texte, image, audio, vidéo
- Traduction automatique améliorée
- Génération de vidéos (Sora, Runway)
- Reconnaissance d'images avancée

**4. Éthique et IA responsable**

- Régulation (AI Act européen)
- Transparence des algorithmes
- Réduction des biais
- Protection des données

**5. IA pour les développeurs**

Outils qui changent le métier :
- GitHub Copilot : Auto-complétion de code
- Cursor : Éditeur IA-native
- Tabnine : Prédiction de code
- Amazon CodeWhisperer : Suggestions AWS

**Impact sur les métiers :**

Les développeurs deviennent des "IA orchestrators" :
- 50% de productivité en plus
- Focus sur l'architecture et la review
- Besoin de compétences en prompt engineering
- Veille technologique accrue

**Comment se préparer ?**

1. Apprenez le prompt engineering
2. Maîtrisez les API d'IA (OpenAI, Anthropic)
3. Comprenez les enjeux éthiques
4. Expérimentez avec les outils IA
5. Suivez les évolutions (newsletters, conférences)`,
    contentKey: 'blog.posts.aiTrends.content',
    category: 'ai-tech',
    categoryKey: 'blog.categories.aiTech',
    tags: ['IA', 'tendances', '2024', 'productivité', 'futur'],
    author: 'Dr. Ahmed Benali',
    authorAvatar: 'https://ui-avatars.com/api/?name=Ahmed+Benali&background=DC2626&color=fff',
    date: '2024-02-20',
    readTime: 11,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    featured: true,
    views: 3420,
    likes: 278
  },
  {
    id: 'ia-dev',
    title: '👨‍💻 L\'IA au service des développeurs : Boostez votre productivité',
    titleKey: 'blog.posts.aiDev.title',
    excerpt: 'Comment utiliser l\'IA pour coder plus vite, mieux debugger, et apprendre de nouvelles technologies. Guide pratique avec exemples.',
    excerptKey: 'blog.posts.aiDev.excerpt',
    content: `L'IA change radicalement la façon dont nous développons. Voici comment l'utiliser efficacement.

**Les outils IA indispensables :**

**1. GitHub Copilot**
- Autocomplétion intelligente
- Génération de fonctions complètes
- Adaptation au contexte
- Prix : 10$/mois (gratuit pour étudiants)

**2. Cursor**
- Éditeur basé sur VS Code
- Chat intégré avec l'IA
- Génération de composants React
- Refactoring automatique

**3. ChatGPT / Claude pour le code**
- Génération de snippets
- Explication de code complexe
- Conversion entre langages
- Documentation automatique

**4. Amazon CodeWhisperer**
- Suggestions spécifiques AWS
- Gratuit pour usage personnel
- Sécurité intégrée

**Bonnes pratiques :**

✅ **À faire :**
- Générer du code boilerplate
- Écrire des tests unitaires
- Documenter votre code
- Debugger des erreurs
- Refactoriser du code legacy

❌ **Éviter :**
- Copier/coller sans comprendre
- Ignorer les problèmes de sécurité
- Négliger la revue de code
- Oublier la maintenance

**Exemples concrets :**

**Débogage :**
"Explique-moi cette erreur : TypeError: Cannot read property 'map' of undefined"

**Génération de composant :**
"Crée un composant React de carte produit avec image, titre, prix et bouton d'achat"

**Optimisation :**
"Optimise cette fonction qui est trop lente pour 10 000 éléments"

**Tests :**
"Génère des tests unitaires Jest pour cette fonction de validation d'email"

**Conversion :**
"Convertit cette fonction JavaScript en TypeScript avec les types appropriés"

**Impact sur les salaires :**

Les développeurs qui maîtrisent ces outils peuvent :
- Gagner 20-30% de plus
- Travailler sur des projets plus complexes
- Apprendre plus rapidement
- Se spécialiser en "AI Engineering"

**Ressources pour apprendre :**

- Cours "Prompt Engineering for Developers" (DeepLearning.AI)
- Documentation OpenAI
- Communauté LangChain
- Projets open source avec Copilot`,
    contentKey: 'blog.posts.aiDev.content',
    category: 'ai-tech',
    categoryKey: 'blog.categories.aiTech',
    tags: ['IA', 'productivité', 'outils', 'tutoriel', 'développement'],
    author: 'Julie Moreau',
    authorAvatar: 'https://ui-avatars.com/api/?name=Julie+Moreau&background=EAB308&color=fff',
    date: '2024-02-15',
    readTime: 9,
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&h=500&fit=crop',
    featured: false,
    views: 1890,
    likes: 143
  }
];

// Catégories avec icônes pour le sidebar
export const sidebarCategories = [
  { id: 'pricing', name: 'Tarifs & Devis', count: 2, icon: 'bx bx-euro' },
  { id: 'web-dev', name: 'Développement Web', count: 1, icon: 'bx bx-code-alt' },
  { id: 'ai-tech', name: 'IA & Technologies', count: 2, icon: 'bx bx-brain' },
  { id: 'career', name: 'Carrière IT', count: 1, icon: 'bx bx-briefcase' },
  { id: 'trends', name: 'Tendances', count: 0, icon: 'bx bx-trending-up' }
];

// Tags populaires
export const popularTags = [
  'IA', 'développement', 'prix', 'reconversion', 'tutoriel', 
  'productivité', 'salaires', '2024', 'tendances', 'débutant'
];