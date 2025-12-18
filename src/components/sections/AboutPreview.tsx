'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { ContentstackAsset } from '@/lib/types';
import { RichText, safeTextContent } from '@/lib/richtext-renderer';

interface AboutPreviewProps {
  content: {
    featured_label: string;
    featured_brands: string[] | undefined;
    title: string;
    description: unknown; // Can be string or JSON RTE
    image: ContentstackAsset | undefined;
    cta_text: string;
    cta_link: string;
  };
}

export default function AboutPreview({ content }: AboutPreviewProps) {
  // Get image URL safely - handle both direct URL and nested asset structure
  const getImageUrl = (): string => {
    if (!content.image) {
      return 'https://images.unsplash.com/photo-1554080353-a576cf803bda?w=800&q=80'; // Fallback
    }
    
    // Handle direct URL
    if (typeof content.image === 'string') {
      return content.image;
    }
    
    // Handle Contentstack asset object
    if (content.image.url) {
      return content.image.url;
    }
    
    // Handle nested asset structure (sometimes file fields return { url: ... } or { file: { url: ... } })
    const asset = content.image as unknown as Record<string, unknown>;
    if (asset.file && typeof asset.file === 'object') {
      const file = asset.file as Record<string, unknown>;
      if (file.url) return file.url as string;
    }
    
    return 'https://images.unsplash.com/photo-1554080353-a576cf803bda?w=800&q=80'; // Fallback
  };

  const getImageAlt = (): string => {
    if (!content.image) return 'Photographer';
    if (typeof content.image === 'string') return 'Photographer';
    return content.image.title || 'Photographer';
  };

  // Get featured brands safely - handle both array and undefined
  const featuredBrands = Array.isArray(content.featured_brands) 
    ? content.featured_brands 
    : [];

  return (
    <section className="section bg-cream-200">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={getImageUrl()}
                alt={getImageAlt()}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-sepia-400 -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
            className="lg:pl-8"
          >
            {/* Featured In badges */}
            {(content.featured_label || featuredBrands.length > 0) && (
              <div className="mb-8">
                {content.featured_label && (
                  <p className="text-caption uppercase tracking-[0.2em] text-sepia-600 mb-4">
                    {safeTextContent(content.featured_label)}
                  </p>
                )}
                {featuredBrands.length > 0 && (
                  <div className="flex flex-wrap gap-6 opacity-60">
                    {featuredBrands.map((brand, index) => (
                      <span key={index} className="font-serif text-lg text-charcoal-600">
                        {safeTextContent(brand)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            <h2 className="font-serif text-heading-lg md:text-heading-xl text-charcoal-900 mb-6">
              {safeTextContent(content.title)}
            </h2>

            <RichText 
              content={content.description}
              className="space-y-6 text-body-lg text-charcoal-700 font-light"
            />

            {content.cta_text && content.cta_link && (
              <div className="mt-10">
                <Button href={content.cta_link} variant="outline">
                  {content.cta_text}
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
