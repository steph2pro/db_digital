import React, { createContext, useContext, useState } from 'react';
import { translations } from '../locales';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState('fr');

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[currentLang];
    
    for (const k of keys) {
      value = value[k];
      if (value === undefined) return key;
    }
    
    return value;
  };

  const switchLanguage = (lang) => setCurrentLang(lang);

  return (
    <LanguageContext.Provider value={{ currentLang, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};