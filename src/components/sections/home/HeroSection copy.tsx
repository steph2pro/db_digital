// src/components/sections/home/HeroSection.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, AnimatePresence, Variants } from "motion/react";
import { useTheme } from '../../../contexts/ThemeContext';

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
    accentColor: "from-emerald-500 to-cyan-500",
    accentGlow: "rgba(16,185,129,0.15)",
    icon: "bx bx-bulb",
    label: "01"
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
    accentColor: "from-violet-500 to-blue-500",
    accentGlow: "rgba(139,92,246,0.15)",
    icon: "bx bx-rocket",
    label: "02"
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
    accentColor: "from-amber-400 to-orange-500",
    accentGlow: "rgba(245,158,11,0.15)",
    icon: "bx bx-crown",
    label: "03"
  }
];

const socialFollows = [
  { platform: 'linkedin', icon: 'bxl-linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/db_digital_agency/', color: '#0077B5', followers: '2.5k', ctaKey: "home.hero.social.follow.linkedin", rotation: -5 },
  { platform: 'twitter', icon: 'bxl-twitter', label: 'Twitter', href: 'https://twitter.com/dbdigitalagency', color: '#1DA1F2', followers: '1.8k', ctaKey: "home.hero.social.follow.twitter", rotation: 2 },
  { platform: 'github', icon: 'bxl-github', label: 'GitHub', href: 'https://github.com/DB-Digital-Agency', color: '#333', followers: '1.2k', ctaKey: "home.hero.social.follow.github", rotation: 3 },
  { platform: 'instagram', icon: 'bxl-instagram', label: 'Instagram', href: 'https://instagram.com/dbdigitalagency', color: '#E1306C', followers: '3.2k', ctaKey: "home.hero.social.follow.instagram", rotation: -2 },
  { platform: 'youtube', icon: 'bxl-youtube', label: 'YouTube', href: 'https://youtube.com/@dbdigitalagency', color: '#FF0000', followers: '950', ctaKey: "home.hero.social.follow.youtube", rotation: 4 },
  { platform: 'tiktok', icon: 'bxl-tiktok', label: 'TikTok', href: 'https://tiktok.com/@dbdigitalagency', color: '#010101', followers: '4.1k', ctaKey: "home.hero.social.follow.tiktok", rotation: -3 }
];

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

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || !scrollContainerRef.current) return;
    let resumeTimer: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;
      const newIndex = Math.round(container.scrollLeft / container.clientWidth);
      if (newIndex !== currentSlide && newIndex >= 0 && newIndex < sliderContent.length) {
        setCurrentSlide(newIndex);
        setIsAutoPlaying(false);
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(() => setIsAutoPlaying(true), 4000);
      }
    };
    const container = scrollContainerRef.current;
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(resumeTimer);
    };
  }, [isMobile, currentSlide]);

  const y1 = useTransform(scrollY, [0, 500], [0, isMobile ? 10 : 120]);
  const y2 = useTransform(scrollY, [0, 500], [0, isMobile ? -10 : -120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    sliderContent.forEach(slide => { const img = new Image(); img.src = slide.backgroundImage; });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % rotatingMessagesKeys.length);
    }, isMobile ? 4000 : 3000);
    return () => clearInterval(interval);
  }, [isMobile]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      if (isMobile) {
        const container = scrollContainerRef.current;
        if (!container) return;
        const nextIndex = (currentSlide + 1) % sliderContent.length;
        container.scrollTo({ left: nextIndex * container.clientWidth, behavior: 'smooth' });
        setCurrentSlide(nextIndex);
      } else {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
      }
    }, isMobile ? 3000 : 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isMobile, currentSlide]);

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
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: index * scrollContainerRef.current.clientWidth, behavior: 'smooth' });
      }
    } else {
      setIsAutoPlaying(false);
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
    }
  }, [currentSlide, isMobile]);

  // Particles canvas
  useEffect(() => {
    const canvas = document.getElementById('hero-particles') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrame: number;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const colors = isDark
      ? ['#10b981', '#06b6d4', '#8b5cf6', '#f59e0b']
      : ['#059669', '#0891b2', '#7c3aed', '#d97706'];

    const count = isMobile ? 25 : 60;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * (canvas.width || 1000),
      y: Math.random() * (canvas.height || 800),
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.35 + 0.05,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulsePhase: Math.random() * Math.PI * 2
    }));

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        const pulsedOpacity = p.opacity * (0.7 + 0.3 * Math.sin(frame * 0.02 + p.pulsePhase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.round(pulsedOpacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        if (!isMobile) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `${p.color}${Math.round(0.08 * (1 - dist / 120) * 255).toString(16).padStart(2, '0')}`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      });
      animationFrame = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrame); };
  }, [isDark, isMobile]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? (isMobile ? 400 : 800) : (isMobile ? -400 : -800), opacity: 0, filter: 'blur(8px)' }),
    center: { zIndex: 1, x: 0, opacity: 1, filter: 'blur(0px)' },
    exit: (dir: number) => ({ zIndex: 0, x: dir < 0 ? (isMobile ? 400 : 800) : (isMobile ? -400 : -800), opacity: 0, filter: 'blur(8px)' })
  };

  const bgImageVariants: Variants = {
    enter: () => ({ scale: 1.15, opacity: 0 }),
    center: { scale: 1, opacity: 1, transition: { duration: isMobile ? 0.8 : 1.4, ease: [0.43, 0.13, 0.23, 0.96] } },
    exit: () => ({ scale: 1.08, opacity: 0, transition: { duration: isMobile ? 0.5 : 0.9 } })
  };

  const current = sliderContent[currentSlide];

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ fontFamily: "'Outfit', 'DM Sans', sans-serif" }}
    >
      {/* ─── BACKGROUND LAYER ─── */}
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
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${current.backgroundImage})` }} />
          {/* Multi-layer gradient overlay — much richer depth */}
          <div className="absolute inset-0" style={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.82) 100%)'
              : 'linear-gradient(135deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.75) 100%)'
          }} />
          {/* Color accent from current slide */}
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse at 70% 50%, ${current.accentGlow} 0%, transparent 60%)`
          }} />
        </motion.div>
      </AnimatePresence>

      {/* ─── PARTICLES ─── */}
      <canvas id="hero-particles" className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />

      {/* ─── NOISE TEXTURE OVERLAY ─── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        zIndex: 2,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.4
      }} />

      {/* ─── FLOATING ORBS ─── */}
      <motion.div  className="absolute pointer-events-none" style={{ y: y1, opacity,
        top: '15%', left: '8%', zIndex: 1,
        width: isMobile ? '160px' : '420px',
        height: isMobile ? '160px' : '420px',
        background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)'
      }} />
      <motion.div className="absolute pointer-events-none" style={{y: y2, opacity,
        bottom: '15%', right: '8%', zIndex: 1,
        width: isMobile ? '120px' : '340px',
        height: isMobile ? '120px' : '340px',
        background: 'radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)'
      }} />

      {/* ─── FINE GRID PATTERN ─── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
        backgroundSize: isMobile ? '30px 30px' : '60px 60px',
        zIndex: 1
      }} />

      {/* ─── MARQUEE TEXT ─── */}
      {!isMobile && (
        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessage}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 0.04 }}
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="w-full text-center text-white font-black whitespace-nowrap select-none"
              style={{ fontSize: 'clamp(80px, 14vw, 160px)', letterSpacing: '-0.04em', lineHeight: 1 }}
            >
              {t(rotatingMessagesKeys[currentMessage])}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ─── SLIDE NUMBER — vertical left edge ─── */}
      {!isMobile && (
        <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-white/30 font-black"
              style={{ fontSize: '11px', letterSpacing: '0.2em', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              {current.label} / {String(sliderContent.length).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
          <div className="w-px h-24 bg-white/15 rounded-full" />
          <div className="flex flex-col gap-2">
            {sliderContent.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className="transition-all duration-500 rounded-full"
                style={{
                  width: i === currentSlide ? '3px' : '2px',
                  height: i === currentSlide ? '32px' : '12px',
                  background: i === currentSlide ? '#10b981' : 'rgba(255,255,255,0.3)',
                  border: 'none',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ─── MAIN CONTENT ─── */}
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center">

          {/* LEFT: Text content */}
          <div className="text-center lg:text-left relative w-full max-w-full overflow-hidden">

            {/* Desktop slider content */}
            {!isMobile ? (
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: "spring", stiffness: 250, damping: 28 }, opacity: { duration: 0.3 }, filter: { duration: 0.3 } }}
                  className="relative w-full"
                >
                  {/* Eyebrow pill */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2.5 mb-8"
                    style={{
                      padding: '8px 18px',
                      background: 'rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '100px'
                    }}
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', animation: 'pulse 2s infinite', flexShrink: 0 }} />
                    <i className={`${current.icon} text-emerald-400 text-base`} />
                    <span className="text-white/80 text-sm font-medium tracking-wide">
                      {t(current.eyebrowKey)}
                    </span>
                  </motion.div>

                  {/* Main headline */}
                  <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.08 }}
                    className="text-white mb-6 font-black"
                    style={{
                      fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
                      lineHeight: 1.05,
                      letterSpacing: '-0.03em',
                      fontFamily: "'Outfit', 'DM Sans', sans-serif"
                    }}
                  >
                    {t(current.title.part1Key)}{' '}
                    <span className="relative inline-block">
                      <span className={`relative z-10 bg-gradient-to-r ${current.accentColor} bg-clip-text text-transparent`}>
                        {t(current.title.highlightKey)}
                      </span>
                      {/* Underline accent */}
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.7, delay: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
                        style={{
                          position: 'absolute',
                          bottom: '-4px',
                          left: 0,
                          right: 0,
                          height: '3px',
                          borderRadius: '2px',
                          transformOrigin: 'left center',
                          background: 'linear-gradient(90deg, #10b981, #06b6d4, transparent)'
                        }}
                      />
                    </span>
                    <br />
                    <span className="text-white/70">{t(current.title.part2Key)}</span>
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.16 }}
                    className="mb-10 max-w-xl mx-auto lg:mx-0"
                    style={{
                      fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
                      lineHeight: 1.75,
                      color: 'rgba(255,255,255,0.6)',
                      fontWeight: 400
                    }}
                  >
                    {t(current.descriptionKey)}
                  </motion.p>

                  {/* CTAs */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.24 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  >
                    <motion.a
                      href="/contact"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '16px 32px',
                        background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '1rem',
                        borderRadius: '14px',
                        border: 'none',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        boxShadow: '0 8px 32px rgba(16,185,129,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      {t('home.hero.cta.primary')}
                      <i className="bx bx-arrow-back" style={{ transform: 'rotate(180deg)', fontSize: '1.2rem' }} />
                    </motion.a>

                    <motion.a
                      href="/projects"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '16px 32px',
                        background: 'rgba(255,255,255,0.06)',
                        backdropFilter: 'blur(12px)',
                        color: 'rgba(255,255,255,0.9)',
                        fontWeight: 600,
                        fontSize: '1rem',
                        borderRadius: '14px',
                        border: '1px solid rgba(255,255,255,0.15)',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        letterSpacing: '-0.01em',
                        transition: 'border-color 0.2s'
                      }}
                    >
                      {t('home.hero.cta.secondary')}
                      <i className="bx bx-play-circle" style={{ fontSize: '1.2rem' }} />
                    </motion.a>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            ) : (
              /* Mobile scroll */
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto snap-x snap-mandatory pb-6"
                style={{
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none' as const,
                  msOverflowStyle: 'none',
                  width: '100vw',
                  position: 'relative',
                  left: '50%',
                  marginLeft: '-50vw',
                }}
              >
                {sliderContent.map((slide) => (
                  <div key={slide.id} className="flex-shrink-0 snap-center px-6" style={{ width: '100vw' }}>
                    <div className="max-w-[90vw] mx-auto">
                      <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
                        <i className={`${slide.icon} text-emerald-400`} />
                        <span className="text-white/80 text-xs font-medium">{t(slide.eyebrowKey)}</span>
                      </div>
                      <h1 className="font-black text-white mb-4" style={{ fontSize: 'clamp(2rem, 9vw, 2.8rem)', lineHeight: 1.08, letterSpacing: '-0.03em' }}>
                        {t(slide.title.part1Key)}{' '}
                        <span className={`bg-gradient-to-r ${slide.accentColor} bg-clip-text text-transparent`}>{t(slide.title.highlightKey)}</span>
                        <br />
                        <span className="text-white/70">{t(slide.title.part2Key)}</span>
                      </h1>
                      <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{t(slide.descriptionKey)}</p>
                      <div className="flex flex-col gap-3">
                        <a href="/contact" className="block w-full text-center py-3.5 rounded-xl font-bold text-white text-sm" style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)', boxShadow: '0 6px 20px rgba(16,185,129,0.3)' }}>
                          {t('home.hero.cta.primary')}
                        </a>
                        <a href="/projects" className="block w-full text-center py-3.5 rounded-xl font-semibold text-sm" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}>
                          {t('home.hero.cta.secondary')}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Desktop slider controls */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4 mt-10 justify-center lg:justify-start"
              >
                <button
                  onClick={prevSlide}
                  className="group flex items-center justify-center transition-all duration-200"
                  style={{
                    width: '44px', height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.7)',
                    cursor: 'pointer',
                    backdropFilter: 'blur(8px)'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
                >
                  <i className="bx bx-chevron-left text-xl" />
                </button>

                {/* Progress dots */}
                <div className="flex items-center gap-2">
                  {sliderContent.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      style={{
                        height: '3px',
                        width: index === currentSlide ? '32px' : '10px',
                        borderRadius: '2px',
                        background: index === currentSlide ? '#10b981' : 'rgba(255,255,255,0.25)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.4s cubic-bezier(0.43,0.13,0.23,0.96)'
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  style={{
                    width: '44px', height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.7)',
                    cursor: 'pointer',
                    backdropFilter: 'blur(8px)'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
                >
                  <i className="bx bx-chevron-right text-xl" />
                </button>

                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  style={{
                    width: '44px', height: '44px',
                    borderRadius: '12px',
                    background: isAutoPlaying ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.07)',
                    border: `1px solid ${isAutoPlaying ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.12)'}`,
                    color: isAutoPlaying ? '#10b981' : 'rgba(255,255,255,0.7)',
                    cursor: 'pointer',
                    backdropFilter: 'blur(8px)'
                  }}
                >
                  <i className={`bx ${isAutoPlaying ? 'bx-pause' : 'bx-play'} text-xl`} />
                </button>
              </motion.div>
            )}

            {/* Mobile dots */}
            {isMobile && (
              <div className="flex justify-center gap-2 mt-5">
                {sliderContent.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    style={{
                      height: '3px',
                      width: index === currentSlide ? '24px' : '8px',
                      borderRadius: '2px',
                      background: index === currentSlide ? '#10b981' : 'rgba(255,255,255,0.25)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>
            )}

            {/* Mobile social icons + followers badge */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8 px-4"
              >
                {/* Social icons row */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  {socialFollows.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.07, type: 'spring', stiffness: 260 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        width: '42px', height: '42px',
                        borderRadius: '13px',
                        background: social.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: `0 4px 14px ${social.color}55`,
                        flexShrink: 0
                      }}
                    >
                      <i className={`bx ${social.icon} text-white`} style={{ fontSize: '18px' }} />
                    </motion.a>
                  ))}
                </div>

                {/* Followers badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '10px 20px',
                    background: 'rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: '100px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    width: 'fit-content',
                    margin: '0 auto'
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    {socialFollows.slice(0, 4).map((s, i) => (
                      <div
                        key={i}
                        style={{
                          width: '24px', height: '24px',
                          borderRadius: '50%',
                          background: s.color,
                          border: '2px solid rgba(0,0,0,0.3)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          marginLeft: i > 0 ? '-7px' : '0',
                          zIndex: 4 - i,
                          position: 'relative'
                        }}
                      >
                        <i className={`bx ${s.icon} text-white`} style={{ fontSize: '10px' }} />
                      </div>
                    ))}
                  </div>
                  <span className="font-black text-white" style={{ fontSize: '0.85rem' }}>13.8k+</span>
                  <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>{t('home.hero.social.followers')}</span>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981', flexShrink: 0 }} />
                </motion.div>
              </motion.div>
            )}

            {/* Stats row */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-8 mt-12"
              >
                {[
                  { value: '200+', label: 'Projets livrés' },
                  { value: '98%', label: 'Clients satisfaits' },
                  { value: '7 ans', label: "D'expertise" }
                ].map((stat, i) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col">
                      <span className="font-black text-white" style={{ fontSize: '1.6rem', lineHeight: 1, letterSpacing: '-0.03em' }}>{stat.value}</span>
                      <span className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{stat.label}</span>
                    </div>
                    {i < 2 && <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.12)' }} />}
                  </React.Fragment>
                ))}
              </motion.div>
            )}
          </div>

          {/* RIGHT: Orbital social visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="relative hidden lg:flex items-center justify-center"
            style={{ minHeight: '480px' }}
          >
            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: '420px', height: '420px',
                borderRadius: '50%',
                border: '1px dashed rgba(255,255,255,0.1)'
              }}
            />
            {/* Middle ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: '300px', height: '300px',
                borderRadius: '50%',
                border: '1px dashed rgba(16,185,129,0.15)'
              }}
            />

            {/* Glow behind center */}
            <div style={{
              position: 'absolute',
              width: '200px', height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)',
              filter: 'blur(20px)'
            }} />

            {/* Center logo */}
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '120px', height: '120px',
                borderRadius: '28px',
                background: 'linear-gradient(135deg, rgba(16,185,129,0.9), rgba(6,182,212,0.9))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.15), 0 24px 64px rgba(16,185,129,0.4)',
                backdropFilter: 'blur(20px)',
                position: 'relative', zIndex: 10
              }}
            >
              <img src="/images/logo/logo-trans.png" alt="DB Digital Agency" style={{ width: '72px', height: '72px', objectFit: 'contain' }} />
            </motion.div>

            {/* Orbiting social icons */}
            {socialFollows.map((social, index) => {
              const angle = (index * 60 - 90) * (Math.PI / 180);
              const radius = 185;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.08, type: 'spring', stiffness: 200 }}
                  onHoverStart={() => setHoveredSocial(index)}
                  onHoverEnd={() => setHoveredSocial(null)}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    zIndex: 15
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -6, 0], rotate: [0, social.rotation * 0.5, 0] }}
                    transition={{ duration: 3.5, delay: index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                    whileHover={{ scale: 1.25, y: -4 }}
                  >
                    {/* Social icon button */}
                    <div style={{
                      width: '52px', height: '52px',
                      borderRadius: '16px',
                      background: `${social.color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 8px 24px ${social.color}60, 0 0 0 1px rgba(255,255,255,0.1)`,
                      backdropFilter: 'blur(8px)',
                      position: 'relative',
                      cursor: 'pointer'
                    }}>
                      <i className={`bx ${social.icon} text-white text-xl`} />
                    </div>

                    {/* Tooltip */}
                    <AnimatePresence>
                      {hoveredSocial === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.9 }}
                          transition={{ duration: 0.15 }}
                          style={{
                            position: 'absolute',
                            bottom: '64px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            whiteSpace: 'nowrap',
                            background: 'rgba(255,255,255,0.95)',
                            backdropFilter: 'blur(16px)',
                            borderRadius: '12px',
                            padding: '10px 16px',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                            zIndex: 50
                          }}
                        >
                          <div className="font-semibold text-gray-900 text-sm">{t(social.ctaKey)}</div>
                          <div className="text-emerald-600 text-xs mt-0.5 font-medium">{social.followers} {t('home.hero.social.followers')}</div>
                          <div style={{ position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: '8px', height: '8px', background: 'rgba(255,255,255,0.95)' }} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.a>
              );
            })}

            {/* Total followers badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              style={{
                position: 'absolute',
                bottom: '-24px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 22px',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                borderRadius: '100px',
                border: '1px solid rgba(255,255,255,0.14)',
                whiteSpace: 'nowrap',
                zIndex: 20
              }}
            >
              <div style={{ display: 'flex', marginLeft: '-4px' }}>
                {socialFollows.slice(0, 4).map((s, i) => (
                  <div
                    key={i}
                    style={{
                      width: '28px', height: '28px',
                      borderRadius: '50%',
                      background: s.color,
                      border: '2px solid rgba(0,0,0,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginLeft: i > 0 ? '-8px' : '0',
                      zIndex: 4 - i
                    }}
                  >
                    <i className={`bx ${s.icon} text-white text-xs`} />
                  </div>
                ))}
              </div>
              <div>
                <span className="font-black text-white text-sm">13.8k+</span>
                <span className="text-white/50 text-sm ml-1.5">{t('home.hero.social.followers')}</span>
              </div>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ─── BOTTOM SOCIAL BAR ─── */}
      {!isMobile && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            zIndex: 20,
            background: 'rgba(0,0,0,0.25)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '14px 0'
          }}
        >
          <div className="container mx-auto px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>
                  {t('home.hero.social.followUs')}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {socialFollows.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    transition={{ duration: 0.15 }}
                    className="group relative"
                  >
                    <div style={{
                      width: '34px', height: '34px',
                      borderRadius: '10px',
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(255,255,255,0.7)',
                      transition: 'all 0.2s',
                      cursor: 'pointer'
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = social.color; (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
                    >
                      <i className={`bx ${social.icon} text-base`} />
                    </div>
                  </motion.a>
                ))}
              </div>

              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.02em' }}>
                {t('home.hero.social.join')}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SCROLL INDICATOR ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute',
          bottom: isMobile ? '72px' : '88px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
          {t('home.hero.scroll')}
        </span>
        {/* Mouse icon */}
        <div style={{
          width: '22px', height: '34px',
          borderRadius: '11px',
          border: '1.5px solid rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          padding: '5px'
        }}>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            style={{ width: '3px', height: '6px', borderRadius: '2px', background: 'rgba(255,255,255,0.4)' }}
          />
        </div>
      </motion.div>

      {/* ─── PULSE CSS ─── */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #10b981; }
          50% { opacity: 0.5; box-shadow: 0 0 4px #10b981; }
        }
        ::-webkit-scrollbar { display: none; }
      `}</style>
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
//   const y2 = useTransform(scrollY, [0, 500], [0, isMobile ? -10 : -150]);
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
//     enter: ( ) => ({
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
//     exit: () => ({
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
//         className={`${isMobile ? 'w-32 h-32' : 'w-96 h-96'} bg-green-500/10 dark:bg-green-500/20 rounded-full blur-3xl`}
//       />
//       <motion.div
//         style={{ y: y2, opacity, position: 'absolute', bottom: isMobile ? '10%' : '20%', right: isMobile ? '5%' : '10%', zIndex: 1 }}
//         className={`${isMobile ? 'w-32 h-32' : 'w-96 h-96'} bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl`}
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
//           <div className="text-center lg:text-left relative w-full max-w-full overflow-hidden">
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
//                   className="relative w-full"
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
//                     className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-display text-white mb-6 break-words"
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
//                     className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto lg:mx-0 break-words"
//                   >
//                     {t(sliderContent[currentSlide].descriptionKey)}
//                   </motion.p>
//                 </motion.div>
//               </AnimatePresence>
//             ) : (
//               /* Version mobile avec scroll horizontal - CONTAINER AJUSTÉ */
//               <div
//                 ref={scrollContainerRef}
//                 className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 scrollbar-hide w-screen max-w-[100vw] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
//                 style={{ 
//                   WebkitOverflowScrolling: 'touch',
//                   scrollbarWidth: 'none' as const,
//                   msOverflowStyle: 'none',
//                   width: '100vw',
//                   position: 'relative',
//                   left: '50%',
//                   right: '50%',
//                   marginLeft: '-50vw',
//                   marginRight: '-50vw',
//                 }}
//               >
//                 {sliderContent.map((slide) => (
//                   <div
//                     key={slide.id}
//                     className="flex-shrink-0 w-screen snap-center px-6"
//                     style={{ width: '100vw' }}
//                   >
//                     <div className="max-w-[90vw] mx-auto">
//                       <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 backdrop-blur-sm text-green-400 rounded-full text-sm font-medium mb-6 border border-green-500/30">
//                         <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//                         <i className={`${slide.icon} text-lg mr-1`}></i>
//                         {t(slide.eyebrowKey)}
//                       </div>

//                       <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mb-4 break-words">
//                         {t(slide.title.part1Key)}{' '}
//                         <span className="relative inline-block">
//                           <span className="relative z-10 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
//                             {t(slide.title.highlightKey)}
//                           </span>
//                           <span className="absolute bottom-1 left-0 h-2 bg-green-500/30 -z-10 w-full" />
//                         </span>
//                         <br />
//                         {t(slide.title.part2Key)}
//                       </h1>

//                       <p className="text-sm sm:text-base text-gray-200 mb-6 max-w-full break-words">
//                         {t(slide.descriptionKey)}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Navigation dots - ajustés pour mobile */}
//             <div className="flex justify-center lg:justify-start gap-2 mt-4 mb-6">
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
//               className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start w-full max-w-full"
//             >
//               <Button
//                 href="/contact"
//                 variant="primary"
//                 size={isMobile ? "md" : "lg"}
//                 className={`${isMobile ? "w-full px-4 py-3 text-sm" : ""}`}
//               >
//                 {t('home.hero.cta.primary')}
//               </Button>
              
//               <Button
//                 href="/projects"
//                 variant="outline"
//                 size={isMobile ? "md" : "lg"}
//                 className={`border-white text-white hover:bg-white/20 ${isMobile ? "w-full px-4 py-3 text-sm" : ""}`}
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



