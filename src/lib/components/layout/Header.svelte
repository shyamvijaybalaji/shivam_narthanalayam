<script lang="ts">
  import { page } from '$app/stores';

  let mobileMenuOpen = false;
  let scrolled = false;

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function handleScroll() {
    scrolled = window.scrollY > 20;
  }

  $: currentPath = $page.url.pathname;

  function isActive(path: string): boolean {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  }
</script>

<svelte:window on:scroll={handleScroll} />

<header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'}">
  <nav class="container-custom">
    <div class="flex items-center justify-between h-16 sm:h-20">
      <!-- Logo/Brand -->
      <div class="flex-shrink-0">
        <a href="/" class="flex items-center space-x-3 group">
          <div class="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <span class="text-white font-bold text-xl">SN</span>
          </div>
          <div class="hidden sm:block">
            <p class="font-bold text-lg leading-none" style="color: var(--color-primary-600);">Shivam Narthanalayam</p>
            <p class="text-xs leading-none mt-1" style="color: var(--color-secondary-600);">Bharatanatyam Academy</p>
          </div>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-1">
        <a
          href="/"
          class="px-4 py-2 text-sm font-medium rounded-lg transition-colors {isActive('/') && currentPath === '/' ? 'bg-primary-600 text-white' : 'hover:bg-cream-200'}"
          style="color: {isActive('/') && currentPath === '/' ? '#fff' : 'var(--color-brown-text)'}"
        >
          Home
        </a>
        <a
          href="/about"
          class="px-4 py-2 text-sm font-medium rounded-lg transition-colors {isActive('/about') ? 'bg-primary-600 text-white' : 'hover:bg-cream-200'}"
          style="color: {isActive('/about') ? '#fff' : 'var(--color-brown-text)'}"
        >
          About
        </a>
        <a
          href="/classes"
          class="px-4 py-2 text-sm font-medium rounded-lg transition-colors {isActive('/classes') ? 'bg-primary-600 text-white' : 'hover:bg-cream-200'}"
          style="color: {isActive('/classes') ? '#fff' : 'var(--color-brown-text)'}"
        >
          Classes
        </a>
        <a
          href="/gallery"
          class="px-4 py-2 text-sm font-medium rounded-lg transition-colors {isActive('/gallery') ? 'bg-primary-600 text-white' : 'hover:bg-cream-200'}"
          style="color: {isActive('/gallery') ? '#fff' : 'var(--color-brown-text)'}"
        >
          Gallery
        </a>
        <a
          href="/contact"
          class="ml-2 px-6 py-2 bg-accent-500 text-primary-900 rounded-lg hover:bg-accent-600 transition-all font-semibold text-sm shadow-md hover:shadow-lg"
        >
          Contact Us
        </a>
      </div>

      <!-- Mobile menu button -->
      <div class="md:hidden">
        <button
          on:click={toggleMobileMenu}
          class="text-primary-600 hover:text-primary-700 transition-colors p-2"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {#if mobileMenuOpen}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            {/if}
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    {#if mobileMenuOpen}
      <div class="md:hidden py-4 bg-cream-100 border-t-2 border-accent-500 rounded-b-lg">
        <div class="flex flex-col space-y-2">
          <a
            href="/"
            class="px-4 py-2 rounded-lg transition-colors {isActive('/') && currentPath === '/' ? 'bg-primary-600 text-white font-semibold' : 'hover:bg-cream-200'}"
            style="color: {isActive('/') && currentPath === '/' ? '#fff' : 'var(--color-brown-text)'}"
            on:click={() => mobileMenuOpen = false}
          >
            Home
          </a>
          <a
            href="/about"
            class="px-4 py-2 rounded-lg transition-colors {isActive('/about') ? 'bg-primary-600 text-white font-semibold' : 'hover:bg-cream-200'}"
            style="color: {isActive('/about') ? '#fff' : 'var(--color-brown-text)'}"
            on:click={() => mobileMenuOpen = false}
          >
            About
          </a>
          <a
            href="/classes"
            class="px-4 py-2 rounded-lg transition-colors {isActive('/classes') ? 'bg-primary-600 text-white font-semibold' : 'hover:bg-cream-200'}"
            style="color: {isActive('/classes') ? '#fff' : 'var(--color-brown-text)'}"
            on:click={() => mobileMenuOpen = false}
          >
            Classes
          </a>
          <a
            href="/gallery"
            class="px-4 py-2 rounded-lg transition-colors {isActive('/gallery') ? 'bg-primary-600 text-white font-semibold' : 'hover:bg-cream-200'}"
            style="color: {isActive('/gallery') ? '#fff' : 'var(--color-brown-text)'}"
            on:click={() => mobileMenuOpen = false}
          >
            Gallery
          </a>
          <a
            href="/contact"
            class="mx-4 px-4 py-3 bg-accent-500 text-primary-900 rounded-lg hover:bg-accent-600 transition-colors font-semibold text-center shadow-md"
            on:click={() => mobileMenuOpen = false}
          >
            Contact Us
          </a>
        </div>
      </div>
    {/if}
  </nav>
</header>

<!-- Spacer to prevent content from hiding under fixed header -->
<div class="h-16 sm:h-20"></div>
