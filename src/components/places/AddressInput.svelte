<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { parseAddress } from '$src/lib/utils/parse_address';
  import type { address } from '$src/types/address';
  export let Id: string = '';
  export let placeholder: string = '';
  export let Klass: string = '';
  type add_business_address = (address: address) => void;
  export let functionToCallAfter: add_business_address;
  $: streetAddress = '';
  let options = ['address_component', 'formatted_address', 'geometry', 'name'];
  const dispatch = createEventDispatcher();
  onMount(() => {
    (() => {
      const input = document.getElementById(Id);
      // @ts-ignore
      const autocomplete = new google.maps.places.Autocomplete(input, options);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const address = parseAddress(place);
        functionToCallAfter(address);
      });
      dispatch('ready');
    })();
  });
</script>

<input id={Id} class="{Klass} input max-w-[500px]" {placeholder} value={streetAddress} />

<style>
  input {
    background-color: #ffffff;
  }
</style>
