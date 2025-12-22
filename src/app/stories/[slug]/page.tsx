import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import StoryDetailClient from './StoryDetailClient';
import { getStoryBySlug, getStoryPosts } from '@/lib/contentstack';
import { safeTextContent } from '@/lib/richtext-renderer';

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

  return (
    <StoryDetailClient 
      story={story} 
      relatedStories={relatedStories}
    />
  );
}

