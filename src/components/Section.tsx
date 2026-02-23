// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence, useInView } from 'motion/react';
// import { useTranslation } from 'react-i18next';
// import { SectionBg } from '../contexts/Animatedbackground';
// import { useTheme } from '../contexts/ThemeContext';
// // import { SectionBg } from '../ui/AnimatedBackground';
// // import { useTheme } from '../../contexts/ThemeContext';

// // ─── Shared helpers ───────────────────────────────────────────────────────────
// const Eyebrow: React.FC<{ children: React.ReactNode; center?: boolean }> = ({ children, center }) => (
//   <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, justifyContent: center ? 'center' : 'flex-start' }}>
//     <span style={{ width: 28, height: 2, borderRadius: 2, background: 'var(--green)', flexShrink: 0 }} />
//     <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--green)', fontFamily: 'var(--font-body)' }}>
//       {children}
//     </span>
//   </div>
// );

// const SectionTitle: React.FC<{ children: React.ReactNode; center?: boolean; style?: React.CSSProperties }> = ({ children, center, style }) => (
//   <h2 style={{
//     fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 50px)',
//     fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1,
//     letterSpacing: '-0.025em', marginBottom: 16,
//     textAlign: center ? 'center' : 'left', ...style,
//   }}>
//     {children}
//   </h2>
// );

// function useReveal() {
//   const ref    = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: '-60px' });
//   return { ref, inView };
// }

// // ─── TICKER ────────────────────────────────────────────────────────────────────
// const TICKER_ITEMS = [
//   '🌐 Développement Web', '📱 Applications Mobile', '🎨 Design UI/UX',
//   '⚙️ Backend & APIs', '📊 SEO & Performance', '🎓 Formation & Conseil',
// ];

// export const TickerSection: React.FC = () => (
//   <div className="ticker-wrap" aria-hidden>
//     <div className="ticker-inner">
//       {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
//         <span key={i} className="ticker-item">
//           {item}
//           <span className="ticker-dot">◆</span>
//         </span>
//       ))}
//     </div>
//   </div>
// );

// // ─── SERVICES ─────────────────────────────────────────────────────────────────
// const SERVICES = [
//   { icon: '🌐', color: 'rgba(0,87,184,0.2)', title: 'Développement Web', tags: ['React', 'Next.js', 'TypeScript', 'Laravel'], desc: 'Sites vitrine, e-commerce, SaaS — des applications performantes, accessibles et optimisées pour convertir vos visiteurs en clients.' },
//   { icon: '📱', color: 'rgba(0,180,100,0.2)', title: 'Applications Mobiles', tags: ['Flutter', 'iOS', 'Android', 'Firebase'], desc: 'Apps cross-platform fluides et élégantes. Développées avec Flutter pour une expérience native sur iOS et Android, publication incluse.' },
//   { icon: '⚙️', color: 'rgba(0,229,255,0.15)', title: 'Backend & APIs', tags: ['Node.js', 'AdonisJS', 'PostgreSQL', 'Docker'], desc: "Architecture robuste, APIs RESTful & GraphQL, systèmes scalables. Des solutions backend conçues pour durer et grandir avec votre business." },
//   { icon: '🎨', color: 'rgba(255,167,38,0.15)', title: 'Design UI/UX', tags: ['Figma', 'Prototyping', 'Design System'], desc: 'Interfaces belles et intuitives conçues pour convertir. Maquettes interactives validées avant la moindre ligne de code.' },
//   { icon: '📊', color: 'rgba(233,30,99,0.15)', title: 'SEO & Performance', tags: ['SEO', 'Analytics', 'Core Web Vitals'], desc: 'Optimisation pour les moteurs de recherche, audits Lighthouse, stratégie de contenu. Soyez visible là où vos clients vous cherchent.' },
//   { icon: '🎓', color: 'rgba(156,39,176,0.18)', title: 'Formation & Conseil', tags: ['Workshops', 'Audit', 'Mentoring'], desc: 'Ateliers techniques, audit de code et conseil en architecture. Montez en compétences avec notre équipe expérimentée.' },
// ];

// export const ServicesSection: React.FC = () => {
//   const { t }        = useTranslation();
//   const [hov, setHov] = useState<number | null>(null);
//   const { ref, inView } = useReveal();

//   return (
//     <SectionBg variant="a" className="section">
//       <div className="container">
//         <motion.div
//           ref={ref}
//           initial={{ opacity: 0, y: 28 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'end', marginBottom: 56 }}
//           className="section-header-2col"
//         >
//           <div>
//             <Eyebrow>{t('services.eyebrow', { defaultValue: 'Nos Expertises' })}</Eyebrow>
//             <SectionTitle>Des solutions<br />qui font la différence</SectionTitle>
//           </div>
//           <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)' }}>
//             {t('services.subtitle', { defaultValue: "De l'idée au lancement, nous maîtrisons chaque étape pour vous livrer un produit qui génère de la valeur réelle." })}
//           </p>
//         </motion.div>

//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="services-grid">
//           {SERVICES.map((svc, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 36 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}
//               onMouseEnter={() => setHov(i)}
//               onMouseLeave={() => setHov(null)}
//               style={{
//                 borderRadius: 20, padding: '32px 26px',
//                 background: hov === i ? 'var(--green2)' : 'var(--bg-card)',
//                 border: `1px solid ${hov === i ? 'var(--green2)' : 'var(--border-subtle)'}`,
//                 cursor: 'default', position: 'relative', overflow: 'hidden',
//                 boxShadow: hov === i ? '0 20px 56px rgba(0,184,148,0.22)' : 'var(--shadow-card)',
//                 transition: 'all 0.32s cubic-bezier(0.4,0,0.2,1)',
//                 transform: hov === i ? 'translateY(-8px)' : 'translateY(0)',
//               }}
//             >
//               {/* Icon */}
//               <div style={{
//                 width: 56, height: 56, borderRadius: 14, marginBottom: 20,
//                 background: hov === i ? 'rgba(255,255,255,0.18)' : svc.color,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 fontSize: 24, transition: 'all 0.3s',
//                 transform: hov === i ? 'scale(1.12) rotate(-6deg)' : 'scale(1)',
//               }}>
//                 {svc.icon}
//               </div>

//               <h3 style={{
//                 fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700,
//                 color: hov === i ? '#000' : 'var(--text-primary)',
//                 marginBottom: 10, transition: 'color 0.3s',
//               }}>
//                 {t(`services.${i}.title`, { defaultValue: svc.title })}
//               </h3>
//               <p style={{
//                 fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.75,
//                 color: hov === i ? 'rgba(0,0,0,0.72)' : 'var(--text-secondary)',
//                 marginBottom: 18, transition: 'color 0.3s',
//               }}>
//                 {t(`services.${i}.desc`, { defaultValue: svc.desc })}
//               </p>

//               <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
//                 {svc.tags.map(tag => (
//                   <span key={tag} style={{
//                     fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
//                     padding: '4px 10px', borderRadius: 100,
//                     border: `1px solid ${hov === i ? 'rgba(0,0,0,0.2)' : 'var(--border-subtle)'}`,
//                     color: hov === i ? 'rgba(0,0,0,0.7)' : 'var(--text-secondary)',
//                     background: hov === i ? 'rgba(255,255,255,0.2)' : 'transparent',
//                     transition: 'all 0.3s',
//                   }}>
//                     {tag}
//                   </span>
//                 ))}
//               </div>

//               {/* Arrow */}
//               <div style={{
//                 position: 'absolute', bottom: 22, right: 22,
//                 width: 34, height: 34, borderRadius: '50%',
//                 border: `1px solid ${hov === i ? 'rgba(0,0,0,0.2)' : 'var(--border)'}`,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 color: hov === i ? '#000' : 'var(--text-muted)',
//                 fontSize: 14, transition: 'all 0.3s',
//                 transform: hov === i ? 'rotate(-45deg)' : 'rotate(0)',
//                 background: hov === i ? 'rgba(255,255,255,0.2)' : 'transparent',
//               }}>
//                 →
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//       <style>{`
//         @media(max-width:900px){.section-header-2col{grid-template-columns:1fr !important;gap:24px !important;}.services-grid{grid-template-columns:1fr !important;}}
//         @media(min-width:900px) and (max-width:1200px){.services-grid{grid-template-columns:repeat(2,1fr) !important;}}
//       `}</style>
//     </SectionBg>
//   );
// };

// // ─── STATS ────────────────────────────────────────────────────────────────────
// function useCountUp(target: number, trigger: boolean) {
//   const [count, setCount] = useState(0);
//   useEffect(() => {
//     if (!trigger) return;
//     let raf: number;
//     const start = performance.now();
//     const dur   = 2000;
//     const step  = (now: number) => {
//       const t    = Math.min((now - start) / dur, 1);
//       const ease = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
//       setCount(Math.floor(ease * target));
//       if (t < 1) raf = requestAnimationFrame(step);
//       else setCount(target);
//     };
//     raf = requestAnimationFrame(step);
//     return () => cancelAnimationFrame(raf);
//   }, [trigger, target]);
//   return count;
// }

// const StatCounter: React.FC<{ icon: string; value: number; suffix: string; label: string; delay: number; trigger: boolean }> = ({ icon, value, suffix, label, delay, trigger }) => {
//   const count = useCountUp(value, trigger);
//   const { isDark } = useTheme();
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 24 }}
//       animate={trigger ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.55, delay }}
//       style={{
//         textAlign: 'center', padding: '40px 24px', borderRadius: 20,
//         background: isDark ? 'rgba(0,230,118,0.04)' : 'rgba(0,87,184,0.04)',
//         border: '1px solid var(--border)',
//         position: 'relative', overflow: 'hidden',
//         transition: 'transform 0.3s, border-color 0.3s',
//       }}
//       whileHover={{ y: -6, borderColor: 'var(--green2)' } as any}
//     >
//       <div style={{ fontSize: 30, marginBottom: 14, animation: `iconFloat ${3 + delay}s ease-in-out infinite` }}>{icon}</div>
//       <div style={{
//         fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4vw,56px)', fontWeight: 800, lineHeight: 1,
//         background: 'linear-gradient(90deg, var(--green), var(--cyan))',
//         WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
//         marginBottom: 8,
//       }}>
//         {count}{suffix}
//       </div>
//       <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
//     </motion.div>
//   );
// };

// const STATS = [
//   { icon: '💼', value: 50,  suffix: '+', label: 'Projets livrés' },
//   { icon: '😊', value: 30,  suffix: '+', label: 'Clients satisfaits' },
//   { icon: '📅', value: 5,   suffix: '+', label: "Ans d'expérience" },
//   { icon: '⭐', value: 98,  suffix: '%', label: 'Taux de satisfaction' },
// ];

// export const StatsSection: React.FC = () => {
//   const { t }   = useTranslation();
//   const ref      = useRef<HTMLDivElement>(null);
//   const inView   = useInView(ref, { once: true, margin: '-80px' });
//   const { isDark } = useTheme();

//   return (
//     <div ref={ref} style={{
//       background: isDark
//         ? 'linear-gradient(135deg, #020d1a 0%, #021c0e 50%, #020d1a 100%)'
//         : 'linear-gradient(135deg, #e8f5f0 0%, #d4f0e8 50%, #e8f5f0 100%)',
//       borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
//       padding: '100px 0', position: 'relative', overflow: 'hidden',
//       transition: 'background 0.4s',
//     }}>
//       {/* Animated lines */}
//       {[{ top: '30%', dur: 12, delay: 0 }, { top: '65%', dur: 16, delay: 5 }].map((l, i) => (
//         <span key={i} aria-hidden style={{
//           position: 'absolute', top: l.top, left: 0, right: 0, height: '1px',
//           background: 'linear-gradient(90deg, transparent, rgba(0,230,118,0.18), transparent)',
//           animation: `lineSlide ${l.dur}s linear ${l.delay}s infinite`,
//           pointerEvents: 'none',
//         }} />
//       ))}

//       <div className="container">
//         {/* Top: headline + testimonial card */}
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center', marginBottom: 64 }} className="stats-header-grid">
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.6 }}
//           >
//             <Eyebrow>{t('stats.eyebrow', { defaultValue: 'En chiffres' })}</Eyebrow>
//             <SectionTitle>Des résultats<br />qui parlent d'eux-mêmes</SectionTitle>
//             <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.8, color: 'var(--text-secondary)', marginTop: 12 }}>
//               {t('stats.subtitle', { defaultValue: 'Chaque chiffre représente la confiance de nos clients et l\'engagement de notre équipe à dépasser leurs attentes.' })}
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.6, delay: 0.15 }}
//             style={{
//               background: 'var(--bg-card)', border: '1px solid var(--border)',
//               borderRadius: 20, padding: 28,
//             }}
//           >
//             <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
//               <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, var(--green2), var(--blue2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🏆</div>
//               <div>
//                 <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Meilleure agence digitale</div>
//                 <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Cameroun Tech Awards 2024</div>
//               </div>
//             </div>
//             <div style={{ height: 1, background: 'var(--border)', marginBottom: 16 }} />
//             <div style={{ display: 'flex', gap: 2, marginBottom: 10 }}>
//               {[...Array(5)].map((_,i) => <span key={i} style={{ color: '#FFBB00', fontSize: 15 }}>★</span>)}
//               <span style={{ fontSize: 13, color: 'var(--text-secondary)', marginLeft: 6 }}><strong style={{ color: 'var(--text-primary)' }}>4.9/5</strong> · 48 avis</span>
//             </div>
//             <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic' }}>
//               "DB Digital Agency a transformé notre vision en produit exceptionnel, livré avant le délai prévu."
//             </p>
//             <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', marginTop: 8 }}>— CEO, StartupCM</div>
//           </motion.div>
//         </div>

//         {/* Counter cards */}
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }} className="stats-count-grid">
//           {STATS.map((s, i) => (
//             <StatCounter key={i} icon={s.icon} value={s.value} suffix={s.suffix} label={t(`stats.${i}`, { defaultValue: s.label })} delay={i * 0.1} trigger={inView} />
//           ))}
//         </div>
//       </div>
//       <style>{`
//         @media(max-width:900px){.stats-header-grid{grid-template-columns:1fr !important;}.stats-count-grid{grid-template-columns:repeat(2,1fr) !important;}}
//         @media(max-width:480px){.stats-count-grid{grid-template-columns:1fr 1fr !important;}}
//       `}</style>
//     </div>
//   );
// };

// // ─── VISION ───────────────────────────────────────────────────────────────────
// const VALUES = [
//   { icon: '⚡', title: 'Rapidité d\'exécution', desc: 'Sprints agiles, deadlines respectées. Nous livrons vite sans sacrifier la qualité.' },
//   { icon: '💎', title: 'Excellence technique', desc: 'Code propre, architecture solide, technologies modernes — nous ne faisons pas de compromis.' },
//   { icon: '🤝', title: 'Partenariat durable', desc: 'Nous ne sommes pas un prestataire, nous sommes votre partenaire tech de confiance.' },
//   { icon: '📈', title: 'ROI mesurable', desc: 'Chaque décision technique est prise en regard de son impact sur vos revenus.' },
// ];

// export const VisionSection: React.FC = () => {
//   const { t }   = useTranslation();
//   const { ref, inView } = useReveal();
//   const { isDark } = useTheme();

//   return (
//     <SectionBg variant="c" className="section">
//       <div className="container">
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }} className="vision-grid" ref={ref}>

//           {/* Orbital illustration */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.85 }}
//             animate={inView ? { opacity: 1, scale: 1 } : {}}
//             transition={{ duration: 0.7 }}
//             style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//             className="vision-orb"
//           >
//             <div style={{ position: 'relative', width: 320, height: 320 }}>
//               {/* Outer ring */}
//               <div style={{
//                 position: 'absolute', inset: 0, borderRadius: '50%',
//                 border: '1.5px solid var(--border)', animation: 'spin 22s linear infinite',
//               }}>
//                 {[{ top: -22, left: '50%', ml: -22, icon: '🌐' }, { right: -22, top: '50%', mt: -22, icon: '📱' }, { bottom: -22, left: '50%', ml: -22, icon: '⚙️' }, { left: -22, top: '50%', mt: -22, icon: '🎨' }].map((dot, i) => (
//                   <div key={i} style={{
//                     position: 'absolute', width: 44, height: 44, borderRadius: '50%',
//                     background: 'var(--bg-card)', border: '1px solid var(--border)',
//                     display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
//                     top: dot.top, right: (dot as any).right, bottom: (dot as any).bottom, left: dot.left,
//                     marginLeft: dot.ml, marginTop: dot.mt,
//                     animation: 'spinR 22s linear infinite',
//                   }}>
//                     {dot.icon}
//                   </div>
//                 ))}
//               </div>

//               {/* Middle ring */}
//               <div style={{
//                 position: 'absolute', inset: 40, borderRadius: '50%',
//                 border: '1px dashed var(--border-card)', animation: 'spinR 15s linear infinite',
//               }} />

//               {/* Center */}
//               <div style={{
//                 position: 'absolute', inset: 80, borderRadius: '50%',
//                 background: isDark
//                   ? 'linear-gradient(135deg, rgba(0,88,184,0.25), rgba(0,180,100,0.2))'
//                   : 'linear-gradient(135deg, rgba(0,88,184,0.12), rgba(0,180,100,0.1))',
//                 border: '1px solid var(--border)',
//                 display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
//                 backdropFilter: 'blur(8px)',
//               }}>
//                 <div style={{ fontSize: 36, marginBottom: 8 }}>🚀</div>
//                 <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', textAlign: 'center', lineHeight: 1.3 }}>DB Digital<br />Agency</div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Content */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.7, delay: 0.15 }}
//           >
//             <Eyebrow>{t('vision.eyebrow', { defaultValue: 'Notre Vision' })}</Eyebrow>
//             <SectionTitle>Bâtir l'Afrique<br />digitale de demain</SectionTitle>
//             <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 28 }}>
//               {t('vision.desc', { defaultValue: 'Nous croyons que chaque entreprise africaine mérite des outils numériques de classe mondiale. Notre mission : démocratiser l\'excellence technologique.' })}
//             </p>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
//               {VALUES.map((v, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={inView ? { opacity: 1, x: 0 } : {}}
//                   transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
//                   style={{
//                     display: 'grid', gridTemplateColumns: '48px 1fr', gap: 16,
//                     padding: '18px 20px', borderRadius: 14,
//                     background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
//                     cursor: 'default', transition: 'all 0.3s',
//                   }}
//                   whileHover={{ x: 6, borderColor: 'var(--green2)' } as any}
//                 >
//                   <div style={{
//                     width: 48, height: 48, borderRadius: 12, fontSize: 20,
//                     background: 'linear-gradient(135deg, rgba(0,184,148,0.2), rgba(0,168,232,0.15))',
//                     border: '1px solid var(--border)',
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                     transition: 'transform 0.3s',
//                   }}>
//                     {v.icon}
//                   </div>
//                   <div>
//                     <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{t(`vision.val.${i}.title`, { defaultValue: v.title })}</h4>
//                     <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t(`vision.val.${i}.desc`, { defaultValue: v.desc })}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//       <style>{`@media(max-width:900px){.vision-grid{grid-template-columns:1fr !important;}.vision-orb{display:none !important;}}`}</style>
//     </SectionBg>
//   );
// };

// // ─── PARTNERS ─────────────────────────────────────────────────────────────────
// const PARTNERS = [
//   { icon: '⚛', name: 'React' }, { icon: '🟢', name: 'Node.js' },
//   { icon: '🐦', name: 'Flutter' }, { icon: '🔴', name: 'Laravel' },
//   { icon: '🐳', name: 'Docker' }, { icon: '🔥', name: 'Firebase' },
//   { icon: '🐘', name: 'PostgreSQL' }, { icon: '🔷', name: 'TypeScript' },
//   { icon: '🎨', name: 'Figma' }, { icon: '☁', name: 'AWS' },
// ];

// export const PartnersSection: React.FC = () => {
//   const { t }   = useTranslation();
//   const { ref, inView } = useReveal();
//   const { isDark } = useTheme();

//   return (
//     <div ref={ref} style={{
//       background: isDark ? 'var(--bg-secondary)' : 'var(--bg-secondary)',
//       borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
//       padding: '72px 0', overflow: 'hidden',
//       transition: 'background 0.4s',
//     }}>
//       <div className="container">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.5 }}
//           style={{ textAlign: 'center', marginBottom: 48 }}
//         >
//           <Eyebrow center>{t('partners.eyebrow', { defaultValue: 'Technologies & Partenaires' })}</Eyebrow>
//           <SectionTitle center>{t('partners.title', { defaultValue: 'Ils nous font confiance' })}</SectionTitle>
//         </motion.div>
//       </div>

//       {/* Marquee */}
//       <div style={{ position: 'relative', overflow: 'hidden' }}>
//         <div style={{
//           position: 'absolute', top: 0, left: 0, bottom: 0, width: 120, zIndex: 2,
//           background: `linear-gradient(to right, ${isDark ? 'var(--bg-secondary)' : 'var(--bg-secondary)'}, transparent)`,
//           pointerEvents: 'none',
//         }} />
//         <div style={{
//           position: 'absolute', top: 0, right: 0, bottom: 0, width: 120, zIndex: 2,
//           background: `linear-gradient(to left, ${isDark ? 'var(--bg-secondary)' : 'var(--bg-secondary)'}, transparent)`,
//           pointerEvents: 'none',
//         }} />
//         <div style={{ display: 'flex', gap: 16, width: 'max-content', animation: 'marquee 28s linear infinite' }}>
//           {[...PARTNERS, ...PARTNERS].map((p, i) => (
//             <div key={i} style={{
//               display: 'flex', alignItems: 'center', gap: 10,
//               padding: '12px 24px', borderRadius: 12, whiteSpace: 'nowrap',
//               background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
//               fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15,
//               color: 'var(--text-secondary)',
//               transition: 'all 0.3s',
//             }}>
//               <span style={{ fontSize: 20 }}>{p.icon}</span>
//               {p.name}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── WHY US ───────────────────────────────────────────────────────────────────
// const WHY_FEATURES = [
//   { icon: '🔒', title: 'Code propriétaire & sécurisé', desc: 'Votre code vous appartient à 100%. Aucune dépendance cachée, documentation complète incluse.' },
//   { icon: '⚡', title: 'Délais garantis', desc: 'Méthodologie agile avec jalons clairs. Nous tenons nos engagements, toujours.' },
//   { icon: '🛠️', title: 'Support 3 mois post-livraison', desc: 'Trois mois de support technique gratuit inclus après chaque livraison.' },
//   { icon: '💰', title: 'Rapport qualité/prix imbattable', desc: 'Qualité internationale aux tarifs du marché local. Le meilleur des deux mondes.' },
//   { icon: '🌍', title: 'Expertise locale, vision globale', desc: 'Nous comprenons les réalités africaines et les standards internationaux.' },
// ];

// const PROG_BARS = [
//   { label: 'Satisfaction client', pct: 98 },
//   { label: 'Livrés dans les délais', pct: 95 },
//   { label: 'Clients récurrents', pct: 87 },
//   { label: 'Performance Lighthouse', pct: 92 },
// ];

// export const WhySection: React.FC = () => {
//   const { t }           = useTranslation();
//   const ref              = useRef<HTMLDivElement>(null);
//   const inView           = useInView(ref, { once: true, margin: '-60px' });

//   return (
//     <SectionBg variant="b" className="section">
//       <div className="container">
//         <motion.div
//           initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto 60px' }}
//         >
//           <Eyebrow center>{t('why.eyebrow', { defaultValue: 'Pourquoi nous choisir' })}</Eyebrow>
//           <SectionTitle center>Ce qui nous rend<br />uniques sur le marché</SectionTitle>
//         </motion.div>

//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }} className="why-grid" ref={ref}>
//           {/* Features */}
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//             {WHY_FEATURES.map((f, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, x: -24 }}
//                 animate={inView ? { opacity: 1, x: 0 } : {}}
//                 transition={{ duration: 0.5, delay: i * 0.09 }}
//                 style={{
//                   display: 'grid', gridTemplateColumns: '52px 1fr', gap: 16,
//                   padding: '20px 22px', borderRadius: 16,
//                   background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
//                   cursor: 'default', transition: 'all 0.3s',
//                 }}
//                 whileHover={{ x: 6, borderColor: 'var(--green2)' } as any}
//               >
//                 <div style={{
//                   width: 52, height: 52, borderRadius: 14, fontSize: 22,
//                   background: 'linear-gradient(135deg, rgba(0,184,148,0.18), rgba(0,168,232,0.12))',
//                   border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 }}>
//                   {f.icon}
//                 </div>
//                 <div>
//                   <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{f.title}</h4>
//                   <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{f.desc}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Progress bars card */}
//           <motion.div
//             initial={{ opacity: 0, x: 24 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             style={{
//               padding: '36px 32px', borderRadius: 20,
//               background: 'var(--bg-card)', border: '1px solid var(--border)',
//               position: 'relative', overflow: 'hidden',
//             }}
//           >
//             <div aria-hidden style={{
//               position: 'absolute', top: -40, right: -40, width: 160, height: 160,
//               borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,230,118,0.12), transparent)',
//               pointerEvents: 'none',
//             }} />
//             <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 28 }}>
//               📊 Nos taux de performance
//             </h3>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
//               {PROG_BARS.map((bar, i) => (
//                 <div key={i}>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
//                     <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{bar.label}</span>
//                     <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 800, color: 'var(--green)' }}>{bar.pct}%</span>
//                   </div>
//                   <div style={{ height: 6, borderRadius: 100, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
//                     <motion.div
//                       initial={{ width: 0 }}
//                       animate={inView ? { width: `${bar.pct}%` } : {}}
//                       transition={{ duration: 1.2, delay: 0.4 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
//                       style={{ height: '100%', borderRadius: 100, background: 'linear-gradient(90deg, var(--green2), var(--cyan))' }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 14 }}>
//               <div style={{ display: 'flex' }}>
//                 {['D','B','C'].map((l, i) => (
//                   <div key={l} style={{
//                     width: 34, height: 34, borderRadius: '50%', border: '2px solid var(--bg-card)',
//                     background: `linear-gradient(135deg, hsl(${155 + i * 25},65%,45%), hsl(${195 + i * 20},65%,55%))`,
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                     fontSize: 11, fontWeight: 800, color: '#fff',
//                     marginLeft: i > 0 ? -8 : 0, zIndex: 3 - i,
//                   }}>{l}</div>
//                 ))}
//               </div>
//               <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)' }}>
//                 <strong style={{ color: 'var(--text-primary)' }}>30+ clients</strong> nous font déjà confiance
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//       <style>{`@media(max-width:900px){.why-grid{grid-template-columns:1fr !important;}}`}</style>
//     </SectionBg>
//   );
// };

// // ─── PROCESS ──────────────────────────────────────────────────────────────────
// const STEPS = [
//   { num: '01', title: 'Découverte', desc: 'Call gratuit 30 min pour comprendre vos besoins, objectifs et contraintes.' },
//   { num: '02', title: 'Stratégie', desc: 'Proposition technique détaillée, roadmap et budget en 48h.' },
//   { num: '03', title: 'Design', desc: 'Maquettes Figma interactives validées avant la moindre ligne de code.' },
//   { num: '04', title: 'Développement', desc: 'Sprints agiles de 2 semaines avec démos régulières et ajustements.' },
//   { num: '05', title: 'Lancement', desc: 'Déploiement, formation équipe et support 3 mois inclus.' },
// ];

// export const ProcessSection: React.FC = () => {
//   const { t }   = useTranslation();
//   const { ref, inView } = useReveal();
//   const { isDark } = useTheme();

//   return (
//     <div ref={ref} style={{
//       background: isDark ? 'var(--bg-primary)' : 'var(--bg-primary)',
//       borderTop: '1px solid var(--border)',
//       padding: '100px 0', position: 'relative', overflow: 'hidden',
//       transition: 'background 0.4s',
//     }}>
//       {/* Animated lines */}
//       {[{ top: '20%', dur: 10, delay: 0 }, { top: '50%', dur: 14, delay: 4 }, { top: '80%', dur: 9, delay: 2 }].map((l, i) => (
//         <span key={i} aria-hidden style={{
//           position: 'absolute', top: l.top, left: 0, right: 0, height: '1px',
//           background: 'linear-gradient(90deg, transparent, rgba(0,168,232,0.14), transparent)',
//           animation: `lineSlide ${l.dur}s linear ${l.delay}s infinite`,
//           pointerEvents: 'none',
//         }} />
//       ))}

//       <div className="container">
//         <motion.div
//           initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 64px' }}
//         >
//           <Eyebrow center>{t('process.eyebrow', { defaultValue: 'Notre Processus' })}</Eyebrow>
//           <SectionTitle center>5 étapes vers<br />votre succès digital</SectionTitle>
//         </motion.div>

//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 0, position: 'relative' }} className="process-steps">
//           {/* Connector line */}
//           <div aria-hidden style={{
//             position: 'absolute', top: 35, left: '10%', right: '10%', height: '2px',
//             background: 'linear-gradient(90deg, var(--green2), var(--cyan), var(--blue2))',
//             zIndex: 0,
//           }} />

//           {STEPS.map((step, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 32 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
//               style={{ textAlign: 'center', position: 'relative', zIndex: 1, padding: '0 8px' }}
//               whileHover={{ y: -8 } as any}
//             >
//               <motion.div
//                 whileHover={{ scale: 1.18, boxShadow: '0 12px 36px rgba(0,184,148,0.5)' }}
//                 style={{
//                   width: 70, height: 70, borderRadius: '50%', margin: '0 auto 20px',
//                   display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: '#000',
//                   background: 'linear-gradient(135deg, var(--green2), var(--cyan))',
//                   boxShadow: '0 8px 24px rgba(0,184,148,0.35)',
//                   cursor: 'default',
//                 }}
//               >
//                 {step.num}
//               </motion.div>
//               <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
//                 {t(`process.${i}.title`, { defaultValue: step.title })}
//               </h4>
//               <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
//                 {t(`process.${i}.desc`, { defaultValue: step.desc })}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//       <style>{`@media(max-width:900px){.process-steps{grid-template-columns:repeat(3,1fr) !important;gap:24px !important;} .process-steps>div:first-child+div+div+div{display:none} .process-steps>div:last-child{display:none}}`}</style>
//       <SectionBg/>
//     </div>
//   );
// };

// // ─── CTA ─────────────────────────────────────────────────────────────────────
// export const CTASection: React.FC = () => {
//   const { t }   = useTranslation();
//   const { ref, inView } = useReveal();
//   const { isDark } = useTheme();

//   return (
//     <div style={{
//       background: isDark ? 'var(--bg-primary)' : 'var(--bg-secondary)',
//       padding: '40px 0 80px', transition: 'background 0.4s',
//     }}>
//       <div className="container">
//         <motion.div
//           ref={ref}
//           initial={{ opacity: 0, y: 36 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.7 }}
//           style={{
//             borderRadius: 28, padding: 'clamp(40px,6vw,72px) clamp(32px,6vw,72px)',
//             position: 'relative', overflow: 'hidden',
//             display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center',
//             background: 'linear-gradient(135deg, #020d1a 0%, #031a0e 50%, #020d1a 100%)',
//             border: '1px solid rgba(0,230,118,0.15)',
//           }}
//           className="cta-grid"
//         >
//           {/* Glows */}
//           <div aria-hidden style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,180,100,0.1), transparent 70%)', animation: 'glowPulse 5s ease-in-out infinite', pointerEvents: 'none' }} />
//           <div aria-hidden style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(0,87,184,0.08)', pointerEvents: 'none' }} />
//           {/* Animated lines */}
//           {[{ top: '30%', dur: 8, delay: 0 }, { top: '70%', dur: 12, delay: 3 }].map((l, i) => (
//             <span key={i} aria-hidden style={{
//               position: 'absolute', top: l.top, left: 0, right: 0, height: '1px',
//               background: 'linear-gradient(90deg, transparent, rgba(0,230,118,0.2), transparent)',
//               animation: `lineSlide ${l.dur}s linear ${l.delay}s infinite`, pointerEvents: 'none',
//             }} />
//           ))}

//           <div style={{ position: 'relative', zIndex: 1 }}>
//             <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,230,118,0.1)', border: '1px solid var(--border)', borderRadius: 100, padding: '6px 16px', marginBottom: 20 }}>
//               <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', animation: 'pulse 2s infinite' }} />
//               <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--green)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Réponse garantie sous 24h</span>
//             </div>
//             <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,50px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: 16 }}>
//               Prêt à transformer votre<br />
//               <span style={{ background: 'linear-gradient(90deg, var(--green), var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
//                 vision en réalité ?
//               </span>
//             </h2>
//             <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(255,255,255,0.6)', maxWidth: 500, lineHeight: 1.75 }}>
//               {t('cta.desc', { defaultValue: "Rejoignez 30+ entreprises qui ont choisi DB Digital Agency. Discutons de votre projet." })}
//             </p>
//           </div>

//           <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0, position: 'relative', zIndex: 1 }}>
//             <a href="mailto:contact@db-digital.agency" className="btn-primary" style={{ justifyContent: 'center', background: 'linear-gradient(135deg, var(--green2), var(--cyan))' }}>
//               ✉ {t('cta.email', { defaultValue: 'Nous contacter' })}
//             </a>
//             <a href="https://wa.me/237697374910" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ justifyContent: 'center', borderColor: 'rgba(255,255,255,0.18)', color: '#fff' }}>
//               💬 {t('cta.whatsapp', { defaultValue: 'WhatsApp' })}
//             </a>
//           </div>
//         </motion.div>
//       </div>
//       <style>{`@media(max-width:768px){.cta-grid{grid-template-columns:1fr !important;}}`}</style>
//     </div>
//   );
// };



// // import React from 'react';
// // import { useScrollReveal } from '../hooks/useScrollReveal';

// // interface SectionProps {
// //   children: React.ReactNode;
// //   id: string;
// //   className?: string;
// //   variant?: 'light' | 'primary-light';
// // }

// // export const Section: React.FC<SectionProps> = ({ 
// //   children, 
// //   id, 
// //   className = '',
// //   variant = 'light'
// // }) => {
// //   const ref = useScrollReveal();

// //   const variants = {
// //     light: "bg-tertiary",
// //     'primary-light': "bg-primary-light"
// //   };

// //   return (
// //     <section
// //       id={id}
// //       ref={ref}
// //       className={`py-20 px-5 md:px-20 rounded-custom shadow-custom transition-opacity duration-500 opacity-0 ${variants[variant]} ${className}`}
// //     >
// //       {children}
// //     </section>
// //   );
// // };