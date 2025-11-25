import { PRESETS } from "color-system";
import { useConfig } from "../../context/ConfigContext";

export function PresetSelector() {
  const { loadPreset } = useConfig();

  return (
    <div class="preset-selector">
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label
          htmlFor="preset-select"
          class="text-subtle"
          style={{ fontSize: "0.9rem", fontWeight: "bold" }}
        >
          Load Preset
        </label>
        <select
          id="preset-select"
          class="surface-workspace bordered text-strong"
          style={{
            padding: "0.5rem",
            borderRadius: "4px",
            width: "100%",
            cursor: "pointer",
          }}
          onChange={(e) => {
            const value = (e.target as HTMLSelectElement).value;
            if (value) {
              loadPreset(value);
              // Reset selection
              (e.target as HTMLSelectElement).value = "";
            }
          }}
        >
          <option value="">Select a preset...</option>
          {PRESETS.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {preset.name}
            </option>
          ))}
        </select>
        <p class="text-subtlest" style={{ fontSize: "0.8rem", margin: 0 }}>
          Loading a preset will overwrite your current configuration.
        </p>
      </div>
    </div>
  );
}
