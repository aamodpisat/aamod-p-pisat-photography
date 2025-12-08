import { Metadata } from 'next';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Films',
  description: 'Cinematic wedding films that capture the emotion, movement, and magic of your day.',
};

// Sample film data - would come from Contentstack
const sampleFilms = [
  {
    uid: 'film-1',
    title: 'Sarah & James',
    location: 'Tuscany, Italy',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    vimeoUrl: 'https://vimeo.com/123456789',
    description: 'An intimate celebration beneath Tuscan cypress trees.',
  },
  {
    uid: 'film-2',
    title: 'Maya & Oliver',
    location: 'Big Sur, California',
    thumbnail: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
    vimeoUrl: 'https://vimeo.com/123456790',
    description: 'Cliffside vows overlooking the endless Pacific.',
  },
  {
    uid: 'film-3',
    title: 'Elena & Marcus',
    location: 'Marrakech, Morocco',
    thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    vimeoUrl: 'https://vimeo.com/123456791',
    description: 'A vibrant celebration amidst the magic of Morocco.',
  },
];

export default function FilmsPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=1920&q=80"
            alt="Films hero"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal-900/60" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="font-serif text-display text-cream-100 mb-4">
            Films
          </h1>
          <p className="font-script text-3xl text-sepia-300 mb-6">
            Stories in motion
          </p>
          <p className="text-body-lg text-cream-300 max-w-xl mx-auto px-6">
            Cinematic wedding films that capture the emotion, movement, 
            and magic of your most meaningful moments.
          </p>
        </div>
      </section>

      {/* Films Grid */}
      <section className="section bg-cream-100">
        <div className="container-wide">
          {/* Intro */}
          <div className="max-w-2xl mx-auto text-center mb-16 md:mb-24">
            <p className="text-caption uppercase tracking-[0.2em] text-sepia-600 mb-4">
              Wedding Films
            </p>
            <h2 className="font-serif text-heading-lg text-charcoal-900 mb-6">
              Watch Our Latest Films
            </h2>
            <p className="text-body-lg text-charcoal-600 font-light">
              Each film is crafted to feel like a love letter—authentic, emotional, 
              and uniquely yours. These are more than videos; they're timeless 
              heirlooms set to music.
            </p>
          </div>

          {/* Films */}
          <div className="space-y-20">
            {sampleFilms.map((film, index) => (
              <article
                key={film.uid}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Video Thumbnail */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <a
                    href={film.vimeoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block relative aspect-video overflow-hidden"
                  >
                    <Image
                      src={film.thumbnail}
                      alt={`${film.title} film`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-charcoal-900/30 group-hover:bg-charcoal-900/50 transition-colors duration-300" />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 border-2 border-cream-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg
                          className="w-8 h-8 text-cream-100 ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Film Info */}
                <div className={`${index % 2 === 1 ? 'lg:order-1 lg:text-right' : ''}`}>
                  <p className="text-caption uppercase tracking-[0.2em] text-sepia-600 mb-4">
                    {film.location}
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl text-charcoal-900 mb-4">
                    {film.title}
                  </h3>
                  <p className="text-body-lg text-charcoal-600 font-light mb-6">
                    {film.description}
                  </p>
                  <a
                    href={film.vimeoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-caption uppercase tracking-widest text-charcoal-800 hover:text-sepia-600 transition-colors"
                  >
                    Watch Film
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="section bg-charcoal-900 text-cream-100">
        <div className="container-narrow text-center">
          <p className="text-caption uppercase tracking-[0.2em] text-sepia-400 mb-4">
            Our Approach
          </p>
          <h2 className="font-serif text-heading-lg mb-8">
            Cinematic Storytelling
          </h2>
          <p className="text-body-lg text-cream-300 font-light mb-8">
            We believe wedding films should feel like cinema—beautifully composed, 
            thoughtfully edited, and emotionally resonant. Our films prioritize 
            authentic moments over staged shots, natural audio over forced interviews.
          </p>
          <p className="text-body-lg text-cream-300 font-light">
            The result? A film that feels like stepping back into your day, 
            experiencing every laugh, tear, and whispered promise all over again.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1920&q=80"
            alt="Contact background"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal-900/60" />
        </div>
        <div className="relative z-10 text-center container-narrow">
          <h2 className="font-serif text-heading-lg text-cream-100 mb-6">
            Let's Capture Your Story
          </h2>
          <Button
            href="/contact"
            variant="outline"
            className="border-cream-100 text-cream-100 hover:bg-cream-100 hover:text-charcoal-900"
          >
            Inquire About Films
          </Button>
        </div>
      </section>
    </>
  );
}

