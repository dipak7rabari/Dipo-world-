/* =========================================================
   DIPO QR — QUICK PRESETS
   ========================================================= */

(function (window) {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};
  DIPO.QR = DIPO.QR || {};

  const PRESETS = {

    default: {
      id: "default",
      name: "Modern",
      foreground: "#111827",
      background: "#ffffff",
      dots: "rounded",
      eyeFrame: "square",
      eyeDot: "square",
      frame: "none"
    },

    instagram: {
      id: "instagram",
      name: "Instagram",
      foreground: "#c13584",
      background: "#fff7fb",
      dots: "rounded",
      eyeFrame: "rounded",
      eyeDot: "rounded",
      frame: "pastel"
    },

    telegram: {
      id: "telegram",
      name: "Telegram",
      foreground: "#229ed9",
      background: "#f0f9ff",
      dots: "rounded",
      eyeFrame: "extra-rounded",
      eyeDot: "rounded",
      frame: "none"
    },

    whatsapp: {
      id: "whatsapp",
      name: "WhatsApp",
      foreground: "#128c7e",
      background: "#f0fff8",
      dots: "rounded",
      eyeFrame: "rounded",
      eyeDot: "rounded",
      frame: "pastel"
    },

    youtube: {
      id: "youtube",
      name: "YouTube",
      foreground: "#dc2626",
      background: "#ffffff",
      dots: "square",
      eyeFrame: "rounded",
      eyeDot: "rounded",
      frame: "none"
    },

    upi: {
      id: "upi",
      name: "UPI",
      foreground: "#312e81",
      background: "#eef2ff",
      dots: "classy-rounded",
      eyeFrame: "rounded",
      eyeDot: "rounded",
      frame: "luxury"
    }
  };

  function getAll() {
    return Object.values(PRESETS);
  }

  function get(id) {
    return PRESETS[id] || PRESETS.default;
  }

  function apply(id) {
    const preset = get(id);

    DIPO.QR.setState({
      ...preset
    });

    return preset;
  }

  DIPO.QR.Presets = {
    all: PRESETS,
    getAll,
    get,
    apply
  };

})(window);