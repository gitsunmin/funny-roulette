<script>
  export let userList = [];
  export let userName = "";
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
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
  onMount(() => {
    userName = "";
  });
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
  maxlength="20"
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
    background-color: var(--primary);
    color: var(--secondary);
    border-radius: 4px;
    border: 1px solid var(--secondary);
    padding: 1px;
    margin: 2px 3px;
    font-weight: bold;
    height: 20px;
    cursor: pointer;
  }
  .user-container > .user:hover {
    background-color: var(--secondary);
    color: var(--primary);
    border-radius: 4px;
    border: 1px solid var(--primary);
    padding: 1px;
    margin: 2px 3px;
    font-weight: bold;
    height: 20px;
    cursor: pointer;
  }
  .user-container > .user:hover {
    background-color: var(--secondary);
    color: var(--primary);
    border-radius: 4px;
    border: 1px solid var(--primary);
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
