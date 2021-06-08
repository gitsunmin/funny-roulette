<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  const onGoBackPage = () => { dispatch('click'); }

</script>

<button class="back-btn" on:click={onGoBackPage}>
  <span>&#8592;</span>
</button>

<style>
  .back-btn {
    background-color: #0a174e;
    color: #f5d042;
    margin-left: 5px;
    font-size: 12pt;
    padding: 0px;
    height: 20px;
  }
</style>
