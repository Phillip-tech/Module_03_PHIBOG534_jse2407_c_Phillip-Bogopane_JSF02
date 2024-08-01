<script>
    import { writable } from 'svelte/store';
    import { categories, fetchProducts, filterItem, sortOption } from '../stores.js'; // Corrected import statement

    const dropdownOpen = writable(false);
    const sortDropdownOpen = writable(false);
    const searchTerm = writable(''); // Define the searchTerm store

    const toggleDropdown = () => {
      dropdownOpen.update(value => !value);
    };

    const toggleSortDropdown = () => {
      sortDropdownOpen.update(value => !value);
    };

    const handleFilter = (category) => {
      filterItem.set(category);
      dropdownOpen.set(false);
      fetchProducts();
    };

    const handleSort = (option) => {
      sortOption.set(option);
      sortDropdownOpen.set(false);
      fetchProducts();
    };

    const resetFilters = () => {
      filterItem.set('All categories');
      sortOption.set('Reset');
      fetchProducts();
    };

    const handleSearch = () => {
      fetchProducts();
    };
</script>

<form on:submit|preventDefault={handleSearch} class="flex flex-wrap gap-4 relative mt-4">
  <!-- Search box -->
  <div class="relative w-full flex-grow">
    <input type="search" id="search-dropdown" name="searchInput" class="p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search products..." bind:value={$searchTerm}>
    <button type="submit" class="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
      <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
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
    {$filterItem}
    <svg class="w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 8l4 4 4-4" />
    </svg>
  </button>

  <!-- Sort Dropdownlist -->
  {#if $sortDropdownOpen}
    <div class="absolute z-10 top-full mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 right-0">
      <ul class="py-2 text-sm text-gray-700">
        <li>
          <button on:click={() => handleSort('Reset')} on:keydown={(e) => e.key === 'Enter' && handleSort('Reset')} class="inline-flex w-full px-4 py-2 hover:bg-gray-100 cursor-pointer">Reset</button>
        </li>
        <li>
          <button on:click={() => handleSort('Price: Low to High')} on:keydown={(e) => e.key === 'Enter' && handleSort('Price: Low to High')} class="inline-flex w-full px-4 py-2 hover:bg-gray-100 cursor-pointer">Price: Low to High</button>
        </li>
        <li>
          <button on:click={() => handleSort('Price: High to Low')} on:keydown={(e) => e.key === 'Enter' && handleSort('Price: High to Low')} class="inline-flex w-full px-4 py-2 hover:bg-gray-100 cursor-pointer">Price: High to Low</button>
        </li>
      </ul>
    </div>
  {/if}

  <button on:click={toggleSortDropdown} type="button" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200">
    {$sortOption}
    <svg class="w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 8l4 4 4-4" />
    </svg>
  </button>

  <!-- Reset button -->
  <button type="button" on:click={resetFilters} class="flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200">Reset</button>
</form>