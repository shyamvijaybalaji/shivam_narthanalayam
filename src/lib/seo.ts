// Central SEO configuration and structured-data (schema.org) builders.
// Edit business details here in one place.

export const SITE = {
	url: 'https://www.shivamnarthanalayam.com',
	name: 'Shivam Narthanalayam',
	alternateName: "Shruthi's Dance Academy",
	description:
		'Learn authentic Bharatanatyam in Chennai with award-winning teacher Shruthi Sekar in the Pandanallur Bani (Kalakshetra) style. Free demo class, all ages, online & offline.',
	telephone: '+91-9600025105',
	email: 'shivam@narthanalayam.in',
	// A real photo makes the best social-share preview. Replace with a dedicated
	// 1200x630 banner image when one is available for the cleanest previews.
	defaultImage: '/gallery/gallery-1.jpeg',
	logo: '/logo.png',
	locale: 'en_IN',
	social: [
		'https://www.instagram.com/shivam_narthanalayam',
		'https://youtube.com/@shivamnarthanalayam',
		'https://wa.me/919600025105'
	]
};

const ORG_ID = `${SITE.url}/#organization`;

// Site-wide LocalBusiness / EducationalOrganization node.
export const organizationSchema = {
	'@context': 'https://schema.org',
	'@type': ['LocalBusiness', 'EducationalOrganization'],
	'@id': ORG_ID,
	name: SITE.name,
	alternateName: SITE.alternateName,
	description: SITE.description,
	url: SITE.url,
	logo: `${SITE.url}${SITE.logo}`,
	image: `${SITE.url}${SITE.defaultImage}`,
	telephone: SITE.telephone,
	email: SITE.email,
	priceRange: '₹₹',
	founder: { '@type': 'Person', name: 'Shruthi Sekar' },
	address: {
		'@type': 'PostalAddress',
		streetAddress: 'Pudur',
		addressLocality: 'Chennai',
		addressRegion: 'Tamil Nadu',
		postalCode: '600053',
		addressCountry: 'IN'
	},
	areaServed: ['Chennai', 'Worldwide (online classes)'],
	knowsAbout: ['Bharatanatyam', 'Pandanallur Bani', 'Kalakshetra style', 'Indian classical dance'],
	sameAs: SITE.social
	// Note: aggregateRating intentionally omitted — only add it once real,
	// verifiable reviews exist, or Google may flag it.
};

export const websiteSchema = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	'@id': `${SITE.url}/#website`,
	url: SITE.url,
	name: SITE.name,
	description: SITE.description,
	publisher: { '@id': ORG_ID },
	inLanguage: 'en'
};

// Course schema for the Classes page.
export const courseSchema = {
	'@context': 'https://schema.org',
	'@type': 'Course',
	name: 'Bharatanatyam Classes (Pandanallur Bani / Kalakshetra Style)',
	description:
		'Structured Bharatanatyam training for all ages and levels — offline classes in Chennai and live one-on-one & group classes online. Free demo class available.',
	provider: { '@id': ORG_ID },
	hasCourseInstance: [
		{
			'@type': 'CourseInstance',
			name: 'Offline Classes (Chennai)',
			courseMode: 'onsite',
			location: { '@type': 'Place', name: 'Pudur, Chennai' }
		},
		{
			'@type': 'CourseInstance',
			name: 'Online Classes (Live via Zoom)',
			courseMode: 'online'
		}
	]
};

// Person schema for the About page.
export const personSchema = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: 'Shruthi Sekar',
	jobTitle: 'Bharatanatyam Teacher (Guru)',
	worksFor: { '@id': ORG_ID },
	knowsAbout: ['Bharatanatyam', 'Pandanallur Bani', 'Kalakshetra style'],
	award: 'Abhinaya Rani Award (2006)'
};
