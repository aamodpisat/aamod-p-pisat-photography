'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Film {
  uid: string;
  title: string;
  location: string;
  youtubeId: string;
  description: string;
}

interface FilmCardProps {
  film: Film;
}

// Video Modal Component
function VideoModal({ 
  film, 
  isOpen, 
  onClose 
}: { 
  film: Film; 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/95" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-10 w-12 h-12 flex items-center justify-center text-white hover:text-sepia-400 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Video Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.77, 0, 0.175, 1] }}
            className="relative w-full max-w-6xl aspect-video z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${film.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={film.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-lg"
            />
          </motion.div>

          {/* Film Title */}
          <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 z-10">
            <p className="text-xs uppercase tracking-[0.2em] text-sepia-400 mb-1">
              {film.location}
            </p>
            <h3 className="font-serif text-xl md:text-2xl text-white">
              {film.title}
            </h3>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

export default function FilmCard({ film }: FilmCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // YouTube thumbnail URL
  const thumbnailUrl = `https://img.youtube.com/vi/${film.youtubeId}/maxresdefault.jpg`;

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        className="group"
      >
        {/* Clickable Thumbnail */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="relative aspect-video w-full overflow-hidden bg-charcoal-900 mb-6 cursor-pointer block"
        >
          <Image
            src={thumbnailUrl}
            alt={film.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-charcoal-900/30 group-hover:bg-charcoal-900/50 transition-all duration-300 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-cream-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 bg-charcoal-900/30 backdrop-blur-sm">
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-cream-100 ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </button>

        {/* Film Info */}
        <div>
          {/* Location */}
          <p className="text-caption uppercase tracking-[0.2em] text-sepia-600 mb-2">
            {film.location}
          </p>

          {/* Title */}
          <h3 className="font-serif text-2xl md:text-3xl text-charcoal-900 mb-4 group-hover:text-sepia-700 transition-colors">
            {film.title}
          </h3>

          {/* Description */}
          <p className="text-body text-charcoal-600 font-light leading-relaxed">
            {film.description}
          </p>
        </div>
      </motion.article>

      {/* Modal Portal */}
      <VideoModal 
        film={film} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
