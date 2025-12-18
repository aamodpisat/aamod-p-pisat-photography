import { Metadata } from 'next';
import Image from 'next/image';
import TestimonialCard from '@/components/ui/TestimonialCard';
import Button from '@/components/ui/Button';
import { getTestimonials } from '@/lib/contentstack';

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Kind words from couples whose love stories we\'ve had the honor of capturing.',
};

// Enable ISR - revalidate every hour
export const revalidate = 3600;

export default async function TestimonialsPage() {
  // Fetch testimonials from Contentstack
  const testimonials = await getTestimonials();

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
            alt="Testimonials hero"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal-900/50" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="font-serif text-display text-cream-100 mb-4">
            Kind Words
          </h1>
          <p className="font-script text-3xl text-sepia-300">
            From the hearts of our couples
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section bg-cream-100">
        <div className="container-wide">
          {/* Intro Text */}
          <div className="max-w-2xl mx-auto text-center mb-16 md:mb-24">
            <p className="text-body-lg text-charcoal-600 font-light">
              There's no greater honor than being entrusted with someone's love story. 
              Here's what some of our couples have shared about their experience.
            </p>
          </div>

          {/* Testimonials */}
          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.uid}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-charcoal-600">Testimonials coming soon...</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Quote */}
      {testimonials.length > 0 && (
        <section className="section bg-charcoal-900 text-cream-100">
          <div className="container-narrow text-center">
            <span className="block font-script text-8xl text-sepia-400 mb-8">
              "
            </span>
            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed italic text-cream-200 mb-10">
              {typeof testimonials[0].review_text === 'string' 
                ? testimonials[0].review_text.substring(0, 200) + '...'
                : 'Working with us was an incredible experience. The photos captured every meaningful moment beautifully.'
              }
            </blockquote>
            <footer>
              <div className="w-12 h-px bg-sepia-400 mx-auto mb-4" />
              <cite className="not-italic text-caption uppercase tracking-[0.2em] text-cream-400">
                {testimonials[0].client_name} — {testimonials[0].client_title}
              </cite>
            </footer>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="section bg-cream-200">
        <div className="container-narrow text-center">
          <p className="text-caption uppercase tracking-[0.2em] text-sepia-600 mb-4">
            Your Story Awaits
          </p>
          <h2 className="font-serif text-heading-lg text-charcoal-900 mb-6">
            Ready to Create Your Own Story?
          </h2>
          <p className="text-body-lg text-charcoal-600 font-light mb-10 max-w-xl mx-auto">
            I'd love to hear about your vision and explore how we can capture your 
            most meaningful moments together.
          </p>
          <Button href="/contact" variant="outline">
            Get In Touch
          </Button>
        </div>
      </section>
    </>
  );
}
