/* =========================================================
   DIPO QR — BARCODE PRESETS
   ========================================================= */

(function (window) {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};
  DIPO.QR = DIPO.QR || {};

  const PRESETS = {

    standard: {
      id: "standard",
      name: "Standard",
      format: "CODE128",
      silhouette: "none",
      foreground: "#111827",
      background: "#ffffff"
    },

    paw: {
      id: "paw",
      name: "Paw",
      format: "CODE128",
      silhouette: "paw",
      foreground: "#111827",
      background: "#ffffff"
    },

    heart: {
      id: "heart",
      name: "Heart",
      format: "CODE128",
      silhouette: "heart",
      foreground: "#111827",
      background: "#fff7fb"
    },

    flame: {
      id: "flame",
      name: "Flame",
      format: "CODE128",
      silhouette: "flame",
      foreground: "#111827",
      background: "#fffaf0"
    },

    ghost: {
      id: "ghost",
      name: "Ghost",
      format: "CODE128",
      silhouette: "ghost",
      foreground: "#111827",
      background: "#f7f7ff"
    }
  };

  function getAll() {
    return Object.values(PRESETS);
  }

  function get(id) {
    return PRESETS[id] || PRESETS.standard;
  }

  function apply(id) {

    const preset = get(id);

    DIPO.QR.setState({
      ...preset,
      preset: id
    });

    return preset;
  }

  DIPO.QR.BarcodePresets = {
    all: PRESETS,
    getAll,
    get,
    apply
  };

})(window);