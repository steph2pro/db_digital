
// ─────────────────────────────────────────────────────────────────────────────
// DONNÉES STATIQUES — taglines, images, couleurs accent par catégorie
// ─────────────────────────────────────────────────────────────────────────────

export const CATEGORY_TAGLINES: Record<string, { fr: string; en: string }> = {
  'web-dev':   { fr: 'Votre site, votre moteur de croissance', en: 'Your website, your growth engine' },
  'marketing': { fr: 'Soyez vus. Soyez choisis.',              en: 'Be seen. Be chosen.'               },
  'design':    { fr: "L'image qui fait la différence",          en: 'The look that sets you apart'      },
  'support':   { fr: 'Performant. Sécurisé. Toujours là.',      en: 'Fast. Secure. Always on.'          },
};

export const CATEGORY_IMAGES: Record<string, string> = {
  'web-dev':   'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop',
  'marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
  'design':    'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=500&fit=crop',
  'support':   'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
};

export const CATEGORY_ACCENT: Record<string, string> = {
  'web-dev':   '#3b82f6',
  'marketing': '#f59e0b',
  'design':    '#ec4899',
  'support':   '#10b981',
};

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTES DE MISE EN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export const THUMB_W        = 155;
export const THUMB_H        = 100;
export const THUMB_GAP      = 10;
export const THUMB_STEP     = THUMB_W + THUMB_GAP;
export const VISIBLE_THUMBS = 3;
export const AUTO_INTERVAL  = 4800;

export const STRIP_WIDTH = THUMB_W * VISIBLE_THUMBS + THUMB_GAP * (VISIBLE_THUMBS - 1);