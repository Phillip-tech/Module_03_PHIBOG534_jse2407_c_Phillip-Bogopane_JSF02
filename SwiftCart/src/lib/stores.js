import { writable, derived } from 'svelte/store';

export const filterItem = writable(null);
export const products = writable([]);
export const loading = writable(true);
export const selectedProduct = writable(null);
export const categories = writable([]);
export const selectedCategory = writable('All');
export const sortOption = writable('');

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
