<script lang="ts">
 const offlineBatches = [
    { name: 'Batch 1', days: 'Monday & Wednesday', time: '4:30 PM - 6:30 PM IST' },
    { name: 'Batch 2', days: 'Tuesday & Thursday', time: '4:30 PM - 6:30 PM IST' }
  ];

  const enrollmentSteps = [
    { num: 1, title: 'Book FREE Demo Class', desc: 'Visit the academy or book online for a free trial session' },
    { num: 2, title: 'Attend Trial Session', desc: 'Experience our teaching method and facility firsthand' },
    { num: 3, title: 'Get Approval', desc: 'If approved by Shruthi, proceed with enrollment' },
    { num: 4, title: 'Begin Your Journey', desc: 'Start your Bharatanatyam learning adventure!' }
  ];
</script>

<svelte:head>
  <title>Classes & Fees - Shivam Narthanalayam</title>
  <meta name="description" content="Bharatanatyam classes in Chennai. Offline group classes ₹800/month. Online one-to-one ₹1000/month. FREE demo class. All ages welcome." />
</svelte:head>

<!-- Hero -->
<section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
  <div class="container-custom text-center">
    <h1 class="text-4xl sm:text-5xl font-bold mb-4">Our Classes</h1>
    <p class="text-xl text-cream-200">Choose the perfect class format for your learning journey</p>
  </div>
</section>

<!-- Offline Classes -->
<section class="section-padding bg-black">
  <div class="container-custom">
    <div class="max-w-4xl mx-auto">
      <div class="traditional-card p-8 mb-8">
        <h2 class="text-3xl font-bold mb-6" style="color: var(--color-accent-400);">Offline Group Classes</h2>

        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2" style="color: #d1d5db;">📍 Location</h3>
          <p class="mb-2">Little Millennium Play School, Pudur, Chennai 600053</p>
          <a href="https://maps.app.goo.gl/2Ed8vJet8DTRBzR67" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-700 underline">
            View on Google Maps →
          </a>
        </div>

        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-3" style="color: #d1d5db;">📅 Class Timings</h3>
          <div class="grid md:grid-cols-2 gap-4">
            {#each offlineBatches as batch}
              <div class="bg-black p-4 rounded-lg">
                <p class="font-bold text-primary-600">{batch.name}</p>
                <p>{batch.days}</p>
                <p class="text-sm text-secondary-600">{batch.time}</p>
              </div>
            {/each}
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2" style="color: #d1d5db;">👥 Who Can Join?</h3>
          <ul class="list-disc pl-6 space-y-1">
            <li>All ages welcome</li>
            <li>All genders welcome</li>
            <li>Levels: Beginner, Intermediate, Advanced</li>
          </ul>
        </div>

        <div class="border-t-2 border-accent-500 pt-6">
          <div class="grid md:grid-cols-3 gap-4">
            <div class="text-center">
              <p class="text-sm text-secondary-600 mb-1">Monthly Fee</p>
              <p class="text-3xl font-bold text-primary-600">₹800</p>
            </div>
            <div class="text-center">
              <p class="text-sm text-secondary-600 mb-1">Admission Fee</p>
              <p class="text-3xl font-bold text-secondary-600">₹1,000</p>
              <p class="text-xs">(one-time)</p>
            </div>
            <div class="text-center">
              <p class="text-sm text-secondary-600 mb-1">Trial Class</p>
              <p class="text-3xl font-bold text-green-600">FREE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Online Classes -->
<section class="section-padding bg-black">
  <div class="container-custom">
    <div class="max-w-4xl mx-auto">
      <div class="traditional-card p-8">
        <h2 class="text-3xl font-bold mb-6" style="color: var(--color-accent-400);">Online One-to-One Classes</h2>

        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2" style="color: #d1d5db;">💻 Platform</h3>
          <p>Zoom (link provided upon enrollment)</p>
        </div>

        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2" style="color: #d1d5db;">⏰ Schedule</h3>
          <p>Flexible timing arranged with the student</p>
        </div>

        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2" style="color: #d1d5db;">📊 Frequency</h3>
          <p>8 classes per month (typically 2 sessions per week)</p>
        </div>

        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2" style="color: #d1d5db;">✨ Benefits</h3>
          <ul class="list-disc pl-6 space-y-1">
            <li>Personalized one-on-one attention</li>
            <li>Flexible scheduling to fit your routine</li>
            <li>Learn from anywhere in the world</li>
            <li>Recorded sessions available (optional)</li>
          </ul>
        </div>

        <div class="border-t-2 border-accent-500 pt-6 text-center">
          <p class="text-sm text-secondary-600 mb-1">Monthly Fee</p>
          <p class="text-4xl font-bold text-primary-600">₹1,000</p>
          <p class="text-sm text-secondary-700 mt-2">(for 8 classes/month)</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Enrollment Process -->
<section class="section-padding bg-black">
  <div class="container-custom">
    <h2 class="section-title text-center mb-12 ornate-heading" style="color: var(--color-accent-400);">Enrollment Process</h2>

    <div class="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each enrollmentSteps as step}
        <div class="text-center">
          <div class="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center text-primary-900 font-bold text-2xl mx-auto mb-4">
            {step.num}
          </div>
          <h3 class="font-bold mb-2" style="color: var(--color-accent-400);">{step.title}</h3>
          <p class="text-sm" style="color: #d1d5db;">{step.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA -->
<section class="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
  <div class="container-custom text-center">
    <h2 class="text-3xl font-bold mb-6">Ready to Start Your Bharatanatyam Journey?</h2>
    <p class="text-xl mb-8 text-cream-100 max-w-2xl mx-auto">
      Book your FREE demo class today and experience the joy of classical dance!
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/contact" class="px-8 py-4 bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all text-lg">
        Book Demo Class
      </a>
      <a href="tel:+919600025105" class="px-8 py-4 bg-black/20 hover:bg-black/30 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white transition-all text-lg">
        📞 Call Us Now
      </a>
    </div>
  </div>
</section>
