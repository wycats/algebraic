<script lang="ts">
  import ContextTree from "./ContextTree.svelte";
</script>

<div class="panel surface-workspace">
  <h2>Context Tree</h2>
  <ContextTree />
</div>

<style>
  .panel {
    height: 100%;
    padding: 1rem;
    border-right: 1px solid var(--border-dec-token);
    overflow-y: auto;
  }
</style>
