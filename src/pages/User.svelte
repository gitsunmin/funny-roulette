<script>
  export let userList = [];
  export let userName = "";
  import { createEventDispatcher } from "svelte";
  import {
    beforeUpdate,
    afterUpdate,
    onMount,
    onDestroy,
    getContext,
    setContext,
  } from "svelte";
  import browser from "webextension-polyfill";
  const { console } = browser.extension.getBackgroundPage();
  const dispatch = createEventDispatcher();

  const onAddUser = (event) => {
    const { keyCode, isComposing } = event;
    if (13 === keyCode && userName) {
      // Enter
      dispatch("onAddUser", userName);
      userName = "";
    }
  };
  const onInput = (event) => {
    dispatch("onInputUserName", event.target.value);
  };
</script>

<section class="user-container">
  {#each userList as user (user.id)}
    <div class="user">{user.name}</div>
  {/each}
</section>

<input
  id="userinput"
  class="user-input"
  type="text"
  bind:value={userName}
  on:input={onInput}
  on:keydown={onAddUser}
/>

<style>
  .user-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    color: white;
    overflow-y: scroll;
    height: 190px;
  }
  .user-container > .user {
    background-color: #f5d042;
    color: #0a174e;
    border-radius: 4px;
    border: 1px solid black;
    padding: 1px;
    margin: 2px 3px;
    font-weight: bold;
    height: 20px;
  }
  .user-input {
    margin-top: 5px;
    width: 100%;
  }
</style>
