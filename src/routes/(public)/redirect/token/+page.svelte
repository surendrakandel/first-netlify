<script lang="ts">
  import Loading from '$src/components/widgets/Loading.svelte';
  import { onMount } from 'svelte';
  let loading = true;
  onMount(async () => {
    loading = false;
  });
</script>

<div class="flex min-h-[700px] flex-col items-center justify-center pb-12">
  {#if loading}
    <Loading loadingText="logging in" />
  {/if}
</div>
