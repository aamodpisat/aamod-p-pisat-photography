import Hero from '@/components/sections/Hero';
import FeaturedWork from '@/components/sections/FeaturedWork';
import AboutPreview from '@/components/sections/AboutPreview';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import JournalPreview from '@/components/sections/JournalPreview';
import QuickLinks from '@/components/sections/QuickLinks';
import ContactCTA from '@/components/sections/ContactCTA';
import {
  samplePortfolioItems,
  sampleTestimonials,
  sampleBlogPosts,
  sampleSiteConfig,
  sampleHeroBanners,
} from '@/lib/sampleData';

// Contentstack imports - uncomment when API is connected
// import { 
//   getPortfolioItems, 
//   getTestimonials, 
//   getBlogPosts, 
//   getSiteConfig,
//   getFeaturedHeroImages 
// } from '@/lib/contentstack';

export default async function HomePage() {
  // =====================================================
  // CONTENTSTACK INTEGRATION
  // =====================================================
  // When Contentstack is connected, uncomment these lines:
  //
  // const heroSlides = await getFeaturedHeroImages(5);
  // const portfolioItems = await getPortfolioItems({ limit: 8 });
  // const testimonials = await getTestimonials(4);
  // const blogPosts = await getBlogPosts({ limit: 3 });
  // const siteConfig = await getSiteConfig();
  //
  // =====================================================

  // Using sample data for development
  const heroSlides = sampleHeroBanners;
  const portfolioItems = samplePortfolioItems;
  const testimonials = sampleTestimonials;
  const blogPosts = sampleBlogPosts;
  const siteConfig = sampleSiteConfig;

  return (
    <>
      {/* Hero Carousel Section - Fetches featured images from Contentstack */}
      <Hero 
        slides={heroSlides}
        autoPlayInterval={6000} // 6 seconds per slide
      />

      {/* Featured Work / Portfolio Preview */}
      <FeaturedWork items={portfolioItems} />

      {/* About Preview */}
      <AboutPreview config={siteConfig} />

      {/* Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* Quick Links Grid */}
      <QuickLinks />

      {/* Journal Preview */}
      <JournalPreview posts={blogPosts} />

      {/* Contact CTA */}
      <ContactCTA />
    </>
  );
}
