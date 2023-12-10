<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import { initDeliveryStreetAutocomplete } from './init_street_autocomplete';
  import {
    validateDeliveryStreet,
    type bookShipmentErrorsType
  } from '$src/routes/(admin)/admin/booking/[slug]/book';
  import type { location } from '$src/types/location';
  export let deliveryStore: Writable<location>;
  export let bookShipmentErrorsStore: Writable<bookShipmentErrorsType>;
  onMount(() => {
    initDeliveryStreetAutocomplete();
  });
</script>

{#if $deliveryStore?.address}
  <label for="deliveryStreet" class="sr-only">Delivery Street</label>
  <input
    form="quoteForm"
    id="deliveryStreet"
    required
    style="background-color:#ffffff;"
    class="input w-[300px] font-roboto"
    placeholder="delivery street"
    type="text"
    on:change={validateDeliveryStreet}
    bind:value={$deliveryStore.address.addressLine1}
  />
{/if}
{#if !$bookShipmentErrorsStore.deliveryStreetAddress.valid}
  <div class="py-1 text-red-500 error">
    {$bookShipmentErrorsStore.deliveryStreetAddress.message}
  </div>
{/if}
