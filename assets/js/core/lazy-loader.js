/* =========================================================
   DIPO WORLD — LAZY LOADER
   File: assets/js/core/lazy-loader.js
   ========================================================= */

(() => {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};

  const loaded = new Map();

  async function script(src, options = {}) {
    if (loaded.has(src)) {
      return loaded.get(src);
    }

    const promise = new Promise(
      (resolve, reject) => {
        const existing =
          document.querySelector(
            `script[src="${src}"]`
          );

        if (existing) {
          existing.addEventListener(
            "load",
            resolve,
            { once: true }
          );

          existing.addEventListener(
            "error",
            reject,
            { once: true }
          );

          return;
        }

        const element =
          document.createElement("script");

        element.src = src;

        element.async =
          options.async !== false;

        element.defer =
          options.defer !== false;

        element.onload = resolve;

        element.onerror = () => {
          loaded.delete(src);

          reject(
            new Error(
              `Failed to load script: ${src}`
            )
          );
        };

        document.head.appendChild(
          element
        );
      }
    );

    loaded.set(src, promise);

    return promise;
  }

  async function module(src) {
    if (loaded.has(src)) {
      return loaded.get(src);
    }

    const promise = import(src);

    loaded.set(src, promise);

    return promise;
  }

  function isLoaded(src) {
    return loaded.has(src);
  }

  function remove(src) {
    loaded.delete(src);
  }

  DIPO.lazyLoader = {
    script,
    module,
    isLoaded,
    remove
  };

})();