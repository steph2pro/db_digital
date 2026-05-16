// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HeroSection.tsx
// Hero animé avec :
//   • Fond qui change par crossfade entre les slides
//   • Strip vertical de miniatures cliquables (desktop uniquement)
//   • Animation d'expansion miniature → fond (confinée dans la section)
//   • Autoplay toutes les 4.5s
//   • Mobile : hero compact (60svh) + dots de navigation
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, animate, useMotionValue } from "motion/react";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface SlideContent {
  id: number;
  eyebrow: string;
  title: { part1: string; highlight: string; part2: string };
  description: string;
  backgroundImage: string;
  accentColor: string;
}

interface HeroSectionProps {
  t?: (key: string) => string;
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA — slides et textes par défaut (fallback si pas de i18n)
// ─────────────────────────────────────────────────────────────────────────────

const SLIDES: SlideContent[] = [
  {
    id: 1,
    eyebrow: "home.hero.slide1.eyebrow",
    title: {
      part1: "home.hero.slide1.title.part1",
      highlight: "home.hero.slide1.title.highlight",
      part2: "home.hero.slide1.title.part2",
    },
    description: "home.hero.slide1.description",
    backgroundImage: "/images/slider/innovation.jpg",
    accentColor: "#10b981",
  },
  {
    id: 2,
    eyebrow: "home.hero.slide2.eyebrow",
    title: {
      part1: "home.hero.slide2.title.part1",
      highlight: "home.hero.slide2.title.highlight",
      part2: "home.hero.slide2.title.part2",
    },
    description: "home.hero.slide2.description",
    backgroundImage: "/images/slider/performance.jpg",
    accentColor: "#6366f1",
  },
  {
    id: 3,
    eyebrow: "home.hero.slide3.eyebrow",
    title: {
      part1: "home.hero.slide3.title.part1",
      highlight: "home.hero.slide3.title.highlight",
      part2: "home.hero.slide3.title.part2",
    },
    description: "home.hero.slide3.description",
    backgroundImage: "/images/slider/expertise.jpg",
    accentColor: "#f59e0b",
  },
  {
    id: 4,
    eyebrow: "home.hero.slide4.eyebrow",
    title: {
      part1: "home.hero.slide4.title.part1",
      highlight: "home.hero.slide4.title.highlight",
      part2: "home.hero.slide4.title.part2",
    },
    description: "home.hero.slide4.description",
    backgroundImage: "/images/slider/design.jpg",
    accentColor: "#ec4899",
  },
  {
    id: 5,
    eyebrow: "home.hero.slide5.eyebrow",
    title: {
      part1: "home.hero.slide5.title.part1",
      highlight: "home.hero.slide5.title.highlight",
      part2: "home.hero.slide5.title.part2",
    },
    description: "home.hero.slide5.description",
    backgroundImage: "/images/slider/strategy.jpg",
    accentColor: "#0ea5e9",
  },
];

const DEFAULT_TEXTS: Record<string, string> = {
  "home.hero.slide1.eyebrow": "Innovation Digitale",
  "home.hero.slide1.title.part1": "Nous créons des",
  "home.hero.slide1.title.highlight": "expériences",
  "home.hero.slide1.title.part2": "qui transforment.",
  "home.hero.slide1.description":
    "Agence digitale full-service — du branding à la tech, nous donnons vie à vos ambitions avec soin et précision.",
  "home.hero.slide2.eyebrow": "Performance & Résultats",
  "home.hero.slide2.title.part1": "Votre croissance,",
  "home.hero.slide2.title.highlight": "amplifiée",
  "home.hero.slide2.title.part2": "par le digital.",
  "home.hero.slide2.description":
    "Stratégies data-driven, campagnes ROI-positives, interfaces qui convertissent vraiment.",
  "home.hero.slide3.eyebrow": "Expertise Technique",
  "home.hero.slide3.title.part1": "Du code solide",
  "home.hero.slide3.title.highlight": "au service",
  "home.hero.slide3.title.part2": "de vos projets.",
  "home.hero.slide3.description":
    "React, TypeScript, Node.js — architectures robustes, interfaces fluides, sans friction.",
  "home.hero.slide4.eyebrow": "Design & Créativité",
  "home.hero.slide4.title.part1": "Un design qui",
  "home.hero.slide4.title.highlight": "marque",
  "home.hero.slide4.title.part2": "les esprits.",
  "home.hero.slide4.description":
    "UI/UX pensé pour l'émotion autant que l'usage. Chaque détail a sa raison d'être.",
  "home.hero.slide5.eyebrow": "Stratégie Globale",
  "home.hero.slide5.title.part1": "Votre vision,",
  "home.hero.slide5.title.highlight": "notre mission",
  "home.hero.slide5.title.part2": "ensemble.",
  "home.hero.slide5.description":
    "De la stratégie au déploiement, nous sommes le partenaire digital qui ne lâche rien.",
  "home.hero.cta.primary": "Demander un devis",
  "home.hero.cta.secondary": "Voir nos réalisations",
  "home.hero.scroll": "Défiler",
  "home.hero.stats.projects": "Projets livrés",
  "home.hero.stats.satisfaction": "Clients satisfaits",
  "home.hero.stats.years": "D'expertise",
};

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTES — timing et dimensions des miniatures
// AUTO_INTERVAL : ms entre deux slides automatiques
// THUMB_W / H   : dimensions d'une miniature (px)
// THUMB_GAP     : espace entre miniatures (px)
// THUMB_STEP    : pas de défilement vertical = hauteur + gap
// ─────────────────────────────────────────────────────────────────────────────
const AUTO_INTERVAL = 4500;
const THUMB_W       = 152;
const THUMB_H       = 100;
const THUMB_GAP     = 10;
const THUMB_STEP    = THUMB_H + THUMB_GAP;  // défilement vertical

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPOSANT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const HeroSection: React.FC<HeroSectionProps> = ({ t: tProp }) => {
  // Fallback textes si pas de i18n
  const t = useCallback(
    (key: string) => (tProp ? tProp(key) : DEFAULT_TEXTS[key] ?? key),
    [tProp]
  );

  // ── État ──────────────────────────────────────────────────────────────────
  const [current,        setCurrent]        = useState(0);
  const [transitioning,  setTransitioning]  = useState(false);
  const [isMobile,       setIsMobile]       = useState(false);
  const [progress,       setProgress]       = useState(0);

  // Miniature en cours d'expansion vers le fond
  // expandRect : position RELATIVE à la section (pas à la viewport)
  const [expandingIndex, setExpandingIndex] = useState<number | null>(null);
  const [expandRect,     setExpandRect]     = useState<{
    x: number; y: number; w: number; h: number;
  } | null>(null);

  // ── Refs ──────────────────────────────────────────────────────────────────
  const thumbRefs  = useRef<(HTMLDivElement | null)[]>([]);
  // sectionRef : nécessaire pour calculer les coordonnées relatives
  const sectionRef = useRef<HTMLElement | null>(null);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const stripY     = useMotionValue(0);  // position verticale du strip

  // ─────────────────────────────────────────────────────────────────────────
  // DÉTECTION MOBILE
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // DÉFILEMENT DU STRIP VERTICAL
  // Anime la valeur y pour centrer la miniature active
  // ─────────────────────────────────────────────────────────────────────────
  const scrollStrip = useCallback(
    (index: number) => {
      const target = -(index * THUMB_STEP);
      animate(stripY, target, { type: "spring", stiffness: 90, damping: 18 });
    },
    [stripY]
  );

  // ─────────────────────────────────────────────────────────────────────────
  // NAVIGATION — goTo(nextIndex)
  // Calcule la position de la miniature RELATIVEMENT à la section
  // → l'animation d'expansion reste confinée dans la section (overflow: hidden)
  // ─────────────────────────────────────────────────────────────────────────
  const goTo = useCallback(
    (nextIndex: number) => {
      if (transitioning || nextIndex === current) return;

      const el = thumbRefs.current[nextIndex];
      if (el && sectionRef.current) {
        const thumbRect   = el.getBoundingClientRect();
        const sectionRect = sectionRef.current.getBoundingClientRect();
        // Position relative : soustrait l'offset de la section
        setExpandRect({
          x: thumbRect.left - sectionRect.left,
          y: thumbRect.top  - sectionRect.top,
          w: thumbRect.width,
          h: thumbRect.height,
        });
      }

      setExpandingIndex(nextIndex);
      setTransitioning(true);

      // Après l'animation d'expansion (680ms) → confirmer le slide
      setTimeout(() => {
        setCurrent(nextIndex);
        setExpandingIndex(null);
        setExpandRect(null);
        setTransitioning(false);
      }, 680);

      scrollStrip(nextIndex);
    },
    [transitioning, current, scrollStrip]
  );

  // ─────────────────────────────────────────────────────────────────────────
  // AUTOPLAY
  // ─────────────────────────────────────────────────────────────────────────
  const nextSlide = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(nextSlide, AUTO_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [nextSlide]);

  // ─────────────────────────────────────────────────────────────────────────
  // RESET TIMER — évite un saut immédiat après un clic manuel
  // ─────────────────────────────────────────────────────────────────────────
  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, AUTO_INTERVAL);
  };

  const handleThumbClick = (i: number) => {
    goTo(i);
    resetTimer();
  };

  // ─────────────────────────────────────────────────────────────────────────
  // PROGRESS BAR — repart de 0 à chaque nouveau slide
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const id = setInterval(() => {
      setProgress(Math.min(((Date.now() - start) / AUTO_INTERVAL) * 100, 100));
    }, 30);
    return () => clearInterval(id);
  }, [current]);

  const slide = SLIDES[current];

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RENDU
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  return (
    <section
      ref={sectionRef}
      style={{
        position:        "relative",
        // ↓ mobile : 60svh compact — desktop : plein écran
        minHeight:       isMobile ? "60svh" : "100svh",
        overflow:        "hidden",   // ← CRITIQUE : confine l'animation d'expansion
        fontFamily:      "'Outfit', 'DM Sans', sans-serif",
        display:         "flex",
        alignItems:      "center",
        backgroundColor: "#080808",
      }}
    >

      {/* ════════════════════════════════════════════════════════════════════
          FOND ANIMÉ — crossfade entre les images de slides
          zIndex 0 : couche la plus basse
      ════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          style={{ position: "absolute", inset: 0, zIndex: 0 }}
        >
          <div
            style={{
              position:           "absolute",
              inset:              0,
              backgroundImage:    `url(${slide.backgroundImage})`,
              backgroundSize:     "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Voile sombre pour lisibilité */}
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.6)" }} />
        </motion.div>
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════
          ANIMATION D'EXPANSION — miniature → fond plein section
          • position: absolute (relatif à la section, PAS fixed)
          • zIndex 1 : au-dessus du fond (zIndex 0), sous le contenu (zIndex 10)
          • overflow: hidden sur la section empêche tout débordement hors du hero
          AVANT : position "fixed" + zIndex 40 → passait par-dessus toute la page
          APRÈS : position "absolute" + zIndex 1 → confiné dans la section
      ════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {expandingIndex !== null && expandRect && (
          <motion.div
            key="expand"
            initial={{
              left:         expandRect.x,
              top:          expandRect.y,
              width:        expandRect.w,
              height:       expandRect.h,
              borderRadius: 10,
              opacity:      1,
            }}
            animate={{
              left:         0,
              top:          0,
              width:        "100%",
              height:       "100%",
              borderRadius: 0,
              opacity:      0.9,
            }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.62, ease: [0.4, 0, 0.15, 1] }}
            style={{
              position:           "absolute",   // ← absolute (pas fixed)
              zIndex:             1,             // ← sous le contenu texte
              backgroundImage:    `url(${SLIDES[expandingIndex].backgroundImage})`,
              backgroundSize:     "cover",
              backgroundPosition: "center",
              pointerEvents:      "none",
            }}
          />
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════
          GRAIN CINÉMATIQUE — texture subtile (zIndex 2, opacity 0.035)
      ════════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position:        "absolute",
          inset:           0,
          zIndex:          2,
          pointerEvents:   "none",
          opacity:         0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ════════════════════════════════════════════════════════════════════
          LAYOUT PRINCIPAL — grille texte | miniatures
          • desktop : 2 colonnes (1fr auto)
          • mobile  : 1 colonne, padding vertical réduit
          zIndex 10 : au-dessus de tout
      ════════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position:            "relative",
          zIndex:              10,
          width:               "100%",
          maxWidth:            1280,
          margin:              "0 auto",
          // ↓ mobile : padding vertical réduit pour le hero compact
          padding:             isMobile ? "56px 24px 48px" : "0 64px",
          display:             "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
          alignItems:          "center",
          gap:                 isMobile ? 40 : 72,
        }}
      >

        {/* ── COLONNE GAUCHE : contenu textuel ──────────────────────────── */}
        <div style={{ maxWidth: 600 }}>

          {/* Eyebrow — label catégorie animé */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`ey-${current}`}
              initial={{ opacity: 0, y: 8  }}
              animate={{ opacity: 1, y: 0  }}
              exit={{   opacity: 0, y: -6  }}
              transition={{ duration: 0.3 }}
              style={{
                margin:        "0 0 16px",
                fontSize:      11,
                fontWeight:    700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color:         slide.accentColor,
              }}
            >
              {t(slide.eyebrow)}
            </motion.p>
          </AnimatePresence>

          {/* Titre H1 — animé avec blur */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`h1-${current}`}
              initial={{ opacity: 0, y: 20,  filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0,   filter: "blur(0px)" }}
              exit={{   opacity: 0, y: -14,  filter: "blur(4px)" }}
              transition={{ duration: 0.48, ease: [0.4, 0, 0.2, 1] }}
              style={{
                margin:        "0 0 18px",
                fontWeight:    900,
                // ↓ mobile : taille réduite pour le hero compact
                fontSize:      isMobile
                  ? "clamp(2.9rem, 8.5vw, 4.2rem)"
                  : "clamp(2.8rem, 4.2vw, 4.6rem)",
                lineHeight:    1.06,
                letterSpacing: "-0.033em",
                color:         "#ffffff",
              }}
            >
              {t(slide.title.part1)}{" "}
              <span style={{ color: slide.accentColor }}>
                {t(slide.title.highlight)}
              </span>
              <br />
              <span style={{ color: "rgba(255,255,255,0.55)" }}>
                {t(slide.title.part2)}
              </span>
            </motion.h1>
          </AnimatePresence>

          {/* Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{   opacity: 0 }}
              transition={{ duration: 0.38, delay: 0.08 }}
              style={{
                margin:     "0 0 34px",
                color:      "rgba(255,255,255,0.48)",
                fontSize:   isMobile ? "0.88rem" : "1.08rem",
                lineHeight: 1.74,
                fontWeight: 400,
                maxWidth:   490,
              }}
            >
              {t(slide.description)}
            </motion.p>
          </AnimatePresence>

          {/* Boutons CTA */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>

            {/* CTA principal */}
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display:         "inline-flex",
                alignItems:      "center",
                gap:             8,
                padding:         "13px 26px",
                backgroundColor: "#ffffff",
                color:           "#0a0a0a",
                fontWeight:      700,
                fontSize:        "0.92rem",
                borderRadius:    9,
                textDecoration:  "none",
                letterSpacing:   "-0.01em",
                whiteSpace:      "nowrap",
                boxShadow:       "0 3px 16px rgba(0,0,0,0.4)",
              }}
            >
              {t("home.hero.cta.primary")}
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>

            {/* CTA secondaire */}
            <motion.a
              href="/projects"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display:         "inline-flex",
                alignItems:      "center",
                gap:             8,
                padding:         "13px 26px",
                backgroundColor: "rgba(255,255,255,0.07)",
                backdropFilter:  "blur(10px)",
                color:           "rgba(255,255,255,0.82)",
                fontWeight:      600,
                fontSize:        "0.92rem",
                borderRadius:    9,
                border:          "1px solid rgba(255,255,255,0.14)",
                textDecoration:  "none",
                letterSpacing:   "-0.01em",
                whiteSpace:      "nowrap",
              }}
            >
              {t("home.hero.cta.secondary")}
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.a>

          </div>

          {/* Stats — desktop uniquement */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              style={{ display: "flex", alignItems: "center", gap: 26, marginTop: 42 }}
            >
              {[
                { value: "200+", label: t("home.hero.stats.projects")     },
                { value: "98%",  label: t("home.hero.stats.satisfaction") },
                { value: "7 ans", label: t("home.hero.stats.years")       },
              ].map((stat, i) => (
                <React.Fragment key={i}>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: "1.5rem", color: "#fff", lineHeight: 1, letterSpacing: "-0.04em" }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.32)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 5, fontWeight: 600 }}>
                      {stat.label}
                    </div>
                  </div>
                  {i < 2 && (
                    <div style={{ width: 1, height: 34, backgroundColor: "rgba(255,255,255,0.1)" }} />
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          )}

        </div>
        {/* FIN colonne gauche */}

        {/* ── COLONNE DROITE : strip vertical de miniatures (desktop) ──── */}
        {/* Masqué sur mobile avec rendu conditionnel (pas de display:none) */}
        {!isMobile && (
          <div
            style={{
              // Contient exactement 4 miniatures + 3 gaps
              height:    THUMB_H * 4 + THUMB_GAP * 3,
              width:     THUMB_W,
              overflow:  "hidden",
              position:  "relative",
              flexShrink:0,
            }}
          >
            {/* Fondu haut/bas — masque les miniatures qui défilent hors cadre */}
            <div
              style={{
                position:     "absolute",
                inset:        0,
                zIndex:       5,
                pointerEvents:"none",
                background:   "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.55) 100%)",
              }}
            />

            {/* Strip défilant — triplé pour l'effet loop infini
                Défilement vertical animé par useMotionValue stripY */}
            <motion.div
              style={{
                display:       "flex",
                flexDirection: "column",
                gap:           THUMB_GAP,
                y:             stripY,
                willChange:    "transform",
              }}
            >
              {[...SLIDES, ...SLIDES, ...SLIDES].map((s, i) => {
                const realIndex = i % SLIDES.length;
                const isActive  = realIndex === current;

                return (
                  // ── MINIATURE INDIVIDUELLE ────────────────────────────────
                  <motion.div
                    key={`th-${s.id}-${i}`}
                    // Ref uniquement sur la 1ère occurrence (i < SLIDES.length)
                    ref={(el) => {
                      if (i < SLIDES.length) thumbRefs.current[realIndex] = el;
                    }}
                    onClick={() => handleThumbClick(realIndex)}
                    whileHover={{ scale: 1.025, x: -4 }}
                    animate={{ opacity: isActive ? 1 : 0.42, scale: isActive ? 1 : 0.96 }}
                    transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                      flexShrink:   0,
                      width:        THUMB_W,
                      height:       THUMB_H,
                      borderRadius: 10,
                      overflow:     "hidden",
                      cursor:       "pointer",
                      position:     "relative",
                      border:       isActive
                        ? `2px solid ${s.accentColor}`
                        : "2px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    {/* Image de fond */}
                    <div
                      style={{
                        position:           "absolute",
                        inset:              0,
                        backgroundImage:    `url(${s.backgroundImage})`,
                        backgroundSize:     "cover",
                        backgroundPosition: "center",
                      }}
                    />

                    {/* Voile sombre */}
                    <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.42)" }} />

                    {/* Barre accent gauche — miniature active uniquement */}
                    {isActive && (
                      <div
                        style={{
                          position:        "absolute",
                          left:            0, top: 0, bottom: 0,
                          width:           3,
                          backgroundColor: s.accentColor,
                          zIndex:          3,
                        }}
                      />
                    )}

                    {/* Label bas : eyebrow + mot clé */}
                    <div style={{ position: "absolute", bottom: 8, left: 12, right: 8, zIndex: 4 }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>
                        {t(s.eyebrow)}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>
                        {t(s.title.highlight)}
                      </div>
                    </div>

                    {/* Progress bar — miniature active */}
                    {isActive && (
                      <div
                        style={{
                          position:        "absolute",
                          bottom:          0, left: 0,
                          height:          2,
                          width:           `${progress}%`,
                          backgroundColor: s.accentColor,
                          zIndex:          4,
                          transition:      "width 0.03s linear",
                        }}
                      />
                    )}

                  </motion.div>
                  // ── FIN miniature individuelle ────────────────────────────
                );
              })}
            </motion.div>

          </div>
        )}
        {/* FIN colonne droite */}

      </div>
      {/* FIN layout principal */}

      {/* ════════════════════════════════════════════════════════════════════
          COMPTEUR DE SLIDES — coin bas gauche
          Format : "01 ──── 05" avec barre de progression accent
      ════════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position:   "absolute",
          bottom:     isMobile ? 52 : 32,
          left:       isMobile ? 24 : 68,
          zIndex:     20,
          display:    "flex",
          alignItems: "center",
          gap:        10,
        }}
      >
        <span style={{ fontWeight: 900, fontSize: "1.05rem", color: "#fff", letterSpacing: "-0.02em" }}>
          {String(current + 1).padStart(2, "0")}
        </span>
        <div style={{ position: "relative", width: 42, height: 1, backgroundColor: "rgba(255,255,255,0.18)" }}>
          <div
            style={{
              position:        "absolute",
              left:            0, top: 0, height: "100%",
              width:           `${progress}%`,
              backgroundColor: slide.accentColor,
              transition:      "width 0.03s linear",
            }}
          />
        </div>
        <span style={{ fontWeight: 600, fontSize: "0.82rem", color: "rgba(255,255,255,0.28)" }}>
          {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          INDICATEUR DE SCROLL — icône souris animée, centre bas
          Masqué sur mobile (économie d'espace dans le hero compact)
      ════════════════════════════════════════════════════════════════════ */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          style={{
            position:      "absolute",
            bottom:        24,
            left:          "50%",
            transform:     "translateX(-50%)",
            zIndex:        20,
            display:       "flex",
            flexDirection: "column",
            alignItems:    "center",
            gap:           5,
          }}
        >
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)" }}>
            {t("home.hero.scroll")}
          </span>
          <div
            style={{
              width:           20,
              height:          32,
              borderRadius:    10,
              border:          "1.5px solid rgba(255,255,255,0.14)",
              display:         "flex",
              alignItems:      "flex-start",
              justifyContent:  "center",
              padding:         "4px 0",
            }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              style={{ width: 3, height: 6, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.32)" }}
            />
          </div>
        </motion.div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          DOTS MOBILE — navigation par points, bas de page
          Affiché uniquement sur mobile à la place du strip vertical
      ════════════════════════════════════════════════════════════════════ */}
      {isMobile && (
        <div
          style={{
            position:  "absolute",
            bottom:    20,
            left:      "50%",
            transform: "translateX(-50%)",
            zIndex:    20,
            display:   "flex",
            gap:       7,
            alignItems:"center",
          }}
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => handleThumbClick(i)}
              style={{
                height:          3,
                width:           i === current ? 26 : 7,
                borderRadius:    2,
                backgroundColor: i === current ? slide.accentColor : "rgba(255,255,255,0.22)",
                border:          "none",
                cursor:          "pointer",
                padding:         0,
                transition:      "all 0.3s ease",
              }}
            />
          ))}
        </div>
      )}

      {/* Import police Outfit — en prod préférer index.css */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&display=swap');
      `}</style>

    </section>
  );
};

export default HeroSection;