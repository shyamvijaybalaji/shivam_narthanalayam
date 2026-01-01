<svelte:head>
  <title>Gallery - Shivam Narthanalayam</title>
  <meta name="description" content="View photos and videos of Bharatanatyam performances and classes at Shivam Narthanalayam." />
</svelte:head>

<!-- Hero -->
<section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
  <div class="container-custom text-center">
    <h1 class="text-4xl sm:text-5xl font-bold mb-4">Gallery</h1>
    <p class="text-xl text-cream-200">Capturing moments from our Bharatanatyam journey</p>
  </div>
</section>

<!-- Photo Grid -->
<section class="section-padding bg-white">
  <div class="container-custom">
    <h2 class="text-2xl font-bold mb-8 text-center" style="color: var(--color-primary-600);">Performance & Class Photos</h2>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {#each Array(12) as _, i}
        <div class="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg overflow-hidden hover:scale-105 transition-transform shadow-md hover:shadow-xl">
          <div class="w-full h-full flex items-center justify-center">
            <svg class="w-16 h-16 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      {/each}
    </div>

    <p class="text-center mt-8 text-secondary-600 italic">
      Photos coming soon! We're currently building our gallery. Contact us for more information about our classes.
    </p>
  </div>
</section>

<!-- Video Section -->
<section class="section-padding bg-cream-200">
  <div class="container-custom">
    <h2 class="text-2xl font-bold mb-8 text-center" style="color: var(--color-primary-600);">Performance Videos</h2>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each Array(3) as _, i}
        <div class="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg aspect-video flex items-center justify-center">
          <svg class="w-20 h-20 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      {/each}
    </div>

    <p class="text-center mt-8 text-secondary-600 italic">
      Videos coming soon! Follow us on social media for the latest performances and class highlights.
    </p>
  </div>
</section>

<!-- CTA -->
<section class="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
  <div class="container-custom text-center">
    <h2 class="text-3xl font-bold mb-6">Want to Be Part of Our Story?</h2>
    <p class="text-xl mb-8 text-cream-100 max-w-2xl mx-auto">
      Join Shivam Narthanalayam and create your own Bharatanatyam journey!
    </p>
    <a href="/contact" class="inline-block px-8 py-4 bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all text-lg">
      Book Your FREE Demo Class
    </a>
  </div>
</section>
