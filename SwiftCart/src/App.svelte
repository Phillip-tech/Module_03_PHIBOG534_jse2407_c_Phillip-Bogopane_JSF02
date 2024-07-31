<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { get } from 'svelte/store';

  const navbarOpen = writable(false);
  const dropdownOpen = writable(false);
  const sortDropdownOpen = writable(false);
  const filterItem = writable('All categories');
  const searchTerm = writable('');
  const products = writable([]);
  const categories = writable([]);
  const loading = writable(false);
  const error = writable(false);
  const showProductDetails = writable(false);
  const selectedProduct = writable(null);
  const sortOption = writable('Reset');

  const toggleNavbar = () => {
      navbarOpen.update(value => !value);
  };

  const toggleDropdown = () => {
      dropdownOpen.update(vae => !value);
  };

  const toggleSortDropdown = () => {
      sortDropdownOpen.update(value => !value);
  };

  const handleFilter = (category) => {
      filterItem.set(category);
      dropdownOpen.set(false);
      fetchProducts();
  };

  const handleSearch = (event) => {
      event.preventDefault();
      fetchProducts();
  };

  const handleSort = (option) => {
      sortOption.set(option);
      sortDropdownOpen.set(false);
      fetchProducts();
  };

  const resetFilters = () => {
      filterItem.set('All categories');
      searchTerm.set('');
      sortOption.set('Reset');
      fetchProducts();
  };

  $: $filterItem, $searchTerm, fetchProducts();

  const fetchProducts = async () => {
      loading.set(true);
      error.set(false);
      let url = "https://fakestoreapi.com/products";
      const filter = get(filterItem);
      const search = get(searchTerm);
      const sort = get(sortOption);

      if (filter !== 'All categories') {
          url = `https://fakestoreapi.com/products/category/${filter}`;
      }
      try {
          const response = await fetch(url);
          let data = await response.json();
          if (search) {
              data = data.filter(product => product.title.toLowerCase().includes(search.toLowerCase()));
          }
          if (sort === 'Price: Low to High') {
              data = data.sort((a, b) => a.price - b.price);
          } else if (sort === 'Price: High to Low') {
              data = data.sort((a, b) => b.price - a.price);
          }
          products.set(data);
          loading.set(false);
      } catch (error) {
          console.error("Error fetching products:", error);
          error.set(true);
          loading.set(false);
      }
  };

  const fetchCategories = async () => {
      try {
          const response = await fetch("https://fakestoreapi.com/products/categories");
          const data = await response.json();
          categories.set(data);
      } catch (error) {
          console.error("Error fetching categories:", error);
          error.set(true);
      }
  };

  const handleClick = async (id) => {
      try {
          const response = await fetch(`https://fakestoreapi.com/products/${id}`);
          const data = await response.json();
          selectedProduct.set(data);
          showProductDetails.set(true);
      } catch (error) {
          console.error("Error fetching product details:", error);
          error.set(true);
      }
  };

  const closeProductDetails = () => {
      showProductDetails.set(false);
  };

  const addToCart = (product) => {
      console.log(`Added ${product.title} to cart`);
  };

  onMount(() => {
      fetchProducts();
      fetchCategories();
  });

  const handleAddToCart = (product) => {
  addToCart(product);
};
</script>

<style>
    .sort-dropdown {
      position :absolute;
      top: calc(100% + 10); /* Adjust the value as needed to position the dropdown below the button */
      right: 0;
      z-index: 10;
  }
</style>

<div class="container mx-auto p-4 w-full">
  <!-- Header Component -->
  <header class="sticky z-50 top-0">
      <nav class="bg-gray-500 border-gray-200">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <a href="/" class="flex items-center space-x-3">
                  <img src="/online-shop.png" class="h-8" alt="online-shop.png">
                  <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">SwiftCart</span>
              </a>
              <button on:click={toggleNavbar} class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden">
                  <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                  </svg>
              </button>
              {#if $navbarOpen}
                  <div class="w-full md:block md:w-auto">
                      <ul class="flex flex-col top-10 font-medium p-4 mt-4 border border-gray-100 rounded-lg bg-gray-500 md:space-x-8 md:flex-row md:mt-0">
                          <li><a href="/wishlist" class="block py-2 px-3 text-white rounded hover:bg-gray-100">Wishlist</a></li>
                          <li class="relative"><a href="/cart" class="block py-2 px-3 text-white rounded hover:bg-gray-100">Cart</a>
                              <span class="absolute top-0 left-3 -mt-2 -ml-2 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">2</span>
                          </li>
                          <li><a href="/login" class="block py-2 px-3 text-white rounded hover:bg-gray-100">Login</a></li>
                      </ul>
                  </div>
              {/if}
          </div>
      </nav>
  </header>

 
  <!-- Filter Component -->
<form on:submit={handleSearch} class="flex flex-wrap gap-4 relative mt-4">

   <!-- Search box -->
<div class="relative w-full flex-grow">
  <input type="search" id="search-dropdown" name="searchInput" class="p-2.5 w-medium z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search products..." bind:value={$searchTerm}>
  <button type="submit" class="aw-medium top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
      <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
      </svg>
      <span class="sr-only">Search</span>
  </button>
</div>

<!-- Category Dropdownlist -->
{#if $dropdownOpen}
  <div class="absolute z-10 top-full mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
      <ul class="py-2 text-sm text-gray-700">
          <li>
              <button on:click={() => handleFilter('All categories')} on:keydown={(e) => e.key === 'Enter' && handleFilter('All categories')} class="inline-flex w-full px-4 py-2 hover:bg-gray-100 cursor-pointer">All categories</button>
          </li>
          {#each $categories as category}
              <li>
                  <button on:click={() => handleFilter(category)} on:keydown={(e) => e.key === 'Enter' && handleFilter(category)} class="inline-flex w-full px-4 py-2 hover:bg-gray-100 cursor-pointer">{category}</button>
              </li>
          {/each}
      </ul>
  </div>
{/if}

  <button on:click={toggleDropdown} type="button" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200">
      <span>{$filterItem}</span>
      <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1l4 4 4-4"/>
      </svg>
  </button>
  
 
  
  <!-- Reset and Sort buttons -->
  <button on:click={resetFilters} type="button" class="flex-shrink-0 p-2.5 text-sm font-medium h-full text-white bg-gray-500 rounded-lg border border-gray-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300">Reset</button>
  <button on:click={toggleSortDropdown} type="button" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 justify-end ">
      <span>Sort by: {$sortOption}</span>
      <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1l4 4 4-4"/>
      </svg>
  </button>
  {#if $sortDropdownOpen}
      <div class="sort-dropdown relative z-10 top-full mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
          <ul class="py-2 text-sm text-gray-700">
              <li>
                  <button on:click={() => handleSort('Reset')} class="inline-flex w-full px-4 py-2 hover:bg-gray-100 cursor-pointer" tabindex="0" on:keydown={(e) => e.key === 'Enter' && handleSort('Reset')}>Reset</button>
              </li>
              <li>
                  <button on:click={() => handleSort('Price: Low to High')} class="inline-flex w-full px-4 py-2 hover:bg-gray-100 cursor-pointer" tabindex="0" on:keydown={(e) => e.key === 'Enter' && handleSort('Price: Low to High')}>Price: Low to High</button>
              </li>
              <li>
                  <button on:click={() => handleSort('Price: High to Low')} class="inline-flex w-full px-4 py-2 hover:bg-gray-100 cursor-pointer" tabindex="0" on:keydown={(e) => e.key === 'Enter' && handleSort('Price: High to Low')}>Price: High to Low</button>
              </li>
          </ul>
      </div>
  {/if}
</form>

  <!-- Products Section -->
  {#if $loading}
      <div class="flex justify-center items-center mt-6">
          <p>Loading...</p>
      </div>
  {:else if $error}
      <div class="flex justify-center items-center mt-6">
          <p>There was an error loading the products. Please try again later.</p>
      </div>
  {:else if $products.length === 0}
      <div class="flex justify-center items-center mt-6">
          <p>No products found.</p>
      </div>
  {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {#each $products as product}
              <div class="p-4 border border-gray-200 rounded-lg shadow">
                  <div class="relative">
                      <img class="rounded-t-lg w-full h-48 object-contain" src={product.image} alt={product.title}>
                      <div class="absolute top-2 right-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6 text-red-500 cursor-pointer" viewBox="0 0 16 16">
                              <path d="M8 2C6.673 2 5.402 2.528 4.464 3.464L8 6.879l3.536-3.415C10.598 2.528 9.327 2 8 2zm6-1.537C12.175.184 10.134 0 8 0S3.825.184 2.537.463A8.008 8.008 0 000 8c0 1.103.152 2.17.442 3.16C1.605 13.664 3.672 16 8 16s6.395-2.336 7.558-4.84A8.006 8.006 0 0016 8c0-1.103-.152-2.17-.442-3.16A8.006 8.006 0 0014 2.463zm-3.536 9.415l-1.036.96L8 13.12 6.572 12.08l-1.036-.96C5.13 10.863 5 10.65 5 10.434c0-.216.13-.429.536-.958L8 6.879l2.464 2.597c.406.529.536.742.536.958 0 .216-.13.429-.536.958z"/>
                          </svg>
                      </div>
                  </div>
                  <div class="p-4">
                      <h3 class="font-bold text-lg truncate" title={product.title}>{product.title}</h3>
                      <p class="text-gray-500 text-sm truncate">{product.category}</p>
                      <div class="flex items-center mt-2">
                          <svg class="w-5 h-5 text-yellow-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                              <path d="M8 12.494l-3.054 1.608.58-3.388L3.214 8.316l3.39-.493L8 4.92l1.396 2.903 3.39.493-2.312 2.398.58 3.388zM8 0l2.598 5.25L16 6.004l-4.207 4.293L12.86 16 8 13.615 3.14 16l.468-5.703L0 6.004l5.402-.754L8 0z"/>
                          </svg>
                          <svg class="w-5 h-5 text-yellow-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                              <path d="M8 12.494l-3.054 1.608.58-3.388L3.214 8.316l3.39-.493L8 4.92l1.396 2.903 3.39.493-2.312 2.398.58 3.388zM8 0l2.598 5.25L16 6.004l-4.207 4.293L12.86 16 8 13.615 3.14 16l.468-5.703L0 6.004l5.402-.754L8 0z"/>
                          </svg>
                          <svg class="w-5 h-5 text-yellow-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                              <path d="M8 12.494l-3.054 1.608.58-3.388L3.214 8.316l3.39-.493L8 4.92l1.396 2.903 3.39.493-2.312 2.398.58 3.388zM8 0l2.598 5.25L16 6.004l-4.207 4.293L12.86 16 8 13.615 3.14 16l.468-5.703L0 6.004l5.402-.754L8 0z"/>
                          </svg>
                          <svg class="w-5 h-5 text-yellow-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                              <path d="M8 12.494l-3.054 1.608.58-3.388L3.214 8.316l3.39-.493L8 4.92l1.396 2.903 3.39.493-2.312 2.398.58 3.388zM8 0l2.598 5.25L16 6.004l-4.207 4.293L12.86 16 8 13.615 3.14 16l.468-5.703L0 6.004l5.402-.754L8 0z"/>
                          </svg>
                          <svg class="w-5 h-5 text-yellow-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                              <path d="M8 12.494l-3.054 1.608.58-3.388L3.214 8.316l3.39-.493L8 4.92l1.396 2.903 3.39.493-2.312 2.398.58 3.388zM8 0l2.598 5.25L16 6.004l-4.207 4.293L12.86 16 8 13.615 3.14 16l.468-5.703L0 6.004l5.402-.754L8 0z"/>
                          </svg>
                      </div>
                      <div class="mt-2">
                          <span class="font-bold text-lg">${product.price}</span>
                          <span class="text-gray-500 line-through">${product.oldPrice}</span>
                      </div>
                      <button on:click={() => handleAddToCart(product)} type="button" class="w-full mt-2 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">Add to Cart</button>
                  </div>
              </div>
          {/each}
      </div>
  {/if}
</div>
