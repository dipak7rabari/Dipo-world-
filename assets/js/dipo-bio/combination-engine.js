/* =========================================================
   DIPO WORLD — DIPO BIO
   Symbol Combination Engine
   ========================================================= */

(function (window) {
  "use strict";

  window.DIPO = window.DIPO || {};
  window.DIPO.bio = window.DIPO.bio || {};

  const presets = [
    "♡────୨ৎ────♡",
    "✦ ୨ৎ ♡ ୨ৎ ✦",
    "୨ৎ⋆｡°✩♡✩°｡⋆୨ৎ",
    "𓆩♡𓆩 ୨ৎ 𓆩♡𓆩",
    "꒰ ♡ ✦ ☾ ✦ ♡ ꒱",
    "♡ ⋆｡°✩ ⋆｡°✩ ♡",
    "☾ ⋆｡°✩ ୨ৎ ✩°｡⋆ ☽",
    "✧･ﾟ: *✧･ﾟ:* ♡ *:･ﾟ✧*:･ﾟ✧",
    "୨୧ ────── ୨୧",
    "𓆩 ✦ 𓆪 ♡ 𓆩 ✦ 𓆪",
    "꒰ა ♡ ໒꒱",
    "⋆ ˚｡⋆୨୧˚ ♡ ˚୨୧⋆｡˚ ⋆"
  ];

  const Engine = {
    getPresets() {
      return [...presets];
    },

    create(parts = []) {
      return parts
        .filter(Boolean)
        .join(" ");
    },

    surround(text, left, right) {
      return `${left}${text}${right}`;
    },

    line(text, symbol = "♡", width = 8) {
      const line = symbol.repeat(
        Math.max(1, width)
      );

      return `${line} ${text} ${line}`;
    },

    random() {
      return presets[
        Math.floor(Math.random() * presets.length)
      ];
    },

    generate(count = 20) {
      const result = [];

      for (let i = 0; i < count; i++) {
        result.push(this.random());
      }

      return [...new Set(result)];
    }
  };

  window.DIPO.bio.combinationEngine = Engine;

})(window);