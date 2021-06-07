<script>
  export let userList = [];
  import { beforeUpdate, afterUpdate, onMount, createEventDispatcher } from "svelte";
  import browser from "webextension-polyfill";
  const { console } = browser.extension.getBackgroundPage();
  const dispatch = createEventDispatcher();
  onMount(() => {
    console.log(222);
  });
  const onClearUser = () => {
    dispatch('onClearUser');
  }
  const goRoulettePage = () => {
    dispatch('goRoulettePage');
  }
</script>

<section class="user-controller">
  <h2>Controller</h2>
  <div class="row">
    Remove: Click the 
    <span class="user">
      Item
    </span>
  </div>
  <div class="row">
    Clear: Click the <button class="clear-btn" on:click={onClearUser}>Clear</button>
  </div>
  <div class="row">
    Go to roulette:
    Click the <button class="go-page-btn" on:click={goRoulettePage}>
      go
    </button>
  </div>
</section>

<style>
  .user-controller {
    height: 162px;
    color: #f5d042;
  }

  .user-controller > h2 {
    text-align: center;
  }

  .user-controller > .row {
    margin: 0px 10px;
    height: 30px;
  }

  .user {
    background-color: #f5d042;
    color: #0a174e;
    border-radius: 4px;
    border: 1px solid #0a174e;
    padding: 1px;
    margin: 2px 3px;
    width: 60px;
    font-weight: bold;
    height: 20px;
  }

  .clear-btn {
    cursor: pointer;
  }

  .go-page-btn {
    cursor: pointer;
  }
</style>
