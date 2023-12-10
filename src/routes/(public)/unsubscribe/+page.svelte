<script lang="ts">
  import { goto } from '$app/navigation';
  import { isEmail } from '$src/lib/utils/valid_email.js';
  type banner_data = {
    email: string;
  };
  let data: banner_data = {
    email: ''
  };
  async function Unsuscribe() {
    if (isEmail(data.email)) {
      alert(
        'Thank you. Hope to see you again. You have been unsubscribed from future email communication'
      );
      return await goto('/');
    }
  }
</script>

<div class="mainContainer h-[120vh] lg:h-[calc(100vh-60px)]">
  <div
    class="pageWrapper mx-auto flex h-full w-full flex-col justify-around gap-4 lg:flex-row lg:justify-center"
  >
    <div class="flex w-full flex-col justify-center px-8 pt-16 lg:h-full lg:w-1/2">
      <h1 class="py-12 text-left text-5xl">Sorry to See you Go.</h1>
      <div class="flex flex-col items-center justify-center gap-3 pt-8 lg:flex-row">
        <div class="flex w-[100%] flex-col items-center justify-center py-2">
          <label for="email" class="self-start py-3"
            >Plese enter email address to unsubscribe from future email.</label
          >
          <input
            type="email"
            id="email"
            class="min-w-[100%] placeholder:"
            placeholder="email address"
            bind:value={data.email}
          />
        </div>
      </div>
      <button
        on:click={Unsuscribe}
        id="get_quote"
        class="btn-primary mt-10 mb-4 flex w-[100%] flex-col items-center justify-center rounded-md p-[16px] font-semibold"
        style="background-color: #5CB971;">UNSUSCRIBE</button
      >
    </div>
    <div class="sidePallet flex w-full flex-col justify-center py-4 px-8 lg:h-full lg:w-1/2">
      <!-- <img src=""alt="pallet"/> -->
    </div>
  </div>
</div>

<style>
  div {
    font-family: 'Goldman', 'courier';
  }
  button {
    font-family: 'Space Grotesk';
    color: #fff;
  }
  .sidePallet {
    background-image: url('/images/banner/banner_img.png'); /* The image used */
    height: 100%; /* You must set a specified height */
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: contain; /* Resize the background image to cover the entire container */
  }
  .mainContainer {
    background-image: linear-gradient(260.3deg, #1b2752 -7.47%, #111126 134.71%);
  }
</style>
