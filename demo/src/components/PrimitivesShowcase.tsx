export function PrimitivesShowcase() {
  return (
    <div
      class="surface-page"
      style={{ minHeight: "100vh", padding: "2rem", paddingTop: "6rem" }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
        }}
      >
        <header>
          <h1 class="text-high">UI Primitives</h1>
          <p class="text-subtle">
            Essential building blocks for the design system.
          </p>
        </header>

        {/* Elevation Section */}
        <section>
          <h2 class="text-high" style={{ marginBottom: "2rem" }}>
            Elevation (Shadows)
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2rem",
            }}
          >
            {["sm", "md", "lg", "xl"].map((size) => (
              <div
                key={size}
                class={`surface-card shadow-${size} bordered`}
                style={{
                  height: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                }}
              >
                <span class="text-subtle">shadow-{size}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Focus Section */}
        <section>
          <h2 class="text-high" style={{ marginBottom: "2rem" }}>
            Focus Indicators
          </h2>
          <div
            class="surface-card bordered"
            style={{
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <p class="text-subtle">
              Use the <code class="text-strong">.focus-ring</code> utility class
              to apply accessible focus styles. Tab through these elements to
              see the effect.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button
                class="surface-action focus-ring"
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Action Button
              </button>

              <button
                class="surface-card focus-ring bordered"
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Card Button
              </button>

              <input
                type="text"
                placeholder="Focus me..."
                class="surface-workspace focus-ring bordered"
                style={{
                  padding: "0.75rem",
                  borderRadius: "6px",
                  border: "1px solid transparent",
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
