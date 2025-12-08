'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { Testimonial } from '@/lib/types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
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

  return (
    <section className="section bg-charcoal-900 text-cream-100 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-narrow relative">
        {/* Section Header */}
        <SectionHeading
          subtitle="Kind Words"
          title="What Our Clients Say"
          light
        />

        {/* Testimonial Slider */}
        <div className="mt-16 md:mt-20 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
              className="text-center"
            >
              {/* Quote mark */}
              <span className="block font-script text-8xl text-sepia-400 mb-8">
                "
              </span>

              {/* Testimonial Title */}
              <h3 className="font-serif text-xl md:text-2xl italic text-sepia-300 mb-8">
                {currentTestimonial.event_type && `${currentTestimonial.event_type}`}
              </h3>

              {/* Quote */}
              <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl leading-relaxed text-cream-200 mb-10">
                "{currentTestimonial.review_text}"
              </blockquote>

              {/* Client Name */}
              <footer>
                <div className="w-12 h-px bg-sepia-400 mx-auto mb-4" />
                <cite className="not-italic text-caption uppercase tracking-[0.2em] text-cream-400">
                  {currentTestimonial.client_name}
                </cite>
                {currentTestimonial.client_title && (
                  <p className="text-sm text-cream-500 mt-1">
                    {currentTestimonial.client_title}
                  </p>
                )}
              </footer>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center space-x-6 mt-12">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 border border-cream-700 text-cream-400 hover:border-sepia-400 hover:text-sepia-400 transition-colors flex items-center justify-center"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-sepia-400' : 'bg-cream-700'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 border border-cream-700 text-cream-400 hover:border-sepia-400 hover:text-sepia-400 transition-colors flex items-center justify-center"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Button
            href="/testimonials"
            variant="outline"
            className="border-cream-400 text-cream-400 hover:bg-cream-100 hover:text-charcoal-900 hover:border-cream-100"
          >
            Read More Testimonials
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

