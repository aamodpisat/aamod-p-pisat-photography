import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cinematic color palette - warm earth tones with deep contrasts
        cream: {
          50: '#FEFDFB',
          100: '#FBF9F5',
          200: '#F5F0E8',
          300: '#EDE5D8',
          400: '#E0D4C2',
          500: '#D4C4AC',
        },
        charcoal: {
          50: '#F5F5F5',
          100: '#E0E0E0',
          200: '#BDBDBD',
          300: '#9E9E9E',
          400: '#757575',
          500: '#616161',
          600: '#424242',
          700: '#303030',
          800: '#212121',
          900: '#121212',
          950: '#0A0A0A',
        },
        sepia: {
          100: '#F5E6D3',
          200: '#E8D0B5',
          300: '#D4B896',
          400: '#C4A57C',
          500: '#B08B5B',
          600: '#8C6E48',
          700: '#6B5438',
        },
        film: {
          grain: 'rgba(255, 255, 255, 0.03)',
          shadow: 'rgba(0, 0, 0, 0.85)',
          highlight: 'rgba(255, 248, 240, 0.95)',
        },
      },
      fontFamily: {
        // Elegant serif for headings - cinematic feel
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        // Clean sans-serif for body
        sans: ['Josefin Sans', 'Montserrat', 'Helvetica Neue', 'sans-serif'],
        // Script for accents
        script: ['Tangerine', 'Dancing Script', 'cursive'],
      },
      fontSize: {
        'display-xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-lg': ['6rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'heading-xl': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'heading-lg': ['2.5rem', { lineHeight: '1.2', letterSpacing: '0' }],
        'heading': ['2rem', { lineHeight: '1.25', letterSpacing: '0.01em' }],
        'subheading': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0.02em' }],
        'body': ['1rem', { lineHeight: '1.75', letterSpacing: '0.02em' }],
        'caption': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.08em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 1s ease-out forwards',
        'slide-in-right': 'slideInRight 1s ease-out forwards',
        'scale-in': 'scaleIn 0.8s ease-out forwards',
        'reveal': 'reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        reveal: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.77, 0, 0.175, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;

