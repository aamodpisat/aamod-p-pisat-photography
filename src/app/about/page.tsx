import { Metadata } from 'next';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import { getAboutPageContent, getSiteConfig, getTestimonials } from '@/lib/contentstack';
import { RichText, isPlainText } from '@/lib/richtext-renderer';

export const metadata: Metadata = {
  title: 'About | Aamod P. Pisat Photography',
  description: 'Learn about Aamod P. Pisat, the storyteller behind the lens. Fine art documentary wedding and elopement photographer.',
};

export default async function AboutPage() {
  // Fetch content from Contentstack
  const [aboutContent, siteConfig, testimonials] = await Promise.all([
    getAboutPageContent(),
    getSiteConfig(),
    getTestimonials(8),
  ]);

  // If no content, show minimal page
  if (!aboutContent) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-cream-100">
        <div className="text-center">
          <h1 className="font-serif text-heading-lg text-charcoal-900 mb-4">About</h1>
          <p className="text-charcoal-600">Content coming soon...</p>
        </div>
      </section>
    );
  }

  // Extract sections
  const banner = aboutContent.banner;
  const achievements = aboutContent.achievements || [];
  const intro = aboutContent.intro_section;
  const journey = aboutContent.journey_section;
  const featuredIn = aboutContent.featured_in;
  const ctaSection = aboutContent.cta_section;

  return (
    <>
      {/* Page Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={banner?.image?.url || 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1920&q=80'}
            alt={banner?.title || 'About hero'}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal-900/40" />
        </div>
        <div className="relative z-10 text-center">
          <h1 
            className="text-cream-100 mb-4 align-bottom"
            style={{ 
              fontFamily: 'Montserrat', 
              fontSize: '35px', 
              fontWeight: 200 
            }}
          >
            {banner?.title || 'About'}
          </h1>
          {banner?.tagline && (
            <p className="font-script text-3xl text-sepia-300">
              {banner.tagline}
            </p>
          )}
        </div>
      </section>

      {/* Achievements Section */}
      {achievements.length > 0 && (
        <section className="section bg-cream-100">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  {/* Image Logo */}
                  {achievement.image_logo?.url ? (
                    <div className="mb-8 h-24 md:h-28 w-auto flex items-center justify-center">
                      <Image
                        src={achievement.image_logo.url}
                        alt={achievement.image_logo.title || achievement.title}
                        width={180}
                        height={100}
                        className="object-contain max-h-24 md:max-h-28 w-auto grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  ) : (
                    <div className="mb-6">
                      <span className="font-serif text-7xl md:text-8xl text-sepia-300 group-hover:text-sepia-500 transition-colors">
                        {achievement.number || String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                  {/* Title */}
                  <h3 className="font-serif text-xl md:text-2xl lg:text-[1.75rem] text-charcoal-900 mb-3 leading-tight flex-grow">
                    {achievement.title}
                  </h3>
                  {/* Subtitle */}
                  {achievement.subtitle && (
                    <p className="text-sm md:text-base uppercase tracking-widest text-sepia-600 mt-auto">
                      {achievement.subtitle}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Intro Section - Hi, I am... */}
      {intro && (
        <section className="section bg-cream-200">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image Column */}
              <div className="relative order-2 lg:order-1">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={intro.image?.url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80'}
                    alt={intro.name || 'Photographer portrait'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Decorative frame */}
                  <div className="absolute -bottom-4 -right-4 w-full h-full border border-sepia-400 -z-10" />
                </div>
              </div>

              {/* Content Column */}
              <div className="order-1 lg:order-2">
                <p className="text-caption uppercase tracking-[0.2em] text-sepia-600 mb-2">
                  {intro.greeting || 'Hi, I am'}
                </p>
                <h2 className="font-serif text-heading-xl text-charcoal-900 mb-6">
                  {intro.name || 'Aamod P. Pisat'}
                </h2>
                
                {intro.tagline && (
                  <p className="text-xl text-charcoal-800 font-medium mb-6 italic">
                    {intro.tagline}
                  </p>
                )}
                
                <div className="prose prose-lg max-w-none space-y-6">
                  {intro.description && (
                    isPlainText(intro.description) ? (
                      (intro.description as string).split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-body-lg text-charcoal-700 font-light">
                          {paragraph}
                        </p>
                      ))
                    ) : (
                      <RichText 
                        content={intro.description} 
                        className="text-body-lg text-charcoal-700 font-light"
                      />
                    )
                  )}
                </div>

                {/* Signature */}
                {intro.signature && (
                  <p className="font-script text-4xl text-sepia-600 mt-8 mb-6">
                    {intro.signature}
                  </p>
                )}

                {intro.cta && (
                  <Button href={intro.cta.href || '/contact'} variant="outline">
                    {intro.cta.title || 'Contact Us'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Journey Section */}
      {journey && (
        <section className="section bg-cream-100">
          <div className="container-narrow">
            <h2 className="font-serif text-heading-lg text-charcoal-900 mb-10 text-center">
              {journey.title || 'The Journey!'}
            </h2>
            
            <div className="prose prose-lg max-w-none">
              {journey.content && (
                isPlainText(journey.content) ? (
                  (journey.content as string).split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-body-lg text-charcoal-700 font-light mb-6 leading-relaxed">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <RichText 
                    content={journey.content} 
                    className="text-body-lg text-charcoal-700 font-light"
                  />
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Featured In Section */}
      {featuredIn && featuredIn.brands && featuredIn.brands.length > 0 && (
        <section className="py-16 bg-cream-200">
          <div className="container-wide">
            <div className="text-center">
              <p className="text-caption uppercase tracking-[0.2em] text-sepia-600 mb-8">
                {featuredIn.label || 'Featured In'}
              </p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
                {featuredIn.brands.map((brand, index) => (
                  <span 
                    key={index} 
                    className="font-serif text-xl md:text-2xl text-charcoal-500 hover:text-charcoal-800 transition-colors"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <TestimonialsSection 
          testimonials={testimonials}
          content={{
            subtitle: 'Testimonials',
            title: 'What Our Clients Say',
            cta_text: 'Read More Testimonials',
            cta_link: '/testimonials',
          }}
        />
      )}

      {/* Contact CTA */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={ctaSection?.background_image?.url || 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1920&q=80'}
            alt="Contact background"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal-900/60" />
        </div>
        <div className="relative z-10 text-center container-narrow">
          <h2 className="font-serif text-heading-lg text-cream-100 mb-6">
            {ctaSection?.title || 'Get in touch with us!'}
          </h2>
          <Button
            href={ctaSection?.cta?.href || '/contact'}
            variant="outline"
            className="border-cream-100 text-cream-100 hover:bg-cream-100 hover:text-charcoal-900"
          >
            {ctaSection?.cta?.title || 'Contact Us'}
          </Button>
        </div>
      </section>
    </>
  );
}
