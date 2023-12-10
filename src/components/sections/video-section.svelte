<script lang="ts">
  import { onMount } from 'svelte';
  let scrollY: number;
  let videoEl: HTMLElement;
  let offsetTop = 0;
  onMount(() => {
    offsetTop = videoEl.offsetTop;
  });
</script>

<!-- Video Section - Start
        ================================================== -->
<section class="video_section" bind:this={videoEl}>
  <div class="parallax" style:transform={`translateY(${(offsetTop - scrollY) * -0.3}px)`}>
    <a class="popup_video ripple" href="http://www.youtube.com/watch?v=0O2aH4XLbto">
      <span class="icon_wrap">
        <svg
          width="23"
          height="27"
          viewBox="0 0 23 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M23 13.5L0 27L1.16089e-06 0L23 13.5Z" fill="#F6F6F6" />
        </svg>
      </span>
    </a>
  </div>
</section>

<!-- Video Section - End
          ================================================== -->
<style>
  .video_section {
    overflow-y: hidden;
  }
  .parallax {
    background-image: url('/images/background/video_poster.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 1077px;
  }
</style>
