import { PageHero, InquiryBand } from '@/components/editorial';
import { getPortfolioPageContent } from '@/lib/contentstack';

const faqs = [
  {
    category: 'Booking',
    questions: [
      {
        question: 'How far in advance should I book?',
        answer:
          'I recommend reaching out 12-18 months before your wedding date for popular seasons (spring and fall). However, I occasionally have openings for closer dates, so don\'t hesitate to inquire even if your date is sooner.',
      },
      {
        question: 'What is required to book?',
        answer:
          'To secure your date, I require a signed contract and a non-refundable retainer (typically 30% of the agreed coverage total). The remaining balance is due 30 days before your wedding.',
      },
      {
        question: 'Do you travel for weddings?',
        answer:
          'Absolutely! I love destination weddings and am happy to travel anywhere in the world. For weddings within the continental US, travel is often included. For international destinations, we\'ll discuss travel logistics and any additional costs.',
      },
    ],
  },
  {
    category: 'Coverage',
    questions: [
      {
        question: 'How many hours of coverage do I need?',
        answer:
          'This depends on your timeline and priorities. Most full weddings benefit from 8-10 hours of coverage (from getting ready through reception highlights). Elopements and intimate ceremonies may only need 2-6 hours. We\'ll discuss your specific needs during our consultation.',
      },
      {
        question: 'Do you offer engagement sessions?',
        answer:
          'Yes! Engagement sessions are a wonderful way for us to get comfortable working together before your big day. They\'re also perfect for save-the-dates and wedding website photos. We can discuss including one when planning your coverage.',
      },
      {
        question: 'Do you work with a second photographer?',
        answer:
          'For weddings with more than 75 guests or complex timelines, I highly recommend a second photographer. We can discuss the right team and coverage for your celebration during our consultation.',
      },
    ],
  },
  {
    category: 'Delivery',
    questions: [
      {
        question: 'When will I receive my photos?',
        answer:
          'Wedding galleries are delivered within 6-8 weeks. Engagement sessions and elopements typically arrive within 3-4 weeks. I\'ll share a small preview gallery within 1-2 weeks so you have images to enjoy right away.',
      },
      {
        question: 'How many photos will I receive?',
        answer:
          'The number varies based on coverage length and your specific day, but you can generally expect 50-80 images per hour of coverage. Quality always takes precedence over quantity—I deliver every meaningful moment, beautifully edited.',
      },
      {
        question: 'Do you provide RAW/unedited files?',
        answer:
          'No, I don\'t provide RAW files. My editing process is an integral part of my artistic vision, and the final gallery represents my best work. Every image is individually edited to ensure consistency and quality.',
      },
    ],
  },
  {
    category: 'General',
    questions: [
      {
        question: 'What is your shooting style?',
        answer:
          'My style is best described as cinematic, romantic, and documentary. I focus on authentic moments and genuine emotions rather than overly posed shots. While I\'ll provide gentle guidance to ensure flattering compositions, I\'m most inspired by capturing how you naturally interact.',
      },
      {
        question: 'What happens if you\'re sick or have an emergency?',
        answer:
          'While this has never happened, I have a network of trusted photographers who can step in if needed. Your wedding will always be covered, and I\'ll ensure any substitute photographer matches my style and quality standards.',
      },
      {
        question: 'Do you have liability insurance?',
        answer:
          'Yes, I carry full liability insurance and can provide a certificate of insurance if your venue requires it.',
      },
    ],
  },
];

export default async function FAQPage() {
  const portfolio = await getPortfolioPageContent();
  return <>
    <PageHero eyebrow="Good to know" title="Your questions, answered" description="A calmer way to plan the details before we work together." image={portfolio?.hero_section?.background_image?.url} tag="Planning with confidence" ctaText="Read the questions" ctaHref="#questions" />
    <section id="questions" className="section"><div className="inner"><p className="eyebrow">FAQ</p><h2 className="headline">A few things to know</h2><div style={{ maxWidth: 850, margin: 'auto' }}>
      {faqs.map(category => <div key={category.category}><p className="caption">{category.category}</p>{category.questions.map(item => <details key={item.question} className="faq-item"><summary>{item.question}</summary><p className="copy">{item.answer}</p></details>)}</div>)}
    </div></div></section><InquiryBand />
  </>;
}
