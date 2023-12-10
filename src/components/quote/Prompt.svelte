<script lang="ts">
  import { togglePickupPrompt } from '$src/routes/(admin)/admin/quote/quote_utils';
</script>

<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <!--
      Background backdrop, show/hide based on modal state.
  
      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
  <div class="fixed inset-0 0 bg-opacity-75 transition-opacity" />

  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <!--
          Modal panel, show/hide based on modal state.
  
          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        -->
      <div
        class="relative transform overflow-hidden rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
      >
        <div>
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <!-- Heroicon name: outline/check -->
            <svg
              class="h-6 w-6 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-5">
            <h3 class="leading-6" id="modal-title">Pickup Confirmation</h3>
            <div class="mt-2">
              <p class="">
                Pickup after 4pm is not guaranteed. However, We will try best to pickup today.
              </p>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-6">
          <button
            type="button"
            class="sm: inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-xl font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            style="background-color: rgb(79 70 229 / var(--tw-bg-opacity))"
            on:click={togglePickupPrompt}>ok</button
          >
        </div>
      </div>
    </div>
  </div>
</div>
