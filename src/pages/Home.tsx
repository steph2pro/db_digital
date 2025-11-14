import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from "motion/react"
import { ProjectCard } from '../components/sections/ProjectCard';
import { skills } from '../data/skills';
import { useApp } from '../contexts/AppContext';
import { CTASection } from '../components/sections/CTASection';
import { Helmet } from 'react-helmet-async';

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const { getFeaturedProjects } = useApp();

  const featuredProjects = getFeaturedProjects().slice(0, 6);
  const featuredSkills = skills.filter(skill => skill.level >= 80).slice(0, 6);

  const stats = [
    { number: '30+', label: t('home.stats.projects') },
    { number: '5+', label: t('home.stats.experience') },
    { number: '15+', label: t('home.stats.technologies') },
    { number: '15+', label: t('home.stats.clients') }
  ];

 const services = [
  {
    icon: 'bx bx-code-alt',
    title: t('home.services.web.title'),
    description: t('home.services.web.description'),
  },
  {
    icon: 'bx bx-mobile-alt',
    title: t('home.services.mobile.title'),
    description: t('home.services.mobile.description'),
  },
  {
    icon: 'bx bx-server',
    title: t('home.services.backend.title'),
    description: t('home.services.backend.description'),
  },
  {
    icon: 'bx bx-chalkboard',
    title: t('home.services.training.title'),
    description: t('home.services.training.description'),
  },
];


  return (
    <>
    {/* gestion du referencement */}
     <Helmet>
        {/* --- TITRE — */}
        <title>Steph2pro - Développeur Fullstack | Stephane</title>

        {/* --- META DESCRIPTION — */}
        <meta
          name="description"
          content="Développeur fullstack web & mobile freelance. Création d'applications modernes en React, Angular, Flutter, Node.js. Découvrez mes projets et services."
        />

        {/* --- KEYWORDS (facultatif) — */}
        <meta
          name="keywords"
          content="steph2pro, stephDevfolio, stephane kamga,développeur fullstack, react, angular, mobile, freelance, portfolio, cameroun,"
        />

        {/* --- OPEN GRAPH (Facebook, LinkedIn…) — */}
        <meta property="og:title" content="stephane kamga - Développeur Fullstack" />
        <meta
          property="og:description"
          content="Développeur fullstack web & mobile freelance. Visitez mon portfolio."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://steph2pro.com" />
        <meta property="og:image" content="/images/banner.png" />

        {/* --- TWITTER CARD — */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mon Portfolio - Fullstack Developer" />
        <meta
          name="twitter:description"
          content="Développeur web & mobile. Découvrez mes projets."
        />
        <meta name="twitter:image" content="/images/banner.png" />

        {/* --- FAVICON — */}
        <link rel="icon" href="/images/logo/logo-trans.png" />

        {/* --- SCHEMA.ORG JSON-LD (SEO + Google AI) — */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Stephane KAMGA",
            jobTitle: "Développeur Fullstack Freelance",
            url: "https://steph2pro.com",
            sameAs: [
              "https://www.linkedin.com/in/stephane-kamga-6633b1277",
              "https://github.com/steph2pro/",
            ],
          })}
        </script>
      </Helmet>

    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 bg-gradient-to-br from-primary-light to-tertiary dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold font-title text-secondary dark:text-white mb-6"
              >
                {t('home.greeting')}<br />
                {t('home.im')} <span className="text-primary-dark">{t('home.name')}</span><br />
                <span className="text-primary">{t('home.role')}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
              >
                {t('home.description')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <Link
                  to="/projects"
                  className="bg-primary text-white px-8 py-4 rounded-custom hover:bg-primary-dark transition-colors font-medium text-lg flex items-center justify-center space-x-2"
                >
                  <span>{t('home.viewWork')}</span>
                  <i className="bx bx-arrow-back bx-rotate-180"></i>
                </Link>
                <a
                  href="/fichiers/cv_stephane_dev_webMobile.pdf"
                  download
                  className="border border-primary text-primary px-8 py-4 rounded-custom hover:bg-primary hover:text-white transition-colors font-medium text-lg flex items-center justify-center space-x-2"
                >
                  <i className="bx bx-download"></i>
                  <span>{t('home.downloadCV')}</span>
                </a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex justify-center lg:justify-start space-x-6"
              >
                <a
                  href="https://www.linkedin.com/in/stephane-kamga-6633b1277"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-custom text-gray-600 dark:text-gray-300 hover:text-primary hover:shadow-lg transition-all duration-300"
                  title="LinkedIn"
                >
                  <i className="bx bxl-linkedin text-2xl"></i>
                </a>
                <a
                  href="https://github.com/steph2pro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-custom text-gray-600 dark:text-gray-300 hover:text-primary hover:shadow-lg transition-all duration-300"
                  title="GitHub"
                >
                  <i className="bx bxl-github text-2xl"></i>
                </a>
                <a
                  href="mailto:contact.stephpro@gmail.com"
                  className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-custom text-gray-600 dark:text-gray-300 hover:text-primary hover:shadow-lg transition-all duration-300"
                  title="Email"
                >
                  <i className="bx bx-envelope text-2xl"></i>
                </a>
                <a
                  href="https://wa.me/237697374910?text=Bonjour%20Steph2pro%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services%20de%20développement."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-custom text-gray-600 dark:text-gray-300 hover:text-primary hover:shadow-lg transition-all duration-300"
                  title="WhatsApp"
                >
                  <i className="bx bxl-whatsapp text-2xl"></i>
                </a>
              </motion.div>
            </motion.div>

           {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative flex justify-center"
            >
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="home__blob"
                  viewBox="0 0 479 467"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* --- Définition du clipPath --- */}
                  <defs>
                    <clipPath id="blobClip">
                      <path d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z" />
                    </clipPath>
                  </defs>

                  {/* --- Blob principal --- */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                    d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z"
                    className="fill-primary-light"
                  />

                  {/* --- Image ajustée et confinée dans le blob --- */}
                  <image
                    href="/images/moi.jpeg"
                    x="-50"
                    y="-20"
                    width="550"
                    height="500"
                    clipPath="url(#blobClip)"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </motion.svg>

                {/* Floating Elements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-lg"
                >
                  <i className="bx bx-code-alt text-2xl text-white"></i>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg"
                >
                  <i className="bx bx-mobile text-xl text-white"></i>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-title text-secondary dark:text-white mb-4">
              {t('home.services.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('home.services.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-8 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className={`${service.icon} text-3xl text-primary-dark`}></i>
                </div>
                <h3 className="text-xl font-semibold font-title text-secondary dark:text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-title text-secondary dark:text-white mb-4">
              {t('home.featuredProjects.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('home.featuredProjects.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>

          {featuredProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link
                to="/projects"
                className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-3 rounded-custom hover:bg-primary-dark transition-colors font-medium"
              >
                <span>{t('home.featuredProjects.viewAll')}</span>
                <i className="bx bx-chevron-right"></i>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-title text-secondary dark:text-white mb-4">
              {t('home.skills.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('home.skills.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-white dark:bg-gray-900 rounded-2xl shadow-custom flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <i className={`${skill.icon} text-3xl text-primary group-hover:text-primary-dark`}></i>
                </div>
                <div className="text-center">
                  <div className="font-medium text-secondary dark:text-white mb-2">
                    {skill.name}
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {skill.level}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/about"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors font-medium"
            >
              <span>{t('home.skills.viewAll')}</span>
              <i className="bx bx-chevron-right"></i>
            </Link>
          </motion.div>
        </div>
      </section>

        <CTASection
        variant="primary"
        titleKey="home.cta.title"
        descriptionKey="home.cta.description"
        primaryButton={{
          textKey: "home.cta.getInTouch",
          link: "/contact"
        }}
        secondaryButton={{
          textKey: "home.cta.downloadCV",
          action: "download",
          target: "/fichiers/cv_stephane_dev_webMobile.pdf"
        }}
      />
    </div>
    </>
  );
};