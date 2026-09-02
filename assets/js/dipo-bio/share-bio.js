/* =========================================================
   DIPO WORLD — DIPO BIO
   Share / Copy Manager
   ========================================================= */

(function (window, document) {
  "use strict";

  window.DIPO = window.DIPO || {};
  window.DIPO.bio = window.DIPO.bio || {};

  async function copy(text) {
    const value = String(text || "");

    if (!value) return false;

    try {
      await navigator.clipboard.writeText(value);

      window.dispatchEvent(
        new CustomEvent("dipo:copied", {
          detail: { text: value }
        })
      );

      return true;
    } catch {
      const textarea =
        document.createElement("textarea");

      textarea.value = value;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);

      textarea.select();

      let success = false;

      try {
        success =
          document.execCommand("copy");
      } catch {
        success = false;
      }

      textarea.remove();

      return success;
    }
  }

  async function share(text, title = "DIPO BIO") {
    const value = String(text || "");

    if (!value) return false;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: value
        });

        return true;
      } catch {
        return false;
      }
    }

    return copy(value);
  }

  const Share = {
    copy,

    share,

    async copyFrom(element) {
      if (!element) return false;

      return copy(
        element.value ??
        element.textContent ??
        ""
      );
    },

    async shareFrom(element, title) {
      if (!element) return false;

      return share(
        element.value ??
        element.textContent ??
        "",
        title
      );
    }
  };

  window.DIPO.bio.shareBio = Share;

})(window, document);