import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button';
import { motion } from "motion/react"
import { useApp } from '../contexts/AppContext';
import { ImageModal } from '../components/ui/ImageModal';

export const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { t, i18n } = useTranslation();
  const { getProjectById } = useApp();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const project = projectId ? getProjectById(projectId) : undefined;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-4">
            {t('project.notFound')}
          </h2>
          <Button onClick={() => navigate('/projects')}>
            {t('common.backToProjects')}
          </Button>
        </div>
      </div>
    );
  }

  const currentLanguage = i18n.language as 'fr' | 'en';

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const openImageModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
  };

  const hasNextImage = project.images.length > 1;
  const hasPrevImage = project.images.length > 1;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-20">
      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <Link to="/" className="hover:text-primary transition-colors">
            {t('nav.home')}
          </Link>
          <span>/</span>
          <Link to="/projects" className="hover:text-primary transition-colors">
            {t('nav.projects')}
          </Link>
          <span>/</span>
          <span className="text-primary">{project.title[currentLanguage]}</span>
        </nav>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-8 mb-8"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="relative">
              <div 
                className="relative h-80 lg:h-96 rounded-lg overflow-hidden cursor-zoom-in"
                onClick={() => openImageModal(currentImageIndex)}
              >
                <img
                  src={project.images[currentImageIndex]}
                  alt={project.title[currentLanguage]}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <i className="bx bx-chevron-left text-xl"></i>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <i className="bx bx-chevron-right text-xl"></i>
                    </button>
                  </>
                )}
              </div>

              {/* Image Thumbnails */}
              {project.images.length > 1 && (
                <div className="flex space-x-2 mt-4 overflow-x-auto">
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-primary scale-110'
                          : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover rounded cursor-pointer"
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Project Info */}
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'completed' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : project.status === 'in-progress'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                }`}>
                  {t(`project.status.${project.status}`)}
                </span>
                <span className="px-3 py-1 bg-primary-light text-primary-dark rounded-full text-sm font-medium">
                  {t(`project.category.${project.category}`)}
                </span>
                {project.isPrivate && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-sm font-medium">
                    <i className="bx bx-lock-alt mr-1"></i>
                    {t('project.private')}
                  </span>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold font-title text-secondary dark:text-white mb-4">
                {project.title[currentLanguage]}
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {project.fullDescription[currentLanguage]}
              </p>

              {/* Project Metadata */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {t('project.startDate')}
                  </span>
                  <p className="font-medium">{project.startDate}</p>
                </div>
                {project.endDate && (
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {t('project.endDate')}
                    </span>
                    <p className="font-medium">{project.endDate}</p>
                  </div>
                )}
                {project.client && (
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {t('project.client')}
                    </span>
                    <p className="font-medium">{project.client}</p>
                  </div>
                )}
                {project.teamSize && (
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {t('project.teamSize')}
                    </span>
                    <p className="font-medium">
                      {project.teamSize} {t('project.people')}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.isPrivate ? (
                  <div className="flex items-center space-x-2 px-6 py-3 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-custom border border-purple-300 dark:border-purple-700">
                    <i className="bx bx-lock-alt text-xl"></i>
                    <span>{t('project.privateProject')}</span>
                  </div>
                ) : (
                  project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-6 py-3 bg-gray-800 text-white rounded-custom hover:bg-gray-900 transition-colors"
                    >
                      <i className="bx bxl-github text-xl"></i>
                      <span>GitHub</span>
                    </a>
                  )
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-custom hover:bg-primary-dark transition-colors"
                  >
                    <i className="bx bx-globe text-xl"></i>
                    <span>{t('project.liveDemo')}</span>
                  </a>
                )}
                {project.appStoreUrl && (
                  <a
                    href={project.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-3 bg-black text-white rounded-custom hover:bg-gray-800 transition-colors"
                  >
                    <i className="bx bxl-apple text-xl"></i>
                    <span>App Store</span>
                  </a>
                )}
                {project.playStoreUrl && (
                  <a
                    href={project.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-custom hover:bg-green-700 transition-colors"
                  >
                    <i className="bx bxl-play-store text-xl"></i>
                    <span>Play Store</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Le reste du code reste inchangé */}
        {/* Project Details */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6"
            >
              <h3 className="text-xl font-semibold font-title text-secondary dark:text-white mb-4">
                {t('project.technologies')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary-light text-primary-dark rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6"
            >
              <h3 className="text-xl font-semibold font-title text-secondary dark:text-white mb-4">
                {t('project.features')}
              </h3>
              <ul className="space-y-2">
                {project.features[currentLanguage].map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <i className="bx bx-check text-primary mt-1"></i>
                    <span className="text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Challenges & Solutions */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6"
              >
                <h3 className="text-xl font-semibold font-title text-secondary dark:text-white mb-4">
                  {t('project.challenges')}
                </h3>
                <ul className="space-y-2">
                  {project.challenges[currentLanguage].map((challenge, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <i className="bx bx-error-circle text-red-500 mt-1"></i>
                      <span className="text-gray-600 dark:text-gray-300">
                        {challenge}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6"
              >
                <h3 className="text-xl font-semibold font-title text-secondary dark:text-white mb-4">
                  {t('project.solutions')}
                </h3>
                <ul className="space-y-2">
                  {project.solutions[currentLanguage].map((solution, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <i className="bx bx-check-double text-green-500 mt-1"></i>
                      <span className="text-gray-600 dark:text-gray-300">
                        {solution}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Testimonials */}
            {project.testimonials && project.testimonials.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6"
              >
                <h3 className="text-xl font-semibold font-title text-secondary dark:text-white mb-4">
                  {t('project.testimonials')}
                </h3>
                <div className="space-y-6">
                  {project.testimonials.map((testimonial, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4 py-2">
                      <p className="text-gray-600 dark:text-gray-300 italic mb-3">
                        "{testimonial.text[currentLanguage]}"
                      </p>
                      <div className="flex items-center space-x-3">
                        {testimonial.avatar && (
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-10 h-10 rounded-full"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-secondary dark:text-white">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6"
            >
              <h4 className="text-lg font-semibold font-title text-secondary dark:text-white mb-4">
                {t('project.projectInfo')}
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    {t('projects.category')}
                  </span>
                  <span className="font-medium text-secondary dark:text-white">
                    {t(`project.category.${project.category}`)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    {t('projects.status')}
                  </span>
                  <span className="font-medium text-secondary dark:text-white">
                    {t(`project.status.${project.status}`)}
                  </span>
                </div>
                {project.isPrivate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      {t('project.visibility')}
                    </span>
                    <span className="font-medium text-purple-600 dark:text-purple-400">
                      {t('project.private')}
                    </span>
                  </div>
                )}
                {project.teamSize && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      {t('project.teamSize')}
                    </span>
                    <span className="font-medium text-secondary dark:text-white">
                      {project.teamSize} {t('project.people')}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Related Projects */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6"
            >
              <h4 className="text-lg font-semibold font-title text-secondary dark:text-white mb-4">
                {t('project.relatedProjects')}
              </h4>
              <div className="space-y-3">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t('projects.noProjects')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal pour l'affichage plein écran */}
      <ImageModal
        image={project.images[currentImageIndex]}
        isOpen={isModalOpen}
        onClose={closeImageModal}
        onNext={nextImage}
        onPrev={prevImage}
        hasNext={hasNextImage}
        hasPrev={hasPrevImage}
        title={project.title[currentLanguage]}
      />
    </div>
  );
};