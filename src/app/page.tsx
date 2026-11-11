import Link from 'next/link';
import { AwardBanner, InquiryBand, Photo, SectionHeader } from '@/components/editorial';
import { getAboutPageContent, getFeaturedStories, getHomepageContent, getTestimonials } from '@/lib/contentstack';
import { safeTextContent } from '@/lib/richtext-renderer';
import HomeHeroCarousel, { HomeCarouselSlide } from '@/components/HomeHeroCarousel';
import type { ContentstackAsset } from '@/lib/types';

export const revalidate = 3600;

export default async function HomePage() {
  const [home, about, stories, testimonials] = await Promise.all([
    getHomepageContent(), getAboutPageContent(), getFeaturedStories(3), getTestimonials(1),
  ]);
  const slides: HomeCarouselSlide[] = (home?.featured_banner || [])
    .filter(item => item.image?.url)
    .map((item, index) => ({
      id: item.image!.uid || String(index),
      src: item.image!.url,
      alt: item.image!.title || `Featured wedding photograph ${index + 1}`,
      caption: item.tagline || '',
    }));
  if (slides.length === 0 && home?.portfolio_section?.gallery_images?.[0]?.url) {
    const image = home.portfolio_section.gallery_images[0];
    slides.push({ id: image.uid, src: image.url, alt: image.title || 'Featured wedding photograph', caption: 'Capturing the real emotions...' });
  }
  const galleryImages = home?.portfolio_section?.gallery_images || [];
  // These published assets share a 2:3 portrait composition, so the grid can
  // show complete photographs in equal frames without cropping a subject.
  const portraitUids = ['blt184550f5c5df2d75', 'blt3cf475f01e28c334', 'bltddfc96b26c458d64', 'blt63529ffad37796fc'];
  const gallery: ContentstackAsset[] = portraitUids
    .map(uid => galleryImages.find(image => image.uid === uid))
    .filter((image): image is ContentstackAsset => Boolean(image));
  for (const image of galleryImages) {
    if (gallery.length >= 4) break;
    if (!gallery.some(item => item.uid === image.uid)) gallery.push(image);
  }
  const galleryAlts: Record<string, string> = {
    blt184550f5c5df2d75: 'Wedding couple in traditional attire',
    blt3cf475f01e28c334: 'Black and white bridal portrait',
    bltddfc96b26c458d64: 'Wedding couple sharing a moment together',
    blt63529ffad37796fc: 'Bride in a red sari',
  };
  const quote = testimonials[0];
  return <>
    <HomeHeroCarousel slides={slides} description={home?.portfolio_section?.description} />
    <AwardBanner brands={about?.featured_in?.brands} />
    <section className="section" id="work"><div className="inner"><SectionHeader eyebrow="A few stories, lately" title={home?.portfolio_section?.title || 'Raw, timeless, nostalgic, cinematic'} description={home?.portfolio_section?.description} /><div className="editorial-home-gallery">{gallery.map(image => <Photo key={image.uid} src={image.url} alt={galleryAlts[image.uid] || image.title} contain sizes="(max-width: 680px) 50vw, 25vw" />)}</div><div className="center" style={{ marginTop: 46 }}><Link className="text-link" href={home?.portfolio_section?.cta?.href || '/portfolio'}>{home?.portfolio_section?.cta?.title || 'View the portfolio'} ↗</Link></div></div></section>
    <section className="section sand" id="about"><div className="inner feature-split"><Photo src={about?.intro_section?.image?.url || home?.about_section?.image?.url} alt="Aamod P. Pisat" contain /><div><p className="eyebrow">Behind the camera</p><h2>{home?.about_section?.title || "I'm Aamod Pisat, the storyteller behind the lens."}</h2><p className="copy">{home?.about_section?.description?.split('\n\n')[0] || about?.intro_section?.tagline}</p><p className="copy">{home?.about_section?.description?.split('\n\n')[1]}</p><Link className="text-link" href="/about">A little more about me ↗</Link></div></div></section>
    {quote && <section className="editorial-quote"><p className="eyebrow">Kind words</p><blockquote>“{safeTextContent(quote.review_text).replace(/[“”]/g, '').slice(0, 230)}”</blockquote><cite>{quote.client_name}</cite></section>}
    {stories.length > 0 && <section className="section"><div className="inner"><SectionHeader eyebrow="The stories" title={home?.journal_section?.title || 'Stories worth staying with'} /><div className="editorial-story-grid">{stories.map(story => <Link key={story.uid} href={`/stories${story.url.startsWith('/') ? story.url : `/${story.url}`}`}><Photo src={story.thumbnail_image?.url || story.featured_image?.url} alt={story.title} sizes="(max-width: 680px) 100vw, 33vw" /><p className="caption">{story.taxonomies?.[0]?.term_uid || 'Story'}</p><h3>{story.title}</h3></Link>)}</div></div></section>}
    <InquiryBand title={home?.contact_section?.title} description={home?.contact_section?.description} />
  </>;
}
