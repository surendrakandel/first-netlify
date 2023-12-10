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

<div class="p-2 min-h-[100vh] text-black  max-w-[1100px]">
  <h1 class=" font-bold py-2">Submit a Claim</h1>
  <div class="sm:p-12 shadow-md self-start w-full bg-whitebg font-mono">
    <div class="flex flex-col gap-2">
      <p class=" mt-2">Disclaimers</p>
      <div class="flex flex-col gap-2">
        <div class="flex w-full items-center gap-2">
          <p>This form allows the presentation of a cargo claim.</p>
        </div>
        <div class="flex w-full items-center gap-2">
          <p>To get updates about previously filled claims, Please email us.</p>
        </div>
        <a class="text-blue-600 text-2xl" href="mailto:cargoclaims@firstshipper.com"
          >claims@firstshipper.com</a
        >
      </div>
    </div>
    <div class="flex flex-col gap-2 mt-8">
      <p>Search for an Order to start the Claim. This is required!</p>
      <div class="flex w-full flex-col gap-3 items-center">
        <label for="orderSearchText" class="self-start">Find Shipment</label>
        <input
          id="orderSearchText"
          placeholder="Find order"
          type="text"
          aria-label="find order"
          bind:value={shipmentNo}
          on:focus={() => (tracked = false)}
          style="background-color: #ffffff;"
          class="btn max-w-[300px] font-mono self-start w-full"
        />
      </div>
      <button
        style="color:#fff;"
        type="submit"
        disabled={shipmentNo.length < 4}
        class="ownBtn bg-neutral my-3 h-[70px] w-[300px] mt-6 items-center"
        on:click={track}
        >Search
        <i class="fas fa-search ml-4" />
      </button>
    </div>
    <div class="flex flex-col mt-3">
      {#if tracked}
        <p>Not Found</p>
      {/if}
    </div>
  </div>
</div>
