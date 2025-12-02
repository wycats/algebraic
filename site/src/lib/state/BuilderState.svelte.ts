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

  selectSurface(id: string | null): void {
    this.selectedSurfaceId = id;
    if (id) {
      this.inspectorMode = "surface";
    } else {
      this.inspectorMode = "global";
    }
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
