import type { Metadata } from 'next';
import '@/styles/globals.css';
import Layout from '@/components/layout/Layout';

export const metadata: Metadata = {
  title: {
    default: 'Aamod P. Pisat Photography | Capturing the real emotions...',
    template: '%s | Aamod P. Pisat Photography',
  },
  description:
    'Fine art, documentary & destination wedding photography. Cinematic, nostalgic storytelling for kindred souls. Based in Phoenix, available worldwide.',
  keywords: [
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

