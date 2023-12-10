<script lang="ts">
  import style from '$src/css/app.css';
  import DashNav from '$components/core/navbar/DashNav.svelte';
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { Toaster } from 'svelte-french-toast';
  import Sidenav from '$src/components/core/navbar/Sidenav.svelte';
	import { updateBasicStore } from './basic_store';
  let loading = true;
  onMount(async () => {
    setTimeout(() => {
      let zohoElement = document.getElementById('zsiq_float') as HTMLElement;
      if (zohoElement) {
        zohoElement.style.display = 'none';
      }
    }, 2000);
    loading = false;
    updateBasicStore(data);
  });
  afterNavigate(() => {
    let toggleInput = document.getElementById('toggle-input') as HTMLInputElement;
    if (toggleInput?.checked) {
      toggleInput.checked = false;
    }
  });
  export let data;
</script>

<svelte:head>
  <!-- {@html webManifest} -->
</svelte:head>
<Toaster containerStyle="margin-top:60px;" />
<!-- {#if loading}
	<Loading loadingText="setting up"/>
{:else} -->

<div class="w-full">
  <DashNav />
 
  {#if !loading}
    <div class="max-w-[calc(80rem+320px)] lg:ml-[160px] pt-[60px]">
      <div class="overflow-x-hidden">
        <Sidenav />
        <slot />
      </div>
    </div>
  {/if}
</div>
