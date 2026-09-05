/* =========================================================
   DIPO RUN — CONSOLE
   Console / error / status manager
   ========================================================= */

(function (window) {
  "use strict";

  const DipoRun = window.DipoRun = window.DipoRun || {};

  const ConsoleManager = {

    element: null,

    init() {
      this.element =
        document.querySelector("#dipoConsole") ||
        document.querySelector("[data-dipo-console]") ||
        document.querySelector(".dipo-console") ||
        null;

      return this;
    },

    write(message, type = "log") {
      if (!this.element) return;

      const row = document.createElement("div");

      row.className = `console-line console-${type}`;

      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });

      row.textContent = `[${time}] ${message}`;

      this.element.appendChild(row);

      this.element.scrollTop = this.element.scrollHeight;
    },

    log(message) {
      this.write(message, "log");
    },

    info(message) {
      this.write(message, "info");
    },

    success(message) {
      this.write(message, "success");
    },

    warn(message) {
      this.write(message, "warn");
    },

    error(message) {
      this.write(message, "error");
    },

    clear() {
      if (this.element) {
        this.element.innerHTML = "";
      }
    }
  };

  DipoRun.Console = ConsoleManager;

})(window);