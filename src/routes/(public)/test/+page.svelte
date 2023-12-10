<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  /** @type {string} */
  $: serverTime = writable([]);
  onMount(() => {
    const source = new EventSource('http://127.0.0.1:8090/test');
    source.onmessage = (event) => {
      serverTime.update((value: any) => {
        value.push(event.data);
        return value;
      });
    };

    source.onerror = (error) => {
      console.log(error);
    };
  });
</script>

{#each $serverTime as time}
  <p>{time}</p>
{/each}
