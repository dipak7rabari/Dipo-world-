/* =========================================================
   DIPO QR — FRAME TEMPLATES
   ========================================================= */

(function (window) {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};
  DIPO.QR = DIPO.QR || {};

  const FRAMES = {

    none: {
      id: "none",
      name: "No Frame",
      background: "#ffffff",
      foreground: "#111827",
      title: "",
      subtitle: ""
    },

    cartoon: {
      id: "cartoon",
      name: "Cute Cartoon",
      background: "#eaf7f5",
      foreground: "#111827",
      title: "THANK YOU!",
      subtitle: "Scan Me"
    },

    cyberpunk: {
      id: "cyberpunk",
      name: "Cyberpunk Neon",
      background: "#0b1020",
      foreground: "#00f5ff",
      title: "SCAN",
      subtitle: "DIPO QR"
    },

    luxury: {
      id: "luxury",
      name: "Gold Luxury",
      background: "#101010",
      foreground: "#d6b36a",
      title: "SCAN TO CONNECT",
      subtitle: "DIPO QR"
    },

    pastel: {
      id: "pastel",
      name: "Pastel Aesthetic",
      background: "#fff0f7",
      foreground: "#1f2937",
      title: "SCAN ME ♡",
      subtitle: "dipo QR"
    }
  };

  function getAll() {
    return Object.values(FRAMES);
  }

  function get(id) {
    return FRAMES[id] || FRAMES.none;
  }

  function apply(id) {
    const frame = get(id);

    DIPO.QR.setState({
      frame: frame.id
    });

    return frame;
  }

  DIPO.QR.Frames = {
    all: FRAMES,
    getAll,
    get,
    apply
  };

})(window);