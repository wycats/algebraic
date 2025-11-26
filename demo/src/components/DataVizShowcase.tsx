import { DEFAULT_CONFIG } from "color-system";
import { useConfig } from "../context/ConfigContext";

export function DataVizShowcase() {
  const { config, setConfig } = useConfig();
  const palette = config.palette ||
    DEFAULT_CONFIG.palette || { hues: [], targetChroma: 0.12 };
  const hues =
    palette.hues && palette.hues.length > 0
      ? palette.hues
      : DEFAULT_CONFIG.palette?.hues || [];

  const handleChromaChange = (e: Event) => {
    const val = parseFloat((e.target as HTMLInputElement).value);
    setConfig({
      ...config,
      palette: {
        ...palette,
        targetChroma: val,
      },
    });
  };

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
          <h1 class="text-high">Data Visualization</h1>
          <p class="text-subtle">
            Categorical palettes generated to harmonize with the theme.
          </p>
        </header>

        {/* Controls */}
        <section class="surface-card bordered" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <span class="text-subtle">
                Target Chroma ({palette.targetChroma})
              </span>
              <input
                type="range"
                min="0.05"
                max="0.25"
                step="0.01"
                value={palette.targetChroma}
                onInput={handleChromaChange}
              />
            </label>
          </div>
        </section>

        {/* Palette Swatches */}
        <section>
          <h2 class="text-high" style={{ marginBottom: "2rem" }}>
            Palette Swatches
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
              gap: "1rem",
            }}
          >
            {hues.map((_, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    backgroundColor: `var(--chart-${i + 1})`,
                    height: "80px",
                    borderRadius: "8px",
                    boxShadow: "var(--shadow-sm)",
                  }}
                />
                <span
                  class="text-subtlest"
                  style={{ fontSize: "0.8rem", textAlign: "center" }}
                >
                  --chart-{i + 1}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Bar Chart Example */}
        <section>
          <h2 class="text-high" style={{ marginBottom: "2rem" }}>
            Bar Chart Example
          </h2>
          <div
            class="surface-card bordered"
            style={{
              padding: "2rem",
              height: "300px",
              display: "flex",
              alignItems: "flex-end",
              gap: "1rem",
            }}
          >
            {[60, 85, 40, 95, 55, 70, 30, 80, 45, 65].map((height, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${height}%`,
                  backgroundColor: `var(--chart-${(i % hues.length) + 1})`,
                  borderRadius: "4px 4px 0 0",
                  transition: "height 0.3s ease",
                  border: "1px solid var(--surface-token)",
                  borderBottom: "none",
                }}
              />
            ))}
          </div>
        </section>

        {/* Pie Chart Example (CSS Conic Gradient) */}
        <section>
          <h2 class="text-high" style={{ marginBottom: "2rem" }}>
            Pie Chart Example
          </h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: "250px",
                height: "250px",
                borderRadius: "50%",
                background: `conic-gradient(
                  var(--chart-1) 0% 20%,
                  var(--chart-2) 20% 35%,
                  var(--chart-3) 35% 55%,
                  var(--chart-4) 55% 80%,
                  var(--chart-5) 80% 100%
                )`,
                boxShadow: "var(--shadow-md)",
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
