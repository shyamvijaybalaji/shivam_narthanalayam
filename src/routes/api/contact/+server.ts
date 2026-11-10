import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { submitEnquiry } from '$lib/utils/supabase';
import { sendContactFormEmail } from '$lib/utils/email';
import { sendWhatsAppEnquiryAlert } from '$lib/utils/whatsapp';
import { checkRateLimit } from '$lib/utils/rateLimit';

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  // Rate limit: 5 submissions per 10 minutes per IP (stops spam bots)
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? getClientAddress();
  const rl = checkRateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
  if (!rl.allowed) {
    return json(
      { error: 'Too many submissions. Please wait a few minutes before trying again.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(rl.retryAfterMs / 1000)) } }
    );
  }

  try {
    const data = await request.json();

    const errors: string[] = [];

    if (!data.name || String(data.name).trim().length < 2)
      errors.push('Name must be at least 2 characters long');
    if (String(data.name ?? '').trim().length > 100)
      errors.push('Name must be less than 100 characters');

    if (!data.email || !validateEmail(String(data.email)))
      errors.push('Valid email is required');
    if (String(data.email ?? '').length > 200)
      errors.push('Email address is too long');

    if (!data.message || String(data.message).trim().length < 10)
      errors.push('Message must be at least 10 characters long');
    if (String(data.message ?? '').trim().length > 2000)
      errors.push('Message must be less than 2000 characters');

    if (errors.length > 0) {
      return json({ error: 'Validation failed', errors }, { status: 400 });
    }

    const enquiryResult = await submitEnquiry({
      name: String(data.name).trim().slice(0, 100),
      email: String(data.email).trim().slice(0, 200),
      phone: data.phone ? String(data.phone).trim().slice(0, 20) : undefined,
      country: data.country ? String(data.country).trim().slice(0, 100) : undefined,
      age: data.age ? String(data.age).trim().slice(0, 10) : undefined,
      message: String(data.message).trim().slice(0, 2000),
      preferred_class_type: data.preferredClassType,
      source: 'contact_form'
    });

    if (!enquiryResult.success) {
      throw new Error(enquiryResult.error);
    }

    const emailResult = await sendContactFormEmail({
      name: String(data.name).trim(),
      email: String(data.email).trim(),
      phone: data.phone?.trim(),
      country: data.country?.trim(),
      age: data.age ? String(data.age).trim() : undefined,
      message: String(data.message).trim(),
      preferredClassType: data.preferredClassType
    });

    if (!emailResult.success) {
      console.error('Failed to send email notification:', emailResult.error);
    }

    const waResult = await sendWhatsAppEnquiryAlert({
      name: String(data.name).trim(),
      email: String(data.email).trim(),
      phone: data.phone?.trim(),
      country: data.country?.trim(),
      message: String(data.message).trim(),
      preferredClassType: data.preferredClassType
    });

    if (!waResult.success && waResult.reason !== 'not_configured') {
      console.error('Failed to send WhatsApp notification:', waResult.error);
    }

    return json({ success: true, message: 'Thank you for your enquiry! We will get back to you soon.' });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
};
