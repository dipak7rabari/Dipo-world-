/* =========================================================
   DIPO RUN — AUTO RUN
   Debounced live execution
   ========================================================= */

(function (window) {
  "use strict";

  const DipoRun = window.DipoRun = window.DipoRun || {};

  const AutoRun = {

    enabled: true,

    delay: 350,

    timer: null,

    lastCode: "",

    init() {

      document.addEventListener(
        "dipo:codechange",
        event => {

          if (!this.enabled) return;

          this.schedule(
            event.detail.code,
            event.detail.detection
          );
        }
      );

      return this;
    },

    schedule(code, detection) {

      clearTimeout(this.timer);

      this.timer = setTimeout(() => {

        this.run(code, detection);

      }, this.delay);
    },

    async run(code, detection) {

      if (!code.trim()) {
        DipoRun.Preview?.clear();
        return;
      }

      if (code === this.lastCode) {
        return;
      }

      this.lastCode = code;

      const project = {
        code,
        language: detection?.language || "javascript"
      };

      try {

        await DipoRun.Runner?.run(project);

        document.dispatchEvent(
          new CustomEvent("dipo:autorun", {
            detail: {
              code,
              detection
            }
          })
        );

      } catch (error) {

        DipoRun.Console?.error(
          error.message || String(error)
        );
      }
    },

    runNow() {

      const code =
        DipoRun.Editor?.getValue() || "";

      const detection =
        DipoRun.LanguageDetector?.detect(code);

      this.lastCode = "";

      this.run(code, detection);
    },

    toggle(force) {

      if (typeof force === "boolean") {
        this.enabled = force;
      } else {
        this.enabled = !this.enabled;
      }

      document.documentElement.dataset.autorun =
        this.enabled ? "on" : "off";

      return this.enabled;
    }
  };

  DipoRun.AutoRun = AutoRun;

})(window);