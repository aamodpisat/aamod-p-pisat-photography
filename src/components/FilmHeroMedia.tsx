'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { ImagePresets } from '@/lib/image-utils';

export default function FilmHeroMedia({ image, video, title }: { image?: string; video: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);

  async function start() {
    setLoading(true);
    try {
      await ref.current?.play();
    } catch {
      setLoading(false);
    }
  }

  return <>
    {image && <Image src={ImagePresets.hero(image)} alt={`${title} film still`} fill priority sizes="(max-width: 680px) 100vw, 60vw" style={{ objectFit: 'cover' }} />}
    <video ref={ref} className={`film-hero-video ${playing ? 'is-playing' : ''}`} controls={playing} preload="none" playsInline onPlaying={() => { setPlaying(true); setLoading(false); }} onError={() => setLoading(false)} aria-label={`${title} film teaser`}>
      <source src={video} type="video/mp4" />
    </video>
    {!playing && <button className="video-play film-hero-play" type="button" onClick={start} disabled={loading} aria-label={loading ? 'Loading film teaser' : 'Play film teaser'}>{loading ? '…' : '▶'}</button>}
  </>;
}
