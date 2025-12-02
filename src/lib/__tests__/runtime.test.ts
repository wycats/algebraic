import { describe, expect, it, vi } from "vitest";
import { injectTheme } from "../runtime.ts";

describe("Runtime", () => {
  describe("injectTheme", () => {
    it("should create a style element and append it to head if no target provided", () => {
      // Mock document
      const styleMock = { textContent: "" };
      const headMock = { appendChild: vi.fn() };
      const createElementMock = vi.fn().mockReturnValue(styleMock);

      vi.stubGlobal("document", {
        createElement: createElementMock,
        head: headMock,
      });

      const css = ".foo { color: red; }";
      const result = injectTheme(css);

      expect(createElementMock).toHaveBeenCalledWith("style");
      expect(styleMock.textContent).toBe(css);
      expect(headMock.appendChild).toHaveBeenCalledWith(styleMock);
      expect(result).toBe(styleMock);

      vi.unstubAllGlobals();
    });

    it("should append to target if provided", () => {
      const styleMock = { textContent: "" };
      const targetMock = { appendChild: vi.fn() };
      const createElementMock = vi.fn().mockReturnValue(styleMock);

      vi.stubGlobal("document", {
        createElement: createElementMock,
      });

      const css = ".foo { color: blue; }";
      injectTheme(css, targetMock as any);

      expect(targetMock.appendChild).toHaveBeenCalledWith(styleMock);

      vi.unstubAllGlobals();
    });

    it("should update existing style element if provided", () => {
      const styleMock = { textContent: "old" };
      const createElementMock = vi.fn();

      vi.stubGlobal("document", {
        createElement: createElementMock,
      });

      const css = ".foo { color: green; }";
      injectTheme(css, undefined, styleMock as any);

      expect(createElementMock).not.toHaveBeenCalled();
      expect(styleMock.textContent).toBe(css);

      vi.unstubAllGlobals();
    });
  });
});
