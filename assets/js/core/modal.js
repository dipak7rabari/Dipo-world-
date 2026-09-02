/* =========================================================
   DIPO WORLD — MODAL SYSTEM
   File: assets/js/core/modal.js
   ========================================================= */

(() => {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};

  let activeModal = null;

  function open(content, options = {}) {
    close();

    const {
      title = "",
      closeButton = true,
      className = ""
    } = options;

    const overlay = document.createElement("div");

    overlay.className =
      `dipo-modal-overlay ${className}`.trim();

    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");

    overlay.innerHTML = `
      <div class="dipo-modal">
        <div class="dipo-modal-header">
          <h2 class="dipo-modal-title"></h2>
          ${
            closeButton
              ? `<button class="dipo-modal-close" type="button" aria-label="Close">×</button>`
              : ""
          }
        </div>

        <div class="dipo-modal-body"></div>
      </div>
    `;

    overlay.querySelector(".dipo-modal-title").textContent =
      title;

    const body = overlay.querySelector(".dipo-modal-body");

    if (typeof content === "string") {
      body.innerHTML = content;
    } else if (content instanceof Node) {
      body.appendChild(content);
    }

    document.body.appendChild(overlay);

    activeModal = overlay;

    document.body.classList.add("modal-open");

    requestAnimationFrame(() => {
      overlay.classList.add("is-visible");
    });

    const closeBtn =
      overlay.querySelector(".dipo-modal-close");

    if (closeBtn) {
      closeBtn.addEventListener("click", close);
    }

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        close();
      }
    });

    document.addEventListener("keydown", handleEscape);

    return overlay;
  }

  function close() {
    if (!activeModal) return;

    activeModal.classList.remove("is-visible");

    const modalToRemove = activeModal;

    activeModal = null;

    document.body.classList.remove("modal-open");

    document.removeEventListener(
      "keydown",
      handleEscape
    );

    setTimeout(() => {
      modalToRemove.remove();
    }, 250);
  }

  function handleEscape(event) {
    if (event.key === "Escape") {
      close();
    }
  }

  function isOpen() {
    return Boolean(activeModal);
  }

  DIPO.modal = {
    open,
    close,
    isOpen
  };

})();