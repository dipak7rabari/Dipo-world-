/* =========================================================
   DIPO WORLD — CLIPBOARD
   File: assets/js/core/clipboard.js
   ========================================================= */

(() => {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};

  async function copy(text) {
    if (!text) return false;

    try {
      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(String(text));
        return true;
      }

      return fallbackCopy(String(text));

    } catch (error) {
      console.warn("Clipboard failed:", error);
      return fallbackCopy(String(text));
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");

    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    let success = false;

    try {
      success = document.execCommand("copy");
    } catch {
      success = false;
    }

    textarea.remove();

    return success;
  }

  DIPO.clipboard = {
    copy
  };

})();