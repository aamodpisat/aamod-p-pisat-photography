import Link from 'next/link';
import { SiteConfig } from '@/lib/types';

const links = [
  ['Home', '/'], ['Portfolio', '/portfolio'], ['Films', '/films'],
  ['Stories', '/stories'], ['Services', '/services'],
  ['About', '/about'], ['FAQ', '/faq'], ['Contact', '/contact'],
];

export default function Footer({ siteConfig }: { siteConfig: SiteConfig }) {
  return <footer className="footer">
    <div className="footer-inner">
      <Link className="footer-brand" href="/">Aamod P. Pisat Photography</Link>
      <nav className="footer-links" aria-label="Footer navigation">
        {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
      </nav>
    </div>
    <div className="footer-bottom">{siteConfig.footer_text || '© 2026 Aamod P. Pisat Photography'}</div>
  </footer>;
}
