/* =========================================================
   DIPO QR — BARCODE FORMATS
   ========================================================= */

(function (window) {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};
  DIPO.QR = DIPO.QR || {};

  const FORMATS = {

    CODE128: {
      id: "CODE128",
      name: "Code 128",
      description: "General purpose alphanumeric barcode",
      libraryFormat: "CODE128"
    },

    EAN13: {
      id: "EAN13",
      name: "EAN-13",
      description: "Standard retail barcode",
      libraryFormat: "EAN13"
    },

    UPCA: {
      id: "UPCA",
      name: "UPC-A",
      description: "Standard product barcode",
      libraryFormat: "UPC"
    }
  };

  function getAll() {
    return Object.values(FORMATS);
  }

  function get(id) {
    return FORMATS[id] || FORMATS.CODE128;
  }

  function validateValue(format, value) {

    const text =
      String(value || "").trim();

    if (!text) {
      return {
        valid: false,
        message: "Barcode value is empty."
      };
    }

    if (format === "EAN13") {

      if (!/^\d{12,13}$/.test(text)) {
        return {
          valid: false,
          message: "EAN-13 requires 12 or 13 digits."
        };
      }
    }

    if (format === "UPCA") {

      if (!/^\d{11,12}$/.test(text)) {
        return {
          valid: false,
          message: "UPC-A requires 11 or 12 digits."
        };
      }
    }

    return {
      valid: true,
      message: "Valid barcode value."
    };
  }

  DIPO.QR.BarcodeFormats = {
    all: FORMATS,
    getAll,
    get,
    validateValue
  };

})(window);