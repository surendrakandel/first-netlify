<script lang="ts">
  export let mxAuto = false;
</script>

<div class="mt-[80px] sm:mx-2 w-full">
  <div class="w-full max-w-[1150px]" class:mx-auto={mxAuto}>
    <slot />
  </div>
</div>
