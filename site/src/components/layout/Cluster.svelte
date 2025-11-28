<script lang="ts">
  import type { Snippet } from 'svelte';
  import './Layout.css';

  interface Props {
    children: Snippet;
    gap?: string;
    align?: "start" | "center" | "end" | "baseline" | "stretch";
    justify?: "start" | "center" | "end" | "space-between";
    class?: string;
  }

  let { 
    children, 
    gap = "1rem", 
    align = "center", 
    justify = "start", 
    class: className = "" 
  }: Props = $props();
</script>

<div
  class="layout-cluster {className}"
  style:gap
  style:align-items={align}
  style:justify-content={justify}
>
  {@render children()}
</div>
