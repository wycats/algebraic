type ViewMode = "component" | "abstract" | "audit";
type InspectorMode = "global" | "surface";

export class BuilderState {
  // Selection
  selectedSurfaceId = $state<string | null>(null);
  hoveredSurfaceId = $state<string | null>(null);

  // View State
  viewMode = $state<ViewMode>("component");
  inspectorMode = $state<InspectorMode>("global");

  // Layout State (for resizable panes, future proofing)
  sidebarWidth = $state<number>(300);
  inspectorWidth = $state<number>(350);

  constructor() {
    // Auto-switch inspector mode based on selection
    $effect(() => {
      if (this.selectedSurfaceId) {
        this.inspectorMode = "surface";
      } else {
        this.inspectorMode = "global";
      }
    });
  }

  selectSurface(id: string | null): void {
    this.selectedSurfaceId = id;
  }

  hoverSurface(id: string | null): void {
    this.hoveredSurfaceId = id;
  }

  setViewMode(mode: ViewMode): void {
    this.viewMode = mode;
  }

  setInspectorMode(mode: InspectorMode): void {
    this.inspectorMode = mode;
  }
}

export const builderState = new BuilderState();
