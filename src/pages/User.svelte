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
    const { keyCode } = event;
    if (13 === keyCode && userName) {
      dispatch("onAddUser", userName);
      userName = "";
    }
  };
  const onInput = (event) => {
    dispatch("onInputUserName", event.target.value);
  };
  const onRemoveUser = (user) => {
    dispatch("onRemoveUser", user);
  };
</script>

<section class="user-container">
  {#each userList as user, index (user.id)}
    <div class="user" on:click={onRemoveUser(user)}>
      {index + 1}. {user.name}
    </div>
  {/each}
</section>

<input
  id="userinput"
  class="user-input"
  type="text"
  placeholder="Please Press Enter"
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
    height: 170px;
  }
  .user-container > .user {
    background-color: #f5d042;
    color: #0a174e;
    border-radius: 4px;
    border: 1px solid #0a174e;
    padding: 1px;
    margin: 2px 3px;
    font-weight: bold;
    height: 20px;
    cursor: pointer;
  }
  .user-container > .user:hover {
    background-color: #0a174e;
    color: #f5d042;
    border-radius: 4px;
    border: 1px solid #f5d042;
    padding: 1px;
    margin: 2px 3px;
    font-weight: bold;
    height: 20px;
    cursor: pointer;
  }
  .user-container > .user:hover {
    background-color: #0a174e;
    color: #f5d042;
    border-radius: 4px;
    border: 1px solid #f5d042;
    padding: 1px;
    margin: 2px 3px;
    font-weight: bold;
    height: 20px;
    cursor: pointer;
  }
  .user-input {
    margin-top: 5px;
    width: 100%;
  }
</style>
