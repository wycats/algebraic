<script lang="ts">
  import ContextTreeNode from "./ContextTreeNode.svelte";

  // Mock Data for Prototype
  const treeData = {
    id: "page",
    label: "Page (Root)",
    type: "surface" as const,
    children: [
      {
        id: "sidebar",
        label: "Sidebar",
        type: "surface" as const,
        children: [
          {
            id: "nav-item-1",
            label: "Nav Item (Active)",
            type: "surface" as const,
          },
          { id: "nav-item-2", label: "Nav Item", type: "surface" as const },
        ],
      },
      {
        id: "card-1",
        label: "Card",
        type: "surface" as const,
        children: [
          { id: "card-title", label: "Title", type: "text" as const },
          {
            id: "btn-primary",
            label: "Primary Action",
            type: "action" as const,
          },
          { id: "input-1", label: "Input Field", type: "surface" as const },
        ],
      },
    ],
  };
</script>

<div class="context-tree">
  <ContextTreeNode node={treeData} />
</div>

<style>
  .context-tree {
    font-family: monospace;
    font-size: 0.9rem;
  }
</style>
