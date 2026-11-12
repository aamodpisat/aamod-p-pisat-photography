import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const origin = 'https://www.aamodpisatphotography.in';
const routes = ['/', '/portfolio', '/films', '/stories', '/about', '/contact', '/services', '/testimonials', '/faq', '/info'];
const viewports = [{ name: 'desktop', width: 1440, height: 900 }, { name: 'mobile', width: 390, height: 844 }];
const result = { checked_at: new Date().toISOString(), origin, pages: [], errors: [] };
await mkdir('audit/screenshots', { recursive: true });
await mkdir('audit/previews', { recursive: true });

let browser;
try {
  browser = await chromium.launch({ headless: true });
  const discovery = await browser.newPage();
  await discovery.goto(`${origin}/stories`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  const storyRoutes = await discovery.locator('a[href^="/stories/"]').evaluateAll(links => [...new Set(links.map(a => new URL(a.href).pathname))]);
  routes.push(...storyRoutes);
  await discovery.close();

  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, reducedMotion: 'reduce' });
    for (const route of routes) {
      const page = await context.newPage();
      const entry = { route, viewport: viewport.name, issues: [], images: [], hosts: [] };
      const pageErrors = [];
      const requestedHosts = new Set();
      page.on('pageerror', error => pageErrors.push(error.message));
      page.on('request', request => { try { requestedHosts.add(new URL(request.url()).hostname); } catch {} });
      try {
        const started = Date.now();
        const response = await page.goto(origin + route, { waitUntil: 'load', timeout: 45000 });
        entry.load_ms = Date.now() - started;
        entry.status = response?.status() || 0;
        if (entry.status !== 200) entry.issues.push(`HTTP ${entry.status}`);
        await page.locator('h1').first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => entry.issues.push('Main heading missing or hidden'));
        await page.evaluate(async () => { for (const img of document.querySelectorAll('img[loading="lazy"]')) img.loading = 'eager'; await Promise.race([Promise.all([...document.images].map(img => img.decode().catch(() => {}))), new Promise(resolve => setTimeout(resolve, 15000))]); });
        const measurements = await page.evaluate(() => {
          const rect = selector => { const el = document.querySelector(selector); if (!el) return null; const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom }; };
          const nav = performance.getEntriesByType('navigation')[0];
          const images = [...document.images].map(img => ({ url: img.currentSrc || img.src, loaded: img.complete && img.naturalWidth > 0, width: img.naturalWidth, displayed: Math.round(img.getBoundingClientRect().width) }));
          const resources = performance.getEntriesByType('resource').filter(r => /\.(jpe?g|png|webp|avif)(\?|$)/i.test(r.name)).map(r => ({ url: r.name, duration_ms: Math.round(r.duration), bytes: r.transferSize || 0 }));
          return { dom_content_loaded_ms: Math.round(nav?.domContentLoadedEventEnd || 0), first_byte_ms: Math.round(nav?.responseStart || 0), scroll_width: document.documentElement.scrollWidth, viewport_width: innerWidth, heading: rect('h1'), brand: rect('.brand'), cta: rect('.nav-cta'), images, resources };
        });
        Object.assign(entry, measurements);
        entry.hosts = [...requestedHosts].sort();
        if (measurements.scroll_width > viewport.width + 2) entry.issues.push(`Horizontal overflow: ${measurements.scroll_width - viewport.width}px`);
        if (!measurements.heading || measurements.heading.left < -2 || measurements.heading.right > viewport.width + 2) entry.issues.push('Heading outside viewport');
        if (!measurements.brand || !measurements.cta || measurements.cta.left < measurements.brand.right - 2 || measurements.cta.right > viewport.width + 2) entry.issues.push('Header CTA alignment');
        for (const image of measurements.images.filter(i => !i.loaded)) entry.issues.push(`Broken image: ${image.url}`);
        for (const error of pageErrors) entry.issues.push(`JavaScript: ${error}`);
        const screenshotName = `${viewport.name}-${route.replaceAll('/', '_') || 'home'}`;
        entry.screenshot = `screenshots/${screenshotName}.png`;
        entry.preview = `previews/${screenshotName}.jpg`;
        await page.screenshot({ path: `audit/${entry.screenshot}`, fullPage: true, animations: 'disabled', timeout: 30000 });
        await page.screenshot({ path: `audit/${entry.preview}`, type: 'jpeg', quality: 55, animations: 'disabled', timeout: 30000 });
      } catch (error) {
        entry.issues.push(`Audit failed: ${error.message}`);
      } finally {
        result.pages.push(entry);
        await page.close();
      }
    }
    await context.close();
  }
} catch (error) {
  result.errors.push(error.message);
} finally {
  await browser?.close();
  await writeFile('audit/pages.json', JSON.stringify(result, null, 2));
}
