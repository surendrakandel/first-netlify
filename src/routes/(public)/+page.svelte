<script lang="ts">
  import { fade } from 'svelte/transition';
  import Mobile from '$src/components/sections/Mobile.svelte';
  import ShipmentTracking from '$src/components/sections/ShipmentTracking.svelte';
  import toast from 'svelte-french-toast';
  import { deliveryStore } from '$src/components/quote/delivery_store';
  import { commodityStore } from '$src/components/quote/commodity_store';
  import { browser } from '$app/environment';
  import QuotePickupZip from '$src/components/places/QuotePickupZip.svelte';
  import {pickupStore } from '$src/components/quote/pickup_store';
  import { shipmentInfoStore } from '$src/components/quote/shipment_info_store';
  import QuoteDeliveryZip from '$src/components/places/QuoteDeliveryZip.svelte';
  function getQuote() {
    let valid = true;
    if(browser){
      localStorage.setItem("isEdit", "true");
    }
    if ($pickupStore?.address?.zipCode.length != 5) {
      isDataValid.originZip = false;
      valid = false;
    } else {
      isDataValid.originZip = true;
    }
    if ($deliveryStore?.address?.zipCode.length != 5) {
      isDataValid.destinationZip = false;
      valid = false;
    } else {
      isDataValid.destinationZip = true;
    }
    if (!$commodityStore[0].weight) {
      isDataValid.weight = false;
      valid = false;
    } else {
      isDataValid.weight = true;
    }
    // if (!$commodityStore[0].freightClass) {
    //   isDataValid.freightClass = false;
    //   valid = false;
    // } else {
    //   isDataValid.freightClass = true;
    // }
    if ($commodityStore[0].quantity <= 0) {
      isDataValid.qty = false;
      valid = false;
    } else {
      isDataValid.qty = true;
    }
    if (!$commodityStore[0].width) {
      isDataValid.width = false;
      isDataValid.dimensions = false;
      valid = false;
    } else {
      isDataValid.width = true;
    }
    if (!$commodityStore[0].height) {
      isDataValid.height = false;
      isDataValid.dimensions = false;
      valid = false;
    } else {
      isDataValid.height = true;
    }
    if (!$commodityStore[0].length) {
      isDataValid.length = false;
      isDataValid.dimensions = false;
      valid = false;
    } else {
      isDataValid.length = true;
    }
    if (isDataValid.width && isDataValid.height && isDataValid.length) {
      isDataValid.dimensions = true;
    }
    if (!valid) {
      toast.error('Please fill all the required fields');
      return;
    }
    $shipmentInfoStore.editMode = true;
    window.location.href = '/admin/quote';
    return;
  }
  $: isDataValid = {
    originZip: true,
    destinationZip: true,
    weight: true,
    freightClass: true,
    dimensions: true,
    qty: true,
    width: true,
    height: true,
    length: true
  };
</script>

{#if $pickupStore?.address && $deliveryStore?.address}
  <main class="min-h-[700px] w-full" transition:fade>
    <div class="lg:mx-auto flex-col max-w-[1300px] pt-12 md:pt-[100px] flex justify-center">
      <div
        class="flex flex-col justify-center items-center bg-whitebg text-center p-12 prose text-gray-900"
      >
        <h3 class="text-2xl sm:text-4xl font-semibold tracking-tighter text-neutral">
          Hassle-Free LTL freight shipping
        </h3>
        <p class="hidden md:flex pt-7 text-lg font-semibold text-center prose max-w-[800px]">
          Looking for the best LTL freight rates? FirstShipper has you covered. Our platform
          connects you with top carriers, who compete to offer you the best rates.
        </p>
      </div>
      <form
        class="flex flex-wrap gap-2 px-2 md:px-12 py-12 bg-primary shadow-md my-12"
        on:submit|preventDefault={getQuote}
      >
        <div class="flex flex-grow flex-col">
          <label class:text-red-600={!isDataValid.originZip} class="font-semibold" for="originZip"
            >Origin Zip Code</label
          >
          <QuotePickupZip />
        </div>
        <div class="flex flex-grow flex-col">
          <label
            class="font-semibold"
            for="destinationZip"
            class:text-red-600={!isDataValid.destinationZip}>Destination Zip Code</label
          >
          
          <QuoteDeliveryZip  />
        </div>
        <div class="flex flex-grow flex-col">
          <label class:text-red-600={!isDataValid.weight} class="-mt-1" for="weight"
            >Total Weight</label
          >
          <input
            type="text"
            tabindex="0"
            placeholder="LB"
            class="input"
            name="weight"
            bind:value={$commodityStore[0].weight}
          />
        </div>
        <div class="flex flex-col md:flex-row gap-2 w-full">
          <div class="flex flex-col w-full md:flex-row gap-2">
            <div class="flex flex-col w-full md:w-[75%]">
              <label
                class:text-red-600={!isDataValid.dimensions}
                class="-mt-1"
                for="dimensions">Dimensions</label
              >
              <div class="flex flex-col w-full md:flex-row gap-2">
                <input
                  type="number"
                  class="px-2 py-3 w-full flex-wrap min-w-[200px] rounded-lg"
                  placeholder="Length"
                  max="75"
                  step="1"
                  bind:value={$commodityStore[0].length}
                />
                <input
                  type="number"
                  class="px-2 py-3 w-full flex-wrap min-w-[200px] rounded-lg"
                  placeholder="width"
                  max="75"
                  step="1"
                  bind:value={$commodityStore[0].width}
                />
                <input
                  type="number"
                  class="px-2 py-3 w-full flex-wrap min-w-[200px] rounded-lg"
                  placeholder="Height"
                  max="75"
                  step="1"
                  bind:value={$commodityStore[0].height}
                />
              </div>
            </div>
            <div class="flex flex-col w-full md:w-[25%]">
              <label class:text-red-600={!isDataValid.qty} class="-mt-1" for="qty"
                >Package Quantity</label
              >
              <input
                type="text"
                placeholder="quantity"
                tabindex="0"
                class="px-2 py-3 rounded-lg bg-white"
                name="qty"
                bind:value={$commodityStore[0].quantity}
              />
            </div>
          </div>
        </div>
        <div class="w-full flex flex-col items-center justify-center mt-6">
          <div class="flex flex-grow flex-col justify-center items-center min-w-[200px]">
            <button
              type="submit"
              class="ownBtn min-w-[300px] bg-neutral shadow-lg"
            >
              Get Rates
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
{/if}
<ShipmentTracking />
<Mobile />

<style>
  button[type='submit']:hover {
    opacity: 0.95;
  }
  input {
    margin-top: 5px;
  }
  label {
    font-size: 11px;
    color: white !important;
    font-family: bungee;
  }
</style>
