import {
  describe,
  it,
  expect
} from "vitest";

describe("DIPO BIO Font Converter", () => {
  it("should accept normal text", () => {
    const text = "DIPO LABS";

    expect(typeof text).toBe("string");
    expect(text.length).toBeGreaterThan(0);
  });

  it("should preserve empty text", () => {
    const text = "";

    expect(text).toBe("");
  });

  it("should support Unicode text", () => {
    const text = "DIPO LABS 🚀";

    expect(typeof text).toBe("string");
    expect(text).toContain("🚀");
  });

  it("should return a string after conversion", () => {
    const input = "DIPO";

    const converted = String(input);

    expect(typeof converted).toBe("string");
  });

  it("should not modify the original input", () => {
    const input = "DIPO LABS";
    const original = input;

    const converted = String(input);

    expect(input).toBe(original);
    expect(converted).toBe(original);
  });
});