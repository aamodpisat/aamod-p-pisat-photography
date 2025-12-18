import { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';
import { getPortfolioPageContent, getAssetsFromFolder } from '@/lib/contentstack';

export const metadata: Metadata = {
  title: 'Portfolio | Aamod P. Pisat Photography',
  description: 'Browse our collection of wedding photography. Moment. Memory. Miracle.',
};

// Enable ISR - revalidate every hour
export const revalidate = 3600;

// Default content when CMS is not configured
const defaultContent = {
  uid: 'default-portfolio',
  title: 'Portfolio',
  hero_section: {
    title: 'Our Portfolio',
    tagline: 'Moment. Memory. Miracle.',
  },
  gallery_section: {
    asset_folder_uid: undefined as string | undefined,
    button_text: 'More Work',
    button_link: { title: 'More Work', href: '/contact' },
  },
  cta_section: {
    title: 'Get in touch with us!',
    cta: { title: 'Contact Us', href: '/contact' },
  },
};

export default async function PortfolioPage() {
  // Fetch content from Contentstack
  const pageContent = await getPortfolioPageContent();
  
  // Use CMS content or defaults
  const content = pageContent || defaultContent;
  
  // Fetch gallery images from Asset Folder if folder UID is provided
  let galleryImages: Array<{
    uid: string;
    title: string;
    url: string;
    filename: string;
    content_type: string;
    file_size: number;
  }> = [];
  
  if (content.gallery_section?.asset_folder_uid) {
    const folderImages = await getAssetsFromFolder(content.gallery_section.asset_folder_uid);
    if (folderImages.length > 0) {
      galleryImages = folderImages;
    }
  }

  return (
    <PortfolioClient 
      content={content}
      galleryImages={galleryImages}
    />
  );
}
