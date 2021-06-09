<script>
  import { beforeUpdate, afterUpdate, onMount, onDestroy } from "svelte";
  import browser from "webextension-polyfill";
  const { console } = browser.extension.getBackgroundPage();
  onMount(() => {
    console.log(222);
  });
</script>

<section class="my-info">
  <span><a href="https://www.google.co.kr/maps/place/%ED%95%9C%EA%B5%AD/@37.9908806,125.4121826,7z/data=!3m1!4b1!4m5!3m4!1s0x356263108b3d1c3b:0x86416151fc4a3997!8m2!3d37.6639976!4d127.9784585?hl=ko" target="_blank">Korea</a></span> | 
  <span
    ><a href="mailto:tjsals116@gmail.com" target="_blank">tjsals116@gmail.com</a
    ></span
  > | 
  <span><a href="https://github.com/gitsunmin" target="_blank">Github</a></span> | 
  <span
    ><a
      href="https://www.notion.so/57317aa092a34cf49cdf98d38904d192?v=0575947d73be48659cb4a49aaf1c7dad"
      target="_blank">Notion</a
    ></span
  >
</section>

<style>
  .my-info {
    height: 100%;
    color: #0a174e;
  }
</style>
