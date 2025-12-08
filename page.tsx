'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import PortfolioCard from '@/components/ui/PortfolioCard';
import {
  samplePortfolioItems,
  portfolioCategories,
} from '@/lib/sampleData';

// For SSG with Contentstack:
// export async function generateStaticParams() {
//   const items = await getPortfolioItems();
//   return items.map((item) => ({ uid: item.uid }));
// }

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  // When Contentstack is connected:
  // const portfolioItems = await getPortfolioItems();
  const portfolioItems = samplePortfolioItems;

  const filteredItems =
    activeCategory === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920&q=80"
            alt="Portfolio hero"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal-900/50" />
        </div>
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-display text-cream-100 mb-4"
          >
            Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-script text-3xl text-sepia-300"
          >
            A collection of love stories
          </motion.p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section bg-cream-100">
        <div className="container-wide">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16"
          >
            {portfolioCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-caption uppercase tracking-widest transition-all duration-300 pb-2 border-b-2 ${
                  activeCategory === category
                    ? 'text-charcoal-900 border-sepia-500'
                    : 'text-charcoal-500 border-transparent hover:text-charcoal-700'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            >
              {filteredItems.map((item, index) => (
                <PortfolioCard
                  key={item.uid}
                  item={item}
                  index={index}
                  variant="default"
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-charcoal-500 py-20"
            >
              No items found in this category.
            </motion.p>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-sm bg-charcoal-900 text-cream-100 text-center">
        <div className="container-narrow">
          <h2 className="font-serif text-heading-lg mb-4">
            Interested in working together?
          </h2>
          <p className="text-cream-300 mb-8">
            I'd love to hear about your story and create something beautiful with you.
          </p>
          <a
            href="/contact"
            className="btn-cinematic border-cream-400 text-cream-400 hover:bg-cream-100 hover:text-charcoal-900 hover:border-cream-100"
          >
            Get In Touch
          </a>
        </div>
      </section>
    </>
  );
}

