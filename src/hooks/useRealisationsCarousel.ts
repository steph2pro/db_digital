import { useState, useCallback, useRef, useEffect } from 'react';
import { AUTO_INTERVAL } from '../data/servicesConstants';

export const useRealisationsCarousel = (itemsLength: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % itemsLength);
  }, [itemsLength]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

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
  }, [currentIndex]);

  return {
    currentIndex,
    progress,
    goTo,
    resetTimer,
  };
};