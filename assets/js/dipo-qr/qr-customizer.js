/* =========================================================
   DIPO QR — CUSTOMIZER
   ========================================================= */

(function (window) {
  "use strict";

  const DIPO = window.DIPO = window.DIPO || {};
  DIPO.QR = DIPO.QR || {};

  function setDots(type) {
    const allowed = [
      "rounded",
      "extra-rounded",
      "classy-rounded",
      "dots",
      "square"
    ];

    if (!allowed.includes(type)) {
      return false;
    }

    DIPO.QR.setState({
      dots: type
    });

    return true;
  }

  function setEyeFrame(type) {
    const allowed = [
      "square",
      "rounded",
      "extra-rounded"
    ];

    if (!allowed.includes(type)) {
      return false;
    }

    DIPO.QR.setState({
      eyeFrame: type
    });

    return true;
  }

  function setEyeDot(type) {
    const allowed = [
      "square",
      "rounded",
      "extra-rounded"
    ];

    if (!allowed.includes(type)) {
      return false;
    }

    DIPO.QR.setState({
      eyeDot: type
    });

    return true;
  }

  function setColors(foreground, background) {
    const updates = {};

    if (foreground) {
      updates.foreground = foreground;
    }

    if (background) {
      updates.background = background;
    }

    DIPO.QR.setState(updates);

    return DIPO.QR.getState();
  }

  function setSize(size) {
    size = Number(size);

    if (!Number.isFinite(size)) {
      return false;
    }

    size = Math.max(200, Math.min(3000, size));

    DIPO.QR.setState({
      size
    });

    return size;
  }

  function setMargin(margin) {
    margin = Number(margin);

    if (!Number.isFinite(margin)) {
      return false;
    }

    margin = Math.max(0, Math.min(200, margin));

    DIPO.QR.setState({
      margin
    });

    return margin;
  }

  function setContent(content) {
    DIPO.QR.setState({
      content: String(content || "")
    });

    return DIPO.QR.getState();
  }

  function setTransparent(value) {
    DIPO.QR.setState({
      transparent: Boolean(value)
    });
  }

  DIPO.QR.Customizer = {
    setDots,
    setEyeFrame,
    setEyeDot,
    setColors,
    setSize,
    setMargin,
    setContent,
    setTransparent
  };

})(window);