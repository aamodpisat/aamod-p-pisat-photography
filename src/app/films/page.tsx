import { Metadata } from 'next';
import Button from '@/components/ui/Button';
import FilmsHero from '@/components/sections/FilmsHero';
import FilmCard from '@/components/ui/FilmCard';
import { getFilmsPageContent } from '@/lib/contentstack';
import { RichText, isPlainText } from '@/lib/richtext-renderer';

export const metadata: Metadata = {
  title: 'Films | Aamod P. Pisat Photography',
  description: 'Cinematic wedding films that capture the emotion, movement, and magic of your day.',
};

// Enable ISR - revalidate every hour
export const revalidate = 3600;

export default async function FilmsPage() {
  // Fetch content from Contentstack
  const content = await getFilmsPageContent();
  
  
  // Extract sections
  const heroSection = content?.hero_section;
  const filmsSection = content?.films_section;
  const films = content?.films || [];
  const approachSection = content?.approach_section;
  const ctaSection = content?.cta_section;

  // Sort films by order if available
  const sortedFilms = [...films].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <>
      {/* Video Background Hero */}
      <FilmsHero 
        title={heroSection?.title}
        tagline={heroSection?.tagline}
        description={heroSection?.description}
        videoUrl={heroSection?.background_video_url}
        fallbackImage={heroSection?.fallback_image?.url}
      />

      {/* Films Grid */}
      <section className="py-16 md:py-24 bg-cream-100">
        <div className="container-wide">
          {/* Section Intro */}
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            {filmsSection?.subtitle && (
              <p className="text-caption uppercase tracking-[0.2em] text-sepia-600 mb-4">
                {filmsSection.subtitle}
              </p>
            )}
            {filmsSection?.title && (
              <h2 className="font-serif text-heading-lg text-charcoal-900 mb-6">
                {filmsSection.title}
              </h2>
            )}
            {filmsSection?.description && (
              <p className="text-body-lg text-charcoal-600 font-light">
                {filmsSection.description}
              </p>
            )}
          </div>

          {/* Films Grid */}
          {sortedFilms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {sortedFilms.map((film, index) => (
                <FilmCard 
                  key={index} 
                  film={{
                    uid: `film-${index}`,
                    title: film.title,
                    location: film.location || '',
                    youtubeId: film.youtube_id,
                    description: film.description || '',
                  }} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-charcoal-600">Films coming soon...</p>
            </div>
          )}
        </div>
      </section>

      {/* Our Approach */}
      {approachSection && (
        <section className="py-20 md:py-28 bg-charcoal-900 text-cream-100">
          <div className="container-narrow text-center">
            {approachSection.subtitle && (
              <p className="text-caption uppercase tracking-[0.2em] text-sepia-400 mb-4">
                {approachSection.subtitle}
              </p>
            )}
            {approachSection.title && (
              <h2 className="font-serif text-heading-lg mb-8">
                {approachSection.title}
              </h2>
            )}
            {approachSection.content && (
              isPlainText(approachSection.content) ? (
                <p className="text-body-lg text-cream-300 font-light">
                  {approachSection.content as string}
                </p>
              ) : (
                <RichText 
                  content={approachSection.content} 
                  className="text-body-lg text-cream-300 font-light"
                />
              )
            )}
          </div>
        </section>
      )}

      {/* Contact CTA */}
      {ctaSection && (
        <section className="py-20 md:py-28 bg-sepia-100">
          <div className="container-narrow text-center">
            {ctaSection.title && (
              <h2 className="font-serif text-heading-lg text-charcoal-900 mb-6">
                {ctaSection.title}
              </h2>
            )}
            {ctaSection.description && (
              <p className="text-body-lg text-charcoal-600 font-light mb-8 max-w-xl mx-auto">
                {ctaSection.description}
              </p>
            )}
            {ctaSection.cta && (
              <Button href={ctaSection.cta.href || '/contact'} variant="primary">
                {ctaSection.cta.title || 'Inquire About Films'}
              </Button>
            )}
          </div>
        </section>
      )}
    </>
  );
}
