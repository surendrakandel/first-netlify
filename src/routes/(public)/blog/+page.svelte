<script lang="ts">
  import PageWrapper from '$src/components/widgets/PageWrapper.svelte';

  let blogs = [
    {
      date: '1 Nov 2021',
      heading: 'What is LTL shipping?',
      image: '/images/blog/what-is-ltl-shipping.jpg',
      subheading:
        "LTL freight is a cost-effective way to ship pallets. LTL refers to “less than truckload” freight, which means that you'll be shipping pallets in a trailer with other items.",
      content: 'Read More'
    }
  ];
  let firstTwo = blogs.length > 2 ? [blogs[0], blogs[1]] : blogs;
</script>

<PageWrapper mxAuto={true}>
  <div role="main" class="flex flex-col items-center justify-center">
    <h1 class="text-center text-4xl font-semibold leading-9 py-6" style="color:black">This Week Blogs</h1>
    <p style="color:black"
      class="mt-4 w-11/12 text-center text-base leading-normal  md:w-10/12 lg:w-1/2"
    >
      We are here to help you with your shipping needs. We have a team of experts who are ready to
      work on best shipping planning and execution for your business.
    </p>
  </div>
  <div class="container mx-auto px-8 py-12 lg:py-8 xl:px-5">
    <div class="grid gap-10 md:grid-cols-2 lg:gap-10">
      {#each firstTwo as blog, index}
        <div class="group cursor-pointer">
          <div
            class="relative aspect-square w-full overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:"
          >
            <a href="/blog/what-is-ltl-shipment"
              ><span
                style="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; inset: 0px;"
                ><img
                  alt="moving container yard"
                  src={blog.image}
                  width="100%"
                  height="100%"
                  style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover;"
                /><noscript /></span
              ></a
            >
          </div>
          <div>
            <div class="flex gap-3">
              <a href="/blog"
                ><span class="mt-5 inline-block font-medium uppercase tracking-wider text-blue-600"
                  >Shipping</span
                ></a
              ><a href="/blog"
                ><span
                  class="mt-5 inline-block font-medium uppercase tracking-wider text-purple-600"
                  >Transportation</span
                ></a
              >
            </div>
            <h2 class="mt-2 font-semibold leading-snug tracking-tight dark:text-white">
              <a href="/blog/what-is-ltl-shipment"
                ><span
                  class="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900"
                >
                  {blog.heading}</span
                ></a
              >
            </h2>
            <div class="py-2">
              <p class="line-clamp-3 mt-2">{blog.subheading}</p>
              <a
                href="/blog/what-is-ltl-shipment"
                class="pt-3 text-blue-500"
                title="what is LTL Shipment">Read more</a
              >
            </div>
            <div class="mt-3 flex items-center space-x-3 dark:">
              <div class="flex items-center gap-3">
                <div class="relative h-5 w-5 flex-shrink-0">
                  <span
                    style="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; inset: 0px;"
                    ><img
                      alt="Mario Sanchez"
                      src="https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=3840&amp;q=75&amp;fit=clip&amp;auto=format"
                      decoding="async"
                      data-nimg="fill"
                      class="rounded-full"
                      sizes="30px"
                      srcset="https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=16&amp;q=75&amp;fit=clip&amp;auto=format 16w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=32&amp;q=75&amp;fit=clip&amp;auto=format 32w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=48&amp;q=75&amp;fit=clip&amp;auto=format 48w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=64&amp;q=75&amp;fit=clip&amp;auto=format 64w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=96&amp;q=75&amp;fit=clip&amp;auto=format 96w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=128&amp;q=75&amp;fit=clip&amp;auto=format 128w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=256&amp;q=75&amp;fit=clip&amp;auto=format 256w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=384&amp;q=75&amp;fit=clip&amp;auto=format 384w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=640&amp;q=75&amp;fit=clip&amp;auto=format 640w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=750&amp;q=75&amp;fit=clip&amp;auto=format 750w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=828&amp;q=75&amp;fit=clip&amp;auto=format 828w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=1080&amp;q=75&amp;fit=clip&amp;auto=format 1080w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=1200&amp;q=75&amp;fit=clip&amp;auto=format 1200w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=1920&amp;q=75&amp;fit=clip&amp;auto=format 1920w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=2048&amp;q=75&amp;fit=clip&amp;auto=format 2048w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=3840&amp;q=75&amp;fit=clip&amp;auto=format 3840w"
                      style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover;"
                    /><noscript /></span
                  >
                </div>
                <span class="">First Shipper Team</span>
              </div>
              <span class=" dark:">•</span><time class="" datetime="2022-10-21T06:05:00.000Z"
                >Nov 1, 2022</time
              >
            </div>
          </div>
        </div>
      {/each}
    </div>
    <div class="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
      {#each blogs.slice(2, blogs.length - 1) as blog, index}
        <div class="group cursor-pointer">
          <div
            class="relative aspect-square overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:"
          >
            <a href="/post/14-architectural-design-ideas-for-spacious-interior"
              ><span
                style="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; inset: 0px;"
                ><img
                  alt="Thumbnail"
                  src="https://cdn.sanity.io/images/cijrdavx/production/12301f301772ed723724302aef7c70c5c1c0151f-4500x8000.jpg?rect=0,1080,4500,5330&amp;w=3840&amp;q=75&amp;fit=clip&amp;auto=format"
                  decoding="async"
                  data-nimg="fill"
                  class="transition-all"
                  sizes="80vw"
                  srcset="https://cdn.sanity.io/images/cijrdavx/production/12301f301772ed723724302aef7c70c5c1c0151f-4500x8000.jpg?rect=0,1080,4500,5330&amp;w=640&amp;q=75&amp;fit=clip&amp;auto=format 640w, https://cdn.sanity.io/images/cijrdavx/production/12301f301772ed723724302aef7c70c5c1c0151f-4500x8000.jpg?rect=0,1080,4500,5330&amp;w=750&amp;q=75&amp;fit=clip&amp;auto=format 750w, https://cdn.sanity.io/images/cijrdavx/production/12301f301772ed723724302aef7c70c5c1c0151f-4500x8000.jpg?rect=0,1080,4500,5330&amp;w=828&amp;q=75&amp;fit=clip&amp;auto=format 828w, https://cdn.sanity.io/images/cijrdavx/production/12301f301772ed723724302aef7c70c5c1c0151f-4500x8000.jpg?rect=0,1080,4500,5330&amp;w=1080&amp;q=75&amp;fit=clip&amp;auto=format 1080w, https://cdn.sanity.io/images/cijrdavx/production/12301f301772ed723724302aef7c70c5c1c0151f-4500x8000.jpg?rect=0,1080,4500,5330&amp;w=1200&amp;q=75&amp;fit=clip&amp;auto=format 1200w, https://cdn.sanity.io/images/cijrdavx/production/12301f301772ed723724302aef7c70c5c1c0151f-4500x8000.jpg?rect=0,1080,4500,5330&amp;w=1920&amp;q=75&amp;fit=clip&amp;auto=format 1920w, https://cdn.sanity.io/images/cijrdavx/production/12301f301772ed723724302aef7c70c5c1c0151f-4500x8000.jpg?rect=0,1080,4500,5330&amp;w=2048&amp;q=75&amp;fit=clip&amp;auto=format 2048w, https://cdn.sanity.io/images/cijrdavx/production/12301f301772ed723724302aef7c70c5c1c0151f-4500x8000.jpg?rect=0,1080,4500,5330&amp;w=3840&amp;q=75&amp;fit=clip&amp;auto=format 3840w"
                  style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover;"
                /><noscript /></span
              ></a
            >
          </div>
          <div class="">
            <div>
              <div class="flex gap-3">
                <a href="/category/design"
                  ><span
                    class="mt-5 inline-block font-medium uppercase tracking-wider text-blue-600"
                    >Shipping</span
                  ></a
                ><a href="/category/lifestyle"
                  ><span
                    class="mt-5 inline-block font-medium uppercase tracking-wider text-purple-600"
                    >Transportation</span
                  ></a
                >
              </div>
              <h2 class="mt-2 font-semibold leading-snug tracking-tight dark:text-white">
                <a href="/post/14-architectural-design-ideas-for-spacious-interior"
                  ><span
                    class="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900"
                    >14
                    {blog.heading}</span
                  ></a
                >
              </h2>
              <div class="hidden">
                <p class="line-clamp-3 mt-2 dark:">
                  <a href="/post/14-architectural-design-ideas-for-spacious-interior">
                    {blog.subheading}
                  </a>
                </p>
              </div>
              <div class="mt-3 flex items-center space-x-3 dark:">
                <div class="flex items-center gap-3">
                  <div class="relative h-5 w-5 flex-shrink-0">
                    <span
                      style="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; inset: 0px;"
                      ><img
                        alt="Mario Sanchez"
                        src="https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=3840&amp;q=75&amp;fit=clip&amp;auto=format"
                        decoding="async"
                        data-nimg="fill"
                        class="rounded-full"
                        sizes="30px"
                        srcset="https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=16&amp;q=75&amp;fit=clip&amp;auto=format 16w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=32&amp;q=75&amp;fit=clip&amp;auto=format 32w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=48&amp;q=75&amp;fit=clip&amp;auto=format 48w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=64&amp;q=75&amp;fit=clip&amp;auto=format 64w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=96&amp;q=75&amp;fit=clip&amp;auto=format 96w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=128&amp;q=75&amp;fit=clip&amp;auto=format 128w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=256&amp;q=75&amp;fit=clip&amp;auto=format 256w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=384&amp;q=75&amp;fit=clip&amp;auto=format 384w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=640&amp;q=75&amp;fit=clip&amp;auto=format 640w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=750&amp;q=75&amp;fit=clip&amp;auto=format 750w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=828&amp;q=75&amp;fit=clip&amp;auto=format 828w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=1080&amp;q=75&amp;fit=clip&amp;auto=format 1080w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=1200&amp;q=75&amp;fit=clip&amp;auto=format 1200w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=1920&amp;q=75&amp;fit=clip&amp;auto=format 1920w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=2048&amp;q=75&amp;fit=clip&amp;auto=format 2048w, https://cdn.sanity.io/images/cijrdavx/production/4a21e3f085ed310d00fbbd294eb2392cde7f9acc-3648x3648.jpg?w=3840&amp;q=75&amp;fit=clip&amp;auto=format 3840w"
                        style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover;"
                      /><noscript /></span
                    >
                  </div>
                  <span class="">FirstShipper Team</span>
                </div>
                <span class=" dark:">•</span><time class="" datetime="2022-10-21T06:05:00.000Z"
                  >October 20, 2022</time
                >
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</PageWrapper>
