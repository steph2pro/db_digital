// components/TrainingCard.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from "motion/react";
import { Training } from '../../types';

interface TrainingCardProps {
  training: Training;
  index: number;
}

export const TrainingCard: React.FC<TrainingCardProps> = ({ training, index }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as 'fr' | 'en';

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'web':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'mobile':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'backend':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cloud':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'agile':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      case 'devops':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'online':
        return 'bx bx-video';
      case 'in-person':
        return 'bx bx-building';
      case 'hybrid':
        return 'bx bx-group';
      default:
        return 'bx bx-calendar';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-900 rounded-custom shadow-custom overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      {/* Training Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={training.image}
          alt={training.title[currentLanguage]}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(training.category)}`}>
            {t(`training.category.${training.category}`)}
          </span>
          {training.featured && (
            <span className="px-3 py-1 bg-accent text-white rounded-full text-sm font-medium">
              {t('training.featured')}
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(training.level)}`}>
            {t(`training.level.${training.level}`)}
          </span>
        </div>
      </div>

      {/* Training Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <i className={getFormatIcon(training.format)}></i>
            <span>{t(`training.format.${training.format}`)}</span>
            <span>•</span>
            <span>{training.duration}</span>
          </div>
          {training.nextSession && (
            <span className="text-sm text-primary font-medium">
              {t('training.nextSession')}: {training.nextSession}
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold font-title text-secondary dark:text-white mb-2 line-clamp-2">
          {training.title[currentLanguage]}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {training.description[currentLanguage]}
        </p>

        {/* Key Objectives */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t('training.keyObjectives')}:
          </h4>
          <ul className="space-y-1">
            {training.objectives[currentLanguage].slice(0, 2).map((objective, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <i className="bx bx-check text-primary mt-0.5"></i>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {training.technologies.slice(0, 4).map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-3 py-1 bg-primary-light text-primary-dark rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {training.technologies.length > 4 && (
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs">
              +{training.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Stats and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            {training.studentsCount && (
              <div className="flex items-center space-x-1">
                <i className="bx bx-user"></i>
                <span>{training.studentsCount}+</span>
              </div>
            )}
            {training.rating && (
              <div className="flex items-center space-x-1">
                <i className="bx bx-star text-yellow-500"></i>
                <span>{training.rating}/5</span>
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            {/* Bouton Contact - Redirige vers la page de contact */}
            <Link
              to="/contact"
              state={{ subject: `Demande d'information - ${training.title[currentLanguage]}`, training: training.title[currentLanguage] }}
              className="px-4 py-2 bg-primary text-white rounded-custom hover:bg-primary-dark transition-colors text-sm font-medium inline-flex items-center"
            >
              {t('training.contact')}
            </Link>

            {/* Bouton Détails - Redirige vers la page de détail de la formation */}
            <Link
              to={`/trainings/${training.id}`}
              className="px-4 py-2 border border-primary text-primary rounded-custom hover:bg-primary hover:text-white transition-colors text-sm font-medium inline-flex items-center"
            >
              {t('training.details')}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};