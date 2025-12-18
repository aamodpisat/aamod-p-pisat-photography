'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import BlogCard from '@/components/ui/BlogCard';
import Button from '@/components/ui/Button';
import { BlogPost } from '@/lib/types';

interface JournalPreviewProps {
  posts: BlogPost[];
  content: {
    subtitle: string;
    title: string;
    description: unknown; // Can be string or JSON RTE
    cta_text: string;
    cta_link: string;
  };
}

export default function JournalPreview({ posts, content }: JournalPreviewProps) {
  const latestPosts = posts.slice(0, 3);
  const featuredPost = latestPosts[0];
  const otherPosts = latestPosts.slice(1);

  return (
    <section className="section bg-cream-100">
      <div className="container-wide">
        {/* Section Header */}
        <SectionHeading
          subtitle={content.subtitle}
          title={content.title}
          description={content.description}
        />

        {/* Blog Grid */}
        <div className="mt-16 md:mt-24">
          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-12 md:mb-16">
              <BlogCard post={featuredPost} index={0} variant="featured" />
            </div>
          )}

          {/* Other Posts */}
          {otherPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {otherPosts.map((post, index) => (
                <BlogCard key={post.uid} post={post} index={index + 1} />
              ))}
            </div>
          )}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Button href={content.cta_link} variant="outline">
            {content.cta_text}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
