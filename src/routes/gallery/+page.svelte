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
<section class="section-padding bg-black">
  <div class="container-custom">
    <h2 class="text-2xl font-bold mb-8 text-center" style="color: var(--color-accent-400);">Performance & Class Photos</h2>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {#each Array(17) as _, i}
        <div class="aspect-square bg-gradient-to-br bg-black rounded-lg overflow-hidden hover:scale-105 transition-transform shadow-md hover:shadow-xl cursor-pointer">
          <img
            src="/gallery/gallery-{i + 2}.jpeg"
            alt="Bharatanatyam dance performance or class at Shivam Narthanalayam - Photo {i + 2}"
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Video Section -->
<section class="section-padding bg-black">
  <div class="container-custom">
    <h2 class="text-2xl font-bold mb-8 text-center" style="color: var(--color-accent-400);">Performance Videos</h2>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each Array(3) as _, i}
        <div class="bg-gradient-to-br bg-black rounded-lg aspect-video flex items-center justify-center">
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
