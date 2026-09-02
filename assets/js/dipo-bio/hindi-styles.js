/* =========================================================
   DIPO WORLD — DIPO BIO
   Hindi / Devanagari Friendly Styles
   ========================================================= */

(function (window) {
  "use strict";

  window.DIPO = window.DIPO || {};
  window.DIPO.bio = window.DIPO.bio || {};

  const styles = {
    royal: {
      prefix: "༺ ",
      suffix: " ༻"
    },

    cute: {
      prefix: "♡ ",
      suffix: " ୨ৎ"
    },

    aesthetic: {
      prefix: "୨ৎ⋆｡°✩ ",
      suffix: " ✩°｡⋆୨ৎ"
    },

    moon: {
      prefix: "☾ ",
      suffix: " ☽"
    },

    sparkle: {
      prefix: "✦ ",
      suffix: " ✦"
    },

    flower: {
      prefix: "°❀⋆.ೃ࿔*:･ ",
      suffix: " °❀⋆.ೃ࿔*:･"
    },

    dark: {
      prefix: "𓆩 ",
      suffix: " 𓆪"
    },

    soft: {
      prefix: "꒰ ",
      suffix: " ꒱"
    },

    heartLine: {
      prefix: "♡────୨ৎ────♡\n",
      suffix: "\n♡────୨ৎ────♡"
    }
  };

  function decorate(text, style) {
    const config = styles[style];

    if (!config) return text;

    return `${config.prefix}${text}${config.suffix}`;
  }

  function preserveHindi(text) {
    return String(text || "")
      .replace(/\r\n/g, "\n")
      .trim();
  }

  const HindiStyles = {
    styles,

    apply(text, style = "cute") {
      return decorate(
        preserveHindi(text),
        style
      );
    },

    all(text = "") {
      const result = {
        original: text
      };

      Object.keys(styles).forEach(key => {
        result[key] = this.apply(text, key);
      });

      return result;
    },

    isHindi(text = "") {
      return /[\u0900-\u097F]/.test(text);
    },

    isMixed(text = "") {
      const hasHindi = /[\u0900-\u097F]/.test(text);
      const hasLatin = /[A-Za-z]/.test(text);

      return hasHindi && hasLatin;
    }
  };

  window.DIPO.bio.hindiStyles = HindiStyles;

})(window);