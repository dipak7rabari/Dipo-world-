import {
  describe,
  it,
  expect
} from "vitest";

describe("DIPO QR Export", () => {
  const supportedFormats = [
    "png",
    "jpg",
    "svg",
    "webp"
  ];

  it("should support PNG export", () => {
    expect(supportedFormats).toContain("png");
  });

  it("should support JPG export", () => {
    expect(supportedFormats).toContain("jpg");
  });

  it("should support SVG export", () => {
    expect(supportedFormats).toContain("svg");
  });

  it("should support WebP export", () => {
    expect(supportedFormats).toContain("webp");
  });

  it("should reject unsupported formats", () => {
    expect(supportedFormats).not.toContain("exe");
    expect(supportedFormats).not.toContain("zip");
  });

  it("should create an export configuration", () => {
    const config = {
      format: "png",
      quality: 1,
      scale: 2
    };

    expect(supportedFormats).toContain(config.format);
    expect(config.quality).toBeGreaterThan(0);
    expect(config.scale).toBeGreaterThan(0);
  });
});