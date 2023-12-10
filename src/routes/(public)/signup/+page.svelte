<!-- <script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	export let form: ActionData;
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import { isEmail } from '$src/lib/utils/valid_email';
	import { isValidPassword } from '$src/lib/utils/valid_password';
	import type { user } from '$src/types/user';
	import { CreateUser } from '$src/apis/createUser';
	import { browser } from '$app/environment';
	import { frontEndUrl } from '$src/apis/config';
	$: loading = false;
	$: origin = '';
	if (browser) {
	  origin = window.location.origin;
	}
  
	async function SupaSignup() {
	  if (signUpData.name.length < 2) {
		toast.error('name must be at least 2 characters');
		return;
	  }
	  if (!isEmail(signUpData.email)) {
		toast.error('email is not valid');
		return;
	  }
	  if (!isValidPassword(signUpData.password)) {
		toast.error('password must be at least 8 characters');
		return;
	  }
	  if (signUpData.password != signUpData.confirmPassword) {
		toast.error('password and confirm password does not match');
		return;
	  }
	  try {
		let dataCopy = JSON.parse(JSON.stringify(signUpData));
		delete dataCopy.confirmPassword;
		delete dataCopy.password;
		dataCopy['organizationId'] = 'randomId';
		dataCopy['business'] = {};
		loading = true;
		return await goto('/confirm-email/inform');
	  } catch (error) {
		toast.error('could not create account. Please try later.');
		loading = false;
	  }
	}
	let disabled = false;
	//@ts-ignore
	let signUpData: user = {
	  name: '',
	  userName: '',
	  password: '',
	  confirmPassword: '',
	  origin: '',
	  emailVisibility: false,
	  type: '',
	  id: '',
	  created: '',
	  updated: '',
	  verified: false,
	  avatar: '',
	  lastResetSentAt: '',
	  lastVerificationSentAt: '',
	  passwordHash: '',
	  tokenKey: '',
	  token: '',
	  email: ''
	};
	async function submit() {
	  if (signUpData.name.length < 2) {
		toast.error('name must be at least 2 characters');
		return;
	  }
	  if (!isEmail(signUpData.email)) {
		toast.error('email is not valid');
		return;
	  }
	  if (!isValidPassword(signUpData.password)) {
		toast.error('password must be at least 8 characters');
		return;
	  }
	  if (signUpData.password != signUpData.confirmPassword) {
		toast.error('password and confirm password does not match');
		return;
	  }
	  try {
		loading = true;
		let err = await CreateUser(signUpData.email, signUpData.email, signUpData.name);
		toast.success(
		  'account has been created.Please check your email to confirm your email address'
		);
		return await goto('/confirm-email/inform');
	  } catch (error: any) {
		if (error.message.includes('User already exists')) {
		  toast.error('User already exists. please login');
		  return await goto('/login');
		}
		toast.error('could not create account. Please try later.');
		loading = false;
	  }
	}
  </script>
  
  <div class="mx-auto max-w-[400px] mt-16 sm:mt-32 pb-16">
	<div class="flex flex-col shadow-md w-full bg-primary py-12 px-8 lg:rounded-lg mt-8">
	  <div class="flex flex-col items-center text-center">
		<img class="h-12 w-auto" src="/images/logo/white_logo.png" alt="firstshipper company logo" />
		<div class="mt-8">
		  <h3 class="text-xl">Create an account</h3>
		</div>
	  </div>
	  <div class="mt-3">
		<form 
			method="post" 
			use:enhance
			action="?/signup"
			class="space-y-1 flex flex-col"
		>
		  <div class="flex w-full flex-col">
			<label for="name" class="label">Name</label>
			<input
			  class="input w-full"
			  type="text"
			  name="name"
			  placeholder="Name"
			  id="name"
			  bind:value={signUpData.name}
			  required
			/>
		  </div>
		  <div class="flex w-full flex-col">
			<label for="email" class="label">Email</label>
			<input
			  class="input w-full"
			  type="email"
			  placeholder="email"
			  bind:value={signUpData.email}
			  name="email"
			  id="email"
			  required
			/>
		  </div>
		  <div class="flex w-full flex-col">
			<label for="password" class="label">Password</label>
			<input
			  class="input w-full"
			  type="password"
			  placeholder="password"
			  name="password"
			  id="password"
			  required
			  bind:value={signUpData.password}
			/>
		  </div>
		  <div class="flex w-full flex-col">
			<label for="confirmPassword" class="label">Confirm Password</label>
			<input
			  class="input w-full"
			  type="password"
			  placeholder="confirm password"
			  name="confirmPassword"
			  id="confirmPassword"
			  required
			  bind:value={signUpData.confirmPassword}
			/>
		  </div>
		  <div class="w-full">
			<button
			  type="submit"
			  class="ownBtn bg-secondary mt-4 w-full rounded py-3 hover:opacity-80 {disabled == true
				? 'disabled'
				: ''}">Sign up</button
			>
		  </div>
		  <div style="margin-top:10px;">
			<span class="flex flex-col">Already have an Account?</span>
			<a class="btn mt-3 w-full btn-neutral hover:bg-gray-600" href="/login"
			  ><span class="text-white">Login</span>
			</a>
		  </div>
		</form>
		{#if form && form.message}
		  <div class="text-red-500 text-sm mt-2">{form.message}</div>
		{/if}
	  </div>
	</div>
  </div>
  
  <style>
	label,
	span,
	a,
	h3,
	.btn {
	  color: white;
	}
  </style>
   -->
<script lang="ts">
	import SignUp from 'clerk-sveltekit/client/SignUp.svelte'
</script>

<div class="w-full max-w-[1200px] mx-auto min-h-[900px]">
	<div class="flex flex-col justify-center items-center py-16 sm:py-32">
		<SignUp  redirectUrl="/admin" />
	</div>
</div>