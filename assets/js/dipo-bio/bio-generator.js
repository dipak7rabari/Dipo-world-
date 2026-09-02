/* =========================================================
   DIPO WORLD — DIPO BIO
   Bio Generator
   ========================================================= */

(function (window) {
  "use strict";

  window.DIPO = window.DIPO || {};
  window.DIPO.bio = window.DIPO.bio || {};

  const Generator = {
    clean(value) {
      return String(value || "").trim();
    },

    generate(profile = {}) {
      const name = this.clean(profile.name);
      const about = this.clean(profile.about);
      const location = this.clean(profile.location);
      const goal = this.clean(profile.goal);
      const emoji = this.clean(profile.emoji);

      const lines = [];

      if (name) lines.push(`${emoji ? emoji + " " : ""}${name}`);
      if (about) lines.push(about);
      if (goal) lines.push(`✦ ${goal}`);
      if (location) lines.push(`📍 ${location}`);

      return lines.join("\n");
    },

    createVariations(profile = {}) {
      const base = this.generate(profile);

      if (!base) return [];

      const symbols = [
        "♡",
        "✦",
        "୨ৎ",
        "☾",
        "𓆩♡𓆪",
        "꒰ ♡ ꒱"
      ];

      return symbols.map(symbol =>
        `${symbol} ${base}`
      );
    },

    fromTemplate(template, values = {}) {
      return String(template || "").replace(
        /\{\{\s*([\w]+)\s*\}\}/g,
        (_, key) => values[key] ?? ""
      );
    },

    splitLines(text = "") {
      return String(text)
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(Boolean);
    }
  };

  window.DIPO.bio.bioGenerator = Generator;

})(window);