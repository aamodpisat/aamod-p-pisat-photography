'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { PackagesPageContent, PackageCategory, PackageItem, SiteConfig } from '@/lib/types';
import { ImagePresets } from '@/lib/image-utils';

interface PackagesClientProps {
  content: PackagesPageContent;
  siteConfig: SiteConfig;
}

// Default package data based on PDF
const defaultPackageCategories: PackageCategory[] = [
  {
    category_id: 'engagement',
    category_name: 'Engagement',
    category_tagline: 'Moments that Begin the Story',
    icon: 'ring',
    packages: [
      {
        package_name: 'The First Frame',
        price: 'INR 9,999/-',
        features: [
          'Traditional Photography',
          '11 premium edited photos',
          'Online gallery access with all sorted and edited photos'
        ],
        is_popular: false
      },
      {
        package_name: 'Serene Moments',
        price: 'INR 18,999/-',
        features: [
          'Traditional Candid Photography',
          '15 premium edited photos',
          'Online gallery access with all sorted and edited photos'
        ],
        is_popular: false
      },
      {
        package_name: 'Radiant Hearts',
        price: 'INR 20,999/-',
        features: [
          'Traditional Photography',
          'Traditional Full video coverage',
          '5 ~ 7 minutes video highlights',
          '11 premium edited photos',
          'Online gallery access with all sorted and edited photos'
        ],
        is_popular: false
      },
      {
        package_name: 'Soul Promise',
        price: 'INR 24,999/-',
        features: [
          'Traditional Photography',
          'Cinematic video highlights',
          '~1 min video teaser',
          '11 premium edited photos',
          'Online gallery access with all sorted and edited photos'
        ],
        is_popular: true,
        badge_text: 'Popular'
      },
      {
        package_name: 'Forever in Motion',
        price: 'INR 29,999/-',
        features: [
          'Traditional Candid Photography',
          'Full video coverage',
          '5 ~ 7 minutes video highlights',
          '15 premium edited photos',
          'Online gallery access with all sorted and edited photos'
        ],
        is_popular: false
      },
      {
        package_name: 'Unwritten Vows',
        price: 'INR 34,999/-',
        features: [
          'Traditional Candid Photography',
          'Cinematic video highlights',
          '15 premium edited photos',
          'Online gallery access with all sorted and edited photos'
        ],
        is_popular: false
      }
    ]
  },
  {
    category_id: 'wedding',
    category_name: 'Wedding',
    category_tagline: 'Stories of Love in Motion',
    icon: 'heart',
    packages: [
      {
        package_name: 'Forever Frame',
        price: 'INR 29,999/-',
        features: [
          'Traditional Photography',
          'Full traditional video coverage',
          '5 ~ 7 minutes video highlights',
          '15 premium edited photos',
          'Online gallery access with all sorted and edited photos'
        ],
        is_popular: false
      },
      {
        package_name: 'Cinematic Bliss',
        price: 'INR 37,999/-',
        features: [
          'Traditional Photography',
          'Cinematic Video Highlight',
          '1 minute video teaser and 1 reel',
          '15 premium edited photos',
          'Online gallery access with all sorted and edited photos'
        ],
        is_popular: false
      },
      {
        package_name: 'Hearts in Harmony',
        price: 'INR 44,999/-',
        features: [
          'Traditional Candid Photography',
          'Full traditional video coverage',
          '5 ~ 7 minutes video highlights',
          'Online gallery access with all sorted and edited photos'
        ],
        is_popular: false
      },
      {
        package_name: 'The Royal Chapter',
        price: 'INR 54,999/-',
        features: [
          'Traditional Candid Photography',
          'Cinematic video highlights',
          '1 minute video teaser and 1 reel',
          '21 premium edited photos',
          'Online gallery access with all sorted and edited photos'
        ],
        is_popular: true,
        badge_text: 'Most Popular'
      },
      {
        package_name: 'Timeless Symphony',
        price: 'INR 69,999/-',
        features: [
          'Traditional Candid Photography',
          'Full traditional video coverage',
          'Cinematic video highlights',
          '1 minute video teaser, 2 min video trailer, 2 reels',
          '21 premium edited photos',
          'Online gallery access with all sorted and edited photos'
        ],
        is_popular: false,
        badge_text: 'Premium'
      }
    ]
  },
  {
    category_id: 'pre-wedding',
    category_name: 'Pre-Wedding',
    category_tagline: 'Before the Forever',
    icon: 'camera',
    packages: [
      {
        package_name: 'Before the Vows',
        price: 'INR 11,999/-',
        features: [
          'Traditional Photography',
          '11 premium edited photos'
        ],
        is_popular: false
      },
      {
        package_name: 'The Story Unfolds',
        price: 'INR 23,999/-',
        features: [
          'Premium Photography',
          '18 premium edited photos'
        ],
        is_popular: true,
        badge_text: 'Best Value'
      },
      {
        package_name: 'Moments in Motion',
        price: 'INR 37,999/-',
        features: [
          'Traditional Photography',
          'Cinematic video highlights',
          '3 reels and 1 video teaser',
          '11 premium edited photos'
        ],
        is_popular: false
      },
      {
        package_name: 'Endless Beginnings',
        price: 'INR 49,999/-',
        features: [
          'Premium Photography',
          'Cinematic video highlights',
          '3 reels and 1 video teaser',
          '11 premium edited photos'
        ],
        is_popular: false,
        badge_text: 'Premium'
      }
    ]
  },
  {
    category_id: 'maternity',
    category_name: 'Maternity',
    category_tagline: 'Celebrating New Beginnings',
    icon: 'baby',
    packages: [
      {
        package_name: 'Glow & Grace',
        price: 'INR 8,999/-',
        features: [
          'Traditional Photography',
          '8 premium edited photos',
          'Online gallery access'
        ],
        is_popular: false
      },
      {
        package_name: 'Tender Bloom',
        price: 'INR 14,999/-',
        features: [
          'Premium Candid Photography',
          '12 premium edited photos',
          'Outfit change assistance',
          'Online gallery access'
        ],
        is_popular: true,
        badge_text: 'Popular'
      },
      {
        package_name: 'Radiant Journey',
        price: 'INR 22,999/-',
        features: [
          'Premium Photography',
          'Short cinematic video highlight',
          '15 premium edited photos',
          'Props and styling assistance',
          'Online gallery access'
        ],
        is_popular: false
      }
    ]
  },
  {
    category_id: 'baby-shoot',
    category_name: 'Baby Shoot',
    category_tagline: 'Tiny Moments, Big Memories',
    icon: 'star',
    packages: [
      {
        package_name: 'Little Wonder',
        price: 'INR 7,999/-',
        features: [
          'Traditional Photography',
          '8 premium edited photos',
          'Basic props included',
          'Online gallery access'
        ],
        is_popular: false
      },
      {
        package_name: 'Bundle of Joy',
        price: 'INR 12,999/-',
        features: [
          'Candid Photography',
          '12 premium edited photos',
          'Theme-based props',
          'Outfit changes',
          'Online gallery access'
        ],
        is_popular: true,
        badge_text: 'Best Seller'
      },
      {
        package_name: 'First Year Journey',
        price: 'INR 34,999/-',
        features: [
          'Premium Photography (4 sessions)',
          'Newborn, 3 months, 6 months, 1 year',
          '10 premium photos per session',
          'Custom props for each milestone',
          'Exclusive online gallery'
        ],
        is_popular: false,
        badge_text: 'Best Value'
      }
    ]
  }
];

// Category icons
const CategoryIcon = ({ icon, className = '' }: { icon?: string; className?: string }) => {
  switch (icon) {
    case 'ring':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="5" />
        </svg>
      );
    case 'heart':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case 'camera':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      );
    case 'baby':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="8" r="5" />
          <path d="M20 21a8 8 0 1 0-16 0" />
        </svg>
      );
    case 'star':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};

export default function PackagesClient({ content, siteConfig }: PackagesClientProps) {
  const categories = content?.package_categories?.length > 0 
    ? content.package_categories 
    : defaultPackageCategories;
  
  const [activeCategory, setActiveCategory] = useState(categories[0]?.category_id || 'engagement');
  const [selectedPackage, setSelectedPackage] = useState<{ category: PackageCategory; package: PackageItem } | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const bookingRef = useRef<HTMLDivElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    location: '',
    additionalRequests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectPackage = (category: PackageCategory, pkg: PackageItem) => {
    setSelectedPackage({ category, package: pkg });
    setShowBookingForm(true);
    setTimeout(() => {
      bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          eventType: selectedPackage?.category.category_name || 'Package Booking',
          message: `Package Selected: ${selectedPackage?.package.package_name} (${selectedPackage?.package.price})\n\nCategory: ${selectedPackage?.category.category_name}\n\nAdditional Requests:\n${formData.additionalRequests}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setBookingId(data.inquiryId);
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventDate: '',
          location: '',
          additionalRequests: '',
        });
      } else {
        setSubmitError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetBooking = () => {
    setIsSubmitted(false);
    setSelectedPackage(null);
    setShowBookingForm(false);
    setBookingId(null);
  };

  const activePackages = categories.find(c => c.category_id === activeCategory)?.packages || [];
  const activeCategoryData = categories.find(c => c.category_id === activeCategory);

  const inputClasses =
    'w-full px-5 py-4 bg-white border border-charcoal-200 text-charcoal-800 placeholder-charcoal-400 focus:outline-none focus:border-sepia-500 focus:ring-1 focus:ring-sepia-500 transition-all duration-300';
  const labelClasses = 'block text-caption uppercase tracking-widest text-charcoal-600 mb-2';

  // Extract content sections with defaults
  const heroSection = content?.hero_section || {
    title: 'Our Packages',
    tagline: 'Curated experiences for your forever story',
    description: '',
    background_image: null
  };

  const introSection = content?.intro_section || {
    subtitle: 'Packages & Pricing',
    title: 'Tailored to Your Story',
    description: 'Every love story is unique, and your coverage should be too. Choose from our carefully crafted packages or let us create something custom for you.'
  };

  const bookingFormSection = content?.booking_form_section || {
    title: 'Book Your Session',
    description: 'Fill out the form below to reserve your chosen package. We\'ll get back to you within 24 hours to confirm your booking.',
    submit_button_text: 'Book Session'
  };

  const successMessage = content?.success_message || {
    title: 'Booking Confirmed!',
    message: 'Thank you for your booking. We\'ll reach out within 24 hours to confirm your session details.'
  };

  const termsConditions = content?.terms_conditions || [
    'Album Pricing: Albums start at INR 15,999/-, subject to customization based on album size, design preferences, and the total number of photos selected.',
    'Packages Pricing: All the prices mentioned above are on a per-day basis.',
    'Extra Events: Any additional events beyond the agreed scope will be billed separately as per the applicable rates.',
    'Premium Edits: Additional premium-edited photos will be charged at INR 150/- per photo.',
    'Reel Videos: Additional reel video requests will be charged at INR 1,500/- per reel.',
    'Travel & Stay: Transportation and accommodation charges are not included and will be billed separately (if applicable).',
    'Wedding Night Coverage: Coverage for the wedding night will be charged at double the standard rate.'
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={ImagePresets.hero(heroSection.background_image?.url || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')}
            alt={heroSection.title || 'Packages'}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/40 via-charcoal-900/50 to-charcoal-900/60" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-display text-cream-100 mb-4"
          >
            {heroSection.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-script text-3xl md:text-4xl text-sepia-300"
          >
            {heroSection.tagline}
          </motion.p>
          {heroSection.description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-cream-200 mt-4 max-w-2xl mx-auto"
            >
              {heroSection.description}
            </motion.p>
          )}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-wide">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <p className="text-caption uppercase tracking-[0.3em] text-sepia-600 mb-4">
              {introSection.subtitle}
            </p>
            <h2 className="font-serif text-heading-lg text-charcoal-900 mb-6">
              {introSection.title}
            </h2>
            <p className="text-body-lg text-charcoal-600 font-light">
              {introSection.description}
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.category_id}
                onClick={() => setActiveCategory(category.category_id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full transition-all duration-500 group ${
                  activeCategory === category.category_id
                    ? 'bg-charcoal-900 text-cream-100 shadow-lg scale-105'
                    : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200 border border-charcoal-200'
                }`}
              >
                <CategoryIcon 
                  icon={category.icon} 
                  className={`w-5 h-5 transition-colors ${
                    activeCategory === category.category_id ? 'text-sepia-400' : 'text-sepia-600'
                  }`} 
                />
                <span className="text-caption uppercase tracking-wider font-medium">
                  {category.category_name}
                </span>
                {activeCategory === category.category_id && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 bg-charcoal-900 rounded-full -z-10"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Category Tagline */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-12"
            >
              <p className="font-script text-3xl md:text-4xl text-sepia-600">
                "{activeCategoryData?.category_tagline}"
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Packages Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {activePackages.map((pkg, index) => (
                <motion.article
                  key={pkg.package_name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative bg-white rounded-lg overflow-hidden group transition-all duration-500 hover:shadow-2xl ${
                    pkg.is_popular
                      ? 'ring-2 ring-sepia-500 shadow-xl md:-mt-4 md:mb-4'
                      : 'border border-charcoal-100 shadow-md hover:border-sepia-300'
                  }`}
                >
                  {/* Badge */}
                  {pkg.badge_text && (
                    <div className="absolute top-0 right-0 z-10">
                      <div className={`${
                        pkg.is_popular ? 'bg-sepia-600' : 'bg-charcoal-800'
                      } text-cream-100 text-xs uppercase tracking-widest px-4 py-2 rounded-bl-lg`}>
                        {pkg.badge_text}
                      </div>
                    </div>
                  )}

                  <div className="p-6 md:p-8">
                    {/* Package Name */}
                    <div className="text-center mb-6 pb-6 border-b border-charcoal-100">
                      <h3 className="font-serif text-xl md:text-2xl text-charcoal-900 mb-3">
                        {pkg.package_name}
                      </h3>
                      <p className="font-serif text-2xl md:text-3xl text-sepia-600 font-medium">
                        {pkg.price}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-charcoal-700">
                          <svg
                            className="w-5 h-5 text-sepia-500 mr-3 mt-0.5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleSelectPackage(activeCategoryData!, pkg)}
                      className={`w-full py-4 px-6 rounded transition-all duration-300 text-caption uppercase tracking-widest font-medium ${
                        pkg.is_popular
                          ? 'bg-sepia-600 text-cream-100 hover:bg-sepia-700'
                          : 'bg-charcoal-900 text-cream-100 hover:bg-charcoal-800'
                      }`}
                    >
                      Select Package
                    </button>
                  </div>

                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-sepia-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Terms & Conditions Section */}
      <section className="py-16 md:py-20 bg-cream-50">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h3 className="font-serif text-heading text-charcoal-900 mb-4">
              Terms & Conditions
            </h3>
            <p className="text-charcoal-600">
              Please read carefully before booking
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-lg p-6 md:p-8 shadow-sm"
          >
            <ul className="space-y-4">
              {termsConditions.map((term, index) => (
                <li key={index} className="flex items-start text-charcoal-700">
                  <span className="w-6 h-6 bg-sepia-100 text-sepia-700 rounded-full flex items-center justify-center text-sm font-medium mr-4 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-sm leading-relaxed">{term}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Booking Form Section */}
      <AnimatePresence>
        {showBookingForm && (
          <motion.section
            ref={bookingRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="py-16 md:py-24 bg-white overflow-hidden"
          >
            <div className="container-wide">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Left - Selected Package Info */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <p className="text-caption uppercase tracking-[0.2em] text-sepia-600 mb-4">
                    Selected Package
                  </p>
                  <h2 className="font-serif text-heading-lg text-charcoal-900 mb-6">
                    {selectedPackage?.package.package_name}
                  </h2>
                  
                  <div className="bg-cream-50 rounded-lg p-6 mb-8">
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-cream-200">
                      <span className="text-charcoal-600">Category</span>
                      <span className="font-medium text-charcoal-900">{selectedPackage?.category.category_name}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-cream-200">
                      <span className="text-charcoal-600">Price</span>
                      <span className="font-serif text-xl text-sepia-600 font-medium">{selectedPackage?.package.price}</span>
                    </div>
                    <div>
                      <span className="text-charcoal-600 block mb-3">Includes:</span>
                      <ul className="space-y-2">
                        {selectedPackage?.package.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-charcoal-700 text-sm">
                            <svg className="w-4 h-4 text-sepia-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowBookingForm(false);
                      setSelectedPackage(null);
                    }}
                    className="text-charcoal-600 hover:text-sepia-600 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Choose a different package
                  </button>
                </motion.div>

                {/* Right - Booking Form */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {isSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-sepia-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg
                          className="w-10 h-10 text-sepia-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="font-serif text-2xl text-charcoal-900 mb-4">
                        {successMessage.title}
                      </h3>
                      <p className="text-charcoal-600 mb-8">
                        {successMessage.message}
                      </p>
                      {bookingId && (
                        <div className="bg-charcoal-900 text-cream-100 py-6 px-8 rounded-lg inline-block mb-8">
                          <p className="text-xs uppercase tracking-widest text-sepia-400 mb-2">
                            Your Reference Number
                          </p>
                          <p className="font-serif text-2xl tracking-wider">
                            {bookingId}
                          </p>
                        </div>
                      )}
                      <div>
                        <button
                          onClick={resetBooking}
                          className="text-sepia-600 hover:text-sepia-700 transition-colors font-medium"
                        >
                          Book Another Session →
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <>
                      <h3 className="font-serif text-heading text-charcoal-900 mb-4">
                        {bookingFormSection.title}
                      </h3>
                      <p className="text-charcoal-600 mb-8">
                        {bookingFormSection.description}
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="name" className={labelClasses}>
                              Full Name *
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              className={inputClasses}
                              placeholder="Your name"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className={labelClasses}>
                              Email *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              className={inputClasses}
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="phone" className={labelClasses}>
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              required
                              value={formData.phone}
                              onChange={handleChange}
                              className={inputClasses}
                              placeholder="+91 XXXXX XXXXX"
                            />
                          </div>
                          <div>
                            <label htmlFor="eventDate" className={labelClasses}>
                              Preferred Date
                            </label>
                            <input
                              type="date"
                              id="eventDate"
                              name="eventDate"
                              value={formData.eventDate}
                              onChange={handleChange}
                              className={inputClasses}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="location" className={labelClasses}>
                            Event Location
                          </label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="City, Venue (if known)"
                          />
                        </div>

                        <div>
                          <label htmlFor="additionalRequests" className={labelClasses}>
                            Additional Requests or Questions
                          </label>
                          <textarea
                            id="additionalRequests"
                            name="additionalRequests"
                            rows={4}
                            value={formData.additionalRequests}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="Tell us about your vision, any special requests, or questions you have..."
                          />
                        </div>

                        {submitError && (
                          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                            {submitError}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-charcoal-900 text-cream-100 py-4 px-8 rounded transition-all duration-300 text-caption uppercase tracking-widest font-medium hover:bg-sepia-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? 'Processing...' : bookingFormSection.submit_button_text}
                        </button>
                      </form>
                    </>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-charcoal-900 text-cream-100">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-script text-3xl text-sepia-400 mb-4">
              Can't find what you're looking for?
            </p>
            <h2 className="font-serif text-heading-lg mb-6">
              Let's Create Something Custom
            </h2>
            <p className="text-cream-300 mb-8 max-w-2xl mx-auto">
              Every story is unique. If you have specific requirements or want a customized package,
              I'd love to hear from you and craft something special.
            </p>
            <a
              href={`mailto:${siteConfig.contact_email}`}
              className="inline-flex items-center gap-3 border border-cream-100 text-cream-100 px-8 py-4 hover:bg-cream-100 hover:text-charcoal-900 transition-all duration-300 text-caption uppercase tracking-widest"
            >
              Get In Touch
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}

