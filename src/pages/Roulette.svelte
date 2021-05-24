<script>
  import { beforeUpdate, afterUpdate, onMount, onDestroy } from "svelte";
  import browser from "webextension-polyfill";
  const { console } = browser.extension.getBackgroundPage();
  onMount(() => {
    console.log(222);
  });
</script>

<main>Roulette Page</main>

<style></style>
