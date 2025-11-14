import React from 'react';

interface Experience {
  period: string;
  role: { fr: string; en: string };
  company: string;
  description: { fr: string; en: string };
  technologies: string[];
}

interface ExperienceCardProps {
  experience: Experience;
  lang: 'fr' | 'en';
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, lang }) => {
  return (
    <div className="relative flex flex-col md:flex-row mb-8">
      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full z-10"></div>
      <div className="ml-12 md:ml-0 md:w-1/2 md:pr-8">
        <div className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-primary bg-primary-light px-3 py-1 rounded-full">
              {experience.period}
            </span>
          </div>
          <h3 className="text-xl font-semibold font-title text-secondary dark:text-white mb-2">
            {experience.role[lang]}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-3">{experience.company}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {experience.description[lang]}
          </p>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
