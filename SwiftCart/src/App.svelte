<script>
  import { Router, Route } from 'svelte-routing';
  import Index from './routes/index.svelte';
  import Product from './routes/Product.svelte';
  import Header from './lib/components/Header.svelte';
  import Footer from './lib/components/Footer.svelte';

  let navbarOpen = false;

  function toggleNavbar() {
    navbarOpen = !navbarOpen;
  }
</script>

<Header {navbarOpen} {toggleNavbar} />

<Router>
  <Route path="/" component={Index} />
  <Route path="/product/:id" component={Product} />
</Router>

<Footer />
