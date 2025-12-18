'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { ContentstackAsset } from '@/lib/types';
import { ImagePresets } from '@/lib/image-utils';

interface PortfolioGalleryProps {
  content: {
    subtitle?: string;
    title?: string;
    description?: string;
    cta_text?: string;
    cta_link?: string;
  };
  images: ContentstackAsset[];
}

export default function PortfolioGallery({ content, images }: PortfolioGalleryProps) {
  // Predefined aspect ratios for masonry variety - all proper rectangles
  const aspectRatios = [
    'aspect-[3/4]',   // tall portrait
    'aspect-[4/5]',   // portrait
    'aspect-[1/1]',   // square
    'aspect-[4/5]',   // portrait
    'aspect-[3/4]',   // tall portrait
    'aspect-[5/6]',   // slight portrait
    'aspect-[4/5]',   // portrait
    'aspect-[1/1]',   // square
  ];

  // Distribute images into 4 columns for masonry layout
  const columns: ContentstackAsset[][] = [[], [], [], []];
  
  images.forEach((image, index) => {
    columns[index % 4].push(image);
  });

  return (
    <section className="section bg-cream-100">
      <div className="container-wide">
        {/* Section Header */}
        {(content.title || content.description) && (
          <div className="mb-12 md:mb-16">
            <SectionHeading
              subtitle={content.subtitle}
              title={content.title || ''}
              description={content.description}
            />
          </div>
        )}

        {/* Masonry Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-0.5">
              {column.map((image, imageIndex) => {
                const globalIndex = columnIndex + imageIndex * 4;
                // Get aspect ratio based on position for variety
                const aspectRatio = aspectRatios[(columnIndex + imageIndex) % aspectRatios.length];
                
                return (
                  <motion.div
                    key={image.uid || imageIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      duration: 0.6,
                      delay: globalIndex * 0.05,
                      ease: [0.77, 0, 0.175, 1],
                    }}
                    className={`relative overflow-hidden group cursor-pointer ${aspectRatio}`}
                  >
                    <Image
                      src={ImagePresets.galleryThumb(image.url)}
                      alt={image.title || `Portfolio image ${globalIndex + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/30 transition-all duration-500" />
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

        {/* View All CTA */}
        {content.cta_text && content.cta_link && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-12 md:mt-16"
          >
            <Button href={content.cta_link} variant="outline">
              {content.cta_text}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

