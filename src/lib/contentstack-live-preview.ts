/**
 * Contentstack Live Preview Configuration
 * Enables real-time preview of content changes in Contentstack CMS
 */

import ContentstackLivePreview from '@contentstack/live-preview-utils';

// Live Preview configuration
export const LIVE_PREVIEW_CONFIG = {
  enable: process.env.CONTENTSTACK_LIVE_PREVIEW === 'true',
  stackDetails: {
    apiKey: process.env.CONTENTSTACK_API_KEY || '',
    environment: process.env.CONTENTSTACK_ENVIRONMENT || 'development',
  },
  // Hash is optional - used for preview token validation
  hash: process.env.CONTENTSTACK_PREVIEW_TOKEN || '',
  ssr: true, // Enable server-side rendering support
  editButton: {
    enable: true, // Show edit button on hover
  },
};

console.log('LIVE_PREVIEW_CONFIG', process.env.CONTENTSTACK_LIVE_PREVIEW);

// Check if we're in Live Preview mode
export function isLivePreviewEnabled(): boolean {
  if (typeof window === 'undefined') {
    return process.env.CONTENTSTACK_LIVE_PREVIEW === 'true';
  }
  
  // Check if we're inside Contentstack's preview iframe
  try {
    return window.self !== window.top || 
           LIVE_PREVIEW_CONFIG.enable;
  } catch (e) {
    return LIVE_PREVIEW_CONFIG.enable;
  }
}

// Initialize Live Preview SDK (client-side only)
export function initLivePreview(): void {
  if (typeof window === 'undefined') return;
  
  if (!LIVE_PREVIEW_CONFIG.enable) {
    console.log('Live Preview is disabled');
    return;
  }

  try {
    ContentstackLivePreview.init({
      ...LIVE_PREVIEW_CONFIG,
      mode: 'builder',
      stackDetails: {
        apiKey: LIVE_PREVIEW_CONFIG.stackDetails.apiKey,
      },
      clientUrlParams: {
        host: getContentstackHost(),
      },
    });
    
    console.log('Contentstack Live Preview initialized');
  } catch (error) {
    console.error('Failed to initialize Live Preview:', error);
  }
}

// Get Contentstack API host based on region
function getContentstackHost(): string {
  const region = process.env.NEXT_PUBLIC_CONTENTSTACK_REGION || 'us';
  
  switch (region.toLowerCase()) {
    case 'eu':
      return 'eu-app.contentstack.com';
    case 'azure-na':
      return 'azure-na-app.contentstack.com';
    case 'azure-eu':
      return 'azure-eu-app.contentstack.com';
    case 'us':
    default:
      return 'app.contentstack.com';
  }
}

// Subscribe to Live Preview updates
export function onLivePreviewUpdate(callback: () => void): () => void {
  if (typeof window === 'undefined' || !LIVE_PREVIEW_CONFIG.enable) {
    return () => {};
  }

  ContentstackLivePreview.onEntryChange(callback);
  
  // Return unsubscribe function
  return () => {
    // Live Preview Utils doesn't have a built-in unsubscribe
    // but we return an empty function for consistency
  };
}

// Get data-cslp attribute for Live Preview editing
// This enables visual editing indicators in Contentstack
export function getEditableField(
  contentTypeUid: string,
  entryUid: string,
  fieldPath: string,
  locale: string = 'en-us'
): string {
  if (!LIVE_PREVIEW_CONFIG.enable) return '';
  
  return `${contentTypeUid}.${entryUid}.${locale}.${fieldPath}`;
}

// Helper to add editable attributes to HTML elements
export function editableProps(
  contentTypeUid: string,
  entryUid: string,
  fieldPath: string,
  locale: string = 'en-us'
): { 'data-cslp'?: string } {
  if (!LIVE_PREVIEW_CONFIG.enable) return {};
  
  return {
    'data-cslp': getEditableField(contentTypeUid, entryUid, fieldPath, locale),
  };
}

export default ContentstackLivePreview;

