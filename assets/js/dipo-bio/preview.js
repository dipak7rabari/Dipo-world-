/* =========================================================
   DIPO WORLD — DIPO BIO
   Live Preview Manager
   ========================================================= */

(function (window, document) {
  "use strict";

  window.DIPO = window.DIPO || {};
  window.DIPO.bio = window.DIPO.bio || {};

  const Preview = {
    escapeHTML(value = "") {
      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    },

    format(text = "") {
      return this.escapeHTML(text)
        .replace(/\n/g, "<br>");
    },

    render(element, text, options = {}) {
      if (!element) return;

      element.innerHTML = this.format(text);

      if (options.className) {
        element.classList.add(
          options.className
        );
      }

      element.dispatchEvent(
        new CustomEvent("dipo:bio-preview-updated", {
          detail: { text, options }
        })
      );
    },

    bind(input, preview, counter) {
      if (!input || !preview) return;

      const update = () => {
        const text = input.value || "";

        this.render(preview, text);

        if (
          counter &&
          window.DIPO.bio.characterCounter
        ) {
          window.DIPO.bio.characterCounter.update(
            counter,
            text
          );
        }
      };

      input.addEventListener("input", update);

      update();
    }
  };

  window.DIPO.bio.preview = Preview;

})(window, document);