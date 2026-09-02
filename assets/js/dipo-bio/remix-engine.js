/* =========================================================
   DIPO WORLD — DIPO BIO
   Bio Remix Engine
   ========================================================= */

(function (window) {
  "use strict";

  window.DIPO = window.DIPO || {};
  window.DIPO.bio = window.DIPO.bio || {};

  const Remix = {
    symbols: [
      "♡",
      "୨ৎ",
      "✦",
      "☾",
      "𓆩♡𓆪",
      "꒰ ♡ ꒱",
      "⋆｡°✩"
    ],

    decorate(text, style = "random") {
      const list = this.symbols;

      let left;
      let right;

      if (style === "cute") {
        left = "꒰ ";
        right = " ꒱";
      } else if (style === "dark") {
        left = "𓆩 ";
        right = " 𓆪";
      } else if (style === "heart") {
        left = "♡ ";
        right = " ♡";
      } else {
        left =
          list[Math.floor(Math.random() * list.length)];

        right =
          list[Math.floor(Math.random() * list.length)];
      }

      return `${left}${text}${right}`;
    },

    addLines(text) {
      const lines = String(text || "")
        .split(/\r?\n/)
        .filter(Boolean);

      return lines.map((line, index) => {
        const symbol =
          this.symbols[index % this.symbols.length];

        return `${symbol} ${line}`;
      }).join("\n");
    },

    shuffleLines(text) {
      const lines = String(text || "")
        .split(/\r?\n/)
        .filter(Boolean);

      for (let i = lines.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [lines[i], lines[j]] =
          [lines[j], lines[i]];
      }

      return lines.join("\n");
    },

    remix(text, options = {}) {
      let output = String(text || "");

      if (options.addSymbols) {
        output = this.addLines(output);
      }

      if (options.shuffle) {
        output = this.shuffleLines(output);
      }

      if (options.decorate) {
        output = this.decorate(
          output,
          options.style || "random"
        );
      }

      return output;
    }
  };

  window.DIPO.bio.remixEngine = Remix;

})(window);