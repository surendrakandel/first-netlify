<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import { initPickupStreetAutocomplete } from './init_street_autocomplete';
  import {
    validatePickupStreet,
    type bookShipmentErrorsType
  } from '$src/routes/(admin)/admin/booking/[slug]/book';
  import type { location } from '$src/types/location';
  export let pickupStore: Writable<location>;
  export let bookShipmentErrorsStore: Writable<bookShipmentErrorsType>;
  onMount(() => {
    initPickupStreetAutocomplete();
  });
</script>

{#if $pickupStore?.address}
  <label for="pickupStreet" class="sr-only">Pickup Street</label>
  <input
    form="quoteForm"
    id="pickupStreet"
    required
    style="background-color:#ffffff;"
    class="input w-[300px] font-roboto"
    placeholder="pickup street"
    type="text"
    on:change={validatePickupStreet}
    bind:value={$pickupStore.address.addressLine1}
  />
{/if}
{#if !$bookShipmentErrorsStore.pickupStreetAddress.valid}
  <div class="py-1 text-red-500 error">{$bookShipmentErrorsStore.pickupStreetAddress.message}</div>
{/if}
