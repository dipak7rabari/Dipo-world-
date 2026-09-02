/* =========================================================
   DIPO WORLD — ACCESSIBILITY SERVICE
   Handles keyboard navigation, reduced motion,
   focus visibility and basic accessibility helpers.
========================================================= */

(function (window, document) {
  "use strict";

  const Accessibility = {
    initialized: false,

    init() {
      if (this.initialized) return;

      this.setupKeyboardFocus();
      this.setupReducedMotion();
      this.setupEscapeKey();
      this.setupAriaHelpers();

      this.initialized = true;

      window.dispatchEvent(
        new CustomEvent("dipo:accessibility-ready")
      );
    },

    setupKeyboardFocus() {
      let usingKeyboard = false;

      document.addEventListener("keydown", (event) => {
        if (event.key === "Tab") {
          usingKeyboard = true;
          document.documentElement.classList.add(
            "keyboard-navigation"
          );
        }
      });

      document.addEventListener("mousedown", () => {
        if (usingKeyboard) {
          usingKeyboard = false;
          document.documentElement.classList.remove(
            "keyboard-navigation"
          );
        }
      });

      document.addEventListener("touchstart", () => {
        if (usingKeyboard) {
          usingKeyboard = false;
          document.documentElement.classList.remove(
            "keyboard-navigation"
          );
        }
      });
    },

    setupReducedMotion() {
      const mediaQuery = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

      const update = () => {
        document.documentElement.classList.toggle(
          "reduce-motion",
          mediaQuery.matches
        );
      };

      update();

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", update);
      }
    },

    setupEscapeKey() {
      document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;

        window.dispatchEvent(
          new CustomEvent("dipo:escape")
        );
      });
    },

    setupAriaHelpers() {
      document.addEventListener("click", (event) => {
        const button = event.target.closest(
          "[data-aria-label]"
        );

        if (!button) return;

        const label = button.getAttribute(
          "data-aria-label"
        );

        if (label) {
          button.setAttribute("aria-label", label);
        }
      });
    },

    announce(message) {
      if (!message) return;

      let liveRegion = document.getElementById(
        "dipo-live-region"
      );

      if (!liveRegion) {
        liveRegion = document.createElement("div");

        liveRegion.id = "dipo-live-region";
        liveRegion.className = "sr-only";
        liveRegion.setAttribute("aria-live", "polite");
        liveRegion.setAttribute("aria-atomic", "true");

        document.body.appendChild(liveRegion);
      }

      liveRegion.textContent = "";

      requestAnimationFrame(() => {
        liveRegion.textContent = message;
      });
    }
  };

  window.DIPO = window.DIPO || {};
  window.DIPO.accessibility = Accessibility;

})(window, document);