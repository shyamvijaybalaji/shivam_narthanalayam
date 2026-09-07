<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';
	import WhatsAppButton from '$lib/components/WhatsAppButton.svelte';
	import ChatBot from '$lib/components/ChatBot.svelte';
	import { organizationSchema, websiteSchema } from '$lib/seo';

	let { children } = $props();
</script>

<svelte:head>
	<!-- Favicon -->
	<link rel="icon" type="image/png" href="/logo.png" />
	<link rel="apple-touch-icon" href="/logo.png" />

	<!-- Meta tags -->
	<meta name="theme-color" content="#800020" />
	<meta name="google-site-verification" content="EC-jBCPiWz08F3p_52H9dzg7rG_IYSntD-jeOLXsAKA" />

	<!-- Site-wide structured data (LocalBusiness + WebSite) -->
	{@html `<script type="application/ld+json">${JSON.stringify(organizationSchema)}<\/script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(websiteSchema)}<\/script>`}
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Header />

	<main class="flex-grow">
		{@render children()}
	</main>

	<Footer />

	<!-- Global Components -->
	<WhatsAppButton />
	<ChatBot />
</div>
