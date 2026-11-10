import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getChatbotResponse, shouldCollectLeadInfo } from '$lib/utils/openai';
import { submitEnquiry } from '$lib/utils/supabase';
import { sendChatbotLeadEmail } from '$lib/utils/email';
import { checkRateLimit } from '$lib/utils/rateLimit';

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_ENTRIES = 10;
const MAX_HISTORY_CONTENT_LENGTH = 500;

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  // Rate limit: 30 requests per hour per IP (generous for real users, blocks abuse)
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? getClientAddress();
  const rl = checkRateLimit(`chatbot:${ip}`, 30, 60 * 60 * 1000);
  if (!rl.allowed) {
    return json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(rl.retryAfterMs / 1000)) } }
    );
  }

  try {
    const body = await request.json();
    const { message, conversationHistory, leadData } = body;

    if (!message || typeof message !== 'string') {
      return json({ error: 'Invalid message' }, { status: 400 });
    }

    // Cap message length — prevents large/expensive payloads
    if (message.length > MAX_MESSAGE_LENGTH) {
      return json({ error: 'Message too long (max 500 characters)' }, { status: 400 });
    }

    // Sanitize conversation history — prevents system-role injection attacks
    const safeHistory = Array.isArray(conversationHistory)
      ? conversationHistory
          .slice(-MAX_HISTORY_ENTRIES)
          .filter(
            (m): m is { role: string; content: string } =>
              m != null &&
              typeof m === 'object' &&
              typeof m.content === 'string'
          )
          .map((m) => ({
            // Only allow 'user' or 'assistant' — never 'system'
            role: m.role === 'user' ? 'user' : ('assistant' as const),
            content: String(m.content).slice(0, MAX_HISTORY_CONTENT_LENGTH)
          }))
      : [];

    // If lead data is provided, store it
    if (leadData && leadData.name && leadData.email) {
      const enquiryResult = await submitEnquiry({
        name: String(leadData.name).slice(0, 100),
        email: String(leadData.email).slice(0, 200),
        phone: leadData.phone ? String(leadData.phone).trim().slice(0, 20) : undefined,
        age: leadData.age ? String(leadData.age).trim().slice(0, 10) : undefined,
        message: leadData.conversation ? String(leadData.conversation).slice(0, 2000) : message,
        preferred_class_type: leadData.preferredClassType,
        source: 'chatbot'
      });

      if (!enquiryResult.success) {
        console.error('Failed to submit enquiry:', enquiryResult.error);
        return json(
          { error: 'Failed to save your information. Please try again or contact us directly.' },
          { status: 500 }
        );
      }

      await sendChatbotLeadEmail({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        age: leadData.age ? String(leadData.age).trim() : undefined,
        preferredClassType: leadData.preferredClassType,
        conversation: leadData.conversation || message
      });

      return json({
        success: true,
        message: `Thank you, ${leadData.name}! We've received your information and will contact you shortly at ${leadData.email}. Looking forward to welcoming you to Shivam Narthanalayam!`
      });
    }

    // Get AI response
    const response = await getChatbotResponse(message, safeHistory);

    if (!response.success) {
      return json({ message: response.message, error: response.error }, { status: 500 });
    }

    return json({
      message: response.message,
      shouldCollectLead: shouldCollectLeadInfo(message)
    });
  } catch (error) {
    console.error('Chatbot API error:', error);
    return json(
      {
        message:
          'I apologize, but I am currently experiencing technical difficulties. Please contact us directly at +91-9600025105 or shivam@narthanalayam.in.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
};
