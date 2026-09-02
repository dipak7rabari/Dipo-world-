/* =========================================================
   DIPO QR — PNG EXPORT
   ========================================================= */

(function (window) {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};
  DIPO.QR = DIPO.QR || {};

  async function downloadPNG(
    element,
    filename = "dipo-qr.png"
  ) {

    if (!element) {
      throw new Error(
        "Nothing to export."
      );
    }

    let canvas;

    if (element instanceof HTMLCanvasElement) {
      canvas = element;

    } else if (element instanceof SVGElement) {

      const serializer =
        new XMLSerializer();

      const svgString =
        serializer.serializeToString(
          element
        );

      const blob =
        new Blob(
          [svgString],
          {
            type: "image/svg+xml"
          }
        );

      const url =
        URL.createObjectURL(blob);

      const img =
        new Image();

      await new Promise(
        (resolve, reject) => {

          img.onload = resolve;
          img.onerror = reject;

          img.src = url;
        }
      );

      canvas =
        document.createElement(
          "canvas"
        );

      canvas.width =
        element.viewBox.baseVal.width ||
        1000;

      canvas.height =
        element.viewBox.baseVal.height ||
        1000;

      const ctx =
        canvas.getContext("2d");

      ctx.fillStyle =
        DIPO.QR.getState().background ||
        "#ffffff";

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      ctx.drawImage(
        img,
        0,
        0,
        canvas.width,
        canvas.height
      );

      URL.revokeObjectURL(url);

    } else {
      throw new Error(
        "Unsupported export element."
      );
    }

    const link =
      document.createElement("a");

    link.download = filename;

    link.href =
      canvas.toDataURL(
        "image/png",
        1
      );

    link.click();

    return true;
  }

  DIPO.QR.ExportPNG = {
    download: downloadPNG
  };

})(window);