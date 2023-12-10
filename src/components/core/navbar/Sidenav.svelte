<script lang="ts">
  import { page } from '$app/stores';
  import Claims from '$components/widgets/icons/claims.svelte';
  import Dashboard from '$components/widgets/icons/dashboard.svelte';
  import Documents from '$components/widgets/icons/documents.svelte';
  import Feedback from '$components/widgets/icons/Feedback.svelte';
  import Quote from '$components/widgets/icons/quote.svelte';
  import Setting from '$components/widgets/icons/setting.svelte';
  import Track from '$components/widgets/icons/track.svelte';
  import Logout from '$src/components/widgets/icons/logout.svelte';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import UserButton from 'clerk-sveltekit/client/UserButton.svelte';
</script>

<nav class="fixed top-[60px] left-0 hidden lg:flex">
  <ul class="flex h-[100vh] w-[160px] flex-col bg-neutral pt-8 justify-start">
    <li class="py-2">
      <a href="/admin" class="flex flex-col items-center">
        <div class="h-8 w-8">
          <Dashboard />
        </div>
        <span class:activeText={$page.url.pathname == '/admin'}>Home</span>
      </a>
    </li>
    <li class="py-2">
      <a href="/admin/quote" class="flex h-full flex-col items-center">
        <div class="h-8 w-8">
          <Quote />
        </div>
        <span class:activeText={$page.url.pathname.includes('quote')} class="py-1 font-bold"
          >New Quote</span
        >
      </a>
    </li>
    <li class="py-2">
      <a href="/admin/track" class="flex h-full flex-col items-center">
        <div class="h-8 w-8">
          <Track />
        </div>
        <span class="" class:activeText={$page.url.pathname.includes('track')}>Track</span>
      </a>
    </li>
    <li class="py-2">
      <a href="/admin/documents" class="flex h-full flex-col items-center">
        <div class="h-8 w-8">
          <Documents />
        </div>
        <span class:activeText={$page.url.pathname.includes('documents')}>Documents</span>
      </a>
    </li>
    <li class="py-2">
      <a href="/admin/claims" class="flex h-full flex-col items-center">
        <div class="h-8 w-8">
          <Claims />
        </div>
        <span class:activeText={$page.url.pathname.includes('claims')}>Claims</span>
      </a>
    </li>
    <li class="py-2">
      <a href="/admin/feedback" class="flex h-full flex-col items-center">
        <div class="h-8 w-8">
          <Feedback />
        </div>
        <span class:activeText={$page.url.pathname.includes('feedback')}>Feedback</span>
      </a>
    </li>
    <li class="py-2">
      <a href="/admin/settings" class="flex h-full flex-col items-center">
        <div class="h-8 w-8">
          <Setting />
        </div>
        <span class:activeText={$page.url.pathname.includes('settings')}>Settings</span>
      </a>
    </li>
    <li class="py-2">
      <a href="/logout" class="flex h-full flex-col items-center">
        <div class="h-8 w-8">
          <Logout />
        </div>
        <span class:activeText={$page.url.pathname.includes('logout')}>Log Out</span>
      </a>
    </li>
  </ul>
</nav>

<style>
  a span {
    font-size: 12px;
    font-family: bungee !important;
    font-weight: bold;
    color: white !important;
  }
  ul {
    position: fixed;
    top: '70px';
    left: 0;
  }
  li a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    height: 55px;
    width: 100%;
    color: white;
  }
  .activeText {
    color: #f4be1c !important;
  }
</style>
