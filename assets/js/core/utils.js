/* =========================================================
   DIPO WORLD — UTILITIES
   File: assets/js/core/utils.js
   ========================================================= */

(() => {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};

  function $(selector, parent = document) {
    return parent.querySelector(selector);
  }

  function $$(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function createElement(tag, options = {}) {
    const element = document.createElement(tag);

    if (options.className) {
      element.className = options.className;
    }

    if (options.id) {
      element.id = options.id;
    }

    if (options.text) {
      element.textContent = options.text;
    }

    if (options.html) {
      element.innerHTML = options.html;
    }

    if (options.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }

    return element;
  }

  function escapeHTML(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function debounce(callback, delay = 300) {
    let timer;

    return (...args) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }

  function throttle(callback, delay = 200) {
    let lastCall = 0;

    return (...args) => {
      const now = Date.now();

      if (now - lastCall >= delay) {
        lastCall = now;
        callback(...args);
      }
    };
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function isObject(value) {
    return value !== null && typeof value === "object";
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function generateId(prefix = "dipo") {
    return `${prefix}_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 9)}`;
  }

  function formatNumber(value, decimals = 2) {
    const number = Number(value);

    if (!Number.isFinite(number)) return "0";

    return number.toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals
    });
  }

  function formatDate(date = new Date()) {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(date);
  }

  function formatTime(date = new Date()) {
    return new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  }

  function copyObject(object) {
    return JSON.parse(JSON.stringify(object));
  }

  function isMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  function isOnline() {
    return navigator.onLine;
  }

  function safeJSONParse(value, fallback = null) {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }

  function safeJSON(value) {
    try {
      return JSON.stringify(value);
    } catch {
      return null;
    }
  }

  function waitForDOM() {
    if (document.readyState === "loading") {
      return new Promise((resolve) => {
        document.addEventListener("DOMContentLoaded", resolve, {
          once: true
        });
      });
    }

    return Promise.resolve();
  }

  DIPO.utils = {
    $,
    $$,
    byId,
    createElement,
    escapeHTML,
    debounce,
    throttle,
    sleep,
    isObject,
    clamp,
    generateId,
    formatNumber,
    formatDate,
    formatTime,
    copyObject,
    isMobile,
    isOnline,
    safeJSONParse,
    safeJSON,
    waitForDOM
  };

})();