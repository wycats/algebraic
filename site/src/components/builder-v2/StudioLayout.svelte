<script lang="ts">
  import ContextTreePanel from "./ContextTreePanel.svelte";
  import StagePanel from "./StagePanel.svelte";
  import InspectorPanel from "./InspectorPanel.svelte";
  import { getContext } from "svelte";
  import type { BuilderState } from "../../lib/state/BuilderState.svelte";

  const builder = getContext<BuilderState>("builder");
</script>

<div class="studio-layout">
  <aside class="sidebar" style="width: {builder.sidebarWidth}px">
    <ContextTreePanel />
  </aside>

  <main class="stage">
    <StagePanel />
  </main>

  <aside class="inspector" style="width: {builder.inspectorWidth}px">
    <InspectorPanel />
  </aside>
</div>

<style>
  .studio-layout {
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: var(--sl-color-bg);
    color: var(--sl-color-text);
  }

  .sidebar {
    flex-shrink: 0;
    border-right: 1px solid var(--sl-color-gray-5);
  }

  .stage {
    flex: 1;
    min-width: 0; /* Prevent flex item from overflowing */
  }

  .inspector {
    flex-shrink: 0;
    border-left: 1px solid var(--sl-color-gray-5);
  }
</style>
