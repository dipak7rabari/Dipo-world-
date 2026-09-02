/* =========================================================
   DIPO WORLD — TOAST
   File: assets/js/core/toast.js
   ========================================================= */

(() => {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};

  let container = null;

  function createContainer() {
    if (container) return container;

    container = document.createElement("div");

    container.className = "dipo-toast-container";
    container.setAttribute("aria-live", "polite");
    container.setAttribute("aria-atomic", "true");

    document.body.appendChild(container);

    return container;
  }

  function show(message, type = "success", duration = 2500) {
    const parent = createContainer();

    const toast = document.createElement("div");

    toast.className = `dipo-toast dipo-toast-${type}`;

    toast.setAttribute("role", "status");

    toast.innerHTML = `
      <span class="dipo-toast-icon">
        ${getIcon(type)}
      </span>
      <span class="dipo-toast-message"></span>
    `;

    toast.querySelector(".dipo-toast-message").textContent =
      message;

    parent.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add("is-visible");
    });

    setTimeout(() => {
      toast.classList.remove("is-visible");

      setTimeout(() => {
        toast.remove();
      }, 300);
    }, duration);

    return toast;
  }

  function getIcon(type) {
    const icons = {
      success: "✓",
      error: "!",
      warning: "!",
      info: "i"
    };

    return icons[type] || "•";
  }

  function success(message = "Done!") {
    return show(message, "success");
  }

  function error(message = "Something went wrong.") {
    return show(message, "error");
  }

  function warning(message = "Please check your input.") {
    return show(message, "warning");
  }

  function info(message = "Information") {
    return show(message, "info");
  }

  DIPO.toast = {
    show,
    success,
    error,
    warning,
    info
  };

})();