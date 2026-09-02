/* =========================================================
   DIPO WORLD — DIPO BIO
   Recent Items Manager
   ========================================================= */

(function (window) {
  "use strict";

  window.DIPO = window.DIPO || {};
  window.DIPO.bio = window.DIPO.bio || {};

  const STORAGE_KEY =
    "dipo-world-dipo-bio-recent";

  const MAX_ITEMS = 50;

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

  const Recent = {
    all() {
      return read();
    },

    add(item) {
      if (!item) return this.all();

      const data = read();

      const normalized = {
        ...item,
        viewedAt: Date.now()
      };

      const id =
        normalized.id ||
        normalized.text ||
        normalized.symbol ||
        JSON.stringify(normalized);

      const filtered = data.filter(existing => {
        const existingId =
          existing.id ||
          existing.text ||
          existing.symbol ||
          JSON.stringify(existing);

        return existingId !== id;
      });

      filtered.unshift(normalized);

      write(filtered.slice(0, MAX_ITEMS));

      return this.all();
    },

    remove(item) {
      const id =
        item?.id ||
        item?.text ||
        item?.symbol;

      const result = read().filter(existing =>
        (existing.id ||
          existing.text ||
          existing.symbol) !== id
      );

      write(result);

      return result;
    },

    clear() {
      localStorage.removeItem(STORAGE_KEY);
    },

    latest(limit = 10) {
      return this.all().slice(0, limit);
    }
  };

  window.DIPO.bio.recent = Recent;

})(window);