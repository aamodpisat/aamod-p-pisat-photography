import { Metadata } from 'next';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Learn about our photography process from inquiry to gallery delivery.',
};

const steps = [
  {
    number: '01',
    title: 'Reach Out',
    description:
      'Start by filling out the inquiry form or sending me an email. Tell me about your story, your vision for the day, and any details that feel important. I love learning what makes each couple unique.',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80',
  },
  {
    number: '02',
    title: 'Let's Connect',
    description:
      'Once I've received your inquiry, I'll reach out to schedule a call or video chat. This is where we dive deeper—I want to hear your story, understand your aesthetic preferences, and answer all your questions.',
    image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=600&q=80',
  },
  {
    number: '03',
    title: 'Secure Your Date',
    description:
      'If we're the right fit, I'll send over a proposal with package options. Once you've chosen your collection, a retainer and signed contract will officially book your date on my calendar.',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80',
  },
  {
    number: '04',
    title: 'Planning Together',
    description:
      'As your day approaches, we'll work together on timeline planning to ensure we have plenty of time for portraits during the best light. I'll also provide guidance on locations, flow, and what to expect.',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80',
  },
  {
    number: '05',
    title: 'Your Wedding Day',
    description:
      'This is where the magic happens. I'll be there to document your day from getting ready to the last dance—capturing every laugh, tear, and quiet moment in between.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
  },
  {
    number: '06',
    title: 'Gallery Delivery',
    description:
      'Within 6-8 weeks, your beautifully edited gallery will be ready. You'll receive access to a private online gallery where you can view, download, and share your images with loved ones.',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80"
            alt="How it works hero"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal-900/50" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="font-serif text-display text-cream-100 mb-4">
            How It Works
          </h1>
          <p className="font-script text-3xl text-sepia-300">
            From inquiry to gallery
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section bg-cream-100">
        <div className="container-wide">
          {/* Intro */}
          <div className="max-w-2xl mx-auto text-center mb-16 md:mb-24">
            <p className="text-caption uppercase tracking-[0.2em] text-sepia-600 mb-4">
              The Process
            </p>
            <h2 className="font-serif text-heading-lg text-charcoal-900 mb-6">
              Your Journey With Me
            </h2>
            <p className="text-body-lg text-charcoal-600 font-light">
              From the moment you reach out to the day you receive your gallery, 
              I want your experience to be as beautiful as the images we create together.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-24">
            {steps.map((step, index) => (
              <article
                key={step.number}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  index % 2 === 1 ? '' : ''
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <span className="font-serif text-6xl md:text-7xl text-sepia-200">
                    {step.number}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-charcoal-900 mt-4 mb-6">
                    {step.title}
                  </h3>
                  <p className="text-body-lg text-charcoal-600 font-light">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="section bg-cream-200">
        <div className="container-narrow text-center">
          <p className="text-caption uppercase tracking-[0.2em] text-sepia-600 mb-4">
            Still Have Questions?
          </p>
          <h2 className="font-serif text-heading-lg text-charcoal-900 mb-6">
            Check Our FAQ
          </h2>
          <p className="text-body-lg text-charcoal-600 font-light mb-8">
            Find answers to common questions about booking, timelines, 
            travel policies, and more.
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
            Ready to Start?
          </h2>
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

