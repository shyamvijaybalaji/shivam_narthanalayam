<script lang="ts">
  export let hover = true;
  export let padding: 'none' | 'sm' | 'default' | 'lg' = 'default';

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  } as const;

  $: hoverClass = hover ? 'hover:shadow-xl' : '';
  $: classes = `bg-white rounded-xl shadow-lg transition-shadow duration-300 overflow-hidden ${hoverClass} ${paddingClasses[padding]}`;
</script>

<div class={classes}>
  <slot />
</div>
