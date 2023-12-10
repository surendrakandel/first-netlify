<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';
	  import type { resetPassword } from '$src/types/password';
	let passwordMatched = true;
	let resetPasswordData:resetPassword = {
		token: '',
		newPassword: '',
		confirmPassword: '',
		email: '',
		userId: '',
		accessToken: '',
		refreshToken: ''
	};
	let errData = {
	  inValidPasswordMessage:
		'Please choose stronger password with 1 number, 1 capital letter, 1 symbol and must be 8 characters long.',
	  unMatchPasswordMessage: 'New Password and Confirm Password does not match.',
	  validPassword: true
	};
  
	function validateMatch() {
	  if (resetPasswordData.newPassword != resetPasswordData.confirmPassword) {
		passwordMatched = false;
	  } else {
		passwordMatched = true;
	  }
	}
  </script>
  
  <div class="mx-auto max-w-[400px] mt-16 sm:mt-32 pb-16">
	<form method="post" use:enhance class="flex flex-col shadow-md w-full bg-primary py-12 px-8 lg:rounded-lg mt-8">
	  <div class="flex flex-col items-center">
		<img class="h-12 w-auto" src="/images/logo/white_logo.png" alt="firstshipper company logo" />
	  </div>
	  <h2 class="mt-6 self-center">Reset Password</h2>
		<label class="" for="email">Email</label>
		<input
		  type="email"
		  name="email"
		  id="email"
		  class="input"
		  required
		  style="font-size: 14px;color: #000;"
		  value={resetPasswordData.email}
		  placeholder="emails"
		/>
		<label class="" for="newPassword">New Password</label>
		<input
		  type="password"
		  name="newPassword"
		  id="newPassword"
		  class="input"
		  style="font-size: 14px;color: #000;"
		  bind:value={resetPasswordData.newPassword}
		  placeholder="New Password"
		/>
		{#if errData.validPassword == false}
		  <div class="mt-1 text-red-500">{errData.inValidPasswordMessage}</div>
		{/if}
		<label class="" for="confirmPassword">Retype password</label>
		<input
		  type="password"
		  id="confirmPassword"
		  name="confirmPassword"
		  class="input"
		  style="font-size: 14px;color: #000;"
		  on:change={validateMatch}
		  bind:value={resetPasswordData.confirmPassword}
		  placeholder="Confirm Password"
		/>
		{#if passwordMatched == false}
		  <div class="mt-1 text-red-500">{errData.unMatchPasswordMessage}</div>
		{/if}
  
		<button
		  type="submit"
		  class="bg-neutral ownBtn my-3 w-full hover:opacity-80"
		  style="font-size: 16px;color: #fff;">Submit</button
		>
		<div class="flex h-[50px] items-center">
		  <h3 class="font-bold">Have no account?</h3>
		  <a href="/signup" class="ml-4 inline font-bold underline  underline-offset-4"
			>Create one</a
		  >
		</div>
	</form>
  </div>
  