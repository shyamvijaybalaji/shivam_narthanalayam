import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

const client = new OpenAI({
  apiKey: OPENAI_API_KEY
});

const SYSTEM_PROMPT = `You are a helpful assistant for Shivam Narthanalayam, a Bharatanatyam dance academy in Chennai.

ACADEMY INFORMATION:
- Teacher: Shruthi Sekar (10+ years training, 5 years teaching experience)
- Style: Pandanallur Bani (Kalakshetra style)
- Award: Abhinaya Rani Award 2006
- Training under: Prakash Krishna (Cuddalore), Ratheesh Krishna (Chennai), Sophia Ratheesh (Chennai)
- Teaching Tradition: Guru-Shishya Parampara

OFFLINE GROUP CLASSES:
- Location: Little Millennium Play School, Pudur, Chennai 600053
- Google Maps: https://maps.app.goo.gl/2Ed8vJet8DTRBzR67
- Batch 1: Monday & Wednesday 4:30-6:30 PM IST
- Batch 2: Tuesday & Thursday 4:30-6:30 PM IST
- Levels: Beginner, Intermediate, Advanced
- All ages, all genders welcome
- Fee: ₹800/month
- Admission Fee: ₹1,000 one-time
- Trial Class: FREE 1 demo class

ONLINE ONE-TO-ONE CLASSES:
- Platform: Zoom
- Schedule: Flexible timing arranged with student
- Frequency: 8 classes/month (typically 2x per week)
- Fee: ₹1,000/month

ENROLLMENT PROCESS:
1. Student visits academy for free demo class
2. If approved by Shruthi, then enrollment

CONTACT:
- Phone: +91-9600025105
- Email: shivam@narthanalayam.in
- WhatsApp: +91-9600025105

Be warm, friendly, and culturally appropriate. Focus on the traditional values and rich heritage of Bharatanatyam.
If a user wants to enroll or needs personal attention, collect: name, phone, email, and preferred class type (offline/online).
Always end responses with "Would you like to book your FREE demo class?"`;

export async function getChatbotResponse(userMessage: string, conversationHistory: Array<{ role: string; content: string }> = []) {
  try {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    const response = await client.chat.completions.create({
      model: 'gpt-4',
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 500
    });

    return {
      success: true,
      message: response.choices[0]?.message?.content || 'I apologize, I could not generate a response.',
      usage: response.usage
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return {
      success: false,
      message: 'I apologize, but I am currently unable to respond. Please contact us directly at +91-9600025105 or shivam@narthanalayam.in.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export function shouldCollectLeadInfo(userMessage: string): boolean {
  const enrollmentKeywords = ['enroll', 'join', 'register', 'admission', 'demo class', 'trial', 'interested', 'want to learn', 'sign up', 'book'];
  const messageLower = userMessage.toLowerCase();
  return enrollmentKeywords.some(keyword => messageLower.includes(keyword));
}
