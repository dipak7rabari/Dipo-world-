/* =========================================================
   DIPO QR — RECENT DESIGNS
   localStorage based
   ========================================================= */

(function (window) {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};
  DIPO.QR = DIPO.QR || {};

  const STORAGE_KEY =
    "dipo-world-qr-recent";

  const MAX_ITEMS = 30;

  let designs = [];

  function load() {

    try {

      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );

      designs =
        saved
          ? JSON.parse(saved)
          : [];

      if (!Array.isArray(designs)) {
        designs = [];
      }

    } catch {
      designs = [];
    }

    return designs;
  }

  function save() {

    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(designs)
      );

    } catch (error) {

      console.warn(
        "DIPO QR: unable to save recent designs.",
        error
      );
    }
  }

  function add(data = {}) {

    const item = {

      id:
        crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`,

      createdAt:
        new Date().toISOString(),

      ...data
    };

    designs.unshift(item);

    designs =
      designs.slice(
        0,
        MAX_ITEMS
      );

    save();

    return item;
  }

  function getAll() {
    return [...designs];
  }

  function get(id) {
    return designs.find(
      item => item.id === id
    ) || null;
  }

  function remove(id) {

    designs =
      designs.filter(
        item => item.id !== id
      );

    save();

    return true;
  }

  function clear() {

    designs = [];

    save();

    return true;
  }

  function init() {
    load();
  }

  DIPO.QR.Recent = {
    init,
    load,
    add,
    getAll,
    get,
    remove,
    clear
  };

})(window);