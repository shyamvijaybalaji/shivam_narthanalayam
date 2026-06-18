<script lang="ts">
	import { page } from '$app/state';
	import { SITE } from '$lib/seo';

	let {
		title,
		description,
		path,
		image = SITE.defaultImage,
		type = 'website',
		jsonLd
	}: {
		title: string;
		description: string;
		path?: string;
		image?: string;
		type?: string;
		jsonLd?: unknown;
	} = $props();

	const canonical = $derived(SITE.url + (path ?? page.url.pathname));
	const fullImage = $derived(image.startsWith('http') ? image : SITE.url + image);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<!-- Open Graph -->
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={SITE.name} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={fullImage} />
	<meta property="og:locale" content={SITE.locale} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={fullImage} />

	{#if jsonLd}
		{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`}
	{/if}
</svelte:head>
