'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ImagePresets } from '@/lib/image-utils';

export type HomeCarouselSlide = {
  id: string;
  src: string;
  alt: string;
  caption: string;
};

const INTERVAL_MS = 6000;

export default function HomeHeroCarousel({ slides, description }: { slides: HomeCarouselSlide[]; description?: string }) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStart = useRef(0);
  const paused = hovered || focusWithin || hidden || reducedMotion;
  const hasMultipleSlides = slides.length > 1;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setHidden(document.hidden);
    updateMotion();
    updateVisibility();
    media.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      media.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!hasMultipleSlides || paused) return;
    const timer = window.setInterval(() => setCurrent(index => (index + 1) % slides.length), INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [current, hasMultipleSlides, paused, slides.length]);

  const move = (step: number) => {
    if (hasMultipleSlides) setCurrent(index => (index + step + slides.length) % slides.length);
  };
  const caption = slides[current]?.caption?.trim().replace(/^["“]+|["”]+$/g, '').trim() || 'Capturing the real emotions...';

  return <section
    className="home-carousel"
    role="region"
    aria-roledescription="carousel"
    aria-label="Featured wedding photography"
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocusWithin(true)}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setFocusWithin(false); }}
    onKeyDown={event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
    }}
    onTouchStart={event => { touchStart.current = event.changedTouches[0].screenX; }}
    onTouchEnd={event => {
      const distance = event.changedTouches[0].screenX - touchStart.current;
      if (Math.abs(distance) > 50) move(distance < 0 ? 1 : -1);
    }}
  >
    {slides.map((slide, index) => <div className={`home-carousel-slide ${index === current ? 'is-active' : ''}`} key={slide.id} aria-hidden={index !== current}>
      <Image src={ImagePresets.hero(slide.src)} alt={slide.alt} fill priority={index === 0} loading={index === 0 ? undefined : 'lazy'} sizes="100vw" />
    </div>)}
    <div className="home-carousel-shade" aria-hidden="true" />
    <div className="home-carousel-content">
      <p className="eyebrow">International award winning wedding photographer</p>
      <h1>Capturing the <em>real emotions...</em></h1>
      <p className="home-carousel-description">{description || 'Storytelling for kindred souls. Cinematic, romantic photographs with a documentary heart.'}</p>
      <div className="home-carousel-actions"><Link className="home-carousel-button" href="/contact">Tell me your plans ↗</Link><Link className="home-carousel-link" href="/portfolio">Explore the work</Link></div>
    </div>
    <div className="home-carousel-bottom">
      <p className="home-carousel-caption" aria-live="polite" aria-atomic="true">{caption}</p>
      {hasMultipleSlides && <div className="home-carousel-controls">
        <span className="home-carousel-count" aria-live="polite">{String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
        <button type="button" aria-label="Previous featured image" onClick={() => move(-1)}>←</button>
        <button type="button" aria-label="Next featured image" onClick={() => move(1)}>→</button>
      </div>}
    </div>
    {hasMultipleSlides && <div className={`home-carousel-progress ${paused ? '' : 'is-playing'}`} key={current} aria-hidden="true"><span /></div>}
  </section>;
}
