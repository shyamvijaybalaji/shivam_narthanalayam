<script lang="ts">
  import Input from '../ui/Input.svelte';
  import Textarea from '../ui/Textarea.svelte';
  import Button from '../ui/Button.svelte';
  import { validateContactForm, getFieldError } from '$lib/utils/validation';
  import type { ContactFormState } from '$lib/types';

  let formState: ContactFormState = {
    name: '',
    email: '',
    message: '',
    errors: {},
    success: false,
    loading: false
  };

  async function handleSubmit(event: Event) {
    event.preventDefault();
    formState.success = false;
    formState.errors = {};

    // Validate form
    const validationErrors = validateContactForm({
      name: formState.name,
      email: formState.email,
      message: formState.message
    });

    if (validationErrors.length > 0) {
      formState.errors = validationErrors.reduce((acc, error) => {
        acc[error.field] = error.message;
        return acc;
      }, {} as Record<string, string>);
      return;
    }

    formState.loading = true;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message
        })
      });

      const data = await response.json();

      if (response.ok) {
        formState.success = true;
        formState.name = '';
        formState.email = '';
        formState.message = '';

        // Hide success message after 5 seconds
        setTimeout(() => {
          formState.success = false;
        }, 5000);
      } else {
        formState.errors = { general: data.error || 'Failed to send message. Please try again.' };
      }
    } catch (error) {
      console.error('Contact form error:', error);
      formState.errors = { general: 'An error occurred. Please try again later.' };
    } finally {
      formState.loading = false;
    }
  }
</script>

<section id="contact" class="section-padding bg-gray-50">
  <div class="container-custom">
    <div class="text-center mb-16">
      <h2 class="section-title">Get in Touch</h2>
      <p class="section-subtitle">
        Have a question or want to work together? We'd love to hear from you!
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
      <!-- Contact Information -->
      <div class="space-y-8">
        <div>
          <h3 class="text-2xl font-bold text-gray-900 mb-6">
            Let's Connect
          </h3>
          <p class="text-gray-600 mb-8">
            Whether you have a project in mind, a question about our services, or just want to say hello, feel free to reach out. We're here to help!
          </p>
        </div>

        <!-- Contact details -->
        <div class="space-y-6">
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 mb-1">Email</h4>
              <a href="mailto:hello@shivamnarthanalayam.com" class="text-gray-600 hover:text-primary-600 transition-colors">
                hello@shivamnarthanalayam.com
              </a>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 mb-1">Location</h4>
              <p class="text-gray-600">Remote / Global</p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 mb-1">Response Time</h4>
              <p class="text-gray-600">Within 24 hours</p>
            </div>
          </div>
        </div>

        <!-- Social links (optional) -->
        <div class="pt-8 border-t border-gray-200">
          <h4 class="font-semibold text-gray-900 mb-4">Follow Us</h4>
          <div class="flex space-x-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="w-10 h-10 bg-gray-100 hover:bg-primary-100 rounded-lg flex items-center justify-center transition-colors">
              <span class="sr-only">LinkedIn</span>
              <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="w-10 h-10 bg-gray-100 hover:bg-primary-100 rounded-lg flex items-center justify-center transition-colors">
              <span class="sr-only">Twitter</span>
              <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="w-10 h-10 bg-gray-100 hover:bg-primary-100 rounded-lg flex items-center justify-center transition-colors">
              <span class="sr-only">GitHub</span>
              <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="bg-white p-8 rounded-2xl shadow-xl">
        <form on:submit={handleSubmit}>
          <Input
            type="text"
            name="name"
            label="Your Name"
            placeholder="John Doe"
            required={true}
            bind:value={formState.name}
            error={formState.errors.name || null}
          />

          <Input
            type="email"
            name="email"
            label="Email Address"
            placeholder="john@example.com"
            required={true}
            bind:value={formState.email}
            error={formState.errors.email || null}
          />

          <Textarea
            name="message"
            label="Message"
            placeholder="Tell us about your project or inquiry..."
            required={true}
            rows={6}
            bind:value={formState.message}
            error={formState.errors.message || null}
          />

          {#if formState.errors.general}
            <div class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-sm text-red-600">{formState.errors.general}</p>
            </div>
          {/if}

          {#if formState.success}
            <div class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p class="text-sm text-green-600 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Thank you! Your message has been sent successfully.
              </p>
            </div>
          {/if}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth={true}
            disabled={formState.loading}
          >
            {formState.loading ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>
    </div>
  </div>
</section>
