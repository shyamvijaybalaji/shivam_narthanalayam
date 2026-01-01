<script lang="ts">
  export let type: 'text' | 'email' | 'tel' | 'password' | 'number' = 'text';
  export let name: string;
  export let label: string;
  export let value = '';
  export let placeholder = '';
  export let required = false;
  export let error: string | null = null;
  export let disabled = false;

  const inputClasses = 'block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed';
  const errorInputClasses = 'border-red-300 focus:border-red-500 focus:ring-red-500';
</script>

<div class="mb-4">
  <label for={name} class="block text-sm font-medium text-gray-700 mb-2">
    {label}
    {#if required}
      <span class="text-red-500">*</span>
    {/if}
  </label>
  <input
    {type}
    {name}
    id={name}
    {placeholder}
    {required}
    {disabled}
    bind:value
    class="{inputClasses} {error ? errorInputClasses : ''}"
    on:input
    on:blur
  />
  {#if error}
    <p class="mt-1 text-sm text-red-600">{error}</p>
  {/if}
</div>
