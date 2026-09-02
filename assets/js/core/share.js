/* =========================================================
   DIPO WORLD — SHARE SYSTEM
   File: assets/js/core/share.js
   ========================================================= */

(() => {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};

  async function share(options = {}) {
    const {
      title = "DIPO WORLD",
      text = "",
      url = window.location.href
    } = options;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url
        });

        return {
          success: true,
          method: "native"
        };

      } catch (error) {
        if (error.name === "AbortError") {
          return {
            success: false,
            cancelled: true
          };
        }
      }
    }

    const shareURL = buildShareURL({
      title,
      text,
      url
    });

    window.open(
      shareURL,
      "_blank",
      "noopener,noreferrer"
    );

    return {
      success: true,
      method: "web"
    };
  }

  function buildShareURL({ text, url }) {
    const message =
      `${text ? text + "\n" : ""}${url}`;

    return `https://wa.me/?text=${encodeURIComponent(
      message
    )}`;
  }

  async function copyCurrentURL() {
    const success =
      await DIPO.clipboard.copy(
        window.location.href
      );

    if (success) {
      DIPO.toast.success("Link copied!");
    }

    return success;
  }

  DIPO.share = {
    share,
    copyCurrentURL
  };

})();