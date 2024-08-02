<script>
  export let navbarOpen = false;
  export let toggleNavbar = () => {
    navbarOpen = !navbarOpen;
    console.log(navbarOpen); 
  };
</script>

<header class="sticky top-0 bg-gray-500 z-50">
  <nav class="border-gray-200">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" class="flex items-center space-x-3">
        <img src="/online-shop.png" class="h-10" alt="/online-shop.png">
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">SwiftCart</span>
      </a>
      <button on:click={toggleNavbar} class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      {#if navbarOpen}
        <div class="w-full md:block md:w-auto">
          <ul class="flex flex-col font-medium p-4 mt-4 border border-gray-100 rounded-lg bg-gray-500 md:space-x-8 md:flex-row md:mt-0">
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

<style>
  .sticky {
    position: sticky;
    top: 0;
    z-index: 50;
  }
 
  /* CSS for responsive design */
  @media screen and (max-width: 600px) {
    /* Styles for screens up to 600px wide */
    /* For example, you can adjust the layout for smaller screens */
  }

  @media screen and (min-width: 601px) and (max-width: 1024px) {
    /* Styles for screens between 601px and 1024px wide */
    /* Adjust the layout for medium-sized screens */
  }

  @media screen and (min-width: 1025px) {
    /* Styles for screens wider than 1024px */
    /* Modify the layout for larger screens */
  }

</style>
