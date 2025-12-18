'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { ContentstackAsset } from '@/lib/types';
import { RichText, isPlainText } from '@/lib/richtext-renderer';

interface ContactCTAProps {
  content: {
    title: string;
    description: unknown; // Can be string or JSON RTE
    button_text: string;
    button_link: string;
    background_image?: ContentstackAsset;
    email?: string;
  };
}

// Default background image fallback
const DEFAULT_BG_IMAGE = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80';

export default function ContactCTA({ content }: ContactCTAProps) {
  const bgImageUrl = content.background_image?.url || DEFAULT_BG_IMAGE;
  const bgImageAlt = content.background_image?.title || 'Contact background';

  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={bgImageUrl}
          alt={bgImageAlt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        >
          <h2 className="font-serif text-heading-lg md:text-heading-xl text-cream-100 mb-6">
            {content.title}
          </h2>
          {isPlainText(content.description) ? (
            <p className="text-body-lg text-cream-300 mb-10 max-w-xl mx-auto">
              {content.description}
            </p>
          ) : (
            <RichText 
              content={content.description} 
              className="text-body-lg text-cream-300 mb-10 max-w-xl mx-auto"
            />
          )}
          <Button
            href={content.button_link}
            variant="outline"
            className="border-cream-100 text-cream-100 hover:bg-cream-100 hover:text-charcoal-900"
          >
            {content.button_text}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
