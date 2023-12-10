<script lang="ts">
  import PageWrapper from '$src/components/widgets/PageWrapper.svelte';
</script>

<PageWrapper mxAuto={true}>
  <div class="flex flex-col lg:flex-row justify-center py-16 gap-12">
    <div class="flex flex-col gap-5 leading-8 lg:w-[45%] lg:py-16 px-4">
      <h1 class="text-4xl font-bold xl:text-3xl text-black">
        Brining Simplicity & Efficiency to LTL shipping in today's shipping industry.
      </h1>
      <span class="text-2xl font-bold text-[#5CB971]"
        >Sign up to Save upto 90% on shipping Pallets.</span
      >
      <p class="prose leading-6 text-black">
        FirstShipper has partnered with nationwide carriers to bring up the efficiency, fix
        scheduling issues and safety to long haul and short haul shipments by investing in emerging
        technology, so we can help our customer to provider best shipping pallets experience
      </p>
      <div class="max-w-[300px]">
        <a
          href="/signup"
          title="Start buying"
          style="color:#fff;"
          class="btn  m-4 w-full rounded-3xl bg-firstshipper-primary-default py-3 text-center font-bold"
        >
          Get Started
        </a>
      </div>
    </div>
    <div class="flex flex-col lg:w-[55%]">
      <!-- <video autoplay loop muted class="h-full w-full bg-cover object-fill">
        <source src="/video/transport-1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> -->
      <img src="/images/shipments.png" alt="transport" class="h-full w-full bg-cover object-fill" />
    </div>
  </div>
</PageWrapper>
