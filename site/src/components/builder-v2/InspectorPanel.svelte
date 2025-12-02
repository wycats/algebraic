<script lang="ts">
  import { getContext } from "svelte";
  import type { BuilderState } from "../../lib/state/BuilderState.svelte";

  const builder = getContext<BuilderState>("builder");
</script>

<div class="panel">
  <h2>Inspector ({builder.inspectorMode})</h2>
  {#if builder.selectedSurfaceId}
    <p>Inspecting: {builder.selectedSurfaceId}</p>
    <button
      onclick={() => {
        builder.selectSurface(null);
      }}>Deselect</button
    >
  {:else}
    <p>Global Settings</p>
  {/if}
</div>

<style>
  .panel {
    height: 100%;
    padding: 1rem;
    border-left: 1px solid var(--sl-color-gray-5);
    background: var(--sl-color-gray-1);
    overflow-y: auto;
  }
</style>
