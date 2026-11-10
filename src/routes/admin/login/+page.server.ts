import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { mintToken } from '$lib/utils/adminAuth';
import { checkRateLimit } from '$lib/utils/rateLimit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request, cookies, getClientAddress }) => {
    // Brute-force protection: 10 attempts per 15 minutes per IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? getClientAddress();
    const rl = checkRateLimit(`admin-login:${ip}`, 10, 15 * 60 * 1000);
    if (!rl.allowed) {
      return { error: 'Too many login attempts. Please wait before trying again.' };
    }

    const form = await request.formData();
    const password = form.get('password') as string;

    if (!env.ADMIN_SECRET) {
      return { error: 'Admin access not configured.' };
    }

    if (password === env.ADMIN_SECRET) {
      const token = mintToken(env.ADMIN_SECRET);
      cookies.set('admin_session', token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
      });
      throw redirect(302, '/admin');
    }

    return { error: 'Incorrect password.' };
  }
};
