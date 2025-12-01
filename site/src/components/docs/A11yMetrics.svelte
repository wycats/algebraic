<script lang="ts">
  export let apca: number;
  export let wcag: string;
  export let align: "start" | "end" = "start";
</script>

<div class="metric" class:align-end={align === "end"}>
  <span class="metric-label">APCA Target</span>
  <span class="metric-value badge-apca">L<sup>c</sup> &approx; {apca}</span>
</div>

<div class="metric" class:align-end={align === "end"}>
  <span class="metric-label">WCAG Equiv.</span>
  <span class="metric-value badge-wcag">{wcag}</span>
</div>

<style>
  .metric {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: flex-start;
  }

  .metric.align-end {
    align-items: flex-end;
  }

  .metric-label {
    font-family: var(--font-mono-token);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-subtle-token);
    font-weight: 600;
  }

  .metric-value {
    font-family: var(--font-mono-token);
    font-size: 0.9rem;
    color: var(--text-token);
  }

  .badge-apca {
    background: var(--surface-token);
    border: 1px solid var(--border-subtle-token);
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    font-size: 0.9rem;
  }

  .badge-wcag {
    background: var(--surface-success-subtle-token, #dcfce7);
    color: var(--text-success-strong-token, #166534);
    padding: 0.25rem 0.6rem;
    border-radius: 6px;
    font-weight: 700;
    font-size: 0.85rem;
    border: 1px solid transparent;
  }

  :global([data-theme="dark"]) .badge-wcag {
    background: var(--surface-success-subtle-token, #14532d);
    color: var(--text-success-strong-token, #dcfce7);
    border: 1px solid var(--border-success-subtle-token, #14532d);
  }
</style>
