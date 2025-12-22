'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { StoryPost } from '@/lib/types';
import { ImagePresets } from '@/lib/image-utils';
import { safeTextContent } from '@/lib/richtext-renderer';

interface StoriesPreviewProps {
  stories: StoryPost[];
  content?: {
    subtitle?: string;
    title?: string;
    description?: string;
    cta_text?: string;
    cta_link?: string;
  };
}

export default function StoriesPreview({ stories, content }: StoriesPreviewProps) {
  if (stories.length === 0) return null;

  const defaultContent = {
    subtitle: 'Exclusive Stories',
    title: 'Featured Wedding Stories',
    description: 'Every love story is unique. Here are some of our favorites.',
    cta_text: 'View All Stories',
    cta_link: '/stories',
  };

  const sectionContent = { ...defaultContent, ...content };

  return (
    <section className="section bg-cream-100">
      <div className="container-wide">
        {/* Section Header */}
        <SectionHeading
          subtitle={sectionContent.subtitle}
          title={sectionContent.title || ''}
          description={sectionContent.description}
        />

        {/* Stories Grid - Same styling as Stories page */}
        <div className="mt-16 md:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {stories.slice(0, 3).map((story, index) => (
              <StoryPreviewCard key={story.uid} story={story} index={index} />
            ))}
          </div>
        </div>

        {/* View All CTA */}
        {sectionContent.cta_text && sectionContent.cta_link && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-12 md:mt-16"
          >
            <Button href={sectionContent.cta_link} variant="outline">
              {sectionContent.cta_text}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Story Preview Card Component - Same styling as Stories page
function StoryPreviewCard({ story, index }: { story: StoryPost; index: number }) {
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
          <h3 className="font-serif text-xl md:text-2xl text-charcoal-900 group-hover:text-sepia-700 transition-colors duration-300 line-clamp-2">
            {story.title}
          </h3>

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

