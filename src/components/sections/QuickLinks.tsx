'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const quickLinks = [
  {
    title: 'Journal',
    description: 'Stories, tips & inspiration',
    href: '/journal',
    image: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=600&q=80',
  },
  {
    title: 'Films',
    description: 'Cinematic wedding films',
    href: '/films',
    image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=600&q=80',
  },
  {
    title: 'How It Works',
    description: 'Our process explained',
    href: '/how-it-works',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80',
  },
  {
    title: 'Why Elope?',
    description: 'The case for intimacy',
    href: '/why-elope',
    image: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=600&q=80',
  },
];

export default function QuickLinks() {
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
          Take a deeper dive and learn more about the process of working with us.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {quickLinks.map((link, index) => (
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
                  src={link.image}
                  alt={link.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-charcoal-900/50 group-hover:bg-charcoal-900/70 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <h3 className="font-serif text-xl md:text-2xl text-cream-100 mb-2">
                    {link.title}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-cream-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {link.description}
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

