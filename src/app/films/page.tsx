import { InquiryBand, PageHero, SectionHeader } from '@/components/editorial';
import FilmsGallery, { FilmThumbnail } from '@/components/FilmsGallery';
import { getFilmsPageContent } from '@/lib/contentstack';
import { safeTextContent } from '@/lib/richtext-renderer';

export const revalidate = 3600;
export const metadata = { title: 'Films | Aamod P. Pisat Photography', description: 'Cinematic wedding films that preserve the feeling of your day.' };

export default async function FilmsPage() {
  const content = await getFilmsPageContent();
  const films = [...(content?.films || [])].sort((a, b) => (a.order || 0) - (b.order || 0));
  return <>
    <PageHero eyebrow="Wedding films" title="Films that bring you back to the moment" description={content?.films_section?.title?.replaceAll('"', '') || 'Your story, beautifully captured in motion.'} image={content?.hero_section?.fallback_image?.url} video={content?.hero_section?.background_video_url} tag="Published film teaser" ctaText="See the films" ctaHref="#films" />
    <section id="films" className="section"><div className="inner"><SectionHeader eyebrow={content?.films_section?.subtitle || 'Our films'} title="Stories in motion" /><FilmsGallery films={films} /></div></section>
    {content?.approach_section && <section className="section sand"><div className="inner feature-split"><div><p className="eyebrow">{content.approach_section.subtitle}</p><h2>{content.approach_section.title}</h2><p className="copy">{safeTextContent(content.approach_section.content)}</p></div><div className="editorial-photo" style={{ position: 'relative' }}><FilmThumbnail film={films[1]} alt="Wedding film still" sizes="(max-width: 680px) 100vw, 50vw" /></div></div></section>}
    <InquiryBand title={content?.cta_section?.title} description={content?.cta_section?.description} button={content?.cta_section?.cta?.title} />
  </>;
}
