<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>


<div class="mx-auto max-w-[400px] py-24 min-h-[800px]">
	<div class="flex flex-col shadow-md w-full bg-primary py-12 px-8 lg:rounded-lg mt-8">
		<h1>Email verification</h1>
		<p>Your email verification link was sent to your inbox (i.e. console).</p>
		<h2>Resend verification link</h2>
		<form method="post" use:enhance>
			<input class="btn btn-primary min-w-[300px] mt-5 hover:opacity-80" type="submit" value="Resend" />
		</form>
		{#if form?.success}
			<p>Your verification link was resent</p>
		{/if}
	</div>
</div>
