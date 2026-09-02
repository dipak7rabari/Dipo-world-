/* =========================================================
   DIPO WORLD — APP CONFIGURATION
   Central application configuration
   ========================================================= */

(function (window) {
  "use strict";

  const APP_CONFIG = {

    /* -----------------------------------------------------
       Application Identity
       ----------------------------------------------------- */

    name: "DIPO WORLD",

    shortName: "dipo World",

    version: "1.0.0",

    environment: "production",

    language: "en",

    defaultLanguage: "en",

    charset: "UTF-8",


    /* -----------------------------------------------------
       Website
       ----------------------------------------------------- */

    website: {
      name: "DIPO WORLD",
      url: "https://dipolabs.io",
      description:
        "Free creative tools for stylish bios, symbols, artistic QR codes and creative barcodes.",
      author: "𝔄 𝔇𝔐 𝔭𝔯𝔬𝔡𝔲𝔠𝔱"
    },


    /* -----------------------------------------------------
       Storage
       ----------------------------------------------------- */

    storage: {
      prefix: "dipo_world_",

      keys: {
        theme: "theme",
        favorites: "favorites",
        recent: "recent",
        bio: "bio",
        qr: "qr",
        settings: "settings",
        language: "language",
        installDismissed: "install_dismissed"
      },

      maxRecentItems: 50,

      maxFavorites: 100
    },


    /* -----------------------------------------------------
       Performance
       ----------------------------------------------------- */

    performance: {
      lazyLoading: true,

      preloadCriticalAssets: true,

      debounceDelay: 150,

      animationEnabled: true,

      reduceMotionRespect: true
    },


    /* -----------------------------------------------------
       Security
       ----------------------------------------------------- */

    security: {
      allowExternalLinks: true,

      externalLinkTarget: "_blank",

      sanitizeUserInput: true,

      allowHTMLInput: false,

      allowScriptInput: false
    },


    /* -----------------------------------------------------
       Export
       ----------------------------------------------------- */

    export: {
      defaultImageFormat: "png",

      defaultImageQuality: 1,

      defaultScale: 4,

      pngEnabled: true,

      svgEnabled: true,

      printEnabled: true,

      clipboardEnabled: true
    },


    /* -----------------------------------------------------
       DIPO BIO
       ----------------------------------------------------- */

    bio: {
      enabled: true,

      maxCharacters: 2200,

      maxFavorites: 100,

      maxRecent: 50,

      livePreview: true,

      autoSave: true,

      defaultFont: "sans",

      defaultCategory: "aesthetic"
    },


    /* -----------------------------------------------------
       DIPO QR
       ----------------------------------------------------- */

    qr: {
      enabled: true,

      defaultSize: 800,

      defaultMargin: 20,

      errorCorrectionLevel: "H",

      logoSafeZone: true,

      watermark: "dipo QR",

      watermarkLocked: true,

      createdWithText: "Created with dipo World",

      pngEnabled: true,

      svgEnabled: true,

      printEnabled: true
    },


    /* -----------------------------------------------------
       Barcode
       ----------------------------------------------------- */

    barcode: {
      enabled: true,

      defaultFormat: "CODE128",

      supportedFormats: [
        "CODE128",
        "EAN13",
        "UPC"
      ],

      silhouetteEnabled: true,

      protectedZonePercent: 25
    },


    /* -----------------------------------------------------
       PWA
       ----------------------------------------------------- */

    pwa: {
      enabled: true,

      serviceWorkerPath: "/service-worker.js",

      installPrompt: true,

      offlineMode: true
    },


    /* -----------------------------------------------------
       Analytics
       ----------------------------------------------------- */

    analytics: {
      enabled: false,

      provider: null,

      trackingId: null
    },


    /* -----------------------------------------------------
       Debug
       ----------------------------------------------------- */

    debug: {
      enabled: false,

      logEvents: false,

      logStorage: false,

      logPerformance: false
    }

  };


  /* -------------------------------------------------------
     Freeze configuration
     Prevent accidental runtime modification
     ------------------------------------------------------- */

  function deepFreeze(object) {

    Object.freeze(object);

    Object.keys(object).forEach(function (key) {

      if (
        object[key] &&
        typeof object[key] === "object" &&
        !Object.isFrozen(object[key])
      ) {
        deepFreeze(object[key]);
      }

    });

    return object;
  }


  window.DIPO = window.DIPO || {};

  window.DIPO.config = deepFreeze(APP_CONFIG);


})(window);