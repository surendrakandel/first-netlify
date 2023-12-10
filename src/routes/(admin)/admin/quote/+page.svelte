<script lang="ts">
  import { onMount } from 'svelte';
  import toast from 'svelte-french-toast';
  import { goto } from '$app/navigation';
  import PickupCard from '$components/quote/Pickup.svelte';
  import { resetQuote, updateQuote, validateQuoteRequest } from './quote_utils';
  import DeliveryCard from '$src/components/quote/Delivery.svelte';
  import Items from '$src/components/quote/Item.svelte';
  import Prompt from '$src/components/quote/Prompt.svelte';
  import { basicStore } from '$src/routes/(admin)/admin/basic_store';
  import Loading from '$src/components/widgets/Loading.svelte';
  import { pickupPromptStore } from './quote_utils';
  import { createQuote } from '$src/apis/quote/create';
  import {
    quoteShipmentErrors,
    shipmentInfoStore,
    validatePickupDate,
    validateShipmentValue
  } from '$src/components/quote/shipment_info_store';
  import type { quoteRequest } from '$src/types/quote';
  import { newShipmentInfo } from '$src/lib/utils/new_shipment_info';
  import { getNewCommodity } from '$src/lib/utils/newCommodity';
  import { getNewLocation } from '$src/lib/utils/new_location';
  import { pickupStore } from '$src/components/quote/pickup_store';
  import { deliveryStore } from '$src/components/quote/delivery_store';
  import { commodityStore } from '$src/components/quote/commodity_store';
  import { fade } from 'svelte/transition';
	import { bid_store, type BidStore } from './rates/bid_store';
  let loading = false;
  async function getQuote() {
    $shipmentInfoStore.business = $basicStore?.business;
    let currentQuote: quoteRequest = {
      shipmentInfo: $shipmentInfoStore,
      commodities: $commodityStore,
      pickup: $pickupStore,
      delivery: $deliveryStore
    };
    let isValid = validateQuoteRequest(currentQuote);
    if (!isValid) {
      return;
    }
    const errorElements = document.getElementsByClassName('error');
    if (errorElements.length > 0) {
      errorElements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      return toast.error('Please fix the errors before getting quotes.');
    }
    try {
      loading = true;
      if(currentQuote.shipmentInfo?.pickupDate && currentQuote.shipmentInfo?.pickupDate.length == 10){
        currentQuote.shipmentInfo.pickupDate +=  "T00:00:00Z";
      }
      let res = await createQuote(currentQuote);
      if (res.shipmentInfo?.quoteId != '') {
        updateQuote(res);
        // SubscribeToQuote(res.quoteId);
        localStorage.setItem('readyForQuote', 'true');
        return await goto(`/admin/quote/rates`);
      }
    } catch (error) {
      loading = false;
      if ($shipmentInfoStore.pickupDate.includes('T')) {
        $shipmentInfoStore.pickupDate = $shipmentInfoStore.pickupDate.split('T')[0];
      }
      toast.error('could not get quotes. Please try again later.');
      console.debug('errors occured during getting quotes');
      return;
    }
    loading = false;
  }
  function handleCancel() {
    resetQuote();
  }
  onMount(() => {
      //@ts-ignore
      flatpickr("#pickupDate", {
        enableTime: false,
        minDate: 'today',
        dateFormat: "Y-m-d",
        onChange: validatePickupDate,
      });
      //@ts-ignore
      flatpickr("#pickupTime", {
        enableTime: true,
        noCalendar: true,
        time_24hr: true,
        defaultHour: new Date().getHours()+ 1 < 17 && new Date().getHours() + 1 > 9 ? new Date().getHours() + 1 : 12,
        dateFormat: "H:i",
        onChange: handleTimeChange,
      });
    bid_store.update(() => {
      let bidS:BidStore = {
        bids: [],
        choosen_bid: undefined
	    }
      return bidS;
    });
    if ($shipmentInfoStore.editMode != true) {
      let newQuote: quoteRequest = {
        shipmentInfo: newShipmentInfo(),
        commodities: [getNewCommodity(0)],
        pickup: getNewLocation(),
        delivery: getNewLocation()
      };
      updateQuote(newQuote);
      $shipmentInfoStore.editMode = false;
    } else {
      let quoteRequest: quoteRequest = {
        shipmentInfo: $shipmentInfoStore,
        commodities: $commodityStore,
        pickup: $pickupStore,
        delivery: $deliveryStore
      };
      updateQuote(quoteRequest);
    }
    shipmentInfoStore.update((value) => {
      if(value.pickupDate.includes('T')){
        let pickupDate = value.pickupDate.split('T')[0] + "T" + value.pickupReadyTime+ ":00";
        var date = new Date(pickupDate);
        var year = date.getUTCFullYear();
        var month = String(date.getUTCMonth() + 1).padStart(2, '0');
        var day = String(date.getUTCDate()).padStart(2, '0');
        var hours = String(date.getUTCHours()).padStart(2, '0');
        var minutes = String(date.getUTCMinutes()).padStart(2, '0');
        var seconds = String(date.getUTCSeconds()).padStart(2, '0');
        // Combine the date and time components into a string
        var utcTimeString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
        value.pickupDate = utcTimeString;
      }else{
        let pickupDate = value.displayDate + "T" +  value.pickupReadyTime + ":00";
        var date = new Date(pickupDate);
        var year = date.getUTCFullYear();
        var month = String(date.getUTCMonth() + 1).padStart(2, '0');
        var day = String(date.getUTCDate()).padStart(2, '0');
        var hours = String(date.getUTCHours()).padStart(2, '0');
        var minutes = String(date.getUTCMinutes()).padStart(2, '0');
        var seconds = String(date.getUTCSeconds()).padStart(2, '0');
        // Combine the date and time components into a string
        var utcTimeString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
        value.pickupDate = utcTimeString;
      }
      return value;
    });
    return ()=>{
    }
  });
  function handleTimeChange(date:Date[]) {
    let hour = date[0].getHours()
    let minute = date[0].getMinutes()
    if (hour == undefined || hour == null ||  minute == undefined || minute == null) {
      return;
    }
    let validPickupHour = hour >= 9 && hour < 18;
    let validPickupMinutes = hour == 17 ? minute <= 30 ? true: false: true;
    
    if(!validPickupHour || !validPickupMinutes){
      quoteShipmentErrors.update((value) => {
        value.pickupDate.message = 'time must be between 09:00 AM and 5:30 PM';
        value.pickupDate.valid = false;
        return value;
      });
      return
    }
    quoteShipmentErrors.update((value) => {
      value.pickupDate.message = '';
      value.pickupDate.valid = true;
      return value;
    });
    var hours = String(hour).padStart(2, '0');
    var minutes = String(minute).padStart(2, '0');
    let pickupTime = `${hours}:${minutes}:00`;
    shipmentInfoStore.update((value) => {
      if(value.pickupDate.includes('T')){
        let pickupDate = value.pickupDate.split('T')[0] + "T" + pickupTime;
        var date = new Date(pickupDate);
        var year = date.getUTCFullYear();
        var month = String(date.getUTCMonth() + 1).padStart(2, '0');
        var day = String(date.getUTCDate()).padStart(2, '0');
        var hours = String(date.getUTCHours()).padStart(2, '0');
        var minutes = String(date.getUTCMinutes()).padStart(2, '0');
        var seconds = String(date.getUTCSeconds()).padStart(2, '0');
        // Combine the date and time components into a string
        var utcTimeString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
        value.pickupDate = utcTimeString;

      }else{
        let pickupDate = value.pickupDate + "T" + pickupTime;
        var date = new Date(pickupDate);
        var year = date.getUTCFullYear();
        var month = String(date.getUTCMonth() + 1).padStart(2, '0');
        var day = String(date.getUTCDate()).padStart(2, '0');
        var hours = String(date.getUTCHours()).padStart(2, '0');
        var minutes = String(date.getUTCMinutes()).padStart(2, '0');
        var seconds = String(date.getUTCSeconds()).padStart(2, '0');
        // Combine the date and time components into a string
        var utcTimeString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
        value.pickupDate = utcTimeString;
      }
      return value;
    });
  } 
</script>

<div class="p-2 min-h-[100vh] md:pl-4 text-black mt-4  max-w-[1100px]">
  {#if loading}
    <Loading loadingText="Fetching Quotes for you." />
  {/if}
  {#if !loading && $shipmentInfoStore}
    <div class="w-full max-w-[1100px]">
      {#if $pickupPromptStore}
        <Prompt />
      {/if}
      <form
        class="flex w-full flex-col gap-6 mb-12"
        on:submit|preventDefault={getQuote}
        id="quoteForm"
      >
        <div class="flex flex-col my-4">
          <h3 class="pl-2 sm:pl-0 pr-2 text-md dark:text-white">Select Date & Time</h3>
          <div class="flex flex-col gap-2 w-full py-6 px-2 bg-whitebg">
            <div class="flex flex-col sm:flex-row w-full gap-2 max-w-[550px]">
              <div class="flex flex-col w-full min-w-[200px] sm:w-[60%]">
                <label class="label w-full" for="pickupDate">Pickup Date</label>
                <input
                  class="input -mt-1 min-w-[95%]"
                  type="text"
                  name="pickupDate"
                  id="pickupDate"
                  placeholder="Pickup Date.." 
                  data-input
                  required
                  bind:value={$shipmentInfoStore.displayDate}
                />
                
              </div>
              <div class="flex flex-col w-full min-w-[120px] sm:w-[40%]">
                <label class="label w-full" for="pickupTime">Pickup Time</label>
                <input
                  class="input -mt-1 min-w-[95%]"
                  type="text"
                  name="pickupTime"
                  id="pickupTime"
                  placeholder="Pickup Time.."
                  required
                  bind:value={$shipmentInfoStore.pickupReadyTime}
                />
              </div>
            </div>
            {#if !$quoteShipmentErrors?.pickupDate?.valid}
            <p
              class="error"
              class:block={!$quoteShipmentErrors?.pickupDate?.valid}
              transition:fade
            >
              {$quoteShipmentErrors?.pickupDate?.message}
            </p>
            {/if}
        </div>
        <div class="grid md:grid-cols-2 gap-4 my-4">
          <div class="flex flex-col w-full">
            <h3 class="sm:pl-0 pr-2 text-md">Pickup</h3>
            <div class="w-full py-4 px-3 sm:px-8 flex items-center bg-whitebg">
              <PickupCard />
            </div>
          </div>
          <div class="flex flex-col w-full">
            <h3 class="sm:pl-0 pr-2 text-md">Delivery</h3>
            <div class="w-full py-4 px-3 sm:px-8 flex items-center bg-whitebg">
              <DeliveryCard />
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <h3 class="sm:pl-0 pr-2 text-md">Shipment Details</h3>
          <div class="bg-whitebg">
            <Items bgColor={' w-full px-3 py-4 sm:px-8'} />
          </div>
        </div>
        <div class="flex flex-col my-4">
          <h3 class="sm:pl-0 pr-2 text-md">Shipment Value</h3>
          <div class="w-full px-3 py-8 sm:px-8 bg-whitebg">
            <input
              type="number"
              style="background-color:#fff;"
              id="shipmentValue"
              placeholder="shipment value"
              class="input w-full sm:w-[400px]"
              required
              bind:value={$shipmentInfoStore.shipmentValue}
              on:change={validateShipmentValue}
            />
            {#if !$quoteShipmentErrors?.shipmentValue?.valid}
              <p
                class="error"
                class:block={!$quoteShipmentErrors?.shipmentValue?.valid}
                transition:fade
              >
                {$quoteShipmentErrors?.shipmentValue?.message}
              </p>
            {/if}
          </div>
        </div>
        <div
          class="quote flex flex-col sm:flex-row gap-6 items-center justify-center sm:justify-start sm:items-start mt-6"
          >
          <button
            type="submit"
            class="ownBtn bg-neutral h-[80px] w-[70%] sm:max-w-[250px] hover:opacity-90"
          >
            Get Quote
          </button>
          <button
            class="ownBtn btn-error h-[80px] w-[70%] sm:max-w-[200px] hover:opacity-90"
            on:click|preventDefault={handleCancel}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  {/if}
</div>

<style>
  button {
    color: white !important;
  }
  h3,
  p {
    color: #1d1d1d;
  }
</style>
