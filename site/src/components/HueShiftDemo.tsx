import { ThemeProvider } from "../context/ThemeContext";
import { HueShiftVisualizer } from "./HueShiftVisualizer";

export function HueShiftDemo() {
  return (
    <ThemeProvider>
      <HueShiftVisualizer />
    </ThemeProvider>
  );
}
