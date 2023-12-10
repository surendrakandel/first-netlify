<script lang="ts">
  import Feedback from '$components/widgets/icons/Feedback.svelte';
</script>

<div class="mx-auto max-w-[700px] my-16 sm:py-24">
  <div class="flex flex-col shadow-md w-full px-4 bg-primary py-12 md:px-16 mt-8">
    <div class="flex gap-3 items-center">
      <div class="h-12 w-12">
        <Feedback />
      </div>
      <h3 class="pt-2 font-bold">FeedBack</h3>
    </div>
    <h3 class="mt-3 font-mono font-semibold">Got a Feedback, or just want to say hello?</h3>
    <p class="mt-2">Please write to us.</p>

    <form class="flex flex-col gap-3">
      <div class="flex flex-col sm:flex-row">
        <div class="w-full sm:mr-3 sm:w-1/2">
          <label class="pb-3" for="name">Your Name</label>
          <input type="text" id="name" placeholder="What should We call you?" class="w-full p-3" />
        </div>
        <div class="w-full pt-8 sm:ml-3 sm:w-1/2 sm:pt-0">
          <label class="pb-3" for="email">Email Address</label>
          <input type="email" id="email" placeholder="Drop that email here…" class="w-full p-3" />
        </div>
      </div>
      <div class="w-full pt-8 sm:pt-10">
        <label class="pb-3" for="message">Comments</label>
        <textarea
          id="message"
          placeholder="Tell us how can we improve?"
          class="h-[200px] w-full p-3 bg-white"
        />
      </div>
      <button class="bg-neutral ownBtn mt-4 w-full" style="color:#fff;"> Send FeedBack </button>
    </form>
  </div>
</div>
