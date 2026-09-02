/* =========================================================
   DIPO WORLD — STORAGE
   File: assets/js/core/storage.js
   ========================================================= */

(() => {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};

  const PREFIX = "dipo_world_";

  function makeKey(key) {
    return `${PREFIX}${key}`;
  }

  function set(key, value) {
    try {
      localStorage.setItem(
        makeKey(key),
        JSON.stringify(value)
      );

      return true;
    } catch (error) {
      console.warn("DIPO storage write failed:", error);
      return false;
    }
  }

  function get(key, fallback = null) {
    try {
      const value = localStorage.getItem(makeKey(key));

      if (value === null) return fallback;

      return JSON.parse(value);
    } catch (error) {
      console.warn("DIPO storage read failed:", error);
      return fallback;
    }
  }

  function remove(key) {
    try {
      localStorage.removeItem(makeKey(key));
      return true;
    } catch {
      return false;
    }
  }

  function clear() {
    try {
      Object.keys(localStorage)
        .filter((key) => key.startsWith(PREFIX))
        .forEach((key) => localStorage.removeItem(key));

      return true;
    } catch {
      return false;
    }
  }

  function has(key) {
    return localStorage.getItem(makeKey(key)) !== null;
  }

  function keys() {
    return Object.keys(localStorage)
      .filter((key) => key.startsWith(PREFIX))
      .map((key) => key.replace(PREFIX, ""));
  }

  function setJSON(key, value) {
    return set(key, value);
  }

  function getJSON(key, fallback = null) {
    return get(key, fallback);
  }

  DIPO.storage = {
    set,
    get,
    remove,
    clear,
    has,
    keys,
    setJSON,
    getJSON
  };

})();