/* =========================================================
   DIPO WORLD — ERROR HANDLER
   File: assets/js/core/error-handler.js
   ========================================================= */

(() => {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};

  const errors = [];

  const MAX_ERRORS = 50;

  function capture(error, context = {}) {
    const entry = {
      message:
        error?.message ||
        String(error),

      stack:
        error?.stack ||
        null,

      context,

      timestamp:
        new Date().toISOString()
    };

    errors.push(entry);

    if (errors.length > MAX_ERRORS) {
      errors.shift();
    }

    console.error(
      "DIPO WORLD Error:",
      entry
    );

    DIPO.events?.emit(
      "error",
      entry
    );

    return entry;
  }

  function getErrors() {
    return [...errors];
  }

  function clear() {
    errors.length = 0;
  }

  function init() {
    window.addEventListener(
      "error",
      (event) => {
        capture(
          event.error || event.message,
          {
            source: "window"
          }
        );
      }
    );

    window.addEventListener(
      "unhandledrejection",
      (event) => {
        capture(
          event.reason,
          {
            source:
              "unhandled-promise"
          }
        );
      }
    );
  }

  DIPO.errorHandler = {
    init,
    capture,
    getErrors,
    clear
  };

})();