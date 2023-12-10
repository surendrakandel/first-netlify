<!-- <script lang="ts">
  import { useRegisterSW } from 'virtual:pwa-register/svelte';
  let buildDate = '__DATE__';
  let reloadSW ='__RELOAD_SW__';
  const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
    onRegistered(r) {
      if (reloadSW) {
        r &&
          setInterval(() => {
            console.log('Checking for sw update');
            r.update();
          }, 20000 /* 20s for testing purposes */);
      } else {
        console.log(`SW Registered: ${r}`);
      }
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    }
  });
  const close = () => {
    offlineReady.set(false);
    needRefresh.set(false);
  };
  $: toast = $offlineReady || $needRefresh;
</script>

{#if toast}
  <div class="pwa-toast"style="background-color: blue;"role="alert">
    <div class="message">
      {#if $offlineReady}
        <span> App ready to work offline </span>
      {:else}
        <span> New content available, click on reload button to update. </span>
      {/if}
    </div>
    {#if $needRefresh}
      <button on:click={() => updateServiceWorker(true)}> Reload </button>
    {/if}
    <button on:click={close}> Close </button>
  </div>
{/if}

<div class="pwa-date">
  {buildDate}
</div>

<style>
  .pwa-date {
    visibility: hidden;
  }
</style> -->
