<script lang="ts">
  import { goto } from '$app/navigation';
  import toast from 'svelte-french-toast';
  import type { bid } from '$src/types/bid';
  import { basicStore } from '$src/routes/(admin)/admin/basic_store';
  import { updateQuote } from '$src/routes/(admin)/admin/quote/quote_utils';
  import { bid_store } from '$src/routes/(admin)/admin/quote/rates/bid_store';
  import { onMount } from 'svelte';
  import { Circle3 } from 'svelte-loading-spinners';
  import Pusher, { Channel } from 'pusher-js';
  import Rate from '$src/components/rate/Rate.svelte';
  //@ts-ignore
  import QuoteInfo from '$src/components/quote/QuoteInfo.svelte';
  import { shipmentInfoStore } from '$src/components/quote/shipment_info_store';
	import Sort from '$src/components/widgets/Sort.svelte';
	import { get } from 'svelte/store';
  $: cheapest = true;
  function sortByFullPrice(bid1: bid, bid2: bid) {
    console.log("soriting")
    let value = 0;
    if (bid1 && bid2 && bid1?.amount?.netAmount && bid2?.amount?.netAmount) {
      value = bid1?.amount?.netAmount - bid2?.amount?.netAmount;
    }
    return value;
  }
  function SortByTransitTime(bid1: bid, bid2: bid): number{
    var value = 0;
    if (bid1 && bid2 && bid1?.transitTime && bid2?.transitTime) {
      let transitOne = parseInt(bid1?.transitTime);
      let transitTwo = parseInt(bid2?.transitTime);
      value = transitOne - transitTwo;
    }
    return value;
  }
  function sortByTransitTime() {
    if(cheapest){
      cheapest = false;
      console.log("soriting transit time")
      let bids = get(bid_store).bids;
      let sortedBids = bids.sort(SortByTransitTime);
      bid_store.update((value) => {
        value.bids = sortedBids;
        return value;
      });
    };
  }
  function sortByPriceTime() {
    if(!cheapest){
      cheapest = true;
      console.log("soriting transit time")
      let bids = get(bid_store).bids;
      let sortedBids = bids.sort(sortByFullPrice);
      bid_store.update((value) => {
        value.bids = sortedBids;
        return value;
      });
    }
  }
  function goToLastElement() {
    setTimeout(() => {
      let element = document.getElementById('bid_' + ($bid_store.bids.length - 1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
      }
    }, 100);
  }
  $: isLoading = false;
  $: hasBids = false;

  onMount(() => {
    let readyForQuote = localStorage.getItem('readyForQuote');
    let channel:Channel;
    if (readyForQuote == 'true') {
      let pusher = new Pusher('8c3f579efa07b69675fb', {
        cluster: 'us3'
      });
      isLoading = true;
      $bid_store.bids = [];
      Pusher.logToConsole = false;
      channel = pusher.subscribe($shipmentInfoStore.quoteId);
      channel.bind($shipmentInfoStore.quoteId, function (data: any) {
        if (data.type == 'quoteRequest') {
          updateQuote(data);
        }
        if (data.type == 'bid') {
          if (!hasBids) {
            hasBids = true;
          }
          bid_store.update((value) => {
            value.bids.push(data);
            value = value;
            return value;
          });
        }
        if (data.type == 'done') {
          $shipmentInfoStore.editMode = false;
          $bid_store.bids = $bid_store.bids.sort(sortByFullPrice);
          cheapest = true;
          localStorage.setItem('readyForQuote', 'false');
          channel.unbind($shipmentInfoStore.quoteId);
          channel.unsubscribe();
          setTimeout(() => {
            isLoading = false;
            // scroll to top
            window.scrollTo(0, 600);
          }, 2000);
        }
      });
    } else {
      localStorage.setItem('readyForQuote', 'false');
      return goto('/admin/quote');
    }
    return () => {
      channel.unbind($shipmentInfoStore.quoteId);
      channel.unsubscribe();
      bid_store.update((value) => {
        value.bids = [];
        return value;
      });
    };
  });
  function handleRateDetails(bid: string) {
    console.log("in rate details and businessStore", $basicStore)
    if (
      !$basicStore?.business?.phoneNumber?.phoneNumber ||
      !$basicStore?.business?.address?.zipCode
    ) {
      toast.success('please add your business and setup your account details first');
      goto('/admin/settings');
    } else {
      if (bid.split('-')[0] == $shipmentInfoStore.quoteId) {
        return goto(`/admin/booking/${bid}`);
      } else {
        toast.success('invalid request. Please get quote again');
        return goto('/admin/quote');
      }
    }
  }
</script>

<div class="p-2 min-h-[100vh] md:p-4 max-w-[1100px]">
  <QuoteInfo />
  <div class="flex flex-col sm:flex-row sm:justify-between h-[130px] sm:h-[100px] sm:items-center">
    <h3 class="py-4">Available Rates</h3>
    <div class="flex gap-3 items-center text-black self-center">
      <button on:click={sortByTransitTime} class="normal ownBtn bg-neutral flex gap-3 items-center shadow-md hover:opacity-80 min-w-[130px] max-w-[190px]">
        <span class:opacity-70={cheapest} class:small={cheapest}>Fastest</span>
        <Sort/>
      </button>
      <button on:click={sortByPriceTime} class="normal ownBtn bg-neutral flex gap-3 items-center shadow-md hover:opacity-70 min-w-[130px] max-w-[190px]">
        <span  class:opacity-60={!cheapest}  class:small={!cheapest}>Cheapest</span>
        <Sort/>
      </button>
    </div>
  </div>
  {#if isLoading}
    <div
      class="flex flex-col gap-1 h-[100px] w-[300px] justify-center items-center fixed top-[50%] left-[calc(50%-150px)] bg-whitebg px-12 py-8 rounded-lg shadow-lg"
      style="z-index:10000;"
    >
    <div class="mt-2">
      <Circle3 size="20" />
    </div>
    <h3 class="text-neutral text-xs w-[200px] text-center">GETTING QUOTES</h3>

    </div>
  {/if}
  {#if hasBids && $bid_store.bids.length > 0}
    <div class="flex w-full flex-col gap-8 pb-24 justify-center items-center lg:items-start">
      {#each $bid_store.bids as bid, index}
        <Rate {handleRateDetails} {bid} {index} />
      {/each}
    </div>
  {/if}
</div>
<style>
  .small {
    font-size: 0.6rem !important;
  }
  .normal {
    font-size: 0.9rem !important;
  }
</style>