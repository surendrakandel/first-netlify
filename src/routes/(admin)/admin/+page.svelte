<script lang="ts">
  import { updateAllowBooking } from '$src/apis/update_allow_booking';
	import { fade } from 'svelte/transition';
	import { basicStore } from './basic_store.js';
  $: businessId = '';

  async function allowBooking() {
    console.log('allow booking');
    let res = await updateAllowBooking(true);
    console.log('allow booking res', res);
  }
  async function preventBooking() {
    console.log('prevent booking');
    let res = await updateAllowBooking(false);
    console.log('prevent booking res', res);
  }
  $: allowBusinessToBook = false;
  $: preventBusinessToBook = false;
  function switchAllow() {
    allowBusinessToBook = !allowBusinessToBook;
  }
  export let data;
  console.log("admin datga is", data)
</script>

<div class="p-2 min-h-[100vh] self-start">
  <div class="flex flex-col py-4 mt-4 max-w-[610px] mr-2 bg-whitebg text-gray-900">
    <h2 class="pl-4 mt-3 text-md font-bold">
      Account: {$basicStore?.business?.businessId}
    </h2>
    <h2 class="pl-4 mb-3 text-md font-bold">
      Company Name: {$basicStore?.business?.businessName ? $basicStore?.business?.businessName : 'N/A'}
    </h2>
  </div>
  {#if $basicStore?.user?.email == 'kandelsuren@gmail.com'}
    <div class="flex p-4 flex-col gap-4 md:flex-row w-full">
      <div class="w-1/2 max-w-[200px]">
        <button class="ownBtn bg-primary w-full" on:click={switchAllow}> Allow Booking </button>
        {#if allowBusinessToBook}
          <div class="flex flex-col" transition:fade>
            <label class="py-4" for="destinationZip"> Allow Business to Book</label>
            <input
              type="text"
              id="businessId"
              name="businessId"
              placeholder="Business Id"
              class="input max-w-[300px]"
              bind:value={businessId}
            />
            <button
              on:click={allowBooking}
              class="ownBtn my-4 max-w-[200px] rounded-md bg-primary px-4 py-4"
            >
              AllowBooking
            </button>
          </div>
        {/if}
      </div>
      <div class="w-1/2 max-w-[200px]">
        <button
          class="bg-error ownBtn w-full"
          on:click={() => (preventBusinessToBook = !preventBusinessToBook)}
        >
          Prevent Booking
        </button>
        {#if preventBusinessToBook}
          <div class="flex flex-col">
            <label class="py-4" for="destinationZip">Prevent Business to Book</label>
            <input
              type="text"
              id="businessId"
              name="businessId"
              placeholder="Business Id"
              class="input max-w-[300px]"
              bind:value={businessId}
            />
            <button
              on:click|preventDefault={preventBooking}
              class="ownBtn my-4 max-w-[200px] rounded-md bg-primary px-4 py-4"
              >Prevent Booking</button
            >
          </div>
        {/if}
      </div>
    </div>
  {/if}
  <div class="flex md:max-w-[610px] flex-wrap gap-3 mt-8 bg-whitebg p-12">
    <div class="flex flex-col gap-5 sm:flex-row w-full items-center justify-center rounded-md">
      <a
        href="/admin/quote"
        class="ownBtn w-full sm:w-1/2 bg-primary rounded-md py-4 px-4 text-center">Get Quote</a
      >
      <a
        href="/admin/shipments"
        class="ownBtn w-full sm:w-1/2 rounded-md bg-primary py-4 px-4 text-center">Shipments</a
      >
    </div>
    <div class="flex flex-col gap-5 sm:flex-row w-full items-center justify-center rounded-md">
      <a
        href="/admin/track"
        class="ownBtn w-full sm:w-1/2 rounded-md bg-primary py-4 px-4 text-center"
        >Track A Shipment</a
      >
      <a
        href="/admin/shipments"
        class="ownBtn w-full sm:w-1/2 rounded-md bg-primary py-4 px-4 text-center">Download Bol</a
      >
    </div>
  </div>
</div>

<style>
  a:hover {
    opacity: 0.8;
  }
  a {
    color: white;
  }
</style>
