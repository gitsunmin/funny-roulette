<script>
  import browser from "webextension-polyfill";
  import User from "./pages/User.svelte";
  import Roulette from "./pages/Roulette.svelte";
  import Resulte from "./pages/Resulte.svelte";
  import Error from "./pages/Error.svelte";
  const { console } = browser.extension.getBackgroundPage();
  let pageCount = 1;
  console.log("settings");
  function goPage(count) {
    pageCount = count;
  }
</script>

<header>
  <h1>Funny Roulette</h1>
</header>
<section class="pages">
  {#if pageCount === 1}
    <User />
  {:else if pageCount === 2}
    <Roulette />
  {:else if pageCount === 3}
    <Resulte />
  {:else}
    <Error />
  {/if}
  <img src="/images/roulette-summary.jpg" alt="roulette" width="230" height="230">
  <span>
    {#if pageCount > 0}
      <button on:click={goPage(pageCount - 1)}>Prev</button>
    {/if}
    {#if pageCount < 4}
      <button on:click={goPage(pageCount + 1)}>Next</button>
    {/if}
  </span>
</section>

<footer>FOOTER</footer>

<style>
  header {
    margin: 0px;
    padding: 0px;
    background-color: orange;
  }
  header > h1 {
    margin: 0;
  }
  section {
    background-color: peachpuff;
    margin: 0px;
    padding: 0px;
    height: 404.508497187473712px;
    width: 250px;
  }
  footer {
    margin: 0px;
    padding: 0px;
    background-color: teal;
  }
</style>
