'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { SiteConfig } from '@/lib/types';

interface AboutPreviewProps {
  config: SiteConfig;
}

export default function AboutPreview({ config }: AboutPreviewProps) {
  return (
    <section className="section bg-cream-200">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80"
                alt="Aamod P. Pisat - Photographer"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-sepia-400 -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
            className="lg:pl-8"
          >
            {/* Featured In badges */}
            <div className="mb-8">
              <p className="text-caption uppercase tracking-[0.2em] text-sepia-600 mb-4">
                Featured In
              </p>
              <div className="flex flex-wrap gap-6 opacity-60">
                <span className="font-serif text-lg text-charcoal-600">Vogue</span>
                <span className="font-serif text-lg text-charcoal-600">Martha Stewart</span>
                <span className="font-serif text-lg text-charcoal-600">The Knot</span>
              </div>
            </div>

            <h2 className="font-serif text-heading-lg md:text-heading-xl text-charcoal-900 mb-6">
              I'm Aamod, the storyteller behind the lens.
            </h2>

            <div className="space-y-6 text-body-lg text-charcoal-700 font-light">
              <p>
                My approach to photography is deeply rooted in capturing authentic 
                moments—the quiet glances, the unscripted laughter, the raw emotions 
                that make your story uniquely yours.
              </p>
              <p>
                Nothing brings me more joy than documenting your love story through 
                photography and creating something timeless out of it—something tangible 
                that you can frame on your wall and pass down for generations.
              </p>
            </div>

            <div className="mt-10">
              <Button href="/about" variant="outline">
                More About Me
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

