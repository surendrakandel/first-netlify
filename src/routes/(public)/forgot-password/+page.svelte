<script lang="ts">
  import { isEmail } from '$src/lib/utils/valid_email';
	import { enhance } from '$app/forms';
  let userData = {
    email: ''
  };
  let errEmail = {
    valid: true,
    message: 'Email address is not valid. Please re-enter email address.'
  };
  let validEmail = false;
  function IsEmail() {
    validEmail = isEmail(userData.email);
    if (!validEmail) {
      errEmail.valid = false;
      return;
    } else {
      errEmail.valid = true;
      return;
    }
  }
</script>

<div class="mx-auto max-w-[400px] py-32">
  <div class="flex flex-col shadow-md w-full bg-primary py-12 px-8 lg:rounded-lg mt-8">
    <div class="flex flex-col items-center">
      <img class="h-12 w-auto" src="/images/logo/white_logo.png" alt="firstshipper company logo" />
    </div>
    <form method="post" action="/forgot-password" use:enhance class="flex flex-col mt-12">
      <label class="label font-semibold" for="email">Forget Password?</label>
      <input
        type="email"
        name="email"
        class="input w-full"
        on:change={IsEmail}
        placeholder="Your Email"
        bind:value={userData.email}
      />
      {#if errEmail.valid == false}
        <div class="text-error">{errEmail.message}</div>
      {/if}
      <div class="mt-1 flex flex-col pt-2">
        <button
          type="submit"
          class="bg-neutral ownBtn my-3 w-full hover:opacity-80"
          >Send Reset Link</button
        >
      </div>
      <div class="flex w-full items-center gap-3 my-6">
        <h3 class="">No account?</h3>
        <a href="/signup" class="inline font-bold underline underline-offset-4">Create one</a>
      </div>
    </form>
  </div>
</div>

<style>
  label,
  a,
  h3 {
    color: white;
  }
</style>
