<script lang="ts">
  $: showConsent = true;
  function toggleConsent() {}
</script>

{#if showConsent}
  <div class="cookie-consent-area">
    <div
      class="cookie-consent-banner flex flex-col gap-3"
      role="alertdialog"
      aria-describedby="cookie-consent"
    >
      <h3 id="cookie-consent-title pb-4">Cookie consent</h3>
      <p class="pb-4 leading-6">
        We use our own and third-party cookies to show you more relevant content based on your
        browsing and navigation history. Please accept or manage your cookie settings below. Here's
        our
        <!-- -->&nbsp;<a
          href="https://admin.typeform.com/to/dwk6gt/"
          target="_blank"
          rel="noopener noreferrer">cookie policy</a
        >
      </p>
      <div class="cookie-buttons flex justify-end gap-2">
        <button class="cookie-settings-link rounded-sm px-3 py-2" on:click={toggleConsent}
          >Decline</button
        >
        <button class="cookie-accept-btn rounded-sm bg-green-200 px-3 py-2" on:click={toggleConsent}
          >Accept all cookies</button
        >
      </div>
    </div>
  </div>
{/if}

<style>
  .cookie-consent-banner {
    position: fixed;
    bottom: 20px;
    left: 20px;
    padding: 32px;
    background: #ffffff;
    color: #131313;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(19, 19, 19, 0.08), 0 2px 5px 0.5px rgba(19, 19, 19, 0.12);
    width: 375px;
    max-width: calc(100% - 40px);
    max-height: 90%;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-font-smoothing: auto;
  }
</style>
