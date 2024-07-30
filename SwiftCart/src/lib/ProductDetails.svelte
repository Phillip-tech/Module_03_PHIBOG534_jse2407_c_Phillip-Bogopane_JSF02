<script>
    import { onMount, writable } from 'svelte';
    import { navigate } from 'svelte-routing';

    export let productId;
    let product = writable(null);
    let loading = writable(false);
    let error = writable(false);

    const fetchProduct = async () => {
        loading.set(true);
        error.set(false);
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
            const data = await response.json();
            product.set(data);
            loading.set(false);
        } catch (error) {
            console.error("Error fetching product:", error);
            error.set(true);
            loading.set(false);
        }
    };

    onMount(() => {
        fetchProduct();
    });
</script>

{#if $loading}
    <div class="flex justify-center items-center mt-6">
        <p>Loading...</p>
    </div>
{:else if $error}
    <div class="flex justify-center items-center mt-6">
        <p>There was an error loading the product. Please try again later.</p>
    </div>
{:else if $product}
    <div class="max-w-2xl mx-auto mt-6">
        <img class="rounded-lg" src={$product.image} alt={$product.title} />
        <h1 class="text-3xl font-semibold mt-4">{$product.title}</h1>
        <p class="mt-2 text-lg text-gray-700">{$product.description}</p>
        <p class="mt-4 text-2xl font-bold text-gray-900">${$product.price}</p>
        <button on:click={() => navigate('/')} class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Back to Products</button>
    </div>
{/if}
