import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from "motion/react";
import { skills } from '../data/skills';
import { experiences, education, stats } from '../data/aboutData';
import { CTASection } from '../components/sections/CTASection';

export const About: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as 'fr' | 'en';

  const frontendSkills = skills.filter(skill => skill.category === 'frontend');
  const backendSkills = skills.filter(skill => skill.category === 'backend');
  const mobileSkills = skills.filter(skill => skill.category === 'mobile');
  const toolsSkills = skills.filter(skill => skill.category === 'tools');

  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-title text-secondary dark:text-white mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 mb-20"
        >
          <div>
            <img
              src="/images/about.jpeg"
              alt="Stéphane Kamga"
              className="w-full max-w-md mx-auto rounded-custom shadow-custom"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold font-title text-secondary dark:text-white mb-6">
              {t('about.whoAmI')}
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg">
              <p>{t('about.introduction1')}</p>
              <p>{t('about.introduction2')}</p>
              <p>{t('about.introduction3')}</p>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">{stats.projectsCompleted}+</div>
                <div className="text-gray-600 dark:text-gray-300">{t('about.projectsCompleted')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">{stats.yearsExperience}+</div>
                <div className="text-gray-600 dark:text-gray-300">{t('about.yearsExperience')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">{stats.technologies}+</div>
                <div className="text-gray-600 dark:text-gray-300">{t('about.technologies')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">{stats.happyClients}+</div>
                <div className="text-gray-600 dark:text-gray-300">{t('about.happyClients')}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold font-title text-center text-secondary dark:text-white mb-12">
            {t('about.skills')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Frontend Skills */}
            <div className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="bx bxl-react text-2xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-semibold font-title text-secondary dark:text-white">
                  Frontend
                </h3>
              </div>
              <div className="space-y-3">
                {frontendSkills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">{skill.name}</span>
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend Skills */}
            <div className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="bx bx-server text-2xl text-green-600"></i>
                </div>
                <h3 className="text-xl font-semibold font-title text-secondary dark:text-white">
                  Backend
                </h3>
              </div>
              <div className="space-y-3">
                {backendSkills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">{skill.name}</span>
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Skills */}
            <div className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="bx bx-mobile text-2xl text-purple-600"></i>
                </div>
                <h3 className="text-xl font-semibold font-title text-secondary dark:text-white">
                  Mobile
                </h3>
              </div>
              <div className="space-y-3">
                {mobileSkills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">{skill.name}</span>
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Others */}
            <div className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="bx bx-cog text-2xl text-orange-600"></i>
                </div>
                <h3 className="text-xl font-semibold font-title text-secondary dark:text-white">
                  {t('about.tools')}
                </h3>
              </div>
              <div className="space-y-3">
                {toolsSkills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">{skill.name}</span>
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold font-title text-center text-secondary dark:text-white mb-12">
            {t('about.experience')}
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>

            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                } mb-8`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full z-10"></div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}>
                  <div className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-primary bg-primary-light px-3 py-1 rounded-full">
                        {exp.period}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold font-title text-secondary dark:text-white mb-2">
                      {exp.role[currentLang]}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-3">{exp.company}</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {exp.description[currentLang]}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold font-title text-center text-secondary dark:text-white mb-12">
            {t('about.education')}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                    <i className="bx bx-graduation-cap text-2xl text-primary-dark"></i>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-primary">{edu.year}</span>
                    <h3 className="text-lg font-semibold font-title text-secondary dark:text-white">
                      {edu.degree[currentLang]}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-3">{edu.school}</p>
                <p className="text-gray-600 dark:text-gray-300">
                  {edu.description[currentLang]}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
            <CTASection
        variant="secondary"
        titleKey="about.cta.title"
        descriptionKey="about.cta.description"
        primaryButton={{
          textKey: "about.cta.contact",
          link: "/contact"
        }}
        secondaryButton={{
          textKey: "about.cta.downloadCV",
          action: "download",
          target: "/fichiers/cv_stephane_dev_webMobile.pdf"
        }}
      />
      </div>
    </div>
  );
};