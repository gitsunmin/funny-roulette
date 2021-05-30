<script>
  export let userList = [];
  import { beforeUpdate, afterUpdate, onMount, onDestroy } from "svelte";
  import browser from "webextension-polyfill";
  const { console } = browser.extension.getBackgroundPage();
  onMount(() => {
    console.log(222);
  });
</script>

<section class="roultte">
    {#each userList as user (user.id)}
        { user.name }
    {/each}
</section>

<style>
.roultte {
    background-color: teal;
    color: thistle;
    height: 170px;
}
</style>
