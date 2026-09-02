/* =========================================================
   DIPO WORLD — DIPO QR
   Main QR Application Controller
   ========================================================= */

(function (window) {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};
  DIPO.QR = DIPO.QR || {};

  const DEFAULT_STATE = {
    mode: "qr",

    content: "",

    preset: "default",

    dots: "rounded",
    eyeFrame: "square",
    eyeDot: "square",

    foreground: "#111827",
    background: "#ffffff",

    size: 800,

    margin: 24,

    errorCorrection: "H",

    logo: null,

    frame: "none",

    watermark: true,

    watermarkText: "dipo QR",

    watermarkSubText: "Created with dipo World",

    barcodeFormat: "CODE128",

    silhouette: "none",

    barcodeWidth: 3,
    barcodeHeight: 160,

    transparent: false
  };

  let state = structuredClone
    ? structuredClone(DEFAULT_STATE)
    : JSON.parse(JSON.stringify(DEFAULT_STATE));

  function getState() {
    return { ...state };
  }

  function setState(updates = {}) {
    state = {
      ...state,
      ...updates
    };

    DIPO.QR.state = getState();

    document.dispatchEvent(
      new CustomEvent("dipo:qr-state-change", {
        detail: getState()
      })
    );

    return getState();
  }

  function reset() {
    state = {
      ...DEFAULT_STATE
    };

    DIPO.QR.state = getState();

    document.dispatchEvent(
      new CustomEvent("dipo:qr-reset", {
        detail: getState()
      })
    );

    return getState();
  }

  function setMode(mode) {
    if (!["qr", "barcode"].includes(mode)) {
      return false;
    }

    setState({
      mode
    });

    return true;
  }

  function validateContent() {
    if (!state.content || !state.content.trim()) {
      return {
        valid: false,
        message: "Please enter a link or text."
      };
    }

    return {
      valid: true,
      message: "Valid"
    };
  }

  function initialize() {
    DIPO.QR.state = getState();

    if (DIPO.QR.Recent && DIPO.QR.Recent.init) {
      DIPO.QR.Recent.init();
    }

    document.dispatchEvent(
      new CustomEvent("dipo:qr-ready", {
        detail: getState()
      })
    );
  }

  DIPO.QR.DEFAULT_STATE = DEFAULT_STATE;
  DIPO.QR.state = getState();

  DIPO.QR.getState = getState;
  DIPO.QR.setState = setState;
  DIPO.QR.reset = reset;
  DIPO.QR.setMode = setMode;
  DIPO.QR.validateContent = validateContent;
  DIPO.QR.init = initialize;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, {
      once: true
    });
  } else {
    initialize();
  }

})(window);