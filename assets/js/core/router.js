/* =========================================================
   DIPO WORLD — ROUTER
   File: assets/js/core/router.js
   ========================================================= */

(() => {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};

  const routes = new Map();

  let currentRoute = null;

  function normalize(path) {
    if (!path) return "/";

    let normalized = path;

    if (!normalized.startsWith("/")) {
      normalized = "/" + normalized;
    }

    if (
      normalized.length > 1 &&
      normalized.endsWith("/")
    ) {
      normalized = normalized.slice(0, -1);
    }

    return normalized;
  }

  function register(path, handler) {
    routes.set(
      normalize(path),
      handler
    );
  }

  async function navigate(path, options = {}) {
    const normalized = normalize(path);

    const handler =
      routes.get(normalized);

    if (!handler) {
      console.warn(
        `DIPO Router: route not found: ${normalized}`
      );

      return false;
    }

    if (!options.replace) {
      history.pushState(
        {},
        "",
        normalized
      );
    } else {
      history.replaceState(
        {},
        "",
        normalized
      );
    }

    currentRoute = normalized;

    if (DIPO.state) {
      DIPO.state.set({
        app: {
          currentPage: normalized
        }
      });
    }

    try {
      await handler();
      DIPO.events?.emit(
        "route:changed",
        {
          path: normalized
        }
      );

      return true;
    } catch (error) {
      DIPO.errorHandler?.capture(
        error,
        {
          source: "router",
          route: normalized
        }
      );

      return false;
    }
  }

  function start(defaultPath = "/") {
    window.addEventListener(
      "popstate",
      () => {
        const path =
          normalize(
            window.location.pathname
          );

        navigate(path, {
          replace: true
        });
      }
    );

    const current =
      normalize(
        window.location.pathname
      );

    if (routes.has(current)) {
      navigate(current, {
        replace: true
      });
    } else {
      navigate(defaultPath, {
        replace: true
      });
    }
  }

  function getCurrentRoute() {
    return currentRoute;
  }

  DIPO.router = {
    register,
    navigate,
    start,
    getCurrentRoute
  };

})();