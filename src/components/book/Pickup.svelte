<script lang="ts">
  //@ts-nocheck
  import Pickup from '$components/places/QuotePickupZip.svelte';
  import { zipCodeRegex } from '$src/lib/utils/regex';
  import BookPickupStreet from '$src/components/places/BookPickupStreet.svelte';
  import type { location } from '$src/types/location';
  import type { Writable } from 'svelte/store';
  import { quotePickupErrorsStore } from '$src/components/quote/pickup_store';
  import {
    validateShipperCompanyName,
    type bookShipmentErrorsType
  } from '$src/routes/(admin)/admin/booking/[slug]/book';
  export let pickupStore: Writable<location>;
  export let bookShipmentErrorsStore: Writable<bookShipmentErrorsType>;
  function validatePickupZipcode(event: any) {
    if($pickupStore.address){
      let zipCode = event.target.value;
      if (!zipCodeRegex.test(event.target.value)) {
        $quotePickupErrorsStore.pickupZipCode.valid = false;
          $pickupStore.address.zipCode = '';
      } else {
        $quotePickupErrorsStore.pickupZipCode.valid = true;
        $pickupStore.address.zipCode = zipCode;
      }
    }
  }
</script>

<div class="py-4 flex flex-col gap-1">
  {#if $pickupStore && $pickupStore.address}
    <div class="flex flex-col">
      <h3 class="label mt-1">Pickup Address</h3>
      <BookPickupStreet {pickupStore} {bookShipmentErrorsStore} />
      <div class="flex w-full flex-wrap gap-2 my-2">
        <div class="flex w-[160px] flex-col">
          <label for="shipperCity">City</label>
          <input
            class="input"
            id="shipperCity"
            required
            form="bookForm"
            style="background-color:#ffffff;"
            placeholder="pickup city"
            type="text"
            autocomplete="off"
            value={$pickupStore.address.city}
          />
        </div>
        <div class="flex w-[150px] flex-col">
          <label for="shipperState">State</label>
          <input
            class="input"
            id="shipperState"
            style="background-color:#ffffff;"
            placeholder="pickup state"
            autocomplete="off"
            required
            form="bookForm"
            type="text"
            bind:value={$pickupStore.address.state}
          />
        </div>
        <div class="flex w-[160px] flex-col">
          <label for="shipperZipcode">Zip</label>
          <input
            readonly
            class="input"
            style="background-color:#ffffff;"
            id="shipperZipcode"
            autocomplete="off"
            required
            form="bookForm"
            type="text"
            placeholder="pickup zipcode"
            bind:value={$pickupStore.address.zipCode}
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <div class="flex flex-col mb-1">
        <label class="" for="shipperCompanyName">Company Name</label>
        <input
          class="input w-full"
          style="background-color:#ffffff;"
          id="shipperCompanyName"
          required
          form="bookForm"
          type="text"
          name="shipperCompanyName"
          bind:value={$pickupStore.companyName}
          on:change={validateShipperCompanyName}
          placeholder="shipper company name"
        />
        {#if !$bookShipmentErrorsStore.shipperCompanyName.valid}
          <h3 class="text-red-500 font-semibold error">
            {$bookShipmentErrorsStore.shipperCompanyName.message}
          </h3>
        {/if}
      </div>
      <div class="flex flex-col mb-1">
        <label class="" for="shipperFirstName">Name</label>
        <input
          id="shipperName"
          style="background-color:#ffffff;"
          class="input"
          type="text"
          form="bookForm"
          required
          name="shipperName"
          bind:value={$pickupStore.contact.name}
          placeholder="shipper  name"
        />
        {#if !$bookShipmentErrorsStore.shipperName.valid}
          <div class="text-red-500 font-semibold error">
            {$bookShipmentErrorsStore.shipperName.message}
          </div>
        {/if}
      </div>
      <div class="flex flex-col mb-1">
        <label class="" for="shipperEmailAddress">Email Address</label>
        <input
          class="input"
          id="shipperEmailAddress"
          style="background-color:#ffffff;"
          type="email"
          form="bookForm"
          required
          name="shipperEmailAddress"
          placeholder="shipper email"
          bind:value={$pickupStore.contact.emailAddress}
        />
        {#if !$bookShipmentErrorsStore.shipperEmailAddress.valid}
          <div class="text-red-500 font-semibold error">
            {$bookShipmentErrorsStore.shipperEmailAddress.message}
          </div>
        {/if}
      </div>
      <div class="flex flex-col mb-1">
        <label class="" for="shipperPhoneNumber">Phone Number</label>
        <input
          class="input"
          id="shipperPhoneNumber"
          style="background-color:#ffffff;"
          type="tel"
          required
          name="shipperPhoneNumber"
          placeholder="phone number"
          bind:value={$pickupStore.contact.phoneNumber}
        />
        {#if !$bookShipmentErrorsStore.shipperPhoneNumber.valid}
          <div class="text-red-500 font-semibold error">
            {$bookShipmentErrorsStore.shipperPhoneNumber.message}
          </div>
        {/if}
      </div>
    </div>
    <div class="flex flex-col">
      <label class="pb-1" for="shipper_zipcode"><span>Pickup Zip Code</span></label>
      <Pickup {quotePickupErrorsStore} {pickupStore} {validatePickupZipcode} />
    </div>
    <div class="mt-3 flex flex-col">
      <label class="pb-1" for="shipper_zipcode"><span>Pickup Instruction</span></label>
      <textarea cols="5" class="p-3" bind:value={$pickupStore.instructions} />
    </div>
  {/if}
</div>
