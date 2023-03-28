<script>
  import browser from "webextension-polyfill";

  import Layout from "./layout/index.svelte";
  import User from "./pages/User.svelte";
  import UserController from "./pages/UserController.svelte";
  import Roulette from "./pages/Roulette.svelte";
  import Resulte from "./pages/Resulte.svelte";
  import Error from "./pages/Error.svelte";

  import { uuidv4, deepCopy, reload } from "./utils/index.js";

  import "./style/index.css";

  let userList = [];
  try {
    browser.storage.local.get(["userList"]).then((res) => {
      userList = deepCopy(res.userList);
    });
  } catch (error) {
    console.error(error);
    reload();
  }
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
  function onGoBackPage() {
    pageCount -= 1;
  }
</script>

<Layout>
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
      <Roulette
        {userList}
        on:onSelectedUser={onSelectedUser}
        on:onGoBackPage={onGoBackPage}
      />
    {:else if pageCount === 3}
      <Resulte {selectedUser} on:onGoBackPage={onGoBackPage} />
    {:else}
      <Error />
    {/if}
  </section>
</Layout>

<style>
  section {
    background-color: var(--secondary);
    margin: 0px;
    padding: 10px 0px 0px 0px;
    height: calc(100% - 35px);
  }
</style>
