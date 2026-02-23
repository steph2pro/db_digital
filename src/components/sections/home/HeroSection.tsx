// src/components/sections/home/HeroSection.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion ,useScroll, useTransform, AnimatePresence, Variants} from "motion/react";
import { useTheme } from '../../../contexts/ThemeContext';
import { Button } from '../../ui/Button';

// Données du slider avec clés de traduction cohérentes et images d'arrière-plan
const sliderContent = [
  {
    id: 1,
    eyebrowKey: "home.hero.slider.innovation.eyebrow",
    title: {
      part1Key: "home.hero.slider.innovation.title.part1",
      highlightKey: "home.hero.slider.innovation.title.highlight",
      part2Key: "home.hero.slider.innovation.title.part2"
    },
    descriptionKey: "home.hero.slider.innovation.description",
    backgroundImage: "/images/slider/innovation.jpg",
    overlay: "bg-gradient-to-r from-black/70 to-black/50",
    icon: "bx bx-bulb"
  },
  { 
    id: 2,
    eyebrowKey: "home.hero.slider.performance.eyebrow",
    title: {
      part1Key: "home.hero.slider.performance.title.part1",
      highlightKey: "home.hero.slider.performance.title.highlight",
      part2Key: "home.hero.slider.performance.title.part2"
    },
    descriptionKey: "home.hero.slider.performance.description",
    backgroundImage: "/images/slider/performance.jpg",
    overlay: "bg-gradient-to-r from-black/70 to-black/50",
    icon: "bx bx-rocket"
  },
  {
    id: 3,
    eyebrowKey: "home.hero.slider.expertise.eyebrow",
    title: {
      part1Key: "home.hero.slider.expertise.title.part1",
      highlightKey: "home.hero.slider.expertise.title.highlight",
      part2Key: "home.hero.slider.expertise.title.part2"
    },
    descriptionKey: "home.hero.slider.expertise.description",
    backgroundImage: "/images/slider/expertise.jpg",
    overlay: "bg-gradient-to-r from-black/70 to-black/50",
    icon: "bx bx-crown"
  }
];

// Données des réseaux sociaux avec appels à suivre
const socialFollows = [
  {
    platform: 'linkedin',
    icon: 'bxl-linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/db-digital-agency',
    color: 'bg-[#0077B5]',
    followers: '2.5k',
    ctaKey: "home.hero.social.follow.linkedin",
    rotation: -5
  },
  {
    platform: 'twitter',
    icon: 'bxl-twitter',
    label: 'Twitter',
    href: 'https://twitter.com/dbdigitalagency',
    color: 'bg-black dark:bg-gray-800',
    followers: '1.8k',
    ctaKey: "home.hero.social.follow.twitter",
    rotation: 2
  },
  {
    platform: 'github',
    icon: 'bxl-github',
    label: 'GitHub',
    href: 'https://github.com/dbdigitalagency',
    color: 'bg-gray-800 dark:bg-gray-700',
    followers: '1.2k',
    ctaKey: "home.hero.social.follow.github",
    rotation: 3
  },
  {
    platform: 'instagram',
    icon: 'bxl-instagram',
    label: 'Instagram',
    href: 'https://instagram.com/dbdigitalagency',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    followers: '3.2k',
    ctaKey: "home.hero.social.follow.instagram",
    rotation: -2
  },
  {
    platform: 'youtube',
    icon: 'bxl-youtube',
    label: 'YouTube',
    href: 'https://youtube.com/@dbdigitalagency',
    color: 'bg-[#FF0000]',
    followers: '950',
    ctaKey: "home.hero.social.follow.youtube",
    rotation: 4
  },
  {
    platform: 'tiktok',
    icon: 'bxl-tiktok',
    label: 'TikTok',
    href: 'https://tiktok.com/@dbdigitalagency',
    color: 'bg-black',
    followers: '4.1k',
    ctaKey: "home.hero.social.follow.tiktok",
    rotation: -3
  }
];

// Messages qui défilent
const rotatingMessagesKeys = [
  "home.hero.messages.innovation",
  "home.hero.messages.quality",
  "home.hero.messages.support",
  "home.hero.messages.deadline",
  "home.hero.messages.satisfaction"
];

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const containerRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // États pour le slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Gestion du scroll horizontal sur mobile
  useEffect(() => {
    if (!isMobile || !scrollContainerRef.current) return;

    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;
      
      const scrollPosition = container.scrollLeft;
      const slideWidth = container.clientWidth;
      const newIndex = Math.round(scrollPosition / slideWidth);
      
      if (newIndex !== currentSlide && newIndex >= 0 && newIndex < sliderContent.length) {
        setCurrentSlide(newIndex);
        setIsAutoPlaying(false);
      }
    };

    const container = scrollContainerRef.current;
    container.addEventListener('scroll', handleScroll);
    
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isMobile, currentSlide]);

  // Effets parallax - ajustés pour mobile
  const y1 = useTransform(scrollY, [0, 500], [0, isMobile ? 10 : 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, isMobile ? -10 : -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  // Préchargement des images
  useEffect(() => {
    sliderContent.forEach(slide => {
      const img = new Image();
      img.src = slide.backgroundImage;
    });
  }, []);

  // Animation des messages qui défilent - ajusté pour mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % rotatingMessagesKeys.length);
    }, isMobile ? 4000 : 3000);
    return () => clearInterval(interval);
  }, [isMobile]);

  // Auto-play du slider (désactivé sur mobile)
  useEffect(() => {
    if (isMobile || !isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, isMobile]);

  // Gestionnaires de navigation (désactivés sur mobile)
  const nextSlide = useCallback(() => {
    if (isMobile) return;
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
  }, [isMobile]);

  const prevSlide = useCallback(() => {
    if (isMobile) return;
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + sliderContent.length) % sliderContent.length);
  }, [isMobile]);

  const goToSlide = useCallback((index: number) => {
    if (isMobile) {
      // Sur mobile, scroller vers la slide
      if (scrollContainerRef.current) {
        const slideWidth = scrollContainerRef.current.clientWidth;
        scrollContainerRef.current.scrollTo({
          left: index * slideWidth,
          behavior: 'smooth'
        });
      }
    } else {
      setIsAutoPlaying(false);
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
    }
  }, [currentSlide, isMobile]);

  // Animation des particules - ajusté pour mobile (moins de particules)
  useEffect(() => {
    const canvas = document.getElementById('hero-particles') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrame: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Créer les particules avec couleurs variées - moins de particules sur mobile
    const colors = isDark 
      ? ['#00e676', '#00a8e8', '#00b894', '#ff4081', '#aa00ff']
      : ['#00b894', '#0057b8', '#00a8e8', '#e91e63', '#9c27b0'];

    const particleCount = isMobile ? 30 : 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (isMobile ? 2 : 3) + 0.5,
        speedX: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3),
        speedY: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3),
        opacity: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Rebondir sur les bords
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        // Dessiner la particule
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(')', `, ${p.opacity})`).replace('rgb', 'rgba');
        ctx.fill();

        // Connexions entre particules proches - désactivé sur mobile pour performance
        if (!isMobile) {
          particles.forEach(p2 => {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = p.color.replace(')', `, ${0.1 * (1 - distance/100)})`).replace('rgb', 'rgba');
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        }
      });
      
      animationFrame = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [isDark, isMobile]);

  // Variantes d'animation pour le slider - ajustées pour mobile
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? (isMobile ? 500 : 1000) : (isMobile ? -500 : -1000),
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? (isMobile ? 500 : 1000) : (isMobile ? -500 : -1000),
      opacity: 0
    })
  };

  // Variantes d'animation pour l'image d'arrière-plan - ajustées pour mobile
  const bgImageVariants : Variants= {
    enter: ( ) => ({
      scale: isMobile ? 1.1 : 1.2,
      opacity: 0
    }),
    center: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.8 : 1.2,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    exit: () => ({
      scale: isMobile ? 1.1 : 1.2,
      opacity: 0,
      transition: {
        duration: isMobile ? 0.5 : 0.8
      }
    })
  };

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Images d'arrière-plan du slider avec overlay */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div 
          key={`bg-${currentSlide}`}
          custom={direction}
          variants={bgImageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 z-0"
        >
          {/* Image d'arrière-plan */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${sliderContent[currentSlide].backgroundImage})`,
            }}
          />
          
          {/* Overlay gradient pour la lisibilité */}
          <div className={`absolute inset-0 ${sliderContent[currentSlide].overlay}`} />
          
          {/* Overlay supplémentaire pour le thème sombre/clair */}
          <div className={`absolute inset-0 ${
            isDark 
              ? 'bg-black/30' 
              : 'bg-white/10'
          }`} />
        </motion.div>
      </AnimatePresence>

      {/* Canvas de particules */}
      <canvas
        id="hero-particles"
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Éléments d'arrière-plan animés - ajustés pour mobile */}
      <motion.div
        style={{ y: y1, opacity, position: 'absolute', top: isMobile ? '10%' : '20%', left: isMobile ? '5%' : '10%', zIndex: 1 }}
        className={`${isMobile ? 'w-32 h-32' : 'w-96 h-96'} bg-green-500/10 dark:bg-green-500/20 rounded-full blur-3xl`}
      />
      <motion.div
        style={{ y: y2, opacity, position: 'absolute', bottom: isMobile ? '10%' : '20%', right: isMobile ? '5%' : '10%', zIndex: 1 }}
        className={`${isMobile ? 'w-32 h-32' : 'w-96 h-96'} bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl`}
      />

      {/* Grille de points - ajustée pour mobile */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(0,230,118,0.1)' : 'rgba(0,150,100,0.05)'} 1px, transparent 1px)`,
          backgroundSize: isMobile ? '20px 20px' : '40px 40px',
          zIndex: 1
        }}
      />

      {/* Messages qui défilent en arrière-plan - cachés sur mobile pour lisibilité */}
      {!isMobile && (
        <div className="absolute top-32 left-0 right-0 overflow-hidden opacity-10 pointer-events-none" style={{ zIndex: 1 }}>
          <motion.div
            key={currentMessage}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-7xl md:text-8xl font-bold text-white whitespace-nowrap"
          >
            {t(rotatingMessagesKeys[currentMessage])}
          </motion.div>
        </div>
      )}

      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenu texte avec slider */}
          <div className="text-center lg:text-left relative w-full max-w-full overflow-hidden">
            {/* Version desktop avec animations */}
            {!isMobile ? (
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="relative w-full"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 backdrop-blur-sm text-green-400 rounded-full text-sm font-medium mb-6 border border-green-500/30"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <i className={`${sliderContent[currentSlide].icon} text-lg mr-1`}></i>
                    {t(sliderContent[currentSlide].eyebrowKey)}
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-display text-white mb-6 break-words"
                  >
                    {t(sliderContent[currentSlide].title.part1Key)}{' '}
                    <span className="relative inline-block">
                      <span className="relative z-10 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                        {t(sliderContent[currentSlide].title.highlightKey)}
                      </span>
                      <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="absolute bottom-2 left-0 h-3 bg-green-500/30 -z-10"
                      />
                    </span>
                    <br />
                    {t(sliderContent[currentSlide].title.part2Key)}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto lg:mx-0 break-words"
                  >
                    {t(sliderContent[currentSlide].descriptionKey)}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            ) : (
              /* Version mobile avec scroll horizontal - CONTAINER AJUSTÉ */
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 scrollbar-hide w-screen max-w-[100vw] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
                style={{ 
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none' as const,
                  msOverflowStyle: 'none',
                  width: '100vw',
                  position: 'relative',
                  left: '50%',
                  right: '50%',
                  marginLeft: '-50vw',
                  marginRight: '-50vw',
                }}
              >
                {sliderContent.map((slide) => (
                  <div
                    key={slide.id}
                    className="flex-shrink-0 w-screen snap-center px-6"
                    style={{ width: '100vw' }}
                  >
                    <div className="max-w-[90vw] mx-auto">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 backdrop-blur-sm text-green-400 rounded-full text-sm font-medium mb-6 border border-green-500/30">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <i className={`${slide.icon} text-lg mr-1`}></i>
                        {t(slide.eyebrowKey)}
                      </div>

                      <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mb-4 break-words">
                        {t(slide.title.part1Key)}{' '}
                        <span className="relative inline-block">
                          <span className="relative z-10 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                            {t(slide.title.highlightKey)}
                          </span>
                          <span className="absolute bottom-1 left-0 h-2 bg-green-500/30 -z-10 w-full" />
                        </span>
                        <br />
                        {t(slide.title.part2Key)}
                      </h1>

                      <p className="text-sm sm:text-base text-gray-200 mb-6 max-w-full break-words">
                        {t(slide.descriptionKey)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Navigation dots - ajustés pour mobile */}
            <div className="flex justify-center lg:justify-start gap-2 mt-4 mb-6">
              {sliderContent.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? `${isMobile ? 'w-6' : 'w-8'} bg-green-500`
                      : `w-2 ${isMobile ? 'bg-white/30' : 'bg-white/50'} hover:bg-green-400`
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Boutons d'action - ajustés pour mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start w-full max-w-full"
            >
              <Button
                href="/contact"
                variant="primary"
                size={isMobile ? "md" : "lg"}
                className={`${isMobile ? "w-full px-4 py-3 text-sm" : ""}`}
              >
                {t('home.hero.cta.primary')}
              </Button>
              
              <Button
                href="/projects"
                variant="outline"
                size={isMobile ? "md" : "lg"}
                className={`border-white text-white hover:bg-white/20 ${isMobile ? "w-full px-4 py-3 text-sm" : ""}`}
              >
                {t('home.hero.cta.secondary')}
              </Button>
            </motion.div>

            {/* Contrôles du slider - cachés sur mobile */}
            {!isMobile && (
              <div className="flex gap-2 mt-6 justify-center lg:justify-start">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-110"
                  aria-label="Previous slide"
                >
                  <i className="bx bx-chevron-left text-xl"></i>
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-110"
                  aria-label="Next slide"
                >
                  <i className="bx bx-chevron-right text-xl"></i>
                </button>
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`w-10 h-10 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all ${
                    isAutoPlaying
                      ? 'bg-green-500 text-white border-green-500 hover:bg-green-600'
                      : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                  }`}
                  aria-label={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
                >
                  <i className={`bx ${isAutoPlaying ? 'bx-pause' : 'bx-play'} text-xl`}></i>
                </button>
              </div>
            )}
          </div>

          {/* Image/illustration avec réseaux sociaux flottants - cachée sur mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Cercles animés - ajustés pour tablette */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-2 border-dashed border-white/30 rounded-full"
              />
              
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-8 border-2 border-dashed border-white/20 rounded-full"
              />

              {/* Logo central */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative w-48 md:w-56 lg:w-64 h-48 md:h-56 lg:h-64 mx-auto bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl shadow-2xl flex items-center justify-center backdrop-blur-sm"
              >
                <img
                  src="/images/logo/logo-trans.png"
                  alt="DB Digital Agency"
                  className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain"
                />
              </motion.div>

              {/* Réseaux sociaux flottants avec appels à suivre */}
              {socialFollows.map((social, index) => {
                // Calculer la position sur le cercle
                const angle = (index * 60) * (Math.PI / 180);
                const radius = 180;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute hidden lg:block"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.2, zIndex: 30 }}
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, social.rotation, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        delay: index * 0.2,
                        repeat: Infinity 
                      }}
                      className="relative group"
                    >
                      <div className={`w-12 md:w-14 h-12 md:h-14 ${social.color} rounded-xl shadow-xl flex items-center justify-center text-white text-xl backdrop-blur-sm`}>
                        <i className={`bx ${social.icon} text-xl md:text-2xl`}></i>
                      </div>
                      
                      {/* Tooltip avec appel à suivre */}
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        whileHover={{ opacity: 1, y: 0, scale: 1 }}
                        className="absolute -top-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white/90 backdrop-blur-md text-gray-900 px-4 py-2 rounded-xl shadow-xl pointer-events-none z-40"
                      >
                        <div className="text-sm font-medium">
                          {t(social.ctaKey)}
                        </div>
                        <div className="text-xs text-green-600 mt-1">
                          {social.followers} {t('home.hero.social.followers')}
                        </div>
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-white/90" />
                      </motion.div>
                    </motion.div>
                  </motion.a>
                );
              })}

              {/* Éléments flottants supplémentaires - cachés sur mobile */}
              {[
                { icon: 'bx-bulb', delay: 0, position: '-top-8 left-1/2', tooltip: 'Innovation' },
                { icon: 'bx-rocket', delay: 0.3, position: 'top-1/2 -right-8', tooltip: 'Performance' },
                { icon: 'bx-target-lock', delay: 0.6, position: '-bottom-8 left-1/2', tooltip: 'Précision' },
              ].map((item, index) => (
                <motion.div
                  key={`float-${index}`}
                  className={`absolute ${item.position} transform -translate-x-1/2 group hidden lg:block`}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    delay: item.delay,
                    repeat: Infinity,
                  }}
                >
                  <div className="relative">
                    <div className="w-10 md:w-12 h-10 md:h-12 bg-white/20 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-center text-xl md:text-2xl border border-white/30">
                      <i className={`bx ${item.icon} text-white`}></i>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded"
                    >
                      {item.tooltip}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Badge de followers total - caché sur mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-xl flex items-center gap-3 hidden lg:flex"
            >
              <div className="flex -space-x-2">
                {socialFollows.slice(0, 4).map((social, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 ${social.color} rounded-full border-2 border-white flex items-center justify-center text-white text-xs`}
                  >
                    <i className={`bx ${social.icon} text-sm`}></i>
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-bold text-gray-900">13.8k+</span>
                <span className="text-gray-600 ml-1">{t('home.hero.social.followers')}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Barre de réseaux sociaux en bas - cachée sur mobile pour économiser l'espace */}
      {!isMobile && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 py-3 z-20"
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">
                  {t('home.hero.social.followUs')} :
                </span>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              
              <div className="flex gap-4">
                {socialFollows.slice(0, 6).map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    whileHover={{ y: -3 }}
                  >
                    <div className={`w-8 h-8 ${social.color} rounded-lg flex items-center justify-center text-white text-sm`}>
                      <i className={`bx ${social.icon} text-lg`}></i>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded"
                    >
                      {t(social.ctaKey)}
                    </motion.div>
                  </motion.a>
                ))}
              </div>

              <div className="text-sm text-white/80">
                {t('home.hero.social.join')}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Scroll indicator - ajusté pour mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className={`absolute ${isMobile ? 'bottom-16' : 'bottom-24'} left-1/2 transform -translate-x-1/2 z-20`}
      >
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs font-medium uppercase tracking-wider">
            {t('home.hero.scroll')}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <i className={`bx bx-chevron-down ${isMobile ? 'text-xl' : 'text-2xl'}`}></i>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;








// // src/components/sections/home/HeroSection.tsx
// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import { useTranslation } from 'react-i18next';
// import { motion ,useScroll, useTransform, AnimatePresence, Variants} from "motion/react";
// import { useTheme } from '../../../contexts/ThemeContext';
// import { Button } from '../../ui/Button';

// // Données du slider avec clés de traduction cohérentes et images d'arrière-plan
// const sliderContent = [
//   {
//     id: 1,
//     eyebrowKey: "home.hero.slider.innovation.eyebrow",
//     title: {
//       part1Key: "home.hero.slider.innovation.title.part1",
//       highlightKey: "home.hero.slider.innovation.title.highlight",
//       part2Key: "home.hero.slider.innovation.title.part2"
//     },
//     descriptionKey: "home.hero.slider.innovation.description",
//     backgroundImage: "/images/slider/innovation.jpg",
//     overlay: "bg-gradient-to-r from-black/70 to-black/50",
//     icon: "bx bx-bulb"
//   },
//   { 
//     id: 2,
//     eyebrowKey: "home.hero.slider.performance.eyebrow",
//     title: {
//       part1Key: "home.hero.slider.performance.title.part1",
//       highlightKey: "home.hero.slider.performance.title.highlight",
//       part2Key: "home.hero.slider.performance.title.part2"
//     },
//     descriptionKey: "home.hero.slider.performance.description",
//     backgroundImage: "/images/slider/performance.jpg",
//     overlay: "bg-gradient-to-r from-black/70 to-black/50",
//     icon: "bx bx-rocket"
//   },
//   {
//     id: 3,
//     eyebrowKey: "home.hero.slider.expertise.eyebrow",
//     title: {
//       part1Key: "home.hero.slider.expertise.title.part1",
//       highlightKey: "home.hero.slider.expertise.title.highlight",
//       part2Key: "home.hero.slider.expertise.title.part2"
//     },
//     descriptionKey: "home.hero.slider.expertise.description",
//     backgroundImage: "/images/slider/expertise.jpg",
//     overlay: "bg-gradient-to-r from-black/70 to-black/50",
//     icon: "bx bx-crown"
//   }
// ];

// // Données des réseaux sociaux avec appels à suivre
// const socialFollows = [
//   {
//     platform: 'linkedin',
//     icon: 'bxl-linkedin',
//     label: 'LinkedIn',
//     href: 'https://linkedin.com/company/db-digital-agency',
//     color: 'bg-[#0077B5]',
//     followers: '2.5k',
//     ctaKey: "home.hero.social.follow.linkedin",
//     rotation: -5
//   },
//   {
//     platform: 'twitter',
//     icon: 'bxl-twitter',
//     label: 'Twitter',
//     href: 'https://twitter.com/dbdigitalagency',
//     color: 'bg-black dark:bg-gray-800',
//     followers: '1.8k',
//     ctaKey: "home.hero.social.follow.twitter",
//     rotation: 2
//   },
//   {
//     platform: 'github',
//     icon: 'bxl-github',
//     label: 'GitHub',
//     href: 'https://github.com/dbdigitalagency',
//     color: 'bg-gray-800 dark:bg-gray-700',
//     followers: '1.2k',
//     ctaKey: "home.hero.social.follow.github",
//     rotation: 3
//   },
//   {
//     platform: 'instagram',
//     icon: 'bxl-instagram',
//     label: 'Instagram',
//     href: 'https://instagram.com/dbdigitalagency',
//     color: 'bg-gradient-to-r from-purple-500 to-pink-500',
//     followers: '3.2k',
//     ctaKey: "home.hero.social.follow.instagram",
//     rotation: -2
//   },
//   {
//     platform: 'youtube',
//     icon: 'bxl-youtube',
//     label: 'YouTube',
//     href: 'https://youtube.com/@dbdigitalagency',
//     color: 'bg-[#FF0000]',
//     followers: '950',
//     ctaKey: "home.hero.social.follow.youtube",
//     rotation: 4
//   },
//   {
//     platform: 'tiktok',
//     icon: 'bxl-tiktok',
//     label: 'TikTok',
//     href: 'https://tiktok.com/@dbdigitalagency',
//     color: 'bg-black',
//     followers: '4.1k',
//     ctaKey: "home.hero.social.follow.tiktok",
//     rotation: -3
//   }
// ];

// // Messages qui défilent
// const rotatingMessagesKeys = [
//   "home.hero.messages.innovation",
//   "home.hero.messages.quality",
//   "home.hero.messages.support",
//   "home.hero.messages.deadline",
//   "home.hero.messages.satisfaction"
// ];

// const HeroSection: React.FC = () => {
//   const { t } = useTranslation();
//   const { isDark } = useTheme();
//   const containerRef = useRef<HTMLElement>(null);
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const { scrollY } = useScroll();
  
//   // États pour le slider
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [direction, setDirection] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const [currentMessage, setCurrentMessage] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
  
//   // Détection mobile
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
    
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Gestion du scroll horizontal sur mobile
//   useEffect(() => {
//     if (!isMobile || !scrollContainerRef.current) return;

//     const handleScroll = () => {
//       const container = scrollContainerRef.current;
//       if (!container) return;
      
//       const scrollPosition = container.scrollLeft;
//       const slideWidth = container.clientWidth;
//       const newIndex = Math.round(scrollPosition / slideWidth);
      
//       if (newIndex !== currentSlide && newIndex >= 0 && newIndex < sliderContent.length) {
//         setCurrentSlide(newIndex);
//         setIsAutoPlaying(false);
//       }
//     };

//     const container = scrollContainerRef.current;
//     container.addEventListener('scroll', handleScroll);
    
//     return () => container.removeEventListener('scroll', handleScroll);
//   }, [isMobile, currentSlide]);

//   // Effets parallax - ajustés pour mobile
//   const y1 = useTransform(scrollY, [0, 500], [0, isMobile ? 10 : 150]);
//   const y2 = useTransform(scrollY, [0, 500], [0, isMobile ? -50 : -150]);
//   const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

//   // Préchargement des images
//   useEffect(() => {
//     sliderContent.forEach(slide => {
//       const img = new Image();
//       img.src = slide.backgroundImage;
//     });
//   }, []);

//   // Animation des messages qui défilent - ajusté pour mobile
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentMessage((prev) => (prev + 1) % rotatingMessagesKeys.length);
//     }, isMobile ? 4000 : 3000);
//     return () => clearInterval(interval);
//   }, [isMobile]);

//   // Auto-play du slider (désactivé sur mobile)
//   useEffect(() => {
//     if (isMobile || !isAutoPlaying) return;
    
//     const interval = setInterval(() => {
//       setDirection(1);
//       setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
//     }, 5000);
    
//     return () => clearInterval(interval);
//   }, [isAutoPlaying, isMobile]);

//   // Gestionnaires de navigation (désactivés sur mobile)
//   const nextSlide = useCallback(() => {
//     if (isMobile) return;
//     setIsAutoPlaying(false);
//     setDirection(1);
//     setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
//   }, [isMobile]);

//   const prevSlide = useCallback(() => {
//     if (isMobile) return;
//     setIsAutoPlaying(false);
//     setDirection(-1);
//     setCurrentSlide((prev) => (prev - 1 + sliderContent.length) % sliderContent.length);
//   }, [isMobile]);

//   const goToSlide = useCallback((index: number) => {
//     if (isMobile) {
//       // Sur mobile, scroller vers la slide
//       if (scrollContainerRef.current) {
//         const slideWidth = scrollContainerRef.current.clientWidth;
//         scrollContainerRef.current.scrollTo({
//           left: index * slideWidth,
//           behavior: 'smooth'
//         });
//       }
//     } else {
//       setIsAutoPlaying(false);
//       setDirection(index > currentSlide ? 1 : -1);
//       setCurrentSlide(index);
//     }
//   }, [currentSlide, isMobile]);

//   // Animation des particules - ajusté pour mobile (moins de particules)
//   useEffect(() => {
//     const canvas = document.getElementById('hero-particles') as HTMLCanvasElement;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;
    
//     let animationFrame: number;
//     let particles: Array<{
//       x: number;
//       y: number;
//       size: number;
//       speedX: number;
//       speedY: number;
//       opacity: number;
//       color: string;
//     }> = [];

//     const resize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     resize();
//     window.addEventListener('resize', resize);

//     // Créer les particules avec couleurs variées - moins de particules sur mobile
//     const colors = isDark 
//       ? ['#00e676', '#00a8e8', '#00b894', '#ff4081', '#aa00ff']
//       : ['#00b894', '#0057b8', '#00a8e8', '#e91e63', '#9c27b0'];

//     const particleCount = isMobile ? 30 : 80;

//     for (let i = 0; i < particleCount; i++) {
//       particles.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         size: Math.random() * (isMobile ? 2 : 3) + 0.5,
//         speedX: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3),
//         speedY: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3),
//         opacity: Math.random() * 0.4 + 0.1,
//         color: colors[Math.floor(Math.random() * colors.length)]
//       });
//     }

//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
      
//       particles.forEach(p => {
//         p.x += p.speedX;
//         p.y += p.speedY;
        
//         // Rebondir sur les bords
//         if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
//         if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
//         // Dessiner la particule
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
//         ctx.fillStyle = p.color.replace(')', `, ${p.opacity})`).replace('rgb', 'rgba');
//         ctx.fill();

//         // Connexions entre particules proches - désactivé sur mobile pour performance
//         if (!isMobile) {
//           particles.forEach(p2 => {
//             const dx = p.x - p2.x;
//             const dy = p.y - p2.y;
//             const distance = Math.sqrt(dx * dx + dy * dy);
            
//             if (distance < 100) {
//               ctx.beginPath();
//               ctx.moveTo(p.x, p.y);
//               ctx.lineTo(p2.x, p2.y);
//               ctx.strokeStyle = p.color.replace(')', `, ${0.1 * (1 - distance/100)})`).replace('rgb', 'rgba');
//               ctx.lineWidth = 0.5;
//               ctx.stroke();
//             }
//           });
//         }
//       });
      
//       animationFrame = requestAnimationFrame(draw);
//     };
    
//     draw();
    
//     return () => {
//       window.removeEventListener('resize', resize);
//       cancelAnimationFrame(animationFrame);
//     };
//   }, [isDark, isMobile]);

//   // Variantes d'animation pour le slider - ajustées pour mobile
//   const slideVariants = {
//     enter: (direction: number) => ({
//       x: direction > 0 ? (isMobile ? 500 : 1000) : (isMobile ? -500 : -1000),
//       opacity: 0
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1
//     },
//     exit: (direction: number) => ({
//       zIndex: 0,
//       x: direction < 0 ? (isMobile ? 500 : 1000) : (isMobile ? -500 : -1000),
//       opacity: 0
//     })
//   };

//   // Variantes d'animation pour l'image d'arrière-plan - ajustées pour mobile
//   const bgImageVariants : Variants= {
//     enter: (direction: number) => ({
//       scale: isMobile ? 1.1 : 1.2,
//       opacity: 0
//     }),
//     center: {
//       scale: 1,
//       opacity: 1,
//       transition: {
//         duration: isMobile ? 0.8 : 1.2,
//         ease: [0.43, 0.13, 0.23, 0.96]
//       }
//     },
//     exit: (direction: number) => ({
//       scale: isMobile ? 1.1 : 1.2,
//       opacity: 0,
//       transition: {
//         duration: isMobile ? 0.5 : 0.8
//       }
//     })
//   };

//   return (
//     <motion.section 
//       ref={containerRef}
//       className="relative min-h-screen flex items-center overflow-hidden"
//     >
//       {/* Images d'arrière-plan du slider avec overlay */}
//       <AnimatePresence mode="wait" custom={direction}>
//         <motion.div 
//           key={`bg-${currentSlide}`}
//           custom={direction}
//           variants={bgImageVariants}
//           initial="enter"
//           animate="center"
//           exit="exit"
//           className="absolute inset-0 z-0"
//         >
//           {/* Image d'arrière-plan */}
//           <div 
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage: `url(${sliderContent[currentSlide].backgroundImage})`,
//             }}
//           />
          
//           {/* Overlay gradient pour la lisibilité */}
//           <div className={`absolute inset-0 ${sliderContent[currentSlide].overlay}`} />
          
//           {/* Overlay supplémentaire pour le thème sombre/clair */}
//           <div className={`absolute inset-0 ${
//             isDark 
//               ? 'bg-black/30' 
//               : 'bg-white/10'
//           }`} />
//         </motion.div>
//       </AnimatePresence>

//       {/* Canvas de particules */}
//       <canvas
//         id="hero-particles"
//         className="absolute inset-0 pointer-events-none"
//         style={{ zIndex: 1 }}
//       />

//       {/* Éléments d'arrière-plan animés - ajustés pour mobile */}
//       <motion.div
//         style={{ y: y1, opacity, position: 'absolute', top: isMobile ? '10%' : '20%', left: isMobile ? '5%' : '10%', zIndex: 1 }}
//         className={`${isMobile ? 'w-48 h-48' : 'w-96 h-96'} bg-green-500/10 dark:bg-green-500/20 rounded-full blur-3xl`}
//       />
//       <motion.div
//         style={{ y: y2, opacity, position: 'absolute', bottom: isMobile ? '10%' : '20%', right: isMobile ? '5%' : '10%', zIndex: 1 }}
//         className={`${isMobile ? 'w-48 h-48' : 'w-96 h-96'} bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl`}
//       />

//       {/* Grille de points - ajustée pour mobile */}
//       <div 
//         className="absolute inset-0"
//         style={{
//           backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(0,230,118,0.1)' : 'rgba(0,150,100,0.05)'} 1px, transparent 1px)`,
//           backgroundSize: isMobile ? '20px 20px' : '40px 40px',
//           zIndex: 1
//         }}
//       />

//       {/* Messages qui défilent en arrière-plan - cachés sur mobile pour lisibilité */}
//       {!isMobile && (
//         <div className="absolute top-32 left-0 right-0 overflow-hidden opacity-10 pointer-events-none" style={{ zIndex: 1 }}>
//           <motion.div
//             key={currentMessage}
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: -50, opacity: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-center text-7xl md:text-8xl font-bold text-white whitespace-nowrap"
//           >
//             {t(rotatingMessagesKeys[currentMessage])}
//           </motion.div>
//         </div>
//       )}

//       <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Contenu texte avec slider */}
//           <div className="text-center lg:text-left relative">
//             {/* Version desktop avec animations */}
//             {!isMobile ? (
//               <AnimatePresence mode="wait" custom={direction}>
//                 <motion.div
//                   key={currentSlide}
//                   custom={direction}
//                   variants={slideVariants}
//                   initial="enter"
//                   animate="center"
//                   exit="exit"
//                   transition={{
//                     x: { type: "spring", stiffness: 300, damping: 30 },
//                     opacity: { duration: 0.2 }
//                   }}
//                   className="relative"
//                 >
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6 }}
//                     className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 backdrop-blur-sm text-green-400 rounded-full text-sm font-medium mb-6 border border-green-500/30"
//                   >
//                     <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//                     <i className={`${sliderContent[currentSlide].icon} text-lg mr-1`}></i>
//                     {t(sliderContent[currentSlide].eyebrowKey)}
//                   </motion.div>

//                   <motion.h1
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: 0.1 }}
//                     className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-display text-white mb-6"
//                   >
//                     {t(sliderContent[currentSlide].title.part1Key)}{' '}
//                     <span className="relative inline-block">
//                       <span className="relative z-10 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
//                         {t(sliderContent[currentSlide].title.highlightKey)}
//                       </span>
//                       <motion.span
//                         initial={{ width: 0 }}
//                         animate={{ width: '100%' }}
//                         transition={{ duration: 0.8, delay: 0.5 }}
//                         className="absolute bottom-2 left-0 h-3 bg-green-500/30 -z-10"
//                       />
//                     </span>
//                     <br />
//                     {t(sliderContent[currentSlide].title.part2Key)}
//                   </motion.h1>

//                   <motion.p
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: 0.2 }}
//                     className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto lg:mx-0"
//                   >
//                     {t(sliderContent[currentSlide].descriptionKey)}
//                   </motion.p>
//                 </motion.div>
//               </AnimatePresence>
//             ) : (
//               /* Version mobile avec scroll horizontal */
//               <div
//                 ref={scrollContainerRef}
//                 className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 scrollbar-hide"
//                 style={{ 
//                   WebkitOverflowScrolling: 'touch',
//                   scrollbarWidth: 'none' as const,
//                   msOverflowStyle: 'none' 
//                 }}
//               >
//                 {sliderContent.map((slide, index) => (
//                   <div
//                     key={slide.id}
//                     className="flex-shrink-0 w-full snap-center px-4"
//                   >
//                     <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 backdrop-blur-sm text-green-400 rounded-full text-sm font-medium mb-6 border border-green-500/30">
//                       <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//                       <i className={`${slide.icon} text-lg mr-1`}></i>
//                       {t(slide.eyebrowKey)}
//                     </div>

//                     <h1 className="text-3xl sm:text-4xl font-bold font-display text-white mb-6">
//                       {t(slide.title.part1Key)}{' '}
//                       <span className="relative inline-block">
//                         <span className="relative z-10 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
//                           {t(slide.title.highlightKey)}
//                         </span>
//                         <span className="absolute bottom-2 left-0 h-3 bg-green-500/30 -z-10 w-full" />
//                       </span>
//                       <br />
//                       {t(slide.title.part2Key)}
//                     </h1>

//                     <p className="text-base text-gray-200 mb-8 max-w-2xl">
//                       {t(slide.descriptionKey)}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Navigation dots - ajustés pour mobile */}
//             <div className="flex justify-center lg:justify-start gap-2 mt-4 mb-8">
//               {sliderContent.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={`h-2 rounded-full transition-all duration-300 ${
//                     index === currentSlide
//                       ? `${isMobile ? 'w-6' : 'w-8'} bg-green-500`
//                       : `w-2 ${isMobile ? 'bg-white/30' : 'bg-white/50'} hover:bg-green-400`
//                   }`}
//                   aria-label={`Go to slide ${index + 1}`}
//                 />
//               ))}
//             </div>

//             {/* Boutons d'action - ajustés pour mobile */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
//             >
//               <Button
//                 href="/contact"
//                 variant="primary"
//                 size={isMobile ? "md" : "lg"}
//                 className={isMobile ? "w-full sm:w-auto" : ""}
//               >
//                 {t('home.hero.cta.primary')}
//               </Button>
              
//               <Button
//                 href="/projects"
//                 variant="outline"
//                 size={isMobile ? "md" : "lg"}
//                 className={`border-white text-white hover:bg-white/20 ${isMobile ? "w-full sm:w-auto" : ""}`}
//               >
//                 {t('home.hero.cta.secondary')}
//               </Button>
//             </motion.div>

//             {/* Contrôles du slider - cachés sur mobile */}
//             {!isMobile && (
//               <div className="flex gap-2 mt-6 justify-center lg:justify-start">
//                 <button
//                   onClick={prevSlide}
//                   className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-110"
//                   aria-label="Previous slide"
//                 >
//                   <i className="bx bx-chevron-left text-xl"></i>
//                 </button>
//                 <button
//                   onClick={nextSlide}
//                   className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-110"
//                   aria-label="Next slide"
//                 >
//                   <i className="bx bx-chevron-right text-xl"></i>
//                 </button>
//                 <button
//                   onClick={() => setIsAutoPlaying(!isAutoPlaying)}
//                   className={`w-10 h-10 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all ${
//                     isAutoPlaying
//                       ? 'bg-green-500 text-white border-green-500 hover:bg-green-600'
//                       : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
//                   }`}
//                   aria-label={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
//                 >
//                   <i className={`bx ${isAutoPlaying ? 'bx-pause' : 'bx-play'} text-xl`}></i>
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Image/illustration avec réseaux sociaux flottants - cachée sur mobile */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="relative hidden lg:block"
//           >
//             <div className="relative w-full max-w-md mx-auto">
//               {/* Cercles animés - ajustés pour tablette */}
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
//                 className="absolute inset-0 border-2 border-dashed border-white/30 rounded-full"
//               />
              
//               <motion.div
//                 animate={{ rotate: -360 }}
//                 transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
//                 className="absolute inset-8 border-2 border-dashed border-white/20 rounded-full"
//               />

//               {/* Logo central */}
//               <motion.div
//                 animate={{ scale: [1, 1.05, 1] }}
//                 transition={{ duration: 4, repeat: Infinity }}
//                 className="relative w-48 md:w-56 lg:w-64 h-48 md:h-56 lg:h-64 mx-auto bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl shadow-2xl flex items-center justify-center backdrop-blur-sm"
//               >
//                 <img
//                   src="/images/logo/logo-trans.png"
//                   alt="DB Digital Agency"
//                   className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain"
//                 />
//               </motion.div>

//               {/* Réseaux sociaux flottants avec appels à suivre */}
//               {socialFollows.map((social, index) => {
//                 // Calculer la position sur le cercle
//                 const angle = (index * 60) * (Math.PI / 180);
//                 const radius = 180;
//                 const x = Math.cos(angle) * radius;
//                 const y = Math.sin(angle) * radius;

//                 return (
//                   <motion.a
//                     key={index}
//                     href={social.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="absolute hidden lg:block"
//                     style={{
//                       left: '50%',
//                       top: '50%',
//                       transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
//                     }}
//                     initial={{ scale: 0, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     transition={{ delay: 0.5 + index * 0.1 }}
//                     whileHover={{ scale: 1.2, zIndex: 30 }}
//                   >
//                     <motion.div
//                       animate={{ 
//                         y: [0, -5, 0],
//                         rotate: [0, social.rotation, 0]
//                       }}
//                       transition={{ 
//                         duration: 3,
//                         delay: index * 0.2,
//                         repeat: Infinity 
//                       }}
//                       className="relative group"
//                     >
//                       <div className={`w-12 md:w-14 h-12 md:h-14 ${social.color} rounded-xl shadow-xl flex items-center justify-center text-white text-xl backdrop-blur-sm`}>
//                         <i className={`bx ${social.icon} text-xl md:text-2xl`}></i>
//                       </div>
                      
//                       {/* Tooltip avec appel à suivre */}
//                       <motion.div
//                         initial={{ opacity: 0, y: 10, scale: 0.8 }}
//                         whileHover={{ opacity: 1, y: 0, scale: 1 }}
//                         className="absolute -top-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white/90 backdrop-blur-md text-gray-900 px-4 py-2 rounded-xl shadow-xl pointer-events-none z-40"
//                       >
//                         <div className="text-sm font-medium">
//                           {t(social.ctaKey)}
//                         </div>
//                         <div className="text-xs text-green-600 mt-1">
//                           {social.followers} {t('home.hero.social.followers')}
//                         </div>
//                         <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-white/90" />
//                       </motion.div>
//                     </motion.div>
//                   </motion.a>
//                 );
//               })}

//               {/* Éléments flottants supplémentaires - cachés sur mobile */}
//               {[
//                 { icon: 'bx-bulb', delay: 0, position: '-top-8 left-1/2', tooltip: 'Innovation' },
//                 { icon: 'bx-rocket', delay: 0.3, position: 'top-1/2 -right-8', tooltip: 'Performance' },
//                 { icon: 'bx-target-lock', delay: 0.6, position: '-bottom-8 left-1/2', tooltip: 'Précision' },
//               ].map((item, index) => (
//                 <motion.div
//                   key={`float-${index}`}
//                   className={`absolute ${item.position} transform -translate-x-1/2 group hidden lg:block`}
//                   animate={{
//                     y: [0, -10, 0],
//                     rotate: [0, 5, -5, 0],
//                   }}
//                   transition={{
//                     duration: 4,
//                     delay: item.delay,
//                     repeat: Infinity,
//                   }}
//                 >
//                   <div className="relative">
//                     <div className="w-10 md:w-12 h-10 md:h-12 bg-white/20 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-center text-xl md:text-2xl border border-white/30">
//                       <i className={`bx ${item.icon} text-white`}></i>
//                     </div>
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       whileHover={{ opacity: 1, scale: 1 }}
//                       className="absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded"
//                     >
//                       {item.tooltip}
//                     </motion.div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Badge de followers total - caché sur mobile */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 1.5 }}
//               className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-xl flex items-center gap-3 hidden lg:flex"
//             >
//               <div className="flex -space-x-2">
//                 {socialFollows.slice(0, 4).map((social, i) => (
//                   <div
//                     key={i}
//                     className={`w-8 h-8 ${social.color} rounded-full border-2 border-white flex items-center justify-center text-white text-xs`}
//                   >
//                     <i className={`bx ${social.icon} text-sm`}></i>
//                   </div>
//                 ))}
//               </div>
//               <div className="text-sm">
//                 <span className="font-bold text-gray-900">13.8k+</span>
//                 <span className="text-gray-600 ml-1">{t('home.hero.social.followers')}</span>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Barre de réseaux sociaux en bas - cachée sur mobile pour économiser l'espace */}
//       {!isMobile && (
//         <motion.div
//           initial={{ y: 100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 1, duration: 0.5 }}
//           className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 py-3 z-20"
//         >
//           <div className="container mx-auto px-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <span className="text-sm font-medium text-white">
//                   {t('home.hero.social.followUs')} :
//                 </span>
//                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//               </div>
              
//               <div className="flex gap-4">
//                 {socialFollows.slice(0, 6).map((social, index) => (
//                   <motion.a
//                     key={index}
//                     href={social.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="group relative"
//                     whileHover={{ y: -3 }}
//                   >
//                     <div className={`w-8 h-8 ${social.color} rounded-lg flex items-center justify-center text-white text-sm`}>
//                       <i className={`bx ${social.icon} text-lg`}></i>
//                     </div>
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       whileHover={{ opacity: 1, y: 0 }}
//                       className="absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded"
//                     >
//                       {t(social.ctaKey)}
//                     </motion.div>
//                   </motion.a>
//                 ))}
//               </div>

//               <div className="text-sm text-white/80">
//                 {t('home.hero.social.join')}
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Scroll indicator - ajusté pour mobile */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 2, duration: 0.5 }}
//         className={`absolute ${isMobile ? 'bottom-16' : 'bottom-24'} left-1/2 transform -translate-x-1/2 z-20`}
//       >
//         <div className="flex flex-col items-center gap-2 text-white/60">
//           <span className="text-xs font-medium uppercase tracking-wider">
//             {t('home.hero.scroll')}
//           </span>
//           <motion.div
//             animate={{ y: [0, 8, 0] }}
//             transition={{ repeat: Infinity, duration: 1.5 }}
//           >
//             <i className={`bx bx-chevron-down ${isMobile ? 'text-xl' : 'text-2xl'}`}></i>
//           </motion.div>
//         </div>
//       </motion.div>
//     </motion.section>
//   );
// };

// export default HeroSection;



