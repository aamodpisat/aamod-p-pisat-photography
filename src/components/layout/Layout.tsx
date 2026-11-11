'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useSiteConfig } from '@/lib/SiteConfigContext';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { siteConfig } = useSiteConfig();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header siteConfig={siteConfig} />
      
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <Footer siteConfig={siteConfig} />
    </div>
  );
}
