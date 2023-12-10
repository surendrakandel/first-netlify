<!-- <script lang="ts">
	import { enhance } from '$app/forms';
	import Loading from '$components/widgets/Loading.svelte';
	import { isEmail } from '$src/lib/utils/valid_email.js';
	import { isValidPassword } from '$src/lib/utils/valid_password.js';
	import type { LoginUser } from '$src/types/user.js';
	let form;
	$: loading = false;
	let dataValidation = {
		validEmail: true,
		validPassword: true
	};
	let loginData: LoginUser = {
		email: '',
		password: ''
	};
</script>




{#if loading}
  <div class="flex min-h-screen">
    <Loading loadingText="Logging In" />
  </div>
{:else}
  <div class="mx-auto max-w-[425px] sm:mt-20 py-16">
    <div class="flex flex-col shadow-md w-full bg-primary py-12 px-8 lg:rounded-lg mt-8">
      <div class="flex flex-col items-center justify-center">
        <img
          class="h-12 w-auto"
          src="/images/logo/white_logo.png"
          alt="firstshipper company logo"
        />
        <h2 class="mt-6 font-semibold tracking-tight">Sign in to your account</h2>
      </div>
      <form 
	 	use:enhance
      use:enhance
      action="?/login"
    	method="POST"
        class="space-y-4 flex flex-col"
	  >
        <div class="flex w-full flex-col gap-2 rounded-md pt-10 pb-3">
          <div class="flex w-full flex-col">
            <label for="email-address" class="py-1">Email</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="username"
              required
              class="input w-full p-2"
              placeholder="Email address"
              bind:value={loginData.email}
              on:change={() => {
                if (isEmail(loginData.email)) {
                  dataValidation.validEmail = true;
                }
              }}
            />
            {#if dataValidation.validEmail == false}
              <h3 class="text-error">Email is not Valid</h3>
            {/if}
          </div>
          <div class="flex w-full flex-col">
            <label for="password" class="py-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="input p-2"
              placeholder="Password"
              bind:value={loginData.password}
              on:change={() => {
                if (isValidPassword(loginData.password)) {
                  dataValidation.validPassword = true;
                }
              }}
            />
            {#if dataValidation.validPassword == false}
              <h3 class="text-error">Password is not Valid</h3>
            {/if}
          </div>
        </div>
        <button type="submit" class="bg-neutral ownBtn w-full text-center">
          <span class="flex items-center">
            <svg
              class="mr-5 h-4 w-4 group-hover:text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="#fff"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <span class="">Sign in</span>
        </button>
        <div class="py-4 flex w-full justify-between items-center">
          <div class="flex w-1/2 flex-col justify-center">
            <h3 style="font-size: 15px;" class="label">No account?</h3>
            <a href="/signup">
              <span class="ml-1 font-bold text-blue-100">Sign Up Now</span>
            </a>
          </div>
          <div class="flex w-1/2 flex-col justify-center">
            <h3 class="label" style="font-size: 15px;">Forgot password?</h3>
            <a href="/password-reset">
              <span class="ml-1 font-semibold text-orange-100">Reset Now</span>
            </a>
          </div>
        </div>
        <div class="flex flex-col self-start">
          <a href="/adminlogin">
            <span class="font-bold"> Admin? </span>
          </a>
        </div>
      </form>
    </div>
  </div>
{/if} -->
<script lang="ts">
	import SignIn from 'clerk-sveltekit/client/SignIn.svelte'
</script>

<div class="w-full max-w-[1200px] mx-auto min-h-[700px]">
	<div class="flex flex-col justify-center items-center py-16 sm:py-32">
		<SignIn  redirectUrl="/admin"/>
	</div>
</div>