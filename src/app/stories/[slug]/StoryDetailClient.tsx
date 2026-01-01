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

// Lightbox Modal Component
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
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-charcoal-900/95"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center text-cream-100/70 hover:text-cream-100 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-cream-100/50 hover:text-cream-100 transition-colors"
            aria-label="Previous"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-cream-100/50 hover:text-cream-100 transition-colors"
            aria-label="Next"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
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
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream-100/60 text-xs tracking-[0.3em] uppercase">
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

  // Format date
  const publishDate = story.publish_date 
    ? new Date(story.publish_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;

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
      {/* Hero Image - Full Width with padding for header */}
      <section className="relative pt-20 md:pt-24">
        <div className="relative w-full">
          <Image
            src={story.featured_image?.url || ''}
            alt={story.title}
            width={1920}
            height={1280}
            priority
            className="w-full h-auto object-cover"
            sizes="100vw"
            unoptimized
          />
        </div>
      </section>

      {/* Main Content Area - Blog Post Style with Light Background */}
      <article className="bg-cream-100">
        {/* Article Header */}
        <header className="relative z-10 pt-12 md:pt-16">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-lg shadow-xl px-8 py-12 md:px-16 md:py-16 text-center"
            >
              {/* Title */}
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal-900 leading-tight mb-6">
                {story.title}
              </h1>

              {/* Date */}
              {publishDate && (
                <p className="text-sm text-charcoal-400 tracking-wide">
                  {publishDate}
                </p>
              )}

              {/* Decorative Divider */}
              <div className="mt-8 flex items-center justify-center gap-4">
                <span className="w-12 h-px bg-sepia-300" />
                <span className="w-2 h-2 rounded-full bg-sepia-400" />
                <span className="w-12 h-px bg-sepia-300" />
              </div>
            </motion.div>
          </div>
        </header>

        {/* Article Body */}
        <div className="max-w-4xl mx-auto px-6 -mt-1">
          <div className="bg-white shadow-xl rounded-b-lg px-8 md:px-16 pb-16">
            {/* Main Body Content */}
            {story.body && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="py-12 md:py-16"
              >
                <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-charcoal-900 prose-p:text-charcoal-700 prose-p:leading-relaxed prose-p:text-lg prose-a:text-sepia-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-charcoal-800 prose-blockquote:border-sepia-400 prose-blockquote:text-charcoal-600 prose-blockquote:italic">
                  <RichText 
                    content={story.body} 
                    className="text-lg leading-[1.9] text-charcoal-700"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Vertical Masonry Gallery - Outside the white box */}
        {galleryImages.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="max-w-[1800px] mx-auto px-1 md:px-2">
              {/* Minimal Masonry Grid with tight gaps */}
              <div className="columns-2 md:columns-3 lg:columns-4 gap-[3px] md:gap-1">
                {galleryImages.map((image, index) => (
                  <motion.div
                    key={image.uid || index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{
                      duration: 0.3,
                      delay: Math.min(index * 0.02, 0.2),
                    }}
                    className="mb-[3px] md:mb-1 break-inside-avoid"
                  >
                    <button
                      onClick={() => openLightbox(index)}
                      className="relative block w-full overflow-hidden cursor-pointer"
                    >
                      <Image
                        src={ImagePresets.galleryMedium(image.url)}
                        alt={image.title || `Gallery image ${index + 1}`}
                        width={800}
                        height={1200}
                        className="w-full h-auto object-cover transition-opacity duration-300 hover:opacity-[0.92]"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back to Stories */}
        <div className="py-12 md:py-16">
          <div className="text-center">
            <Link 
              href="/stories"
              className="inline-flex items-center gap-3 text-caption uppercase tracking-[0.2em] text-charcoal-500 hover:text-sepia-600 transition-colors duration-300 group"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Stories
            </Link>
          </div>
        </div>
      </article>

      {/* Related Stories Section */}
      {relatedStories.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <p className="text-caption uppercase tracking-[0.3em] text-sepia-600 mb-4">
                Continue Reading
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-charcoal-900">
                More Stories
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {relatedStories.map((relatedStory, index) => {
                const relatedUrl = `/stories${relatedStory.url.startsWith('/') ? relatedStory.url : `/${relatedStory.url}`}`;
                const relatedImage = relatedStory.thumbnail_image?.url || relatedStory.featured_image?.url;

                return (
                  <motion.article
                    key={relatedStory.uid}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={relatedUrl} className="block">
                      <div className="relative aspect-[4/5] overflow-hidden mb-5 bg-cream-100">
                        {relatedImage && (
                          <Image
                            src={ImagePresets.portfolioCard(relatedImage)}
                            alt={relatedStory.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        )}
                      </div>
                      <h3 className="font-serif text-xl text-charcoal-900 group-hover:text-sepia-700 transition-colors text-center leading-relaxed">
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
