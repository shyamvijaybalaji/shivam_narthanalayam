import { redirect, type Handle } from '@sveltejs/kit';

const CANONICAL_HOST = 'www.shivamnarthanalayam.com';
const APEX_HOST = 'shivamnarthanalayam.com';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.hostname === APEX_HOST) {
		const target = new URL(event.url);
		target.host = CANONICAL_HOST;
		target.protocol = 'https:';
		throw redirect(301, target.toString());
	}

	const response = await resolve(event);

	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'SAMEORIGIN');
	response.headers.set('X-XSS-Protection', '1; mode=block');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
	response.headers.set(
		'Content-Security-Policy',
		[
			"default-src 'self'",
			"script-src 'self' 'unsafe-inline'",
			"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
			"font-src 'self' https://fonts.gstatic.com",
			"img-src 'self' data: https:",
			"media-src 'self'",
			"connect-src 'self' https://*.supabase.co https://api.openai.com https://api.resend.com",
			"frame-src https://www.google.com",
			"object-src 'none'",
			"base-uri 'self'"
		].join('; ')
	);

	return response;
};
