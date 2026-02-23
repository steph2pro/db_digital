/**
 * DB Digital Agency — HomePage
 *
 * Assembles all sections in order. Each section is a standalone component.
 * ThemeProvider must wrap this page (or the App root).
 *
 * Required packages:
 *   npm install motion react-i18next react-helmet-async react-router-dom
 *
 * Fonts loaded via CSS (globals.css):
 *   Syne (display) + Plus Jakarta Sans (body) — from Google Fonts
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

import { useTheme } from '../contexts/ThemeContext';
// import { HeroSection } from '../components/sections/home/HeroSection';
// import {
//   TickerSection,
//   ServicesSection,
//   StatsSection,
//   VisionSection,
//   PartnersSection,
//   WhySection,
//   ProcessSection,
//   CTASection,
// } from '../components/Section';
import HeroSection from '../components/sections/home/HeroSection';
import TickerSection from '../components/sections/home/tiketSection';
import { ServicesSection } from '../components/sections/home/ServicesSection';
import { StatsSection } from '../components/sections/home/StatsSection';
import { VisionSection } from '../components/sections/home/VisionSection';
import { ProcessSection } from '../components/sections/home/ProcessSection';
import { CTASection } from '../components/sections/CTASection';
import TeamSection from '../components/sections/home/TeamSection';
import TestimonialsSection from '../components/sections/home/TestimonialsSection';


// ─── Page ─────────────────────────────────────────────────────────────────────
export const Home: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <>
      {/* ── SEO ── */}
      <Helmet>
        <html lang="fr" data-theme={isDark ? 'dark' : 'light'} />
        <title>DB Digital Agency — Solutions Digitales Premium</title>
        <meta
          name="description"
          content="DB Digital Agency transforme vos idées en produits numériques performants : sites web, applications mobiles, backend & APIs. Basée au Cameroun, portée sur l'Afrique."
        />
        <meta name="keywords" content="DB Digital Agency, agence digitale, développement web, application mobile, Flutter, React, Node.js, Cameroun, Afrique" />
        <meta property="og:title"       content="DB Digital Agency — Solutions Digitales Premium" />
        <meta property="og:description" content="Multipliez vos ventes avec des solutions digitales qui transforment vos visiteurs en clients." />
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content="https://db-digital.agency" />
        <meta property="og:image"       content="/images/og-banner.png" />
        <meta name="twitter:card"       content="summary_large_image" />
        <link rel="icon" href="/images/logo/logo-trans.png" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'DB Digital Agency',
          description: 'Agence de développement web et mobile premium',
          url: 'https://db-digital.agency',
          logo: 'https://db-digital.agency/images/logo/logo-trans.png',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+237697374910',
            contactType: 'customer service',
            availableLanguage: ['French', 'English'],
          },
          address: { '@type': 'PostalAddress', addressLocality: 'Yaoundé', addressCountry: 'CM' },
          sameAs: ['https://linkedin.com/company/db-digital-agency'],
        })}</script>
      </Helmet>

      {/* ── Custom cursor (hidden on mobile via CSS) ── */}
      {/* <CustomCursor /> */}

      {/* ── Navigation ── */}
      {/* <Navbar /> */}

      {/* ── Page content ── */}
      <main>
        {/* 1. Hero slider with particles + animated lines */}
        <HeroSection  />

        {/* 2. Scrolling ticker */}
        <TickerSection />

        {/* 3. Services (6 cards with hover flip) */}
        <ServicesSection />

        {/* 4. Stats with animated counters */}
        <StatsSection />

        {/* 5. Vision + orbital animation */}
        <VisionSection />

        {/* 6. Partners marquee */}
        {/* <PartnersSection />

        {/* 7. Why us + progress bars */}
        {/* <WhySection /> */}

        {/* 8. Process timeline */}
        <ProcessSection />

        {/* 9. CTA with gradient + animated lines */}
        <TeamSection />
        <TestimonialsSection />
      </main>

      {/* ── WhatsApp floating button ── */}
    </>
  );
};

export default Home;