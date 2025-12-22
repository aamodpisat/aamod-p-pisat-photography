'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { StoryPost } from '@/lib/types';
import { ImagePresets } from '@/lib/image-utils';
import { safeTextContent } from '@/lib/richtext-renderer';

interface StoriesClientProps {
  stories: StoryPost[];
  categories: { uid: string; name: string }[];
}

export default function StoriesClient({ stories, categories }: StoriesClientProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter stories by category
  const filteredStories = activeCategory === 'all' 
    ? stories 
    : stories.filter(story => 
        story.taxonomies?.some(tax => 
          tax.term_uid === activeCategory || 
          tax.name?.toLowerCase().includes(activeCategory.toLowerCase())
        )
      );

  return (
    <>
      {/* Spacer for fixed header - ensures header is visible */}
      <div className="h-20 md:h-24 bg-white" />

      {/* Page Header - Rohan Shinde style */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-wide">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal-900">
              Wedding Stories
            </h1>
          </motion.div>

          {/* Category Filters - Horizontal pill style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {categories.map((category) => (
              <button
                key={category.uid}
                onClick={() => setActiveCategory(category.uid)}
                className={`px-5 py-2 text-xs md:text-sm tracking-wider transition-all duration-300 rounded-sm ${
                  activeCategory === category.uid
                    ? 'bg-charcoal-900 text-white'
                    : 'bg-transparent text-charcoal-500 hover:text-charcoal-900'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stories Grid - 3 column masonry-like */}
      <section className="pb-20 md:pb-28 bg-white">
        <div className="container-wide">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16"
            >
              {filteredStories.length > 0 ? (
                filteredStories.map((story, index) => (
                  <StoryCard key={story.uid} story={story} index={index} />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <h3 className="font-serif text-2xl text-charcoal-400 mb-2">No posts found</h3>
                  <p className="text-charcoal-400">Try selecting a different category.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Contact CTA - Clean dark section */}
      <section className="py-20 md:py-28 bg-charcoal-900">
        <div className="container-narrow text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl md:text-4xl text-white mb-8"
          >
            Get in touch with us!
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-block px-8 py-3 border border-white text-white text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-charcoal-900 transition-all duration-300"
            >
              Contact us
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// Story Card Component
function StoryCard({ story, index }: { story: StoryPost; index: number }) {
  const imageUrl = story.thumbnail_image?.url || story.featured_image?.url;
  const excerpt = story.excerpt ? safeTextContent(story.excerpt) : '';
  
  // Get category names from taxonomies
  const categoryNames = story.taxonomies
    ?.map(tax => tax.name)
    .filter(Boolean)
    .join(', ') || 'Wedding';

  // Build the story URL
  const storyUrl = `/stories${story.url.startsWith('/') ? story.url : `/${story.url}`}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.77, 0, 0.175, 1],
      }}
      className="group"
    >
      <Link href={storyUrl} className="block">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden mb-6">
          {imageUrl ? (
            <Image
              src={ImagePresets.portfolioCard(imageUrl)}
              alt={story.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-charcoal-200 flex items-center justify-center">
              <span className="text-charcoal-400">No image</span>
            </div>
          )}
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/20 transition-all duration-500" />
        </div>

        {/* Content */}
        <div className="space-y-3">
          {/* Category */}
          <p className="text-caption uppercase tracking-[0.2em] text-sepia-600">
            {categoryNames}
          </p>
          
          {/* Title */}
          <h2 className="font-serif text-xl md:text-2xl text-charcoal-900 group-hover:text-sepia-700 transition-colors duration-300 line-clamp-2">
            {story.title}
          </h2>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-body text-charcoal-600 font-light line-clamp-2">
              {excerpt}
            </p>
          )}
        </div>
      </Link>
    </motion.article>
  );
}

