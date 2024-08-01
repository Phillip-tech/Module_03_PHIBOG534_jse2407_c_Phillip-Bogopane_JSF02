<script>
  import { onMount } from 'svelte';
  import { selectedProduct, fetchProductById, loading } from '../lib/stores.js';
  import { Link } from 'svelte-routing';

  export let id;

  let product;

  onMount(() => {
    fetchProductById(id);
  });

  $: product = $selectedProduct;
</script>

{#if $loading}
  <div class="flex items-center justify-center h-64">
    <svg class="w-12 h-12 text-gray-200 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 8 8"></path>
    </svg>
  </div>
{:else}
  <div class="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg shadow mt-6">
    <div class="flex items-center justify-between p-4">
      <Link to="/" class="text-blue-600 hover:text-blue-800">Back to products</Link>
    </div>
    <img class="p-8 rounded-t-lg mx-auto" src={product.image} alt="product image" />
    <div class="px-5 pb-5">
      <h3 class="text-xl font-semibold tracking-tight text-gray-900">{product.title}</h3>
      <p class="text-gray-700 mt-4">{product.description}</p>
      <div class="flex items-center mt-2.5 mb-5">
        <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">Category: {product.category}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-3xl font-bold text-gray-900">${product.price}</span>
        <button class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add to cart</button>
      </div>
    </div>
  </div>
{/if}
