/* =========================================================
   DIPO WORLD — FEATURE FLAGS
   ========================================================= */

(function (window) {
  "use strict";

  const FEATURES = {

    /* =====================================================
       CORE
       ===================================================== */

    core: {

      routing: true,

      localStorage: true,

      clipboard: true,

      sharing: true,

      downloads: true,

      modal: true,

      toast: true,

      theme: true

    },


    /* =====================================================
       DIPO BIO
       ===================================================== */

    dipoBio: {

      enabled: true,

      fontConverter: true,

      hindiFonts: true,

      symbols: true,

      kaomoji: true,

      combinations: true,

      templates: true,

      bioGenerator: true,

      remix: true,

      search: true,

      favorites: true,

      recent: true,

      characterCounter: true,

      livePreview: true,

      autoSave: true,

      shareBio: true

    },


    /* =====================================================
       DIPO QR
       ===================================================== */

    dipoQR: {

      enabled: true,

      artisticQR: true,

      barcodeStudio: true,

      customLogo: true,

      customDots: true,

      customEyes: true,

      frames: true,

      presets: true,

      socialPresets: true,

      qrScanner: true,

      safetyCheck: true,

      silhouetteBarcode: true,

      barcodePresets: true,

      pngExport: true,

      svgExport: true,

      print: true,

      copySVG: true,

      recentDesigns: true

    },


    /* =====================================================
       QR SOCIAL PRESETS
       ===================================================== */

    qrSocial: {

      instagram: true,

      telegram: true,

      whatsapp: true,

      youtube: true,

      upi: true

    },


    /* =====================================================
       PWA
       ===================================================== */

    pwa: {

      enabled: true,

      offline: true,

      installBanner: true,

      serviceWorker: true

    },


    /* =====================================================
       UI
       ===================================================== */

    ui: {

      animations: true,

      responsive: true,

      mobileNavigation: true,

      desktopNavigation: true,

      darkMode: true,

      accessibility: true,

      reducedMotion: true

    },


    /* =====================================================
       SEO
       ===================================================== */

    seo: {

      enabled: true,

      structuredData: true,

      sitemap: true,

      robots: true,

      dynamicMeta: true

    },


    /* =====================================================
       OPTIONAL
       ===================================================== */

    optional: {

      analytics: false,

      cloudSync: false,

      authentication: false,

      backend: false,

      apiDependency: false,

      paidFeatures: false

    }

  };


  window.DIPO = window.DIPO || {};

  window.DIPO.features = FEATURES;


  /* -------------------------------------------------------
     Feature checker
     ------------------------------------------------------- */

  window.DIPO.isFeatureEnabled = function (path) {

    if (!path || typeof path !== "string") {
      return false;
    }

    const parts = path.split(".");

    let current = FEATURES;

    for (let i = 0; i < parts.length; i++) {

      if (
        current === undefined ||
        current === null ||
        !(parts[i] in current)
      ) {
        return false;
      }

      current = current[parts[i]];
    }

    return current === true;

  };


})(window);