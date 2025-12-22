import { Metadata } from 'next';
import StoriesClient from './StoriesClient';
import { getStoryPosts, getStoryCategories } from '@/lib/contentstack';

export const metadata: Metadata = {
  title: 'Stories | Aamod P. Pisat Photography',
  description: 'Browse our wedding stories and photography journeys. Each story captures the beautiful moments of love and celebration.',
};

// Enable ISR - revalidate every hour
export const revalidate = 3600;

export default async function StoriesPage() {
  // Fetch all stories and categories from Contentstack in parallel
  const [stories, categories] = await Promise.all([
    getStoryPosts(),
    getStoryCategories(),
  ]);

  return (
    <StoriesClient 
      stories={stories} 
      categories={categories}
    />
  );
}

