<script lang="ts">
  import { onMount } from 'svelte';

  let isOpen = false;
  let messages: Array<{ role: 'user' | 'assistant'; content: string }> = [];
  let userInput = '';
  let isLoading = false;
  let chatContainer: HTMLDivElement;

  // Lead collection state
  let collectingLead = false;
  let leadData = {
    name: '',
    email: '',
    phone: '',
    preferredClassType: ''
  };

  onMount(() => {
    // Add welcome message
    messages = [
      {
        role: 'assistant',
        content: 'Namaste! Welcome to Shivam Narthanalayam. I\'m here to help you learn about our Bharatanatyam classes. How may I assist you today?'
      }
    ];
  });

  function toggleChat() {
    isOpen = !isOpen;
  }

  async function sendMessage() {
    if (!userInput.trim() || isLoading) return;

    const message = userInput.trim();
    userInput = '';

    // Add user message
    messages = [...messages, { role: 'user', content: message }];

    isLoading = true;

    // Scroll to show loading indicator
    setTimeout(scrollToBottom, 100);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          conversationHistory: messages.slice(1, -1) // Exclude welcome and current message
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      // Add assistant message
      messages = [...messages, { role: 'assistant', content: data.message }];

      // Check if we should collect lead info
      if (data.shouldCollectLead && !collectingLead) {
        collectingLead = true;
      }

      // Scroll to bottom
      setTimeout(scrollToBottom, 100);

    } catch (error) {
      messages = [
        ...messages,
        {
          role: 'assistant',
          content: 'I apologize, but I\'m having trouble responding. Please contact us directly at +91-9600025105 or shivam@narthanalayam.in.'
        }
      ];
    } finally {
      isLoading = false;
    }
  }

  async function submitLead() {
    if (!leadData.name || !leadData.email) {
      alert('Please provide your name and email.');
      return;
    }

    try {
      const conversation = messages
        .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
        .join('\n');

      await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Lead submission',
          leadData: {
            ...leadData,
            conversation
          }
        })
      });

      messages = [
        ...messages,
        {
          role: 'assistant',
          content: `Thank you, ${leadData.name}! We've received your information and will contact you shortly at ${leadData.email}. Looking forward to welcoming you to Shivam Narthanalayam!`
        }
      ];

      collectingLead = false;
      leadData = { name: '', email: '', phone: '', preferredClassType: '' };

    } catch (error) {
      alert('Failed to submit your information. Please try contacting us directly.');
    }
  }

  function scrollToBottom() {
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }
</script>

<!-- Chat Button -->
<button
  on:click={toggleChat}
  class="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
  aria-label="Open chatbot"
>
  {#if isOpen}
    <!-- Close Icon -->
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  {:else}
    <!-- Chat Icon -->
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  {/if}
</button>

<!-- Chat Window -->
{#if isOpen}
  <div class="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col" style="height: 600px; max-height: calc(100vh - 8rem);">
    <!-- Header -->
    <div class="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center text-primary-900 font-bold">
          SN
        </div>
        <div>
          <h3 class="font-semibold">Shivam Narthanalayam</h3>
          <p class="text-xs opacity-90">Bharatanatyam Academy</p>
        </div>
      </div>
    </div>

    <!-- Messages -->
    <div bind:this={chatContainer} class="flex-1 overflow-y-auto p-4 space-y-4 bg-cream-100">
      {#each messages as message}
        <div class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'}">
          <div class="max-w-[80%] {message.role === 'user' ? 'bg-primary-600 text-white' : 'bg-white text-gray-900'} rounded-lg p-3 shadow-sm">
            <p class="text-sm whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
      {/each}

      {#if isLoading}
        <div class="flex justify-start">
          <div class="bg-white rounded-lg p-3 shadow-sm">
            <div class="flex space-x-2">
              <div class="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              <div class="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
            </div>
          </div>
        </div>
      {/if}
    </div>

    <!-- Lead Collection Form -->
    {#if collectingLead}
      <div class="p-4 bg-cream-200 border-t-2 border-accent-500">
        <p class="text-sm font-medium mb-3" style="color: var(--color-brown-text);">We'd love to help you! Please share your details:</p>
        <div class="space-y-2">
          <input
            type="text"
            bind:value={leadData.name}
            placeholder="Your Name *"
            class="w-full px-3 py-2 rounded-lg border border-secondary-300 text-sm"
          />
          <input
            type="email"
            bind:value={leadData.email}
            placeholder="Your Email *"
            class="w-full px-3 py-2 rounded-lg border border-secondary-300 text-sm"
          />
          <input
            type="tel"
            bind:value={leadData.phone}
            placeholder="Phone Number"
            class="w-full px-3 py-2 rounded-lg border border-secondary-300 text-sm"
          />
          <select
            bind:value={leadData.preferredClassType}
            class="w-full px-3 py-2 rounded-lg border border-secondary-300 text-sm"
          >
            <option value="">Preferred Class Type</option>
            <option value="offline">Offline Group Classes</option>
            <option value="online">Online One-to-One</option>
          </select>
          <button
            on:click={submitLead}
            class="w-full px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    {/if}

    <!-- Input Area -->
    <div class="p-4 border-t border-secondary-200 bg-white">
      <div class="flex space-x-2">
        <input
          type="text"
          bind:value={userInput}
          on:keypress={handleKeyPress}
          placeholder="Type your message..."
          class="flex-1 px-4 py-2 rounded-lg border border-secondary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors text-sm text-gray-900 placeholder-gray-500"
          disabled={isLoading}
        />
        <button
          on:click={sendMessage}
          disabled={isLoading || !userInput.trim()}
          aria-label="Send message"
          class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
      <p class="text-xs text-center mt-2 text-secondary-600">
        Powered by OpenAI
      </p>
    </div>
  </div>
{/if}

<style>
  /* Mobile responsiveness */
  @media (max-width: 640px) {
    .fixed.bottom-24.right-6 {
      bottom: 5.5rem;
      right: 1rem;
      left: 1rem;
      width: auto;
      max-width: none;
    }

    button.fixed.bottom-6.right-6 {
      bottom: 1.5rem;
      right: 1rem;
    }
  }
</style>
