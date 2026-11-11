'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SiteConfig } from '@/lib/types';

const primary = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/films', label: 'Films' },
  { href: '/stories', label: 'Stories' },
];
const secondary = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
];

export default function Header({ siteConfig }: { siteConfig: SiteConfig }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = [...primary, ...secondary];
  const brand = siteConfig.site_name?.replace(/\s*Photography\s*$/i, '') || 'Aamod P. Pisat';
  return (
    <>
      <div className="topline">Wedding photography · Mumbai and across India</div>
      <header className="site-header">
        <div className="nav-shell">
          <nav className="nav-links" aria-label="Primary navigation">
            {primary.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</Link>)}
          </nav>
          <Link className="brand" href="/" aria-label="Aamod P. Pisat Photography home"><strong>{brand}</strong><small>Photography</small></Link>
          <div className="nav-right">
            <nav className="nav-links" aria-label="Secondary navigation">
              {secondary.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</Link>)}
            </nav>
            <button className="menu" type="button" aria-expanded={open} aria-controls="mobile-panel" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
            <Link className="nav-cta" href="/contact" onClick={() => setOpen(false)}>Check availability <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        {open && <nav id="mobile-panel" className="mobile-nav" aria-label="Mobile navigation">
          {links.map(item => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
          <Link href="/faq" onClick={() => setOpen(false)}>FAQ</Link>
        </nav>}
      </header>
    </>
  );
}
