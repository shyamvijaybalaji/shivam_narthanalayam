<script lang="ts">
  import Card from '../ui/Card.svelte';
  import type { Project } from '$lib/types';

  const projects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'A fully-featured e-commerce solution with payment integration, inventory management, and real-time analytics.',
      image: '/images/project-placeholder.jpg',
      tags: ['SvelteKit', 'TypeScript', 'Stripe', 'PostgreSQL'],
      link: 'https://example.com',
      github: 'https://github.com/example/project1'
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates, team collaboration features, and comprehensive reporting.',
      image: '/images/project-placeholder.jpg',
      tags: ['React', 'Node.js', 'WebSocket', 'MongoDB'],
      link: 'https://example.com'
    },
    {
      id: '3',
      title: 'AI-Powered Analytics',
      description: 'Advanced analytics dashboard leveraging machine learning to provide actionable insights and predictive analysis.',
      image: '/images/project-placeholder.jpg',
      tags: ['Python', 'TensorFlow', 'FastAPI', 'Vue.js'],
      github: 'https://github.com/example/project3'
    },
    {
      id: '4',
      title: 'Mobile-First CRM',
      description: 'Customer relationship management system optimized for mobile devices with offline support and seamless sync.',
      image: '/images/project-placeholder.jpg',
      tags: ['React Native', 'Firebase', 'GraphQL'],
      link: 'https://example.com'
    },
    {
      id: '5',
      title: 'Content Management System',
      description: 'Headless CMS with flexible content modeling, multi-language support, and powerful API for content delivery.',
      image: '/images/project-placeholder.jpg',
      tags: ['Next.js', 'Strapi', 'PostgreSQL', 'Docker'],
      link: 'https://example.com'
    },
    {
      id: '6',
      title: 'Social Media Dashboard',
      description: 'Unified dashboard for managing multiple social media accounts with scheduling, analytics, and engagement tracking.',
      image: '/images/project-placeholder.jpg',
      tags: ['Vue.js', 'Express', 'Redis', 'Bull'],
      github: 'https://github.com/example/project6'
    }
  ];
</script>

<section id="projects" class="section-padding bg-white">
  <div class="container-custom">
    <div class="text-center mb-16">
      <h2 class="section-title">Featured Projects</h2>
      <p class="section-subtitle">
        Showcasing our best work and innovative solutions
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each projects as project}
        <Card padding="none" hover={true}>
          <!-- Project image -->
          <div class="relative aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden">
            <div class="absolute inset-0 flex items-center justify-center">
              <svg class="w-20 h-20 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <!-- Project content -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              {project.title}
            </h3>
            <p class="text-gray-600 mb-4 line-clamp-3">
              {project.description}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              {#each project.tags as tag}
                <span class="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                  {tag}
                </span>
              {/each}
            </div>

            <!-- Links -->
            <div class="flex gap-4">
              {#if project.link}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Project
                </a>
              {/if}
              {#if project.github}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center text-gray-600 hover:text-gray-700 font-medium text-sm transition-colors"
                >
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                  </svg>
                  GitHub
                </a>
              {/if}
            </div>
          </div>
        </Card>
      {/each}
    </div>
  </div>
</section>

<style>
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
