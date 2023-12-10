<script lang="ts">
  import PageWrapper from '$src/components/widgets/PageWrapper.svelte';
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

<PageWrapper mxAuto={true}>
  <div class="mx-auto max-w-[500px] py-16">
    <div class="flex flex-col shadow-md w-full bg-primary py-24 px-8 rounded-lg">
      <h1 class="mt-4">Track Freight Status</h1>
      <div class="m-4 flex flex-col items-center">
        <form action="#" class="w-full">
          <div class="flex flex-col items-center gap-4">
            <input
              class="min-w-[300px] rounded-lg p-2"
              type="search"
              name="search"
              bind:value={shipmentNo}
              on:focus={() => (tracked = false)}
              placeholder="Bol Number / Pro Number"
            />
            <button
              type="submit"
              on:click={track}
              class="bg-neutral ownBtn h-[70px] w-full mt-5"
              style="color:#fff;">Search <i class="fas fa-search ml-4" /></button
            >
          </div>
        </form>
      </div>
      <h3 class="font-semibold">Status results</h3>
      {#if tracked}
        <div class="flex flex-col mt-3">
          <h3>Not Found</h3>
        </div>
      {/if}
    </div>
  </div>
</PageWrapper>
