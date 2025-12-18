import { getContactPageContent, getSiteConfig } from '@/lib/contentstack';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact | Aamod P. Pisat Photography',
  description: "Get in touch to discuss your wedding photography needs. Based in Phoenix, Arizona, available for destination weddings worldwide.",
};

// Default content when CMS is not configured
const defaultContactContent = {
  uid: 'default-contact',
  title: 'Contact Page',
  banner: {
    title: 'Contact',
    tagline: "Let's create something beautiful together",
  },
  info_section: {
    title: "I'd Love to Hear Your Story",
    subtitle: 'Get In Touch',
    info_description: "Whether you're planning an intimate elopement or a grand celebration, I'm here to help you preserve your most meaningful moments. Fill out the form and I'll be in touch within 48 hours.",
  },
  location: 'Phoenix, Arizona — Available Worldwide',
  form_labels: {
    name_label: 'Name *',
    email_label: 'Email *',
    phone_label: 'Phone',
    event_date_label: 'Event Date',
    event_type_label: 'Event Type',
    location_label: 'Location',
    how_heard_label: 'How did you hear about me?',
    message_label: 'Tell me about your vision *',
    submit_button_text: 'Send Inquiry',
  },
  event_type_options: ['Wedding', 'Elopement', 'Engagement', 'Destination Wedding', 'Other'],
  referral_options: ['Instagram', 'Google', 'Referral', 'Wedding Blog', 'Other'],
  success: {
    success_title: 'Thank You!',
    success_message: "Your message has been received. I'll be in touch within 48 hours.",
  },
};

const defaultSiteConfig = {
  uid: 'default-config',
  title: 'Site Configuration',
  site_name: 'Aamod P. Pisat',
  site_subtitle: 'Photography',
  tagline: 'Capturing the real emotions...',
  contact_email: 'hello@aamodphotography.com',
  footer_text: '© 2025 Aamod P. Pisat Photography',
  primary_navigation: [],
  secondary_navigation: [],
  footer_left_navigation: [],
  footer_right_navigation: [],
};

export default async function ContactPage() {
  // Fetch content from Contentstack
  const [contactContent, siteConfig] = await Promise.all([
    getContactPageContent(),
    getSiteConfig(),
  ]);

  // Use CMS content or defaults
  const content = contactContent || defaultContactContent;
  const config = siteConfig || defaultSiteConfig;

  return <ContactForm content={content} siteConfig={config} />;
}
