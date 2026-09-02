/* =========================================================
   DIPO WORLD — DIPO BIO
   Search Engine
   ========================================================= */

(function (window) {
  "use strict";

  window.DIPO = window.DIPO || {};
  window.DIPO.bio = window.DIPO.bio || {};

  const Search = {
    normalize(value) {
      return String(value || "")
        .toLowerCase()
        .normalize("NFKC")
        .trim();
    },

    match(item, query) {
      const q = this.normalize(query);

      if (!q) return true;

      const searchable = [
        item.name,
        item.text,
        item.symbol,
        item.category,
        item.description
      ]
        .filter(Boolean)
        .join(" ");

      return this.normalize(searchable)
        .includes(q);
    },

    search(items = [], query = "") {
      return items.filter(item =>
        this.match(item, query)
      );
    },

    highlight(text, query) {
      if (!query) return String(text || "");

      const escaped = String(query)
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      return String(text || "").replace(
        new RegExp(`(${escaped})`, "gi"),
        "<mark>$1</mark>"
      );
    }
  };

  window.DIPO.bio.search = Search;

})(window);