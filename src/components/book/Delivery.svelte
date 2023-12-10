<script lang="ts">
  //@ts-nocheck
  import Delivery from '$components/places/QuoteDeliveryZip.svelte';
  import type { Writable } from 'svelte/store';
  import { zipCodeRegex } from '$src/lib/utils/regex';
  import type { location } from '$src/types/location';
  import {
    validateReceiverEmail,
    type bookShipmentErrorsType,
    validateReceiverName,
    validateReceiverPhoneNumber,
    validateReceiverCompanyName
  } from '$src/routes/(admin)/admin/booking/[slug]/book';
  import BookDeliveryStreet from '$src/components/places/BookDeliveryStreet.svelte';
  import { fade } from 'svelte/transition';
  import { quoteDeliveryErrorsStore } from '$src/components/quote/delivery_store';
  export let deliveryStore: Writable<location>;
  export let bookShipmentErrorsStore: Writable<bookShipmentErrorsType>;
  function validateDeliveryZipcode(event: any) {
    if (!zipCodeRegex.test(event.target.value)) {
      $quoteDeliveryErrorsStore.deliveryZipCode.valid = false;
      if ($deliveryStore?.address?.zipCode) {
        $deliveryStore.address.zipCode = '';
      }
    } else {
      $quoteDeliveryErrorsStore.deliveryZipCode.valid = true;
    }
  }
</script>

<div class="py-4">
  {#if $deliveryStore && $deliveryStore?.address}
    <div class="flex flex-col">
      <h3 class="label mt-3">Delivery Address</h3>
      <BookDeliveryStreet {deliveryStore} {bookShipmentErrorsStore} />
      <div class="flex w-full flex-wrap gap-2 my-2">
        <div class="flex w-[160px] flex-col">
          <label for="receiverCity">City</label>
          <input
            class="input"
            style="background-color:#ffffff;"
            id="receiverCity"
            form="bookForm"
            placeholder="delivery city"
            autocomplete="off"
            required
            bind:value={$deliveryStore.address.city}
          />
        </div>
        <div class="flex w-[150px] flex-col">
          <label for="receiverState">State</label>
          <input
            class="input"
            id="receiverState"
            style="background-color:#ffffff;"
            placeholder="delivery state"
            autocomplete="off"
            form="bookForm"
            required
            bind:value={$deliveryStore.address.state}
          />
        </div>
        <div class="flex w-[160px] flex-col">
          <label for="receiverZipcode">Zip</label>
          <input
            readonly
            class="input"
            id="receiverZipcode"
            style="background-color:#ffffff;"
            placeholder="delivery zipcode"
            autocomplete="off"
            form="bookForm"
            required
            bind:value={$deliveryStore.address.zipCode}
          />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex flex-col mb-1">
          <label class="" for="receiverCompanyName">Company Name</label>
          <input
            class="input w-full"
            style="background-color:#ffffff;"
            id="receiverCompanyName"
            required
            form="bookForm"
            type="text"
            name="receiverCompanyName"
            on:change={(event) => validateReceiverCompanyName(event)}
            bind:value={$deliveryStore.companyName}
            placeholder="receiver company name"
          />
          {#if !$bookShipmentErrorsStore.receiverCompanyName.valid}
            <div transition:fade class="text-red-500 font-semibold error">
              {$bookShipmentErrorsStore.receiverCompanyName.message}
            </div>
          {/if}
        </div>
        <div class="flex w-full flex-col mb-1">
          <label class="" for="receiverName">Name</label>
          <input
            id="receiverName"
            class="input"
            style="background-color:#ffffff;"
            type="text"
            form="bookForm"
            required
            name="receiverName"
            autocomplete="off"
            placeholder="receiver name"
            on:change={(event) => validateReceiverName(event)}
            bind:value={$deliveryStore.contact.name}
          />
          {#if !$bookShipmentErrorsStore.receiverName.valid}
            <div transition:fade class="text-red-500 font-semibold error">
              {$bookShipmentErrorsStore.receiverName.message}
            </div>
          {/if}
        </div>
        <div class="flex w-full flex-col mb-1">
          <label class="" for="receiverEmailAddress">Email Address</label>
          <input
            class="input"
            style="background-color:#ffffff;"
            id="receiverEmailAddress"
            form="bookForm"
            type="email"
            autocomplete="off"
            name="receiverEmailAddress"
            placeholder="receiver email"
            required
            on:change={(event) => validateReceiverEmail(event)}
            bind:value={$deliveryStore.contact.emailAddress}
          />
          {#if !$bookShipmentErrorsStore.receiverEmailAddress.valid}
            <div transition:fade class="text-red-500 font-semibold error">
              {$bookShipmentErrorsStore.receiverEmailAddress.message}
            </div>
          {/if}
        </div>
        <div class="flex w-full flex-col mb-1">
          <label class="" for="receiverPhoneNumber">Phone Number</label>
          <input
            class="input"
            style="background-color:#ffffff;"
            id="receiverPhoneNumber"
            type="tel"
            form="bookForm"
            autocomplete="off"
            name="receiverPhoneNumber"
            required
            placeholder="receiver phone number"
            on:change={(event) => validateReceiverPhoneNumber(event)}
            bind:value={$deliveryStore.contact.phoneNumber}
          />
          {#if !$bookShipmentErrorsStore.receiverPhoneNumber.valid}
            <div transition:fade class="text-red-500 font-semibold error">
              {$bookShipmentErrorsStore.receiverPhoneNumber.message}
            </div>
          {/if}
        </div>
      </div>
    </div>
    <div class="flex flex-col mt-1">
      <label class="pb-1" for="shipper_zipcode"><span>Delivery Zip Code</span></label>
      <Delivery {deliveryStore} {quoteDeliveryErrorsStore} {validateDeliveryZipcode} />
    </div>
    <div class="mt-3 flex flex-col">
      <label class="pb-1" for="shipper_zipcode"><span>Delivery Instruction</span></label>
      <textarea cols="5" class="p-3" bind:value={$deliveryStore.instructions} />
    </div>
  {/if}
</div>
