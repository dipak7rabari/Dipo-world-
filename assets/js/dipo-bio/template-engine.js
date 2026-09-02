/* =========================================================
   DIPO WORLD — DIPO BIO
   Bio Template Engine
   ========================================================= */

(function (window) {
  "use strict";

  window.DIPO = window.DIPO || {};
  window.DIPO.bio = window.DIPO.bio || {};
  window.DIPO.data = window.DIPO.data || {};

  const fallbackTemplates = [
    {
      id: "cute",
      name: "Cute",
      category: "aesthetic",
      text: "♡ {{name}} ♡\n୨ৎ {{about}}\n✦ {{goal}}"
    },
    {
      id: "minimal",
      name: "Minimal",
      category: "minimal",
      text: "{{name}}\n{{about}}\n📍 {{location}}"
    },
    {
      id: "dark",
      name: "Dark",
      category: "dark",
      text: "𓆩 {{name}} 𓆪\n☾ {{about}}\n✦ {{goal}}"
    },
    {
      id: "soft",
      name: "Soft",
      category: "cute",
      text: "꒰ {{name}} ꒱\n♡ {{about}}\n୨ৎ {{goal}}"
    }
  ];

  function getTemplates() {
    return Array.isArray(window.DIPO.data.bioTemplates)
      ? window.DIPO.data.bioTemplates
      : fallbackTemplates;
  }

  const Engine = {
    all() {
      return [...getTemplates()];
    },

    find(id) {
      return this.all().find(
        template => template.id === id
      );
    },

    byCategory(category) {
      if (!category || category === "all") {
        return this.all();
      }

      return this.all().filter(
        template => template.category === category
      );
    },

    render(template, values = {}) {
      const source =
        typeof template === "string"
          ? template
          : template?.text || "";

      return source.replace(
        /\{\{\s*([\w]+)\s*\}\}/g,
        (_, key) => values[key] ?? ""
      );
    },

    create(name, text, category = "custom") {
      return {
        id: `custom-${Date.now()}`,
        name,
        text,
        category,
        custom: true
      };
    }
  };

  window.DIPO.bio.templateEngine = Engine;

})(window);