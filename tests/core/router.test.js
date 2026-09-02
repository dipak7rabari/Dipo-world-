import { describe, it, expect } from "vitest";

describe("DIPO Router", () => {
  const routes = [
    "/",
    "/pages/home/",
    "/pages/about/",
    "/pages/contact/",
    "/pages/copyright/",
    "/pages/privacy/",
    "/pages/terms/",
    "/pages/favorites/",
    "/pages/recent/",
    "/pages/disclaimer/",
    "/pages/dipo-bio/",
    "/pages/dipo-qr/"
  ];

  it("should contain the main route", () => {
    expect(routes).toContain("/");
  });

  it("should contain required legal pages", () => {
    expect(routes).toContain("/pages/privacy/");
    expect(routes).toContain("/pages/terms/");
    expect(routes).toContain("/pages/copyright/");
    expect(routes).toContain("/pages/disclaimer/");
  });

  it("should contain DIPO BIO route", () => {
    expect(routes).toContain("/pages/dipo-bio/");
  });

  it("should contain DIPO QR route", () => {
    expect(routes).toContain("/pages/dipo-qr/");
  });

  it("should not contain duplicate routes", () => {
    const uniqueRoutes = new Set(routes);

    expect(uniqueRoutes.size).toBe(routes.length);
  });

  it("should use valid absolute paths", () => {
    routes.forEach((route) => {
      expect(route.startsWith("/")).toBe(true);
    });
  });
});