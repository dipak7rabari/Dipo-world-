/* =========================================================
   DIPO RUN — ANIMATION ENGINE
   Premium micro-interactions
   ========================================================= */

(function (window) {
  "use strict";

  const DipoRun = window.DipoRun = window.DipoRun || {};

  const Animation = {

    init() {

      this.reveal();
      this.pointerEffects();
      this.buttonEffects();

      return this;
    },

    reveal() {

      const items =
        document.querySelectorAll(
          "[data-dipo-reveal]"
        );

      if (!items.length) return;

      if (!("IntersectionObserver" in window)) {

        items.forEach(
          item => item.classList.add("is-visible")
        );

        return;
      }

      const observer =
        new IntersectionObserver(
          entries => {

            entries.forEach(entry => {

              if (entry.isIntersecting) {

                entry.target.classList.add(
                  "is-visible"
                );

                observer.unobserve(
                  entry.target
                );
              }
            });

          },
          {
            threshold: 0.12
          }
        );

      items.forEach(
        item => observer.observe(item)
      );
    },

    pointerEffects() {

      document.addEventListener(
        "pointermove",
        event => {

          const cards =
            document.querySelectorAll(
              "[data-dipo-tilt]"
            );

          cards.forEach(card => {

            const rect =
              card.getBoundingClientRect();

            const x =
              (event.clientX - rect.left) /
              rect.width;

            const y =
              (event.clientY - rect.top) /
              rect.height;

            if (
              x < 0 ||
              x > 1 ||
              y < 0 ||
              y > 1
            ) return;

            const rotateX =
              (0.5 - y) * 4;

            const rotateY =
              (x - 0.5) * 4;

            card.style.transform =
              `perspective(800px)
               rotateX(${rotateX}deg)
               rotateY(${rotateY}deg)
               translateY(-2px)`;
          });
        }
      );

      document.addEventListener(
        "pointerleave",
        () => {

          document
            .querySelectorAll("[data-dipo-tilt]")
            .forEach(card => {
              card.style.transform = "";
            });
        }
      );
    },

    buttonEffects() {

      document.addEventListener(
        "click",
        event => {

          const button =
            event.target.closest(
              "button, .dipo-button"
            );

          if (!button) return;

          button.classList.remove(
            "dipo-clicked"
          );

          requestAnimationFrame(() => {
            button.classList.add(
              "dipo-clicked"
            );
          });

          setTimeout(() => {
            button.classList.remove(
              "dipo-clicked"
            );
          }, 350);
        }
      );
    },

    pulse(element) {

      if (!element) return;

      element.classList.remove(
        "dipo-pulse"
      );

      requestAnimationFrame(() => {
        element.classList.add(
          "dipo-pulse"
        );
      });
    },

    success(element) {

      if (!element) return;

      element.classList.add(
        "dipo-success"
      );

      setTimeout(() => {
        element.classList.remove(
          "dipo-success"
        );
      }, 700);
    }
  };

  DipoRun.Animation = Animation;

})(window);