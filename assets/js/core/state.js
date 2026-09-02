/* =========================================================
   DIPO WORLD — GLOBAL STATE
   File: assets/js/core/state.js
   ========================================================= */

(() => {
  "use strict";

  const defaultState = {
    app: {
      name: "DIPO WORLD",
      version: "1.0.0",
      ready: false,
      currentPage: "home"
    },

    ui: {
      theme: "system",
      mobileMenuOpen: false,
      modalOpen: false,
      loading: false
    },

    dipoBio: {
      text: "",
      selectedCategory: "all",
      searchQuery: "",
      favorites: [],
      recent: []
    },

    dipoQR: {
      mode: "artistic-qr",
      value: "",
      preset: null,
      frame: null,
      logo: null,
      barcodeFormat: "CODE128",
      silhouette: null
    }
  };

  let state = structuredCloneSafe(defaultState);

  const listeners = new Set();

  function structuredCloneSafe(object) {
    try {
      return structuredClone(object);
    } catch {
      return JSON.parse(JSON.stringify(object));
    }
  }

  function getState() {
    return state;
  }

  function setState(updates = {}) {
    state = deepMerge(state, updates);
    notify();
    return state;
  }

  function resetState() {
    state = structuredCloneSafe(defaultState);
    notify();
    return state;
  }

  function subscribe(callback) {
    if (typeof callback !== "function") return () => {};

    listeners.add(callback);

    return () => {
      listeners.delete(callback);
    };
  }

  function notify() {
    listeners.forEach((callback) => {
      try {
        callback(state);
      } catch (error) {
        console.error("DIPO WORLD state listener error:", error);
      }
    });
  }

  function deepMerge(target, source) {
    const output = structuredCloneSafe(target);

    Object.keys(source).forEach((key) => {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key]) &&
        output[key] &&
        typeof output[key] === "object" &&
        !Array.isArray(output[key])
      ) {
        output[key] = deepMerge(output[key], source[key]);
      } else {
        output[key] = source[key];
      }
    });

    return output;
  }

  window.DIPO = window.DIPO || {};

  window.DIPO.state = {
    get: getState,
    set: setState,
    reset: resetState,
    subscribe
  };

})();