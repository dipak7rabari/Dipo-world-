/* =========================================================
   DIPO RUN — GOD LEVEL APP CONTROLLER
   Connects every button + module
   ========================================================= */

(function () {
  "use strict";

  window.DipoRun = window.DipoRun || {};

  const DR = window.DipoRun;

  const state = {
    initialized: false
  };

  function $(selector) {
    return document.querySelector(selector);
  }

  function notify(message, type = "success") {
    if (typeof DR.toast === "function") {
      DR.toast(message, type);
      return;
    }

    if (typeof DR.showToast === "function") {
      DR.showToast(message, type);
      return;
    }

    const toast = $("#toast");

    if (!toast) {
      console.log("[DIPO RUN]", message);
      return;
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toast.__dipoTimer);

    toast.__dipoTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }

  function log(message, type = "info") {
    if (typeof DR.consoleLog === "function") {
      DR.consoleLog(message, type);
      return;
    }

    if (typeof DR.log === "function") {
      DR.log(message, type);
      return;
    }

    console.log(`[DIPO RUN ${type}]`, message);
  }

  function callModule(module, method, ...args) {
    try {
      if (
        DR[module] &&
        typeof DR[module][method] === "function"
      ) {
        return DR[module][method](...args);
      }
    } catch (error) {
      console.error(
        `DIPO RUN ${module}.${method} failed:`,
        error
      );

      log(
        error?.message ||
          `${module}.${method} failed.`,
        "error"
      );
    }

    return null;
  }

  function findEditor() {
    return (
      $("#codeEditor") ||
      document.querySelector("[data-code-editor]")
    );
  }

  function getCode() {
    const editor = findEditor();

    if (!editor) return "";

    if ("value" in editor) {
      return editor.value || "";
    }

    return editor.textContent || "";
  }

  function runCode() {
    const code = getCode();

    if (!code.trim()) {
      notify(
        "Write or paste some code first.",
        "warning"
      );

      log(
        "Run skipped because editor is empty.",
        "warning"
      );

      return;
    }

    /*
     * Prefer the dedicated runner module.
     */
    if (
      DR.runner &&
      typeof DR.runner.run === "function"
    ) {
      return DR.runner.run(code);
    }

    if (
      DR.runner &&
      typeof DR.runner.execute === "function"
    ) {
      return DR.runner.execute(code);
    }

    if (
      typeof DR.runCode === "function"
    ) {
      return DR.runCode(code);
    }

    /*
     * Last-resort HTML preview.
     */
    if (
      DR.preview &&
      typeof DR.preview.setPreviewHTML === "function"
    ) {
      DR.preview.setPreviewHTML(code);

      log(
        "Code executed · HTML",
        "success"
      );

      notify(
        "Code executed.",
        "success"
      );

      return;
    }

    notify(
      "Runner is not available yet.",
      "error"
    );
  }

  function newProject() {
    const editor = findEditor();

    if (!editor) {
      notify(
        "Editor not found.",
        "error"
      );
      return;
    }

    const starter = "";

    if ("value" in editor) {
      editor.value = starter;

      editor.dispatchEvent(
        new Event("input", {
          bubbles: true
        })
      );

      editor.dispatchEvent(
        new Event("change", {
          bubbles: true
        })
      );
    } else {
      editor.textContent = starter;
    }

    if (
      DR.editor &&
      typeof DR.editor.clear === "function"
    ) {
      DR.editor.clear();
    }

    if (
      DR.preview &&
      typeof DR.preview.setPreviewHTML === "function"
    ) {
      DR.preview.setPreviewHTML("");
    }

    notify(
      "New blank project created.",
      "success"
    );

    log(
      "New project created.",
      "success"
    );
  }

  function saveProject() {
    const code = getCode();

    if (!code.trim()) {
      notify(
        "Nothing to save.",
        "warning"
      );
      return;
    }

    if (
      DR.storage &&
      typeof DR.storage.save === "function"
    ) {
      DR.storage.save({
        code
      });

      notify(
        "Project saved locally.",
        "success"
      );

      log(
        "Project saved locally.",
        "success"
      );

      return;
    }

    if (
      DR.storage &&
      typeof DR.storage.saveProject === "function"
    ) {
      DR.storage.saveProject({
        code
      });

      notify(
        "Project saved locally.",
        "success"
      );

      return;
    }

    try {
      localStorage.setItem(
        "dipo-run-project",
        JSON.stringify({
          code,
          updatedAt: Date.now()
        })
      );

      notify(
        "Project saved locally.",
        "success"
      );

      log(
        "Project saved locally.",
        "success"
      );
    } catch (error) {
      console.error(error);

      notify(
        "Could not save the project.",
        "error"
      );
    }
  }

  async function shareProject() {
    const code = getCode();

    if (!code.trim()) {
      notify(
        "Write some code before sharing.",
        "warning"
      );
      return;
    }

    /*
     * Prefer existing DIPO RUN share module.
     */
    if (
      DR.share &&
      typeof DR.share.share === "function"
    ) {
      return DR.share.share();
    }

    if (
      DR.share &&
      typeof DR.share.createShareLink === "function"
    ) {
      return DR.share.createShareLink(code);
    }

    const url = window.location.href;

    if (
      navigator.share
    ) {
      try {
        await navigator.share({
          title: "DIPO RUN",
          text: "Check out my DIPO RUN project.",
          url
        });

        notify(
          "Share sheet opened.",
          "success"
        );

        return;
      } catch (error) {
        if (
          error?.name === "AbortError"
        ) {
          return;
        }
      }
    }

    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {
      try {
        await navigator.clipboard.writeText(url);

        notify(
          "Preview link copied.",
          "success"
        );

        return;
      } catch (_) {}
    }

    notify(
      "Copy the page link from your browser.",
      "info"
    );
  }

  function downloadVideo() {
    if (
      DR.preview &&
      typeof DR.preview.record === "function"
    ) {
      const button =
        $("#downloadBtn") ||
        $("#downloadButton") ||
        document.querySelector(
          '[data-action="download"]'
        );

      let duration = 10000;

      if (button?.dataset.duration) {
        duration =
          Number(button.dataset.duration) ||
          10000;
      }

      const durationInput =
        $("#recordDuration");

      if (durationInput?.value) {
        const parsed =
          Number(durationInput.value);

        if (
          Number.isFinite(parsed) &&
          parsed >= 1000
        ) {
          duration = parsed;
        }
      }

      return DR.preview.record({
        duration
      });
    }

    notify(
      "Video recorder is not available.",
      "error"
    );
  }

  function downloadCode() {
    if (
      DR.preview &&
      typeof DR.preview.downloadSourceCode ===
        "function"
    ) {
      DR.preview.downloadSourceCode();
      return;
    }

    const code = getCode();

    if (!code.trim()) {
      notify(
        "There is no code to download.",
        "warning"
      );
      return;
    }

    const blob = new Blob(
      [code],
      {
        type:
          "text/html;charset=utf-8"
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "dipo-run-project.html";

    document.body.appendChild(link);

    link.click();

    link.remove();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 3000);

    notify(
      "Code downloaded.",
      "success"
    );
  }

  async function fullscreenPreview() {
    if (
      DR.preview &&
      typeof DR.preview.fullscreen ===
        "function"
    ) {
      return DR.preview.fullscreen();
    }
  }

  function refreshPreview() {
    if (
      DR.preview &&
      typeof DR.preview.refresh ===
        "function"
    ) {
      return DR.preview.refresh();
    }

    notify(
      "Preview refresh is unavailable.",
      "error"
    );
  }

  function toggleAutoRun() {
    if (
      DR.autoRun &&
      typeof DR.autoRun.toggle ===
        "function"
    ) {
      DR.autoRun.toggle();
      return;
    }

    const button =
      $("#autoRunToggle") ||
      document.querySelector(
        '[data-action="auto-run"]'
      );

    if (!button) return;

    const enabled =
      button.getAttribute(
        "aria-pressed"
      ) === "true";

    button.setAttribute(
      "aria-pressed",
      String(!enabled)
    );

    button.classList.toggle(
      "active",
      !enabled
    );

    notify(
      !enabled
        ? "Auto Run ON"
        : "Auto Run OFF",
      "success"
    );
  }

  function bind(selector, handler) {
    document
      .querySelectorAll(selector)
      .forEach((element) => {
        if (
          element.dataset.dipoAppBound
        ) {
          return;
        }

        element.dataset.dipoAppBound =
          "true";

        element.addEventListener(
          "click",
          function (event) {
            event.preventDefault();
            handler(event);
          }
        );
      });
  }

  function wireButtons() {
    /*
     * NEW
     */
    bind(
      [
        "#newProjectBtn",
        "#newBtn",
        '[data-action="new"]'
      ].join(","),
      newProject
    );

    /*
     * SAVE
     */
    bind(
      [
        "#saveBtn",
        "#saveProjectBtn",
        '[data-action="save"]'
      ].join(","),
      saveProject
    );

    /*
     * SHARE
     */
    bind(
      [
        "#shareBtn",
        "#shareButton",
        '[data-action="share"]'
      ].join(","),
      shareProject
    );

    /*
     * DOWNLOAD VIDEO
     */
    bind(
      [
        "#downloadBtn",
        "#downloadButton",
        '[data-action="download"]'
      ].join(","),
      downloadVideo
    );

    /*
     * RUN
     */
    bind(
      [
        "#runBtn",
        "#runCodeBtn",
        '[data-action="run"]'
      ].join(","),
      runCode
    );

    /*
     * REFRESH
     */
    bind(
      [
        "#previewRefresh",
        "#refreshPreview",
        '[data-action="refresh-preview"]'
      ].join(","),
      refreshPreview
    );

    /*
     * FULLSCREEN
     */
    bind(
      [
        "#previewFullscreen",
        "#fullscreenPreview",
        '[data-action="fullscreen-preview"]'
      ].join(","),
      fullscreenPreview
    );

    /*
     * AUTO RUN
     */
    bind(
      [
        "#autoRunToggle",
        '[data-action="auto-run"]'
      ].join(","),
      toggleAutoRun
    );

    /*
     * DOWNLOAD SOURCE
     */
    bind(
      [
        "#downloadCodeBtn",
        '[data-action="download-code"]'
      ].join(","),
      downloadCode
    );
  }

  function bindKeyboard() {
    document.addEventListener(
      "keydown",
      function (event) {
        const modifier =
          event.ctrlKey ||
          event.metaKey;

        /*
         * Ctrl/Cmd + Enter = Run
         */
        if (
          modifier &&
          event.key === "Enter"
        ) {
          event.preventDefault();
          runCode();
        }

        /*
         * Ctrl/Cmd + S = Save
         */
        if (
          modifier &&
          event.key.toLowerCase() === "s"
        ) {
          event.preventDefault();
          saveProject();
        }
      }
    );
  }

  function initializeModules() {
    /*
     * Each module safely initializes itself.
     * These calls are optional and never crash the app.
     */

    callModule(
      "storage",
      "init"
    );

    callModule(
      "console",
      "init"
    );

    callModule(
      "editor",
      "init"
    );

    callModule(
      "languageDetector",
      "init"
    );

    callModule(
      "runner",
      "init"
    );

    callModule(
      "preview",
      "init"
    );

    callModule(
      "devices",
      "init"
    );

    callModule(
      "autoRun",
      "init"
    );

    callModule(
      "share",
      "init"
    );

    callModule(
      "animation",
      "init"
    );
  }

  function init() {
    if (state.initialized) {
      return;
    }

    state.initialized = true;

    initializeModules();

    wireButtons();

    bindKeyboard();

    /*
     * Make sure preview exists even when
     * another module initialized first.
     */
    if (
      DR.preview &&
      typeof DR.preview.init === "function"
    ) {
      DR.preview.init();
    }

    log(
      "DIPO RUN connected to DIPO WORLD.",
      "success"
    );

    log(
      "DIPO RUN application initialized.",
      "success"
    );
  }

  DR.app = {
    init,
    run: runCode,
    newProject,
    save: saveProject,
    share: shareProject,
    downloadVideo,
    downloadCode,
    refresh: refreshPreview,
    fullscreen: fullscreenPreview
  };

  /*
   * Global shortcuts for other DIPO RUN modules.
   */
  DR.runCode = runCode;
  DR.saveProject = saveProject;
  DR.shareProject = shareProject;
  DR.downloadPreviewVideo = downloadVideo;

  window.DipoRunApp = DR.app;

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      { once: true }
    );
  } else {
    init();
  }

})();