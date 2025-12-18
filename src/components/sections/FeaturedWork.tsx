'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import PortfolioCard from '@/components/ui/PortfolioCard';
import Button from '@/components/ui/Button';
import { PortfolioItem, HomepageContent } from '@/lib/types';

interface FeaturedWorkProps {
  items: PortfolioItem[];
  content: {
    subtitle: string;
    title: string;
    description: unknown; // Can be string or JSON RTE
    cta_text: string;
    cta_link: string;
  };
}

export default function FeaturedWork({ items, content }: FeaturedWorkProps) {
  const featuredItems = items.filter((item) => item.is_featured).slice(0, 6);

  return (
    <section className="section bg-cream-100">
      <div className="container-wide">
        {/* Section Header */}
        <SectionHeading
          subtitle={content.subtitle}
          title={content.title}
          description={content.description}
        />

        {/* Gallery Grid */}
        <div className="mt-16 md:mt-24">
          {/* First row - 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
            {featuredItems.slice(0, 2).map((item, index) => (
              <PortfolioCard
                key={item.uid}
                item={item}
                index={index}
                variant="featured"
              />
            ))}
          </div>

          {/* Second row - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featuredItems.slice(2, 5).map((item, index) => (
              <PortfolioCard
                key={item.uid}
                item={item}
                index={index + 2}
                variant="default"
              />
            ))}
          </div>
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
