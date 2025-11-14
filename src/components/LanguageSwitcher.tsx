
import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-custom hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 text-gray-700 dark:text-gray-300"
    >
      <i className={`bx bx-globe text-lg`}></i>
      <span className="font-medium">{i18n.language === 'fr' ? 'EN' : 'FR'}</span>
    </button>
  );
};