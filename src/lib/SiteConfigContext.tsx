'use client';

import { createContext, useContext, ReactNode } from 'react';
import { SiteConfig } from './types';

interface SiteConfigContextType {
  siteConfig: SiteConfig;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

interface SiteConfigProviderProps {
  children: ReactNode;
  siteConfig: SiteConfig;
}

export function SiteConfigProvider({ children, siteConfig }: SiteConfigProviderProps) {
  return (
    <SiteConfigContext.Provider value={{ siteConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (context === undefined) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
}


