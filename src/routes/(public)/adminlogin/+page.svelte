<script lang="ts">
  import { goto } from '$app/navigation';
  import { isEmail } from '$src/lib/utils/valid_email';
  import { isValidPassword } from '$src/lib/utils/valid_password';
  import toast from 'svelte-french-toast';
  import { onMount } from 'svelte';
  import { Circle3 } from 'svelte-loading-spinners';
  import { adminLogin } from '$src/apis/admin_login';
  import type { LoginUser } from '$src/types/user';
  $: loading = true;
  let data_validation = {
    valid_email: true,
    valid_password: true
  };
  let data: LoginUser = {
    email: '',
    password: ''
  };
  async function loginUser() {
    loading = true;
    if (!isEmail(data.email)) {
      data_validation.valid_email = false;
      return;
    } else {
      data_validation.valid_email = true;
    }
    if (!isValidPassword(data.password)) {
      data_validation.valid_password = false;
      return;
    }
    try {
      let res = await adminLogin(data);
      console.log(res);
      return await goto('/admin');
    } catch (error) {
      toast.success('Invalid Email or Password');
      loading = false;
      return;
    }
  }
  onMount(() => {
    loading = false;
  });
</script>

<div class="mx-auto max-w-[400px] py-32">
  <div class="flex flex-col shadow-md w-full bg-primary lg:rounded-lg p-8 py-12">
    <h2 class="text-center">Sign in to your account</h2>
    {#if loading}
      <div
        class="inset-0 flex min-h-[400px] w-full items-center justify-center transition-opacity duration-300"
      >
        <div class="flex w-full flex-col items-center justify-center pb-[100px]">
          <Circle3 size="60" unit="px" duration="1s" />
          <div class="sm: mt-3 font-mono">Loging In</div>
        </div>
      </div>
    {:else}
      <div class="flex w-full items-center justify-center mt-12">
        <form
          class="flex w-full max-w-sm flex-col items-center justify-center rounded-lg"
          on:submit|preventDefault={loginUser}
        >
          <div class="flex w-full flex-col gap-2 rounded-md font-mono">
            <div class="flex w-full flex-col">
              <label for="email-address" class="py-1 font-bungee">Email Address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="username"
                required
                class="input w-full p-2"
                placeholder="Email address"
                bind:value={data.email}
                on:change={() => {
                  if (isEmail(data.email)) {
                    data_validation.valid_email = true;
                  }
                }}
              />
              {#if data_validation.valid_email == false}
                <h3 class="text-error">Email is not Valid</h3>
              {/if}
            </div>
            <div class="flex w-full flex-col">
              <label for="password" class="py-1 font-bungee">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="input p-2"
                placeholder="Password"
                bind:value={data.password}
                on:change={() => {
                  if (isValidPassword(data.password)) {
                    data_validation.valid_password = true;
                  }
                }}
              />
              {#if data_validation.valid_password == false}
                <h3 class="text-error">Password is not Valid</h3>
              {/if}
            </div>
          </div>
          <button type="submit" class="bg-neutral ownBtn mx-auto mt-10 w-full">
            <span class="flex items-center">
              <!-- Heroicon name: solid/lock-closed -->
              <svg
                class="mr-5 h-4 w-4 group-hover:text-indigo-400"
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
            <span class=""> Sign in </span>
          </button>
          <div class="mt-8 flex w-full justify-between">
            <div class="flex w-1/2 flex-col">
              <h3 class="">No account?</h3>
              <a href="/signup">
                <span class="font-bold text-gray-100"> Sign Up Now </span>
              </a>
            </div>
            <div class="flex w-1/2 flex-col">
              <h3 class="">Forgot password?</h3>
              <a href="/forgot-password">
                <span class="font-bold text-yellow-200"> Reset Now </span>
              </a>
            </div>
          </div>
        </form>
      </div>
    {/if}
  </div>
</div>
