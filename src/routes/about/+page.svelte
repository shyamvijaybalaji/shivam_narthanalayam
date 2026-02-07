<script lang="ts">
  const achievements = [
    { year: '2006', title: 'Abhinaya Rani Award', desc: 'Recognized for excellence in Bharatanatyam performance' },
    { year: '2010-2021', title: 'Training under Renowned Gurus', desc: 'Prakash Krishna, Ratheesh Krishna, Sophia Ratheesh' },
    { year: '2019', title: 'Started Teaching', desc: 'Began sharing the art with dedicated students' }
  ];
</script>

<svelte:head>
  <title>About Shruthi Sekar - Shivam Narthanalayam</title>
  <meta name="description" content="Learn about Shruthi Sekar, award-winning Bharatanatyam teacher with 15+ years experience in Pandanallur Bani style." />
</svelte:head>

<!-- Hero -->
<section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20 gradient-mesh">
  <div class="container-custom text-center">
    <h1 class="text-4xl sm:text-5xl font-bold mb-4 text-glow-gold">About Shruthi Sekar</h1>
    <p class="text-xl text-cream-200">Award-Winning Bharatanatyam Teacher | Guru-Shishya Parampara</p>
  </div>
</section>

<!-- Full Bio -->
<section class="section-padding section-gradient-1">
  <div class="container-custom max-w-4xl">
    <div class="rounded-2xl aspect-square max-w-md mx-auto mb-12 overflow-hidden glow-maroon" style="box-shadow: 0 12px 40px rgba(128, 0, 32, 0.5), 0 6px 20px rgba(255, 215, 0, 0.3);">
      <img
        src="/gallery/gallery-1.jpeg"
        alt="Shruthi Sekar - Bharatanatyam Teacher at Shivam Narthanalayam"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="prose prose-lg max-w-none" style="color: #e5e5e5;">
      <p class="text-xl font-semibold mb-6" style="color: var(--color-accent-400);">
        Shruthi Sekar brings over a decade of training and 5 years of dedicated teaching experience in the authentic Pandanallur Bani (Kalakshetra style) of Bharatanatyam.
      </p>

      <p class="mb-4">
        Having trained under renowned gurus <strong>Prakash Krishna (Cuddalore)</strong>, <strong>Ratheesh Krishna (Chennai)</strong>, and <strong>Sophia Ratheesh (Chennai)</strong>, she is the recipient of the prestigious <strong>Abhinaya Rani Award (2006)</strong>.
      </p>

      <h2 class="text-2xl font-bold mt-8 mb-4" style="color: var(--color-accent-400);">Teaching Philosophy</h2>
      <p class="mb-4">
        Her teaching philosophy is rooted in the traditional values of <strong>Guru-Shishya Parampara</strong>. She believes in nurturing each student's unique expression while grounding them in the rich heritage of this ancient art form.
      </p>

      <p class="mb-4">
        Her approach focuses on building:
      </p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Technical precision</strong> - Mastering the fundamentals of Bharatanatyam</li>
        <li><strong>Emotional connection</strong> - Understanding the stories and emotions behind each movement</li>
        <li><strong>Spiritual awareness</strong> - Connecting with the deeper meaning of classical dance</li>
      </ul>

      <p class="mb-6">
        She emphasizes the importance of understanding the nuances of mudras, facial expressions, and rhythmic patterns to convey the beauty and emotion of the dance.
      </p>

      <p class="text-lg font-semibold" style="color: #d1d5db;">
        At Shivam Narthanalayam, students of all ages receive personalized attention, structured curriculum, and a supportive environment where they can grow, explore, and evolve as dancers and individuals - whether through in-person classes in Chennai or flexible online one-to-one sessions.
      </p>
    </div>
  </div>
</section>

<!-- Achievements Timeline -->
<section class="section-padding section-gradient-2">
  <div class="container-custom">
    <h2 class="section-title text-center mb-12 ornate-heading" style="color: var(--color-accent-400);">Achievements & Training</h2>

    <div class="max-w-3xl mx-auto space-y-8">
      {#each achievements as item}
        <div class="traditional-card p-6 flex gap-6">
          <div class="flex-shrink-0">
            <div class="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center text-primary-900 font-bold text-sm glow-gold">
              {item.year}
            </div>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-2" style="color: var(--color-accent-400);">{item.title}</h3>
            <p style="color: #d1d5db;">{item.desc}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA -->
<section class="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white gradient-mesh">
  <div class="container-custom text-center">
    <h2 class="text-3xl font-bold mb-6 text-glow-gold">Ready to Learn from an Award-Winning Teacher?</h2>
    <p class="text-xl mb-8 text-cream-100 max-w-2xl mx-auto">
      Experience traditional Bharatanatyam training in the Guru-Shishya Parampara tradition.
    </p>
    <a href="/contact" class="inline-block px-8 py-4 bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold rounded-lg transition-all text-lg glow-gold shimmer-effect" style="box-shadow: 0 8px 25px rgba(255, 215, 0, 0.5), 0 4px 15px rgba(255, 215, 0, 0.3);">
      Book Your FREE Demo Class
    </a>
  </div>
</section>
