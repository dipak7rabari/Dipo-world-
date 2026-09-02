/* =========================================================
   DIPO WORLD — DIPO BIO
   Kaomoji Engine
   ========================================================= */

(function (window) {
  "use strict";

  window.DIPO = window.DIPO || {};
  window.DIPO.bio = window.DIPO.bio || {};
  window.DIPO.data = window.DIPO.data || {};

  const fallbackKaomoji = [
    { text: "(｡♥‿♥｡)", category: "cute" },
    { text: "(˶ᵔ ᵕ ᵔ˶)", category: "cute" },
    { text: "(づ｡◕‿‿◕｡)づ", category: "love" },
    { text: "૮ ˶ᵔ ᵕ ᵔ˶ ა", category: "cute" },
    { text: "(≧▽≦)", category: "happy" },
    { text: "(｡•́‿•̀｡)", category: "sad" },
    { text: "(╥﹏╥)", category: "sad" },
    { text: "(¬‿¬)", category: "cool" },
    { text: "(▀̿Ĺ̯▀̿ ̿)", category: "cool" },
    { text: "(っ˘ω˘ς )", category: "love" },
    { text: "૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა", category: "cute" },
    { text: "ʕ•ᴥ•ʔ", category: "animal" },
    { text: "(=^･ω･^=)", category: "animal" },
    { text: "ฅ^•ﻌ•^ฅ", category: "animal" }
  ];

  function getData() {
    return Array.isArray(window.DIPO.data.kaomoji)
      ? window.DIPO.data.kaomoji
      : fallbackKaomoji;
  }

  const Engine = {
    getAll() {
      return [...getData()];
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
        String(item.text || "")
          .toLowerCase()
          .includes(q) ||
        String(item.category || "")
          .toLowerCase()
          .includes(q)
      );
    },

    random(count = 1) {
      const list = [...this.getAll()];
      const result = [];

      while (list.length && result.length < count) {
        const index = Math.floor(
          Math.random() * list.length
        );

        result.push(list.splice(index, 1)[0]);
      }

      return result;
    }
  };

  window.DIPO.bio.kaomojiEngine = Engine;

})(window);