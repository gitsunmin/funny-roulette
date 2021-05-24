<script>
  import { beforeUpdate, afterUpdate, onMount, onDestroy } from "svelte";
  import browser from "webextension-polyfill";
  const { console } = browser.extension.getBackgroundPage();
  onMount(() => {
      console.log(111);
  });
</script>

<main>
  User Page
</main>

<style></style>
