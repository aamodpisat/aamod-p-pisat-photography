import Link from 'next/link';
import { AwardBanner, InquiryBand, PageHero, Photo, SectionHeader } from '@/components/editorial';
import { getAboutPageContent, getHomepageContent } from '@/lib/contentstack';
import { safeTextContent } from '@/lib/richtext-renderer';

export const revalidate = 3600;
export const metadata = { title: 'About | Aamod P. Pisat Photography', description: 'Meet Aamod P. Pisat, an international award winning wedding photographer based in Mumbai.' };

export default async function AboutPage() {
  const [about, home] = await Promise.all([getAboutPageContent(), getHomepageContent()]);
  const intro = about?.intro_section;
  return <>
    <PageHero eyebrow="Behind the lens" title={about?.banner?.title || 'International Award Winning Wedding Photographer'} description={intro?.tagline} image={intro?.image?.url || about?.banner?.image?.url} tag="Aamod P. Pisat" ctaText="Read my story" ctaHref="#story" contain />
    <section id="story" className="section sand"><div className="inner feature-split"><Photo src={home?.about_section?.image?.url || intro?.image?.url} alt="Aamod P. Pisat" contain /><div><p className="eyebrow">{intro?.greeting || 'Hi, I am'} {intro?.name || 'Aamod P. Pisat'}</p><h2>{home?.about_section?.title || "I'm Aamod Pisat, the storyteller behind the lens."}</h2><p className="copy">{home?.about_section?.description?.split('\n\n')[0] || safeTextContent(intro?.description)}</p><p className="copy">{home?.about_section?.description?.split('\n\n')[1]}</p><Link className="text-link" href="/contact">Let's talk ↗</Link></div></div></section>
    {about?.achievements && about.achievements.length > 0 && <section className="section"><div className="inner"><SectionHeader eyebrow="Recognition" title="The work, recognised" /><div className="proof-grid">{about.achievements.map((item, index) => <article key={`${item.title}-${index}`}><p>{item.subtitle}</p><h3>{item.title}</h3></article>)}</div></div></section>}
    <AwardBanner brands={about?.featured_in?.brands} />
    <InquiryBand title={about?.cta_section?.title} button={about?.cta_section?.cta?.title} />
  </>;
}
