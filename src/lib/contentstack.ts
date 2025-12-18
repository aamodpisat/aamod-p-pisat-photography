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
  BlogPost, 
  ServicePackage,
  ContactPageContent,
  AboutPageContent,
  FilmsPageContent,
  PortfolioPageContent,
  ContentstackAsset 
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
  BLOG_POST: 'blog_post',
  SERVICE_PACKAGE: 'service_package',
  CONTACT_PAGE: 'contact_page',
  ABOUT_PAGE: 'about_page',
  FILMS_PAGE: 'films_page',
  PORTFOLIO_PAGE: 'portfolio_page',
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
 * Fetch all blog posts
 */
export async function getBlogPosts(options?: {
  limit?: number;
  skip?: number;
}): Promise<BlogPost[]> {
  try {
    let query = stack
      .contentType(CONTENT_TYPES.BLOG_POST)
      .entry()
      .query();

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.skip) {
      query = query.skip(options.skip);
    }

    const result = await query.find();
    return (result.entries as BlogPost[]) || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Fetch single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const query = stack
      .contentType(CONTENT_TYPES.BLOG_POST)
      .entry()
      .query()
      .equalTo('url', `/${slug}`)
      .limit(1);

    const result = await query.find();
    const entries = result.entries as BlogPost[];
    return entries && entries.length > 0 ? entries[0] : null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
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
    blogPosts,
    aboutPageContent,
  ] = await Promise.all([
    getSiteConfig(),
    getHeroBanners(5),
    getHomepageContent(),
    getPortfolioItems({ featuredOnly: true, limit: 6 }),
    getTestimonials(4),
    getBlogPosts({ limit: 3 }),
    getAboutPageContent(),
  ]);

  return {
    siteConfig,
    heroBanners,
    homepageContent,
    portfolioItems,
    testimonials,
    blogPosts,
    aboutPageContent,
  };
}

// Export stack for advanced usage
export { stack, isPreviewMode };
export default stack;
