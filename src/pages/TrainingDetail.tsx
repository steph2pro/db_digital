// pages/TrainingDetail.tsx
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from "motion/react";
import { Button } from '../components/ui/Button';
import { ImageModal } from '../components/ui/ImageModal';
import { useApp } from '../contexts/AppContext';

export const TrainingDetail: React.FC = () => {
  const { trainingId } = useParams<{ trainingId: string }>();
  const { t, i18n } = useTranslation();
  const { getTrainingById } = useApp();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const training = trainingId ? getTrainingById(trainingId) : undefined;

  if (!training) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-4">
            {t('training.notFound')}
          </h2>
          <Button onClick={() => navigate('/trainings')}>
            {t('common.backToTrainings')}
          </Button>
        </div>
      </div>
    );
  }

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

  // Pour l'exemple, nous allons créer un tableau d'images de la formation
  const trainingImages = [
    training.image,
    // `/images/trainings/${training.id}-1.jpg`,
    // `/images/trainings/${training.id}-2.jpg`,
    // `/images/trainings/${training.id}-3.jpg`
  ].filter(img => img !== training.image); // Supprimer les doublons

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === trainingImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? trainingImages.length - 1 : prev - 1
    );
  };

  const openImageModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
  };

  const hasNextImage = trainingImages.length > 1;
  const hasPrevImage = trainingImages.length > 1;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-20">
      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <Link to="/" className="hover:text-primary transition-colors">
            {t('nav.home')}
          </Link>
          <span>/</span>
          <Link to="/trainings" className="hover:text-primary transition-colors">
            {t('nav.trainings')}
          </Link>
          <span>/</span>
          <span className="text-primary">{training.title[currentLanguage]}</span>
        </nav>

        {/* Training Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-8 mb-8"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Training Image */}
            <div className="relative">
              <div 
                className="relative h-80 lg:h-96 rounded-lg overflow-hidden cursor-zoom-in"
                onClick={() => openImageModal(0)}
              >
                <img
                  src={training.image}
                  alt={training.title[currentLanguage]}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                
                {/* Badges overlay */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(training.category)}`}>
                    {t(`training.category.${training.category}`)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(training.level)}`}>
                    {t(`training.level.${training.level}`)}
                  </span>
                  {training.featured && (
                    <span className="px-3 py-1 bg-accent text-white rounded-full text-sm font-medium">
                      {t('training.featured')}
                    </span>
                  )}
                </div>
              </div>

              {/* Additional Images */}
              {trainingImages.length > 1 && (
                <div className="flex space-x-2 mt-4 overflow-x-auto">
                  {trainingImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => openImageModal(index)}
                      className="flex-shrink-0 w-16 h-16 rounded border-2 border-gray-300 dark:border-gray-600 hover:border-primary/50 transition-all"
                    >
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover rounded cursor-pointer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Training Info */}
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <i className={getFormatIcon(training.format)}></i>
                  <span>{t(`training.format.${training.format}`)}</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600 dark:text-gray-400">{training.duration}</span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold font-title text-secondary dark:text-white mb-4">
                {training.title[currentLanguage]}
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {training.description[currentLanguage]}
              </p>

              {/* Training Metadata */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {t('training.detail.format')}
                  </span>
                  <p className="font-medium flex items-center space-x-2">
                    <i className={getFormatIcon(training.format)}></i>
                    <span>{t(`training.format.${training.format}`)}</span>
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {t('training.detail.duration')}
                  </span>
                  <p className="font-medium">{training.duration}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {t('training.detail.level')}
                  </span>
                  <p className="font-medium">{t(`training.level.${training.level}`)}</p>
                </div>
                {training.price && (
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {t('training.detail.price')}
                    </span>
                    <p className="font-medium text-primary">{training.price[currentLanguage]}</p>
                  </div>
                )}
                {training.nextSession && (
                  <div className="col-span-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {t('training.nextSession')}
                    </span>
                    <p className="font-medium text-green-600 dark:text-green-400">
                      {training.nextSession}
                    </p>
                  </div>
                )}
              </div>

              {/* Stats */}
              {(training.studentsCount || training.rating) && (
                <div className="flex items-center space-x-6 mb-6">
                  {training.studentsCount && (
                    <div className="flex items-center space-x-2">
                      <i className="bx bx-user text-primary"></i>
                      <span className="text-gray-600 dark:text-gray-300">
                        {training.studentsCount}+ {t('training.detail.students')}
                      </span>
                    </div>
                  )}
                  {training.rating && (
                    <div className="flex items-center space-x-2">
                      <i className="bx bx-star text-yellow-500"></i>
                      <span className="text-gray-600 dark:text-gray-300">
                        {training.rating}/5 {t('training.detail.rating')}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-custom hover:bg-primary-dark transition-colors font-semibold">
                  <i className="bx bx-envelope"></i>
                  <span>{t('training.detail.contact')}</span>
                </button>
                <button className="flex items-center space-x-2 px-6 py-3 border border-primary text-primary rounded-custom hover:bg-primary hover:text-white transition-colors font-semibold">
                  <i className="bx bx-download"></i>
                  <span>{t('training.detail.brochure')}</span>
                </button>
                {training.institution && (
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-custom">
                    <i className="bx bx-building text-gray-600 dark:text-gray-400"></i>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {training.institution}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Training Details */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Objectives */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6"
            >
              <h3 className="text-xl font-semibold font-title text-secondary dark:text-white mb-4">
                {t('training.detail.objectives')}
              </h3>
              <ul className="space-y-3">
                {training.objectives[currentLanguage].map((objective, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <i className="bx bx-check text-primary mt-1"></i>
                    <span className="text-gray-600 dark:text-gray-300">
                      {objective}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Training Program */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6"
            >
              <h3 className="text-xl font-semibold font-title text-secondary dark:text-white mb-4">
                {t('training.detail.program')}
              </h3>
              <div className="space-y-4">
                {training.program[currentLanguage].map((module, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4 py-2">
                    <h4 className="font-semibold text-secondary dark:text-white mb-1">
                      {t('training.detail.module')} {index + 1}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {module}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6"
            >
              <h3 className="text-xl font-semibold font-title text-secondary dark:text-white mb-4">
                {t('training.detail.technologies')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {training.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary-light text-primary-dark rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Training Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6"
            >
              <h4 className="text-lg font-semibold font-title text-secondary dark:text-white mb-4">
                {t('training.detail.summary')}
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    {t('training.detail.category')}
                  </span>
                  <span className="font-medium text-secondary dark:text-white">
                    {t(`training.category.${training.category}`)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    {t('training.detail.level')}
                  </span>
                  <span className="font-medium text-secondary dark:text-white">
                    {t(`training.level.${training.level}`)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    {t('training.detail.format')}
                  </span>
                  <span className="font-medium text-secondary dark:text-white">
                    {t(`training.format.${training.format}`)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    {t('training.detail.duration')}
                  </span>
                  <span className="font-medium text-secondary dark:text-white">
                    {training.duration}
                  </span>
                </div>
                {training.price && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      {t('training.detail.price')}
                    </span>
                    <span className="font-medium text-primary">
                      {training.price[currentLanguage]}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Trainer Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6"
            >
              <h4 className="text-lg font-semibold font-title text-secondary dark:text-white mb-4">
                {t('training.detail.trainer')}
              </h4>
              <div className="flex items-center space-x-3">
                <img
                  src="/images/moi.jpeg"
                  alt="Stéphane Kamga"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-secondary dark:text-white">
                    Stéphane Kamga
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('training.detail.seniorTrainer')}
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <p>✓ {t('training.detail.experience')}</p>
                <p>✓ {t('training.detail.practicalApproach')}</p>
                <p>✓ {t('training.detail.industryExpert')}</p>
              </div>
            </motion.div>

            {/* Testimonials */}
            {training.testimonials && training.testimonials.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6"
              >
                <h4 className="text-lg font-semibold font-title text-secondary dark:text-white mb-4">
                  {t('training.detail.testimonials')}
                </h4>
                <div className="space-y-4">
                  {training.testimonials.map((testimonial, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4 py-2">
                      <p className="text-gray-600 dark:text-gray-300 italic mb-3 text-sm">
                        "{testimonial.text[currentLanguage]}"
                      </p>
                      <div className="flex items-center space-x-3">
                        {testimonial.avatar && (
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-8 h-8 rounded-full"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-secondary dark:text-white text-sm">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        image={trainingImages[currentImageIndex]}
        isOpen={isModalOpen}
        onClose={closeImageModal}
        onNext={nextImage}
        onPrev={prevImage}
        hasNext={hasNextImage}
        hasPrev={hasPrevImage}
        title={training.title[currentLanguage]}
      />
    </div>
  );
};