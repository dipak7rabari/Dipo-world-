/* =========================================================
   DIPO WORLD — DOWNLOAD ENGINE
   File: assets/js/core/download.js
   ========================================================= */

(() => {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};

  function downloadBlob(blob, filename) {
    if (!(blob instanceof Blob)) {
      throw new Error("Invalid download data.");
    }

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = filename || "dipo-world-file";

    document.body.appendChild(link);

    link.click();

    link.remove();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  function downloadText(text, filename = "dipo-world.txt") {
    const blob = new Blob(
      [String(text)],
      {
        type: "text/plain;charset=utf-8"
      }
    );

    downloadBlob(blob, filename);
  }

  function downloadJSON(data, filename = "dipo-world.json") {
    const json = JSON.stringify(data, null, 2);

    const blob = new Blob(
      [json],
      {
        type: "application/json;charset=utf-8"
      }
    );

    downloadBlob(blob, filename);
  }

  function downloadDataURL(dataURL, filename) {
    const link = document.createElement("a");

    link.href = dataURL;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    link.remove();
  }

  function downloadCanvas(canvas, filename = "dipo-world.png") {
    if (!canvas) {
      throw new Error("Canvas not found.");
    }

    canvas.toBlob((blob) => {
      if (blob) {
        downloadBlob(blob, filename);
      }
    }, "image/png");
  }

  DIPO.download = {
    blob: downloadBlob,
    text: downloadText,
    json: downloadJSON,
    dataURL: downloadDataURL,
    canvas: downloadCanvas
  };

})();