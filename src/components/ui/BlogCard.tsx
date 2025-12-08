'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/types';

interface BlogCardProps {
  post: BlogPost;
  index: number;
  variant?: 'default' | 'featured' | 'minimal';
}

export default function BlogCard({
  post,
  index,
  variant = 'default',
}: BlogCardProps) {
  const formattedDate = new Date(post.publish_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{
          duration: 0.8,
          ease: [0.77, 0, 0.175, 1],
        }}
        className="group"
      >
        <Link href={`/journal/${post.slug}`} className="block">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {post.featured_image && (
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={post.featured_image.url}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-cinematic group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-caption uppercase tracking-widest text-sepia-600">
                {post.category && <span>{post.category}</span>}
                <span className="w-8 h-px bg-sepia-400" />
                <time dateTime={post.publish_date}>{formattedDate}</time>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-charcoal-900 group-hover:text-sepia-700 transition-colors duration-300">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-body text-charcoal-600 line-clamp-3">
                  {post.excerpt}
                </p>
              )}
              <span className="inline-flex items-center text-caption uppercase tracking-widest text-charcoal-800 group-hover:text-sepia-600 transition-colors">
                Read More
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
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
              </span>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  if (variant === 'minimal') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.77, 0, 0.175, 1],
        }}
        className="group border-b border-charcoal-200 py-6 first:pt-0 last:border-b-0"
      >
        <Link href={`/journal/${post.slug}`} className="block">
          <time className="text-caption uppercase tracking-widest text-sepia-600 mb-2 block">
            {formattedDate}
          </time>
          <h3 className="font-serif text-xl text-charcoal-900 group-hover:text-sepia-700 transition-colors">
            {post.title}
          </h3>
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
      <Link href={`/journal/${post.slug}`} className="block">
        {post.featured_image && (
          <div className="relative aspect-[4/3] overflow-hidden mb-6">
            <Image
              src={post.featured_image.url}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-caption uppercase tracking-widest text-sepia-600">
            {post.category && <span>{post.category}</span>}
            <span className="w-4 h-px bg-sepia-400" />
            <time dateTime={post.publish_date}>{formattedDate}</time>
          </div>
          <h3 className="font-serif text-xl md:text-2xl text-charcoal-900 group-hover:text-sepia-700 transition-colors duration-300">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-body text-charcoal-600 line-clamp-2">
              {post.excerpt}
            </p>
          )}
        </div>
      </Link>
    </motion.article>
  );
}

