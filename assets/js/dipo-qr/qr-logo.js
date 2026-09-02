/* =========================================================
   DIPO QR — LOGO MANAGER
   ========================================================= */

(function (window) {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};
  DIPO.QR = DIPO.QR || {};

  function fileToDataURL(file) {
    return new Promise((resolve, reject) => {

      if (!file) {
        reject(new Error("No file selected."));
        return;
      }

      const allowed = [
        "image/png",
        "image/jpeg",
        "image/webp",
        "image/svg+xml"
      ];

      if (!allowed.includes(file.type)) {
        reject(
          new Error(
            "Only PNG, JPG, WEBP and SVG files are supported."
          )
        );

        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(
          new Error("Unable to read logo.")
        );
      };

      reader.readAsDataURL(file);
    });
  }

  async function setLogo(file) {
    const dataURL = await fileToDataURL(file);

    DIPO.QR.setState({
      logo: dataURL
    });

    return dataURL;
  }

  function removeLogo() {
    DIPO.QR.setState({
      logo: null
    });
  }

  function getLogo() {
    return DIPO.QR.getState().logo;
  }

  DIPO.QR.Logo = {
    setLogo,
    removeLogo,
    getLogo,
    fileToDataURL
  };

})(window);