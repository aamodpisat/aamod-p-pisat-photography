'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
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
      {description && (
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
      )}
    </motion.div>
  );
}

