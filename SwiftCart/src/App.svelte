<style>
  /* Default styles for the header */
  header {
    background-color: #333;
    color: white;
    padding: 10px;
  }

  /* Media query for smaller screens */
  @media screen and (max-width: 600px) {
    header {
      padding: 5px;
    }
  }
</style>

<script>
  import { Router, Route } from 'svelte-routing';
  import Index from './routes/index.svelte';
  import Product from './routes/Product.svelte';
  import Header from './lib/components/Header.svelte';
  import Footer from './lib/components/Footer.svelte';

  let isNavbarOpen = false;

  // Define a function to handle toggling the navbar
  function toggleNavbar() {
    isNavbarOpen = !isNavbarOpen;
  }
</script>

<Header toggleNavbar={toggleNavbar} />

<Router>
  <Route path="/" component={Index} />
  <Route path="/product/:id" component={Product} />
</Router>

<Footer />