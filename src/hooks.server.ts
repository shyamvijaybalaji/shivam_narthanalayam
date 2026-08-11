import { redirect, type Handle } from '@sveltejs/kit';
import { dev } from '$app/environment';

// Canonicalise the host to the "www" domain so search engines index a single
// version of every page (avoids www vs non-www duplicate content).
// Only fires for the bare apex domain in production; localhost/dev is untouched.
const CANONICAL_HOST = 'www.shivamnarthanalayam.com';
const APEX_HOST = 'shivamnarthanalayam.com';

// Content-Security-Policy. Uses 'unsafe-inline' because SvelteKit hydration and
// many components rely on inline scripts/styles; origins are still restricted so
// no external script/style/frame can load. Tighten to nonce-based later if desired.
const CSP = [
	"default-src 'self'",
	"script-src 'self' 'unsafe-inline'",
	"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
	"font-src 'self' https://fonts.gstatic.com data:",
	"img-src 'self' data:",
	"media-src 'self'",
	"connect-src 'self' https://*.supabase.co",
	"frame-src https://www.google.com",
	"frame-ancestors 'none'",
	"base-uri 'self'",
	"form-action 'self'",
	"object-src 'none'"
].join('; ');

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.hostname === APEX_HOST) {
		const target = new URL(event.url);
		target.host = CANONICAL_HOST;
		target.protocol = 'https:';
		throw redirect(301, target.toString());
	}

	const response = await resolve(event);

	// Security headers (production only, so Vite HMR / localhost is unaffected).
	if (!dev) {
		response.headers.set('Content-Security-Policy', CSP);
		response.headers.set('X-Content-Type-Options', 'nosniff');
		response.headers.set('X-Frame-Options', 'SAMEORIGIN');
		response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
		response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
	}

	return response;
};
