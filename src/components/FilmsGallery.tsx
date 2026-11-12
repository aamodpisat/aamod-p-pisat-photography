'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ImagePresets } from '@/lib/image-utils';
import type { Film } from '@/lib/types';

type Props = { films: Film[] };

function FilmThumbnail({ film, alt, sizes }: { film?: Film; alt: string; sizes: string }) {
  const [useStandardThumbnail, setUseStandardThumbnail] = useState(false);
  if (!film) return null;

  const youtubeId = /^[A-Za-z0-9_-]{11}$/.test(film.youtube_id || '') ? film.youtube_id : null;
  const contentstackImage = film.thumbnail?.url;
  const image = contentstackImage
    ? ImagePresets.portfolioCard(contentstackImage)
    : youtubeId
      ? `https://i.ytimg.com/vi/${youtubeId}/${useStandardThumbnail ? 'hqdefault' : 'maxresdefault'}.jpg`
      : null;

  return image ? <Image
    src={image}
    alt={alt}
    fill
    sizes={sizes}
    unoptimized={!contentstackImage}
    style={{ objectFit: 'cover' }}
    onError={!contentstackImage && !useStandardThumbnail ? () => setUseStandardThumbnail(true) : undefined}
  /> : null;
}

export { FilmThumbnail };

export default function FilmsGallery({ films }: Props) {
  const [active, setActive] = useState<Film | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  function open(film: Film) {
    lastFocus.current = document.activeElement as HTMLElement;
    setActive(film);
  }

  function close() {
    setActive(null);
    requestAnimationFrame(() => lastFocus.current?.focus());
  }

  useEffect(() => {
    if (!active) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [active]);

  return <>
    <div className="film-grid">
      {films.map((film, index) => {
        const canPlay = /^[A-Za-z0-9_-]{11}$/.test(film.youtube_id || '');
        return <button className="film-card film-card-button" type="button" key={film.youtube_id || index} onClick={() => open(film)} disabled={!canPlay} aria-label={`Watch ${film.title} film on this page`}>
          <div className="photo"><FilmThumbnail film={film} alt={film.title} sizes="(max-width: 680px) 100vw, 50vw" /></div>
          <p className="caption">Film {String(index + 1).padStart(2, '0')} · {film.location}</p>
          <h3 className="card-title">{film.title}</h3>
          <p className="small-copy">{film.description}</p>
        </button>;
      })}
    </div>
    {active && <div className="film-modal" role="dialog" aria-modal="true" aria-label={`${active.title} film`} onMouseDown={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="film-modal-panel">
        <div className="film-modal-heading"><p>{active.title}</p><button ref={closeButton} type="button" onClick={close} aria-label="Close film">×</button></div>
        <iframe
          title={`${active.title} wedding film`}
          src={`https://www.youtube-nocookie.com/embed/${active.youtube_id}?autoplay=1&rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>}
  </>;
}
