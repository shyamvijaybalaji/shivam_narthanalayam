import { Resend } from 'resend';
import { RESEND_API_KEY, ADMIN_EMAIL } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  preferredClassType?: string;
}

interface ChatbotLeadData {
  name: string;
  email: string;
  phone?: string;
  preferredClassType?: string;
  conversation: string;
}

export async function sendContactFormEmail(data: ContactFormData) {
  try {
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      ${data.preferredClassType ? `<p><strong>Preferred Class:</strong> ${data.preferredClassType}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</small></p>
    `;

    const { data: emailData, error } = await resend.emails.send({
      from: 'Shivam Narthanalayam <noreply@shivamnarthanalayam.com>',
      to: [ADMIN_EMAIL],
      replyTo: data.email,
      subject: `New Enquiry from ${data.name}`,
      html: emailContent
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: emailData };
  } catch (error) {
    console.error('Email service error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function sendChatbotLeadEmail(data: ChatbotLeadData) {
  try {
    const emailContent = `
      <h2>New Lead from Chatbot</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      ${data.preferredClassType ? `<p><strong>Preferred Class:</strong> ${data.preferredClassType}</p>` : ''}
      <h3>Conversation Summary:</h3>
      <p>${data.conversation.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Captured at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</small></p>
    `;

    const { data: emailData, error } = await resend.emails.send({
      from: 'Shivam Narthanalayam Chatbot <noreply@shivamnarthanalayam.com>',
      to: [ADMIN_EMAIL],
      replyTo: data.email,
      subject: `New Lead: ${data.name} - ${data.preferredClassType || 'General Enquiry'}`,
      html: emailContent
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: emailData };
  } catch (error) {
    console.error('Email service error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
