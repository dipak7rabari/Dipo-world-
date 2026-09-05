/* =========================================================
   DIPO RUN — DEVICES
   Responsive preview controller
   ========================================================= */

(function (window) {
  "use strict";

  const DipoRun = window.DipoRun = window.DipoRun || {};

  const Devices = {

    current: "desktop",

    presets: {

      mobile: {
        name: "Mobile",
        width: 390,
        height: 844
      },

      mobileLarge: {
        name: "Mobile Large",
        width: 430,
        height: 932
      },

      tablet: {
        name: "Tablet",
        width: 768,
        height: 1024
      },

      laptop: {
        name: "Laptop",
        width: 1366,
        height: 768
      },

      desktop: {
        name: "Desktop",
        width: 1440,
        height: 900
      },

      full: {
        name: "Full",
        width: "100%",
        height: "100%"
      }
    },

    init() {

      document.addEventListener(
        "click",
        event => {

          const button =
            event.target.closest(
              "[data-device]"
            );

          if (!button) return;

          this.set(
            button.dataset.device
          );
        }
      );

      return this;
    },

    set(name = "desktop") {

      const preset =
        this.presets[name];

      if (!preset) return;

      this.current = name;

      const frame =
        DipoRun.Preview?.getFrame();

      if (!frame) return;

      if (preset.width === "100%") {

        frame.style.width = "100%";
        frame.style.height = "100%";

      } else {

        frame.style.width =
          `${preset.width}px`;

        frame.style.height =
          `${preset.height}px`;
      }

      frame.dataset.device = name;

      document.documentElement.dataset.device =
        name;

      document.dispatchEvent(
        new CustomEvent("dipo:devicechange", {
          detail: preset
        })
      );
    },

    getCurrent() {
      return this.presets[this.current];
    }
  };

  DipoRun.Devices = Devices;

})(window);