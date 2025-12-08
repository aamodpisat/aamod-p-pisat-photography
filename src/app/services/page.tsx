import { Metadata } from 'next';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { sampleServicePackages } from '@/lib/sampleData';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Wedding and elopement photography packages tailored to your unique love story.',
};

export default function ServicesPage() {
  const services = sampleServicePackages;

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1920&q=80"
            alt="Services hero"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal-900/50" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="font-serif text-display text-cream-100 mb-4">
            Services
          </h1>
          <p className="font-script text-3xl text-sepia-300">
            Investment in timeless memories
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section bg-cream-100">
        <div className="container-wide">
          {/* Intro */}
          <div className="max-w-2xl mx-auto text-center mb-16 md:mb-24">
            <p className="text-caption uppercase tracking-[0.2em] text-sepia-600 mb-4">
              Packages & Pricing
            </p>
            <h2 className="font-serif text-heading-lg text-charcoal-900 mb-6">
              Tailored to Your Story
            </h2>
            <p className="text-body-lg text-charcoal-600 font-light">
              Every love story is unique, and your coverage should be too. 
              Below are my most popular packages, but I'm always happy to 
              create a custom collection that fits your vision and needs.
            </p>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <article
                key={service.uid}
                className={`bg-cream-50 p-8 md:p-10 relative ${
                  service.is_popular
                    ? 'ring-2 ring-sepia-500 md:-mt-4 md:mb-4'
                    : ''
                }`}
              >
                {service.is_popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-sepia-600 text-cream-100 text-xs uppercase tracking-widest px-4 py-2">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="font-serif text-xl md:text-2xl text-charcoal-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-caption uppercase tracking-widest text-sepia-600 mb-4">
                    {service.category}
                  </p>
                  <p className="text-body text-charcoal-600 mb-6">
                    {service.description}
                  </p>
                  <p className="font-serif text-2xl text-charcoal-900">
                    {service.price}
                  </p>
                </div>

                <div className="border-t border-charcoal-200 pt-8">
                  <p className="text-caption uppercase tracking-widest text-charcoal-500 mb-4">
                    Includes
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start text-charcoal-700"
                      >
                        <svg
                          className="w-5 h-5 text-sepia-500 mr-3 mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 text-center">
                  <Button href="/contact" variant="outline" className="w-full">
                    Inquire
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Packages Note */}
      <section className="section-sm bg-cream-200">
        <div className="container-narrow text-center">
          <h3 className="font-serif text-xl text-charcoal-900 mb-4">
            Looking for something different?
          </h3>
          <p className="text-charcoal-600 mb-6">
            I offer custom packages for destination weddings, multi-day celebrations, 
            and unique events. Let's chat about creating something perfect for you.
          </p>
          <Button href="/contact" variant="ghost">
            Contact Me →
          </Button>
        </div>
      </section>

      {/* What's Included */}
      <section className="section bg-charcoal-900 text-cream-100">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="text-caption uppercase tracking-[0.2em] text-sepia-400 mb-4">
              The Experience
            </p>
            <h2 className="font-serif text-heading-lg">
              Every Package Includes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              {
                title: 'Consultation',
                description:
                  'A detailed planning call to understand your vision, timeline, and preferences.',
              },
              {
                title: 'Online Gallery',
                description:
                  'Your beautifully edited images delivered in a password-protected gallery.',
              },
              {
                title: 'Print Rights',
                description:
                  'Full personal print rights so you can share and print your images freely.',
              },
              {
                title: 'Timeline Help',
                description:
                  'Expert guidance on crafting a day timeline that allows for beautiful photos.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="font-serif text-lg text-cream-100 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-cream-400 font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="section bg-cream-100">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-heading-lg text-charcoal-900 mb-6">
            Have Questions?
          </h2>
          <p className="text-body-lg text-charcoal-600 font-light mb-8">
            Visit our FAQ page for answers to common questions about booking, 
            timelines, travel, and more.
          </p>
          <Button href="/faq" variant="outline">
            View FAQ
          </Button>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1920&q=80"
            alt="Contact background"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal-900/60" />
        </div>
        <div className="relative z-10 text-center container-narrow">
          <h2 className="font-serif text-heading-lg text-cream-100 mb-6">
            Ready to Book?
          </h2>
          <p className="text-cream-300 mb-8">
            I'd love to hear about your day and see if we're a good fit.
          </p>
          <Button
            href="/contact"
            variant="outline"
            className="border-cream-100 text-cream-100 hover:bg-cream-100 hover:text-charcoal-900"
          >
            Get In Touch
          </Button>
        </div>
      </section>
    </>
  );
}

