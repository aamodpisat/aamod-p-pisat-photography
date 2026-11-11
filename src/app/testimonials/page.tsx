import { InquiryBand, PageHero, SectionHeader } from '@/components/editorial';
import { getHomepageContent, getTestimonials } from '@/lib/contentstack';
import { safeTextContent } from '@/lib/richtext-renderer';

export const revalidate = 3600;
export const metadata = { title: 'Testimonials | Aamod P. Pisat Photography', description: 'Read published words from couples and families photographed by Aamod P. Pisat.' };

export default async function TestimonialsPage() {
  const [testimonials, home] = await Promise.all([getTestimonials(), getHomepageContent()]);
  return <><PageHero eyebrow="Kind words" title="What our clients remember" description="Real words from the people who trusted us with their most meaningful moments." image={testimonials[0]?.client_photo?.url || home?.portfolio_section?.gallery_images?.[0]?.url} tag="Words from the people we photographed" ctaText="Read the reviews" ctaHref="#reviews" />
    <section id="reviews" className="section"><div className="inner"><SectionHeader eyebrow="Testimonials" title="A little love, returned" /><div className="film-grid">{testimonials.map(item => <article key={item.uid} style={{ borderTop: '1px solid var(--line)', paddingTop: 24 }}><blockquote style={{ font: 'italic 22px/1.55 var(--serif)', margin: 0 }}>“{safeTextContent(item.review_text).replace(/[“”]/g, '')}”</blockquote><p className="caption">{item.client_name}</p></article>)}</div></div></section><InquiryBand /></>;
}
