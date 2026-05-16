import { useState, useCallback, useRef, useEffect } from 'react';
import { animate, useMotionValue } from 'motion/react';
import {   serviceCategories } from '../data/servicesData';
import { AUTO_INTERVAL, THUMB_STEP } from '../data/servicesConstants';

export const useServicesCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [expandingIndex, setExpandingIndex] = useState<number | null>(null);
  const [expandRect, setExpandRect] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [progress, setProgress] = useState(0);
  
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stripX = useMotionValue(0);

  const scrollStrip = useCallback((index: number) => {
    const target = -(index * THUMB_STEP);
    animate(stripX, target, { type: 'spring', stiffness: 95, damping: 20 });
  }, [stripX]);

  const goTo = useCallback((nextIndex: number) => {
    if (transitioning || nextIndex === current) return;

    const el = thumbRefs.current[nextIndex];
    if (el && heroRef.current) {
      const thumbRect = el.getBoundingClientRect();
      const heroRect = heroRef.current.getBoundingClientRect();
      setExpandRect({
        x: thumbRect.left - heroRect.left,
        y: thumbRect.top - heroRect.top,
        w: thumbRect.width,
        h: thumbRect.height,
      });
    }

    setExpandingIndex(nextIndex);
    setTransitioning(true);

    setTimeout(() => {
      setCurrent(nextIndex);
      setExpandingIndex(null);
      setExpandRect(null);
      setTransitioning(false);
    }, 680);

    scrollStrip(nextIndex);
  }, [transitioning, current, scrollStrip]);

  const nextSlide = useCallback(() => {
    goTo((current + 1) % serviceCategories.length);
  }, [current, goTo]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, AUTO_INTERVAL);
  }, [nextSlide]);

  useEffect(() => {
    timerRef.current = setInterval(nextSlide, AUTO_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [nextSlide]);

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const id = setInterval(() => {
      setProgress(Math.min(((Date.now() - start) / AUTO_INTERVAL) * 100, 100));
    }, 30);
    return () => clearInterval(id);
  }, [current]);

  return {
    current,
    transitioning,
    expandingIndex,
    expandRect,
    progress,
    stripX,
    thumbRefs,
    heroRef,
    goTo,
    resetTimer,
    setProgress,
  };
};