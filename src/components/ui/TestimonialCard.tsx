'use client';

import { motion } from 'framer-motion';
import { Testimonial } from '@/lib/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export default function TestimonialCard({
  testimonial,
  index,
}: TestimonialCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.77, 0, 0.175, 1],
      }}
      className="relative"
    >
      {/* Large quote mark */}
      <span className="absolute -top-4 -left-2 text-8xl font-script text-sepia-200 leading-none select-none">
        "
      </span>
      
      <div className="relative pt-8">
        {/* Testimonial title/heading */}
        <h3 className="font-serif text-xl md:text-2xl text-charcoal-900 mb-6 italic">
          {testimonial.event_type && `${testimonial.event_type} — `}
          {testimonial.client_title}
        </h3>
        
        {/* Quote text */}
        <blockquote className="text-body-lg text-charcoal-700 leading-relaxed mb-8">
          {testimonial.review_text}
        </blockquote>
        
        {/* Client name */}
        <footer className="flex items-center">
          <div className="w-12 h-px bg-sepia-400 mr-4" />
          <cite className="not-italic">
            <span className="text-caption uppercase tracking-widest text-charcoal-900">
              {testimonial.client_name}
            </span>
          </cite>
        </footer>
      </div>
    </motion.article>
  );
}

