/* =========================================================
   DIPO QR — SILHOUETTE ENGINE
   ========================================================= */

(function (window) {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};
  DIPO.QR = DIPO.QR || {};

  const SHAPES = {

    none: {
      id: "none",
      name: "Standard",
      path: null
    },

    paw: {
      id: "paw",
      name: "Paw",
      path: `
        M50 82
        C35 82 27 72 30 60
        C32 52 39 48 45 49
        C40 39 42 29 50 26
        C58 29 60 39 55 49
        C62 48 68 52 70 60
        C73 72 65 82 50 82Z
      `
    },

    heart: {
      id: "heart",
      name: "Heart",
      path: `
        M50 86
        C44 80 18 62 18 39
        C18 25 35 17 50 31
        C65 17 82 25 82 39
        C82 62 56 80 50 86Z
      `
    },

    flame: {
      id: "flame",
      name: "Flame",
      path: `
        M50 90
        C30 82 24 68 31 52
        C34 45 41 39 43 25
        C55 34 62 43 59 54
        C67 49 72 42 71 34
        C84 50 80 70 69 80
        C62 87 56 90 50 90Z
      `
    },

    ghost: {
      id: "ghost",
      name: "Ghost",
      path: `
        M25 82
        V48
        C25 27 36 16 50 16
        C64 16 75 27 75 48
        V82
        L68 76
        L61 82
        L54 76
        L47 82
        L40 76
        L33 82
        Z
      `
    }
  };

  function getAll() {
    return Object.values(SHAPES);
  }

  function get(id) {
    return SHAPES[id] || SHAPES.none;
  }

  function createSVG(id, options = {}) {

    const shape = get(id);

    if (!shape.path) {
      return null;
    }

    const size =
      options.size || 200;

    const color =
      options.color || "#111827";

    const svgNS =
      "http://www.w3.org/2000/svg";

    const svg =
      document.createElementNS(
        svgNS,
        "svg"
      );

    svg.setAttribute(
      "viewBox",
      "0 0 100 100"
    );

    svg.setAttribute(
      "width",
      size
    );

    svg.setAttribute(
      "height",
      size
    );

    const path =
      document.createElementNS(
        svgNS,
        "path"
      );

    path.setAttribute(
      "d",
      shape.path
    );

    path.setAttribute(
      "fill",
      color
    );

    svg.appendChild(path);

    return svg;
  }

  DIPO.QR.Silhouette = {
    all: SHAPES,
    getAll,
    get,
    createSVG
  };

})(window);