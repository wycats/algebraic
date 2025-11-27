import { ConfigProvider } from "@demo/context/ConfigContext";
import { ThemeProvider, useTheme } from "@demo/context/ThemeContext";
import { useEffect } from "preact/hooks";
import "../../../css/index.css";
import "../styles/docs.css";

function ThemeSync() {
  const { setTheme } = useTheme();

  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      if (theme === "dark" || theme === "light") {
        setTheme(theme);
      }
    };

    // Initial sync
    updateTheme();

    // Observe changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          updateTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      observer.disconnect();
    };
  }, [setTheme]);

  return null;
}

export function SystemDemo({ children }: { children: any }) {
  return (
    <ConfigProvider>
      <ThemeProvider>
        <ThemeSync />
        {children}
      </ThemeProvider>
    </ConfigProvider>
  );
}
