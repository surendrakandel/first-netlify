<script lang="ts">
  import toast from 'svelte-french-toast';
  $: tracked = false;
  $: shipmentNo = '';
  function track() {
    if (shipmentNo.length > 5) {
      tracked = true;
    } else {
      toast.error('Please enter a valid shipment number');
      tracked = false;
    }
  }
</script>

<div class="p-2 min-h-[100vh] text-black max-w-[1100px]">
  <h1 class="py-2">Track Freight Status</h1>
  <div class="lg:self-start">
    <div class="p-2 gap-6 bg-whitebg shadow-md sm:p-6 flex flex-col items-center lg:items-start">
      <form action="#" class="flex flex-col w-full items-center lg:items-start">
        <div class="flex flex-col gap-4">
          <input
            class="max-w-[300px] rounded-lg p-2"
            type="search"
            name="search"
            bind:value={shipmentNo}
            on:focus={() => (tracked = false)}
            placeholder="Bol Number / Pro Number"
          />
          <button type="submit" on:click={track} class="bg-neutral ownBtn h-[70px] w-[300px] mt-5"
            >Search <i class="fas fa-search ml-4" /></button
          >
        </div>
      </form>
      <h3 class="font-semibold">Status results</h3>
      {#if tracked}
        <div class="flex flex-col mt-3">
          <h3>Not Found</h3>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  button {
    color: white !important;
  }
</style>
