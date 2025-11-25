import { contrastForPair, textLightness } from "color-system/math";
import { useConfig } from "../../context/ConfigContext";
import { useTheme } from "../../context/ThemeContext";
import { useSolvedTheme } from "../../hooks/useSolvedTheme";

export function AnchorsEditor() {
  const { config, updateAnchor } = useConfig();
  const { resolvedTheme } = useTheme();
  const solved = useSolvedTheme();

  const getFailingSurfaces = (
    polarity: "page" | "inverted",
    mode: "light" | "dark"
  ) => {
    if (!solved) return 0;
    return solved.surfaces.filter((s) => {
      if (s.polarity !== polarity) return false;
      const bg = s.computed?.[mode].background;
      if (bg === undefined) return false;
      const textL = textLightness({ polarity, mode });
      const contrast = contrastForPair(textL, bg);
      return contrast < 45;
    }).length;
  };

  const renderSlider = (
    polarity: "page" | "inverted",
    mode: "light" | "dark",
    position: "start" | "end"
  ) => {
    const value = config.anchors[polarity][mode][position].background;
    const isActive = mode === resolvedTheme;
    const failingCount = getFailingSurfaces(polarity, mode);

    return (
      <label
        class={isActive ? "text-strong" : "text-subtlest"}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          opacity: isActive ? 1 : 0.5,
          transition: "opacity 0.2s ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ textTransform: "capitalize" }}>
            {mode} {position}
            {failingCount > 0 && (
              <span
                title={`${failingCount} surfaces have insufficient contrast`}
                style={{ marginLeft: "0.5rem", cursor: "help" }}
              >
                ⚠️
              </span>
            )}
          </span>
          <span>{value.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={value}
          onInput={(e) =>
            updateAnchor(
              polarity,
              mode,
              position,
              parseFloat(e.currentTarget.value)
            )
          }
        />
      </label>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 class="text-strong" style={{ marginBottom: "1rem" }}>
          Page Anchors
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {renderSlider("page", "light", "start")}
          {renderSlider("page", "light", "end")}
          {renderSlider("page", "dark", "start")}
          {renderSlider("page", "dark", "end")}
        </div>
      </div>

      <div>
        <h3 class="text-strong" style={{ marginBottom: "1rem" }}>
          Inverted Anchors
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {renderSlider("inverted", "light", "start")}
          {renderSlider("inverted", "light", "end")}
          {renderSlider("inverted", "dark", "start")}
          {renderSlider("inverted", "dark", "end")}
        </div>
      </div>
    </div>
  );
}
