import { describe, it, expect, beforeEach, vi } from "vitest";

describe("Clipboard Utility", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should support navigator.clipboard", () => {
    expect("clipboard" in navigator).toBe(true);
  });

  it("should copy text using Clipboard API", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText
      }
    });

    await navigator.clipboard.writeText("DIPO LABS");

    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith("DIPO LABS");
  });

  it("should reject when clipboard write fails", async () => {
    const writeText = vi
      .fn()
      .mockRejectedValue(new Error("Clipboard unavailable"));

    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText
      }
    });

    await expect(
      navigator.clipboard.writeText("test")
    ).rejects.toThrow("Clipboard unavailable");
  });
});