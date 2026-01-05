import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

// Lazy initialization of Supabase client
let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!supabaseInstance) {
    if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('Supabase environment variables are not configured. Please set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY.');
    }

    supabaseInstance = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
  }
  return supabaseInstance;
}

// Type for contact form submission
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Type for enquiry submission
export interface Enquiry {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  preferred_class_type?: string;
  source?: string;
  created_at?: string;
}

// Function to submit contact form (legacy - kept for compatibility)
export async function submitContactForm(data: ContactFormData) {
  const supabase = getSupabaseClient();

  const { error } = await supabase
    .from('contacts')
    .insert([
      {
        name: data.name,
        email: data.email,
        message: data.message,
        created_at: new Date().toISOString()
      }
    ]);

  if (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }

  return { success: true };
}

// Function to submit enquiry
export async function submitEnquiry(enquiry: Enquiry) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from('enquiries')
    .insert([{
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      message: enquiry.message,
      preferred_class_type: enquiry.preferred_class_type,
      source: enquiry.source || 'contact_form',
      created_at: new Date().toISOString()
    }])
    .select();

  if (error) {
    console.error('Supabase insert error:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}
