<script lang="ts">
  // Abstract View: A block diagram of the surface hierarchy.
</script>

<div class="abstract-view">
  <div class="block root">
    <span class="label">Root (Page)</span>

    <div class="block card">
      <span class="label">Surface: Card</span>

      <div class="row">
        <div class="block sunken">
          <span class="label">Surface: Sunken</span>
        </div>
        <div class="block input">
          <span class="label">Surface: Input</span>
        </div>
      </div>

      <div class="block action">
        <span class="label">Surface: Action</span>
      </div>
    </div>
  </div>
</div>

<style>
  .abstract-view {
    padding: 2rem;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .block {
    border: 1px dashed currentColor;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
  }

  .label {
    font-size: 0.75rem;
    font-family: monospace;
    opacity: 0.7;
    background: var(--surface-1); /* Just to clear lines if needed */
    padding: 0.25rem;
  }

  .row {
    display: flex;
    gap: 1rem;
  }

  /* Simulate the hierarchy visually */
  .root {
    width: 400px;
    height: 400px;
    border-color: var(--color-gray-500);
  }
  .card {
    flex: 1;
    border-color: var(--color-blue-500);
  }
  .sunken {
    flex: 1;
    border-color: var(--color-gray-400);
  }
  .input {
    flex: 1;
    border-color: var(--color-green-500);
  }
  .action {
    height: 40px;
    border-color: var(--color-purple-500);
  }
</style>
