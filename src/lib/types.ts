/**
 * TypeScript types for Contentstack Content Types
 * All content is fetched from Contentstack Delivery API
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

// JSON RTE (Rich Text Editor) Node type
export interface JsonRTENode {
  type: string;
  attrs?: Record<string, unknown>;
  uid?: string;
  children?: JsonRTENode[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  _version?: number;
}

// JSON RTE Document type
export interface JsonRTEDocument {
  type: 'doc';
  uid?: string;
  attrs?: Record<string, unknown>;
  children: JsonRTENode[];
  _version?: number;
}

// Rich text field can be either a string or JSON RTE document
export type RichTextField = string | JsonRTEDocument;

// Navigation Item
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Quick Link Item
export interface QuickLink {
  title: string | unknown; // Can be string or JSON RTE
  description: string | unknown; // Can be string or JSON RTE
  href: string;
  image: ContentstackAsset;
}

// Site Configuration Content Type
export interface SiteConfig {
  uid: string;
  title: string;
  site_name: string;
  site_subtitle: string;
  tagline: string;
  logo?: ContentstackAsset;
  contact_email: string;
  contact_phone?: string;
  contact_address?: string;
  instagram_url?: string;
  pinterest_url?: string;
  vimeo_url?: string;
  facebook_url?: string;
  footer_text: string;
  primary_navigation: NavItem[];
  secondary_navigation: NavItem[];
  footer_left_navigation: NavItem[];
  footer_right_navigation: NavItem[];
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

// CTA Link type for Contentstack link fields
export interface CTALink {
  title?: string;
  href?: string;
}

// Featured Banner - Group field in Homepage content type
export interface FeaturedBanner {
  tagline?: string;
  image?: ContentstackAsset;
  cta?: CTALink;
}

// Homepage Content Type (grouped schema)
export interface HomepageContent {
  uid: string;
  title: string;
  url?: string;
  // Featured Banner Section (Hero Carousel) - multiple group
  featured_banner?: FeaturedBanner[];
  // Portfolio Section (group)
  portfolio_section?: {
    title?: string;
    subtiitle?: string; // Note: typo in schema
    description?: string;
    cta?: CTALink;
    gallery_images?: ContentstackAsset[]; // Multiple images for masonry gallery
  };
  // About Section (group)
  about_section?: {
    title?: string;
    description?: string;
    image?: ContentstackAsset;
    cta?: CTALink;
    featured?: {
      label?: string;
      featured_in?: string[];
    };
  };
  // Testimonials Section (group)
  testimonials_section?: {
    title?: string;
    content?: RichTextField;
    cta?: CTALink;
  };
  // Journal Section (group)
  journal_section?: {
    title?: string;
    subtitle?: string;
    description?: RichTextField;
    cta?: CTALink;
  };
  // Contact Section (group)
  contact_section?: {
    title?: string;
    description?: string;
    cta?: CTALink;
    background_image?: ContentstackAsset;
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
  review_text: RichTextField; // Can be rich text
  client_photo?: ContentstackAsset;
  rating?: number;
  event_type?: string;
  date?: string;
}

// Blog Post Content Type
export interface BlogPost {
  uid: string;
  title: string;
  url: string;
  excerpt?: string;
  body: RichTextField; // Rich text body
  featured_image?: ContentstackAsset;
  author?: string;
  publish_date: string;
  category?: string;
  tags?: string[];
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

// Contact Page Content Type
export interface ContactPageContent {
  uid: string;
  title: string;
  url?: string;
  email?: string;
  // Banner Section (group)
  banner?: {
    title: string;
    tagline: string;
    image?: ContentstackAsset;
  };
  // Info Section (group)
  info_section?: {
    title: string;
    subtitle: string;
    info_description: string;
  };
  // Contact Details
  location: string;
  // Form Labels (group)
  form_labels?: {
    name_label?: string;
    email_label?: string;
    phone_label?: string;
    event_date_label?: string;
    event_type_label?: string;
    location_label?: string;
    how_heard_label?: string;
    message_label?: string;
    submit_button_text?: string;
  };
  event_type_options?: string[];
  referral_options?: string[];
  // Success (group)
  success?: {
    success_title?: string;
    success_message?: string;
  };
}

// About Page Content Type
export interface AboutPageContent {
  uid: string;
  title: string;
  url?: string;
  // Banner Section
  banner?: {
    title?: string;
    tagline?: string;
    image?: ContentstackAsset;
  };
  // Achievements/Awards Section
  achievements?: {
    title: string;
    subtitle?: string;
    number?: string;
    image_logo?: ContentstackAsset;
  }[];
  // Intro Section
  intro_section?: {
    greeting?: string;
    name?: string;
    tagline?: string;
    featured_content?: string; // Content rendered on homepage
    description?: RichTextField; // Full description (RTE)
    signature?: string;
    cta?: CTALink;
    image?: ContentstackAsset;
  };
  // Journey Section
  journey_section?: {
    title?: string;
    content?: RichTextField;
  };
  // Featured In Section
  featured_in?: {
    label?: string;
    brands?: string[];
  };
  // CTA Section
  cta_section?: {
    title?: string;
    cta?: CTALink;
    background_image?: ContentstackAsset;
  };
}

// Film item for Films Page
export interface Film {
  title: string;
  location?: string;
  youtube_id: string;
  description?: string;
  thumbnail?: ContentstackAsset;
  order?: number;
}

// Films Page Content Type
export interface FilmsPageContent {
  uid: string;
  title: string;
  url?: string;
  // Hero Section
  hero_section?: {
    title?: string;
    tagline?: string;
    description?: string;
    background_video_url?: string;
    fallback_image?: ContentstackAsset;
  };
  // Films Section heading
  films_section?: {
    subtitle?: string;
    title?: string;
    description?: string;
  };
  // Films list
  films?: Film[];
  // Approach Section
  approach_section?: {
    subtitle?: string;
    title?: string;
    content?: RichTextField;
  };
  // CTA Section
  cta_section?: {
    title?: string;
    description?: string;
    cta?: CTALink;
  };
}

// Portfolio Page Content Type
export interface PortfolioPageContent {
  uid: string;
  title: string;
  url?: string;
  // Hero Section
  hero_section?: {
    title?: string;
    tagline?: string;
    background_image?: ContentstackAsset;
  };
  // Gallery Section
  gallery_section?: {
    asset_folder_uid?: string;
    button_text?: string;
    button_link?: CTALink;
  };
  // CTA Section
  cta_section?: {
    title?: string;
    cta?: CTALink;
  };
}

// Page metadata
export interface PageMeta {
  title: string;
  description?: string;
  ogImage?: string;
}
