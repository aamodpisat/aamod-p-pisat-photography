import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Info',
  description: 'Learn more about working with Aamod P. Pisat Photography.',
};

const infoLinks = [
  {
    title: 'How It Works',
    description: 'Our step-by-step process from inquiry to gallery delivery.',
    href: '/how-it-works',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80',
  },
  {
    title: 'Services & Pricing',
    description: 'Explore our photography and film packages.',
    href: '/services',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
  },
  {
    title: 'FAQ',
    description: 'Answers to commonly asked questions.',
    href: '/faq',
    image: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=600&q=80',
  },
];

export default function InfoPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1920&q=80"
            alt="Info hero"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal-900/50" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="font-serif text-display text-cream-100 mb-4">
            Info
          </h1>
          <p className="font-script text-3xl text-sepia-300">
            Everything you need to know
          </p>
        </div>
      </section>

      {/* Info Links */}
      <section className="section bg-cream-100">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {infoLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden mb-6">
                  <Image
                    src={link.image}
                    alt={link.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-charcoal-900/20 group-hover:bg-charcoal-900/40 transition-colors duration-300" />
                </div>
                <h2 className="font-serif text-2xl text-charcoal-900 group-hover:text-sepia-700 transition-colors mb-3">
                  {link.title}
                </h2>
                <p className="text-charcoal-600 font-light mb-4">
                  {link.description}
                </p>
                <span className="inline-flex items-center text-caption uppercase tracking-widest text-sepia-600 group-hover:text-sepia-700 transition-colors">
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section bg-cream-200">
        <div className="container-narrow text-center">
          <p className="text-caption uppercase tracking-[0.2em] text-sepia-600 mb-4">
            Ready to Begin?
          </p>
          <h2 className="font-serif text-heading-lg text-charcoal-900 mb-6">
            Let's Create Something Beautiful
          </h2>
          <p className="text-body-lg text-charcoal-600 font-light mb-10">
            I'd love to hear your story and explore how we can capture your 
            most meaningful moments together.
          </p>
          <a
            href="/contact"
            className="btn-cinematic"
          >
            Contact Me
          </a>
        </div>
      </section>
    </>
  );
}

