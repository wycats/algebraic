import { useState, useEffect, useRef } from "preact/hooks";
import { calculateHueShift, solveForegroundLightness } from "color-system/math";

export function Playground() {
  // Configuration State
  const [baseHue, setBaseHue] = useState(250); // Blueish
  const [contrastTarget, setContrastTarget] = useState(105); // Standard Strong
  const [hueShiftAmount, setHueShiftAmount] = useState(180); // Max rotation

  // Ref to the preview container to apply CSS variables
  const previewRef = useRef<HTMLDivElement>(null);

  // Live Solver Logic
  useEffect(() => {
    if (!previewRef.current) return;

    const container = previewRef.current;

    // We'll simulate a "Card" surface on top of a "Page" surface
    const cardLight = 1.0;
    const cardDark = 0.2;

    // 1. Solve Foreground Text
    // Light Mode
    const lightTextL = solveForegroundLightness(cardLight, contrastTarget);
    const darkTextL = solveForegroundLightness(cardDark, contrastTarget);

    // 2. Calculate Hue Shifts
    const hueShiftConfig = {
      curve: {
        p1: [0.5, 0] as [number, number],
        p2: [0.5, 1] as [number, number],
      },
      maxRotation: hueShiftAmount,
    };

    const lightShift = calculateHueShift(cardLight, hueShiftConfig);
    const darkShift = calculateHueShift(cardDark, hueShiftConfig);

    // 3. Apply to CSS Variables
    const chroma = 0.05; // Moderate chroma

    const lightSurfaceColor = `oklch(${cardLight} ${chroma} ${
      baseHue + lightShift
    })`;
    const darkSurfaceColor = `oklch(${cardDark} ${chroma} ${
      baseHue + darkShift
    })`;

    container.style.setProperty(
      "--playground-surface",
      `light-dark(${lightSurfaceColor}, ${darkSurfaceColor})`
    );

    // Text Token
    const textChroma = 0.01;
    const lightTextColor = `oklch(${lightTextL} ${textChroma} ${baseHue})`;
    const darkTextColor = `oklch(${darkTextL} ${textChroma} ${baseHue})`;

    container.style.setProperty(
      "--playground-text",
      `light-dark(${lightTextColor}, ${darkTextColor})`
    );
  }, [baseHue, contrastTarget, hueShiftAmount]);

  return (
    <section
      className="surface-card bordered"
      style={{ padding: "2rem", borderRadius: "12px" }}
    >
      <header style={{ marginBottom: "2rem" }}>
        <h2 className="text-strong" style={{ fontSize: "1.5rem", margin: 0 }}>
          Solver Playground
        </h2>
        <p className="text-subtle" style={{ marginTop: "0.5rem" }}>
          See how the solver derives token values from your configuration.
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: "2rem",
        }}
      >
        {/* Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Config Section */}
          <div>
            <h4
              className="text-strong"
              style={{
                margin: "0 0 1rem 0",
                fontSize: "0.9rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Configuration
            </h4>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div>
                <label
                  className="text-subtle"
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontSize: "0.9rem",
                  }}
                >
                  Base Hue ({baseHue}°)
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={baseHue}
                  onInput={(e) => setBaseHue(Number(e.currentTarget.value))}
                  style={{ width: "100%" }}
                />
                <div
                  style={{
                    height: "4px",
                    marginTop: "0.5rem",
                    borderRadius: "2px",
                    background: `oklch(0.6 0.2 ${baseHue})`,
                  }}
                />
              </div>

              <div>
                <label
                  className="text-subtle"
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontSize: "0.9rem",
                  }}
                >
                  Target Contrast ({contrastTarget} APCA)
                </label>
                <input
                  type="range"
                  min="60"
                  max="110"
                  step="1"
                  value={contrastTarget}
                  onInput={(e) =>
                    setContrastTarget(Number(e.currentTarget.value))
                  }
                  style={{ width: "100%" }}
                />
              </div>

              <div>
                <label
                  className="text-subtle"
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontSize: "0.9rem",
                  }}
                >
                  Hue Shift Intensity ({hueShiftAmount})
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={hueShiftAmount}
                  onInput={(e) =>
                    setHueShiftAmount(Number(e.currentTarget.value))
                  }
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preview & Code */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {/* Visual Preview */}
          <div
            ref={previewRef}
            className="bordered"
            style={{
              background: "var(--playground-surface)",
              color: "var(--playground-text)",
              padding: "3rem",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              minHeight: "200px",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            <h3
              style={{
                fontSize: "2rem",
                margin: "0 0 0.5rem 0",
                fontWeight: 800,
              }}
            >
              Adaptive Text
            </h3>
            <p style={{ opacity: 0.8 }}>
              This color is mathematically solved to hit APCA {contrastTarget}.
            </p>
          </div>

          {/* The Programming Model (Code Inspector) */}
          <div
            className="surface-subtle bordered"
            style={{
              padding: "1.5rem",
              borderRadius: "8px",
              fontFamily: "monospace",
              fontSize: "0.85rem",
              overflowX: "auto",
            }}
          >
            <div
              style={{ color: "var(--text-subtle)", marginBottom: "0.5rem" }}
            >
              // The Solver Loop
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "0.5rem 1rem",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#a855f7" }}>const</span>
              <span>
                bgLightness = <span style={{ color: "#3b82f6" }}>1.0</span>;{" "}
                <span style={{ color: "var(--text-subtler)" }}>
                  // Card Surface
                </span>
              </span>

              <span style={{ color: "#a855f7" }}>const</span>
              <span>
                target ={" "}
                <span style={{ color: "#3b82f6" }}>{contrastTarget}</span>;
              </span>

              <span style={{ color: "#a855f7" }}>const</span>
              <span>
                textLightness ={" "}
                <span style={{ color: "#eab308" }}>
                  solveForegroundLightness
                </span>
                (bgLightness, target);
              </span>

              <span style={{ color: "var(--text-subtler)" }}>&rarr;</span>
              <span style={{ color: "#22c55e", fontWeight: "bold" }}>
                {solveForegroundLightness(1.0, contrastTarget)}{" "}
                <span
                  style={{ color: "var(--text-subtler)", fontWeight: "normal" }}
                >
                  (Solved Value)
                </span>
              </span>
            </div>

            <div
              style={{
                marginTop: "1rem",
                paddingTop: "1rem",
                borderTop: "1px solid var(--border-dec-token)",
              }}
            >
              <div
                style={{ color: "var(--text-subtle)", marginBottom: "0.5rem" }}
              >
                // CSS Generation
              </div>
              <div>
                <span style={{ color: "#ec4899" }}>--text-token</span>: oklch(
                <span style={{ color: "#22c55e" }}>
                  {solveForegroundLightness(1.0, contrastTarget)}
                </span>{" "}
                0.01 <span style={{ color: "#3b82f6" }}>{baseHue}</span>);
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
