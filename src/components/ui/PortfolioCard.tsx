'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PortfolioItem } from '@/lib/types';
import { ImagePresets } from '@/lib/image-utils';

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
  variant?: 'default' | 'featured' | 'minimal';
}

export default function PortfolioCard({
  item,
  index,
  variant = 'default',
}: PortfolioCardProps) {
  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{
          duration: 0.8,
          delay: index * 0.1,
          ease: [0.77, 0, 0.175, 1],
        }}
        className="group relative"
      >
        <Link href={`/portfolio/${item.uid}`} className="block">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={ImagePresets.portfolioCard(item.featured_image.url)}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-1000 ease-cinematic group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
          >
            <p className="text-caption uppercase tracking-widest text-sepia-400 mb-2">
              {item.category}
            </p>
            <h3 className="font-serif text-2xl md:text-3xl">{item.title}</h3>
            {item.location && (
              <p className="text-sm text-cream-300 mt-2">{item.location}</p>
            )}
          </motion.div>
        </Link>
      </motion.article>
    );
  }

  if (variant === 'minimal') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.6,
          delay: index * 0.05,
          ease: [0.77, 0, 0.175, 1],
        }}
        className="group"
      >
        <Link href={`/portfolio/${item.uid}`} className="block">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={ImagePresets.galleryThumb(item.featured_image.url)}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/40 transition-colors duration-300" />
          </div>
        </Link>
      </motion.article>
    );
  }

  // Default variant
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.77, 0, 0.175, 1],
      }}
      className="group"
    >
      <Link href={`/portfolio/${item.uid}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden mb-6">
          <Image
            src={ImagePresets.portfolioCard(item.featured_image.url)}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-1000 ease-cinematic group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 via-transparent to-transparent" />
        </div>
        <div className="space-y-2">
          <p className="text-caption uppercase tracking-widest text-sepia-600">
            {item.category}
          </p>
          <h3 className="font-serif text-xl md:text-2xl text-charcoal-900 group-hover:text-sepia-700 transition-colors duration-300">
            {item.title}
          </h3>
          {item.location && (
            <p className="text-sm text-charcoal-500">{item.location}</p>
          )}
        </div>
      </Link>
    </motion.article>
  );
}

