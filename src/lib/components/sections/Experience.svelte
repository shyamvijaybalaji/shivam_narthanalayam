<script lang="ts">
  import type { Experience } from '$lib/types';

  const experiences: Experience[] = [
    {
      id: '1',
      title: 'Senior Position',
      company: 'Leading Tech Company',
      location: 'Remote',
      startDate: '2022-01',
      endDate: null,
      current: true,
      description: [
        'Led development of key initiatives that improved performance by 40%',
        'Managed cross-functional teams and coordinated with stakeholders',
        'Implemented best practices and modern development workflows'
      ]
    },
    {
      id: '2',
      title: 'Mid-Level Position',
      company: 'Growing Startup',
      location: 'San Francisco, CA',
      startDate: '2020-06',
      endDate: '2021-12',
      current: false,
      description: [
        'Developed and deployed multiple client-facing applications',
        'Collaborated with design team to create exceptional user experiences',
        'Mentored junior developers and conducted code reviews'
      ]
    },
    {
      id: '3',
      title: 'Junior Position',
      company: 'Innovative Agency',
      location: 'New York, NY',
      startDate: '2018-08',
      endDate: '2020-05',
      current: false,
      description: [
        'Built responsive web applications using modern frameworks',
        'Participated in agile development processes',
        'Contributed to open-source projects and documentation'
      ]
    }
  ];

  function formatDate(date: string | null, current: boolean): string {
    if (current) return 'Present';
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }
</script>

<section id="experience" class="section-padding bg-gray-50">
  <div class="container-custom">
    <div class="text-center mb-16">
      <h2 class="section-title">Experience</h2>
      <p class="section-subtitle">
        A journey of growth, learning, and professional development
      </p>
    </div>

    <div class="max-w-4xl mx-auto">
      <!-- Timeline -->
      <div class="relative">
        <!-- Vertical line -->
        <div class="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-primary-200"></div>

        {#each experiences as experience, index}
          <div class="relative mb-12 md:mb-16">
            <!-- Timeline dot -->
            <div class="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg z-10"></div>

            <!-- Content -->
            <div class="ml-8 md:ml-0 md:w-1/2 {index % 2 === 0 ? 'md:pr-12' : 'md:ml-auto md:pl-12'}">
              <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <!-- Date badge -->
                <div class="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-3">
                  {formatDate(experience.startDate, false)} - {formatDate(experience.endDate, experience.current)}
                </div>

                <h3 class="text-2xl font-bold text-gray-900 mb-1">
                  {experience.title}
                </h3>
                <p class="text-lg text-primary-600 font-medium mb-1">
                  {experience.company}
                </p>
                <p class="text-sm text-gray-500 mb-4 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {experience.location}
                </p>

                <ul class="space-y-2">
                  {#each experience.description as item}
                    <li class="flex items-start">
                      <svg class="w-5 h-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      <span class="text-gray-600">{item}</span>
                    </li>
                  {/each}
                </ul>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
