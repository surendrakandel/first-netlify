<script lang="ts">
  import style from '$src/css/app.css';
  import { Toaster } from 'svelte-french-toast';
  import Nav from '$src/components/core/navbar/Nav.svelte';
  import Footer from '$src/components/core/footer/Footer.svelte';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { afterNavigate } from '$app/navigation';
  import { resetQuote } from '$src/routes/(admin)/admin/quote/quote_utils';
  onMount(() => {
    resetQuote();
  });
  afterNavigate(() => {
    let toggleInput = document.getElementById('toggle-input') as HTMLInputElement;
    // set checked to false
    if (toggleInput?.checked) {
      toggleInput.checked = false;
    }
  });
  // $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
  <script type="text/javascript" id="zsiqchat">
    var $zoho = $zoho || {};
    $zoho.salesiq = $zoho.salesiq || {
      widgetcode: 'aec79fcb5537d247e907d1723cabd32568605f7af0a27823b94b8639002f7378',
      values: {},
      ready: function () {}
    };
    var d = document;
    s = d.createElement('script');
    s.type = 'text/javascript';
    s.id = 'zsiqscript';
    s.defer = true;
    s.src = 'https://salesiq.zoho.com/widget';
    t = d.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
  </script>
</svelte:head>

<Toaster containerStyle="margin-top:60px;" />
<Nav />
<div class="overflow-x-hidden" transition:fade>
  <slot />
</div>
<Footer />
