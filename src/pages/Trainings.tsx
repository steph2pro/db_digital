// pages/Trainings.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from "motion/react";
import { TrainingsList } from './TrainingsList';
import { trainingsData } from '../data/trainings';
import { CTASection } from '../components/sections/CTASection';

export const Trainings: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl lg:text-6xl font-bold font-title mb-6">
              {t('training.hero.title')}
            </h1>
            <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
              {t('training.hero.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <i className="bx bx-chalkboard mr-2"></i>
                {trainingsData.length} {t('training.hero.trainings')}
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <i className="bx bx-user-voice mr-2"></i>
                {t('training.hero.expertTrainer')}
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <i className="bx bx-briefcase-alt mr-2"></i>
                {t('training.hero.practicalApproach')}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trainings List */}
      <TrainingsList trainings={trainingsData} />

      {/* CTA Section */}
       <CTASection
              variant="secondary"
              titleKey="training.cta.title"
              descriptionKey="training.cta.description"
              primaryButton={{
                textKey: "training.cta.contac",
                link: "/contact"
              }}
              secondaryButton={{
                textKey: "training.cta.brochure",
                action: "download",
                target: "/fichiers/digital-solutions-fichePrix.pdf"
              }}
            />
      
    </div>
  );
};