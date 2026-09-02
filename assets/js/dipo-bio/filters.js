/* =========================================================
   DIPO WORLD — DIPO BIO
   Filter Engine
   ========================================================= */

(function (window) {
  "use strict";

  window.DIPO = window.DIPO || {};
  window.DIPO.bio = window.DIPO.bio || {};

  const Filters = {
    filter(items = [], options = {}) {
      let result = [...items];

      if (options.category &&
          options.category !== "all") {
        result = result.filter(
          item =>
            String(item.category || "")
              .toLowerCase() ===
            String(options.category)
              .toLowerCase()
        );
      }

      if (options.query) {
        const query =
          String(options.query).toLowerCase();

        result = result.filter(item =>
          JSON.stringify(item)
            .toLowerCase()
            .includes(query)
        );
      }

      if (options.favoriteOnly) {
        result = result.filter(
          item => item.favorite === true
        );
      }

      return result;
    },

    categories(items = []) {
      return [
        "all",
        ...new Set(
          items
            .map(item => item.category)
            .filter(Boolean)
        )
      ];
    },

    sort(items = [], mode = "default") {
      const result = [...items];

      if (mode === "alphabetical") {
        return result.sort((a, b) =>
          String(a.name || a.text || "")
            .localeCompare(
              String(b.name || b.text || "")
            )
        );
      }

      if (mode === "reverse") {
        return result.reverse();
      }

      return result;
    }
  };

  window.DIPO.bio.filters = Filters;

})(window);