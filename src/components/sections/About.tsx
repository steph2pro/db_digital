import React from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from '../Section';

export const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Section id="about" variant="primary-light">
      <h2 className="text-3xl md:text-4xl font-bold font-title text-center text-secondary dark:text-white mb-12">
        {t('about.title')}
      </h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <img
            src="/assets/img/steph.png"
            alt="Stéphane"
            className="rounded-custom shadow-custom max-w-xs md:max-w-md"
          />
        </div>

        <div>
          <h3 className="text-2xl font-semibold font-title text-secondary dark:text-white mb-6">
            {t('about.subtitle')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            {t('about.description')}
          </p>
        </div>
      </div>
    </Section>
  );
};