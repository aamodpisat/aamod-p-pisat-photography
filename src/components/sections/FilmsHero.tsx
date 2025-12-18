'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface FilmsHeroProps {
  title?: string;
  tagline?: string;
  description?: string;
  videoUrl?: string;
  fallbackImage?: string;
}

export default function FilmsHero({
  title = 'Films',
  tagline = 'Stories in Motion',
  description = 'Witness love stories woven with emotion, laughter, and unforgettable moments. Each film captures the essence of your special day in cinematic brilliance.',
  videoUrl,
  fallbackImage,
}: FilmsHeroProps) {
  // Default video URL if none provided
  const defaultVideoUrl = 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4d1f0e1b6f7a8b4c5e6d7f8a9&profile_id=164';
  const defaultFallbackImage = 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=1920&q=80';
  
  const bgVideoUrl = videoUrl || defaultVideoUrl;
  const bgFallbackImage = fallbackImage || defaultFallbackImage;

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        {bgVideoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster={bgFallbackImage}
          >
            <source src={bgVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={bgFallbackImage}
            alt="Films hero background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-charcoal-900/50" />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-transparent to-charcoal-900/30" />
      </div>

      {/* Content
      <div className="relative z-10 text-center container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
        >
          <h1 className="font-serif text-display-lg md:text-display-xl text-cream-100 mb-6">
            {title}
          </h1>
        </motion.div>

        {tagline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
            className="font-script text-4xl md:text-5xl text-sepia-300 mb-8"
          >
            {tagline}
          </motion.p>
        )}

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.77, 0, 0.175, 1] }}
            className="text-body-lg text-cream-200 max-w-2xl mx-auto font-light"
          >
            {description}
          </motion.p>
        )}
      </div> */}

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border border-cream-100/50 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1 h-2 bg-cream-100/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
