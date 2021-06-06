<script>
  import browser from "webextension-polyfill";
  import User from "./pages/User.svelte";
  import MyInfo from "./pages/myInfo.svelte";
  import Roulette from "./pages/Roulette.svelte";
  import Resulte from "./pages/Resulte.svelte";
  import Error from "./pages/Error.svelte";
  import { uuidv4, deepCopy } from "../api/commonFunctions.js";
import { empty } from "svelte/internal";
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
    console.log('user:', user);
    selectedUser = user;
  }
  function onClearUser() {
    browser.storage.local.clear();
    userList = [];
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
    />
    <MyInfo />
  {:else if pageCount === 2}
    <Roulette {userList} on:onSelectedUser={onSelectedUser} />
  {:else if pageCount === 3}
    <Resulte {selectedUser} />
  {:else}
    <Error />
  {/if}
</section>

<footer>
  <span>
    {#if pageCount > 0}
      <button on:click={goPage(pageCount - 1)}>Prev</button>
    {/if}
    {#if pageCount < 4}
      <button on:click={goPage(pageCount + 1)}>Next</button>
    {/if}
    <button on:click={onClearUser}>Clear</button>
  </span>
</footer>

<style>
  header {
    margin: 0px;
    padding: 5px 0px;
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
    height: 100%;
  }
  footer {
    margin: 0px;
    padding: 0px;
    height: 40px;
    background-color: #f5d042;
  }
</style>
