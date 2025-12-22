/**
 * Image Size Analyzer Script
 * 
 * Run this to compare original vs optimized image sizes
 * Usage: npx ts-node scripts/check-image-sizes.ts
 */

import { optimizeImage, ImagePresets, estimateOptimizedSize } from '../src/lib/image-utils';

// Example: Analyze a Contentstack image URL
function analyzeImage(url: string) {
  console.log('\n📸 Image Analysis\n');
  console.log('Original URL:', url);
  console.log('\n--- Optimized Versions ---\n');

  // Show different preset URLs
  const presets = [
    { name: 'Hero (1920px)', url: ImagePresets.hero(url) },
    { name: 'Hero Mobile (768px)', url: ImagePresets.heroMobile(url) },
    { name: 'Gallery Thumbnail (400px)', url: ImagePresets.galleryThumb(url) },
    { name: 'Gallery Large (1600px)', url: ImagePresets.galleryLarge(url) },
    { name: 'Portfolio Card (600px)', url: ImagePresets.portfolioCard(url) },
    { name: 'OG Image (1200x630)', url: ImagePresets.ogImage(url) },
  ];

  presets.forEach(preset => {
    console.log(`\n${preset.name}:`);
    console.log(preset.url);
  });

  // Estimated size reductions
  console.log('\n\n--- Estimated Size Reductions ---\n');
  console.log('Original: 15MB image @ 4000px wide\n');
  
  const estimates = [
    { name: 'Hero (1920px)', width: 1920 },
    { name: 'Gallery Thumb (400px)', width: 400 },
    { name: 'Portfolio Card (600px)', width: 600 },
  ];

  estimates.forEach(({ name, width }) => {
    const estimate = estimateOptimizedSize(15, width);
    console.log(`${name}: ${estimate}`);
  });
}

// Demo with a sample Contentstack URL
const sampleUrl = 'https://images.contentstack.io/v3/assets/blt123/blt456/sample-image.jpg';

analyzeImage(sampleUrl);

console.log('\n\n=== Performance Tips ===\n');
console.log('1. Upload images at original resolution to Contentstack');
console.log('2. The Image Delivery API automatically optimizes on-the-fly');
console.log('3. WebP format reduces file size by 25-35% vs JPEG');
console.log('4. Use appropriate presets for different use cases\n');
console.log('🔗 Contentstack Image API Docs: https://www.contentstack.com/docs/developers/apis/image-delivery-api/');

