import { env } from '$env/dynamic/private';

interface EnquiryData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  preferredClassType?: string;
}

function buildMessage(data: EnquiryData): string {
  return [
    `📩 *New Enquiry — Shivam Narthanalayam*`,
    ``,
    `👤 *Name:* ${data.name}`,
    `📧 *Email:* ${data.email}`,
    data.phone ? `📱 *Phone:* ${data.phone}` : null,
    data.preferredClassType ? `💃 *Class:* ${data.preferredClassType}` : null,
    ``,
    `💬 *Message:*`,
    data.message,
    ``,
    `🕐 ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`
  ]
    .filter((l) => l !== null)
    .join('\n');
}

export async function sendWhatsAppEnquiryAlert(data: EnquiryData) {
  const message = buildMessage(data);

  // TextMeBot takes priority if configured
  const textmebotKey = env.TEXTMEBOT_API_KEY;
  const textmebotPhone = env.TEXTMEBOT_PHONE;
  if (textmebotKey && textmebotKey !== 'PENDING' && textmebotPhone) {
    const url = `https://api.textmebot.com/send.php?recipient=${textmebotPhone}&apikey=${textmebotKey}&text=${encodeURIComponent(message)}`;
    try {
      const res = await fetch(url);
      const body = await res.text();
      if (!res.ok) {
        console.error('TextMeBot error:', res.status, body);
        return { success: false, error: body };
      }
      return { success: true };
    } catch (err) {
      console.error('TextMeBot notification failed:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
    }
  }

  // Fall back to CallMeBot once its slot opens
  const callmebotKey = env.CALLMEBOT_API_KEY;
  const callmebotPhone = env.CALLMEBOT_PHONE;
  if (callmebotKey && callmebotKey !== 'PENDING' && callmebotPhone) {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${callmebotPhone}&text=${encodeURIComponent(message)}&apikey=${callmebotKey}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        const body = await res.text();
        console.error('CallMeBot error:', res.status, body);
        return { success: false, error: body };
      }
      return { success: true };
    } catch (err) {
      console.error('CallMeBot notification failed:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
    }
  }

  console.log('WhatsApp notifications not yet configured — skipping.');
  return { success: false, reason: 'not_configured' };
}
