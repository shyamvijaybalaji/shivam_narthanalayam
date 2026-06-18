import { SITE } from '$lib/seo';
import type { RequestHandler } from './$types';

const pages = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/about', priority: '0.8', changefreq: 'monthly' },
	{ path: '/classes', priority: '0.9', changefreq: 'monthly' },
	{ path: '/gallery', priority: '0.7', changefreq: 'monthly' },
	{ path: '/contact', priority: '0.8', changefreq: 'yearly' }
];

export const prerender = true;

export const GET: RequestHandler = () => {
	const lastmod = new Date().toISOString().split('T')[0];

	const urls = pages
		.map(
			(p) => `	<url>
		<loc>${SITE.url}${p.path}</loc>
		<lastmod>${lastmod}</lastmod>
		<changefreq>${p.changefreq}</changefreq>
		<priority>${p.priority}</priority>
	</url>`
		)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
