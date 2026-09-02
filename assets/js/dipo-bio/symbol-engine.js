/* =========================================================
   DIPO WORLD — DIPO BIO
   Symbol Engine
   ========================================================= */

(function (window) {
  "use strict";

  window.DIPO = window.DIPO || {};
  window.DIPO.bio = window.DIPO.bio || {};
  window.DIPO.data = window.DIPO.data || {};

  const fallbackSymbols = [
    { symbol: "♡", category: "heart", name: "Heart" },
    { symbol: "୨ৎ", category: "cute", name: "Bow" },
    { symbol: "✦", category: "star", name: "Star" },
    { symbol: "☾", category: "moon", name: "Moon" },
    { symbol: "𓆩", category: "dark", name: "Wing" },
    { symbol: "꒰", category: "cute", name: "Cute Bracket" },
    { symbol: "✧", category: "star", name: "Sparkle" },
    { symbol: "★", category: "star", name: "Star" },
    { symbol: "☆", category: "star", name: "Outline Star" },
    { symbol: "ღ", category: "heart", name: "Heart" },
    { symbol: "∞", category: "aesthetic", name: "Infinity" },
    { symbol: "𓆩♡𓆪", category: "heart", name: "Wing Heart" },
    { symbol: "⋆｡°✩", category: "sparkle", name: "Sparkle" },
    { symbol: "────", category: "lines", name: "Line" },
    { symbol: "୨୧", category: "cute", name: "Ribbon" }
  ];

  function getSymbols() {
    return Array.isArray(window.DIPO.data.symbols)
      ? window.DIPO.data.symbols
      : fallbackSymbols;
  }

  const Engine = {
    getAll() {
      return [...getSymbols()];
    },

    getByCategory(category) {
      if (!category || category === "all") {
        return this.getAll();
      }

      return this.getAll().filter(
        item => item.category === category
      );
    },

    search(query = "") {
      const q = query.trim().toLowerCase();

      if (!q) return this.getAll();

      return this.getAll().filter(item =>
        String(item.symbol || "")
          .toLowerCase()
          .includes(q) ||
        String(item.name || "")
          .toLowerCase()
          .includes(q) ||
        String(item.category || "")
          .toLowerCase()
          .includes(q)
      );
    },

    random(count = 1) {
      const list = [...this.getAll()];
      const output = [];

      while (list.length && output.length < count) {
        const index = Math.floor(Math.random() * list.length);
        output.push(list.splice(index, 1)[0]);
      }

      return output;
    },

    insert(text, symbol, position = "end") {
      if (position === "start") {
        return `${symbol}${text}`;
      }

      return `${text}${symbol}`;
    }
  };

  window.DIPO.bio.symbolEngine = Engine;

})(window);