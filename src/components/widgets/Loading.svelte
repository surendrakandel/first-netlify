<script lang="ts">
  import { Circle3 } from 'svelte-loading-spinners';
  import { onMount } from 'svelte';
  // let controlsLayout = [
  //     'previousFrame',
  //     'playpause',
  //     'stop',
  //     'nextFrame',
  //     'progress',
  //     'frame',
  //     'loop',
  //     'spacer',
  //     'background',
  //     'snapshot',
  //     'zoom',
  //     'info',
  // ];
  export let loadingText = 'Loading';
  let LottiePlayer: any;
  $: loaded = false;
  async function LoadLottie() {
    // @ts-ignore
    const module = await import('@lottiefiles/svelte-lottie-player');
    LottiePlayer = module.LottiePlayer;
    loaded = true;
  }
  onMount(async () => {
    LoadLottie();
  });
</script>

{#if loaded}
  <!-- <div class="flex flex-col w-full h-full items-center justify-center">
    <LottiePlayer
    src="/loading.json"
    autoplay="{true}"
    loop="{true}"
    controls="{false}"
    renderer="svg"
    background="transparent"
    height="{200}"
    width="{200}"
    />
    <div class="flex flex-col items-center justify-center">
        <Circle3 size="60"unit="px"duration="1s"/>
        <h3 class="mt-3 sm: text-center">{loadingText}</h3>
    </div>
</div> -->
  <div class="flex h-full w-full flex-col items-center justify-center">
    <svelte:component
      this={LottiePlayer}
      src="/loading.json"
      autoplay={true}
      loop={true}
      controls={false}
      renderer="svg"
      background="transparent"
      height={200}
      width={200}
    />
    <div class="flex flex-col items-center justify-center">
      <Circle3 size="60" unit="px" duration="1s" />
      <h3 class="sm: mt-3 text-center">{loadingText}</h3>
    </div>
  </div>
{/if}
