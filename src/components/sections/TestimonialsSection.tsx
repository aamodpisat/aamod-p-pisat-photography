'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Testimonial } from '@/lib/types';
import { safeTextContent } from '@/lib/richtext-renderer';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  content: {
    subtitle: string;
    title: string;
    cta_text: string;
    cta_link: string;
  };
}

export default function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  if (!currentTestimonial) return null;

  // Get the review text - handle both plain text and JSON RTE
  const reviewText = safeTextContent(currentTestimonial.review_text);

  // Placeholder image if no client photo
  const testimonialImage = currentTestimonial.client_photo?.url || 
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80';

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-cream-100">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="order-2 lg:order-1">
            {/* Section Title */}
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900 mb-12">
              Testimonials
            </h2>

            {/* Testimonial Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
              >
                {/* Quote */}
                <blockquote className="font-serif text-xl md:text-2xl lg:text-[1.7rem] leading-relaxed text-charcoal-800 mb-10">
                  "{reviewText}"
                </blockquote>

                {/* Client Name */}
                <footer>
                  <cite className="not-italic text-sm uppercase tracking-[0.2em] text-charcoal-600">
                    — {currentTestimonial.client_name}
                  </cite>
                </footer>
              </motion.div>
            </AnimatePresence>

            {/* Navigation - Vertical style */}
            <div className="flex flex-col items-start mt-16 space-y-3">
              <button
                onClick={prevTestimonial}
                className="text-charcoal-400 hover:text-charcoal-800 transition-colors"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
              </button>

              {/* Slide Counter */}
              <div className="text-sm tracking-widest text-charcoal-500 font-light py-1">
                {String(currentIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
              </div>

              <button
                onClick={nextTestimonial}
                className="text-charcoal-400 hover:text-charcoal-800 transition-colors"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-[4/5] w-full"
              >
                <Image
                  src={testimonialImage}
                  alt={`${currentTestimonial.client_name} testimonial`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
