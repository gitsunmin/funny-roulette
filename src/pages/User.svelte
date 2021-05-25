<script>
  import { beforeUpdate, afterUpdate, onMount, onDestroy } from "svelte";
  import browser from "webextension-polyfill";
  const { console } = browser.extension.getBackgroundPage();
  beforeUpdate(async () => {
    const a = await browser.storage.local.get(["key"]);
    console.log("a;", a);
    console.log("beforeUpdate");
  });

  onMount(() => {
    console.log(111);
  });
</script>

<div class="user-container">
  <div class="user">김선민</div>
  <div class="user">김선민</div>
  <div class="user">김선민</div>
  <div class="user">김선민</div>
  <div class="user">김수아무</div>
  <div class="user">김선민</div>
  <div class="user">김선민</div>
  <div class="user">김선민</div>
  <div class="user">김선민</div>
  <div class="user">김선민</div>
  <div class="user">김선민</div>
</div>

<input class="user-input" type="text" />

<style>
  .user-container {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .user-container > .user {
    background-color: coral;
    border-radius: 4px;
    border: 1px solid black;
    padding: 1px;
    margin: 2px 3px;
    font-weight: bold;
  }
</style>
