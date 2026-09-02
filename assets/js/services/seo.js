/* =========================================================
   DIPO WORLD — SEO SERVICE
   Dynamic page title, description and canonical handling.
========================================================= */

(function (window, document) {
  "use strict";

  const SEO = {
    initialized: false,

    defaultData: {
      title: "DIPO WORLD — Creative Tools for Everyone",
      description:
        "DIPO WORLD provides free creative tools including DIPO Bio and DIPO QR.",
      image: "/assets/images/branding/dipo-world-og.png"
    },

    init() {
      if (this.initialized) return;

      this.ensureMetaTags();

      this.initialized = true;
    },

    getOrCreateMeta(name, attribute = "name") {
      let meta = document.head.querySelector(
        `meta[${attribute}="${name}"]`
      );

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }

      return meta;
    },

    setTitle(title) {
      if (!title) return;

      document.title = title;

      const ogTitle =
        this.getOrCreateMeta(
          "og:title",
          "property"
        );

      ogTitle.setAttribute(
        "content",
        title
      );
    },

    setDescription(description) {
      if (!description) return;

      const meta =
        this.getOrCreateMeta(
          "description"
        );

      meta.setAttribute(
        "content",
        description
      );

      const ogDescription =
        this.getOrCreateMeta(
          "og:description",
          "property"
        );

      ogDescription.setAttribute(
        "content",
        description
      );
    },

    setCanonical(url = window.location.href) {
      let canonical =
        document.head.querySelector(
          'link[rel="canonical"]'
        );

      if (!canonical) {
        canonical =
          document.createElement("link");

        canonical.rel = "canonical";

        document.head.appendChild(
          canonical
        );
      }

      canonical.href = url;
    },

    setOpenGraphImage(image) {
      if (!image) return;

      const ogImage =
        this.getOrCreateMeta(
          "og:image",
          "property"
        );

      ogImage.setAttribute(
        "content",
        image
      );
    },

    setPage(data = {}) {
      const config = {
        ...this.defaultData,
        ...data
      };

      this.setTitle(config.title);
      this.setDescription(
        config.description
      );
      this.setCanonical(
        config.url ||
          window.location.href
      );
      this.setOpenGraphImage(
        config.image
      );
    },

    ensureMetaTags() {
      this.setPage(
        this.defaultData
      );

      const viewport =
        this.getOrCreateMeta(
          "viewport"
        );

      viewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, viewport-fit=cover"
      );

      const themeColor =
        this.getOrCreateMeta(
          "theme-color"
        );

      themeColor.setAttribute(
        "content",
        "#0b0d10"
      );
    }
  };

  window.DIPO = window.DIPO || {};
  window.DIPO.seo = SEO;

})(window, document);