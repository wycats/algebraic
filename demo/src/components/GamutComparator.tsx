export function GamutComparator() {
  // Neon Purple
  // P3: oklch(0.6 0.3 300)
  // sRGB: clamped

  return (
    <section>
      <div style={{ marginBottom: "2rem" }}>
        <h2 className="text-strong" style={{ margin: 0 }}>
          Gamut Comparator (P3 vs sRGB)
        </h2>
        <p className="text-subtle" style={{ margin: "0.5rem 0 0 0" }}>
          If you have a wide-gamut display, the right side should look
          significantly more vibrant.
        </p>
      </div>

      <div
        className="surface-card bordered"
        style={{
          padding: "2rem",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <div style={{ display: "flex", gap: "1rem" }}>
          {/* sRGB Side */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                height: "200px",
                borderRadius: "12px",
                background: `color(srgb 0.5 0 1)`, // Deep Purple sRGB
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              sRGB
            </div>
            <p
              className="text-subtle"
              style={{ textAlign: "center", marginTop: "0.5rem" }}
            >
              color(srgb 0.5 0 1)
            </p>
          </div>

          {/* P3 Side */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                height: "200px",
                borderRadius: "12px",
                background: `color(display-p3 0.5 0 1)`, // Deep Purple P3
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.2rem",
                boxShadow: "0 0 30px color(display-p3 0.5 0 1 / 0.5)",
              }}
            >
              Display P3
            </div>
            <p
              className="text-subtle"
              style={{ textAlign: "center", marginTop: "0.5rem" }}
            >
              color(display-p3 0.5 0 1)
            </p>
          </div>
        </div>

        <div
          className="surface-workspace bordered"
          style={{ padding: "1rem", borderRadius: "8px" }}
        >
          <p className="text-subtle" style={{ margin: 0, fontSize: "0.9rem" }}>
            <strong>Note:</strong> This comparison uses raw CSS color functions.
            The Color System uses <code>oklch</code>, which automatically scales
            to the device's capabilities.
          </p>
        </div>
      </div>
    </section>
  );
}
