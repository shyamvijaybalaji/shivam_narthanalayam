import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { submitEnquiry } from '$lib/utils/supabase';
import { sendContactFormEmail } from '$lib/utils/email';

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();

    // Basic validation
    const errors: string[] = [];
    if (!data.name || data.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
    if (!data.email || !validateEmail(data.email)) {
      errors.push('Valid email is required');
    }
    if (!data.message || data.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long');
    }

    if (errors.length > 0) {
      return json({ error: 'Validation failed', errors }, { status: 400 });
    }

    // Submit to Supabase
    const enquiryResult = await submitEnquiry({
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone && data.phone.trim() ? data.phone.trim() : undefined,
      message: data.message.trim(),
      preferred_class_type: data.preferredClassType,
      source: 'contact_form'
    });

    if (!enquiryResult.success) {
      throw new Error(enquiryResult.error);
    }

    // Send email notification
    const emailResult = await sendContactFormEmail({
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim(),
      message: data.message.trim(),
      preferredClassType: data.preferredClassType
    });

    if (!emailResult.success) {
      console.error('Failed to send email notification:', emailResult.error);
    }

    return json({
      success: true,
      message: 'Thank you for your enquiry! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Contact form submission error:', error);

    return json(
      {
        error: 'Failed to send message. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
};
