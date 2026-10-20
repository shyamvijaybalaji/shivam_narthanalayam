import { env } from '$env/dynamic/private';

interface EnquiryData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  preferredClassType?: string;
}

export async function sendWhatsAppEnquiryAlert(data: EnquiryData) {
  const apiKey = env.CALLMEBOT_API_KEY;
  const phone = env.CALLMEBOT_PHONE;

  if (!apiKey || apiKey === 'PENDING' || !phone) {
    console.log('WhatsApp notifications not yet configured — skipping.');
    return { success: false, reason: 'not_configured' };
  }

  const lines = [
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

  const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(lines)}&apikey=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      const body = await res.text();
      console.error('CallMeBot error:', res.status, body);
      return { success: false, error: body };
    }
    return { success: true };
  } catch (err) {
    console.error('WhatsApp notification failed:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}
