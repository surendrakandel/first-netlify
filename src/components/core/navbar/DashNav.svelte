<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  //@ts-ignore
  import Whitelogo from '$components/widgets/Whitelogo.svelte';
  import Close from '$src/components/widgets/Close.svelte';
  import Hamburger from '$src/components/widgets/Hamburger.svelte';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import UserButton from 'clerk-sveltekit/client/UserButton.svelte';
  import { fade } from 'svelte/transition';
  let drawer_open = false;
  afterNavigate(() => {
    drawer_open = false;
  });
</script>

<div class="relative">
  <header class="fixed top-0 left-0 z-[10000] w-full bg-primary">
    <nav
      class="relative mx-auto flex h-[60px] w-full max-w-[80rem] items-center justify-between px-2"
    >
      <a href="/admin">
        <Whitelogo />
      </a>
      <button class="p-2 sm:hidden" on:click={() => (drawer_open = !drawer_open)}>
        {#if drawer_open}
          <Close />
        {:else}
          <Hamburger />
        {/if}
      </button>
      {#if drawer_open}
        <div
          class="absolute bg-primary left-0 top-[60px] flex flex-col items-center w-full lg:hidden"
        >
          <ul class="pt-8 bg-neutral w-full flex flex-col" transition:fade>
            <li class="py-2">
              <a href="/admin" class="flex items-center gap-2">
                <span class:activeText={$page.url.pathname == '/admin'} class="font-bold">Home</span
                ></a
              >
            </li>
            <li class="py-2">
              <a href="/admin/quote" class="flex items-center gap-2" data-sveltekit-reload>
                <span class:activeText={$page.url.pathname == '/admin/quote'} class="font-bold"
                  >Quote</span
                ></a
              >
            </li>
            <li class="py-2">
              <a href="/admin/track" class="flex items-center gap-2">
                <span class:activeText={$page.url.pathname == '/admin/track'} class="font-bold"
                  >Track</span
                ></a
              >
            </li>
            <li class="py-2">
              <a href="/admin/settings" class="flex items-center gap-2">
                <span class:active={$page.url.pathname == '/admin/settings'} class="font-bold"
                  >Settings</span
                ></a
              >
            </li>
            <li class="py-2">
              <a href="/admin/documents" class="flex items-center gap-2">
                <span class:activeText={$page.url.pathname == '/admin/documents'} class="font-bold"
                  >Documents</span
                ></a
              >
            </li>
            <li class="py-2">
              <a href="/admin/claims" class="flex items-center gap-2">
                <span class:activeText={$page.url.pathname == '/admin/claims'} class="font-bold"
                  >Claims</span
                ></a
              >
            </li>
            <li class="py-2">
              <a href="/admin/settings" class="flex items-center gap-2">
                <span class:activeText={$page.url.pathname == '/admin/settings'} class="font-bold"
                  >Customer</span
                ></a
              >
            </li>
            <li class="py-2">
              <a href="/admin/feedback" class="flex items-center gap-2">
                <span class:activeText={$page.url.pathname == '/admin/feedback'} class="font-bold"
                  >Feedback</span
                ></a
              >
            </li>
            <li class="py-2">
              <a href="/logout" class="flex items-center gap-2" data-sveltekit-reload>
                <span class:activeText={$page.url.pathname == 'logout'} class="font-bold"
                  >logout</span
                ></a
              >
            </li>
          </ul>
        </div>
      {/if}
    </nav>
  </header>
</div>

<style>
  @keyframes slideInFromRight {
    0% {
      transform: translateX(0px);
      opacity: 0;
    }
    100% {
      transform: translateX(-300px);
      opacity: 1;
    }
  }
  .fixed {
    position: fixed;
  }
  ul {
    min-height: 100vh;
  }
  ul li {
    width: 100% !important;
    display: flex;
    justify-content: center;
    opacity: 0.8;
  }
  ul li a span {
    color: white !important;
    text-align: center;
    font-family: 'bungee' !important;
    width: 100%;
  }
  li:hover {
    background-color: #008080;
  }
  .activeText {
    color: #f4be1c !important;
  }
</style>
