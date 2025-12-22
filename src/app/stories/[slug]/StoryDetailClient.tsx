'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { StoryPost, ContentstackAsset } from '@/lib/types';
import { ImagePresets } from '@/lib/image-utils';
import { RichText } from '@/lib/richtext-renderer';

interface StoryDetailClientProps {
  story: StoryPost;
  relatedStories: StoryPost[];
}

// Lightbox Modal Component - Pixieset style
function LightboxModal({
  image,
  isOpen,
  onClose,
  onNext,
  onPrev,
  currentIndex,
  totalImages,
}: {
  image: ContentstackAsset | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalImages: number;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!mounted || !image) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center text-charcoal-500 hover:text-charcoal-900 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-charcoal-400 hover:text-charcoal-900 transition-colors"
            aria-label="Previous"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-charcoal-400 hover:text-charcoal-900 transition-colors"
            aria-label="Next"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-[90vw] max-h-[90vh] z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={ImagePresets.galleryLarge(image.url)}
              alt={image.title || 'Gallery image'}
              width={1600}
              height={1100}
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
              priority
            />
          </motion.div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-charcoal-400 text-xs tracking-[0.3em] uppercase">
            {currentIndex + 1} of {totalImages}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default function StoryDetailClient({ story, relatedStories }: StoryDetailClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = story.gallery_images || [];
  const categoryNames = story.taxonomies
    ?.map(tax => tax.name)
    .filter(Boolean)
    .join(' • ') || 'Wedding';

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <>
      {/* Full-screen Hero Banner - Pixieset style */}
      <section className="relative h-[100svh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={ImagePresets.hero(story.featured_image?.url || '')}
            alt={story.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Minimal vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        </div>

        {/* Centered Title - Pixieset style */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-normal tracking-wide leading-tight">
              {story.title}
            </h1>
            {categoryNames && categoryNames !== 'Wedding' && (
              <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/60 mt-6">
                {categoryNames}
              </p>
            )}
          </motion.div>
        </div>

        {/* Scroll Down Arrow - Pixieset style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.svg
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-6 text-white/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </motion.div>
      </section>

      {/* Story Content - Body (if exists) */}
      {story.body && (
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="prose prose-lg max-w-none text-center"
            >
              <RichText 
                content={story.body} 
                className="text-lg md:text-xl text-charcoal-600 font-light leading-relaxed"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Masonry Gallery - Pixieset style */}
      {galleryImages.length > 0 && (
        <section className="bg-white py-4 md:py-8">
          <div className="max-w-[1600px] mx-auto px-1 md:px-2">
            {/* CSS Columns Masonry - Pixieset tight grid */}
            <div className="columns-2 md:columns-3 gap-1 md:gap-[6px]">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.uid || index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.3,
                    delay: Math.min(index * 0.02, 0.2),
                  }}
                  className="mb-1 md:mb-[6px] break-inside-avoid"
                >
                  <button
                    onClick={() => openLightbox(index)}
                    className="relative block w-full overflow-hidden cursor-pointer"
                  >
                    {/* Using natural image dimensions */}
                    <Image
                      src={ImagePresets.galleryMedium(image.url)}
                      alt={image.title || `Gallery image ${index + 1}`}
                      width={800}
                      height={1000}
                      className="w-full h-auto object-cover transition-opacity duration-300 hover:opacity-90"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Stories Link - Minimal */}
      <section className="py-12 md:py-16 bg-white">
        <div className="text-center">
          <Link 
            href="/stories"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-charcoal-400 hover:text-charcoal-700 transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Stories
          </Link>
        </div>
      </section>

      {/* Related Stories - Pixieset style */}
      {relatedStories.length > 0 && (
        <section className="py-16 md:py-24 bg-white border-t border-neutral-100">
          <div className="max-w-5xl mx-auto px-6">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] uppercase tracking-[0.4em] text-charcoal-300 mb-10 text-center"
            >
              More Stories
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {relatedStories.map((relatedStory, index) => {
                const relatedUrl = `/stories${relatedStory.url.startsWith('/') ? relatedStory.url : `/${relatedStory.url}`}`;
                const relatedImage = relatedStory.thumbnail_image?.url || relatedStory.featured_image?.url;

                return (
                  <motion.article
                    key={relatedStory.uid}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={relatedUrl} className="block">
                      <div className="relative aspect-[4/5] overflow-hidden mb-4">
                        {relatedImage && (
                          <Image
                            src={ImagePresets.galleryThumb(relatedImage)}
                            alt={relatedStory.title}
                            fill
                            className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        )}
                      </div>
                      <h3 className="font-serif text-base md:text-lg text-charcoal-700 group-hover:text-charcoal-500 transition-colors text-center">
                        {relatedStory.title}
                      </h3>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      <LightboxModal
        image={galleryImages[currentImageIndex]}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
        currentIndex={currentImageIndex}
        totalImages={galleryImages.length}
      />
    </>
  );
}

