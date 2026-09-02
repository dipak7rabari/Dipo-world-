/* =========================================================
   DIPO WORLD — EVENT BUS
   File: assets/js/core/events.js
   ========================================================= */

(() => {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};

  const listeners = new Map();

  function on(eventName, callback) {
    if (
      typeof eventName !== "string" ||
      typeof callback !== "function"
    ) {
      return () => {};
    }

    if (!listeners.has(eventName)) {
      listeners.set(eventName, new Set());
    }

    listeners
      .get(eventName)
      .add(callback);

    return () => off(eventName, callback);
  }

  function off(eventName, callback) {
    const eventListeners =
      listeners.get(eventName);

    if (!eventListeners) return;

    eventListeners.delete(callback);

    if (eventListeners.size === 0) {
      listeners.delete(eventName);
    }
  }

  function emit(eventName, detail = {}) {
    const eventListeners =
      listeners.get(eventName);

    if (!eventListeners) return;

    eventListeners.forEach((callback) => {
      try {
        callback(detail);
      } catch (error) {
        console.error(
          `DIPO event "${eventName}" error:`,
          error
        );
      }
    });
  }

  function once(eventName, callback) {
    const unsubscribe = on(
      eventName,
      (detail) => {
        unsubscribe();
        callback(detail);
      }
    );

    return unsubscribe;
  }

  DIPO.events = {
    on,
    off,
    emit,
    once
  };

})();