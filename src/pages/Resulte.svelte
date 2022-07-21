<script>
  import browser from "webextension-polyfill";
  import { tweened } from "svelte/motion";
  import * as easing from "svelte/easing";
  import BackButton from "../components/BackButton.svelte";
  import { afterUpdate, createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let selectedUser = {};
  const nameSize = tweened(0, {
    duration: 2200, // 값을 업데이트 하는 시간
    easing: easing["circOut"], // Same as `linear`, 타이밍 함수
  });
  $: changedNameSize = $nameSize.toFixed(2);

  afterUpdate(() => {
    $nameSize = 1;
  });
  browser.tts.speak(`${selectedUser.name}`, { lang: "ko-kr", pitch: 1.2 });
  const onGoBackPage = () => {
    dispatch("onGoBackPage");
  };
</script>

<section class="resulte">
  <BackButton on:click={onGoBackPage} />
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
    background-color: #0a174e;
    border: 1px solid var(--primary);
    font-size: 40pt;
    color: var(--primary);
    text-align: center;
    border-radius: 12px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
