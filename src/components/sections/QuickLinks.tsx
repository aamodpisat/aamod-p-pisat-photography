'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { QuickLink } from '@/lib/types';
import { safeTextContent } from '@/lib/richtext-renderer';
import { ImagePresets } from '@/lib/image-utils';

interface QuickLinksProps {
  heading: string;
  links: QuickLink[];
}

export default function QuickLinks({ heading, links }: QuickLinksProps) {

  return (
    <section className="section-sm bg-cream-200">
      <div className="container-full">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-caption uppercase tracking-[0.2em] text-sepia-600 mb-10"
        >
          {safeTextContent(heading)}
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {links.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.77, 0, 0.175, 1],
              }}
            >
              <Link
                href={link.href}
                className="group block relative aspect-square overflow-hidden"
              >
                <Image
                  src={ImagePresets.galleryThumb(link.image.url)}
                  alt={safeTextContent(link.title)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-charcoal-900/50 group-hover:bg-charcoal-900/70 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <h3 className="font-serif text-xl md:text-2xl text-cream-100 mb-2">
                    {safeTextContent(link.title)}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-cream-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {safeTextContent(link.description)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
