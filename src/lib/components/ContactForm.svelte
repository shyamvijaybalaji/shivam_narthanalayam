<script lang="ts">
  import { onMount } from 'svelte';

  let name = '';
  let email = '';
  let phone = '';
  let message = '';
  let preferredClassType = '';
  let isSubmitting = false;
  let submitStatus: 'idle' | 'success' | 'error' = 'idle';
  let errorMessage = '';

  async function handleSubmit(event: Event) {
    event.preventDefault();

    if (isSubmitting) return;

    isSubmitting = true;
    submitStatus = 'idle';
    errorMessage = '';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          preferredClassType
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // Check if there are specific validation errors
        if (data.errors && Array.isArray(data.errors)) {
          throw new Error(data.errors.join('. '));
        }
        throw new Error(data.error || 'Failed to submit form');
      }

      submitStatus = 'success';
      // Reset form
      name = '';
      email = '';
      phone = '';
      message = '';
      preferredClassType = '';

      // Reset success message after 5 seconds
      setTimeout(() => {
        submitStatus = 'idle';
      }, 5000);

    } catch (error) {
      submitStatus = 'error';
      errorMessage = error instanceof Error ? error.message : 'An error occurred. Please try again.';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<form on:submit={handleSubmit} class="space-y-6">
  <!-- Name Field -->
  <div>
    <label for="name" class="block text-sm font-medium mb-2 text-gray-200">
      Name <span class="text-accent-400">*</span>
    </label>
    <input
      type="text"
      id="name"
      bind:value={name}
      required
      class="input-field w-full px-4 py-3 rounded-lg border-2 border-secondary-200 focus:border-primary-600 focus:ring-2 focus:ring-primary-200 transition-colors"
      placeholder="Your full name"
    />
  </div>

  <!-- Email Field -->
  <div>
    <label for="email" class="block text-sm font-medium mb-2 text-gray-200">
      Email <span class="text-accent-400">*</span>
    </label>
    <input
      type="email"
      id="email"
      bind:value={email}
      required
      class="input-field w-full px-4 py-3 rounded-lg border-2 border-secondary-200 focus:border-primary-600 focus:ring-2 focus:ring-primary-200 transition-colors"
      placeholder="your.email@example.com"
    />
  </div>

  <!-- Phone Field -->
  <div>
    <label for="phone" class="block text-sm font-medium mb-2 text-gray-200">
      Phone Number
    </label>
    <input
      type="tel"
      id="phone"
      bind:value={phone}
      class="input-field w-full px-4 py-3 rounded-lg border-2 border-secondary-200 focus:border-primary-600 focus:ring-2 focus:ring-primary-200 transition-colors"
      placeholder="+91-XXXXXXXXXX"
    />
  </div>

  <!-- Preferred Class Type -->
  <div>
    <label for="classType" class="block text-sm font-medium mb-2 text-gray-200">
      Preferred Class Type
    </label>
    <select
      id="classType"
      bind:value={preferredClassType}
      class="input-field w-full px-4 py-3 rounded-lg border-2 border-secondary-200 focus:border-primary-600 focus:ring-2 focus:ring-primary-200 transition-colors"
    >
      <option value="">Select a class type</option>
      <option value="offline">Offline Group Classes</option>
      <option value="online">Online One-to-One Classes</option>
      <option value="both">Both (I'd like to know more)</option>
    </select>
  </div>

  <!-- Message Field -->
  <div>
    <label for="message" class="block text-sm font-medium mb-2 text-gray-200">
      Message <span class="text-accent-400">*</span>
    </label>
    <textarea
      id="message"
      bind:value={message}
      required
      rows="5"
      class="input-field w-full px-4 py-3 rounded-lg border-2 border-secondary-200 focus:border-primary-600 focus:ring-2 focus:ring-primary-200 transition-colors resize-none"
      placeholder="Tell us about your interest in Bharatanatyam..."
    ></textarea>
  </div>

  <!-- Success Message -->
  {#if submitStatus === 'success'}
    <div class="p-4 bg-green-50 border-2 border-green-500 rounded-lg">
      <p class="text-green-700 font-medium">
        ✓ Thank you for your enquiry! We will get back to you soon.
      </p>
    </div>
  {/if}

  <!-- Error Message -->
  {#if submitStatus === 'error'}
    <div class="p-4 bg-red-50 border-2 border-red-500 rounded-lg">
      <p class="text-red-700 font-medium">
        ✗ {errorMessage}
      </p>
    </div>
  {/if}

  <!-- Submit Button -->
  <button
    type="submit"
    disabled={isSubmitting}
    class="w-full px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {isSubmitting ? 'Sending...' : 'Send Message'}
  </button>

  <p class="text-sm text-center text-gray-300">
    Or call us directly at <a href="tel:+919600025105" class="text-accent-400 hover:text-accent-500 font-medium">+91-9600025105</a>
  </p>
</form>
