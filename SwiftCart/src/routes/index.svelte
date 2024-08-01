<script>
  import { products, loading, fetchProducts } from '../lib/stores.js';
  import { Filter, ProductCard } from '../lib/components';

  import { onMount } from 'svelte';
  onMount(() => {
    fetchProducts();
  });
</script>

<Filter />

{#if $loading}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
    {#each Array(8) as _}
      <div class="max-w-sm p-4 border border-gray-200 rounded-lg shadow animate-pulse">
        <div class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
          <svg class="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 0 1 0 16 8 8 0 0 1 0-16zm1 4v6l5-3-5-3z" />
          </svg>
        </div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
      </div>
    {/each}
  </div>
{:else}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
    {#each $products as product}
      <ProductCard {product} />
    {/each}
  </div>
{/if}
