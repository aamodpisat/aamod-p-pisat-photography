'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { ContentstackAsset } from '@/lib/types';
import { ImagePresets } from '@/lib/image-utils';

export default function StoryGallery({ images }: { images: ContentstackAsset[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowRight') setActiveIndex(index => index === null ? null : (index + 1) % images.length);
      if (event.key === 'ArrowLeft') setActiveIndex(index => index === null ? null : (index - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, images.length]);

  const selected = activeIndex === null ? null : images[activeIndex];

  return <section className="story-detail-gallery-section" aria-label="Story photograph gallery" data-gallery-count={images.length}>
    <div className="inner">
      <div className="story-detail-gallery-heading">
        <div><p className="eyebrow">In photographs</p><h2>Moments from this story</h2></div>
        <p>{images.length} photographs</p>
      </div>
      <div className="story-detail-gallery-grid">
        {images.map((image, index) => <button
          key={image.uid || index}
          type="button"
          className="story-detail-gallery-tile"
          aria-label={`Open photograph ${index + 1} of ${images.length}`}
          onClick={() => setActiveIndex(index)}
        >
          <Image src={ImagePresets.galleryThumb(image.url)} alt={image.title || `Story photograph ${index + 1}`} fill loading="lazy" sizes="(max-width: 680px) 50vw, (max-width: 1100px) 50vw, 33vw" />
        </button>)}
      </div>
    </div>
    {selected && <div className="story-detail-lightbox" role="dialog" aria-modal="true" aria-label="Story photograph viewer" onClick={event => { if (event.target === event.currentTarget) setActiveIndex(null); }}>
      <button type="button" className="story-detail-lightbox-close" aria-label="Close photograph viewer" onClick={() => setActiveIndex(null)}>×</button>
      <button type="button" className="story-detail-lightbox-prev" aria-label="Previous photograph" onClick={() => setActiveIndex(index => index === null ? null : (index - 1 + images.length) % images.length)}>←</button>
      <div className="story-detail-lightbox-image"><Image src={ImagePresets.galleryLarge(selected.url)} alt={selected.title || `Story photograph ${activeIndex! + 1}`} fill sizes="90vw" priority /></div>
      <button type="button" className="story-detail-lightbox-next" aria-label="Next photograph" onClick={() => setActiveIndex(index => index === null ? null : (index + 1) % images.length)}>→</button>
      <div className="story-detail-lightbox-counter">{activeIndex! + 1} / {images.length}</div>
    </div>}
  </section>;
}
