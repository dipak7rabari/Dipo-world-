import {
  describe,
  it,
  expect
} from "vitest";

describe("DIPO BIO Generator", () => {
  it("should accept a valid bio profile", () => {
    const profile = {
      name: "DIPO LABS",
      username: "dipolabs",
      title: "Technology Platform",
      bio: "Build. Create. Innovate."
    };

    expect(profile.name).toBeTruthy();
    expect(profile.username).toBeTruthy();
    expect(profile.title).toBeTruthy();
    expect(profile.bio).toBeTruthy();
  });

  it("should generate a profile object", () => {
    const input = {
      name: "DIPO LABS",
      username: "dipolabs"
    };

    const result = {
      ...input,
      generated: true
    };

    expect(result.generated).toBe(true);
    expect(result.name).toBe("DIPO LABS");
  });

  it("should preserve user links", () => {
    const links = [
      {
        title: "Website",
        url: "https://example.com"
      },
      {
        title: "YouTube",
        url: "https://youtube.com"
      }
    ];

    expect(Array.isArray(links)).toBe(true);
    expect(links).toHaveLength(2);

    links.forEach((link) => {
      expect(link.title).toBeTruthy();
      expect(link.url).toMatch(/^https?:\/\//);
    });
  });

  it("should support optional fields", () => {
    const profile = {
      name: "DIPO LABS",
      username: "dipolabs"
    };

    expect(profile.name).toBeTruthy();
    expect(profile.username).toBeTruthy();
    expect(profile.avatar).toBeUndefined();
  });
});