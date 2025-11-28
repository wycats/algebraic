<script lang="ts">
  import type { Snippet } from 'svelte';
  import './Layout.css';

  interface Props {
    children: Snippet;
    gap?: string;
    align?: "start" | "center" | "end" | "stretch";
    class?: string;
  }

  let { children, gap = "1rem", align = "stretch", class: className = "" }: Props = $props();
</script>

<div
  class="layout-stack {className}"
  style:gap
  style:align-items={align}
>
  {@render children()}
</div>
