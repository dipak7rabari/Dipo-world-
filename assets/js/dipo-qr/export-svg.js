/* =========================================================
   DIPO QR — SVG EXPORT
   ========================================================= */

(function (window) {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};
  DIPO.QR = DIPO.QR || {};

  function serialize(element) {

    if (!element) {
      throw new Error(
        "SVG element not found."
      );
    }

    if (!(element instanceof SVGElement)) {
      throw new Error(
        "Element must be SVG."
      );
    }

    const serializer =
      new XMLSerializer();

    return serializer.serializeToString(
      element
    );
  }

  function download(
    element,
    filename = "dipo-qr.svg"
  ) {

    const svgString =
      serialize(element);

    const blob =
      new Blob(
        [svgString],
        {
          type: "image/svg+xml;charset=utf-8"
        }
      );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = filename;

    link.click();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);

    return true;
  }

  async function copy(element) {

    const svgString =
      serialize(element);

    await navigator.clipboard.writeText(
      svgString
    );

    return true;
  }

  DIPO.QR.ExportSVG = {
    serialize,
    download,
    copy
  };

})(window);