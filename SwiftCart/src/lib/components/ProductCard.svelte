<script>
  export let product;
</script>

<a href={`/product/${product.id}`} class="border border-gray-200 rounded-lg p-4 bg-white shadow hover:shadow-lg transition-shadow">
  <img src={product.image} alt={product.title} class="h-48 w-full object-contain rounded mb-4">
  <h2 class="text-lg font-semibold mb-2">{product.title}</h2>
  <p class="text-gray-600 mb-2">{product.category}</p>
  <p class="text-gray-500 mb-2">{product.description}</p>
  <div class="flex items-center justify-between mb-2">
    <span class="text-gray-900 font-bold">${product.price}</span>
    <button class="text-red-500">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
      </svg>
    </button>
  </div>
  <div class="flex items-center">
    <div class="flex items-center mr-2">
      <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927C9.363 2.174 10.636 2.174 10.951 2.927l1.858 4.736 4.724.689c.85.124 1.189 1.165.577 1.74l-3.422 3.289.807 4.706c.146.85-.753 1.495-1.49 1.095l-4.229-2.224-4.229 2.224c-.737.4-1.635-.245-1.49-1.095l.807-4.706L.64 10.092c-.612-.575-.273-1.616.577-1.74l4.724-.689 1.858-4.736z"></path>
      </svg>
      <span class="ml-1 text-gray-700">{product.rating.rate}</span>
    </div>
    <span class="text-gray-600">({product.rating.count} reviews)</span>
  </div>
</a>
