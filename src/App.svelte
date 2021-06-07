<script>
  import browser from "webextension-polyfill";
  import { fly } from "svelte/transition";
  import User from "./pages/User.svelte";
  import UserController from "./pages/UserController.svelte";
  import MyInfo from "./pages/myInfo.svelte";
  import Roulette from "./pages/Roulette.svelte";
  import Resulte from "./pages/Resulte.svelte";
  import Error from "./pages/Error.svelte";
  import { uuidv4, deepCopy, reload } from "../api/commonFunctions.js";
  const { console } = browser.extension.getBackgroundPage();
  let userList = [];
  browser.storage.local.get(["userList"]).then((res) => {
    userList = deepCopy(res.userList);
  });

  let pageCount = 1;
  let userName = "";
  let selectedUser = {};
  function goPage(count) {
    pageCount = count;
  }
  function onAddUser({ detail: userName }) {
    const user = {
      id: uuidv4(),
      name: userName,
    };
    userList.push(user);
    browser.storage.local.set({ userList });
    userList = userList;
  }
  function onInputUserName({ detail: value }) {
    userName = value;
  }
  function onSelectedUser({ detail: user }) {
    selectedUser = user;
    goPage(3);
  }
  function onRemoveUser({ detail: user }) {
    const removedIndex = userList.findIndex((u) => u.id === user.id);
    if (removedIndex > -1) {
      userList.splice(removedIndex, 1);
      browser.storage.local.set({ userList });
    }
    reload();
  }
  function onClearUser() {
    browser.storage.local.clear();
    reload();
  }
  function goRoulettePage() {
    if (userList.length) goPage(2);
  }
</script>

<header>
  <h1>Funny Roulette</h1>
</header>
<section class="pages">
  {#if pageCount === 1}
    <User
      {userList}
      {userName}
      on:onAddUser={onAddUser}
      on:onInputUserName={onInputUserName}
      on:onRemoveUser={onRemoveUser}
    />
    <UserController
      on:onClearUser={onClearUser}
      on:goRoulettePage={goRoulettePage}
    />
  {:else if pageCount === 2}
    <Roulette {userList} on:onSelectedUser={onSelectedUser} />
  {:else if pageCount === 3}
    <Resulte {selectedUser} />
  {:else}
    <Error />
  {/if}
</section>

<footer>
  <!-- <span>
    {#if pageCount > 0}
      <button on:click={goPage(pageCount - 1)}>Prev</button>
    {/if}
    {#if pageCount < 4}
      <button on:click={goPage(pageCount + 1)}>Next</button>
    {/if}
    <button on:click={onClearUser}>Clear</button>
  </span> -->
  <MyInfo />
</footer>

<style>
  header {
    margin: 0px;
    padding: 5px 0px;
    height: 25px;
    background-color: #f5d042;
    text-align: center;
  }
  header > h1 {
    margin: 0px;
  }
  section {
    background-color: #0a174e;
    margin: 0px;
    padding: 10px 0px 0px 0px;
    height: calc(100% - 35px);
  }
  footer {
    margin: 0px;
    padding: 0px;
    height: 35px;
    background-color: #f5d042;
  }
</style>
