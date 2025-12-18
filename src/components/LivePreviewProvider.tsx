'use client';

/**
 * Live Preview Provider Component
 * Initializes Contentstack Live Preview on the client side
 * and handles real-time content updates
 */

import { useEffect, useCallback, useState, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { 
  initLivePreview, 
  onLivePreviewUpdate, 
  isLivePreviewEnabled 
} from '@/lib/contentstack-live-preview';

interface LivePreviewContextType {
  isPreviewMode: boolean;
  refreshContent: () => void;
}

const LivePreviewContext = createContext<LivePreviewContextType>({
  isPreviewMode: false,
  refreshContent: () => {},
});

export function useLivePreview() {
  return useContext(LivePreviewContext);
}

interface LivePreviewProviderProps {
  children: React.ReactNode;
}

export default function LivePreviewProvider({ children }: LivePreviewProviderProps) {
  const router = useRouter();
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Refresh content when Live Preview updates occur
  const refreshContent = useCallback(() => {
    // Use Next.js router to refresh server components
    router.refresh();
  }, [router]);

  useEffect(() => {
    // Check if Live Preview is enabled
    const previewEnabled = isLivePreviewEnabled();
    setIsPreviewMode(previewEnabled);

    if (!previewEnabled) return;

    // Initialize Live Preview SDK
    initLivePreview();

    // Subscribe to content updates
    const unsubscribe = onLivePreviewUpdate(() => {
      console.log('Content updated in Contentstack, refreshing...');
      refreshContent();
    });

    return () => {
      unsubscribe();
    };
  }, [refreshContent]);

  return (
    <LivePreviewContext.Provider value={{ isPreviewMode, refreshContent }}>
      {children}
      {/* Live Preview indicator badge */}
      {isPreviewMode && (
        <div 
          className="fixed bottom-4 right-4 z-[9999] bg-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg flex items-center gap-2"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Live Preview
        </div>
      )}
    </LivePreviewContext.Provider>
  );
}

