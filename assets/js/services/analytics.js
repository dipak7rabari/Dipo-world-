/* =========================================================
   DIPO WORLD — ANALYTICS SERVICE
   Privacy-friendly client-side event tracking.
   No external analytics required.
========================================================= */

(function (window, document) {
  "use strict";

  const STORAGE_KEY = "dipo_world_analytics";

  const Analytics = {
    initialized: false,
    enabled: true,

    init() {
      if (this.initialized) return;

      this.trackPageView();
      this.setupAutomaticEvents();

      this.initialized = true;

      window.dispatchEvent(
        new CustomEvent("dipo:analytics-ready")
      );
    },

    getData() {
      try {
        const data = localStorage.getItem(STORAGE_KEY);

        if (!data) {
          return {
            pageViews: 0,
            events: [],
            createdAt: Date.now()
          };
        }

        return JSON.parse(data);
      } catch (error) {
        return {
          pageViews: 0,
          events: [],
          createdAt: Date.now()
        };
      }
    },

    saveData(data) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(data)
        );
      } catch (error) {
        // Storage may be unavailable.
      }
    },

    trackPageView() {
      const data = this.getData();

      data.pageViews += 1;

      this.saveData(data);
    },

    track(eventName, details = {}) {
      if (!this.enabled || !eventName) return;

      const data = this.getData();

      data.events.push({
        name: eventName,
        details: this.cleanDetails(details),
        timestamp: Date.now()
      });

      // Keep local analytics lightweight.
      if (data.events.length > 500) {
        data.events = data.events.slice(-500);
      }

      this.saveData(data);
    },

    cleanDetails(details) {
      if (!details || typeof details !== "object") {
        return {};
      }

      const safe = {};

      Object.keys(details).forEach((key) => {
        const value = details[key];

        if (
          typeof value === "string" ||
          typeof value === "number" ||
          typeof value === "boolean"
        ) {
          safe[key] = String(value).slice(0, 200);
        }
      });

      return safe;
    },

    setupAutomaticEvents() {
      document.addEventListener("click", (event) => {
        const target = event.target.closest(
          "[data-analytics]"
        );

        if (!target) return;

        const eventName =
          target.getAttribute("data-analytics");

        this.track(eventName);
      });

      window.addEventListener(
        "dipo:bio-generated",
        () => {
          this.track("bio_generated");
        }
      );

      window.addEventListener(
        "dipo:qr-generated",
        () => {
          this.track("qr_generated");
        }
      );

      window.addEventListener(
        "dipo:copy",
        (event) => {
          this.track("copy", event.detail || {});
        }
      );

      window.addEventListener(
        "dipo:download",
        (event) => {
          this.track("download", event.detail || {});
        }
      );
    },

    getSummary() {
      const data = this.getData();

      const summary = {};

      data.events.forEach((event) => {
        summary[event.name] =
          (summary[event.name] || 0) + 1;
      });

      return {
        pageViews: data.pageViews,
        events: summary,
        totalEvents: data.events.length
      };
    },

    clear() {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        // Ignore storage errors.
      }
    }
  };

  window.DIPO = window.DIPO || {};
  window.DIPO.analytics = Analytics;

})(window, document);