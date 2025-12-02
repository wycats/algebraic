<script lang="ts">
  import ContextTree from "./ContextTree.svelte";
</script>

<div class="panel">
  <h2>Context Tree</h2>
  <ContextTree />
</div>

<style>
  .panel {
    height: 100%;
    padding: 1rem;
    border-right: 1px solid var(--sl-color-gray-5);
    background: var(--sl-color-gray-1);
    overflow-y: auto;
  }
</style>
