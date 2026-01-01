<script lang="ts">
  const highlights = [
    { icon: '🏆', title: 'Award-Winning Teacher', desc: 'Abhinaya Rani Award 2006' },
    { icon: '📚', title: '15+ Years Experience', desc: 'Training & Teaching Combined' },
    { icon: '👥', title: 'All Ages Welcome', desc: 'Beginner to Advanced Levels' },
    { icon: '🎭', title: 'Traditional Style', desc: 'Guru-Shishya Parampara' }
  ];

  const testimonials = [
    { name: 'Parent of Student', quote: 'My daughter has blossomed under Shruthi\'s guidance. The attention to detail and passion for Bharatanatyam is truly inspiring.' },
    { name: 'Adult Student', quote: 'Learning Bharatanatyam was a dream I thought I\'d missed. Shruthi made it possible with her patient teaching and flexible online classes.' },
    { name: 'Parent of Student', quote: 'The traditional values and cultural education my son receives alongside dance training is invaluable.' }
  ];
</script>

<svelte:head>
  <title>Shivam Narthanalayam - Bharatanatyam Dance Academy in Chennai</title>
  <meta name="description" content="Learn authentic Bharatanatyam in Chennai under Shruthi Sekar. Pandanallur Bani (Kalakshetra style). Free demo class. All ages welcome. Offline & online classes available." />
  <meta name="keywords" content="Bharatanatyam, dance classes Chennai, Kalakshetra style, Pandanallur Bani, classical dance, Guru-Shishya Parampara, Pudur Chennai" />
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-700 to-secondary-900 overflow-hidden">
  <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmQ3MDAiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAx Ljc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

  <div class="container-custom relative z-10 text-center text-white py-20">
    <div class="mb-6">
      <div class="w-24 h-24 mx-auto bg-accent-500 rounded-full flex items-center justify-center shadow-2xl mb-6 animate-pulse-subtle">
        <span class="text-primary-900 font-bold text-4xl">SN</span>
      </div>
    </div>

    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
      <span class="text-accent-400">Shivam Narthanalayam</span><br/>
      <span class="text-2xl sm:text-3xl lg:text-4xl font-normal text-cream-100">Shruthi's Dance Academy</span>
    </h1>

    <p class="text-xl sm:text-2xl text-cream-200 mb-4 max-w-3xl mx-auto">
      Learn Authentic Bharatanatyam in the Pandanallur Bani Tradition
    </p>

    <p class="text-lg text-cream-300 mb-10 max-w-2xl mx-auto">
      Traditional Kalakshetra Style | Guru-Shishya Parampara | Award-Winning Teacher
    </p>

    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/contact" class="px-8 py-4 bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all text-lg">
        Book Your FREE Demo Class
      </a>
      <a href="/about" class="px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-accent-400 transition-all text-lg">
        Learn More
      </a>
    </div>
  </div>
</section>

<!-- Quick Highlights -->
<section class="section-padding bg-white">
  <div class="container-custom">
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {#each highlights as item}
        <div class="traditional-card p-6 text-center hover:scale-105 transition-transform">
          <div class="text-5xl mb-4">{item.icon}</div>
          <h3 class="font-bold text-lg mb-2" style="color: var(--color-primary-600);">{item.title}</h3>
          <p class="text-sm" style="color: var(--color-secondary-700);">{item.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- About Preview -->
<section class="section-padding bg-cream-200">
  <div class="container-custom">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 class="section-title ornate-heading" style="color: var(--color-primary-600);">About Shruthi Sekar</h2>
        <div class="h-1 w-24 bg-accent-500 mb-6"></div>
        <p class="text-lg mb-4" style="color: var(--color-brown-text);">
          Shruthi Sekar brings over a decade of training and 5 years of dedicated teaching experience
          in the authentic Pandanallur Bani (Kalakshetra style) of Bharatanatyam.
        </p>
        <p class="mb-6" style="color: var(--color-secondary-700);">
          Having trained under renowned gurus Prakash Krishna (Cuddalore), Ratheesh Krishna (Chennai),
          and Sophia Ratheesh (Chennai), she is the recipient of the prestigious Abhinaya Rani Award (2006).
        </p>
        <a href="/about" class="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all">
          Read Full Bio →
        </a>
      </div>
      <div class="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl aspect-square flex items-center justify-center">
        <svg class="w-32 h-32 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
    </div>
  </div>
</section>

<!-- Testimonials -->
<section class="section-padding bg-white">
  <div class="container-custom">
    <h2 class="section-title text-center mb-12 ornate-heading" style="color: var(--color-primary-600);">What Our Students Say</h2>
    <div class="grid md:grid-cols-3 gap-8">
      {#each testimonials as item}
        <div class="traditional-card p-6">
          <div class="text-accent-500 mb-4 text-4xl">"</div>
          <p class="mb-4 italic" style="color: var(--color-secondary-700);">{item.quote}</p>
          <p class="font-semibold" style="color: var(--color-primary-600);">— {item.name}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
  <div class="container-custom text-center">
    <h2 class="text-3xl sm:text-4xl font-bold mb-6">Ready to Begin Your Journey?</h2>
    <p class="text-xl mb-8 text-cream-100 max-w-2xl mx-auto">
      Experience the beauty and grace of Bharatanatyam. Book your FREE demo class today!
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/contact" class="px-8 py-4 bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all text-lg">
        Contact Us Today
      </a>
      <a href="tel:+919600025105" class="px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white transition-all text-lg">
        📞 +91-9600025105
      </a>
    </div>
  </div>
</section>
