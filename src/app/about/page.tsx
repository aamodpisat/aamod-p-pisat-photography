import { Metadata } from 'next';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { sampleSiteConfig } from '@/lib/sampleData';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Aamod P. Pisat, the storyteller behind the lens. Fine art documentary wedding and elopement photographer.',
};

export default function AboutPage() {
  const config = sampleSiteConfig;

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1920&q=80"
            alt="About hero"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal-900/40" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="font-serif text-display text-cream-100 mb-4">
            About
          </h1>
          <p className="font-script text-3xl text-sepia-300">
            The storyteller behind the lens
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section bg-cream-100">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Image Column */}
            <div className="relative">
              <div className="relative aspect-[3/4] overflow-hidden sticky top-32">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                  alt="Aamod P. Pisat - Photographer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Decorative frame */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-sepia-400 -z-10" />
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:py-8">
              <p className="text-caption uppercase tracking-[0.2em] text-sepia-600 mb-4">
                Hello, I'm
              </p>
              <h2 className="font-serif text-heading-xl text-charcoal-900 mb-8">
                Aamod P. Pisat
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-body-lg text-charcoal-700 font-light mb-6">
                  My approach to photography is deeply rooted in capturing authentic 
                  moments—the quiet glances, the unscripted laughter, the raw emotions 
                  that make your story uniquely yours. I believe that the most powerful 
                  photographs are those that feel lived-in, not posed.
                </p>

                <p className="text-body-lg text-charcoal-700 font-light mb-6">
                  With a background in fine art and a passion for documentary storytelling, 
                  I blend cinematic aesthetics with genuine human connection. Whether it's a 
                  grand destination wedding or an intimate elopement beneath ancient trees, 
                  my goal is to preserve the essence of your day in a way that feels timeless.
                </p>

                <p className="text-body-lg text-charcoal-700 font-light mb-6">
                  My approach errs more on the cinematic, romantic side, all from a documentary 
                  perspective. While I draw on editorial influences of guiding you into poses 
                  that accentuate your connection, I'm far more inspired by how you naturally 
                  interact with one another.
                </p>

                <p className="text-body-lg text-charcoal-700 font-light mb-8">
                  Nothing brings me more joy than documenting your love story through photography 
                  and creating something timeless out of it—something tangible that you can frame 
                  on your wall and pass down for generations. Every couple has a story worth telling. 
                  Let me help you tell yours.
                </p>
              </div>

              {/* Signature */}
              <p className="font-script text-4xl text-sepia-600 mb-10">
                Aamod
              </p>

              <Button href="/contact" variant="outline">
                Let's Work Together
              </Button>

              {/* Featured In */}
              <div className="mt-16 pt-16 border-t border-charcoal-200">
                <p className="text-caption uppercase tracking-[0.2em] text-sepia-600 mb-6">
                  Featured In
                </p>
                <div className="flex flex-wrap gap-8 items-center opacity-60">
                  <span className="font-serif text-xl text-charcoal-600">Vogue</span>
                  <span className="font-serif text-xl text-charcoal-600">Martha Stewart Weddings</span>
                  <span className="font-serif text-xl text-charcoal-600">The Knot</span>
                  <span className="font-serif text-xl text-charcoal-600">Style Me Pretty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section bg-charcoal-900 text-cream-100">
        <div className="container-narrow text-center">
          <p className="text-caption uppercase tracking-[0.2em] text-sepia-400 mb-6">
            My Philosophy
          </p>
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed italic text-cream-200">
            "Our work together is much more of a collaboration between artists—you are 
            my inspiration and I am the one who captures your story as it unfolds."
          </blockquote>
          <div className="w-16 h-px bg-sepia-500 mx-auto mt-10" />
        </div>
      </section>

      {/* What to Expect */}
      <section className="section bg-cream-200">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="text-caption uppercase tracking-[0.2em] text-sepia-600 mb-4">
              What to Expect
            </p>
            <h2 className="font-serif text-heading-lg text-charcoal-900">
              Working With Me
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 border border-sepia-400 flex items-center justify-center mx-auto mb-6">
                <span className="font-serif text-2xl text-sepia-600">01</span>
              </div>
              <h3 className="font-serif text-xl text-charcoal-900 mb-4">
                Intentional Storytelling
              </h3>
              <p className="text-charcoal-600 font-light">
                I focus on capturing the moments that matter most—the emotions, 
                the connections, the authentic expressions of your love.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 border border-sepia-400 flex items-center justify-center mx-auto mb-6">
                <span className="font-serif text-2xl text-sepia-600">02</span>
              </div>
              <h3 className="font-serif text-xl text-charcoal-900 mb-4">
                Relaxed Experience
              </h3>
              <p className="text-charcoal-600 font-light">
                I create a calm, comfortable environment where you can be 
                fully present. The best photos happen when you're relaxed.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 border border-sepia-400 flex items-center justify-center mx-auto mb-6">
                <span className="font-serif text-2xl text-sepia-600">03</span>
              </div>
              <h3 className="font-serif text-xl text-charcoal-900 mb-4">
                Timeless Delivery
              </h3>
              <p className="text-charcoal-600 font-light">
                Your gallery is delivered with intention and care, filled with 
                images that will feel just as beautiful decades from now.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1920&q=80"
            alt="Contact background"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal-900/60" />
        </div>
        <div className="relative z-10 text-center container-narrow">
          <h2 className="font-serif text-heading-lg text-cream-100 mb-6">
            Ready to Tell Your Story?
          </h2>
          <Button
            href="/contact"
            variant="outline"
            className="border-cream-100 text-cream-100 hover:bg-cream-100 hover:text-charcoal-900"
          >
            Get In Touch
          </Button>
        </div>
      </section>
    </>
  );
}

