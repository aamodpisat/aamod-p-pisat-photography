'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem, SiteConfig } from '@/lib/types';

interface HeaderProps {
  siteConfig: SiteConfig;
}

// Pages that have light backgrounds at the top (no dark hero)
const LIGHT_BACKGROUND_PAGES = ['/stories', '/journal', '/faq', '/services', '/info'];

export default function Header({ siteConfig }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const primaryNav = siteConfig.primary_navigation || [];
  const secondaryNav = siteConfig.secondary_navigation || [];

  // Check if current page has a light background (needs dark header from start)
  const isLightBackgroundPage = LIGHT_BACKGROUND_PAGES.some(page => pathname?.startsWith(page));

  // Use dark header if scrolled OR if on a light background page
  const useDarkHeader = isScrolled || isLightBackgroundPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-cinematic ${
          useDarkHeader
            ? 'bg-white/95 backdrop-blur-sm py-4 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container-full">
          {/* Desktop Navigation Layout */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8">
            {/* Primary Navigation - Left */}
            <nav className="flex items-center space-x-6 xl:space-x-8" aria-label="Primary navigation">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-caption uppercase tracking-widest link-underline transition-colors duration-300 whitespace-nowrap ${
                    useDarkHeader ? 'text-charcoal-800' : 'text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Logo - Center (Always Centered) */}
            <Link href="/" className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
                className="text-center"
              >
                <h1
                  className={`font-serif font-semibold text-xl md:text-2xl tracking-wide transition-colors duration-300 bg-transparent whitespace-nowrap ${
                    useDarkHeader ? 'text-charcoal-900' : 'text-white'
                  }`}
                >
                  {siteConfig.site_name}
                </h1>
                <p
                  className={`text-xs tracking-[0.25em] uppercase mt-1 transition-colors duration-300 whitespace-nowrap ${
                    useDarkHeader ? 'text-charcoal-600' : 'text-white/80'
                  }`}
                  style={{ fontFamily: '"Times New Roman", serif' }}
                >
                  {siteConfig.site_subtitle}
                </p>
              </motion.div>
            </Link>

            {/* Secondary Navigation - Right */}
            <nav className="flex items-center justify-end space-x-6 xl:space-x-8" aria-label="Secondary navigation">
              {secondaryNav.map((item) => (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={`text-caption uppercase tracking-widest link-underline transition-colors duration-300 whitespace-nowrap ${
                      useDarkHeader ? 'text-charcoal-800' : 'text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.children && item.children.length > 0 && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="bg-cream-100 shadow-lg py-4 px-6 min-w-[160px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block py-2 text-caption uppercase tracking-wider text-charcoal-700 hover:text-sepia-600 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex items-center justify-between">
            {/* Logo - Center on Mobile */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
                className="text-center"
              >
                <h1
                  className={`font-serif font-semibold text-lg tracking-wide transition-colors duration-300 bg-transparent whitespace-nowrap ${
                    useDarkHeader ? 'text-charcoal-900' : 'text-white'
                  }`}
                >
                  {siteConfig.site_name}
                </h1>
                <p
                  className={`text-[10px] tracking-[0.2em] uppercase mt-0.5 transition-colors duration-300 whitespace-nowrap ${
                    useDarkHeader ? 'text-charcoal-600' : 'text-white/80'
                  }`}
                  style={{ fontFamily: '"Times New Roman", serif' }}
                >
                  {siteConfig.site_subtitle}
                </p>
              </motion.div>
            </Link>

            {/* Spacer to push button to right */}
            <div className="flex-1" />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`z-50 w-10 h-10 flex flex-col items-center justify-center space-y-1.5 transition-colors ${
                isMobileMenuOpen ? 'text-cream-100' : useDarkHeader ? 'text-charcoal-800' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 6 : 0,
                }}
                className="w-6 h-px bg-current origin-center"
              />
              <motion.span
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                className="w-6 h-px bg-current"
              />
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -6 : 0,
                }}
                className="w-6 h-px bg-current origin-center"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-charcoal-900 flex items-center justify-center"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              {[...primaryNav, ...secondaryNav].map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 text-2xl font-serif text-cream-100 hover:text-sepia-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
