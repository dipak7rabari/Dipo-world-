/* =========================================================
   DIPO QR — SAFETY / VALIDATION
   ========================================================= */

(function (window) {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};
  DIPO.QR = DIPO.QR || {};

  function validateURL(value) {
    try {
      const url = new URL(value);

      return [
        "http:",
        "https:"
      ].includes(url.protocol);

    } catch {
      return false;
    }
  }

  function validateUPI(value) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+$/.test(
      value.trim()
    );
  }

  function validatePhone(value) {
    return /^[+0-9\s()-]{7,20}$/.test(
      value.trim()
    );
  }

  function validate(value) {

    if (!value || !value.trim()) {
      return {
        valid: false,
        type: "empty",
        message: "Enter something to generate a QR."
      };
    }

    const text = value.trim();

    if (validateURL(text)) {
      return {
        valid: true,
        type: "url",
        message: "Valid URL"
      };
    }

    if (validateUPI(text)) {
      return {
        valid: true,
        type: "upi",
        message: "Valid UPI ID"
      };
    }

    if (validatePhone(text)) {
      return {
        valid: true,
        type: "phone",
        message: "Valid phone number"
      };
    }

    return {
      valid: true,
      type: "text",
      message: "Text QR"
    };
  }

  function getSafeErrorCorrection() {
    return "H";
  }

  DIPO.QR.Safety = {
    validate,
    validateURL,
    validateUPI,
    validatePhone,
    getSafeErrorCorrection
  };

})(window);