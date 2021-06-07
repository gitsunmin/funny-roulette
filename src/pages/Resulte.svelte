<script>
  import browser from "webextension-polyfill";
  import { tweened } from "svelte/motion";
  import * as easing from "svelte/easing";
  import {
    beforeUpdate,
    afterUpdate,
    onMount,
    onDestroy,
    createEventDispatcher,
  } from "svelte";
  export let selectedUser = {};
  const nameSize = tweened(0, {
    duration: 2200, // 값을 업데이트 하는 시간
    easing: easing["circOut"], // Same as `linear`, 타이밍 함수
  });
  $: changedNameSize = $nameSize.toFixed(2);
  afterUpdate(() => {
    setTimeout(() => {
      $nameSize = 1;
    }, 700);
  });
  browser.tts.speak(`dong dong dong dong ${selectedUser.name}`, { lang: "ko-kr", pitch: 1.2 });
</script>

<section class="resulte">
  <div
    class="resulte-name"
    style={`transform: scale(${changedNameSize}, ${changedNameSize});`}
  >
    {selectedUser.name}
  </div>
</section>

<style>
  .resulte > .resulte-name {
    margin: 100px 20px 0px 20px;
    padding: 0px 5px;
    width: 200px;
    height: 70px;
    max-height: 70px;
    font-size: 40pt;
    background-color: #0a174e;
    border: 1px solid #f5d042;
    color: #f5d042;
    text-align: center;
    border-radius: 12px;
  }
</style>
