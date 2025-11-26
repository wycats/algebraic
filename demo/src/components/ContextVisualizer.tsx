export function ContextVisualizer() {
  return (
    <section>
      <div style={{ marginBottom: "2rem" }}>
        <h2 className="text-strong" style={{ margin: 0 }}>
          Context & Polarity
        </h2>
        <p className="text-subtle" style={{ margin: "0.5rem 0 0 0" }}>
          Visualizing how surfaces nest and switch polarity.
        </p>
      </div>

      <div
        className="surface-page bordered"
        style={{
          padding: "3rem",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Label text="Surface Page (Root)" />

        <div
          className="surface-card bordered"
          style={{
            padding: "2rem",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Label text="Surface Card (Page Polarity)" />
          <p className="text-subtle">
            I am a card on the page. My background is slightly different to
            create separation.
          </p>

          <div
            className="surface-spotlight bordered"
            style={{
              padding: "2rem",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Label text="Surface Spotlight (Inverted Polarity)" />
            <p className="text-subtle">
              I am a spotlight. I invert the polarity (Light -&gt; Dark or Dark
              -&gt; Light).
            </p>

            <div
              className="surface-card bordered"
              style={{
                padding: "1.5rem",
                borderRadius: "6px",
              }}
            >
              <Label text="Surface Card (Page Polarity relative to Spotlight)" />
              <p className="text-subtle">
                I am a card inside the spotlight. Because my parent is inverted,
                I am "Page" polarity relative to *it*, which means I look like
                the spotlight (dark on dark).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Label({ text }: { text: string }) {
  return (
    <div
      className="text-strong"
      style={{
        fontSize: "0.85rem",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        fontWeight: "bold",
        opacity: 0.7,
      }}
    >
      {text}
    </div>
  );
}
