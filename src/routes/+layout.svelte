<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';
	import WhatsAppButton from '$lib/components/WhatsAppButton.svelte';
	import ChatBot from '$lib/components/ChatBot.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet">

	<!-- Favicon -->
	<link rel="icon" type="image/x-icon" href="/favicon.ico" />

	<!-- Meta tags -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="theme-color" content="#800020" />
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
