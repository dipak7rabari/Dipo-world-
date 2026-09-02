/* =========================================================
   DIPO WORLD — THEME ENGINE
   File: assets/js/core/theme.js
   ========================================================= */

(() => {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};

  const STORAGE_KEY = "theme";

  function getSystemTheme() {
    return window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
      ? "dark"
      : "light";
  }

  function apply(theme) {
    const resolved =
      theme === "system"
        ? getSystemTheme()
        : theme;

    document.documentElement.dataset.theme =
      resolved;

    document.documentElement.dataset.themeMode =
      theme;

    DIPO.storage.set(STORAGE_KEY, theme);

    if (DIPO.state) {
      DIPO.state.set({
        ui: {
          theme
        }
      });
    }

    return resolved;
  }

  function set(theme) {
    const allowed = [
      "light",
      "dark",
      "system"
    ];

    if (!allowed.includes(theme)) {
      theme = "system";
    }

    return apply(theme);
  }

  function get() {
    return (
      DIPO.storage.get(
        STORAGE_KEY,
        "system"
      )
    );
  }

  function init() {
    set(get());

    const mediaQuery =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

    mediaQuery.addEventListener(
      "change",
      () => {
        if (get() === "system") {
          apply("system");
        }
      }
    );
  }

  DIPO.theme = {
    init,
    get,
    set,
    getSystemTheme
  };

})();