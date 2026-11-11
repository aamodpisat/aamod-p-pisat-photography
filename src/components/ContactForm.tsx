'use client';

import { useState } from 'react';
import { ContactPageContent, SiteConfig } from '@/lib/types';
import { PageHero } from '@/components/editorial';

type FormState = { name: string; email: string; phone: string; eventDate: string; eventType: string; location: string; howDidYouHear: string; message: string };
const empty: FormState = { name: '', email: '', phone: '', eventDate: '', eventType: '', location: '', howDidYouHear: '', message: '' };

export default function ContactForm({ content, siteConfig }: { content: ContactPageContent; siteConfig: SiteConfig }) {
  const [form, setForm] = useState<FormState>(empty);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const labels = content.form_labels || {};
  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(current => ({ ...current, [e.target.name]: e.target.value }));
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setSending(true); setError('');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || 'The inquiry could not be sent.');
      setSent(true); setForm(empty);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'The inquiry could not be sent.'); }
    finally { setSending(false); }
  };
  return <>
    <PageHero eyebrow="Get in touch" title={content.info_section?.title || "I'd Love to Hear Your Story"} description={content.info_section?.info_description} image={content.banner?.image?.url} tag={content.location || 'Available across India'} ctaText="Start an inquiry" ctaHref="#inquiry" />
    <section id="inquiry" className="section sand"><div className="inner contact-grid">
      <div><p className="eyebrow">{content.info_section?.subtitle || 'Get in touch'}</p><h2>Tell me what you're dreaming up.</h2><p className="copy">{content.banner?.tagline}</p><div className="rule-list"><div>Based in <span>Mumbai, India</span></div><div>Available <span>{content.location || 'Across India'}</span></div><div>Email <span>{siteConfig.contact_email}</span></div></div></div>
      {sent ? <div role="status"><h2>{content.success?.success_title || 'Thank you!'}</h2><p className="copy">{content.success?.success_message || "Your inquiry has been received. I'll be in touch soon."}</p><button className="button" onClick={() => setSent(false)}>Send another inquiry</button></div> :
      <form className="form-grid" onSubmit={submit}>
        <div className="field"><label htmlFor="contact-name">{labels.name_label || 'Name *'}</label><input id="contact-name" name="name" value={form.name} onChange={update} autoComplete="name" required /></div>
        <div className="field"><label htmlFor="contact-email">{labels.email_label || 'Email *'}</label><input id="contact-email" name="email" type="email" value={form.email} onChange={update} autoComplete="email" required /></div>
        <div className="field"><label htmlFor="contact-phone">{labels.phone_label || 'Phone'}</label><input id="contact-phone" name="phone" type="tel" value={form.phone} onChange={update} autoComplete="tel" /></div>
        <div className="field"><label htmlFor="contact-date">{labels.event_date_label || 'Event Date'}</label><input id="contact-date" name="eventDate" type="date" value={form.eventDate} onChange={update} /></div>
        <div className="field"><label htmlFor="contact-type">{labels.event_type_label || 'Event Type'}</label><select id="contact-type" name="eventType" value={form.eventType} onChange={update}><option value="">Select an event</option>{(content.event_type_options || []).map(item => <option key={item} value={item}>{item.trim()}</option>)}</select></div>
        <div className="field"><label htmlFor="contact-location">{labels.location_label || 'Location'}</label><input id="contact-location" name="location" value={form.location} onChange={update} /></div>
        <div className="field full"><label htmlFor="contact-referral">{labels.how_heard_label || 'How did you hear about me?'}</label><select id="contact-referral" name="howDidYouHear" value={form.howDidYouHear} onChange={update}><option value="">Select one</option>{(content.referral_options || []).map(item => <option key={item} value={item}>{item.trim()}</option>)}</select></div>
        <div className="field full"><label htmlFor="contact-message">{labels.message_label || 'Tell me about your plans *'}</label><textarea id="contact-message" name="message" value={form.message} onChange={update} required /></div>
        {error && <p className="form-note" role="alert">{error}</p>}
        <button className="button dark" type="submit" disabled={sending}>{sending ? 'Sending…' : labels.submit_button_text || 'Send Inquiry'} ↗</button>
      </form>}
    </div></section>
  </>;
}
