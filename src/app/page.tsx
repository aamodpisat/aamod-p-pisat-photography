import Hero from '@/components/sections/Hero';
import PortfolioGallery from '@/components/sections/PortfolioGallery';
import AboutPreview from '@/components/sections/AboutPreview';
import StoriesPreview from '@/components/sections/StoriesPreview';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactCTA from '@/components/sections/ContactCTA';
import {
  getHomepageContent,
  getTestimonials,
  getAboutPageContent,
  getFeaturedStories,
} from '@/lib/contentstack';
import { HeroBanner, FeaturedBanner } from '@/lib/types';

// Enable ISR - revalidate every hour
export const revalidate = 3600;

// Helper function to transform FeaturedBanner to HeroBanner format
function transformFeaturedBannerToHeroBanner(banners: FeaturedBanner[]): HeroBanner[] {
  return banners
    .filter((banner) => banner.image) // Only include banners with images
    .map((banner, index) => ({
      uid: `featured-banner-${index}`,
      title: banner.image?.title || `Banner ${index + 1}`,
      tagline: banner.tagline,
      image: banner.image!, // Safe because we filtered
      cta_text: banner.cta?.title,
      cta_link: banner.cta?.href,
      order: index + 1,
    }));
}

export default async function HomePage() {
  // Fetch all data from Contentstack in parallel
  const [
    homepageContent,
    testimonials,
    aboutPageContent,
    featuredStories,
  ] = await Promise.all([
    getHomepageContent(),
    getTestimonials(4),
    getAboutPageContent(),
    getFeaturedStories(4),
  ]);

  // Get featured banners from homepage content
  const featuredBanners = homepageContent?.featured_banner || [];
  
  // Transform featured banners to HeroBanner format for the Hero component
  const heroBanners = transformFeaturedBannerToHeroBanner(featuredBanners);
  
  // Extract grouped sections with defaults
  const portfolioSection = homepageContent?.portfolio_section;
  const testimonialsSection = homepageContent?.testimonials_section;
  const contactSection = homepageContent?.contact_section;

  return (
    <>
      {/* Hero Carousel Section - All content from Contentstack */}
      <Hero 
        slides={heroBanners}
        autoPlayInterval={6000}
      />

      {/* Portfolio Gallery - Masonry Style */}
      <PortfolioGallery 
        content={{
          subtitle: portfolioSection?.subtiitle || 'Portfolio',
          title: portfolioSection?.title || 'Top 100 Wedding Photographers in India.',
          description: portfolioSection?.description || '',
          cta_text: portfolioSection?.cta?.title || 'View Full Portfolio',
          cta_link: portfolioSection?.cta?.href || '/portfolio',
        }}
        images={portfolioSection?.gallery_images || []}
      />

      {/* About Preview - Content from About Page */}
      <AboutPreview 
        content={{
          featured_label: aboutPageContent?.featured_in?.label || 'Featured In',
          featured_brands: aboutPageContent?.featured_in?.brands || [],
          title: aboutPageContent?.intro_section?.name || 'Aamod P. Pisat',
          description: aboutPageContent?.intro_section?.featured_content || '',
          image: aboutPageContent?.intro_section?.image,
          cta_text: aboutPageContent?.intro_section?.cta?.title || 'More About Me',
          cta_link: aboutPageContent?.intro_section?.cta?.href || '/about',
        }}
      />

      {/* Featured Stories - Only shows stories with is_featured: true */}
      {featuredStories.length > 0 && (
        <StoriesPreview 
          stories={featuredStories}
          content={{
            subtitle: 'Exclusive Stories',
            title: 'Featured Stories & Insights',
            description: 'Every story is unique. Here are some of our favorites.',
            cta_text: 'View All Stories',
            cta_link: '/stories',
          }}
        />
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <TestimonialsSection 
          testimonials={testimonials}
          content={{
            subtitle: typeof testimonialsSection?.content === 'string' ? testimonialsSection.content : 'Kind Words',
            title: testimonialsSection?.title || 'What Our Clients Say',
            cta_text: testimonialsSection?.cta?.title || 'Read More Testimonials',
            cta_link: testimonialsSection?.cta?.href || '/testimonials',
          }}
        />
      )}

      {/* Contact CTA */}
      <ContactCTA 
        content={{
          title: contactSection?.title || "Let's Create Something Beautiful",
          description: contactSection?.description || '',
          button_text: contactSection?.cta?.title || 'Get In Touch',
          button_link: contactSection?.cta?.href || '/contact',
          background_image: contactSection?.background_image,
        }}
      />
    </>
  );
}
