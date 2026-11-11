import Image from 'next/image';
import Link from 'next/link';
import { ImagePresets } from '@/lib/image-utils';
import FilmHeroMedia from '@/components/FilmHeroMedia';

export function Photo({ src, alt, contain = false, priority = false, className = '' }: { src?: string; alt: string; contain?: boolean; priority?: boolean; className?: string }) {
  return <div className={`editorial-photo ${contain ? 'contain' : ''} ${className}`}>
    {src ? <Image src={ImagePresets.portfolioCard(src)} alt={alt} fill priority={priority} sizes="(max-width: 680px) 100vw, 50vw" /> : null}
  </div>;
}

export function PageHero({ eyebrow, title, description, image, tag, ctaText = 'Explore the work', ctaHref = '/portfolio', contain = false, video }: {
  eyebrow: string; title: string; description?: string; image?: string; tag?: string; ctaText?: string; ctaHref?: string; contain?: boolean; video?: string;
}) {
  return <section className="page-hero" data-page-hero>
    <div className="hero-copy"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{description && <p>{description}</p>}
      <div className="hero-actions"><Link className="button dark" href={ctaHref}>{ctaText} ↗</Link><Link className="text-link" href="/contact">Check availability</Link></div>
    </div>
    <div className={`hero-media ${contain ? 'about-hero-media' : ''}`}>
      {video ? <FilmHeroMedia image={image} video={video} title={title} /> : image ? <Image src={ImagePresets.hero(image)} alt={tag || title} fill priority sizes="(max-width: 680px) 100vw, 60vw" style={{ objectFit: contain ? 'contain' : 'cover' }} /> : null}
      {tag && <span className="hero-tag">{tag}</span>}
    </div>
  </section>;
}

export function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{description && <p>{description}</p>}</div>;
}

export function InquiryBand({ title = "Let's Create Something Beautiful", description = "Ready to tell your story? I'd love to hear about your vision.", button = 'Check availability' }: { title?: string; description?: string; button?: string }) {
  return <section className="cta-band"><p className="eyebrow">Your story starts here</p><h2>{title}</h2><p>{description}</p><Link className="button dark" href="/contact">{button} ↗</Link></section>;
}

export function AwardBanner({ brands = ['Wedwar', 'WeddingSutra', 'Canvera'] }: { brands?: string[] }) {
  return <aside className="editorial-award" aria-label="Recognition and features"><div className="editorial-award-inner"><div><span className="eyebrow">A distinction built on real stories</span><h2>International Award Winning Wedding Photographer</h2></div><div className="editorial-award-brands"><span className="eyebrow">Featured in</span><p>{brands.join(' · ')}</p></div></div></aside>;
}
