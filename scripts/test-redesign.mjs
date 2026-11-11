import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const port = Number(process.env.REDESIGN_PORT || 3400);
const base = process.env.REDESIGN_BASE_URL || `http://127.0.0.1:${port}`;
const output = process.env.REDESIGN_SCREENSHOTS || '/private/tmp/aamod-redesign-screenshots';
const routes = [
  '/', '/portfolio', '/films', '/stories', '/about', '/contact',
  '/services', '/testimonials', '/faq', '/info',
  '/stories/trushang-and-vaishnavi',
  '/stories/yuvraj-hatkar-upanayanam-ceremony',
  '/stories/sushmita-and-milind',
];
const viewports = [{ name: 'desktop', width: 1440, height: 900 }, { name: 'mobile', width: 390, height: 844 }];
const failures = [];
const serverLogs = [];
let server;
let browser;

async function waitForServer() {
  for (let i = 0; i < 120; i++) {
    try { const response = await fetch(base); if (response.status < 500) return; } catch {}
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  throw new Error(`Site did not start at ${base}. ${serverLogs.slice(-8).join(' ')}`);
}
function check(condition, message) { if (!condition) failures.push(message); }

try {
  if (!process.env.REDESIGN_BASE_URL) {
    if (!process.env.CONTENTSTACK_API_KEY || !process.env.CONTENTSTACK_DELIVERY_TOKEN) throw new Error('Set CONTENTSTACK_API_KEY and CONTENTSTACK_DELIVERY_TOKEN for the development environment.');
    server = spawn('npm', ['run', 'dev', '--', '-p', String(port)], { env: { ...process.env, CONTENTSTACK_ENVIRONMENT: 'development' }, stdio: ['ignore', 'pipe', 'pipe'] });
    for (const stream of [server.stdout, server.stderr]) stream.on('data', chunk => { serverLogs.push(String(chunk)); if (serverLogs.length > 30) serverLogs.shift(); });
  }
  await waitForServer();
  for (const [oldPath, newPath] of [['/journal', '/stories'], ['/packages', '/services']]) {
    const redirect = await fetch(base + oldPath, { redirect: 'manual' });
    const destination = new URL(redirect.headers.get('location') || '', base).pathname;
    check(redirect.status === 308 && destination === newPath, `${oldPath}: expected permanent redirect to ${newPath}, received ${redirect.status} ${destination}`);
  }
  await mkdir(output, { recursive: true });
  browser = await chromium.launch({ channel: process.env.REDESIGN_BROWSER_CHANNEL || 'chrome', headless: true });
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, reducedMotion: 'reduce' });
    for (const route of routes) {
      const page = await context.newPage();
      const pageErrors = [];
      page.on('pageerror', error => pageErrors.push(error.message));
      const response = await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.locator('h1').first().waitFor({ state: 'visible', timeout: 20000 });
      const status = response?.status() || 0;
      check(status === 200, `${viewport.name} ${route}: HTTP ${status}`);
      const layout = await page.evaluate(() => {
        const header = document.querySelector('.site-header');
        const brand = document.querySelector('.brand');
        const cta = document.querySelector('.nav-cta');
        const h1 = document.querySelector('h1');
        const rect = element => element?.getBoundingClientRect();
        return { scrollWidth: document.documentElement.scrollWidth, viewportWidth: window.innerWidth, header: rect(header), brand: rect(brand), cta: rect(cta), h1: rect(h1) };
      });
      check(layout.scrollWidth <= layout.viewportWidth + 2, `${viewport.name} ${route}: horizontal overflow ${layout.scrollWidth - layout.viewportWidth}px`);
      check(layout.cta && layout.brand && layout.cta.left >= layout.brand.right - 2, `${viewport.name} ${route}: CTA overlaps brand`);
      check(layout.cta && layout.cta.right <= layout.viewportWidth + 2, `${viewport.name} ${route}: CTA exceeds viewport`);
      check(layout.h1 && layout.h1.left >= -2 && layout.h1.right <= layout.viewportWidth + 2, `${viewport.name} ${route}: heading exceeds viewport`);
      check(await page.locator('a[href="/journal"], a[href="/packages"]').count() === 0, `${viewport.name} ${route}: old page link remains`);
      const firstImage = page.locator('main img').first();
      check(await firstImage.count() > 0, `${viewport.name} ${route}: main image missing`);
      if (await firstImage.count() > 0) {
        try { await page.waitForFunction(() => { const image = document.querySelector('main img'); return image?.complete && image.naturalWidth > 0; }, null, { timeout: 15000 }); }
        catch { failures.push(`${viewport.name} ${route}: first image failed to load`); }
      }
      await page.screenshot({ path: `${output}/${viewport.name}-${route.replaceAll('/', '_') || 'home'}.png`, animations: 'disabled' });
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(350);
      const middleOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      check(middleOverflow <= 2, `${viewport.name} ${route}: middle-page horizontal overflow ${middleOverflow}px`);
      check(pageErrors.length === 0, `${viewport.name} ${route}: ${pageErrors.join('; ')}`);
      if (route === '/') {
        const carousel = page.getByRole('region', { name: 'Featured wedding photography' });
        check(await carousel.isVisible(), `${viewport.name} /: full-screen carousel missing`);
        const slideCount = await carousel.locator('.home-carousel-slide').count();
        check(slideCount >= 2, `${viewport.name} /: published carousel slides missing`);
        const total = String(slideCount).padStart(2, '0');
        const heroHeight = await carousel.evaluate(element => element.getBoundingClientRect().height);
        check(heroHeight >= viewport.height - 120, `${viewport.name} /: carousel does not fill the screen`);
        check(await page.locator('.home-carousel + .editorial-award').count() === 1, `${viewport.name} /: award feature is not below the carousel`);
        await carousel.getByRole('button', { name: 'Next featured image' }).click();
        check(await carousel.locator('.home-carousel-count').innerText() === `02 / ${total}`, `${viewport.name} /: next carousel image failed`);
        await page.keyboard.press('ArrowLeft');
        check(await carousel.locator('.home-carousel-count').innerText() === `01 / ${total}`, `${viewport.name} /: carousel keyboard navigation failed`);
        const gallery = page.locator('#work .editorial-home-gallery');
        const photos = gallery.locator('.editorial-photo');
        check(await photos.count() === 4, `${viewport.name} /: expected four curated portfolio photographs`);
        await gallery.scrollIntoViewIfNeeded();
        try {
          await page.waitForFunction(() => [...document.querySelectorAll('#work .editorial-home-gallery img')].length === 4 && [...document.querySelectorAll('#work .editorial-home-gallery img')].every(image => image.complete && image.naturalWidth > 0), null, { timeout: 15000 });
        } catch { failures.push(`${viewport.name} /: curated portfolio photograph failed to load`); }
        const photoSizes = await photos.evaluateAll(elements => elements.map(element => {
          const rect = element.getBoundingClientRect();
          return { width: rect.width, height: rect.height, fit: getComputedStyle(element.querySelector('img')).objectFit };
        }));
        check(photoSizes.every(size => Math.abs(size.width - photoSizes[0].width) <= 1 && Math.abs(size.height - photoSizes[0].height) <= 1 && size.fit === 'contain'), `${viewport.name} /: portfolio grid frames are uneven or crop images`);
      }
      if (route === '/portfolio') {
        const tiles = page.locator('section#gallery button');
        check(await tiles.count() >= 20, `${viewport.name} /portfolio: expected published image tiles`);
        await tiles.first().click();
        const dialog = page.getByRole('dialog');
        check(await dialog.isVisible(), `${viewport.name} /portfolio: lightbox did not open`);
        const counter = dialog.getByText(/1 \/ \d+/);
        check(await counter.count() > 0, `${viewport.name} /portfolio: image counter missing`);
        await dialog.getByRole('button', { name: 'Next' }).click();
        check(await dialog.getByText(/2 \/ \d+/).count() > 0, `${viewport.name} /portfolio: next arrow failed`);
        await page.keyboard.press('ArrowLeft');
        check(await dialog.getByText(/1 \/ \d+/).count() > 0, `${viewport.name} /portfolio: previous arrow failed`);
        await page.keyboard.press('Escape');
        try { await dialog.waitFor({ state: 'hidden', timeout: 3000 }); } catch { failures.push(`${viewport.name} /portfolio: Escape did not close lightbox`); }
      }
      if (route === '/stories') {
        const cards = page.locator('#stories .stories-gallery-card');
        check(await cards.count() === 3, `${viewport.name} /stories: expected three published story cards`);
        await cards.first().scrollIntoViewIfNeeded();
        try {
          await page.waitForFunction(() => [...document.querySelectorAll('#stories .stories-gallery-image img')].length === 3 && [...document.querySelectorAll('#stories .stories-gallery-image img')].every(image => image.complete && image.naturalWidth > 0), null, { timeout: 15000 });
        } catch { failures.push(`${viewport.name} /stories: a thumbnail failed to load`); }
        const frames = await page.locator('#stories .stories-gallery-image').evaluateAll(elements => elements.map(element => {
          const rect = element.getBoundingClientRect();
          return { width: rect.width, height: rect.height, fit: getComputedStyle(element.querySelector('img')).objectFit };
        }));
        check(frames.length === 3 && frames.every(frame => Math.abs(frame.width - frames[0].width) <= 1 && Math.abs(frame.height - frames[0].height) <= 1 && frame.fit === 'contain'), `${viewport.name} /stories: story frames are uneven or crop thumbnails`);
        check(await cards.locator('img[src*="APP05244"]').count() === 1, `${viewport.name} /stories: portrait thumbnail for Sushmita story missing`);
        const storyLinks = await cards.evaluateAll(elements => elements.map(element => new URL(element.href).pathname));
        check(storyLinks.length === 3 && storyLinks.every(path => routes.includes(path)), `${viewport.name} /stories: a story link has no published detail route`);
        await page.getByRole('button', { name: 'Wedding', exact: true }).click();
        check(await cards.count() === 1, `${viewport.name} /stories: category filter did not narrow the stories`);
        check(await page.getByRole('button', { name: 'Wedding', exact: true }).getAttribute('aria-pressed') === 'true', `${viewport.name} /stories: active filter is not announced`);
        await page.getByRole('button', { name: 'All stories' }).click();
        check(await cards.count() === 3, `${viewport.name} /stories: All stories did not restore the grid`);
      }
      if (route === '/films') {
        check(await page.getByRole('button', { name: 'Play film teaser' }).isVisible(), `${viewport.name} /films: film teaser play button missing`);
        const filmCard = page.getByRole('button', { name: /Watch .+ film on this page/ }).first();
        check(await filmCard.count() > 0, `${viewport.name} /films: embedded film card missing`);
        if (await filmCard.count() > 0) {
          await filmCard.click();
          const dialog = page.getByRole('dialog', { name: /film$/ });
          check(await dialog.isVisible(), `${viewport.name} /films: embedded player did not open`);
          const iframeSource = await dialog.locator('iframe').getAttribute('src');
          check(iframeSource?.startsWith('https://www.youtube-nocookie.com/embed/') && iframeSource.includes('autoplay=1'), `${viewport.name} /films: embedded player source is invalid`);
          check(new URL(page.url()).pathname === '/films', `${viewport.name} /films: playback navigated away from the site`);
          await page.keyboard.press('Escape');
          try { await dialog.waitFor({ state: 'hidden', timeout: 3000 }); } catch { failures.push(`${viewport.name} /films: Escape did not close player`); }
        }
      }
      if (route === '/faq') {
        const detail = page.locator('details').first();
        await detail.locator('summary').click();
        check(await detail.evaluate(el => el.open), `${viewport.name} /faq: answer did not open`);
      }
      if (route === '/contact') {
        const form = page.locator('form').first();
        await form.locator('button[type="submit"]').click();
        check(!(await form.evaluate(el => el.checkValidity())), `${viewport.name} /contact: required fields are not enforced`);
      }
      if (viewport.name === 'mobile' && route === '/') {
        await page.getByRole('button', { name: 'Menu' }).click();
        check(await page.getByRole('navigation', { name: 'Mobile navigation' }).isVisible(), 'mobile /: menu did not open');
        check(await page.getByRole('navigation', { name: 'Mobile navigation' }).locator('a[href="/journal"], a[href="/packages"]').count() === 0, 'mobile /: retired page link remains in menu');
      }
      console.log(`PASS ${viewport.name} ${route}`);
      await page.close();
    }
    await context.close();
  }
  const autoPage = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
  await autoPage.goto(base, { waitUntil: 'domcontentloaded' });
  await autoPage.locator('.home-carousel-count').waitFor();
  const autoSlideCount = await autoPage.locator('.home-carousel-slide').count();
  await autoPage.waitForTimeout(6500);
  check(await autoPage.locator('.home-carousel-count').innerText() === `02 / ${String(autoSlideCount).padStart(2, '0')}`, 'desktop /: carousel did not advance automatically');
  await autoPage.close();
} catch (error) {
  failures.push(error instanceof Error ? error.stack || error.message : String(error));
} finally {
  if (browser) await browser.close();
  if (server) server.kill('SIGTERM');
}
if (failures.length) { console.error(`\n${failures.length} redesign check(s) failed:\n${failures.map((item, i) => `${i + 1}. ${item}`).join('\n')}`); process.exitCode = 1; }
else console.log(`\nAll ${routes.length} routes passed at ${viewports.length} viewport sizes. Screenshots: ${output}`);
