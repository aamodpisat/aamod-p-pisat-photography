/**
 * Contentstack Image Delivery API Utilities
 * 
 * Contentstack provides image transformation via URL parameters.
 * Docs: https://www.contentstack.com/docs/developers/apis/image-delivery-api/
 */

interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number; // 1-100, default 80
  format?: 'webp' | 'jpg' | 'png' | 'gif' | 'pjpg'; // pjpg = progressive jpeg
  fit?: 'bounds' | 'crop';
  crop?: string; // e.g., '100,100,200,200' (x,y,width,height)
  trim?: boolean;
  orient?: 'auto' | number; // auto or 1-8
  blur?: number; // 1-1000
  saturation?: number; // -100 to 100
  brightness?: number; // -100 to 100
  contrast?: number; // -100 to 100
}

/**
 * Transform Contentstack image URL with optimization parameters
 * 
 * @param url - Original Contentstack image URL
 * @param options - Transformation options
 * @returns Optimized image URL
 * 
 * @example
 * // Resize to 800px width with WebP format and 80% quality
 * optimizeImage(url, { width: 800, format: 'webp', quality: 80 })
 * 
 * // Create a thumbnail
 * optimizeImage(url, { width: 200, height: 200, fit: 'crop', quality: 75 })
 */
export function optimizeImage(url: string, options: ImageTransformOptions = {}): string {
  // Only transform Contentstack URLs
  if (!url || !url.includes('contentstack.io')) {
    return url;
  }

  const params: string[] = [];

  // Dimensions
  if (options.width) params.push(`width=${options.width}`);
  if (options.height) params.push(`height=${options.height}`);

  // Quality (default to 80 for good balance)
  params.push(`quality=${options.quality || 80}`);

  // Format (prefer WebP for best compression)
  if (options.format) {
    params.push(`format=${options.format}`);
  } else {
    // Auto-convert to WebP for browsers that support it
    params.push('auto=webp');
  }

  // Fit mode
  if (options.fit) params.push(`fit=${options.fit}`);

  // Other transformations
  if (options.crop) params.push(`crop=${options.crop}`);
  if (options.trim) params.push('trim=true');
  if (options.orient) params.push(`orient=${options.orient}`);
  if (options.blur) params.push(`blur=${options.blur}`);
  if (options.saturation !== undefined) params.push(`saturation=${options.saturation}`);
  if (options.brightness !== undefined) params.push(`brightness=${options.brightness}`);
  if (options.contrast !== undefined) params.push(`contrast=${options.contrast}`);

  // Build URL
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${params.join('&')}`;
}

/**
 * Preset image sizes for common use cases
 */
export const ImagePresets = {
  // Hero/Banner images (full width)
  hero: (url: string) => optimizeImage(url, { 
    width: 1920, 
    quality: 85,
    format: 'webp'
  }),
  
  // Hero mobile
  heroMobile: (url: string) => optimizeImage(url, { 
    width: 768, 
    quality: 80,
    format: 'webp'
  }),

  // Gallery thumbnails (for grid display - high quality for sharp images)
  galleryThumb: (url: string) => optimizeImage(url, { 
    width: 1200, 
    quality: 90,
    format: 'webp'
  }),

  // Gallery medium (for lightbox preview)
  galleryMedium: (url: string) => optimizeImage(url, { 
    width: 1600, 
    quality: 92,
    format: 'webp'
  }),

  // Gallery large (for lightbox full view - maximum quality)
  galleryLarge: (url: string) => optimizeImage(url, { 
    width: 2400, 
    quality: 95,
    format: 'webp'
  }),

  // Portfolio card
  portfolioCard: (url: string) => optimizeImage(url, { 
    width: 800, 
    quality: 85,
    format: 'webp'
  }),

  // Blog/Journal featured image
  blogFeatured: (url: string) => optimizeImage(url, { 
    width: 1200, 
    quality: 85,
    format: 'webp'
  }),

  // Blog thumbnail
  blogThumb: (url: string) => optimizeImage(url, { 
    width: 600, 
    quality: 85,
    format: 'webp'
  }),

  // Testimonial photo
  testimonialPhoto: (url: string) => optimizeImage(url, { 
    width: 800, 
    quality: 85,
    format: 'webp'
  }),

  // About page portrait
  portrait: (url: string) => optimizeImage(url, { 
    width: 1000, 
    quality: 90,
    format: 'webp'
  }),

  // Tiny placeholder (for blur-up loading)
  placeholder: (url: string) => optimizeImage(url, { 
    width: 20, 
    quality: 30,
    blur: 10
  }),

  // Open Graph / Social sharing
  ogImage: (url: string) => optimizeImage(url, { 
    width: 1200, 
    height: 630, 
    fit: 'crop',
    quality: 80,
    format: 'jpg'
  }),
};

/**
 * Get responsive image srcSet for different screen sizes
 */
export function getResponsiveSrcSet(url: string, sizes: number[] = [400, 800, 1200, 1600]): string {
  return sizes
    .map(size => `${optimizeImage(url, { width: size, format: 'webp', quality: 80 })} ${size}w`)
    .join(', ');
}

/**
 * Calculate estimated file size reduction
 * Original images at 15MB can be reduced to ~100-500KB with proper optimization
 */
export function estimateOptimizedSize(originalSizeMB: number, targetWidth: number): string {
  // Rough estimation based on typical compression ratios
  const baseReduction = 0.05; // WebP typically reduces to ~5% of uncompressed
  const widthFactor = Math.min(targetWidth / 4000, 1); // Assuming original is ~4000px
  const estimatedKB = originalSizeMB * 1024 * baseReduction * widthFactor;
  
  if (estimatedKB < 1024) {
    return `~${Math.round(estimatedKB)}KB`;
  }
  return `~${(estimatedKB / 1024).toFixed(1)}MB`;
}

// ============================================
// VIDEO UTILITIES
// ============================================

/**
 * Video optimization is NOT supported by Contentstack's Image Delivery API
 * Use these strategies for video optimization:
 * 
 * 1. **YouTube/Vimeo** - Best for main content (automatically optimized, CDN, adaptive bitrate)
 * 2. **Pre-compress before upload** - Use FFmpeg or HandBrake
 * 3. **Use multiple qualities** - Provide SD + HD versions
 */

interface VideoQualityPreset {
  width: number;
  height: number;
  bitrate: string;
  description: string;
}

/**
 * Recommended video quality presets for web
 * Use these as a guide when encoding videos before uploading to Contentstack
 */
export const VideoQualityPresets: Record<string, VideoQualityPreset> = {
  // For hero backgrounds - prioritize file size over quality
  heroBackground: {
    width: 1920,
    height: 1080,
    bitrate: '2-3 Mbps',
    description: 'Background video, muted, looping. Target: 5-15MB for 30sec clip',
  },
  
  // Mobile hero background
  heroBackgroundMobile: {
    width: 854,
    height: 480,
    bitrate: '1-1.5 Mbps',
    description: 'Mobile background. Target: 2-5MB for 30sec clip',
  },
  
  // Standard web video
  webStandard: {
    width: 1280,
    height: 720,
    bitrate: '3-5 Mbps',
    description: 'Standard web playback. Target: 20-40MB per minute',
  },
  
  // High quality showcase
  webHD: {
    width: 1920,
    height: 1080,
    bitrate: '5-8 Mbps',
    description: 'High quality showcase. Target: 40-60MB per minute',
  },
};

/**
 * FFmpeg commands for video optimization
 * Run these locally before uploading to Contentstack
 */
export const FFmpegCommands = {
  // Optimize for web background (silent, looping)
  heroBackground: `ffmpeg -i input.mp4 -vf "scale=1920:-2" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart output_hero.mp4`,
  
  // Mobile version
  heroBackgroundMobile: `ffmpeg -i input.mp4 -vf "scale=854:-2" -c:v libx264 -crf 30 -preset slow -an -movflags +faststart output_hero_mobile.mp4`,
  
  // Create poster image from video
  createPoster: `ffmpeg -i input.mp4 -ss 00:00:01 -vframes 1 -q:v 2 poster.jpg`,
  
  // Convert to WebM for better compression
  toWebM: `ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -an output.webm`,
};

/**
 * Get YouTube thumbnail URL in different qualities
 * YouTube provides multiple thumbnail sizes
 */
export function getYouTubeThumbnail(
  videoId: string, 
  quality: 'default' | 'medium' | 'high' | 'standard' | 'maxres' = 'maxres'
): string {
  const qualityMap = {
    default: 'default',      // 120x90
    medium: 'mqdefault',     // 320x180
    high: 'hqdefault',       // 480x360
    standard: 'sddefault',   // 640x480
    maxres: 'maxresdefault', // 1280x720 (may not exist)
  };
  
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

/**
 * Get YouTube embed URL with performance optimizations
 */
export function getYouTubeEmbedUrl(videoId: string, options: {
  autoplay?: boolean;
  mute?: boolean;
  loop?: boolean;
  controls?: boolean;
  lazyLoad?: boolean;
} = {}): string {
  const params = new URLSearchParams({
    rel: '0',           // Don't show related videos
    modestbranding: '1', // Minimal YouTube branding
    ...(options.autoplay && { autoplay: '1' }),
    ...(options.mute && { mute: '1' }),
    ...(options.loop && { loop: '1', playlist: videoId }),
    ...(options.controls === false && { controls: '0' }),
  });
  
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

