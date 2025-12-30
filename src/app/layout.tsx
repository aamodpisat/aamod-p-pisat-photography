import type { Metadata } from 'next';
import Script from 'next/script';
import '@/styles/globals.css';
import Layout from '@/components/layout/Layout';
import { SiteConfigProvider } from '@/lib/SiteConfigContext';
import { getSiteConfig } from '@/lib/contentstack';
import LivePreviewProvider from '@/components/LivePreviewProvider';
import GoogleAnalytics from '@/components/GoogleAnalytics';

// Get GA Measurement ID from server environment variable
const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID || '';

export const metadata: Metadata = {
  title: {
    default: 'Aamod P. Pisat Photography | Capturing the real emotions...',
    template: '%s | Aamod P. Pisat Photography',
  },
  description:
    'Fine art, documentary & destination wedding photography. Cinematic, nostalgic storytelling for kindred souls. Based in Phoenix, available worldwide.',
  keywords: [
    'Aamod P. Pisat Photography',
    'Aamod P. Pisat',
    'Photography',
    'Indian Wedding Photographer',
    'Indian Elopement Photographer',
    'Indian Destination Wedding Photographer',
    'Indian Fine Art Photographer',
    'Indian Documentary Photographer',
    'Indian Cinematic Wedding Photographer',
    'Indian Luxury Wedding Photographer',
    'Indian Wedding Photography',
    'wedding photography',
    'elopement photographer',
    'destination wedding',
    'fine art photography',
    'documentary photographer',
    'cinematic wedding',
    'luxury wedding photographer',
  ],
  authors: [{ name: 'Aamod P. Pisat' }],
  openGraph: {
    title: 'Aamod P. Pisat Photography',
    description: 'Fine art, documentary & destination wedding photography',
    url: 'https://aamodphotography.com',
    siteName: 'Aamod P. Pisat Photography',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aamod P. Pisat Photography',
    description: 'Capturing the real emotions...',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Disable caching for Live Preview support
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Default site config when Contentstack is not connected
const defaultSiteConfig = {
  uid: 'default-config',
  title: 'Site Configuration',
  site_name: 'Aamod P. Pisat',
  site_subtitle: 'Photography',
  tagline: 'Capturing the real emotions...',
  contact_email: 'hello@aamodphotography.com',
  footer_text: '© 2025 Aamod P. Pisat Photography | All Rights Reserved',
  primary_navigation: [
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Films', href: '/films' },
    { label: 'Testimonials', href: '/testimonials' },
  ],
  secondary_navigation: [
    { label: 'About', href: '/about' },
    { label: 'Journal', href: '/journal' },
    { label: 'Contact', href: '/contact' },
  ],
  footer_left_navigation: [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'FAQ', href: '/faq' },
  ],
  footer_right_navigation: [
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Films', href: '/films' },
    { label: 'Journal', href: '/journal' },
    { label: 'Contact', href: '/contact' },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch site config from Contentstack
  const siteConfig = await getSiteConfig();
  if (!siteConfig) {
    return (
      <html lang="en">
        <head>
          {/* Google Analytics - only load if configured */}
          {GA_MEASUREMENT_ID && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
              />
              <Script id="google-analytics" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `}
              </Script>
            </>
          )}
        </head>
        <body className="antialiased">
          <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
          <LivePreviewProvider>
            <SiteConfigProvider siteConfig={defaultSiteConfig}>
              <Layout>{children}</Layout>
            </SiteConfigProvider>
          </LivePreviewProvider>
        </body>
      </html>
    );
  }
  return (
    <html lang="en">
      <head>
        {/* Google Analytics - only load if configured */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="antialiased">
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
        <LivePreviewProvider>
          <SiteConfigProvider siteConfig={siteConfig}>
            <Layout>{children}</Layout>
          </SiteConfigProvider>
        </LivePreviewProvider>
      </body>
    </html>
  );
}
