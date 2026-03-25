// Types pour les services
export interface ServiceDetail {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  features: string[];
  benefits: string[];
  technologies?: string[];
  priceRange: string;
  timeline: string;
  image: string;
  gradient: string;
  color: string;
}

export interface ServiceCategory {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  gradient: string;
  services: ServiceDetail[];
}

// Données des catégories de services avec images en ligne
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'web-dev',
    titleKey: 'services.categories.web.title',
    descriptionKey: 'services.categories.web.description',
    icon: 'bx bx-code-alt',
    gradient: 'from-blue-600 to-cyan-500',
    services: [
      {
        id: 'site-vitrine',
        icon: 'bx bx-briefcase',
        titleKey: 'services.categories.web.services.vitrine.title',
        descriptionKey: 'services.categories.web.services.vitrine.description',
        features: [
          'services.categories.web.services.vitrine.features.design',
          'services.categories.web.services.vitrine.features.responsive',
          'services.categories.web.services.vitrine.features.seo',
          'services.categories.web.services.vitrine.features.contact',
          'services.categories.web.services.vitrine.features.analytics',
          'services.categories.web.services.vitrine.features.speed'
        ],
        benefits: [
          'services.categories.web.services.vitrine.benefits.credibility',
          'services.categories.web.services.vitrine.benefits.visibility',
          'services.categories.web.services.vitrine.benefits.conversion'
        ],
        technologies: ['React', 'Vue.js', 'Next.js', 'Tailwind CSS'],
        priceRange: 'services.priceRange.from',
        timeline: 'services.timeline.weeks',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop',
        gradient: 'from-blue-500 to-cyan-400',
        color: '#3B82F6'
      },
      {
        id: 'ecommerce',
        icon: 'bx bx-cart',
        titleKey: 'services.categories.web.services.ecommerce.title',
        descriptionKey: 'services.categories.web.services.ecommerce.description',
        features: [
          'services.categories.web.services.ecommerce.features.catalog',
          'services.categories.web.services.ecommerce.features.payment',
          'services.categories.web.services.ecommerce.features.inventory',
          'services.categories.web.services.ecommerce.features.shipping',
          'services.categories.web.services.ecommerce.features.reviews',
          'services.categories.web.services.ecommerce.features.dashboard'
        ],
        benefits: [
          'services.categories.web.services.ecommerce.benefits.reach',
          'services.categories.web.services.ecommerce.benefits.sales',
          'services.categories.web.services.ecommerce.benefits.automation'
        ],
        technologies: ['Shopify', 'WooCommerce', 'Magento', 'Stripe'],
        priceRange: 'services.priceRange.custom',
        timeline: 'services.timeline.months',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
        gradient: 'from-green-500 to-emerald-400',
        color: '#10B981'
      },
      {
        id: 'application-mobile',
        icon: 'bx bx-mobile',
        titleKey: 'services.categories.web.services.mobile.title',
        descriptionKey: 'services.categories.web.services.mobile.description',
        features: [
          'services.categories.web.services.mobile.features.ios',
          'services.categories.web.services.mobile.features.android',
          'services.categories.web.services.mobile.features.ui',
          'services.categories.web.services.mobile.features.push',
          'services.categories.web.services.mobile.features.offline',
          'services.categories.web.services.mobile.features.store'
        ],
        benefits: [
          'services.categories.web.services.mobile.benefits.engagement',
          'services.categories.web.services.mobile.benefits.loyalty',
          'services.categories.web.services.mobile.benefits.access'
        ],
        technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
        priceRange: 'services.priceRange.from',
        timeline: 'services.timeline.months',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
        gradient: 'from-purple-500 to-pink-500',
        color: '#8B5CF6'
      }
    ]
  },
  {
    id: 'marketing',
    titleKey: 'services.categories.marketing.title',
    descriptionKey: 'services.categories.marketing.description',
    icon: 'bx bx-trending-up',
    gradient: 'from-orange-500 to-red-500',
    services: [
      {
        id: 'seo',
        icon: 'bx bx-search',
        titleKey: 'services.categories.marketing.services.seo.title',
        descriptionKey: 'services.categories.marketing.services.seo.description',
        features: [
          'services.categories.marketing.services.seo.features.audit',
          'services.categories.marketing.services.seo.features.keywords',
          'services.categories.marketing.services.seo.features.content',
          'services.categories.marketing.services.seo.features.links',
          'services.categories.marketing.services.seo.features.technical',
          'services.categories.marketing.services.seo.features.local'
        ],
        benefits: [
          'services.categories.marketing.services.seo.benefits.traffic',
          'services.categories.marketing.services.seo.benefits.ranking',
          'services.categories.marketing.services.seo.benefits.roi'
        ],
        technologies: ['Google Analytics', 'SEMrush', 'Ahrefs', 'Search Console'],
        priceRange: 'services.priceRange.monthly',
        timeline: 'services.timeline.ongoing',
        image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=500&fit=crop',
        gradient: 'from-orange-500 to-yellow-500',
        color: '#F59E0B'
      },
      {
        id: 'ads',
        icon: 'bx bx-dollar-circle',
        titleKey: 'services.categories.marketing.services.ads.title',
        descriptionKey: 'services.categories.marketing.services.ads.description',
        features: [
          'services.categories.marketing.services.ads.features.google',
          'services.categories.marketing.services.ads.features.social',
          'services.categories.marketing.services.ads.features.retargeting',
          'services.categories.marketing.services.ads.features.analytics',
          'services.categories.marketing.services.ads.features.optimization',
          'services.categories.marketing.services.ads.features.reporting'
        ],
        benefits: [
          'services.categories.marketing.services.ads.benefits.reach',
          'services.categories.marketing.services.ads.benefits.roi',
          'services.categories.marketing.services.ads.benefits.targeting'
        ],
        technologies: ['Google Ads', 'Facebook Ads', 'LinkedIn Ads', 'TikTok Ads'],
        priceRange: 'services.priceRange.custom',
        timeline: 'services.timeline.monthly',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
        gradient: 'from-red-500 to-pink-500',
        color: '#EF4444'
      },
      {
        id: 'social-media',
        icon: 'bx bx-share-alt',
        titleKey: 'services.categories.marketing.services.social.title',
        descriptionKey: 'services.categories.marketing.services.social.description',
        features: [
          'services.categories.marketing.services.social.features.strategy',
          'services.categories.marketing.services.social.features.content',
          'services.categories.marketing.services.social.features.community',
          'services.categories.marketing.services.social.features.influencers',
          'services.categories.marketing.services.social.features.analytics',
          'services.categories.marketing.services.social.features.campaigns'
        ],
        benefits: [
          'services.categories.marketing.services.social.benefits.engagement',
          'services.categories.marketing.services.social.benefits.brand',
          'services.categories.marketing.services.social.benefits.community'
        ],
        technologies: ['Meta Business', 'Buffer', 'Hootsuite', 'Canva'],
        priceRange: 'services.priceRange.monthly',
        timeline: 'services.timeline.ongoing',
        image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=500&fit=crop',
        gradient: 'from-blue-500 to-indigo-500',
        color: '#3B82F6'
      }
    ]
  },
  {
    id: 'design',
    titleKey: 'services.categories.design.title',
    descriptionKey: 'services.categories.design.description',
    icon: 'bx bx-palette',
    gradient: 'from-purple-500 to-pink-500',
    services: [
      {
        id: 'ui-ux',
        icon: 'bx bx-pen',
        titleKey: 'services.categories.design.services.uiux.title',
        descriptionKey: 'services.categories.design.services.uiux.description',
        features: [
          'services.categories.design.services.uiux.features.research',
          'services.categories.design.services.uiux.features.wireframes',
          'services.categories.design.services.uiux.features.prototype',
          'services.categories.design.services.uiux.features.testing',
          'services.categories.design.services.uiux.features.designSystem',
          'services.categories.design.services.uiux.features.accessibility'
        ],
        benefits: [
          'services.categories.design.services.uiux.benefits.experience',
          'services.categories.design.services.uiux.benefits.conversion',
          'services.categories.design.services.uiux.benefits.satisfaction'
        ],
        technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision'],
        priceRange: 'services.priceRange.project',
        timeline: 'services.timeline.weeks',
        image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=500&fit=crop',
        gradient: 'from-indigo-500 to-purple-500',
        color: '#6366F1'
      },
      {
        id: 'branding',
        icon: 'bx bx-star',
        titleKey: 'services.categories.design.services.branding.title',
        descriptionKey: 'services.categories.design.services.branding.description',
        features: [
          'services.categories.design.services.branding.features.logo',
          'services.categories.design.services.branding.features.identity',
          'services.categories.design.services.branding.features.guidelines',
          'services.categories.design.services.branding.features.stationery',
          'services.categories.design.services.branding.features.packaging',
          'services.categories.design.services.branding.features.strategy'
        ],
        benefits: [
          'services.categories.design.services.branding.benefits.recognition',
          'services.categories.design.services.branding.benefits.trust',
          'services.categories.design.services.branding.benefits.differentiation'
        ],
        technologies: ['Illustrator', 'Photoshop', 'After Effects', 'Blender'],
        priceRange: 'services.priceRange.custom',
        timeline: 'services.timeline.weeks',
        image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=500&fit=crop',
        gradient: 'from-pink-500 to-rose-500',
        color: '#EC4899'
      }
    ]
  },
  {
    id: 'support',
    titleKey: 'services.categories.support.title',
    descriptionKey: 'services.categories.support.description',
    icon: 'bx bx-server',
    gradient: 'from-gray-600 to-gray-800',
    services: [
      {
        id: 'maintenance',
        icon: 'bx bx-wrench',
        titleKey: 'services.categories.support.services.maintenance.title',
        descriptionKey: 'services.categories.support.services.maintenance.description',
        features: [
          'services.categories.support.services.maintenance.features.updates',
          'services.categories.support.services.maintenance.features.security',
          'services.categories.support.services.maintenance.features.backup',
          'services.categories.support.services.maintenance.features.monitoring',
          'services.categories.support.services.maintenance.features.optimization',
          'services.categories.support.services.maintenance.features.support'
        ],
        benefits: [
          'services.categories.support.services.maintenance.benefits.security',
          'services.categories.support.services.maintenance.benefits.performance',
          'services.categories.support.services.maintenance.benefits.reliability'
        ],
        technologies: ['AWS', 'Cloudflare', 'Git', 'Docker'],
        priceRange: 'services.priceRange.monthly',
        timeline: 'services.timeline.ongoing',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
        gradient: 'from-gray-500 to-gray-700',
        color: '#6B7280'
      },
      {
        id: 'hosting',
        icon: 'bx bx-cloud',
        titleKey: 'services.categories.support.services.hosting.title',
        descriptionKey: 'services.categories.support.services.hosting.description',
        features: [
          'services.categories.support.services.hosting.features.speed',
          'services.categories.support.services.hosting.features.uptime',
          'services.categories.support.services.hosting.features.ssl',
          'services.categories.support.services.hosting.features.cdn',
          'services.categories.support.services.hosting.features.scaling',
          'services.categories.support.services.hosting.features.backups'
        ],
        benefits: [
          'services.categories.support.services.hosting.benefits.reliability',
          'services.categories.support.services.hosting.benefits.speed',
          'services.categories.support.services.hosting.benefits.security'
        ],
        technologies: ['AWS', 'Google Cloud', 'Azure', 'Vercel'],
        priceRange: 'services.priceRange.monthly',
        timeline: 'services.timeline.immediate',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
        gradient: 'from-blue-500 to-cyan-500',
        color: '#0EA5E9'
      }
    ]
  }
];

// Phrases pour l'animation de typing
export const typingPhrases = {
  en: [
    "Websites that convert visitors into customers",
    "Mobile apps that users love",
    "Digital strategies that grow your business",
    "Design that tells your story",
    "Technical support you can rely on"
  ],
  fr: [
    "Des sites web qui convertissent vos visiteurs",
    "Des applications mobiles que vos utilisateurs adorent",
    "Des stratégies digitales qui font grandir votre business",
    "Un design qui raconte votre histoire",
    "Un support technique fiable et réactif"
  ]
};