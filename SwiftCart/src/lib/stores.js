 import { writable, derived } from 'svelte/store';
export const filterItem = writable(null);

export const products = writable([]);
export const loading = writable(true);
export const selectedProduct = writable(null);
export const categories = writable([]);
export const selectedCategory = writable('All');
export const sortOption = writable('Reset');

export const fetchProducts = async () => {
  loading.set(true);
  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();
  products.set(data);
  const categorySet = new Set(data.map(product => product.category));
  categories.set(['All', ...categorySet]);
  loading.set(false);
};

export const fetchProductById = async (id) => {
  loading.set(true);
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await res.json();
  selectedProduct.set(data);
  loading.set(false);
};

export const filteredProducts = derived(
  [products, selectedCategory, sortOption],
  ([$products, $selectedCategory, $sortOption]) => {
    let filtered = $products;

    if ($selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === $selectedCategory);
    }

    if ($sortOption === 'Price: Low to High') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if ($sortOption === 'Price: High to Low') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }
);



// import { writable } from 'svelte/store';

// // import { page } from 'svelte/stores'; // Commented out for future use

// // Store for products
// export const products = writable([]);
// export const loading = writable(false);
// export const error = writable(null);

// // Stores for filters and sorting
// export const filters = writable({});
// export const sorting = writable('');

// // Store for selected product details
// export const selectedProduct = writable(null);

// /**
//  * Fetch products from an API endpoint.
//  * @async
//  * @function fetchProducts
//  */
// export async function fetchProducts() {
//   loading.set(true);
//   try {
//     const response = await fetch('https://fakestoreapi.com/products');
//     const data = await response.json();
//     products.set(data);
//   } catch (err) {
//     error.set(err.message);
//   } finally {
//     loading.set(false);
//   }
// }

// /**
//  * Fetch product details by ID from an API endpoint.
//  * @async
//  * @function fetchProductDetails
//  * @param {number} id - The product ID.
//  */
// export async function fetchProductDetails(id) {
//   loading.set(true);
//   try {
//     const response = await fetch(`https://fakestoreapi.com/products/${id}`);
//     const data = await response.json();
//     selectedProduct.set(data);
//   } catch (err) {
//     error.set(err.message);
//   } finally {
//     loading.set(false);
//   }
// }

// /**
//  * Update filters.
//  * @function updateFilters
//  * @param {object} newFilters - The new filters to apply.
//  */
// export function updateFilters(newFilters) {
//   filters.set(newFilters);
// }

// /**
//  * Update sorting.
//  * @function updateSorting
//  * @param {string} newSorting - The new sorting option to apply.
//  */
// export function updateSorting(newSorting) {
//   sorting.set(newSorting);
// }

