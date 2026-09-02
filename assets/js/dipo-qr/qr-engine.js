/* =========================================================
   DIPO QR — QR ENGINE
   qr-code-styling adapter
   ========================================================= */

(function (window) {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};
  DIPO.QR = DIPO.QR || {};

  let currentQR = null;

  const DOTS = {
    rounded: "rounded",
    "extra-rounded": "extra-rounded",
    "classy-rounded": "classy-rounded",
    dots: "dots",
    square: "square"
  };

  const EYES = {
    square: "square",
    rounded: "rounded",
    "extra-rounded": "extra-rounded"
  };

  function getLibrary() {
    return window.QRCodeStyling || null;
  }

  function buildOptions(state) {
    return {
      width: state.size,
      height: state.size,

      type: "svg",

      data: state.content,

      margin: state.margin,

      qrOptions: {
        errorCorrectionLevel: state.errorCorrection || "H"
      },

      dotsOptions: {
        type: DOTS[state.dots] || "rounded",
        color: state.foreground
      },

      backgroundOptions: {
        color: state.transparent
          ? "transparent"
          : state.background
      },

      cornersSquareOptions: {
        type: EYES[state.eyeFrame] || "square",
        color: state.foreground
      },

      cornersDotOptions: {
        type: EYES[state.eyeDot] || "square",
        color: state.foreground
      }
    };
  }

  function create(options = {}) {
    const QRCodeStyling = getLibrary();

    if (!QRCodeStyling) {
      console.warn(
        "DIPO QR: qr-code-styling library is not loaded."
      );

      return null;
    }

    const state = {
      ...DIPO.QR.getState(),
      ...options
    };

    currentQR = new QRCodeStyling(
      buildOptions(state)
    );

    DIPO.QR.currentQR = currentQR;

    return currentQR;
  }

  function update(options = {}) {
    if (!currentQR) {
      return create(options);
    }

    const state = {
      ...DIPO.QR.getState(),
      ...options
    };

    currentQR.update(
      buildOptions(state)
    );

    return currentQR;
  }

  function render(container, options = {}) {
    if (!container) {
      return false;
    }

    const qr = currentQR || create(options);

    if (!qr) {
      return false;
    }

    container.innerHTML = "";

    qr.append(container);

    return true;
  }

  function getSVG() {
    if (!currentQR) {
      return null;
    }

    return currentQR;
  }

  DIPO.QR.Engine = {
    create,
    update,
    render,
    getSVG,
    buildOptions,
    getCurrent: () => currentQR
  };

})(window);