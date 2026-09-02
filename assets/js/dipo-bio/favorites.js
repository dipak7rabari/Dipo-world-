/* =========================================================
   DIPO WORLD — DIPO BIO
   Favorites Manager
   ========================================================= */

(function (window) {
  "use strict";

  window.DIPO = window.DIPO || {};
  window.DIPO.bio = window.DIPO.bio || {};

  const STORAGE_KEY =
    "dipo-world-dipo-bio-favorites";

  function read() {
    try {
      return JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );
    } catch {
      return [];
    }
  }

  function write(data) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  }

  function getId(item) {
    return String(
      item?.id ??
      item?.symbol ??
      item?.text ??
      item
    );
  }

  const Favorites = {
    all() {
      return read();
    },

    has(item) {
      const id = getId(item);

      return read().some(
        favorite => getId(favorite) === id
      );
    },

    add(item) {
      if (!item || this.has(item)) {
        return this.all();
      }

      const data = read();

      data.push({
        ...item,
        favorite: true,
        savedAt: Date.now()
      });

      write(data);

      return data;
    },

    remove(item) {
      const id = getId(item);

      const data = read().filter(
        favorite => getId(favorite) !== id
      );

      write(data);

      return data;
    },

    toggle(item) {
      return this.has(item)
        ? this.remove(item)
        : this.add(item);
    },

    clear() {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  window.DIPO.bio.favorites = Favorites;

})(window);