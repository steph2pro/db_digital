import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';

interface RealisationsCTAProps {
  isMobile: boolean;
}

export const RealisationsCTA: React.FC<RealisationsCTAProps> = ({ isMobile }) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      style={{
        position: 'relative',
        padding: isMobile ? '64px 24px' : '96px 64px',
        textAlign: 'center',
        backgroundColor: isDark ? '#0d0d0d' : '#f0f0ee',
        borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'}`,
      }}
    >
      <h2
        style={{
          fontWeight: 900,
          fontSize: isMobile ? '1.8rem' : '2.6rem',
          letterSpacing: '-0.03em',
          color: isDark ? '#fff' : '#0a0a0a',
          marginBottom: 14,
          lineHeight: 1.1,
        }}
      >
        {t('realisations.cta.title', 'Prêt à créer votre projet ?')}
      </h2>

      <p
        style={{
          color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)',
          fontSize: isMobile ? '0.95rem' : '1.1rem',
          maxWidth: 520,
          margin: '0 auto 32px',
          lineHeight: 1.7,
        }}
      >
        {t('realisations.cta.description', 'Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé.')}
      </p>

      <motion.a
        href="/contact"
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 9,
          padding: '14px 32px',
          backgroundColor: isDark ? '#fff' : '#0a0a0a',
          color: isDark ? '#0a0a0a' : '#fff',
          fontWeight: 700,
          fontSize: '0.95rem',
          borderRadius: 10,
          textDecoration: 'none',
          letterSpacing: '-0.01em',
          boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.15)',
        }}
      >
        {t('realisations.cta.button', 'Discuter de mon projet')}
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </motion.a>
    </motion.div>
  );
};