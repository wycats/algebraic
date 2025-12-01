<script lang="ts">
  const rows = [
    {
      token: "text-high",
      apca: "~108",
      wcag: "<strong>AAA+</strong>",
      usage: "Headings, Critical Data",
    },
    {
      token: "text-strong",
      apca: "~105",
      wcag: "<strong>AAA</strong>",
      usage: "Body Text, Labels",
    },
    {
      token: "text-subtle",
      apca: "~85",
      wcag: "<strong>AAA</strong>",
      usage: "Secondary Text, Icons",
    },
    {
      token: "text-subtlest",
      apca: "~75",
      wcag: "<strong>AA</strong> (Large) / <strong>AAA</strong> (Body)",
      usage: "Placeholders, Disabled",
    },
  ];
</script>

<div class="token-table-container">
  <div class="token-grid">
    <div class="grid-header">
      <div class="col-token">Token Level</div>
      <div class="col-apca">APCA Target ($L^c$)</div>
      <div class="col-wcag">WCAG 2.1 Equivalence</div>
      <div class="col-usage">Usage</div>
    </div>

    {#each rows as row}
      <div class="grid-row">
        <div class="cell col-token">
          <code class="token-code">{row.token}</code>
        </div>
        <div class="cell col-apca">
          <span class="mobile-label">APCA Target</span>
          <span class="value">{row.apca}</span>
        </div>
        <div class="cell col-wcag">
          <span class="mobile-label">WCAG 2.1</span>
          <span class="value">{@html row.wcag}</span>
        </div>
        <div class="cell col-usage">
          <span class="mobile-label">Usage</span>
          <span class="value">{row.usage}</span>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .token-table-container {
    margin: 2rem 0;
    border: 1px solid var(--border-subtle-token);
    border-radius: 8px;
    overflow: hidden;
    background: var(--surface-token);
    box-shadow: var(--shadow-sm-token);
  }

  .token-grid {
    display: flex;
    flex-direction: column;
  }

  .grid-header {
    display: grid;
    grid-template-columns: 1.2fr 1fr 1.5fr 1.5fr;
    padding: 1rem 1.5rem;
    background: var(--surface-subtle-token);
    border-bottom: 1px solid var(--border-subtle-token);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-subtle-token);
  }

  .grid-row {
    display: grid;
    grid-template-columns: 1.2fr 1fr 1.5fr 1.5fr;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--border-subtle-token);
    align-items: center;
    transition: background-color 0.2s;
  }

  .grid-row:last-child {
    border-bottom: none;
  }

  .grid-row:hover {
    background-color: var(--surface-hover-token);
  }

  .token-code {
    font-family: var(--font-mono-token);
    font-size: 0.85rem;
    color: var(--text-token);
    background: var(--surface-subtle-token);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    border: 1px solid var(--border-subtle-token);
  }

  .value {
    font-size: 0.9rem;
    color: var(--text-token);
  }

  .mobile-label {
    display: none;
    font-size: 0.7rem;
    text-transform: uppercase;
    color: var(--text-subtle-token);
    margin-bottom: 0.25rem;
    font-weight: 600;
  }

  /* Mobile / Responsive Styles */
  @media (max-width: 768px) {
    .grid-header {
      display: none;
    }

    .grid-row {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1.5rem;
    }

    .cell {
      display: flex;
      flex-direction: column;
    }

    .mobile-label {
      display: block;
    }

    .col-token {
      margin-bottom: 0.5rem;
    }

    .token-code {
      font-size: 0.95rem;
      align-self: flex-start;
    }
  }
</style>
