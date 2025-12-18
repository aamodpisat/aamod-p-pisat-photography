'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ContactPageContent, SiteConfig } from '@/lib/types';
import { ImagePresets } from '@/lib/image-utils';

interface ContactFormProps {
  content: ContactPageContent;
  siteConfig: SiteConfig;
}

export default function ContactForm({ content, siteConfig }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    location: '',
    howDidYouHear: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setInquiryId(data.inquiryId);
        setIsSubmitted(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventDate: '',
          eventType: '',
          location: '',
          howDidYouHear: '',
          message: '',
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

  const inputClasses =
    'w-full px-6 py-4 bg-cream-100 border border-charcoal-200 text-charcoal-800 placeholder-charcoal-400 focus:outline-none focus:border-sepia-500 transition-colors';
  const labelClasses = 'block text-caption uppercase tracking-widest text-charcoal-700 mb-2';

  // Extract nested group data
  const banner = content.banner;
  const infoSection = content.info_section;
  const success = content.success;

  // Get form labels with defaults
  const labels = content.form_labels || {};
  const nameLabel = labels.name_label || 'Name *';
  const emailLabel = labels.email_label || 'Email *';
  const phoneLabel = labels.phone_label || 'Phone';
  const eventDateLabel = labels.event_date_label || 'Event Date';
  const eventTypeLabel = labels.event_type_label || 'Event Type';
  const locationLabel = labels.location_label || 'Location';
  const howHeardLabel = labels.how_heard_label || 'How did you hear about me?';
  const messageLabel = labels.message_label || 'Tell me about your vision *';
  const submitButtonText = labels.submit_button_text || 'Send Inquiry';

  // Get options with defaults
  const eventTypeOptions = content.event_type_options || ['Wedding', 'Elopement', 'Engagement', 'Destination Wedding', 'Other'];
  const referralOptions = content.referral_options || ['Instagram', 'Google', 'Referral', 'Wedding Blog', 'Other'];

  return (
    <>
      {/* Page Hero / Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={ImagePresets.hero(banner?.image?.url || 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1920&q=80')}
            alt={banner?.title || 'Contact hero'}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal-900/50" />
        </div>
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-display text-cream-100 mb-4"
          >
            {banner?.title || 'Contact'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-script text-3xl text-sepia-300"
          >
            {banner?.tagline || "Let's create something beautiful together"}
          </motion.p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section bg-cream-100">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column - Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-caption uppercase tracking-[0.2em] text-sepia-600 mb-4">
                {infoSection?.subtitle || 'Get In Touch'}
              </p>
              <h2 className="font-serif text-heading-lg text-charcoal-900 mb-6">
                {infoSection?.title || "I'd Love to Hear Your Story"}
              </h2>
              <p className="text-body-lg text-charcoal-600 font-light mb-10">
                {infoSection?.info_description || "Whether you're planning an intimate elopement or a grand celebration, I'm here to help you preserve your most meaningful moments. Fill out the form and I'll be in touch within 48 hours."}
              </p>

              {/* Contact Details */}
              <div className="space-y-6 mb-12">
                <div>
                  <p className="text-caption uppercase tracking-widest text-sepia-600 mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${siteConfig.contact_email}`}
                    className="text-charcoal-800 hover:text-sepia-600 transition-colors"
                  >
                    {siteConfig.contact_email}
                  </a>
                </div>
                <div>
                  <p className="text-caption uppercase tracking-widest text-sepia-600 mb-1">
                    Based In
                  </p>
                  <p className="text-charcoal-800">
                    {content.location || 'Phoenix, Arizona — Available Worldwide'}
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-caption uppercase tracking-widest text-sepia-600 mb-4">
                  Follow Along
                </p>
                <div className="flex space-x-4">
                  {siteConfig.instagram_url && (
                    <a
                      href={siteConfig.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-charcoal-300 flex items-center justify-center text-charcoal-600 hover:border-sepia-500 hover:text-sepia-600 transition-colors"
                      aria-label="Instagram"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  )}
                  {siteConfig.pinterest_url && (
                    <a
                      href={siteConfig.pinterest_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-charcoal-300 flex items-center justify-center text-charcoal-600 hover:border-sepia-500 hover:text-sepia-600 transition-colors"
                      aria-label="Pinterest"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {isSubmitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 border border-sepia-400 flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-8 h-8 text-sepia-600"
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
                    {success?.success_title || 'Thank You!'}
                  </h3>
                  <p className="text-charcoal-600 mb-6">
                    {success?.success_message || "Your message has been received. I'll be in touch within 48 hours."}
                  </p>
                  {inquiryId && (
                    <div className="bg-charcoal-900 text-white py-6 px-8 inline-block">
                      <p className="text-xs uppercase tracking-widest text-sepia-400 mb-2">
                        Your Reference Number
                      </p>
                      <p className="font-serif text-2xl tracking-wider">
                        {inquiryId}
                      </p>
                      <p className="text-xs text-charcoal-400 mt-2">
                        Please save this for your records
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={labelClasses}>
                        {nameLabel}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClasses}>
                        {emailLabel}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className={labelClasses}>
                        {phoneLabel}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="eventDate" className={labelClasses}>
                        {eventDateLabel}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="eventType" className={labelClasses}>
                        {eventTypeLabel}
                      </label>
                      <select
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className={inputClasses}
                      >
                        <option value="">Select an option</option>
                        {eventTypeOptions.map((option) => (
                          <option key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="location" className={labelClasses}>
                        {locationLabel}
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="City, Country"
                        value={formData.location}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="howDidYouHear" className={labelClasses}>
                      {howHeardLabel}
                    </label>
                    <select
                      id="howDidYouHear"
                      name="howDidYouHear"
                      value={formData.howDidYouHear}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      <option value="">Select an option</option>
                      {referralOptions.map((option) => (
                        <option key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClasses}>
                      {messageLabel}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Share the details of your day, your story, and what you're looking for in a photographer..."
                      value={formData.message}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-cinematic disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : submitButtonText}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
