import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export interface CTASectionProps {
  variant?: 'primary' | 'secondary';
  titleKey: string;
  descriptionKey: string;
  primaryButton?: {
    textKey: string;
    link: string;
    isExternal?: boolean;
  };
  secondaryButton?: {
    textKey: string;
    action: 'download' | 'link';
    target: string;
  };
  className?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  variant = 'primary',
  titleKey,
  descriptionKey,
  primaryButton,
  secondaryButton,
  className = ''
}) => {
  const { t } = useTranslation();

  const backgroundClass = variant === 'primary' 
    ? 'bg-primary-dark' 
    : 'bg-gray-50 dark:bg-gray-800';

  const textColorClass = variant === 'primary' 
    ? 'text-white' 
    : 'text-secondary dark:text-white';

  const descriptionColorClass = variant === 'primary'
    ? 'text-primary-light'
    : 'text-gray-600 dark:text-gray-300';

  const primaryButtonClass = variant === 'primary'
    ? 'bg-white text-primary-dark hover:bg-gray-100'
    : 'bg-primary text-white hover:bg-primary-dark';

  const secondaryButtonClass = variant === 'primary'
    ? 'border border-white text-white hover:bg-white hover:text-primary-dark'
    : 'border border-primary text-primary hover:bg-primary hover:text-white';

  return (
    <section className={`py-20 ${backgroundClass} ${className}`}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`text-center ${textColorClass}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-title mb-6">
            {t(titleKey)}
          </h2>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${descriptionColorClass}`}>
            {t(descriptionKey)}
          </p>
          
          {(primaryButton || secondaryButton) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Bouton principal */}
              {primaryButton && (
                primaryButton.isExternal ? (
                  <a
                    href={primaryButton.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-8 py-4 rounded-custom transition-colors font-medium text-lg ${primaryButtonClass}`}
                  >
                    {t(primaryButton.textKey)}
                  </a>
                ) : (
                  <Link
                    to={primaryButton.link}
                    className={`px-8 py-4 rounded-custom transition-colors font-medium text-lg ${primaryButtonClass}`}
                  >
                    {t(primaryButton.textKey)}
                  </Link>
                )
              )}

              {/* Bouton secondaire */}
              {secondaryButton && (
                secondaryButton.action === 'download' ? (
                  <a
                    href={secondaryButton.target}
                    download
                    className={`px-8 py-4 rounded-custom transition-colors font-medium text-lg ${secondaryButtonClass}`}
                  >
                    {t(secondaryButton.textKey)}
                  </a>
                ) : (
                  <Link
                    to={secondaryButton.target}
                    className={`px-8 py-4 rounded-custom transition-colors font-medium text-lg ${secondaryButtonClass}`}
                  >
                    {t(secondaryButton.textKey)}
                  </Link>
                )
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};