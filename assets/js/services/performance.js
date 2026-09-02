/* =========================================================
   DIPO WORLD — PERFORMANCE SERVICE
   Lightweight browser performance monitoring.
========================================================= */

(function (window, document) {
  "use strict";

  const PerformanceService = {
    initialized: false,

    init() {
      if (this.initialized) return;

      this.monitorPageLoad();
      this.monitorLongTasks();

      this.initialized = true;

      window.dispatchEvent(
        new CustomEvent("dipo:performance-ready")
      );
    },

    monitorPageLoad() {
      window.addEventListener("load", () => {
        if (!window.performance) return;

        setTimeout(() => {
          const navigation =
            performance.getEntriesByType(
              "navigation"
            )[0];

          if (!navigation) return;

          const metrics = {
            domContentLoaded:
              Math.round(
                navigation.domContentLoadedEventEnd
              ),

            loadTime:
              Math.round(
                navigation.loadEventEnd
              ),

            domInteractive:
              Math.round(
                navigation.domInteractive
              )
          };

          window.DIPO = window.DIPO || {};

          window.DIPO.performanceMetrics =
            metrics;

          window.dispatchEvent(
            new CustomEvent(
              "dipo:performance-measured",
              {
                detail: metrics
              }
            )
          );
        }, 0);
      });
    },

    monitorLongTasks() {
      if (
        !("PerformanceObserver" in window)
      ) {
        return;
      }

      try {
        const observer =
          new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
              window.dispatchEvent(
                new CustomEvent(
                  "dipo:long-task",
                  {
                    detail: {
                      duration:
                        Math.round(
                          entry.duration
                        )
                    }
                  }
                )
              );
            });
          });

        observer.observe({
          entryTypes: ["longtask"]
        });
      } catch (error) {
        // Browser doesn't support longtask.
      }
    },

    getMetrics() {
      return (
        window.DIPO?.performanceMetrics || null
      );
    }
  };

  window.DIPO = window.DIPO || {};
  window.DIPO.performance =
    PerformanceService;

})(window, document);