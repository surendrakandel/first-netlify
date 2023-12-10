<script lang="ts">
  $: showQuickStart = false;
  const toggleQuickStart = () => {
    console.log('show quick start', showQuickStart);
    showQuickStart = !showQuickStart;
  };
</script>

<nav class="fixed top-[100px] hidden w-[400px] lg:flex lg:flex-col">
  <ul>
    <li class="relative mt-6 md:mt-0">
      <h2 class="font-semibold text-zinc-900 dark:text-white">Guides</h2>
      <div class="relative mt-3 pl-2">
        <div
          class="bg-zinc-800/2.5 dark:/2.5 absolute inset-x-0 top-0 will-change-transform"
          style="height: 96px; top: 0px; opacity: 1; border-radius: 8px; transform: none; transform-origin: 50% 50% 0px;"
        />
        <div
          class="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:/5"
          style="transform: none; transform-origin: 50% 50% 0px;"
        />
        <div
          class="absolute left-2 h-6 w-px bg-emerald-500"
          style="top: 4px; opacity: 1; transform: none; transform-origin: 50% 50% 0px;"
        />
        <ul class="border-l border-transparent">
          <li class="relative" id="introduction">
            <a
              class="flex justify-between gap-2 py-1 pr-3 pl-4 text-zinc-900 transition dark:text-white"
              href="guides/#introduction"
              aria-current="page"><span class="truncate">Introduction</span></a
            >
            <ul data-projection-id="22" style="opacity: 1;">
              <li>
                <a
                  class="flex justify-between gap-2 py-1 pr-3 pl-7 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  href="/#guides/#guides"><span class="truncate">Guides</span></a
                >
              </li>
              <li>
                <a
                  class="flex justify-between gap-2 py-1 pr-3 pl-7 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  href="/#guides/#resources"><span class="truncate">Resources</span></a
                >
              </li>
            </ul>
          </li>
          <li class="relative transition" style="transform: none; transform-origin: 50% 50% 0px;">
            <button on:click={toggleQuickStart}>
              <a
                class="flex justify-between gap-2 py-1 pr-3 pl-4 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                href="/#guides/#quickstart"><span class="truncate">Quickstart</span></a
              >
            </button>
            {#if showQuickStart}
              <div class="flex w-full flex-col pl-7 transition">
                <a
                  class="text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400"
                  href="/#guides/#">Choose your client</a
                >
                <a
                  class="text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400"
                  href="/#guides/#">Making your first api req</a
                >
                <a
                  class="text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400"
                  href="/#guides/#">what's next?</a
                >
              </div>
            {/if}
          </li>
          <li class="relative" style="transform: none; transform-origin: 50% 50% 0px;">
            <a
              class="flex justify-between gap-2 py-1 pr-3 pl-4 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              href="/#guides/#sdks"><span class="truncate">SDKs</span></a
            >
          </li>
          <li class="relative" style="transform: none; transform-origin: 50% 50% 0px;">
            <a
              class="flex justify-between gap-2 py-1 pr-3 pl-4 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              href="/#guides/#authentication"><span class="truncate">Authentication</span></a
            >
          </li>
          <li class="relative" style="transform: none; transform-origin: 50% 50% 0px;">
            <a
              class="flex justify-between gap-2 py-1 pr-3 pl-4 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              href="/#guides/#pagination"><span class="truncate">Pagination</span></a
            >
          </li>
          <li class="relative" style="transform: none; transform-origin: 50% 50% 0px;">
            <a
              class="flex justify-between gap-2 py-1 pr-3 pl-4 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              href="/#guides/#errors"><span class="truncate">Errors</span></a
            >
          </li>
          <li class="relative" style="transform: none; transform-origin: 50% 50% 0px;">
            <a
              class="flex justify-between gap-2 py-1 pr-3 pl-4 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              href="/#guides/#webhooks"><span class="truncate">Webhooks</span></a
            >
          </li>
        </ul>
      </div>
    </li>
    <li class="relative mt-6">
      <h2
        class="font-semibold text-zinc-900 dark:text-white"
        style="transform: none; transform-origin: 50% 50% 0px;"
      >
        Resources
      </h2>
      <div class="relative mt-3 pl-2">
        <div
          class="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:/5"
          style="transform: none; transform-origin: 50% 50% 0px;"
        />
        <ul class="border-l border-transparent">
          <li class="relative" style="transform: none; transform-origin: 50% 50% 0px;">
            <a
              class="flex justify-between gap-2 py-1 pr-3 pl-4 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              href="/#contacts"><span class="truncate">Contacts</span></a
            >
          </li>
          <li class="relative" style="transform: none; transform-origin: 50% 50% 0px;">
            <a
              class="flex justify-between gap-2 py-1 pr-3 pl-4 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              href="/#conversations"><span class="truncate">Conversations</span></a
            >
          </li>
          <li class="relative" style="transform: none; transform-origin: 50% 50% 0px;">
            <a
              class="flex justify-between gap-2 py-1 pr-3 pl-4 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              href="/#messages"><span class="truncate">Messages</span></a
            >
          </li>
          <li class="relative" style="transform: none; transform-origin: 50% 50% 0px;">
            <a
              class="flex justify-between gap-2 py-1 pr-3 pl-4 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              href="/#groups"><span class="truncate">Groups</span></a
            >
          </li>
          <li class="relative" style="transform: none; transform-origin: 50% 50% 0px;">
            <a
              class="flex justify-between gap-2 py-1 pr-3 pl-4 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              href="/#attachments"><span class="truncate">Attachments</span></a
            >
          </li>
        </ul>
      </div>
    </li>
    <li class="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
      <a
        class="inline-flex w-full justify-center gap-0.5 overflow-hidden rounded-full bg-zinc-900 py-1 px-3 font-medium transition hover:bg-zinc-700 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-400"
        href="/##">Sign in</a
      >
    </li>
  </ul>
</nav>

<style>
  .transition {
    transition-property: color, background-color, border-color, fill, stroke, opacity, box-shadow,
      transform, filter, -webkit-text-decoration-color, -webkit-backdrop-filter;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke,
      opacity, box-shadow, transform, filter, backdrop-filter;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke,
      opacity, box-shadow, transform, filter, backdrop-filter, -webkit-text-decoration-color,
      -webkit-backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.15s;
  }
</style>
