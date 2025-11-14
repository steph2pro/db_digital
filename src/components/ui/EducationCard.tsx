import React from 'react';

interface Education {
  year: string;
  degree: { fr: string; en: string };
  school: string;
  description: { fr: string; en: string };
}

interface EducationCardProps {
  education: Education;
  lang: 'fr' | 'en';
}

export const EducationCard: React.FC<EducationCardProps> = ({ education, lang }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
          <i className="bx bx-graduation-cap text-2xl text-primary-dark"></i>
        </div>
        <div>
          <span className="text-sm font-medium text-primary">{education.year}</span>
          <h3 className="text-lg font-semibold font-title text-secondary dark:text-white">
            {education.degree[lang]}
          </h3>
        </div>
      </div>
      <p className="text-gray-500 dark:text-gray-400 mb-3">{education.school}</p>
      {education.description[lang] && (
        <p className="text-gray-600 dark:text-gray-300">{education.description[lang]}</p>
      )}
    </div>
  );
};
