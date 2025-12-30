'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

interface GoogleAnalyticsProps {
  measurementId: string;
}

// Track page views - requires measurementId to be passed
export const pageview = (measurementId: string, url: string) => {
  if (typeof window !== 'undefined' && window.gtag && measurementId) {
    window.gtag('config', measurementId, {
      page_path: url,
    });
  }
};

// Track events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Component to track route changes
function GoogleAnalyticsTracker({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && measurementId) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      pageview(measurementId, url);
    }
  }, [pathname, searchParams, measurementId]);

  return null;
}

// Wrap with Suspense for useSearchParams
export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  if (!measurementId) return null;
  
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsTracker measurementId={measurementId} />
    </Suspense>
  );
}

// Add gtag type to window
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}
