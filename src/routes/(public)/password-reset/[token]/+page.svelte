<script lang="ts">
	import { enhance } from '$app/forms';

	import type { ActionData } from './$types';

	export let form: ActionData;
</script>
<div  class="mt-32 pb-16 mx-auto">
	<h1>Reset password</h1>
	<form method="post" use:enhance>
		<label for="password">New Password</label>
		<input name="password" id="password" /><br />
		<input type="submit" />
	</form>
	{#if form?.message}
		<p class="error">{form.message}</p>
	{/if}
</div>