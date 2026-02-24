import React, { useRef } from 'react';
import { motion, useInView } from "motion/react";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';

interface ContactLayoutProps {
  title: string;
  subtitle: string;
  image: string;
  children: React.ReactNode;
}

export const ContactLayout: React.FC<ContactLayoutProps> = ({
  title,
  subtitle,
  image,
  children
}) => {
  const { i18n } = useTranslation();
  const { isDark } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const inView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div ref={heroRef} className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className={`absolute inset-0 ${
            isDark ? 'bg-black/70' : 'bg-white/80'
          }`} />
        </div>

        {/* Particules animées */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`hero-particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: `linear-gradient(135deg, #00e676, #00a8e8)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.5, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}

        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center"
            >
              <i className={`bx text-3xl text-white ${
                title === 'contact' ? 'bx-envelope' :
                title === 'quote' ? 'bx-calculator' :
                title === 'support' ? 'bx-support' : 'bx-map'
              }`} />
            </motion.div>

            <h1 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl mb-2">
              <span className={isDark ? 'text-white' : 'text-gray-900'}>
                {title === 'contact' && (i18n.language === 'fr' ? 'Contactez-nous' : 'Contact Us')}
                {title === 'quote' && (i18n.language === 'fr' ? 'Demander un devis' : 'Get a Quote')}
                {title === 'support' && (i18n.language === 'fr' ? 'Support Client' : 'Client Support')}
                {title === 'location' && (i18n.language === 'fr' ? 'Nos Bureaux' : 'Our Offices')}
              </span>
            </h1>

            <p className={`text-sm md:text-base max-w-xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {subtitle}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="relative">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </div>
      </div>
    </div>
  );
};