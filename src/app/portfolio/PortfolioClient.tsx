'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { ContentstackAsset, PortfolioPageContent } from '@/lib/types';
import { ImagePresets } from '@/lib/image-utils';
import { PageHero, InquiryBand } from '@/components/editorial';

interface PortfolioClientProps {
  content: PortfolioPageContent;
  galleryImages: ContentstackAsset[];
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
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio photograph viewer"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            aria-label="Previous"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            aria-label="Next"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-[90vw] max-h-[85vh] z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={ImagePresets.galleryLarge(image.url)}
              alt={image.title}
              width={1200}
              height={800}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
              priority
            />
          </motion.div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-widest">
            {currentIndex + 1} / {totalImages}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default function PortfolioClient({ content, galleryImages }: PortfolioClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroSection = content.hero_section;
  const gallerySection = content.gallery_section;
  const ctaSection = content.cta_section;

  // Predefined aspect ratios for masonry variety
  const aspectRatios = [
    'aspect-[4/5]',
    'aspect-[3/4]',
    'aspect-[4/5]',
    'aspect-[1/1]',
    'aspect-[3/4]',
    'aspect-[4/5]',
  ];

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
      <PageHero eyebrow="The portfolio" title={heroSection?.title || 'Our Portfolio'} description={heroSection?.tagline} image={heroSection?.background_image?.url} tag="Real moments. Pure emotions." ctaText="Explore the gallery" ctaHref="#gallery" />

      {/* Compact Masonry Gallery */}
      <section id="gallery" className="py-10 md:py-16 bg-white">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1"
          >
            {[0, 1, 2, 3].map((columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-1">
                {galleryImages
                  .filter((_, index) => index % 4 === columnIndex)
                  .map((image, index) => {
                    const globalIndex = galleryImages.findIndex(img => img.uid === image.uid);
                    const aspectRatio = aspectRatios[(columnIndex + index) % aspectRatios.length];
                    
                    return (
                      <motion.div
                        key={image.uid}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{
                          duration: 0.5,
                          delay: (columnIndex + index * 4) * 0.03,
                          ease: [0.77, 0, 0.175, 1],
                        }}
                      >
                        <button
                          onClick={() => openLightbox(globalIndex)}
                          className={`relative block overflow-hidden group ${aspectRatio} w-full`}
                        >
                          <Image
                            src={ImagePresets.galleryThumb(image.url)}
                            alt={image.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                        </button>
                      </motion.div>
                    );
                  })}
              </div>
            ))}
          </motion.div>

          {/* More Work Button */}
          {gallerySection?.button_text && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mt-16 md:mt-20"
            >
              <Button 
                href={gallerySection.button_link?.href || '/contact'} 
                variant="outline"
              >
                {gallerySection.button_text}
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      <InquiryBand title={ctaSection?.title} button={ctaSection?.cta?.title} />

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


