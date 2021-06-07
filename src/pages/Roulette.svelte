<script>
  export let userList = [];
  import { beforeUpdate, afterUpdate, onMount, onDestroy, createEventDispatcher } from "svelte";
  import * as easing from 'svelte/easing';
  import { tweened } from "svelte/motion";
  import { fly } from "svelte/transition";
  import browser from "webextension-polyfill";
  const dispatch = createEventDispatcher();

  const { console } = browser.extension.getBackgroundPage();
  const angle = tweened(0, {
    duration: 2000, // 값을 업데이트 하는 시간
    easing: easing['circOut'], // Same as `linear`, 타이밍 함수
  });
  const pageOutAnimation = {
    y: 50,
    duration: 200,
  }
  $: changedStore = $angle.toFixed(2);
  let isSelectingUser = false;
  const rand = (start, end) => Math.floor((Math.random() * (end-start+1)) + start);
  const doTurnRoulette = () => {
    if (!isSelectingUser) {
      isSelectingUser = true;
      const randomAngle = rand(0, 360);
      $angle = (360 * 4) + randomAngle;
      const userIndex = parseInt((randomAngle + betweenDeg) / (betweenDeg * 2), 10);
      let selectedUser = {};
      if (userIndex) selectedUser = userList[countUserList - userIndex];
      else selectedUser = userList[0];
      setTimeout(() => {
        isSelectingUser = false;
        dispatch('onSelectedUser', selectedUser);
      }, 2400);
    }
  }
  onMount(() => { console.log('tab number 2'); });

  const lineDegs = [];
  const contentDegs = [];
  const countUserList = userList.length;
  const betweenDeg = countUserList ? (360 / countUserList) / 2 : 360;
  for (let index = 0; index < countUserList; index += 1) {
    const user = userList[index];
    const eachDeg = (360 / countUserList) * index;
    lineDegs.push(eachDeg - 90 + betweenDeg);

    contentDegs.push({
      ...user,
      name: user.name[0],
      deg: eachDeg,
      fontSize: `${betweenDeg}pt`,
    });
  }
</script>

<section class="roultte" out:fly={pageOutAnimation}>
  <div class="container">
    <!-- arrow -->
    <div style="arrow">
      <div class="arrow-object" />
    </div>
    <div class="roullete" style={`transform: rotate(${changedStore}deg)`}>
      <!-- line -->
      {#each lineDegs as deg (deg)}
        {#if countUserList !== 1}
          <div class={`line`} style={`transform: rotate(${deg}deg);`} />
        {/if}
      {/each}
      <!-- content -->
      {#each contentDegs as user, index (user.id)}
        <div
          class={`content`}
          style={`transform: rotate(${user.deg}deg); font-size:${user.fontSize}`}
        >
          {index + 1}
        </div>
      {/each}
    </div>
    <button class="trigger" on:click={doTurnRoulette}>Start</button>
  </div>
</section>

<style>
  .roultte {
    color: thistle;
    height: 228px;
    width: 228px;
  }
  .container {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .roullete {
    width: 240px;
    height: 240px;
    border-radius: 50%;
    background: #f5d042;
    border: 3px solid #0a174e;
    position: relative;
    left: 12px;
  }
  .roullete.loop {
    animation: rotation 7s ease-in-out forwards;
  }
  .arrow {
    position: relative;
    left: 12px;
  }
  .arrow-object {
    position: absolute;
    z-index: 9999;
    top: 40px;
    left: 115px;
    width: 20px;
    height: 25px;
    background-color: #0a174e;
    clip-path: polygon(50% 100%, 0 0, 100% 0);
  }
  .line {
    width: 124px;
    height: 2px;
    background: #0a174e;
    position: absolute;
    transform-origin: left;
    top: 118px;
    left: 120px;
  }
  .content {
    /* font-size: 12px; */
    font-weight: bold;
    color: #0a174e;
    height: 238px;
    position: absolute;
    width: 100%;
    text-align: center;
  }
  .trigger {
    margin-top: 30px;
    margin-left: 20px;
    font-size: 30px;
    border-radius: 15px;
    padding: 10px 20px;
    border: 3px solid #0a174e;
    background-color: #f5d042;
    color: #0a174e;
    cursor: pointer;
  }
</style>
