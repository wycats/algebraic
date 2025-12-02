<script lang="ts">
  import { getContext } from "svelte";
  import type { BuilderState } from "../../../lib/state/BuilderState.svelte";

  const builder = getContext<BuilderState>("builder");
  let surfaceId = $derived(builder.selectedSurfaceId);
</script>

<div class="inspector-section">
  <div class="header">
    <h3>Surface: {surfaceId}</h3>
    <button
      class="close-btn"
      onclick={() => {
        builder.selectSurface(null);
      }}
    >
      ✕
    </button>
  </div>

  <div class="context-trace">
    <h4>Context Trace</h4>
    <div class="trace-step">
      <span class="step-label">Root</span>
      <span class="step-value">L* 98</span>
    </div>
    <div class="trace-arrow">↓</div>
    <div class="trace-step">
      <span class="step-label">Parent (Card)</span>
      <span class="step-value">L* 95</span>
    </div>
    <div class="trace-arrow">↓</div>
    <div class="trace-step active">
      <span class="step-label">Self ({surfaceId})</span>
      <span class="step-value">L* 90</span>
    </div>
  </div>
</div>

<div class="inspector-section">
  <h3>Overrides</h3>
  <div class="control-group">
    <label>
      <span>Lightness Offset</span>
      <input type="range" min="-20" max="20" value="0" />
    </label>
    <label>
      <span>Chroma Boost</span>
      <input type="range" min="0" max="100" value="0" />
    </label>
  </div>
</div>

<div class="inspector-section">
  <h3>Contrast</h3>
  <div class="contrast-badge surface-action hue-success">
    <span class="score">APCA 75</span>
    <span class="status">Lc (Pass)</span>
  </div>
</div>

<style>
  .inspector-section {
    padding: 1rem;
    border-bottom: 1px solid var(--border-dec-token);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-high-token);
    margin: 0;
  }

  .close-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-subtle-token);
  }

  .context-trace {
    border: 1px solid var(--border-dec-token);
    padding: 0.75rem;
    border-radius: 4px;
  }

  .trace-step {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    padding: 0.25rem 0;
  }

  .trace-step.active {
    font-weight: bold;
    color: var(--text-high-token);
  }

  .trace-arrow {
    text-align: center;
    font-size: 0.7rem;
    color: var(--text-subtle-token);
    line-height: 0.8;
  }

  .control-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.8rem;
  }

  .contrast-badge {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    border-radius: 4px;
  }

  .score {
    font-weight: bold;
    font-size: 1.1rem;
  }

  .status {
    font-size: 0.7rem;
    text-transform: uppercase;
  }
</style>
