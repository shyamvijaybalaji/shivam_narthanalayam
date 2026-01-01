<script lang="ts">
  import Card from '../ui/Card.svelte';
</script>

<section id="about" class="section-padding bg-white">
  <div class="container-custom">
    <div class="text-center mb-12">
      <h2 class="section-title">About Us</h2>
      <p class="section-subtitle">
        Learn more about our mission, values, and what drives us forward
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-12 items-center">
      <!-- Image placeholder -->
      <div class="relative">
        <div class="aspect-square rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center overflow-hidden shadow-2xl">
          <svg class="w-32 h-32 text-primary-300" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
        </div>
        <!-- Decorative element -->
        <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary-200 rounded-full -z-10"></div>
      </div>

      <!-- Content -->
      <div class="space-y-6">
        <h3 class="text-3xl font-bold text-gray-900">
          Passionate about creating meaningful impact
        </h3>
        <p class="text-lg text-gray-600">
          We are dedicated to delivering exceptional solutions that drive real results. With years of experience and a commitment to excellence, we help businesses transform their vision into reality.
        </p>
        <p class="text-lg text-gray-600">
          Our approach combines innovation, expertise, and a deep understanding of our clients' needs to create solutions that not only meet expectations but exceed them.
        </p>

        <!-- Core values -->
        <div class="grid sm:grid-cols-2 gap-4 mt-8">
          <Card padding="sm">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">Innovation</h4>
                <p class="text-sm text-gray-600">Cutting-edge solutions for modern challenges</p>
              </div>
            </div>
          </Card>

          <Card padding="sm">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">Quality</h4>
                <p class="text-sm text-gray-600">Excellence in every detail we deliver</p>
              </div>
            </div>
          </Card>

          <Card padding="sm">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">Collaboration</h4>
                <p class="text-sm text-gray-600">Working together to achieve great things</p>
              </div>
            </div>
          </Card>

          <Card padding="sm">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">Integrity</h4>
                <p class="text-sm text-gray-600">Trust and transparency in everything</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</section>
