<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import toast from 'svelte-french-toast'; //@ts-ignore
  import Pickup from '$src/components/book/Pickup.svelte';
  import Delivery from '$src/components/book/Delivery.svelte';
  import Prompt from '$src/components/quote/Prompt.svelte';
  import Loading from '$src/components/widgets/Loading.svelte';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import { createBooking } from '$src/apis/booking/create';
  import { bid_store } from '$src/routes/(admin)/admin/quote/rates/bid_store';
  import { basicStore } from '$src/routes/(admin)/admin/basic_store';
  import { bookShipmentErrorsStore } from './book';
  import Item from '$src/components/book/Item.svelte';
  import { shipmentInfoStore } from '$src/components/quote/shipment_info_store';
  import type { quoteRequest } from '$src/types/quote';
  import { pickupPromptStore } from '$src/routes/(admin)/admin/quote/quote_utils';
  import { pickupStore } from '$src/components/quote/pickup_store';
  import { deliveryStore } from '$src/components/quote/delivery_store';
  import { commodityStore } from '$src/components/quote/commodity_store';
  import QuoteInfo from '$src/components/quote/QuoteInfo.svelte';
  import { validateBookRequest } from '$src/components/book/book_utils';
	import { isEnvDev } from '$src/lib/config';
  let loading = true;

  async function handleCancelBooking() {
    return await goto('/admin/quote');
  }
  async function handleBookingRequest() {
    let quoteRes: quoteRequest = {
      pickup: get(pickupStore),
      delivery: get(deliveryStore),
      shipmentInfo: get(shipmentInfoStore),
      commodities: get(commodityStore)
    };
    let validbooking = validateBookRequest(quoteRes);
    if (!validbooking) {
      toast.error('invalid request.please fill all required fields');
      loading = false;
      return;
    }
    try {
      loading = true;
      let qtReq: quoteRequest = {
        pickup: get(pickupStore),
        delivery: get(deliveryStore),
        shipmentInfo: get(shipmentInfoStore),
        commodities: get(commodityStore)
      };
      let choosenBid = get(bid_store)
      if(choosenBid.choosen_bid?.bidId){
        if(qtReq.shipmentInfo){
          qtReq.shipmentInfo.businessId = get(basicStore).business?.businessId || '';
          qtReq.shipmentInfo.business = get(basicStore).business;
        }
        let bkReq = { quoteRequest: qtReq, bidId: choosenBid.choosen_bid?.bidId };
        let res = await createBooking(fetch,bkReq);
        if(res.bookingInfo?.bolGenerated){
          toast.success('booking is successfull');
          let bolUrl = `/admin/bol/${choosenBid.choosen_bid?.bidId}`;
          return await goto(bolUrl);
        }
        
      }else{
        toast.error('could not book quote. Please login and try again');
        return await goto('/admin/quote');
      }
    } catch (error:any) {
      if (!error.message.includes('booking is not allowed')) {
        toast.error('could not book quote. Please try again');
      }
      return await goto('/admin/quote');
    }
  }
  onMount(async () => {
    let { slug } = $page.params;
    let bidId = slug;
    if ($shipmentInfoStore.quoteId == bidId.split('-')[0]) {
      let currentBid = $bid_store.bids.find((bid) => bid.bidId == bidId);
      if (currentBid) {
        $bid_store.choosen_bid = currentBid;
      }
      $shipmentInfoStore.business = get(basicStore).business;
      $shipmentInfoStore.businessId = get(basicStore).business?.businessId || '';
      if($pickupStore?.address && $deliveryStore?.address){
          $pickupStore.address.addressLine1 = '';
          $pickupStore.address.addressLine2 = '';
          $deliveryStore.address.addressLine1 = '';
          $deliveryStore.address.addressLine2 = '';
      }
      if ($pickupStore) {
        $pickupStore.companyName = $basicStore.business?.businessName || '';
        $pickupStore.contact = {
          name: $basicStore.business?.adminUser?.name || '',
          emailAddress: $basicStore.business?.adminEmail || '',
          phoneNumber: $basicStore.business?.phoneNumber?.phoneNumber || '',
          phoneNumberDisplay: '',
          roles: [],
          prefferedContactMethod: '',
          businessId: $basicStore.business?.businessId || '',
          type: 'contact'
        };
      }
      if ($deliveryStore) {
        if(!isEnvDev()){
          $deliveryStore.companyName = '';
          $deliveryStore.contact = {
            name: '',
            emailAddress: '',
            phoneNumber: '',
            phoneNumberDisplay: '',
            roles: [],
            prefferedContactMethod: '',
            businessId: get(basicStore).business?.businessId || '',
            type: 'contact'
          };
        }
      }
      loading = false;
    } else {
      toast.error('could not find bid');
      loading = false;
      return await goto('/admin/quote');
    }
  });
</script>

{#if $pickupPromptStore}
  <Prompt />
{/if}
<div class="p-2 min-h-[100vh] md:pl-4 text-black mt-4  max-w-[1100px]">
  {#if loading}
    <div
      class="fixed flex min-h-[calc(100vh-160px)] w-full flex-col items-center justify-center duration-300 lg:w-[calc(100vw-160px)]"
    >
      <Loading loadingText="Hold on. Booking Load" />
    </div>
  {:else if $pickupStore && deliveryStore && shipmentInfoStore && !loading}
    <QuoteInfo />
    <form
      class="flex w-full flex-col gap-6 mb-12 max-w-[1100px]"
      on:submit|preventDefault={handleBookingRequest}
      id="bookForm"
    >
      <div class="grid md:grid-cols-2 gap-4 mt-4">
        <div class="flex flex-col w-full">
          <h3 class="py-3 label text-lg -ml-1">Shipper Details</h3>
          <div
            class="px-3 py-4 sm:px-8 bg-whitebg"
            id="shipperDetails"
            class:min-h-[matchHeight]={() => window.innerWidth > 768}
          >
            <Pickup {pickupStore} {bookShipmentErrorsStore} />
          </div>
        </div>
        <div class="flex flex-col w-full">
          <h3 class="py-3 label text-lg -ml-1">Receivers Details</h3>
          <div class="w-full px-3 py-4 sm:px-8 bg-whitebg" id="receiverDetails">
            <Delivery {deliveryStore} {bookShipmentErrorsStore} />
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <h3 class="py-3 label text-lg">Shipment Details</h3>
        <div class="mb-6 bg-whitebg">
          <Item {commodityStore} bgColor={' w-full px-3 py-4 sm:px-8'} />
        </div>
      </div>
      <div class="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <button
          type="submit"
          class="btn-primary ownBtn bg-neutral w-[300px] max-w-[400px]"
          class:disabled={loading}
        >
          Dispatch
        </button>
        <button
          class="btn-primary ownBtn w-[300px] max-w-[400px]"
          style="background-color: rgba(252, 101, 60, 0.702); color:white;"
          type="button"
          on:click|preventDefault={handleCancelBooking}
        >
          Cancel Booking
        </button>
      </div>
    </form>
  {/if}
</div>

<style>
  button:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  label{
    font-weight: 600;
    font-family: "bungee";
  }
</style>
