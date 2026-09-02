/* =========================================================
   DIPO WORLD — DIPO BIO
   Character Counter Engine
   ========================================================= */

(function (window) {
  "use strict";

  window.DIPO = window.DIPO || {};
  window.DIPO.bio = window.DIPO.bio || {};

  const Counter = {
    count(text = "") {
      const value = String(text);

      return {
        characters: Array.from(value).length,
        charactersWithoutSpaces: Array.from(
          value.replace(/\s/g, "")
        ).length,
        words: value.trim() ? value.trim().split(/\s+/).length : 0,
        lines: value ? value.split(/\r?\n/).length : 0,
        bytes: new TextEncoder().encode(value).length
      };
    },

    instagram(text = "") {
      const result = this.count(text);

      return {
        ...result,
        limit: 150,
        remaining: Math.max(0, 150 - result.characters),
        exceeded: result.characters > 150,
        percentage: Math.min(
          100,
          Math.round((result.characters / 150) * 100)
        )
      };
    },

    update(element, text) {
      if (!element) return this.count(text);

      const result = this.instagram(text);

      element.textContent =
        `${result.characters}/150`;

      element.dataset.exceeded = result.exceeded
        ? "true"
        : "false";

      return result;
    }
  };

  window.DIPO.bio.characterCounter = Counter;

})(window);