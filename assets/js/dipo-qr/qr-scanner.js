/* =========================================================
   DIPO QR — SCANNER HELPER
   Uses BarcodeDetector when browser supports it.
   ========================================================= */

(function (window) {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};
  DIPO.QR = DIPO.QR || {};

  function supported() {
    return "BarcodeDetector" in window;
  }

  async function scanImage(file) {

    if (!supported()) {
      throw new Error(
        "QR scanner is not supported by this browser."
      );
    }

    const detector = new BarcodeDetector({
      formats: [
        "qr_code"
      ]
    });

    const bitmap =
      await createImageBitmap(file);

    const results =
      await detector.detect(bitmap);

    bitmap.close();

    if (!results.length) {
      return null;
    }

    return results[0].rawValue || null;
  }

  DIPO.QR.Scanner = {
    supported,
    scanImage
  };

})(window);