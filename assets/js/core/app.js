/* =========================================================
   DIPO WORLD — APP BOOTSTRAP
   File: assets/js/core/app.js
   ========================================================= */

(() => {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};

  const APP_CONFIG = {
    name: "DIPO WORLD",
    version: "1.0.0",
    brand: "dipo World",
    products: [
      "DIPO BIO",
      "DIPO QR"
    ]
  };

  let initialized = false;

  async function init() {
    if (initialized) return;

    try {
      DIPO.config = APP_CONFIG;

      /* Error system first */
      DIPO.errorHandler?.init();

      /* Theme */
      DIPO.theme?.init();

      /* Global events */
      setupGlobalEvents();

      /* App state */
      DIPO.state?.set({
        app: {
          name: APP_CONFIG.name,
          version: APP_CONFIG.version,
          ready: false
        }
      });

      /* Mark app ready */
      initialized = true;

      DIPO.state?.set({
        app: {
          ready: true
        }
      });

      DIPO.events?.emit(
        "app:ready",
        {
          config: APP_CONFIG
        }
      );

      document.documentElement.classList.add(
        "dipo-ready"
      );

      console.log(
        `%c${APP_CONFIG.name} v${APP_CONFIG.version}`,
        "font-weight:700;"
      );

    } catch (error) {
      DIPO.errorHandler?.capture(
        error,
        {
          source: "app:init"
        }
      );
    }
  }

  function setupGlobalEvents() {
    window.addEventListener(
      "online",
      () => {
        DIPO.events?.emit(
          "network:online"
        );

        DIPO.toast?.success(
          "You're back online."
        );
      }
    );

    window.addEventListener(
      "offline",
      () => {
        DIPO.events?.emit(
          "network:offline"
        );

        DIPO.toast?.warning(
          "You're offline."
        );
      }
    );

    document.addEventListener(
      "click",
      handleGlobalClick
    );
  }

  function handleGlobalClick(event) {
    const copyButton =
      event.target.closest(
        "[data-dipo-copy]"
      );

    if (copyButton) {
      const text =
        copyButton.dataset.dipoCopy;

      DIPO.clipboard
        ?.copy(text)
        .then((success) => {
          if (success) {
            DIPO.toast?.success(
              "Copied!"
            );
          }
        });

      return;
    }

    const shareButton =
      event.target.closest(
        "[data-dipo-share]"
      );

    if (shareButton) {
      DIPO.share?.share({
        title:
          shareButton.dataset.title ||
          "DIPO WORLD",

        text:
          shareButton.dataset.text ||
          "Made with DIPO WORLD",

        url:
          shareButton.dataset.url ||
          window.location.href
      });

      return;
    }

    const themeButton =
      event.target.closest(
        "[data-dipo-theme]"
      );

    if (themeButton) {
      DIPO.theme?.set(
        themeButton.dataset.dipoTheme
      );
    }
  }

  function getConfig() {
    return APP_CONFIG;
  }

  function isReady() {
    return initialized;
  }

  DIPO.app = {
    init,
    getConfig,
    isReady
  };

  /*
   * Start automatically after DOM is ready.
   */
  DIPO.utils?.waitForDOM()
    .then(() => DIPO.app.init());

})();