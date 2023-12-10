<script lang="ts">
	import type { bid } from '$src/types/bid';
  import { fade } from 'svelte/transition';
  export let bid:bid;
  export let index:number;
  export let handleRateDetails:(id:string)=>void;
</script>
{#if bid &&  bid?.amount?.netAmount && bid?.amount?.netAmount > 0}
<div
  class="flex flex-col justify-between sm:flex-row w-full max-w-[1100px] items-center rounded-lg bg-whitebg p-4 gap-3 sm:px-12"
  transition:fade
  id={'bid_' + index}
>
  <figures class="bg-neutral h-[80px] w-[160px] rounded-lg">
    <img src={bid.vendorLogo} class="logo w-full h-full p-2 object-contain" alt="company logo" />
  </figures>
  <div class="flex flex-col justify-around items-center">
    <p class="py-2 text-center font-space text-xl font-bold capitalize">{bid.carrier}</p>
    <div class="flex flex-col items-center gap-1">
      <ul class="flex py-1 sm:self-start">
        <li class="active text-[#FFD700]"><i class="fas fa-star" /></li>
        <li class="active text-[#FFD700]"><i class="fas fa-star" /></li>
        <li class="active text-[#FFD700]"><i class="fas fa-star" /></li>
        <li class="active text-[#FFD700]"><i class="fas fa-star" /></li>
        <li><i class="fas text-[#FFD700]" /></li>
      </ul>
      <p class="py-1 flex gap-2 self-start">
        Transition Time:<strong>
          {bid.transitTime}{parseInt(bid?.transitTime) > 1
            ? ' Business days'
            : ' Business day'}</strong
        >
      </p>
      {#if bid.deliveryDate}
        <p class="i py-1 flex gap-2 self-start text-lg  font-semibold">
          Estimated Delivery:
          <strong> {bid.deliveryDate.split('T')[0]}</strong>
        </p>
      {/if}
      <div class="price_text my-1 self-start">
        <strong class="text-xl">
          &#x24 {bid?.amount?.netAmount != undefined
            ? parseFloat(bid?.amount?.netAmount.toString()).toFixed(2)
            : 0}
        </strong>
        <del class="text-orange-300 text-md">
          {bid?.amount?.fullAmount != undefined
            ? parseFloat(bid?.amount?.fullAmount.toString()).toFixed(2)
            : ''}
        </del>
      </div>
    </div>
  </div>
  <button
    class="ownBtn sm:ml-8 my-2 w-[200px] self-center cursor-pointer bg-primary font-bungee"
    type="button"
    on:click|preventDefault={() => handleRateDetails(bid.bidId)}
  >
    Book Now
  </button>
</div>
{/if}
