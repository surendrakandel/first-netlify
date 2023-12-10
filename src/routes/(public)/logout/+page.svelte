<script lang="ts">
  import Loading from '$src/components/widgets/Loading.svelte';
  import { browser } from '$app/environment';
  import { resetBasicStore } from '$src/routes/(admin)/admin/basic_store';
  import { onMount } from 'svelte';
  import { resetQuote } from '$src/routes/(admin)/admin/quote/quote_utils';
  onMount(() => {
    if (browser) {
      resetBasicStore();
      resetQuote();
      localStorage.removeItem('basicStore');
      localStorage.removeItem('tokenStore');
      localStorage.removeItem('currentShipmentServices');
      localStorage.removeItem('tokenStore');
      localStorage.removeItem('currentPickupLocation');
      localStorage.removeItem('basicStore');
      localStorage.removeItem('currentCommodities');
      localStorage.removeItem('currentDeliveryLocation');
      localStorage.removeItem('currentShipmentInfo');
      localStorage.removeItem('debug');
      localStorage.clear();
      window.location.href = '/';
    }
  });
</script>

<div class="pageWrapper flex h-[500px] w-full flex-col items-center justify-center">
  <Loading loadingText="Logging Out" />
</div>
