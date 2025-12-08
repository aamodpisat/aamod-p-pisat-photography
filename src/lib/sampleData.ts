/**
 * Sample Data for Development
 * This data is used until Contentstack API is connected
 */

import { PortfolioItem, Testimonial, BlogPost, ServicePackage, SiteConfig, HeroBanner } from './types';

// Sample Site Configuration
export const sampleSiteConfig: SiteConfig = {
  uid: 'site-config-1',
  site_title: 'Aamod P. Pisat Photography',
  tagline: 'Capturing the real emotions...',
  about_text: `My approach to photography is deeply rooted in capturing authentic moments—the quiet glances, the unscripted laughter, the raw emotions that make your story uniquely yours. I believe that the most powerful photographs are those that feel lived-in, not posed.

With a background in fine art and a passion for documentary storytelling, I blend cinematic aesthetics with genuine human connection. Whether it's a grand destination wedding or an intimate elopement beneath ancient trees, my goal is to preserve the essence of your day in a way that feels timeless.

Every couple has a story worth telling. Let me help you tell yours.`,
  social_links: {
    instagram: 'https://instagram.com/aamodphotography',
    pinterest: 'https://pinterest.com/aamodphotography',
    vimeo: 'https://vimeo.com/aamodphotography',
  },
  contact_email: 'hello@aamodphotography.com',
  footer_text: '© 2025 Aamod P. Pisat Photography | All Rights Reserved',
};

// Sample Portfolio Items
export const samplePortfolioItems: PortfolioItem[] = [
  {
    uid: 'portfolio-1',
    title: 'Sarah & James — Tuscany',
    description: 'An intimate ceremony beneath Tuscan cypress trees, where time seemed to stand still.',
    category: 'Weddings',
    featured_image: {
      uid: 'img-1',
      title: 'Tuscany Wedding',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
      filename: 'tuscany-wedding.jpg',
      content_type: 'image/jpeg',
      file_size: 245000,
    },
    location: 'Tuscany, Italy',
    date: '2024-09-15',
    is_featured: true,
  },
  {
    uid: 'portfolio-2',
    title: 'Maya & Oliver — Big Sur',
    description: 'Cliffside vows overlooking the endless Pacific.',
    category: 'Elopements',
    featured_image: {
      uid: 'img-2',
      title: 'Big Sur Elopement',
      url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=80',
      filename: 'big-sur.jpg',
      content_type: 'image/jpeg',
      file_size: 312000,
    },
    location: 'Big Sur, California',
    date: '2024-08-22',
    is_featured: true,
  },
  {
    uid: 'portfolio-3',
    title: 'Elena & Marcus — Morocco',
    description: 'A celebration of love amidst the magic of Marrakech.',
    category: 'Destination',
    featured_image: {
      uid: 'img-3',
      title: 'Morocco Wedding',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80',
      filename: 'morocco.jpg',
      content_type: 'image/jpeg',
      file_size: 289000,
    },
    location: 'Marrakech, Morocco',
    date: '2024-07-10',
    is_featured: true,
  },
  {
    uid: 'portfolio-4',
    title: 'Anna & David — Scottish Highlands',
    description: 'Whispered promises in the misty Highlands.',
    category: 'Elopements',
    featured_image: {
      uid: 'img-4',
      title: 'Scottish Highlands',
      url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80',
      filename: 'scotland.jpg',
      content_type: 'image/jpeg',
      file_size: 276000,
    },
    location: 'Isle of Skye, Scotland',
    date: '2024-06-05',
    is_featured: false,
  },
  {
    uid: 'portfolio-5',
    title: 'Luna & Sebastian — Iceland',
    description: 'Adventure elopement beneath the Northern Lights.',
    category: 'Elopements',
    featured_image: {
      uid: 'img-5',
      title: 'Iceland Elopement',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
      filename: 'iceland.jpg',
      content_type: 'image/jpeg',
      file_size: 298000,
    },
    location: 'Reykjavik, Iceland',
    date: '2024-03-18',
    is_featured: true,
  },
  {
    uid: 'portfolio-6',
    title: 'Grace & Noah — Provence',
    description: 'Lavender fields and golden hour magic.',
    category: 'Engagements',
    featured_image: {
      uid: 'img-6',
      title: 'Provence Engagement',
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80',
      filename: 'provence.jpg',
      content_type: 'image/jpeg',
      file_size: 254000,
    },
    location: 'Provence, France',
    date: '2024-05-28',
    is_featured: false,
  },
  {
    uid: 'portfolio-7',
    title: 'Priya & Arun — Jaipur',
    description: 'A vibrant celebration of tradition and love.',
    category: 'Weddings',
    featured_image: {
      uid: 'img-7',
      title: 'Jaipur Wedding',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=80',
      filename: 'jaipur.jpg',
      content_type: 'image/jpeg',
      file_size: 332000,
    },
    location: 'Jaipur, India',
    date: '2024-02-14',
    is_featured: true,
  },
  {
    uid: 'portfolio-8',
    title: 'Emma & Liam — New Zealand',
    description: 'Epic landscapes for an epic love story.',
    category: 'Destination',
    featured_image: {
      uid: 'img-8',
      title: 'New Zealand Wedding',
      url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=80',
      filename: 'newzealand.jpg',
      content_type: 'image/jpeg',
      file_size: 287000,
    },
    location: 'Queenstown, New Zealand',
    date: '2024-01-20',
    is_featured: false,
  },
];

// Sample Testimonials
export const sampleTestimonials: Testimonial[] = [
  {
    uid: 'testimonial-1',
    client_name: 'Sarah & James',
    client_title: 'Tuscany, Italy',
    review_text: `Working with Aamod was like having a dear friend by our side on the most important day of our lives. He has this incredible ability to disappear into the background while somehow capturing every meaningful moment. The photos feel like memories we're reliving, not poses we were asked to hold.`,
    event_type: 'Wedding',
    rating: 5,
  },
  {
    uid: 'testimonial-2',
    client_name: 'Maya & Oliver',
    client_title: 'Big Sur, California',
    review_text: `Our elopement was spontaneous and wild, just the two of us on a cliff edge with the Pacific roaring below. Aamod made us feel completely at ease, and the images he created are beyond anything we could have imagined. Raw, romantic, and utterly timeless.`,
    event_type: 'Elopement',
    rating: 5,
  },
  {
    uid: 'testimonial-3',
    client_name: 'Elena & Marcus',
    client_title: 'Marrakech, Morocco',
    review_text: `From the moment we met Aamod, we knew he understood our vision. He captured not just what our wedding looked like, but how it felt—the warmth, the joy, the tiny moments that made the day ours. Every image tells a story.`,
    event_type: 'Destination Wedding',
    rating: 5,
  },
  {
    uid: 'testimonial-4',
    client_name: 'Priya & Arun',
    client_title: 'Jaipur, India',
    review_text: `Our three-day wedding celebration was filled with color, tradition, and chaos—in the best way possible. Aamod navigated every ceremony with grace and captured the essence of our culture beautifully. These photos are now family treasures.`,
    event_type: 'Traditional Wedding',
    rating: 5,
  },
];

// Sample Blog Posts
export const sampleBlogPosts: BlogPost[] = [
  {
    uid: 'blog-1',
    title: 'The Art of Golden Hour: Why Timing Matters',
    slug: 'art-of-golden-hour',
    excerpt: 'That magical hour before sunset when light becomes liquid gold—here\'s why we plan entire timelines around it.',
    body: `# The Art of Golden Hour

That magical hour before sunset transforms everything it touches. The light softens, shadows lengthen, and colors take on a warmth that no filter can replicate.

## Why Golden Hour Matters

In photography, we often say that light is everything. During golden hour, the sun sits low on the horizon, creating a diffused, directional light that wraps around subjects beautifully...`,
    featured_image: {
      uid: 'blog-img-1',
      title: 'Golden Hour',
      url: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=1200&q=80',
      filename: 'golden-hour.jpg',
      content_type: 'image/jpeg',
      file_size: 198000,
    },
    author: 'Aamod P. Pisat',
    publish_date: '2024-10-15',
    category: 'Photography Tips',
  },
  {
    uid: 'blog-2',
    title: 'Why Eloping Might Be Your Best Decision',
    slug: 'why-eloping-best-decision',
    excerpt: 'Forget the stress of traditional weddings. Here\'s why more couples are choosing intimate elopements.',
    body: `# Why Eloping Might Be Your Best Decision

The traditional wedding industry would have you believe that bigger is better. But what if the most meaningful celebration of your love was also the most intimate?

## The Rise of Intentional Elopements

Modern elopements aren't about running away—they're about running toward what matters most...`,
    featured_image: {
      uid: 'blog-img-2',
      title: 'Elopement',
      url: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=1200&q=80',
      filename: 'elopement.jpg',
      content_type: 'image/jpeg',
      file_size: 215000,
    },
    author: 'Aamod P. Pisat',
    publish_date: '2024-09-28',
    category: 'Wedding Planning',
  },
  {
    uid: 'blog-3',
    title: 'Behind the Lens: Our Favorite Destination Weddings',
    slug: 'favorite-destination-weddings',
    excerpt: 'A journey through some of the most breathtaking locations where we\'ve had the honor to capture love stories.',
    body: `# Behind the Lens: Our Favorite Destination Weddings

Every destination wedding is a journey—not just for the couple, but for everyone involved in bringing their vision to life.

## Tuscany: Where Time Stands Still

The rolling hills, the ancient villas, the way the afternoon light filters through cypress trees...`,
    featured_image: {
      uid: 'blog-img-3',
      title: 'Destination Wedding',
      url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=80',
      filename: 'destination.jpg',
      content_type: 'image/jpeg',
      file_size: 234000,
    },
    author: 'Aamod P. Pisat',
    publish_date: '2024-09-10',
    category: 'Stories',
  },
  {
    uid: 'blog-4',
    title: 'Creating Your Wedding Day Timeline',
    slug: 'creating-wedding-day-timeline',
    excerpt: 'How to structure your day for beautiful photos without sacrificing precious moments with loved ones.',
    body: `# Creating Your Wedding Day Timeline

One of the most common questions I receive: "How much time do we need for photos?" The answer isn't simple, but it's important.

## The Philosophy Behind Our Timelines

I believe in working with your day, not against it. The best photos happen when you're relaxed, present, and enjoying your celebration...`,
    featured_image: {
      uid: 'blog-img-4',
      title: 'Wedding Timeline',
      url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=80',
      filename: 'timeline.jpg',
      content_type: 'image/jpeg',
      file_size: 189000,
    },
    author: 'Aamod P. Pisat',
    publish_date: '2024-08-25',
    category: 'Wedding Planning',
  },
];

// Sample Service Packages
export const sampleServicePackages: ServicePackage[] = [
  {
    uid: 'service-1',
    name: 'Intimate Elopement',
    description: 'Perfect for couples seeking an intimate, adventure-focused experience.',
    price: 'Starting at $3,500',
    features: [
      '4 hours of coverage',
      'Unlimited locations',
      'Online gallery with download',
      '300+ edited images',
      'Timeline planning assistance',
      'Location scouting',
    ],
    duration: '4 hours',
    category: 'Elopement',
  },
  {
    uid: 'service-2',
    name: 'Full Day Wedding',
    description: 'Comprehensive coverage for your complete wedding celebration.',
    price: 'Starting at $6,500',
    features: [
      '10 hours of coverage',
      'Second photographer included',
      'Engagement session',
      'Online gallery with download',
      '600+ edited images',
      'Timeline consultation',
      'Premium editing',
    ],
    duration: '10 hours',
    is_popular: true,
    category: 'Wedding',
  },
  {
    uid: 'service-3',
    name: 'Destination Collection',
    description: 'For love stories that span continents and cultures.',
    price: 'Starting at $10,000',
    features: [
      'Multi-day coverage',
      'Second photographer included',
      'Pre-wedding session',
      'Travel included (select locations)',
      '1000+ edited images',
      'Cinematic highlight film',
      'Heirloom album design',
      'Location scouting trip',
    ],
    duration: '2-3 days',
    category: 'Destination',
  },
];

// Portfolio Categories
export const portfolioCategories = [
  'All',
  'Weddings',
  'Elopements',
  'Destination',
  'Engagements',
];

// Sample Hero Banner Slides for Carousel
export const sampleHeroBanners: HeroBanner[] = [
  {
    uid: 'hero-1',
    title: 'Fine Art, Documentary',
    subtitle: '& Destination Wedding Photography',
    tagline: 'Captured just the way you lived it.',
    image: {
      uid: 'hero-img-1',
      title: 'Tuscany Wedding',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80',
      filename: 'tuscany-hero.jpg',
      content_type: 'image/jpeg',
      file_size: 450000,
    },
    cta_text: 'View Our Work',
    cta_link: '/portfolio',
    order: 1,
  },
  {
    uid: 'hero-2',
    title: 'Raw, Timeless',
    subtitle: 'Nostalgic & Cinematic',
    tagline: 'Storytelling for kindred souls.',
    image: {
      uid: 'hero-img-2',
      title: 'Big Sur Elopement',
      url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920&q=80',
      filename: 'bigsur-hero.jpg',
      content_type: 'image/jpeg',
      file_size: 420000,
    },
    cta_text: 'Explore Elopements',
    cta_link: '/portfolio?category=Elopements',
    order: 2,
  },
  {
    uid: 'hero-3',
    title: 'Adventure Awaits',
    subtitle: 'Destination Weddings Worldwide',
    tagline: 'Your love story, any destination.',
    image: {
      uid: 'hero-img-3',
      title: 'Iceland Adventure',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80',
      filename: 'iceland-hero.jpg',
      content_type: 'image/jpeg',
      file_size: 380000,
    },
    cta_text: 'Plan Your Adventure',
    cta_link: '/services',
    order: 3,
  },
  {
    uid: 'hero-4',
    title: 'Intimate Moments',
    subtitle: 'Authentically Preserved',
    tagline: 'The quiet glances, the unscripted laughter.',
    image: {
      uid: 'hero-img-4',
      title: 'Intimate Wedding',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80',
      filename: 'intimate-hero.jpg',
      content_type: 'image/jpeg',
      file_size: 410000,
    },
    cta_text: 'Contact Us',
    cta_link: '/contact',
    order: 4,
  },
  {
    uid: 'hero-5',
    title: 'Timeless Elegance',
    subtitle: 'Cinematic Wedding Films',
    tagline: 'Moments that move you.',
    image: {
      uid: 'hero-img-5',
      title: 'Cinematic Wedding',
      url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1920&q=80',
      filename: 'cinematic-hero.jpg',
      content_type: 'image/jpeg',
      file_size: 395000,
    },
    cta_text: 'Watch Our Films',
    cta_link: '/films',
    order: 5,
  },
];

