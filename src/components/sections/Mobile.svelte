<script>
  import Email from '$src/components/widgets/Email.svelte';
  import LoginArrow from '$src/components/widgets/LoginArrow.svelte';
</script>

<section
  class="mx-auto max-w-[1300px] flex w-full flex-col items-center md:justify-center gap-4 lg:flex-row bg-gray-50 p-16 my-12"
>
  <div class="w-full flex flex-col items-center md:items-start lg:col-span-7 lg:w-1/2 lg:mr-2">
    <h1
      class="mb-8 max-w-2xl text-2xl font-extrabold leading-none tracking-tight text-black md:text-3xl"
    >
      Ship with ease from your phone
    </h1>
    <div class="flex flex-col items-center justify-center gap-3 lg:flex-row w-full mobileLinks">
      <a
        href="/signup"
        class="bg-neutral flex w-full max-w-[400px] px-8 py-3 rounded-lg lg:w-1/2 hover:opacity-90 hover:border-gray-600"
      >
        <span>Get started</span>
        <svg width="25px" height="25px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="white"
            d="M9.76076555,0 C15.4157386,0 20,4.4771525 20,10 C20,15.5228475 15.4157386,20 9.76076555,20 C6.56885647,20 3.61836948,18.5634688 1.68988581,16.1544725 C1.46202241,15.8698333 1.51356853,15.4586837 1.80501731,15.2361442 C2.09646608,15.0136047 2.51745178,15.0639465 2.74531518,15.3485857 C4.4225344,17.443711 6.98554674,18.6915888 9.76076555,18.6915888 C14.6758356,18.6915888 18.6602871,14.8002319 18.6602871,10 C18.6602871,5.19976806 14.6758356,1.30841121 9.76076555,1.30841121 C7.02601512,1.30841121 4.49642844,2.51988396 2.81675903,4.5633425 C2.58516542,4.84509553 2.16355149,4.89014431 1.87505796,4.66396176 C1.58656443,4.43777922 1.54043793,4.02601608 1.77203154,3.74426305 C3.70333647,1.39466883 6.61544133,0 9.76076555,0 Z M10.3053281,6.86239745 L13.0119569,9.56902627 C13.2735521,9.83062149 13.2785069,10.2497964 13.0230237,10.5052795 L10.3796339,13.1486694 C10.1241507,13.4041526 9.70497582,13.3991978 9.4433806,13.1376026 C9.18178539,12.8760073 9.1768306,12.4568325 9.43231378,12.2013493 L10.98,10.6534046 L0.669856459,10.6542056 C0.299904952,10.6542056 7.72715225e-14,10.3613078 7.72715225e-14,10 C7.72715225e-14,9.63869222 0.299904952,9.34579439 0.669856459,9.34579439 L10.938,9.34540456 L9.38014161,7.78758389 C9.11854639,7.52598867 9.11359161,7.1068138 9.36907479,6.85133062 C9.62455797,6.59584744 10.0437328,6.60080223 10.3053281,6.86239745 Z"
          />
        </svg>
      </a>
      <a
        href="/contact"
        class="bg-primary flex w-full max-w-[400px] px-8 py-3 rounded-lg lg:w-1/2 hover:opacity-90 hover:border-gray-600"
      >
        <span>Speak to Us</span>
        <svg
          width="25px"
          height="25px"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          ><path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1 3.5l.5-.5h13l.5.5v9l-.5.5h-13l-.5-.5v-9zm1 1.035V12h12V4.536L8.31 8.9H7.7L2 4.535zM13.03 4H2.97L8 7.869 13.03 4z"
          /></svg
        >
      </a>
    </div>
  </div>
  <div class="mt-8 w-full lg:col-span-5 lg:mt-0 lg:flex lg:w-1/2">
    <img src="/images/shipping_app_image.webp" alt="mockup" width="100%" height="100%" />
  </div>
</section>

<style>
  .mobileLinks a {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    position: relative;
    width: 100%;
    gap: 10px;
  }
</style>
