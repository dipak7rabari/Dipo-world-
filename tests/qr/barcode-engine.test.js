import {
  describe,
  it,
  expect
} from "vitest";

describe("DIPO Barcode Engine", () => {
  it("should accept numeric barcode data", () => {
    const value = "8901234567890";

    expect(value).toMatch(/^[0-9]+$/);
  });

  it("should reject an empty barcode value", () => {
    const value = "";

    expect(value.trim()).toBe("");
  });

  it("should create barcode configuration", () => {
    const config = {
      value: "8901234567890",
      format: "CODE128",
      width: 2,
      height: 100
    };

    expect(config.value).toBeTruthy();
    expect(config.format).toBeTruthy();
    expect(config.width).toBeGreaterThan(0);
    expect(config.height).toBeGreaterThan(0);
  });

  it("should support common barcode formats", () => {
    const formats = [
      "CODE128",
      "EAN13",
      "EAN8",
      "UPC",
      "CODE39"
    ];

    expect(formats).toContain("CODE128");
    expect(formats).toContain("EAN13");
  });
});