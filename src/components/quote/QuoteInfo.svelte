<script lang="ts">
  import { page } from '$app/stores';
  import Truck from '$src/components/widgets/icons/truck.svelte';
  import { goto } from '$app/navigation';
  import { getLocationName } from '$src/lib/utils/getlocation_type_name';
  import { getFreightClassString } from '$src/lib/utils/freight_class';
  import { shipmentInfoStore } from '$src/components/quote/shipment_info_store';
  import { bid_store } from '$src/routes/(admin)/admin/quote/rates/bid_store';
  import { pickupStore } from './pickup_store';
  import { deliveryStore } from './delivery_store';
  import { commodityStore } from './commodity_store';
  function editQuote() {
    $shipmentInfoStore.editMode = true;
    // window.location.href = '/admin/quote';
    goto('/admin/quote');
  }
</script>

{#if $shipmentInfoStore}
  <div
    class="w-full max-w-[1050px] lg:max-w-[1100px] shadow-lg bg-neutral rounded-lg"
    style="display:flex; flex-direction:column;"
  >
    <div class="breadcrumbs font-bold" style="overflow-x:visible">
      <ul class="flex ml-3 mt-2 w-full gap-2 ">
        <li class="">
          <a href="/admin" class="no-underline text-secondary hover:opacity-80 underline-offset-4">
            Home
          </a>
        </li>
        <li class="">
          <button
            on:click={editQuote}
            data-sveltekit-reload
            class="flex items-center gap-2 edit-quote-btn text-secondary hover:opacity-80 hover:underline underline-offset-4"
          >
            Quote
          </button>
        </li>
        <li>
          {#if $page.url.pathname.includes('rates')}
            <div class="flex gap-2 items-center text-secondary hover:opacity-80 underline-offset-1">
              Rates
            </div>
          {:else}
            <a href="/admin/quote/rates">
              <div class="w-6 h-6 text-secondary hover:opacity-80 underline-offset-1">
                Rates
              </div></a
            >
          {/if}
        </li>
        {#if $page.url.pathname.includes('booking')}
          <li class="flex items-center gap-2 ">
            Book
          </li>
        {/if}
      </ul>
    </div>
    <div class="mx-4 flex-col gap-3 pt-4 pb-8 sm:px-8 w-full max-w-[600px]">
      <div class="flex w-full justify-start gap-5 py-2">
        <div class="w-[[80px]] min-w-[80px]">
          <img src="/images/icons/pallet.svg" width="50" alt="pickup icon" class="self-center" />
        </div>
        <button on:click={editQuote} class="ownBtn w-[150px] bg-primary">Edit Quote </button>
      </div>
      <h2 class="mt-3 w-full py-2 font-bold">Shipment Info</h2>
      <h3 class="mt-3 w-full py-2 font-bold">
        Quote: <span class="ml-3">{$shipmentInfoStore.quoteId}</span>
      </h3>
      <div class="mt-3 flex w-full justify-start gap-5">
        <div class="w-1/2">
          <h4 class="font-bold">Origin</h4>
          <p class="py-2 font-bold tracking-wide">
            {$pickupStore?.address?.zipCode || ''}, {$pickupStore?.address?.state || ''}
          </p>
        </div>
        <div class="w-1/2">
          <h4 class="font-bold">Destination</h4>
          <p class="py-2 font-bold tracking-wide">
            {$deliveryStore?.address?.zipCode || ''}, {$deliveryStore?.address?.state || ''}
          </p>
        </div>
      </div>
      <div class="mt-3 flex w-full justify-start gap-5">
        <div class="w-1/2">
          <h4 class="font-bold">Pickup Location</h4>
          <p class="py-2 font-bold tracking-wide">{getLocationName($pickupStore.locationType)}</p>
        </div>
        <div class="w-1/2">
          <h4 class="font-bold">Delivery Location</h4>
          <p class="py-2 font-bold tracking-wide">
            {getLocationName($deliveryStore?.locationType)}
          </p>
        </div>
      </div>
      <div class="flex mt-3 text-xs w-full justify-around">
        <h3 class="w-[9.5%] text-center">Qty</h3>
        <h3 class="w-[22%] text-center">Pack. Typ</h3>
        <h3 class="w-[22%] text-center">Dims</h3>
        <h3 class="w-[20%] text-center">T. Weight</h3>
        <h3 class="w-[26.5%] text-center">Class</h3>
      </div>
      {#each $commodityStore as commodity, index}
        <div class="flex">
          <p class="w-[9.5%] py-2 font-mono font-semibold text-center">
            {commodity.quantity}
          </p>
          <p class="w-[22%] py-2 font-mono font-semibold text-center">
            {commodity.packageType == 1
              ? 'Pallet'
              : commodity.packageType == 2
              ? 'Box'
              : commodity.packageType == 3
              ? 'Bundle'
              : commodity.packageType == 4
              ? 'Crate'
              : commodity.packageType == 5
              ? 'Loose'
              : commodity.packageType == 6
              ? 'Pieces'
              : commodity.packageType == 7
              ? 'Roll'
              : 'Unrecognized'}
          </p>
          <p class="w-[23%] py-2 font-mono font-semibold text-center">
            {commodity?.length}*{commodity?.width}*{commodity?.height}
          </p>
          <p class="w-[20%] py-2 font-mono font-semibold text-center">
            {commodity.weight}
          </p>
          <p class="w-[25.5%] py-2 font-mono font-semibold text-center">
            {getFreightClassString(commodity.freightClass)}
          </p>
        </div>
      {/each}
      <h3 class="font-bold mt-3">
        Pickup Date: {$shipmentInfoStore?.displayDate.split(' ')[0]}, Time: {$shipmentInfoStore?.pickupReadyTime}
      </h3>
      {#if $bid_store?.choosen_bid?.amount && $bid_store?.choosen_bid?.amount?.netAmount > 0 && $page.url.pathname.includes('booking')}
        <div class="font-bold mt-3">
          Rate: <span class="text-[#eea47f]"> ${parseFloat($bid_store?.choosen_bid?.amount?.netAmount.toString()).toFixed(2)}</span>
        </div>
      {/if}
    </div>
  </div>
{/if}
<style>
  h3{
    font-family: "Space Mono", monospace !important;
    font-size: 13px !important;
  }
  h4{
    font-family: "bungee", monospace !important;
    font-size: 15px !important;
    font-weight: bold;
  }
  p{
    font-size: 16px !important;
  }
</style>