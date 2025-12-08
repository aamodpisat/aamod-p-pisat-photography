'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button';

const faqs = [
  {
    category: 'Booking',
    questions: [
      {
        question: 'How far in advance should I book?',
        answer:
          'I recommend reaching out 12-18 months before your wedding date for popular seasons (spring and fall). However, I occasionally have openings for closer dates, so don\'t hesitate to inquire even if your date is sooner.',
      },
      {
        question: 'What is required to book?',
        answer:
          'To secure your date, I require a signed contract and a non-refundable retainer (typically 30% of your package total). The remaining balance is due 30 days before your wedding.',
      },
      {
        question: 'Do you travel for weddings?',
        answer:
          'Absolutely! I love destination weddings and am happy to travel anywhere in the world. For weddings within the continental US, travel is often included. For international destinations, we\'ll discuss travel logistics and any additional costs.',
      },
    ],
  },
  {
    category: 'Coverage',
    questions: [
      {
        question: 'How many hours of coverage do I need?',
        answer:
          'This depends on your timeline and priorities. Most full weddings benefit from 8-10 hours of coverage (from getting ready through reception highlights). Elopements and intimate ceremonies may only need 2-6 hours. We\'ll discuss your specific needs during our consultation.',
      },
      {
        question: 'Do you offer engagement sessions?',
        answer:
          'Yes! Engagement sessions are included in most wedding packages and are a wonderful way for us to get comfortable working together before your big day. They\'re also perfect for save-the-dates and wedding website photos.',
      },
      {
        question: 'Do you work with a second photographer?',
        answer:
          'For weddings with more than 75 guests or complex timelines, I highly recommend a second photographer. They\'re included in my Full Day and Destination packages, and can be added to other packages for an additional fee.',
      },
    ],
  },
  {
    category: 'Delivery',
    questions: [
      {
        question: 'When will I receive my photos?',
        answer:
          'Wedding galleries are delivered within 6-8 weeks. Engagement sessions and elopements typically arrive within 3-4 weeks. I\'ll share a small preview gallery within 1-2 weeks so you have images to enjoy right away.',
      },
      {
        question: 'How many photos will I receive?',
        answer:
          'The number varies based on coverage length and your specific day, but you can generally expect 50-80 images per hour of coverage. Quality always takes precedence over quantity—I deliver every meaningful moment, beautifully edited.',
      },
      {
        question: 'Do you provide RAW/unedited files?',
        answer:
          'No, I don\'t provide RAW files. My editing process is an integral part of my artistic vision, and the final gallery represents my best work. Every image is individually edited to ensure consistency and quality.',
      },
    ],
  },
  {
    category: 'General',
    questions: [
      {
        question: 'What is your shooting style?',
        answer:
          'My style is best described as cinematic, romantic, and documentary. I focus on authentic moments and genuine emotions rather than overly posed shots. While I\'ll provide gentle guidance to ensure flattering compositions, I\'m most inspired by capturing how you naturally interact.',
      },
      {
        question: 'What happens if you\'re sick or have an emergency?',
        answer:
          'While this has never happened, I have a network of trusted photographers who can step in if needed. Your wedding will always be covered, and I\'ll ensure any substitute photographer matches my style and quality standards.',
      },
      {
        question: 'Do you have liability insurance?',
        answer:
          'Yes, I carry full liability insurance and can provide a certificate of insurance if your venue requires it.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=1920&q=80"
            alt="FAQ hero"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal-900/50" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="font-serif text-display text-cream-100 mb-4">
            FAQ
          </h1>
          <p className="font-script text-3xl text-sepia-300">
            Your questions answered
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section bg-cream-100">
        <div className="container-wide">
          {/* Intro */}
          <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20">
            <p className="text-body-lg text-charcoal-600 font-light">
              Here are answers to some of the most common questions I receive. 
              If you don't find what you're looking for, please don't hesitate to reach out.
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-16">
            {faqs.map((category) => (
              <div key={category.category}>
                <h2 className="font-serif text-2xl text-charcoal-900 mb-8 pb-4 border-b border-charcoal-200">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((item, index) => {
                    const itemId = `${category.category}-${index}`;
                    const isOpen = openItems.includes(itemId);

                    return (
                      <div
                        key={itemId}
                        className="border border-charcoal-200 bg-cream-50"
                      >
                        <button
                          onClick={() => toggleItem(itemId)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left"
                        >
                          <span className="font-serif text-lg text-charcoal-900 pr-4">
                            {item.question}
                          </span>
                          <motion.span
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-sepia-600 text-2xl flex-shrink-0"
                          >
                            +
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 text-charcoal-600 font-light">
                                {item.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section bg-charcoal-900 text-cream-100">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-heading-lg mb-6">
            Still Have Questions?
          </h2>
          <p className="text-cream-300 mb-8">
            I'm happy to answer any questions you might have about working together.
          </p>
          <Button
            href="/contact"
            variant="outline"
            className="border-cream-400 text-cream-400 hover:bg-cream-100 hover:text-charcoal-900 hover:border-cream-100"
          >
            Get In Touch
          </Button>
        </div>
      </section>
    </>
  );
}

