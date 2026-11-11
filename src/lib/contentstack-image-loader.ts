'use client';

import type { ImageLoaderProps } from 'next/image';

/** Deliver responsive Contentstack variants directly, without a second Next.js encode. */
export default function contentstackImageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (!src.startsWith('https://images.contentstack.io/')) return src;

  const url = new URL(src);
  const presetWidth = Number(url.searchParams.get('width'));
  const presetQuality = Number(url.searchParams.get('quality'));
  const targetWidth = Number.isFinite(presetWidth) && presetWidth > 0 ? Math.min(width, presetWidth) : width;
  const targetQuality = quality || (Number.isFinite(presetQuality) && presetQuality > 0 ? presetQuality : 80);

  url.searchParams.set('environment', url.searchParams.get('environment') || process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'development');
  url.searchParams.set('width', String(targetWidth));
  url.searchParams.set('quality', String(targetQuality));
  url.searchParams.set('auto', 'webp');
  url.searchParams.set('format', 'pjpg');

  return url.toString();
}
