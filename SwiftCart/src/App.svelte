<script>
  import { Router, Link, Route } from 'svelte-routing';
  import Navbar from './Navbar.svelte';
  import ProductList from './ProductList.svelte';
  import ProductDetails from './ProductDetails.svelte';

  let products = [];
  let categories = [];
</script>

<Navbar />

<Router>
  <Route path="/" component={ProductList} />
  <Route path="product/:productId" let:params>
      <ProductDetails productId={params.productId} />
  </Route>
</Router>
