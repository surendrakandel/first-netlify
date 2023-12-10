<script lang="ts">
  import { onMount } from 'svelte';
  import { basicStore } from '$src/routes/(admin)/admin/basic_store.js';
  import type { bookingResponse } from '$src/types/book.js';
  interface shipmentInfo {
    shipments: bookingResponse[];
  }
  let data: shipmentInfo = {
    shipments: []
  };
  onMount(async () => {
    data.shipments = $basicStore?.shipments;
  });
</script>

<div class="p-2 min-h-[100vh] text-black max-w-[1100px]">
  <h3 class="flex w-full flex-col py-2 text-black">Documents</h3>
  <div class="py-8 sm:px-6 bg-whitebg">
    <div class="rounded-lg px-5 py-8 shadow-md">
      <div class="flex flex-col border border-gray-500">
        <ul
          class="w-1/2 border-collapse flex-col gap-2 border border-gray-500 p-2 md:flex md:w-full md:flex-row md:justify-start"
        >
          <li class="w-full md:w-[50px]">S.N</li>
          <li class="w-full md:w-[100px]">Shipment ID</li>
          <li class="w-full md:w-1/5">Origin</li>
          <li class="w-full md:w-1/5">Destination</li>
          <li class="w-full md:w-1/5">Pickup Date</li>
          <li class="w-full md:w-1/5">Download BOL</li>
        </ul>
        {#if data?.shipments?.length > 0}
          <div class="hidden flex-col md:flex">
            {#each data?.shipments as shipment, index}
              <div
                class="flex w-1/2 border-collapse flex-col gap-2 border border-gray-500 p-2 font-mono md:w-full md:flex-row md:justify-start"
              >
                <h3 class="w-full md:w-1/6">{index + 1}</h3>
                <h3 class="w-full md:w-1/6">{shipment?.quoteRequest?.shipmentInfo?.quoteId}</h3>
                <h3 class="w-full md:w-1/6">
                  {shipment?.quoteRequest?.pickup?.address?.zipCode}, {shipment?.quoteRequest
                    ?.pickup?.address?.city}
                </h3>
                <h3 class="w-full md:w-1/6">
                  {shipment?.quoteRequest?.delivery?.address?.zipCode}, {shipment?.quoteRequest
                    ?.delivery?.address?.city}
                </h3>
                <h3 class="w-full md:w-1/6">
                  {shipment?.quoteRequest?.shipmentInfo?.pickupDate.split('T')[0]}
                </h3>
                <!-- svelte-ignore security-anchor-rel-noreferrer -->
                <a
                  target="_blank"
                  class="w-full underline underline-offset-2 md:w-1/6"
                  href={shipment?.bookingInfo?.bolUrl}>Download BOL</a
                >
              </div>
            {/each}
          </div>
        {/if}
      </div>
      {#if data?.shipments?.length > 0}
        <div class="mt-6 flex w-full flex-col gap-4 font-mono font-semibold md:hidden">
          {#each data?.shipments as shipment, index}
            <div class="flex w-full max-w-[400px] rounded-xl bg-purple-100 px-6 py-8">
              <div class="flex w-1/2 flex-col">
                <h3 class="">S.N</h3>
                <h3 class="">Shipment ID</h3>
                <h3 class="">Origin</h3>
                <h3 class="">Destination</h3>
                <h3 class="">Pickup Date</h3>
                <h3 class="">Download BOL</h3>
              </div>
              <div class="flex w-1/2 flex-col">
                <h3 class="">{index + 1}</h3>
                <h3 class="">{shipment?.quoteRequest?.shipmentInfo?.quoteId}</h3>
                <h3 class="">
                  {shipment?.quoteRequest?.pickup?.address?.city}, {shipment?.quoteRequest?.pickup
                    ?.address?.zipCode}
                </h3>
                <h3 class="">
                  {shipment?.quoteRequest?.delivery?.address?.city}, {shipment?.quoteRequest
                    ?.delivery?.address?.zipCode}
                </h3>
                <h3 class="">{shipment?.quoteRequest?.shipmentInfo?.pickupDate.split('T')[0]}</h3>
                <!-- svelte-ignore security-anchor-rel-noreferrer -->
                <a
                  target="_blank"
                  class="underline underline-offset-2"
                  href={shipment?.bookingInfo?.bolUrl}>Download BOL</a
                >
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
