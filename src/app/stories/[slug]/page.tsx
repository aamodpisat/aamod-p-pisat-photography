import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getStoryBySlug, getStoryPosts } from '@/lib/contentstack';
import { RichText, safeTextContent } from '@/lib/richtext-renderer';
import { ImagePresets } from '@/lib/image-utils';
import { InquiryBand } from '@/components/editorial';
import StoryGallery from './StoryGallery';

interface Props {
  params: { slug: string };
}

// Generate static params for all stories
export async function generateStaticParams() {
  const stories = await getStoryPosts();
  return stories.map((story) => ({
    slug: story.url.replace(/^\//, ''), // Remove leading slash
  }));
}

// Generate metadata for each story
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const story = await getStoryBySlug(params.slug);
  
  if (!story) {
    return {
      title: 'Story Not Found',
    };
  }

  const excerpt = story.excerpt ? safeTextContent(story.excerpt) : '';

  return {
    title: `${story.title} | Stories | Aamod P. Pisat Photography`,
    description: excerpt || `${story.title} - A beautiful story captured by Aamod P. Pisat Photography`,
    openGraph: {
      title: story.title,
      description: excerpt,
      images: story.featured_image?.url ? [{ url: story.featured_image.url }] : [],
    },
  };
}

// Enable ISR
export const revalidate = 3600;

export default async function StoryDetailPage({ params }: Props) {
  const story = await getStoryBySlug(params.slug);

  if (!story) {
    notFound();
  }

  // Get related stories (same category, excluding current)
  const allStories = await getStoryPosts({ limit: 4 });
  const relatedStories = allStories
    .filter(s => s.uid !== story.uid)
    .slice(0, 3);

  return <>
    <div className="article-hero"><p className="eyebrow">Stories / Wedding story</p><h1>{story.title}</h1><p className="copy">{story.excerpt ? safeTextContent(story.excerpt) : ''}</p></div>
    {story.featured_image?.url && <div className="article-wide" style={{ position: 'relative' }}><Image src={ImagePresets.hero(story.featured_image.url)} alt={story.title} fill priority sizes="100vw" style={{ objectFit: 'cover' }} /></div>}
    <article className="article-body story-detail-article"><RichText content={story.body || ''} /></article>
    {story.gallery_images?.length > 0 && <StoryGallery images={story.gallery_images} />}
    <div className="story-detail-back"><Link className="text-link" href="/stories">← Back to all stories</Link></div>
    {relatedStories.length > 0 && <section className="section sand"><div className="inner"><p className="eyebrow">More stories</p><div className="editorial-story-grid">{relatedStories.map(item => <Link key={item.uid} href={`/stories${item.url.startsWith('/') ? item.url : `/${item.url}`}`}><div className="editorial-photo">{item.thumbnail_image?.url && <Image src={ImagePresets.portfolioCard(item.thumbnail_image.url)} alt={item.title} fill sizes="(max-width: 680px) 100vw, 33vw" style={{ objectFit: 'cover' }} />}</div><h3>{item.title}</h3></Link>)}</div></div></section>}
    <InquiryBand />
  </>;
}

