import { Metadata } from 'next';
import { getPackagesPageContent, getSiteConfig } from '@/lib/contentstack';
import PackagesClient from './PackagesClient';

export const metadata: Metadata = {
  title: 'Packages | Photography Sessions & Pricing',
  description: 'Explore our curated wedding, engagement, pre-wedding, maternity, and baby photography packages. Book your session and capture your special moments.',
  keywords: [
    'wedding photography packages',
    'engagement photography pricing',
    'pre-wedding shoot packages',
    'maternity photography',
    'baby photography',
    'photography pricing India',
    'wedding photographer packages',
  ],
  openGraph: {
    title: 'Photography Packages | Aamod P. Pisat Photography',
    description: 'Curated photography experiences crafted for your forever story. Wedding, engagement, pre-wedding, maternity, and baby shoot packages.',
    type: 'website',
  },
};

// Default site config when Contentstack is not connected
const defaultSiteConfig = {
  uid: 'default-config',
  title: 'Site Configuration',
  site_name: 'Aamod P. Pisat',
  site_subtitle: 'Photography',
  tagline: 'Capturing the real emotions...',
  contact_email: 'hello@aamodphotography.com',
  footer_text: '© 2025 Aamod P. Pisat Photography | All Rights Reserved',
  primary_navigation: [],
  secondary_navigation: [],
  footer_left_navigation: [],
  footer_right_navigation: [],
};

export default async function PackagesPage() {
  // Fetch data from Contentstack
  const [packagesContent, siteConfig] = await Promise.all([
    getPackagesPageContent(),
    getSiteConfig(),
  ]);

  // Use defaults if data not available
  const defaultPackagesContent = {
    uid: 'default-packages',
    title: 'Packages',
    hero_section: {
      title: 'Our Packages',
      tagline: 'Curated experiences for your forever story',
      description: 'Capturing the real emotions — because every story deserves to be remembered beautifully.',
    },
    intro_section: {
      subtitle: 'Investment in Timeless Memories',
      title: 'Tailored to Your Story',
      description: 'Every love story is different — and so is the way we capture it. From intimate ceremonies to grand celebrations, we bring emotion, artistry, and storytelling together to preserve your journey with timeless beauty.',
    },
    package_categories: [], // Will use defaults from PackagesClient
    booking_form_section: {
      title: 'Book Your Session',
      description: 'Fill out the form below to reserve your chosen package. We\'ll get back to you within 24 hours to confirm your booking.',
      submit_button_text: 'Book Session',
    },
    success_message: {
      title: 'Booking Confirmed!',
      message: 'Thank you for your booking. We\'ll reach out within 24 hours to confirm your session details.',
    },
  };

  return (
    <PackagesClient 
      content={packagesContent || defaultPackagesContent}
      siteConfig={siteConfig || defaultSiteConfig}
    />
  );
}

