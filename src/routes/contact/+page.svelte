<script lang="ts">
  import ContactForm from '$lib/components/ContactForm.svelte';
</script>

<svelte:head>
  <title>Contact Us - Shivam Narthanalayam</title>
  <meta name="description" content="Contact Shivam Narthanalayam for Bharatanatyam classes in Chennai. Call +91-9600025105 or email shivam@narthanalayam.in" />
</svelte:head>

<!-- Hero -->
<section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20 gradient-mesh">
  <div class="container-custom text-center">
    <h1 class="text-4xl sm:text-5xl font-bold mb-4 text-glow-gold">Get in Touch</h1>
    <p class="text-xl text-cream-200">We'd love to hear from you!</p>
  </div>
</section>

<!-- Contact Section -->
<section class="section-padding section-gradient-1">
  <div class="container-custom">
    <div class="grid lg:grid-cols-2 gap-12">
      <!-- Contact Form -->
      <div>
        <h2 class="text-2xl font-bold mb-6 text-accent-400">Send Us a Message</h2>
        <ContactForm />
      </div>

      <!-- Contact Info -->
      <div>
        <h2 class="text-2xl font-bold mb-6 text-accent-400">Contact Information</h2>

        <div class="space-y-6">
          <!-- Phone -->
          <div class="traditional-card p-6">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center glow-gold">
                <svg class="w-6 h-6 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 class="font-bold mb-1 text-accent-400">Phone</h3>
                <a href="tel:+919600025105" class="text-lg text-gray-200 hover:text-accent-400 transition-colors">+91-9600025105</a>
              </div>
            </div>
          </div>

          <!-- Email -->
          <div class="traditional-card p-6">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center glow-gold">
                <svg class="w-6 h-6 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 class="font-bold mb-1 text-accent-400">Email</h3>
                <a href="mailto:shivam@narthanalayam.in" class="text-lg text-gray-200 hover:text-accent-400 transition-colors break-all">shivam@narthanalayam.in</a>
              </div>
            </div>
          </div>

          <!-- Location -->
          <div class="traditional-card p-6">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center glow-gold">
                <svg class="w-6 h-6 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-bold mb-1 text-accent-400">Location</h3>
                <p class="mb-2 text-gray-200">Little Millennium Play School<br/>Pudur, Chennai 600053</p>
                <a href="https://maps.app.goo.gl/2Ed8vJet8DTRBzR67" target="_blank" rel="noopener noreferrer" class="text-accent-400 hover:text-accent-500 underline">
                  View on Google Maps →
                </a>
              </div>
            </div>
          </div>

          <!-- Class Timings -->
          <div class="traditional-card p-6">
            <h3 class="font-bold mb-3 text-accent-400">Class Timings</h3>
            <div class="space-y-2 text-sm text-gray-200">
              <p><strong>Batch 1:</strong> Mon & Wed, 4:30-6:30 PM</p>
              <p><strong>Batch 2:</strong> Tue & Thu, 4:30-6:30 PM</p>
              <p><strong>Online:</strong> Flexible timing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Map -->
<section class="section-gradient-2 py-8">
  <div class="container-custom">
    <div class="rounded-2xl overflow-hidden glow-maroon">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.234!2d80.234567!3d13.056789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAzJzI0LjQiTiA4MMKwMTQnMDQuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
        width="100%"
        height="400"
        style="border:0;"
        allowfullscreen={true}
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Shivam Narthanalayam Location"
      ></iframe>
    </div>
  </div>
</section>
