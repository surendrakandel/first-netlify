<script lang="ts">
  import { onMount } from 'svelte';
  import { initDeliveryZipCode } from './init_zipcode_autocomplete';
  import { deliveryStore, quoteDeliveryErrorsStore } from '../quote/delivery_store';
  onMount(() => {
    let instance = initDeliveryZipCode();
    //@ts-ignore
    return () => window.google.maps.event.clearListeners(instance, 'place_changed');
  });
</script>

{#if $deliveryStore?.address}
  <label for="deliveryZipCode" class="sr-only">Delivery Zip Code</label>
  <input
    form="quoteForm"
    type="text"
    required
    id="deliveryZipCode"
    style="background-color:#ffffff;"
    class="input w-full"
    placeholder="delivery zip code"
    bind:value={$deliveryStore.address.zipCode}
    on:change={() => {
      if($deliveryStore.address.zipCode.length > 5 || $deliveryStore.address.zipCode.length < 5) {
        deliveryStore.update((value) => {
          value.address.zipCode = '';
          return value;
        });
      }
    }}
  />
{/if}
{#if !$quoteDeliveryErrorsStore.deliveryZipCode.valid}
  <div class="py-1 text-red-500 error">delivery zip code is not valid</div>
{/if}
