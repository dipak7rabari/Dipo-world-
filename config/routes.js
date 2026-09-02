/* =========================================================
   DIPO WORLD — ROUTES
   Central route configuration
   ========================================================= */

(function (window) {
  "use strict";

  const ROUTES = {

    /* =====================================================
       MAIN
       ===================================================== */

    home: {
      name: "Home",
      path: "/",
      page: "/pages/home/home.html",
      title: "DIPO WORLD — Create. Customize. Stand Out.",
      section: "main"
    },


    /* =====================================================
       DIPO BIO
       ===================================================== */

    dipoBio: {

      index: {
        name: "DIPO BIO",
        path: "/pages/dipo-bio/",
        page: "/pages/dipo-bio/index.html",
        title: "DIPO BIO — Stylish Bio Generator",
        section: "dipo-bio"
      },

      fonts: {
        name: "DIPO BIO Fonts",
        path: "/pages/dipo-bio/fonts.html",
        page: "/pages/dipo-bio/fonts.html",
        title: "DIPO BIO Fonts",
        section: "dipo-bio"
      },

      symbols: {
        name: "DIPO BIO Symbols",
        path: "/pages/dipo-bio/symbols.html",
        page: "/pages/dipo-bio/symbols.html",
        title: "DIPO BIO Symbols",
        section: "dipo-bio"
      },

      kaomoji: {
        name: "DIPO BIO Kaomoji",
        path: "/pages/dipo-bio/kaomoji.html",
        page: "/pages/dipo-bio/kaomoji.html",
        title: "DIPO BIO Kaomoji",
        section: "dipo-bio"
      },

      templates: {
        name: "DIPO BIO Templates",
        path: "/pages/dipo-bio/templates.html",
        page: "/pages/dipo-bio/templates.html",
        title: "DIPO BIO Templates",
        section: "dipo-bio"
      },

      generator: {
        name: "DIPO BIO Generator",
        path: "/pages/dipo-bio/bio-generator.html",
        page: "/pages/dipo-bio/bio-generator.html",
        title: "DIPO BIO Generator",
        section: "dipo-bio"
      },

      remix: {
        name: "DIPO BIO Remix",
        path: "/pages/dipo-bio/bio-remix.html",
        page: "/pages/dipo-bio/bio-remix.html",
        title: "DIPO BIO Remix",
        section: "dipo-bio"
      },

      preview: {
        name: "DIPO BIO Preview",
        path: "/pages/dipo-bio/preview.html",
        page: "/pages/dipo-bio/preview.html",
        title: "DIPO BIO Preview",
        section: "dipo-bio"
      }

    },


    /* =====================================================
       DIPO QR
       ===================================================== */

    dipoQR: {

      index: {
        name: "DIPO QR",
        path: "/pages/dipo-qr/",
        page: "/pages/dipo-qr/index.html",
        title: "DIPO QR — Artistic QR & Barcode Studio",
        section: "dipo-qr"
      },

      artisticQR: {
        name: "Artistic QR",
        path: "/pages/dipo-qr/artistic-qr.html",
        page: "/pages/dipo-qr/artistic-qr.html",
        title: "DIPO QR — Artistic QR Studio",
        section: "dipo-qr"
      },

      barcode: {
        name: "Barcode Studio",
        path: "/pages/dipo-qr/barcode.html",
        page: "/pages/dipo-qr/barcode.html",
        title: "DIPO QR — Barcode Studio",
        section: "dipo-qr"
      },

      frames: {
        name: "QR Frames",
        path: "/pages/dipo-qr/qr-frames.html",
        page: "/pages/dipo-qr/qr-frames.html",
        title: "DIPO QR — Frames",
        section: "dipo-qr"
      },

      preview: {
        name: "QR Preview",
        path: "/pages/dipo-qr/qr-preview.html",
        page: "/pages/dipo-qr/qr-preview.html",
        title: "DIPO QR — Preview",
        section: "dipo-qr"
      },

      export: {
        name: "QR Export",
        path: "/pages/dipo-qr/export.html",
        page: "/pages/dipo-qr/export.html",
        title: "DIPO QR — Export",
        section: "dipo-qr"
      }

    },


    /* =====================================================
       USER DATA
       ===================================================== */

    favorites: {
      name: "Favorites",
      path: "/pages/favorites/",
      page: "/pages/favorites/index.html",
      title: "DIPO WORLD — Favorites",
      section: "user"
    },


    recent: {
      name: "Recent",
      path: "/pages/recent/",
      page: "/pages/recent/index.html",
      title: "DIPO WORLD — Recent",
      section: "user"
    },


    /* =====================================================
       INFORMATION
       ===================================================== */

    about: {
      name: "About",
      path: "/pages/about/",
      page: "/pages/about/index.html",
      title: "About DIPO WORLD",
      section: "information"
    },


    privacy: {
      name: "Privacy Policy",
      path: "/pages/privacy/",
      page: "/pages/privacy/index.html",
      title: "Privacy Policy — DIPO WORLD",
      section: "legal"
    },


    terms: {
      name: "Terms & Conditions",
      path: "/pages/terms/",
      page: "/pages/terms/index.html",
      title: "Terms & Conditions — DIPO WORLD",
      section: "legal"
    }

  };


  window.DIPO = window.DIPO || {};

  window.DIPO.routes = ROUTES;


  /* -------------------------------------------------------
     Flatten nested routes
     ------------------------------------------------------- */

  function flattenRoutes(object, result) {

    result = result || {};

    Object.keys(object).forEach(function (key) {

      const value = object[key];

      if (
        value &&
        typeof value === "object" &&
        value.path &&
        value.page
      ) {

        result[key] = value;

      } else if (
        value &&
        typeof value === "object"
      ) {

        flattenRoutes(value, result);

      }

    });

    return result;
  }


  window.DIPO.getRoutes = function () {
    return flattenRoutes(ROUTES);
  };


  /* -------------------------------------------------------
     Find route by path
     ------------------------------------------------------- */

  window.DIPO.findRoute = function (path) {

    const routes = window.DIPO.getRoutes();

    const normalizedPath =
      String(path || "/")
        .replace(/\/+/g, "/");

    const keys = Object.keys(routes);

    for (let i = 0; i < keys.length; i++) {

      const route = routes[keys[i]];

      if (route.path === normalizedPath) {
        return route;
      }

    }

    return null;
  };


})(window);