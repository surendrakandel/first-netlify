<script lang="ts">
  import { basicStore } from '$src/routes/(admin)/admin/basic_store';
</script>

<div class="p-2 min-h-[100vh]  max-w-[1100px]">
  <h1 class="my-4 font-bold">Recent Bookings</h1>
  <div class="text-[#25274d]">
    <div class="flex flex-col border border-gray-500">
      <div
        class="hidden w-1/2 border-collapse flex-col gap-2 border border-gray-500 p-2 md:flex md:w-full md:flex-row md:justify-start"
      >
        <h3 class="w-full md:w-1/6">S.N</h3>
        <h3 class="w-full md:w-1/6">Shipment ID</h3>
        <h3 class="w-full md:w-1/6">Origin</h3>
        <h3 class="w-full md:w-1/6">Destination</h3>
        <h3 class="w-full md:w-1/6">Pickup Date</h3>
        <h3 class="w-full md:w-1/6">Download BOL</h3>
      </div>
      <div class="hidden flex-col md:flex">
        {#if $basicStore?.shipments?.length > 0}
          {#each $basicStore?.shipments as shipment, index}
            <div
              class="flex w-1/2 border-collapse flex-col gap-2 border border-gray-500 p-2 font-mono md:w-full md:flex-row md:justify-start"
            >
              <h3 class="w-full md:w-1/6">{index + 1}</h3>
              <h3 class="w-full md:w-1/6">{shipment?.quoteRequest?.shipmentInfo?.quoteId}</h3>
              <h3 class="w-full md:w-1/6">
                {shipment?.quoteRequest?.pickup?.address?.zipCode}, {shipment?.quoteRequest?.pickup
                  ?.address?.city}
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
        {/if}
      </div>
    </div>
    <div class="mt-6 flex w-full flex-col gap-4 font-mono font-semibold md:hidden">
      {#if $basicStore?.shipments?.length > 0}
        {#each $basicStore?.shipments as shipment, index}
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
              <h3 class="">{shipment?.quoteRequest?.shipmentInfo?.pickupDate}</h3>
              <h3 class="">
                {shipment?.quoteRequest?.pickup?.address?.city}, {shipment?.quoteRequest?.pickup
                  ?.address?.zipCode}
              </h3>
              <h3 class="">
                {shipment?.quoteRequest?.delivery?.address?.city}, {shipment?.quoteRequest?.delivery
                  ?.address?.zipCode}
              </h3>
              <h3 class="">{shipment?.quoteRequest?.shipmentInfo?.pickupDate.split('T')[0]}</h3>
              <a
                target="_blank"
                class="underline underline-offset-2"
                href={shipment?.bookingInfo?.bolUrl}>Download BOL</a
              >
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>
