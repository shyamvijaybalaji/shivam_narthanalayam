import { redirect, type Handle } from '@sveltejs/kit';

// Canonicalise the host to the "www" domain so search engines index a single
// version of every page (avoids www vs non-www duplicate content).
// Only fires for the bare apex domain in production; localhost/dev is untouched.
const CANONICAL_HOST = 'www.shivamnarthanalayam.com';
const APEX_HOST = 'shivamnarthanalayam.com';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.hostname === APEX_HOST) {
		const target = new URL(event.url);
		target.host = CANONICAL_HOST;
		target.protocol = 'https:';
		throw redirect(301, target.toString());
	}

	return resolve(event);
};
