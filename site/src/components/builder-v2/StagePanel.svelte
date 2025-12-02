<script lang="ts">
  import { getContext } from "svelte";
  import type { BuilderState } from "../../lib/state/BuilderState.svelte";

  const builder = getContext<BuilderState>("builder");
</script>

<div class="panel">
  <h2>Stage ({builder.viewMode})</h2>
  <div class="controls">
    <button
      onclick={() => {
        builder.setViewMode("component");
      }}>Component</button
    >
    <button
      onclick={() => {
        builder.setViewMode("abstract");
      }}>Abstract</button
    >
    <button
      onclick={() => {
        builder.setViewMode("audit");
      }}>Audit</button
    >
  </div>
  <div class="canvas">
    <!-- Canvas content will go here -->
    <p>Live Preview Area</p>
  </div>
</div>

<style>
  .panel {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: var(--sl-color-gray-2);
  }

  .controls {
    padding: 0.5rem;
    border-bottom: 1px solid var(--sl-color-gray-5);
    display: flex;
    gap: 0.5rem;
  }

  .canvas {
    flex: 1;
    display: grid;
    place-items: center;
  }
</style>
