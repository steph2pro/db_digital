// components/TrainingsList.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from "motion/react";
import { Training } from '../types';
import { TrainingCard } from '../components/sections/TrainingCard';

interface TrainingsListProps {
  trainings: Training[];
}

export const TrainingsList: React.FC<TrainingsListProps> = ({ trainings }) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'backend' | 'cloud' | 'agile' | 'devops'>('all');
  const [levelFilter, setLevelFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [formatFilter, setFormatFilter] = useState<'all' | 'online' | 'in-person' | 'hybrid'>('all');

  const filteredTrainings = trainings.filter(training => {
    const categoryMatch = filter === 'all' || training.category === filter;
    const levelMatch = levelFilter === 'all' || training.level === levelFilter;
    const formatMatch = formatFilter === 'all' || training.format === formatFilter;
    return categoryMatch && levelMatch && formatMatch;
  });

  const categories = [
    { key: 'all', label: t('training.filters.all') },
    { key: 'web', label: t('training.category.web') },
    { key: 'mobile', label: t('training.category.mobile') },
    { key: 'backend', label: t('training.category.backend') },
    { key: 'cloud', label: t('training.category.cloud') },
    // { key: 'agile', label: t('training.category.agile') },
    // { key: 'devops', label: t('training.category.devops') },
  ];

  const levels = [
    { key: 'all', label: t('training.filters.allLevels') },
    { key: 'beginner', label: t('training.level.beginner') },
    { key: 'intermediate', label: t('training.level.intermediate') },
    { key: 'advanced', label: t('training.level.advanced') },
  ];

  const formats = [
    { key: 'all', label: t('training.filters.allFormats') },
    { key: 'online', label: t('training.format.online') },
    { key: 'in-person', label: t('training.format.in-person') },
    { key: 'hybrid', label: t('training.format.hybrid') },
  ];

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold font-title text-secondary dark:text-white mb-4">
            {t('training.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('training.subtitle')}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 mb-8"
        >
          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              {t('training.filters.category')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setFilter(category.key as any)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === category.key
                      ? 'bg-primary text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Level and Format Filters */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                {t('training.filters.level')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <button
                    key={level.key}
                    onClick={() => setLevelFilter(level.key as any)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      levelFilter === level.key
                        ? 'bg-primary text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                {t('training.filters.format')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {formats.map((format) => (
                  <button
                    key={format.key}
                    onClick={() => setFormatFilter(format.key as any)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      formatFilter === format.key
                        ? 'bg-primary text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    {format.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trainings Grid */}
        {filteredTrainings.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTrainings.map((training, index) => (
              <TrainingCard
                key={training.id}
                training={training}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <i className="bx bx-search-alt text-6xl text-gray-400 dark:text-gray-500 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              {t('training.noTrainings')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t('training.noTrainingsDescription')}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};