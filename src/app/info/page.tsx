import Link from 'next/link';
import { InquiryBand, PageHero, Photo, SectionHeader } from '@/components/editorial';
import { getContactPageContent, getHomepageContent } from '@/lib/contentstack';

export const revalidate = 3600;
export const metadata = { title: 'Info | Aamod P. Pisat Photography', description: 'Explore the photography experience, services, and frequently asked questions.' };

export default async function InfoPage() {
  const [contact, home] = await Promise.all([getContactPageContent(), getHomepageContent()]);
  return <><PageHero eyebrow="Plan with confidence" title="Everything you need to know" description="Explore the experience, services, and answers before starting a conversation." image={contact?.banner?.image?.url} tag="Your story, thoughtfully planned" ctaText="Explore services" ctaHref="/services" />
    <section className="section"><div className="inner"><SectionHeader eyebrow="Explore" title="Find your next step" /><div className="story-grid"><Link className="story-card" href="/services"><Photo src={home?.portfolio_section?.gallery_images?.[7]?.url} alt="Photography experience" /><h2 className="card-title">Services & approach ↗</h2></Link><Link className="story-card" href="/faq"><Photo src={home?.portfolio_section?.gallery_images?.[8]?.url} alt="Wedding details" /><h2 className="card-title">Frequently asked questions ↗</h2></Link></div></div></section><InquiryBand /></>;
}
