/* =========================================================
   DIPO RUN — GOD LEVEL PREVIEW ENGINE
   Live Preview + Refresh + Fullscreen + Video Recording
   ========================================================= */

(function () {
  "use strict";

  window.DipoRun = window.DipoRun || {};

  const DR = window.DipoRun;

  const state = {
    frame: null,
    shell: null,
    recorder: null,
    stream: null,
    chunks: [],
    recording: false,
    recordingStartedAt: 0,
    maxDuration: 10000
  };

  function $(selector) {
    return document.querySelector(selector);
  }

  function findPreviewFrame() {
    return (
      $("#previewFrame") ||
      document.querySelector("[data-preview-frame]") ||
      document.querySelector("iframe")
    );
  }

  function findPreviewShell() {
    return (
      $("#previewShell") ||
      $("#previewContainer") ||
      document.querySelector("[data-preview-shell]") ||
      state.frame?.parentElement
    );
  }

  function getEditorCode() {
    const editor =
      $("#codeEditor") ||
      document.querySelector("[data-code-editor]");

    if (!editor) return "";

    if ("value" in editor) return editor.value || "";

    return editor.textContent || editor.innerText || "";
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

    if (toast) {
      toast.textContent = message;
      toast.classList.add("show");

      clearTimeout(toast.__dipoTimer);

      toast.__dipoTimer = setTimeout(() => {
        toast.classList.remove("show");
      }, 2600);

      return;
    }

    console.log("[DIPO RUN]", message);
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

    console.log("[DIPO RUN]", message);
  }

  function setFrame(frame) {
    state.frame = frame || findPreviewFrame();
    state.shell = findPreviewShell();

    if (!state.frame) return false;

    state.frame.setAttribute("title", "DIPO RUN Live Preview");

    return true;
  }

  function refresh() {
    const frame = state.frame || findPreviewFrame();

    if (!frame) {
      notify("Preview frame not found.", "error");
      return false;
    }

    try {
      if (frame.contentWindow) {
        frame.contentWindow.location.reload();
      } else {
        frame.src = frame.src;
      }

      log("Preview refreshed.", "success");
      notify("Preview refreshed.", "success");

      return true;
    } catch (error) {
      frame.src = frame.src;
      log("Preview refreshed.", "success");
      return true;
    }
  }

  function setPreviewHTML(html) {
    const frame = state.frame || findPreviewFrame();

    if (!frame) {
      notify("Preview frame not found.", "error");
      return false;
    }

    const source = String(html || "");

    try {
      frame.srcdoc = source;

      frame.onload = function () {
        log("Preview loaded successfully.", "success");
      };

      return true;
    } catch (error) {
      console.error(error);
      log("Preview could not be loaded.", "error");
      notify("Preview error.", "error");
      return false;
    }
  }

  async function openFullscreen() {
    const target = state.shell || findPreviewShell() || state.frame;

    if (!target) {
      notify("Preview area not found.", "error");
      return;
    }

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }

      if (target.requestFullscreen) {
        await target.requestFullscreen();
        return;
      }

      if (state.frame?.requestFullscreen) {
        await state.frame.requestFullscreen();
        return;
      }

      notify("Fullscreen is not supported here.", "error");
    } catch (error) {
      console.error(error);
      notify("Fullscreen was blocked by the browser.", "error");
    }
  }

  function getSupportedMimeType() {
    if (!window.MediaRecorder) return "";

    const types = [
      "video/webm;codecs=vp9",
      "video/webm;codecs=vp8",
      "video/webm"
    ];

    for (const type of types) {
      try {
        if (MediaRecorder.isTypeSupported(type)) {
          return type;
        }
      } catch (_) {}
    }

    return "";
  }

  function downloadBlob(blob, filename) {
    if (!blob || !blob.size) {
      notify("No video data was created.", "error");
      return;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 5000);
  }

  function getFilename() {
    const stamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .replace("T", "_")
      .replace("Z", "");

    return `dipo-run-preview-${stamp}.webm`;
  }

  function stopRecording() {
    if (!state.recorder) return;

    try {
      if (state.recorder.state !== "inactive") {
        state.recorder.stop();
      }
    } catch (error) {
      console.error(error);
    }
  }

  function cleanupRecording() {
    if (state.stream) {
      state.stream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (_) {}
      });
    }

    state.stream = null;
    state.recorder = null;
    state.chunks = [];
    state.recording = false;

    document.documentElement.classList.remove("dipo-recording");

    const button =
      $("#downloadBtn") ||
      $("#downloadButton") ||
      document.querySelector('[data-action="download"]');

    if (button) {
      button.disabled = false;
      button.classList.remove("is-recording");
      button.removeAttribute("aria-busy");
    }
  }

  function updateRecordingUI(active) {
    const button =
      $("#downloadBtn") ||
      $("#downloadButton") ||
      document.querySelector('[data-action="download"]');

    if (!button) return;

    if (active) {
      button.classList.add("is-recording");
      button.setAttribute("aria-busy", "true");
      button.disabled = false;

      const original =
        button.dataset.originalLabel ||
        button.textContent ||
        "Download";

      if (!button.dataset.originalLabel) {
        button.dataset.originalLabel = original;
      }

      button.textContent = "⏺ Recording…";
    } else {
      button.classList.remove("is-recording");
      button.removeAttribute("aria-busy");
      button.disabled = false;

      if (button.dataset.originalLabel) {
        button.textContent = button.dataset.originalLabel;
      }
    }
  }

  async function recordPreview(options = {}) {
    if (state.recording) {
      stopRecording();
      return;
    }

    if (!navigator.mediaDevices?.getDisplayMedia) {
      notify(
        "Video recording is not supported by this browser. Try Chrome or Edge.",
        "error"
      );

      log(
        "Browser does not support screen/tab recording.",
        "error"
      );

      return;
    }

    if (!window.MediaRecorder) {
      notify(
        "MediaRecorder is not supported by this browser.",
        "error"
      );

      return;
    }

    const mimeType = getSupportedMimeType();

    if (!mimeType) {
      notify(
        "This browser cannot create a WebM recording.",
        "error"
      );

      return;
    }

    const duration = Math.max(
      1000,
      Number(options.duration || state.maxDuration || 10000)
    );

    state.maxDuration = duration;

    try {
      /*
       * Browser security requires user permission for tab/screen capture.
       * The user should select the DIPO RUN preview/current tab.
       */
      notify(
        "Select this tab to record the DIPO RUN preview.",
        "info"
      );

      log(
        "Waiting for browser recording permission…",
        "info"
      );

      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          frameRate: {
            ideal: 30,
            max: 60
          }
        },
        audio: false
      });

      state.stream = stream;
      state.chunks = [];
      state.recording = true;
      state.recordingStartedAt = Date.now();

      updateRecordingUI(true);

      const recorderOptions = {
        mimeType
      };

      let recorder;

      try {
        recorder = new MediaRecorder(stream, recorderOptions);
      } catch (_) {
        recorder = new MediaRecorder(stream);
      }

      state.recorder = recorder;

      recorder.ondataavailable = function (event) {
        if (event.data && event.data.size > 0) {
          state.chunks.push(event.data);
        }
      };

      recorder.onerror = function (event) {
        console.error("DIPO RUN recorder error:", event);

        log(
          "Video recording failed.",
          "error"
        );

        notify(
          "Video recording failed.",
          "error"
        );

        cleanupRecording();
      };

      recorder.onstop = function () {
        const chunks = state.chunks.slice();

        const finalType =
          recorder.mimeType ||
          mimeType ||
          "video/webm";

        const blob = new Blob(chunks, {
          type: finalType
        });

        cleanupRecording();

        if (!blob.size) {
          notify(
            "Recording was empty. Please try again.",
            "error"
          );

          return;
        }

        downloadBlob(
          blob,
          getFilename()
        );

        log(
          "Preview video downloaded successfully.",
          "success"
        );

        notify(
          "Preview video downloaded.",
          "success"
        );
      };

      stream.getVideoTracks().forEach((track) => {
        track.addEventListener("ended", function () {
          if (state.recording) {
            stopRecording();
          }
        });
      });

      recorder.start(250);

      document.documentElement.classList.add(
        "dipo-recording"
      );

      log(
        `Recording started · ${Math.round(duration / 1000)}s`,
        "success"
      );

      notify(
        `Recording started · ${Math.round(duration / 1000)} seconds`,
        "success"
      );

      setTimeout(() => {
        if (state.recording) {
          stopRecording();
        }
      }, duration);

    } catch (error) {
      console.error("DIPO RUN recording:", error);

      cleanupRecording();

      if (
        error?.name === "NotAllowedError" ||
        error?.name === "AbortError"
      ) {
        notify(
          "Recording cancelled.",
          "info"
        );

        log(
          "Recording permission was cancelled.",
          "warning"
        );

        return;
      }

      notify(
        "Unable to start video recording.",
        "error"
      );

      log(
        error?.message || "Unable to start recording.",
        "error"
      );
    }
  }

  function downloadSourceCode() {
    const code = getEditorCode();

    if (!code.trim()) {
      notify(
        "There is no code to download.",
        "warning"
      );
      return;
    }

    const blob = new Blob([code], {
      type: "text/html;charset=utf-8"
    });

    downloadBlob(
      blob,
      "dipo-run-project.html"
    );

    log(
      "Source code downloaded.",
      "success"
    );
  }

  function wireButtons() {
    const refreshButtons = [
      "#previewRefresh",
      "#refreshPreview",
      '[data-action="refresh-preview"]',
      '[data-preview-action="refresh"]'
    ];

    refreshButtons.forEach((selector) => {
      document.querySelectorAll(selector).forEach((button) => {
        button.addEventListener("click", refresh);
      });
    });

    const fullscreenButtons = [
      "#previewFullscreen",
      "#fullscreenPreview",
      '[data-action="fullscreen-preview"]',
      '[data-preview-action="fullscreen"]'
    ];

    fullscreenButtons.forEach((selector) => {
      document.querySelectorAll(selector).forEach((button) => {
        button.addEventListener("click", openFullscreen);
      });
    });

    const downloadButtons = [
      "#downloadBtn",
      "#downloadButton",
      '[data-action="download"]',
      '[data-preview-action="download"]'
    ];

    downloadButtons.forEach((selector) => {
      document.querySelectorAll(selector).forEach((button) => {
        if (button.dataset.dipoPreviewDownloadBound) {
          return;
        }

        button.dataset.dipoPreviewDownloadBound = "true";

        button.addEventListener("click", function () {
          const duration =
            Number(
              button.dataset.duration ||
              $("#recordDuration")?.value ||
              10000
            );

          recordPreview({
            duration:
              duration < 1000
                ? 10000
                : duration
          });
        });
      });
    });
  }

  function init() {
    setFrame();

    wireButtons();

    log(
      "Preview engine initialized.",
      "success"
    );
  }

  DR.preview = {
    init,
    setFrame,
    setPreviewHTML,
    refresh,
    fullscreen: openFullscreen,
    record: recordPreview,
    stopRecording,
    downloadSourceCode,
    getState: () => ({ ...state })
  };

  window.DipoRunPreview = DR.preview;

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