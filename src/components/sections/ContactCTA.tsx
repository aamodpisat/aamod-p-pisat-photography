'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function ContactCTA() {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80"
          alt="Contact background"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        >
          <h2 className="font-serif text-heading-lg md:text-heading-xl text-cream-100 mb-6">
            Let's Create Something Beautiful
          </h2>
          <p className="text-body-lg text-cream-300 mb-10 max-w-xl mx-auto">
            Ready to tell your story? I'd love to hear about your vision and 
            explore how we can capture your most meaningful moments together.
          </p>
          <Button
            href="/contact"
            variant="outline"
            className="border-cream-100 text-cream-100 hover:bg-cream-100 hover:text-charcoal-900"
          >
            Get In Touch
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

