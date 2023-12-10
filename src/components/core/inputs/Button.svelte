<script lang="ts">
  export let text: string;
</script>

<button
  on:click
  class="my-2 rounded-3xl border-none py-3 outline-none duration-200 ease-in-out hover:scale-105 hover:transition-all focus:outline-none"
>
  {text}
</button>
