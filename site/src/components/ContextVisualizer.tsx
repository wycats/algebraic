export function ContextVisualizer() {
  return (
    <div className="context-visualizer p-4">
      <div className="surface-page p-8 border border-border-subtle rounded-lg">
        <div className="text-sm font-bold mb-4 text-text-subtle">
          Page (Light Context)
        </div>
        <div className="surface-card p-8 border border-border-subtle rounded-lg shadow-sm">
          <div className="text-sm font-bold mb-4 text-text-subtle">
            Card (Nested)
          </div>
          <div className="surface-spotlight p-8 text-white rounded-lg">
            <div className="text-sm font-bold">
              Spotlight (Inverted Context)
            </div>
            <div className="mt-2 text-sm opacity-80">
              This surface inverts the polarity. Text becomes light
              automatically.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
