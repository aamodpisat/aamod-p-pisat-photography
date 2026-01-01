'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { HeroBanner } from '@/lib/types';

interface HeroProps {
  slides: HeroBanner[];
  autoPlayInterval?: number; // in milliseconds
}

export default function Hero({
  slides,
  autoPlayInterval = 6000,
}: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  const currentSlide = slides[currentIndex];

  // Navigation handlers
  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, goToNext, slides.length]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Animation variants for slide transitions
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: [0.77, 0, 0.175, 1],
      },
    }),
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <section
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Hero carousel"
    >
      {/* Background Images with Carousel */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'tween', duration: 0.8, ease: [0.77, 0, 0.175, 1] },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          <Image
            src={currentSlide.image.url}
            alt={currentSlide.title}
            fill
            priority={currentIndex === 0}
            className="object-cover"
            sizes="100vw"
            unoptimized
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-charcoal-900/40" />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-charcoal-900/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 container-wide text-center text-cream-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            {/* Tagline */}
            {currentSlide.tagline && (
              <motion.p
                custom={0.6}
                variants={contentVariants}
                className="font-script text-4xl md:text-5xl text-cream-100 mb-12"
              >
                {currentSlide.tagline}
              </motion.p>
            )}

            {/* CTA Button */}
            {currentSlide.cta_text && currentSlide.cta_link && (
              <motion.div custom={0.8} variants={contentVariants}>
                <Button
                  href={currentSlide.cta_link}
                  variant="outline"
                  className="border-cream-100 text-cream-100 hover:bg-cream-100 hover:text-charcoal-900"
                >
                  {currentSlide.cta_text}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border border-cream-100/30 text-cream-100/70 hover:border-cream-100 hover:text-cream-100 hover:bg-cream-100/10 transition-all duration-300 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border border-cream-100/30 text-cream-100/70 hover:border-cream-100 hover:text-cream-100 hover:bg-cream-100/10 transition-all duration-300 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Slide Indicators / Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="group relative p-2"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            >
              <span
                className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-sepia-400 scale-125'
                    : 'bg-cream-100/50 hover:bg-cream-100/80'
                }`}
              />
              {/* Progress indicator for current slide */}
              {index === currentIndex && isAutoPlaying && (
                <motion.span
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{
                    duration: autoPlayInterval / 1000,
                    ease: 'linear',
                    repeat: Infinity,
                  }}
                >
                  <span className="w-2 h-2 rounded-full border border-sepia-400/50" />
                </motion.span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Slide Counter */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 right-8 z-20 text-cream-100/60 text-sm font-sans tracking-widest">
          <span className="text-cream-100">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="mx-2">/</span>
          <span>{String(slides.length).padStart(2, '0')}</span>
        </div>
      )}

      {/* Progress Bar */}
      {slides.length > 1 && isAutoPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-cream-100/10 z-20">
          <motion.div
            key={currentIndex}
            className="h-full bg-sepia-500"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: autoPlayInterval / 1000,
              ease: 'linear',
            }}
          />
        </div>
      )}

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border border-cream-100/50 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1 h-2 bg-cream-100/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
