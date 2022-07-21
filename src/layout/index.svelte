<script>
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
</script>

<main class="app-main">
  <Header />
  <slot />
  <Footer />
</main>

<style>
  .app-main {
    height: 400px;
  }
</style>
