/* =========================================================
   DIPO QR — PRINT
   ========================================================= */

(function (window) {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};
  DIPO.QR = DIPO.QR || {};

  function printElement(element) {

    if (!element) {
      throw new Error(
        "Nothing to print."
      );
    }

    const printWindow =
      window.open(
        "",
        "_blank",
        "width=900,height=900"
      );

    if (!printWindow) {
      throw new Error(
        "Popup blocked. Please allow popups."
      );
    }

    const html =
      element.outerHTML;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>dipo QR</title>

        <style>
          * {
            box-sizing: border-box;
          }

          html,
          body {
            margin: 0;
            padding: 0;
            background: #ffffff;
          }

          body {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
          }

          .print-area {
            width: 90vw;
            max-width: 800px;
            text-align: center;
          }

          svg,
          canvas,
          img {
            max-width: 100%;
            height: auto;
          }

          .brand {
            margin-top: 24px;
            font-size: 18px;
            font-weight: 700;
          }

          .sub {
            margin-top: 6px;
            font-size: 12px;
            color: #666;
          }

          @media print {
            body {
              min-height: auto;
            }
          }
        </style>
      </head>

      <body>

        <div class="print-area">

          ${html}

          <div class="brand">
            dipo QR
          </div>

          <div class="sub">
            Created with dipo World
          </div>

        </div>

      </body>

      </html>
    `);

    printWindow.document.close();

    printWindow.focus();

    setTimeout(() => {

      printWindow.print();

      printWindow.close();

    }, 300);

    return true;
  }

  DIPO.QR.Print = {
    printElement
  };

})(window);