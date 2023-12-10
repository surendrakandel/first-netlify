<script lang="ts">
  import { page } from '$app/stores';
  export let title: string;
  export let href: string;
</script>

<li class:active={$page.url.pathname === href}>
  <a {href}>{title}</a>
</li>
