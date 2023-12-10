<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import Close from '$src/components/widgets/Close.svelte';
  import Hamburger from '$src/components/widgets/Hamburger.svelte';
  import LoginArrow from '$src/components/widgets/LoginArrow.svelte';
  import Whitelogo from '$src/components/widgets/Whitelogo.svelte';
  import { fade, fly } from 'svelte/transition';
  type nav_link = {
    href: string;
    title: string;
    text: string;
  };
  let nav_items: nav_link[] = [
    {
      href: '/login',
      text: 'Log in',
      title: 'login to first shipper to get shipping quote'
    },
    {
      href: '/track',
      text: 'Track A Shipment',
      title: 'track your shipments here'
    },
    {
      href: '/admin/quote',
      text: 'Get New Quote',
      title: 'get shipping quote'
    },
    {
      href: '/contact',
      text: 'Contact Us',
      title: 'contact us'
    },
    {
      href: '/freight-glossary',
      text: 'Freight glossary',
      title: 'Freight glossary'
    },
    {
      href: '/calculate-freight-class',
      text: 'Calculate Freight Class',
      title: 'Calculate Freight Class'
    },
    {
      href: '/guides',
      text: 'Developers',
      title: 'developers'
    }
  ];
  let drawer_open = false;
  afterNavigate(() => {
    drawer_open = false;
  });
</script>

<div class="relative">
  <header class="z-[10000] bg-neutral relative">
    <div
      class="main-nav z-[10000] mx-auto flex h-[70px] w-full max-w-[80rem] items-center justify-between rounded-lg p-2"
      in:fly={{ y: -20, duration: 1000 }}
    >
      <a href="/" class="flex items-center">
        <Whitelogo />
      </a>
      <ul class="hidden w-[500px] items-center justify-around lg:flex flex-row">
        <li class="">
          <a href="/track" class="font-bold">Track Shipment</a>
        </li>
        <li class="">
          <a href="/admin/quote">New Quote</a>
        </li>
        <li class="">
          <a href="/contact">Contact</a>
        </li>
        <li class="">
          <a href="/guides">Developers</a>
        </li>
      </ul>
      <button class="p-2 lg:hidden" on:click={() => (drawer_open = !drawer_open)}>
        {#if drawer_open}
          <Close />
        {:else}
          <Hamburger />
        {/if}
      </button>
      <div class="hidden lg:block">
        <a
          href="/login"
          style="border-radius:0;min-width:175px;margin-right:-1px;"
          class="bg-primary ownBtn login font-mono font-semibold flex justify-center items-center"
        >
          Login
          <LoginArrow />
        </a>
      </div>
      {#if drawer_open}
        <div
          class="absolute bg-primary left-0 top-[60px] flex items-center justify-center lg:hidden"
          transition:fade
        >
          <nav
            class="drawerNav top-[60px] right-0 flex flex-col gap-2 rounded-sm px-4 py-6 h-[100vh] min-w-[100vw] z-10000"
          >
            {#each nav_items as nav, index}
              <a
                href={nav.href}
                title={nav.title}
                class="flex w-full items-center justify-center py-2 hover:bg-neutral font-bungee"
                class:mt-3={index == 0}
              >
                {nav.text}
              </a>
            {/each}
          </nav>
        </div>
      {/if}
    </div>
  </header>
</div>

<style lang="css">
  a {
    min-width: 150px;
    padding: 10px 10px;
    color: white;
    --tw-text-opacity: 1;
  }
  header {
    z-index: 1000;
    transition: background-image 2s ease-in-out;
    font-weight: 400;
    width: 100% !important;
    position: fixed;
    top: 0;
    left: 0;
  }
  li a {
    font-family: 'bungee';
  }
</style>
