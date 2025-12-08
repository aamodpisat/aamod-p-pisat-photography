'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem } from '@/lib/types';

const primaryNav: NavItem[] = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Films', href: '/films' },
  { label: 'Testimonials', href: '/testimonials' },
];

const secondaryNav: NavItem[] = [
  { label: 'About', href: '/about' },
  {
    label: 'Info',
    href: '/info',
    children: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Services', href: '/services' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          isScrolled
            ? 'bg-cream-100/95 backdrop-blur-sm py-4 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container-full flex items-center justify-between">
          {/* Primary Navigation - Left */}
          <nav className="hidden lg:flex items-center space-x-8">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-caption uppercase tracking-widest link-underline transition-colors duration-300 ${
                  isScrolled ? 'text-charcoal-800' : 'text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Logo - Center */}
          <Link href="/" className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
              className="text-center"
            >
              <h1
                className={`font-serif text-xl md:text-2xl tracking-wide transition-colors duration-300 ${
                  isScrolled ? 'text-charcoal-900' : 'text-white'
                }`}
              >
                Aamod P. Pisat
              </h1>
              <p
                className={`font-sans text-xs tracking-[0.25em] uppercase mt-1 transition-colors duration-300 ${
                  isScrolled ? 'text-charcoal-600' : 'text-white/80'
                }`}
              >
                Photography
              </p>
            </motion.div>
          </Link>

          {/* Secondary Navigation - Right */}
          <nav className="hidden lg:flex items-center space-x-8">
            {secondaryNav.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`text-caption uppercase tracking-widest link-underline transition-colors duration-300 ${
                    isScrolled ? 'text-charcoal-800' : 'text-white'
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center space-y-1.5 transition-colors ${
              isMobileMenuOpen ? 'text-cream-100' : isScrolled ? 'text-charcoal-800' : 'text-white'
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

