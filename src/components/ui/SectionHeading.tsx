'use client';

import { motion } from 'framer-motion';
import { RichText, isJsonRTE, isPlainText } from '@/lib/richtext-renderer';

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: unknown; // Can be string or JSON RTE
  alignment?: 'left' | 'center' | 'right';
  light?: boolean;
}

export default function SectionHeading({
  subtitle,
  title,
  description,
  alignment = 'center',
  light = false,
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  // Render description based on type
  const renderDescription = () => {
    if (!description) return null;
    
    // If it's plain text, render it directly in a p tag
    if (isPlainText(description)) {
      return (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`mt-6 text-body-lg font-light ${
            light ? 'text-cream-300' : 'text-charcoal-600'
          }`}
        >
          {description}
        </motion.p>
      );
    }
    
    // If it's JSON RTE or other object, use RichText renderer
    if (isJsonRTE(description) || typeof description === 'object') {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <RichText 
            content={description} 
            className={`mt-6 text-body-lg font-light ${
              light ? 'text-cream-300' : 'text-charcoal-600'
            }`}
          />
        </motion.div>
      );
    }
    
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
      className={`max-w-2xl ${alignmentClasses[alignment]}`}
    >
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-caption uppercase tracking-[0.2em] mb-4 ${
            light ? 'text-cream-400' : 'text-sepia-600'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
      <h2
        className={`font-serif text-heading-lg md:text-heading-xl leading-tight ${
          light ? 'text-cream-100' : 'text-charcoal-900'
        }`}
      >
        {title}
      </h2>
      {renderDescription()}
    </motion.div>
  );
}
