/**
 * Contentstack Service
 * Handles all data fetching from Contentstack Delivery API
 * With Live Preview support
 * Using @contentstack/delivery-sdk v4
 */

import Contentstack, { QueryOperation, Region } from '@contentstack/delivery-sdk';
import { 
  SiteConfig, 
  HeroBanner, 
  HomepageContent, 
  PortfolioItem, 
  Testimonial, 
  ServicePackage,
  ContactPageContent,
  AboutPageContent,
  FilmsPageContent,
  PortfolioPageContent,
  ContentstackAsset,
  StoryPost,
  PackagesPageContent
} from './types';

// Helper function to map region string to Region enum
function getRegion(regionString: string): Region {
  switch (regionString.toLowerCase()) {
    case 'eu':
      return Region.EU;
    case 'azure-na':
      return Region.AZURE_NA;
    case 'azure-eu':
      return Region.AZURE_EU;
    case 'us':
    default:
      return Region.US;
  }
}

// Check if Live Preview mode is enabled
function isPreviewMode(): boolean {
  // Check for preview query param or environment variable
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('live_preview') === 'true') return true;
  }
  return process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW === 'true';
}

// Stack configuration
const stackConfig = {
  apiKey: process.env.CONTENTSTACK_API_KEY || process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || '',
  deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN || process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN || '',
  environment: process.env.CONTENTSTACK_ENVIRONMENT || process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'development',
  region: getRegion(process.env.CONTENTSTACK_REGION || process.env.NEXT_PUBLIC_CONTENTSTACK_REGION || 'us'),
};

// Initialize Contentstack client
const stack = Contentstack.stack({
  apiKey: stackConfig.apiKey,
  deliveryToken: stackConfig.deliveryToken,
  environment: stackConfig.environment,
  region: stackConfig.region,
  live_preview: {
    enable: process.env.CONTENTSTACK_LIVE_PREVIEW === 'true',
    preview_token: process.env.CONTENTSTACK_PREVIEW_TOKEN || '',
    host: getPreviewHost(),
  },
});

// Get preview host based on region
function getPreviewHost(): string {
  const region = process.env.CONTENTSTACK_REGION || process.env.CONTENTSTACK_REGION || 'us';
  
  switch (region.toLowerCase()) {
    case 'eu':
      return 'eu-rest-preview.contentstack.com';
    case 'azure-na':
      return 'azure-na-rest-preview.contentstack.com';
    case 'azure-eu':
      return 'azure-eu-rest-preview.contentstack.com';
    case 'us':
    default:
      return 'rest-preview.contentstack.com';
  }
}

// Content Type UIDs - update these to match your Contentstack content type UIDs
export const CONTENT_TYPES = {
  SITE_CONFIG: 'site_config',
  HERO_BANNER: 'hero_banner',
  HOMEPAGE: 'homepage_new', // Updated to match actual content type UID
  PORTFOLIO_ITEM: 'portfolio_item',
  TESTIMONIAL: 'testimonial',
  SERVICE_PACKAGE: 'service_package',
  CONTACT_PAGE: 'contact_page',
  ABOUT_PAGE: 'about_page',
  FILMS_PAGE: 'films_page',
  PORTFOLIO_PAGE: 'portfolio_page',
  STORIES_POST: 'stories_post',
  PACKAGES_PAGE: 'packages_page',
} as const;

/**
 * Fetch site configuration (navigation, branding, contact info)
 */
export async function getSiteConfig(): Promise<SiteConfig | null> {
  try {
    const result = await stack
      .contentType(CONTENT_TYPES.SITE_CONFIG)
      .entry()
      .query()
      .limit(1)
      .find();
    
    const entries = result.entries as SiteConfig[];
    return entries && entries.length > 0 ? entries[0] : null;
  } catch (error) {
    console.error('Error fetching site config:', error);
    return null;
  }
}

/**
 * Fetch hero banner slides for carousel
 */
export async function getHeroBanners(limit: number = 5): Promise<HeroBanner[]> {
  try {
    const result = await stack
      .contentType(CONTENT_TYPES.HERO_BANNER)
      .entry()
      .query()
      .limit(limit)
      .find();
    return (result.entries as HeroBanner[]) || [];
  } catch (error) {
    console.error('Error fetching hero banners:', error);
    return [];
  }
}

/**
 * Fetch homepage content (all section text, CTAs, etc.)
 */
export async function getHomepageContent(): Promise<HomepageContent | null> {
  try {
    const result = await stack
      .contentType(CONTENT_TYPES.HOMEPAGE)
      .entry()
      .query()
      .limit(1)
      .find();
    
    const entries = result.entries as HomepageContent[];
    
    return entries && entries.length > 0 ? entries[0] : null;
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    return null;
  }
}

/**
 * Fetch all portfolio items
 */
export async function getPortfolioItems(options?: {
  category?: string;
  limit?: number;
  skip?: number;
  featuredOnly?: boolean;
}): Promise<PortfolioItem[]> {
  try {
    let query = stack
      .contentType(CONTENT_TYPES.PORTFOLIO_ITEM)
      .entry()
      .query();

    // For filtering by featured, use equalTo
    if (options?.featuredOnly) {
      query = query.equalTo('is_featured', true);
    }

    // For filtering by category
    if (options?.category) {
      query = query.equalTo('category', options.category);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.skip) {
      query = query.skip(options.skip);
    }

    const result = await query.find();
    return (result.entries as PortfolioItem[]) || [];
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    return [];
  }
}

/**
 * Fetch single portfolio item by UID
 */
export async function getPortfolioItemByUid(uid: string): Promise<PortfolioItem | null> {
  try {
    const entry = await stack
      .contentType(CONTENT_TYPES.PORTFOLIO_ITEM)
      .entry(uid)
      .fetch();
    return (entry as unknown as PortfolioItem) || null;
  } catch (error) {
    console.error('Error fetching portfolio item:', error);
    return null;
  }
}

/**
 * Fetch all testimonials
 */
export async function getTestimonials(limit?: number): Promise<Testimonial[]> {
  try {
    let query = stack
      .contentType(CONTENT_TYPES.TESTIMONIAL)
      .entry()
      .query();

    if (limit) {
      query = query.limit(limit);
    }

    const result = await query.find();
    return (result.entries as Testimonial[]) || [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

/**
 * Fetch all service packages
 */
export async function getServicePackages(): Promise<ServicePackage[]> {
  try {
    const result = await stack
      .contentType(CONTENT_TYPES.SERVICE_PACKAGE)
      .entry()
      .query()
      .find();
    return (result.entries as ServicePackage[]) || [];
  } catch (error) {
    console.error('Error fetching service packages:', error);
    return [];
  }
}

/**
 * Fetch contact page content
 */
export async function getContactPageContent(): Promise<ContactPageContent | null> {
  try {
    const result = await stack
      .contentType(CONTENT_TYPES.CONTACT_PAGE)
      .entry()
      .query()
      .limit(1)
      .find();
    
    const entries = result.entries as ContactPageContent[];
    return entries && entries.length > 0 ? entries[0] : null;
  } catch (error) {
    console.error('Error fetching contact page content:', error);
    return null;
  }
}

/**
 * Fetch about page content
 */
export async function getAboutPageContent(): Promise<AboutPageContent | null> {
  try {
    const result = await stack
      .contentType(CONTENT_TYPES.ABOUT_PAGE)
      .entry()
      .query()
      .limit(1)
      .find();
    
    const entries = result.entries as AboutPageContent[];
    return entries && entries.length > 0 ? entries[0] : null;
  } catch (error) {
    console.error('Error fetching about page content:', error);
    return null;
  }
}

/**
 * Fetch films page content
 */
export async function getFilmsPageContent(): Promise<FilmsPageContent | null> {
  try {
    const result = await stack
      .contentType(CONTENT_TYPES.FILMS_PAGE)
      .entry()
      .query()
      .limit(1)
      .find();
    
    const entries = result.entries as FilmsPageContent[];
    return entries && entries.length > 0 ? entries[0] : null;
  } catch (error) {
    console.error('Error fetching films page content:', error);
    return null;
  }
}

/**
 * Fetch portfolio page content
 */
export async function getPortfolioPageContent(): Promise<PortfolioPageContent | null> {
  try {
    const result = await stack
      .contentType(CONTENT_TYPES.PORTFOLIO_PAGE)
      .entry()
      .query()
      .limit(1)
      .find();
    
    const entries = result.entries as PortfolioPageContent[];
    return entries && entries.length > 0 ? entries[0] : null;
  } catch (error) {
    console.error('Error fetching portfolio page content:', error);
    return null;
  }
}

/**
 * Fetch assets from a specific folder by folder UID
 * Uses the Contentstack Assets API via REST endpoint
 */
export async function getAssetsFromFolder(folderUid: string): Promise<ContentstackAsset[]> {
  try {
    // Build the API URL for fetching assets from a folder
    const baseUrl = stackConfig.region === Region.EU 
      ? 'https://eu-cdn.contentstack.com'
      : 'https://cdn.contentstack.io';
    
    const apiUrl = `${baseUrl}/v3/assets?query={parent_uid:${folderUid}}&environment=${stackConfig.environment}`;
    
    const assets = await stack.asset().query().where('parent_uid', QueryOperation.EQUALS, folderUid).find();

    // Transform the response to match our ContentstackAsset interface
   
    return assets.assets as ContentstackAsset[];
  } catch (error) {
    console.error('Error fetching assets from folder:', error);
    return [];
  }
}

/**
 * Get all portfolio categories
 */
export async function getPortfolioCategories(): Promise<string[]> {
  try {
    const items = await getPortfolioItems();
    const categoriesSet = new Set(items.map((item) => item.category));
    return Array.from(categoriesSet).filter(Boolean);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Fetch all data needed for homepage in a single call
 * This is more efficient than making multiple separate calls
 */
export async function getHomePageData() {
  const [
    siteConfig,
    heroBanners,
    homepageContent,
    portfolioItems,
    testimonials,
    aboutPageContent,
  ] = await Promise.all([
    getSiteConfig(),
    getHeroBanners(5),
    getHomepageContent(),
    getPortfolioItems({ featuredOnly: true, limit: 6 }),
    getTestimonials(4),
    getAboutPageContent(),
  ]);

  return {
    siteConfig,
    heroBanners,
    homepageContent,
    portfolioItems,
    testimonials,
    aboutPageContent,
  };
}

/**
 * Fetch all story posts
 */
export async function getStoryPosts(options?: {
  limit?: number;
  skip?: number;
  featuredOnly?: boolean;
  taxonomyTerm?: string;
}): Promise<StoryPost[]> {
  try {
    let query = stack
      .contentType(CONTENT_TYPES.STORIES_POST)
      .entry()
      .query();

    // Filter by featured stories
    if (options?.featuredOnly) {
      query = query.equalTo('is_featured', true);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.skip) {
      query = query.skip(options.skip);
    }

    const result = await query.find();
    let stories = (result.entries as StoryPost[]) || [];

    // Filter by taxonomy term if provided
    if (options?.taxonomyTerm && options.taxonomyTerm !== 'all') {
      stories = stories.filter(story => 
        story.taxonomies?.some(tax => 
          tax.term_uid === options.taxonomyTerm || 
          tax.name?.toLowerCase() === options.taxonomyTerm?.toLowerCase()
        )
      );
    }

    return stories;
  } catch (error) {
    console.error('Error fetching story posts:', error);
    return [];
  }
}

/**
 * Fetch featured story posts for homepage
 */
export async function getFeaturedStories(limit: number = 4): Promise<StoryPost[]> {
  return getStoryPosts({ featuredOnly: true, limit });
}

/**
 * Fetch single story post by URL slug
 */
export async function getStoryBySlug(slug: string): Promise<StoryPost | null> {
  try {
    // Try with leading slash first
    let query = stack
      .contentType(CONTENT_TYPES.STORIES_POST)
      .entry()
      .query()
      .equalTo('url', slug.startsWith('/') ? slug : `/${slug}`)
      .limit(1);

    let result = await query.find();
    let entries = result.entries as StoryPost[];
    
    if (entries && entries.length > 0) {
      return entries[0];
    }

    // Try without leading slash
    query = stack
      .contentType(CONTENT_TYPES.STORIES_POST)
      .entry()
      .query()
      .equalTo('url', slug.replace(/^\//, ''))
      .limit(1);

    result = await query.find();
    entries = result.entries as StoryPost[];
    
    return entries && entries.length > 0 ? entries[0] : null;
  } catch (error) {
    console.error('Error fetching story post:', error);
    return null;
  }
}

/**
 * Get all story categories by extracting from published stories
 * This avoids needing the Management Token for Taxonomy API
 */
export async function getStoryCategories(): Promise<{ uid: string; name: string }[]> {
  try {
    // Fetch all stories to extract their taxonomy terms
    const stories = await getStoryPosts();
    
    // Extract unique categories from stories
    const categoriesMap = new Map<string, string>();
    
    stories.forEach(story => {
      story.taxonomies?.forEach(tax => {
        if (tax.term_uid && tax.name) {
          categoriesMap.set(tax.term_uid, tax.name);
        }
      });
    });

    // Convert map to array and sort alphabetically
    const categories = Array.from(categoriesMap.entries())
      .map(([uid, name]) => ({ uid, name }))
      .sort((a, b) => a.name.localeCompare(b.name));

    // Always include "All" as the first option
    return [
      { uid: 'all', name: 'All' },
      ...categories,
    ];
  } catch (error) {
    console.error('Error fetching story categories:', error);
    // Return fallback categories if extraction fails
    return [
      { uid: 'all', name: 'All' },
      { uid: 'wedding', name: 'Wedding' },
      { uid: 'couple-shoot', name: 'Couple Shoot' },
    ];
  }
}

/**
 * Fetch packages page content
 */
export async function getPackagesPageContent(): Promise<PackagesPageContent | null> {
  try {
    const result = await stack
      .contentType(CONTENT_TYPES.PACKAGES_PAGE)
      .entry()
      .query()
      .limit(1)
      .find();
    
    const entries = result.entries as PackagesPageContent[];
    return entries && entries.length > 0 ? entries[0] : null;
  } catch (error) {
    console.error('Error fetching packages page content:', error);
    return null;
  }
}

// Export stack for advanced usage
export { stack, isPreviewMode };
export default stack;
