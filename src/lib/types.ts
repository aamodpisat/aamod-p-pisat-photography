/**
 * TypeScript types for Contentstack Content Types
 */

// Asset type for images/files from Contentstack
export interface ContentstackAsset {
  uid: string;
  title: string;
  url: string;
  filename: string;
  content_type: string;
  file_size: number;
  dimension?: {
    width: number;
    height: number;
  };
}

// Portfolio Item Content Type
export interface PortfolioItem {
  uid: string;
  title: string;
  description?: string;
  category: string;
  featured_image: ContentstackAsset;
  gallery_images?: ContentstackAsset[];
  location?: string;
  date?: string;
  tags?: string[];
  is_featured?: boolean;
  url?: string;
}

// Testimonial Content Type
export interface Testimonial {
  uid: string;
  client_name: string;
  client_title?: string;
  review_text: string;
  client_photo?: ContentstackAsset;
  rating?: number;
  event_type?: string;
  date?: string;
}

// Blog Post Content Type
export interface BlogPost {
  uid: string;
  title: string;
  slug: string;
  excerpt?: string;
  body: string;
  featured_image?: ContentstackAsset;
  author?: string;
  publish_date: string;
  category?: string;
  tags?: string[];
  url?: string;
}

// Service Package Content Type
export interface ServicePackage {
  uid: string;
  name: string;
  description: string;
  price?: string;
  features: string[];
  duration?: string;
  is_popular?: boolean;
  category?: string;
}

// Site Configuration Content Type
export interface SiteConfig {
  uid: string;
  site_title: string;
  tagline: string;
  about_text: string;
  about_image?: ContentstackAsset;
  hero_image?: ContentstackAsset;
  hero_video_url?: string;
  social_links?: {
    instagram?: string;
    facebook?: string;
    pinterest?: string;
    youtube?: string;
    vimeo?: string;
    twitter?: string;
  };
  contact_email?: string;
  contact_phone?: string;
  contact_address?: string;
  footer_text?: string;
}

// Hero Banner/Slide Content Type for Carousel
export interface HeroBanner {
  uid: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  image: ContentstackAsset;
  cta_text?: string;
  cta_link?: string;
  order?: number;
}

// Navigation Item
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Page metadata
export interface PageMeta {
  title: string;
  description?: string;
  ogImage?: string;
}

