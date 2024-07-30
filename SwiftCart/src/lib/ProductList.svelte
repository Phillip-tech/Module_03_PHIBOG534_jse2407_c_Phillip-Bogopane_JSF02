<script>
    import { onMount, writable, get } from 'svelte';
    import { navigate } from 'svelte-routing';

    export let products = writable([]);
    export let categories = writable([]);
    export let filterItem = writable('All categories');
    export let searchTerm = writable('');
    export let sortOption = writable('Reset');
    export let loading = writable(false);
    export let error = writable(false);
    
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

    onMount(() => {
        fetchProducts();
        fetchCategories();
    });

    const handleFilter = (category) => {
        filterItem.set(category);
        fetchProducts();
    };

    const handleSearch = (event) => {
        event.preventDefault();
        fetchProducts();
    };

    const handleSort = (option) => {
        sortOption.set(option);
        fetchProducts();
    };

    const resetFilters = () => {
        filterItem.set('All categories');
        searchTerm.set('');
        sortOption.set('Reset');
        fetchProducts();
    };

    const handleClick = (id) => {
        navigate(`/product/${id}`);
    };
</script>

<form on:submit={handleSearch} class="flex flex-wrap gap-4 relative mt-4">
    <button on:click={() => filterItem.set('All categories')} type="button" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200">
        <span>{$filterItem}</span>
        <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1l4 4 4-4"/>
        </svg>
    </button>
    <div class="relative w-full flex-grow">
        <input type="search" id="search-dropdown" name="searchInput" class="p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search products..." bind:value={$searchTerm}>
        <button type="submit" class="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span class="sr-only">Search</span>
        </button>
    </div>
    <button on:click={resetFilters} type="button" class="flex-shrink-0 p-2.5 text-sm font-medium h-full text-white bg-gray-500 rounded-lg border border-gray-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300">Reset</button>
    <button on:click={() => sortOption.set('Reset')} type="button" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200">
        <span>Sort by: {$sortOption}</span>
        <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1l4 4 4-4"/>
        </svg>
    </button>
</form>

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
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {#each $products as product}
            <div class="max-w-xs bg-white border border-gray-200 rounded-lg shadow" on:click={() => handleClick(product.id)}>
                <img class="p-8 rounded-t-lg" src={product.image} alt={product.title} />
                <div class="px-5 pb-5">
                    <h5 class="text-xl font-semibold tracking-tight text-gray-900">{product.title}</h5>
                    <div class="flex items-center mt-2.5 mb-5">
                        <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">{product.category}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-3xl font-bold text-gray-900">${product.price}</span>
                        <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">View Details</a>
                    </div>
                </div>
            </div>
        {/each}
    </div>
{/if}
