import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getChatbotResponse, shouldCollectLeadInfo } from '$lib/utils/openai';
import { submitEnquiry } from '$lib/utils/supabase';
import { sendChatbotLeadEmail } from '$lib/utils/email';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { message, conversationHistory, leadData } = await request.json();

    if (!message || typeof message !== 'string') {
      return json({ error: 'Invalid message' }, { status: 400 });
    }

    // If lead data is provided, store it
    if (leadData && leadData.name && leadData.email) {
      const enquiryResult = await submitEnquiry({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone && leadData.phone.trim() ? leadData.phone.trim() : undefined,
        message: leadData.conversation || message,
        preferred_class_type: leadData.preferredClassType,
        source: 'chatbot'
      });

      if (!enquiryResult.success) {
        console.error('Failed to submit enquiry:', enquiryResult.error);
        return json(
          {
            error: 'Failed to save your information. Please try again or contact us directly.',
            details: enquiryResult.error
          },
          { status: 500 }
        );
      }

      // Send email notification
      const emailResult = await sendChatbotLeadEmail({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        preferredClassType: leadData.preferredClassType,
        conversation: leadData.conversation || message
      });

      if (!emailResult.success) {
        console.error('Failed to send email:', emailResult.error);
        // Don't fail the request if email fails, but log it
      }

      // Return success for lead submission
      return json({
        success: true,
        message: `Thank you, ${leadData.name}! We've received your information and will contact you shortly at ${leadData.email}. Looking forward to welcoming you to Shivam Narthanalayam!`
      });
    }

    // Get AI response
    const response = await getChatbotResponse(message, conversationHistory);

    if (!response.success) {
      return json(
        {
          message: response.message,
          error: response.error
        },
        { status: 500 }
      );
    }

    return json({
      message: response.message,
      shouldCollectLead: shouldCollectLeadInfo(message)
    });
  } catch (error) {
    console.error('Chatbot API error:', error);
    return json(
      {
        message: 'I apologize, but I am currently experiencing technical difficulties. Please contact us directly at +91-9600025105 or shivam@narthanalayam.in.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
};
