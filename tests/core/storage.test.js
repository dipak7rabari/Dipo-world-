import {
  describe,
  it,
  expect,
  beforeEach
} from "vitest";

describe("DIPO Storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should store a value", () => {
    localStorage.setItem("dipo_test", "DIPO LABS");

    expect(localStorage.getItem("dipo_test"))
      .toBe("DIPO LABS");
  });

  it("should retrieve stored JSON", () => {
    const data = {
      name: "DIPO LABS",
      version: "1.0.0"
    };

    localStorage.setItem(
      "dipo_config",
      JSON.stringify(data)
    );

    const result = JSON.parse(
      localStorage.getItem("dipo_config")
    );

    expect(result).toEqual(data);
  });

  it("should remove stored data", () => {
    localStorage.setItem("dipo_test", "value");

    localStorage.removeItem("dipo_test");

    expect(localStorage.getItem("dipo_test"))
      .toBeNull();
  });

  it("should clear all DIPO test data", () => {
    localStorage.setItem("dipo_a", "1");
    localStorage.setItem("dipo_b", "2");

    localStorage.clear();

    expect(localStorage.length).toBe(0);
  });

  it("should handle empty storage", () => {
    expect(localStorage.getItem("missing_key"))
      .toBeNull();
  });
});