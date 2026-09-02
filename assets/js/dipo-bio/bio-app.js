/* =========================================================
   DIPO WORLD — DIPO BIO
   Main Application Controller
   ========================================================= */

(function (window, document) {
  "use strict";

  window.DIPO = window.DIPO || {};
  window.DIPO.bio = window.DIPO.bio || {};

  const BioApp = {
    version: "1.0.0",

    state: {
      text: "",
      activeTool: "fonts",
      category: "all",
      search: "",
      selectedStyle: "bold",
      preview: "",
      initialized: false
    },

    elements: {},

    init() {
      if (this.state.initialized) {
        return this;
      }

      this.cacheElements();
      this.bindEvents();
      this.refresh();

      this.state.initialized = true;

      window.dispatchEvent(
        new CustomEvent("dipo:bio-ready", {
          detail: {
            version: this.version
          }
        })
      );

      return this;
    },

    cacheElements() {
      this.elements.input =
        document.querySelector(
          "[data-bio-input]"
        );

      this.elements.preview =
        document.querySelector(
          "[data-bio-preview]"
        );

      this.elements.counter =
        document.querySelector(
          "[data-bio-counter]"
        );

      this.elements.search =
        document.querySelector(
          "[data-bio-search]"
        );

      this.elements.grid =
        document.querySelector(
          "[data-bio-grid]"
        );

      this.elements.category =
        document.querySelector(
          "[data-bio-category]"
        );
    },

    bindEvents() {
      document.addEventListener(
        "input",
        event => {
          if (
            event.target.matches(
              "[data-bio-input]"
            )
          ) {
            this.state.text =
              event.target.value;

            this.render();
          }

          if (
            event.target.matches(
              "[data-bio-search]"
            )
          ) {
            this.state.search =
              event.target.value;

            this.renderGrid();
          }
        }
      );

      document.addEventListener(
        "click",
        event => {
          const copyButton =
            event.target.closest(
              "[data-bio-copy]"
            );

          if (copyButton) {
            this.handleCopy(copyButton);
            return;
          }

          const styleButton =
            event.target.closest(
              "[data-bio-style]"
            );

          if (styleButton) {
            this.state.selectedStyle =
              styleButton.dataset.bioStyle;

            this.render();
            return;
          }

          const symbolButton =
            event.target.closest(
              "[data-bio-symbol]"
            );

          if (symbolButton) {
            this.insertSymbol(
              symbolButton.dataset.bioSymbol
            );

            return;
          }

          const categoryButton =
            event.target.closest(
              "[data-bio-category]"
            );

          if (categoryButton) {
            this.state.category =
              categoryButton.dataset.bioCategory ||
              "all";

            this.renderGrid();

            return;
          }

          const favoriteButton =
            event.target.closest(
              "[data-bio-favorite]"
            );

          if (favoriteButton) {
            this.toggleFavorite(
              favoriteButton
            );

            return;
          }

          const remixButton =
            event.target.closest(
              "[data-bio-remix]"
            );

          if (remixButton) {
            this.remix();
          }
        }
      );
    },

    refresh() {
      this.render();
      this.renderGrid();
    },

    render() {
      const input = this.elements.input;
      const preview = this.elements.preview;
      const counter = this.elements.counter;

      const text =
        input
          ? input.value
          : this.state.text;

      this.state.text = text;

      if (
        preview &&
        window.DIPO.bio.preview
      ) {
        window.DIPO.bio.preview.render(
          preview,
          text
        );
      }

      if (
        counter &&
        window.DIPO.bio.characterCounter
      ) {
        window.DIPO.bio.characterCounter.update(
          counter,
          text
        );
      }

      window.dispatchEvent(
        new CustomEvent(
          "dipo:bio-rendered",
          {
            detail: {
              text
            }
          }
        )
      );
    },

    renderGrid() {
      const grid = this.elements.grid;

      if (!grid) return;

      let items = [];

      const symbolEngine =
        window.DIPO.bio.symbolEngine;

      const kaomojiEngine =
        window.DIPO.bio.kaomojiEngine;

      if (this.state.activeTool === "kaomoji") {
        items =
          kaomojiEngine
            ? kaomojiEngine.getByCategory(
                this.state.category
              )
            : [];
      } else {
        items =
          symbolEngine
            ? symbolEngine.getByCategory(
                this.state.category
              )
            : [];
      }

      if (this.state.search) {
        const search =
          window.DIPO.bio.search;

        if (search) {
          items =
            search.search(
              items,
              this.state.search
            );
        }
      }

      grid.innerHTML = "";

      if (!items.length) {
        grid.innerHTML = `
          <div class="bio-empty-state">
            Nothing found ✦
          </div>
        `;

        return;
      }

      items.forEach(item => {
        const value =
          item.symbol ??
          item.text ??
          "";

        const button =
          document.createElement("button");

        button.type = "button";

        button.className =
          "bio-copy-card";

        button.dataset.bioSymbol =
          value;

        button.dataset.bioCopy =
          value;

        button.innerHTML = `
          <span class="bio-copy-value">
            ${this.escapeHTML(value)}
          </span>
          <span class="bio-copy-label">
            Tap to copy
          </span>
        `;

        grid.appendChild(button);
      });
    },

    insertSymbol(symbol) {
      const input = this.elements.input;

      if (!input) return;

      const start = input.selectionStart;
      const end = input.selectionEnd;

      const before =
        input.value.slice(0, start);

      const after =
        input.value.slice(end);

      input.value =
        `${before}${symbol}${after}`;

      const cursor =
        start + symbol.length;

      input.setSelectionRange(
        cursor,
        cursor
      );

      this.state.text = input.value;

      this.render();

      if (
        window.DIPO.bio.recent
      ) {
        window.DIPO.bio.recent.add({
          type: "symbol",
          text: symbol
        });
      }
    },

    async handleCopy(button) {
      const value =
        button.dataset.bioCopy ||
        button.textContent.trim();

      if (
        window.DIPO.bio.shareBio
      ) {
        const success =
          await window.DIPO.bio.shareBio.copy(
            value
          );

        if (success) {
          this.showCopied(button);
        }
      }
    },

    showCopied(button) {
      const original =
        button.dataset.originalText ||
        button.textContent.trim();

      button.dataset.originalText =
        original;

      button.classList.add(
        "is-copied"
      );

      const label =
        button.querySelector(
          ".bio-copy-label"
        );

      if (label) {
        label.textContent = "Copied! ✓";
      }

      setTimeout(() => {
        button.classList.remove(
          "is-copied"
        );

        if (label) {
          label.textContent =
            "Tap to copy";
        }
      }, 1200);

      window.dispatchEvent(
        new CustomEvent(
          "dipo:bio-toast",
          {
            detail: {
              message: "Copied! ✓"
            }
          }
        )
      );
    },

    toggleFavorite(button) {
      const value =
        button.dataset.bioFavorite;

      if (
        !window.DIPO.bio.favorites
      ) {
        return;
      }

      const item = {
        id: value,
        text: value,
        type: "bio"
      };

      const result =
        window.DIPO.bio.favorites.toggle(
          item
        );

      const active =
        result.some(
          favorite =>
            favorite.id === value
        );

      button.classList.toggle(
        "is-favorite",
        active
      );
    },

    remix() {
      if (
        !window.DIPO.bio.remixEngine
      ) {
        return;
      }

      const result =
        window.DIPO.bio.remixEngine.remix(
          this.state.text,
          {
            addSymbols: true,
            decorate: false,
            shuffle: false
          }
        );

      if (this.elements.input) {
        this.elements.input.value =
          result;
      }

      this.state.text = result;

      this.render();

      if (
        window.DIPO.bio.recent
      ) {
        window.DIPO.bio.recent.add({
          type: "remix",
          text: result
        });
      }
    },

    setTool(tool) {
      this.state.activeTool =
        tool || "fonts";

      this.renderGrid();
    },

    setCategory(category) {
      this.state.category =
        category || "all";

      this.renderGrid();
    },

    setStyle(style) {
      this.state.selectedStyle =
        style;

      this.render();
    },

    getState() {
      return JSON.parse(
        JSON.stringify(this.state)
      );
    },

    escapeHTML(value = "") {
      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }
  };

  window.DIPO.bio.app = BioApp;

  function boot() {
    BioApp.init();
  }

  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      boot,
      { once: true }
    );
  } else {
    boot();
  }

})(window, document);