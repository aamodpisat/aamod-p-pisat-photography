'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  external = false,
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-sans uppercase tracking-widest transition-all duration-500 ease-cinematic relative overflow-hidden group';

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-xs',
    md: 'px-8 py-4 text-caption',
    lg: 'px-10 py-5 text-sm',
  };

  const variantClasses = {
    primary: 'bg-charcoal-900 text-cream-100 hover:bg-charcoal-800',
    secondary: 'bg-sepia-600 text-cream-100 hover:bg-sepia-700',
    outline: 'border border-charcoal-900 text-charcoal-900 hover:bg-charcoal-900 hover:text-cream-100',
    ghost: 'text-charcoal-900 hover:text-sepia-600',
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === 'outline' && (
        <motion.span
          className="absolute inset-0 bg-charcoal-900 z-0"
          initial={{ x: '-100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.4, ease: [0.77, 0, 0.175, 1] }}
        />
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {content}
    </button>
  );
}

