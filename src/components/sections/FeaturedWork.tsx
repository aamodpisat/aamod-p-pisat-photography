'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import PortfolioCard from '@/components/ui/PortfolioCard';
import Button from '@/components/ui/Button';
import { PortfolioItem } from '@/lib/types';

interface FeaturedWorkProps {
  items: PortfolioItem[];
}

export default function FeaturedWork({ items }: FeaturedWorkProps) {
  const featuredItems = items.filter((item) => item.is_featured).slice(0, 6);

  return (
    <section className="section bg-cream-100">
      <div className="container-wide">
        {/* Section Header */}
        <SectionHeading
          subtitle="Portfolio"
          title="Raw, timeless, nostalgic, cinematic"
          description="Storytelling for kindred souls. My approach errs more on the cinematic, romantic side, all from a documentary perspective."
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
          <Button href="/portfolio" variant="outline">
            View Full Portfolio
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

