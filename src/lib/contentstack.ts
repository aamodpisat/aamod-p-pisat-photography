/**
 * Contentstack Service
 * Handles all data fetching from Contentstack Delivery API
 */

import Contentstack from '@contentstack/delivery-sdk';

// Initialize Contentstack client
const stack = Contentstack.stack({
  apiKey: process.env.CONTENTSTACK_API_KEY || '',
  deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN || '',
  environment: process.env.CONTENTSTACK_ENVIRONMENT || 'production',
  region: (process.env.CONTENTSTACK_REGION as 'us' | 'eu' | 'azure-na' | 'azure-eu') || 'us',
});

// Content Type UIDs
export const CONTENT_TYPES = {
  PORTFOLIO_ITEM: 'portfolio_item',
  TESTIMONIAL: 'testimonial',
  BLOG_POST: 'blog_post',
  SERVICE_PACKAGE: 'service_package',
  SITE_CONFIG: 'site_config',
  HERO_BANNER: 'hero_banner',
} as const;

/**
 * Fetch featured items for hero carousel
 * Returns portfolio items marked as featured, or items from hero_banner content type
 */
export async function getFeaturedHeroImages(limit: number = 5) {
  try {
    // First try to fetch from dedicated hero_banner content type
    const heroResult = await stack
      .contentType(CONTENT_TYPES.HERO_BANNER)
      .entry()
      .query()
      .orderByAscending('order')
      .limit(limit)
      .find();

    if (heroResult.entries && heroResult.entries.length > 0) {
      return heroResult.entries;
    }

    // Fallback to featured portfolio items if no hero_banner entries exist
    const portfolioResult = await stack
      .contentType(CONTENT_TYPES.PORTFOLIO_ITEM)
      .entry()
      .query()
      .where('is_featured', Contentstack.QueryOperation.EQUALS, true)
      .limit(limit)
      .find();

    return portfolioResult.entries || [];
  } catch (error) {
    console.error('Error fetching hero images:', error);
    return [];
  }
}

/**
 * Fetch all portfolio items
 */
export async function getPortfolioItems(options?: {
  category?: string;
  limit?: number;
  skip?: number;
}) {
  try {
    let query = stack
      .contentType(CONTENT_TYPES.PORTFOLIO_ITEM)
      .entry()
      .query();

    if (options?.category) {
      query = query.where('category', Contentstack.QueryOperation.EQUALS, options.category);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.skip) {
      query = query.skip(options.skip);
    }

    const result = await query.find();
    return result.entries || [];
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    return [];
  }
}

/**
 * Fetch single portfolio item by UID
 */
export async function getPortfolioItemByUid(uid: string) {
  try {
    const entry = await stack
      .contentType(CONTENT_TYPES.PORTFOLIO_ITEM)
      .entry(uid)
      .fetch();
    return entry;
  } catch (error) {
    console.error('Error fetching portfolio item:', error);
    return null;
  }
}

/**
 * Fetch all testimonials
 */
export async function getTestimonials(limit?: number) {
  try {
    let query = stack
      .contentType(CONTENT_TYPES.TESTIMONIAL)
      .entry()
      .query();

    if (limit) {
      query = query.limit(limit);
    }

    const result = await query.find();
    return result.entries || [];
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
}) {
  try {
    let query = stack
      .contentType(CONTENT_TYPES.BLOG_POST)
      .entry()
      .query()
      .orderByDescending('publish_date');

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.skip) {
      query = query.skip(options.skip);
    }

    const result = await query.find();
    return result.entries || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Fetch single blog post by slug
 */
export async function getBlogPostBySlug(slug: string) {
  try {
    const query = stack
      .contentType(CONTENT_TYPES.BLOG_POST)
      .entry()
      .query()
      .where('url', Contentstack.QueryOperation.EQUALS, `/${slug}`);

    const result = await query.findOne();
    return result.entry || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

/**
 * Fetch all service packages
 */
export async function getServicePackages() {
  try {
    const result = await stack
      .contentType(CONTENT_TYPES.SERVICE_PACKAGE)
      .entry()
      .query()
      .find();
    return result.entries || [];
  } catch (error) {
    console.error('Error fetching service packages:', error);
    return [];
  }
}

/**
 * Fetch site configuration
 */
export async function getSiteConfig() {
  try {
    const result = await stack
      .contentType(CONTENT_TYPES.SITE_CONFIG)
      .entry()
      .query()
      .findOne();
    return result.entry || null;
  } catch (error) {
    console.error('Error fetching site config:', error);
    return null;
  }
}

/**
 * Get all portfolio categories
 */
export async function getPortfolioCategories() {
  try {
    const items = await getPortfolioItems();
    const categories = [...new Set(items.map((item: any) => item.category))];
    return categories.filter(Boolean);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default stack;

