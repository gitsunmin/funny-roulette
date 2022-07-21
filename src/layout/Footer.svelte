<script>
  import MyInfo from "../components/myInfo.svelte";

  export const title = "Funny Roulette";
</script>

<footer>
  <MyInfo class="account-info" />
</footer>

<style>
  footer {
    margin: 0px;
    padding: 0px;
    height: 35px;
    background-color: var(--primary);
  }
  .account-info {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(50%, 50%);
  }
</style>
