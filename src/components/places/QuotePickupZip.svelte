<script lang="ts">
  import { onMount } from 'svelte';
  import { initPickUpZipCode } from './init_zipcode_autocomplete';
  import { pickupStore, quotePickupErrorsStore } from '../quote/pickup_store';
  onMount(() => {
    let instance = initPickUpZipCode();
    //@ts-ignore
    return () => window.google.maps.event.clearListeners(instance, 'place_changed');
  });
</script>

{#if $pickupStore?.address}
  <label for="pickupZipCode" class="sr-only">Pickup Zip Code</label>
  <input
    form="quoteForm"
    id="pickupZipCode"
    required
    style="background-color:#ffffff;"
    class="input w-full"
    placeholder="pickup zip code"
    type="text"
    bind:value={$pickupStore.address.zipCode}
    on:change={() => {
      if($pickupStore.address.zipCode.length > 5 || $pickupStore.address.zipCode.length < 5) {
        pickupStore.update((value) => {
          value.address.zipCode = '';
          return value;
        });
      }
    }}
  />
{/if}
{#if !$quotePickupErrorsStore.pickupZipCode.valid}
  <div class="py-1 text-red-500 error">pickup zip code is not valid</div>
{/if}
