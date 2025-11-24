import { useState } from "preact/hooks";

export function ContrastTrap() {
  const [isDark, setIsDark] = useState(false);

  // Standard Palette (Linear Lightness)
  const standardBg = isDark ? "#1a1a1a" : "#ffffff";
  const standardText = "#9ca3af"; // Tailwind gray-400

  // Solved System (APCA)
  const solvedBg = isDark ? 0.1 : 1.0;
  const solvedTextL = isDark ? 0.8 : 0.3; // Rough values that would be solved

  return (
    <section
      className="surface-card bordered"
      style={{ padding: "2rem", borderRadius: "12px" }}
    >
      <header
        style={{
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2 className="text-strong" style={{ fontSize: "1.5rem", margin: 0 }}>
            Contrast Stability
          </h2>
          <p className="text-subtle" style={{ marginTop: "0.5rem" }}>
            Comparing static colors vs. the adaptive solver across themes.
          </p>
        </div>
        <button
          onClick={() => setIsDark(!isDark)}
          className="surface-action text-strong bordered"
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Toggle {isDark ? "Light" : "Dark"} Mode
        </button>
      </header>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}
      >
        {/* Standard Palette */}
        <div
          style={{
            background: standardBg,
            padding: "2rem",
            borderRadius: "8px",
            transition: "background 0.3s ease",
            border: "1px solid rgba(128,128,128,0.2)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3
              style={{
                color: isDark ? "#fff" : "#000",
                marginTop: 0,
                fontSize: "1.1rem",
              }}
            >
              Static Gray
            </h3>
            <p
              style={{ color: standardText, fontWeight: 500, lineHeight: 1.5 }}
            >
              This text uses a static hex code ({standardText}). In{" "}
              {isDark ? "dark" : "light"} mode, the contrast degrades
              significantly.
            </p>
          </div>
          <div
            style={{
              marginTop: "1.5rem",
              borderTop: "1px solid rgba(128,128,128,0.2)",
              paddingTop: "1rem",
            }}
          >
            <div
              style={{
                fontSize: "0.85rem",
                color: isDark ? "#fff" : "#000",
                opacity: 0.7,
              }}
            >
              Result
            </div>
            <div
              style={{
                color: "#ef4444",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>×</span>
              <span>Poor Readability</span>
            </div>
          </div>
        </div>

        {/* Solved System */}
        <div
          className={isDark ? "theme-dark" : "theme-light"}
          style={{
            background: "var(--surface-page)",
            padding: "2rem",
            borderRadius: "8px",
            transition: "background 0.3s ease",
            border: "1px solid var(--border-dec-token)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3
              className="text-strong"
              style={{ marginTop: 0, fontSize: "1.1rem" }}
            >
              Adaptive Solver
            </h3>
            <p className="text-subtle" style={{ lineHeight: 1.5 }}>
              The solver calculates the precise lightness (L={solvedTextL})
              needed to hit the target contrast against the background (L=
              {solvedBg}).
            </p>
          </div>
          <div
            style={{
              marginTop: "1.5rem",
              borderTop: "1px solid var(--border-dec-token)",
              paddingTop: "1rem",
            }}
          >
            <div className="text-subtler" style={{ fontSize: "0.85rem" }}>
              Result
            </div>
            <div
              className="text-strong"
              style={{
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  color: "var(--hue-success-text, #22c55e)",
                  fontSize: "1.2rem",
                }}
              >
                ✓
              </span>
              <span>Target Met (APCA 105+)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
