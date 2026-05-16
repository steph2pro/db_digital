import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { serviceCategories } from '../data/servicesData';
import { useServicesCarousel } from '../hooks/useServicesCarousel';
import { ServicesHero } from '../components/sections/services/ServicesHero';
import { ServicesCTA } from '../components/sections/services/ServicesCTA';
import { CategorySection } from '../components/sections/services/CategorySection';

export const ServicesPage: React.FC = () => {
  const { isDark } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  const {
    current,
    progress,
    stripX,
    thumbRefs,
    heroRef,
    expandingIndex,
    expandRect,
    goTo,
    resetTimer,
  } = useServicesCarousel();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleThumbClick = (index: number) => {
    goTo(index);
    resetTimer();
  };

  const currentCategory = serviceCategories[current];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: isDark ? '#070707' : '#f8f8f6',
        fontFamily: "'Outfit', 'DM Sans', sans-serif",
      }}
    >
      <ServicesHero
        currentCategory={currentCategory}
        currentIndex={current}
        progress={progress}
        stripX={stripX}
        thumbRefs={thumbRefs}
        expandingIndex={expandingIndex}
        expandRect={expandRect}
        isMobile={isMobile}
        onThumbClick={handleThumbClick}
        heroRef={heroRef}
      />

      <div id="services-list">
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: isMobile ? '40px 16px' : '64px 64px',
          }}
        >
          {serviceCategories.map((category, index) => (
            <CategorySection key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>

      <ServicesCTA isMobile={isMobile} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&display=swap');
      `}</style>
    </div>
  );
};