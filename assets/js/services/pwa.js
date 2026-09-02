/* =========================================================
   DIPO WORLD — PWA SERVICE
   Handles Service Worker registration and PWA events.
========================================================= */

(function (window, document) {
  "use strict";

  const PWA = {
    initialized: false,
    registration: null,
    deferredPrompt: null,

    init() {
      if (this.initialized) return;

      this.registerServiceWorker();
      this.setupInstallPrompt();

      this.initialized = true;
    },

    registerServiceWorker() {
      if (!("serviceWorker" in navigator)) {
        return;
      }

      window.addEventListener("load", async () => {
        try {
          const registration =
            await navigator.serviceWorker.register(
              "/service-worker.js",
              {
                scope: "/"
              }
            );

          this.registration = registration;

          window.dispatchEvent(
            new CustomEvent(
              "dipo:pwa-ready",
              {
                detail: registration
              }
            )
          );
        } catch (error) {
          console.warn(
            "DIPO World Service Worker registration failed.",
            error
          );
        }
      });
    },

    setupInstallPrompt() {
      window.addEventListener(
        "beforeinstallprompt",
        (event) => {
          event.preventDefault();

          this.deferredPrompt = event;

          window.dispatchEvent(
            new CustomEvent(
              "dipo:pwa-install-available"
            )
          );
        }
      );

      window.addEventListener(
        "appinstalled",
        () => {
          this.deferredPrompt = null;

          window.dispatchEvent(
            new CustomEvent(
              "dipo:pwa-installed"
            )
          );
        }
      );
    },

    async install() {
      if (!this.deferredPrompt) {
        return {
          success: false,
          reason: "not-available"
        };
      }

      try {
        await this.deferredPrompt.prompt();

        const result =
          await this.deferredPrompt.userChoice;

        this.deferredPrompt = null;

        return {
          success:
            result.outcome === "accepted",
          outcome: result.outcome
        };
      } catch (error) {
        return {
          success: false,
          reason: "error"
        };
      }
    },

    isStandalone() {
      return (
        window.matchMedia &&
        window.matchMedia(
          "(display-mode: standalone)"
        ).matches
      );
    }
  };

  window.DIPO = window.DIPO || {};
  window.DIPO.pwa = PWA;

})(window, document);