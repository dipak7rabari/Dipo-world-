/* =========================================================
   DIPO WORLD — BRANDING CONFIGURATION
   ========================================================= */

(function (window) {
  "use strict";

  const BRANDING = {

    /* -----------------------------------------------------
       Main Brand
       ----------------------------------------------------- */

    brand: {
      name: "DIPO WORLD",

      displayName: "dipo World",

      shortName: "dipo",

      tagline: "Create. Customize. Stand Out.",

      parentBrand: "DIPO WORLD"
    },


    /* -----------------------------------------------------
       DIPO BIO
       ----------------------------------------------------- */

    bio: {
      name: "DIPO BIO",

      displayName: "dipo BIO",

      tagline: "Style Your Identity.",

      description:
        "Create stylish bios, symbols, kaomoji, fonts and aesthetic text."
    },


    /* -----------------------------------------------------
       DIPO QR
       ----------------------------------------------------- */

    qr: {
      name: "DIPO QR",

      displayName: "dipo QR",

      tagline: "Scan. Style. Stand Out.",

      description:
        "Create artistic QR codes and creative silhouette barcodes.",

      watermark: "dipo QR",

      watermarkLocked: true,

      footerText: "Created with dipo World"
    },


    /* -----------------------------------------------------
       Creator / Ownership
       ----------------------------------------------------- */

    creator: {
      name: "𝔄 𝔇𝔐 𝔭𝔯𝔬𝔡𝔲𝔠𝔱",

      displayName: "𝔄 𝔇𝔐 𝔭𝔯𝔬𝔡𝔲𝔠𝔱",

      copyright:
        "All copyrights reserved @ 𝔄 𝔇𝔐 𝔭𝔯𝔬𝔡𝔲𝔠𝔱"
    },


    /* -----------------------------------------------------
       Social
       ----------------------------------------------------- */

    social: {

      instagram: {
        username: "dipolabs.io",

        url: "https://www.instagram.com/dipolabs.io/"
      }

    },


    /* -----------------------------------------------------
       Footer
       ----------------------------------------------------- */

    footer: {

      madeInIndia: "Made With ❤️ in India",

      creator: "𝔄 𝔇𝔐 𝔭𝔯𝔬𝔡𝔲𝔠𝔱",

      copyright:
        "All copyrights reserved @ 𝔄 𝔇𝔐 𝔭𝔯𝔬𝔡𝔲𝔠𝔱",

      links: {
        privacy: "/pages/privacy/",
        terms: "/pages/terms/",
        about: "/pages/about/"
      }

    },


    /* -----------------------------------------------------
       Assets
       ----------------------------------------------------- */

    assets: {

      logo:
        "/assets/icons/logo/dipo-world.svg",

      bioLogo:
        "/assets/icons/logo/dipo-bio.svg",

      qrLogo:
        "/assets/icons/logo/dipo-qr.svg"

    }

  };


  window.DIPO = window.DIPO || {};

  window.DIPO.branding = BRANDING;


})(window);