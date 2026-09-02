/* =========================================================
   DIPO QR — BARCODE ENGINE
   JsBarcode adapter
   ========================================================= */

(function (window) {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};
  DIPO.QR = DIPO.QR || {};

  let currentSVG = null;

  function getLibrary() {
    return window.JsBarcode || null;
  }

  function generate(svgElement, value, options = {}) {

    const JsBarcode = getLibrary();

    if (!JsBarcode) {
      console.warn(
        "DIPO QR: JsBarcode library is not loaded."
      );

      return null;
    }

    if (!svgElement) {
      throw new Error(
        "SVG element is required."
      );
    }

    const state = DIPO.QR.getState();

    const settings = {
      format: options.format || state.barcodeFormat || "CODE128",

      lineColor:
        options.lineColor ||
        state.foreground ||
        "#111827",

      background:
        options.background ||
        state.background ||
        "#ffffff",

      width:
        options.width ||
        state.barcodeWidth ||
        3,

      height:
        options.height ||
        state.barcodeHeight ||
        160,

      displayValue:
        options.displayValue !== undefined
          ? options.displayValue
          : true,

      margin:
        options.margin !== undefined
          ? options.margin
          : 20
    };

    JsBarcode(
      svgElement,
      value,
      settings
    );

    currentSVG = svgElement;

    DIPO.QR.currentBarcode = svgElement;

    return svgElement;
  }

  function getCurrent() {
    return currentSVG;
  }

  DIPO.QR.BarcodeEngine = {
    generate,
    getCurrent
  };

})(window);