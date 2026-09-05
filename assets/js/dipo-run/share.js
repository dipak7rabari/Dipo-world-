/* =========================================================
   DIPO RUN — SHARE
   Project sharing utilities
   ========================================================= */

(function (window) {
  "use strict";

  const DipoRun = window.DipoRun = window.DipoRun || {};

  const Share = {

    createPayload(project = {}) {

      return {
        version: 1,
        title: project.title || "DIPO RUN Project",
        code: project.code || "",
        language: project.language || "javascript",
        createdAt: Date.now()
      };
    },

    encode(project = {}) {

      const payload =
        this.createPayload(project);

      const json =
        JSON.stringify(payload);

      const bytes =
        new TextEncoder().encode(json);

      let binary = "";

      bytes.forEach(byte => {
        binary += String.fromCharCode(byte);
      });

      return btoa(binary)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    },

    decode(value = "") {

      try {

        let base64 =
          value
            .replace(/-/g, "+")
            .replace(/_/g, "/");

        while (base64.length % 4) {
          base64 += "=";
        }

        const binary =
          atob(base64);

        const bytes =
          Uint8Array.from(
            binary,
            char => char.charCodeAt(0)
          );

        const json =
          new TextDecoder().decode(bytes);

        return JSON.parse(json);

      } catch (error) {

        console.warn(
          "DIPO RUN share decode failed:",
          error
        );

        return null;
      }
    },

    async copyLink(project = {}) {

      const encoded =
        this.encode(project);

      const base =
        `${location.origin}${location.pathname}`;

      const url =
        `${base}?code=${encodeURIComponent(encoded)}`;

      try {

        await navigator.clipboard.writeText(url);

        DipoRun.Console?.success(
          "Share link copied."
        );

        return url;

      } catch (error) {

        DipoRun.Console?.error(
          "Unable to copy share link."
        );

        return null;
      }
    },

    getFromURL() {

      const params =
        new URLSearchParams(
          location.search
        );

      const value =
        params.get("code");

      if (!value) return null;

      return this.decode(value);
    }
  };

  DipoRun.Share = Share;

})(window);