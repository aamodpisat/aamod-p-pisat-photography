import Link from 'next/link';
import { InquiryBand, PageHero, SectionHeader } from '@/components/editorial';
import { getAboutPageContent, getHomepageContent } from '@/lib/contentstack';

export const revalidate = 3600;
export const metadata = { title: 'Services | Aamod P. Pisat Photography', description: 'Explore wedding photography, films, and celebrations with Aamod P. Pisat.' };

export default async function ServicesPage() {
  const [about, home] = await Promise.all([getAboutPageContent(), getHomepageContent()]);
  return <>
    <PageHero eyebrow="How we work" title="Photography with feeling at its centre" description={about?.intro_section?.tagline} image={home?.portfolio_section?.gallery_images?.[5]?.url} tag="Made for your story" ctaText="Explore the work" ctaHref="/portfolio" />
    <section className="section"><div className="inner"><SectionHeader eyebrow="The experience" title="From the first conversation to the final frame" description="A thoughtful process shaped around your celebration, from the first conversation to the photographs you'll return to for years." /><div className="proof-grid">{[['01 / Connect', 'Tell us your story'], ['02 / Plan', 'Shape the experience'], ['03 / Create', 'Live the moment'], ['04 / Remember', 'Relive it all']].map(([label, title]) => <article key={label}><p>{label}</p><h3>{title}</h3></article>)}</div><div className="center" style={{ marginTop: 45 }}><Link className="text-link" href="/contact">Tell me about your plans ↗</Link></div></div></section>
    <InquiryBand />
  </>;
}
