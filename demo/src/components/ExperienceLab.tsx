import { IntentPlayground } from "./IntentPlayground";
import { FearlessInjector } from "./FearlessInjector";

export function ExperienceLab() {
  return (
    <div
      className="surface-page"
      style={{ minHeight: "100vh", padding: "4rem 2rem" }}
    >
      <header style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1
          className="text-strong"
          style={{ fontSize: "2.5rem", marginBottom: "1rem" }}
        >
          The Experience Lab
        </h1>
        <p
          className="text-subtle"
          style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto" }}
        >
          Exploring the emotional side of the color system: Intuition and
          Safety.
        </p>
      </header>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "6rem",
        }}
      >
        <IntentPlayground />
        <FearlessInjector />
      </div>
    </div>
  );
}
