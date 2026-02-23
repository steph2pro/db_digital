import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';
// import { useTheme } from '../../contexts/ThemeContext';

// ─── AnimatedLine types ───────────────────────────────────────────────────────
interface LineConfig {
  top?: string;
  left?: string;
  duration: number;
  delay: number;
  opacity?: number;
}

// ─── Horizontal animated lines ────────────────────────────────────────────────
const H_LINES: LineConfig[] = [
  { top: '15%',  duration: 6,  delay: 0,   opacity: 0.6 },
  { top: '35%',  duration: 9,  delay: 2,   opacity: 0.4 },
  { top: '55%',  duration: 7,  delay: 4,   opacity: 0.5 },
  { top: '72%',  duration: 11, delay: 1,   opacity: 0.3 },
  { top: '88%',  duration: 8,  delay: 5.5, opacity: 0.4 },
];

const V_LINES: LineConfig[] = [
  { left: '18%',  duration: 8,  delay: 0,   opacity: 0.5 },
  { left: '40%',  duration: 12, delay: 3,   opacity: 0.3 },
  { left: '65%',  duration: 9,  delay: 1.5, opacity: 0.4 },
  { left: '82%',  duration: 7,  delay: 4.5, opacity: 0.35 },
];

// ─── Particle canvas ──────────────────────────────────────────────────────────
const ParticleCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();
  const animRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx    = canvas.getContext('2d')!;
    const color1 = isDark ? '0,230,118' : '0,150,100';
    const color2 = isDark ? '0,168,232' : '0,87,184';

    const resize = () => {
      canvas.width  = canvas.parentElement!.offsetWidth;
      canvas.height = canvas.parentElement!.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      x = 0; y = 0; size = 0; vx = 0; vy = 0;
      life = 0; maxLife = 0; color = color1;
      constructor() { this.reset(); }
      reset() {
        this.x       = Math.random() * canvas.width;
        this.y       = Math.random() * canvas.height;
        this.size    = Math.random() * 1.4 + 0.3;
        this.vx      = (Math.random() - 0.5) * 0.35;
        this.vy      = (Math.random() - 0.5) * 0.35;
        this.life    = Math.random();
        this.maxLife = 0.4 + Math.random() * 0.6;
        this.color   = Math.random() > 0.5 ? color1 : color2;
      }
      update() {
        this.x += this.vx; this.y += this.vy; this.life += 0.0015;
        if (this.life > this.maxLife || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height)
          this.reset();
      }
      draw() {
        const alpha = Math.sin((this.life / this.maxLife) * Math.PI) * (isDark ? 0.55 : 0.4);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${alpha})`;
        ctx.fill();
      }
    }

    const pts = Array.from({ length: 80 }, () => new Particle());

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => { p.update(); p.draw(); });
      // connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx   = pts[i].x - pts[j].x;
          const dy   = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(0,230,118,${(1 - dist / 110) * (isDark ? 0.07 : 0.05)})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  );
};

// ─── Main AnimatedBackground component ───────────────────────────────────────
interface AnimatedBackgroundProps {
  /** Show particle network */
  particles?: boolean;
  /** Show horizontal animated light rays */
  hLines?: boolean;
  /** Show vertical animated light rays */
  vLines?: boolean;
  /** Additional gradient overlays */
  glows?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  particles = true,
  hLines    = true,
  vLines    = false,
  glows     = true,
  className = '',
  style     = {},
  children,
}) => {
  const { isDark } = useTheme();

  return (
    <div
      className={className}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
    >
      {/* Gradient mesh */}
      {glows && (
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
            background: `
              radial-gradient(ellipse 75% 55% at 15% 55%, ${isDark ? 'rgba(0,184,100,0.18)' : 'rgba(0,184,100,0.09)'} 0%, transparent 60%),
              radial-gradient(ellipse 60% 60% at 85% 25%, ${isDark ? 'rgba(0,87,184,0.22)' : 'rgba(0,87,184,0.10)'} 0%, transparent 60%),
              radial-gradient(ellipse 50% 40% at 50% 80%, ${isDark ? 'rgba(0,229,255,0.07)' : 'rgba(0,229,255,0.04)'} 0%, transparent 60%)
            `,
            animation: 'meshPulse 10s ease-in-out infinite',
          }}
        />
      )}

      {/* Dot grid */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(0,230,118,0.08)' : 'rgba(0,100,80,0.07)'} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Horizontal animated lines */}
      {hLines && H_LINES.map((cfg, i) => (
        <span
          key={`hl-${i}`}
          aria-hidden
          style={{
            position: 'absolute',
            top: cfg.top, left: 0, right: 0, height: '1px',
            background: `linear-gradient(90deg, transparent 0%, ${isDark ? 'rgba(0,230,118,0.22)' : 'rgba(0,150,100,0.18)'} 50%, transparent 100%)`,
            opacity: cfg.opacity ?? 0.5,
            animation: `lineSlide ${cfg.duration}s linear ${cfg.delay}s infinite`,
            pointerEvents: 'none', zIndex: 0,
          }}
        />
      ))}

      {/* Vertical animated lines */}
      {vLines && V_LINES.map((cfg, i) => (
        <span
          key={`vl-${i}`}
          aria-hidden
          style={{
            position: 'absolute',
            left: cfg.left, top: 0, bottom: 0, width: '1px',
            background: `linear-gradient(180deg, transparent 0%, ${isDark ? 'rgba(0,168,232,0.22)' : 'rgba(0,87,184,0.15)'} 50%, transparent 100%)`,
            opacity: cfg.opacity ?? 0.5,
            animation: `lineSlideV ${cfg.duration}s linear ${cfg.delay}s infinite`,
            pointerEvents: 'none', zIndex: 0,
          }}
        />
      ))}

      {/* Particles */}
      {particles && <ParticleCanvas />}

      {/* Children on top */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

// ─── Section gradient background (no particles, lighter) ─────────────────────
export const SectionBg: React.FC<{
  variant?: 'a' | 'b' | 'c';
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ variant = 'a', children, className = '', style = {} }) => {
  const { isDark } = useTheme();

  const gradients = {
    a: isDark
      ? 'linear-gradient(180deg, #020d1a 0%, #041526 100%)'
      : 'linear-gradient(180deg, #f0f7ff 0%, #e4f0fa 100%)',
    b: isDark
      ? 'linear-gradient(160deg, #041526 0%, #021c0e 50%, #041526 100%)'
      : 'linear-gradient(160deg, #e8f5f0 0%, #f0faf5 50%, #e8f5f0 100%)',
    c: isDark
      ? 'linear-gradient(180deg, #020d1a 0%, #071e33 100%)'
      : 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)',
  };

  return (
    <div
      className={className}
      style={{
        position: 'relative', overflow: 'hidden',
        background: gradients[variant],
        transition: 'background 0.4s',
        ...style,
      }}
    >
      {/* subtle dot grid */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(0,230,118,0.05)' : 'rgba(0,87,184,0.05)'} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />
      {/* corner glows */}
      <div aria-hidden style={{
        position: 'absolute', top: -100, right: -100, width: 400, height: 400,
        borderRadius: '50%',
        background: isDark ? 'radial-gradient(circle, rgba(0,87,184,0.1), transparent 70%)' : 'radial-gradient(circle, rgba(0,87,184,0.06), transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Horizontal lines (slower, subtler) */}
      {[{ top: '30%', dur: 14, delay: 0 }, { top: '70%', dur: 18, delay: 6 }].map((l, i) => (
        <span key={i} aria-hidden style={{
          position: 'absolute', top: l.top, left: 0, right: 0, height: '1px',
          background: `linear-gradient(90deg, transparent, ${isDark ? 'rgba(0,230,118,0.12)' : 'rgba(0,100,80,0.10)'}, transparent)`,
          animation: `lineSlide ${l.dur}s linear ${l.delay}s infinite`,
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};