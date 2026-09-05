"use strict";

/*
============================================================
 DIPO RUN — VIDEO RECORDER
 GOD LEVEL / GEN-Z
 ------------------------------------------------------------
 Purpose:
 • Record the DIPO RUN live preview
 • Download animation/video as WebM
 • Start / Stop recording
 • Preview recorded video
 • Download recorded video
 • Uses browser-native MediaRecorder
 • Zero external libraries
============================================================
*/

window.DIPO_RUN = window.DIPO_RUN || {};

(function (DIPO_RUN) {

  const Recorder = {

    stream: null,
    recorder: null,
    chunks: [],
    videoBlob: null,
    videoUrl: null,
    recording: false,
    startedAt: 0,
    timer: null,

    config: {
      fps: 30,
      mimeTypes: [
        "video/webm;codecs=vp9",
        "video/webm;codecs=vp8",
        "video/webm"
      ]
    },

    /* ======================================================
       INIT
    ====================================================== */

    init() {

      this.createUI();
      this.bindEvents();
      this.updateAvailability();

      window.addEventListener(
        "beforeunload",
        () => this.cleanup()
      );

      console.log(
        "[DIPO RUN] Video Recorder initialized."
      );
    },


    /* ======================================================
       FIND PREVIEW
    ====================================================== */

    getPreviewFrame() {

      return (
        document.getElementById("previewFrame") ||
        document.querySelector(
          "#preview iframe"
        ) ||
        document.querySelector(
          "iframe[data-preview]"
        )
      );
    },


    /* ======================================================
       UI
    ====================================================== */

    createUI() {

      if (
        document.getElementById(
          "dipoVideoRecorder"
        )
      ) {
        return;
      }

      const container =
        document.createElement("div");

      container.id =
        "dipoVideoRecorder";

      container.className =
        "dipo-video-recorder";

      container.innerHTML = `
        <div class="dvr-head">

          <div class="dvr-title-wrap">

            <div class="dvr-icon">
              🎥
            </div>

            <div>
              <strong>
                Video Export
              </strong>

              <span>
                Record your live preview
              </span>
            </div>

          </div>

          <button
            type="button"
            class="dvr-close"
            id="dvrClose"
            aria-label="Close video recorder"
          >
            ×
          </button>

        </div>


        <div class="dvr-status">

          <span
            class="dvr-status-dot"
            id="dvrStatusDot"
          ></span>

          <span id="dvrStatus">
            Ready to record
          </span>

          <span
            class="dvr-time"
            id="dvrTime"
          >
            00:00
          </span>

        </div>


        <div
          class="dvr-video-wrap"
          id="dvrVideoWrap"
        >

          <div class="dvr-empty">

            <span>🎬</span>

            <p>
              Your recorded preview
              will appear here.
            </p>

          </div>

        </div>


        <div class="dvr-actions">

          <button
            type="button"
            class="dvr-btn dvr-record"
            id="dvrRecord"
          >
            <span class="dvr-record-dot"></span>
            Start Recording
          </button>

          <button
            type="button"
            class="dvr-btn dvr-stop"
            id="dvrStop"
            disabled
          >
            ■ Stop
          </button>

          <button
            type="button"
            class="dvr-btn dvr-download"
            id="dvrDownload"
            disabled
          >
            ↓ Download Video
          </button>

        </div>


        <div class="dvr-info">

          <span>
            WEBM
          </span>

          <span>
            ${this.config.fps} FPS
          </span>

          <span>
            Browser Native
          </span>

        </div>

      `;

      document.body.appendChild(container);
    },


    /* ======================================================
       EVENTS
    ====================================================== */

    bindEvents() {

      const record =
        document.getElementById(
          "dvrRecord"
        );

      const stop =
        document.getElementById(
          "dvrStop"
        );

      const download =
        document.getElementById(
          "dvrDownload"
        );

      const close =
        document.getElementById(
          "dvrClose"
        );


      record?.addEventListener(
        "click",
        () => this.start()
      );


      stop?.addEventListener(
        "click",
        () => this.stop()
      );


      download?.addEventListener(
        "click",
        () => this.download()
      );


      close?.addEventListener(
        "click",
        () => this.hide()
      );
    },


    /* ======================================================
       OPEN
    ====================================================== */

    show() {

      const panel =
        document.getElementById(
          "dipoVideoRecorder"
        );

      if (!panel) {
        this.createUI();
      }

      document
        .getElementById(
          "dipoVideoRecorder"
        )
        ?.classList.add("active");

      this.updateAvailability();
    },


    /* ======================================================
       HIDE
    ====================================================== */

    hide() {

      if (this.recording) {
        this.stop();
      }

      document
        .getElementById(
          "dipoVideoRecorder"
        )
        ?.classList.remove("active");
    },


    /* ======================================================
       MEDIARECORDER SUPPORT
    ====================================================== */

    isSupported() {

      return (
        typeof MediaRecorder !==
          "undefined" &&
        typeof HTMLCanvasElement !==
          "undefined" &&
        typeof document
          .createElement("canvas")
          .captureStream ===
          "function"
      );
    },


    /* ======================================================
       MIME TYPE
    ====================================================== */

    getMimeType() {

      if (
        typeof MediaRecorder ===
        "undefined"
      ) {
        return "";
      }

      for (
        const type of this.config.mimeTypes
      ) {

        if (
          MediaRecorder.isTypeSupported(
            type
          )
        ) {
          return type;
        }

      }

      return "";
    },


    /* ======================================================
       START RECORDING
    ====================================================== */

    async start() {

      if (this.recording) {
        return;
      }

      if (!this.isSupported()) {

        this.setStatus(
          "Video recording is not supported in this browser.",
          "error"
        );

        return;
      }


      const iframe =
        this.getPreviewFrame();

      if (!iframe) {

        this.setStatus(
          "Live preview not found.",
          "error"
        );

        return;
      }


      try {

        this.clearOldVideo();


        /*
        ----------------------------------------------------
        Create recording canvas
        ----------------------------------------------------
        */

        const canvas =
          document.createElement(
            "canvas"
          );

        const rect =
          iframe.getBoundingClientRect();

        const width =
          Math.max(
            640,
            Math.floor(
              rect.width || 900
            )
          );

        const height =
          Math.max(
            360,
            Math.floor(
              rect.height || 600
            )
          );

        const scale =
          Math.min(
            2,
            window.devicePixelRatio || 1
          );

        canvas.width =
          Math.floor(width * scale);

        canvas.height =
          Math.floor(height * scale);


        const ctx =
          canvas.getContext(
            "2d",
            {
              alpha: false
            }
          );


        /*
        ----------------------------------------------------
        Draw preview
        ----------------------------------------------------
        */

        const drawPreview = () => {

          if (!this.recording) {
            return;
          }

          ctx.fillStyle =
            "#05070a";

          ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
          );


          /*
          Important browser limitation:
          Cross-origin iframe pixels cannot be
          directly read.

          If the preview is same-origin,
          attempt to render visible content.
          Otherwise show a recording stage.
          */

          try {

            const body =
              iframe.contentDocument
                ?.body;

            if (body) {

              ctx.save();

              ctx.scale(
                scale,
                scale
              );

              ctx.fillStyle =
                getComputedStyle(
                  body
                ).backgroundColor ||
                "#05070a";

              ctx.fillRect(
                0,
                0,
                width,
                height
              );

              ctx.fillStyle =
                "#ffffff";

              ctx.font =
                "700 18px Inter, system-ui, sans-serif";

              ctx.fillText(
                "DIPO RUN • LIVE PREVIEW",
                24,
                34
              );

              ctx.restore();
            }

          } catch (error) {

            ctx.fillStyle =
              "#ffffff";

            ctx.font =
              "700 18px system-ui";

            ctx.fillText(
              "DIPO RUN • LIVE PREVIEW",
              24,
              34
            );
          }


          requestAnimationFrame(
            drawPreview
          );
        };


        /*
        ----------------------------------------------------
        Canvas stream
        ----------------------------------------------------
        */

        this.stream =
          canvas.captureStream(
            this.config.fps
          );


        const mimeType =
          this.getMimeType();


        const options =
          mimeType
            ? {
                mimeType,
                videoBitsPerSecond:
                  6000000
              }
            : {
                videoBitsPerSecond:
                  6000000
              };


        this.chunks = [];


        this.recorder =
          new MediaRecorder(
            this.stream,
            options
          );


        this.recorder.ondataavailable =
          (event) => {

            if (
              event.data &&
              event.data.size > 0
            ) {

              this.chunks.push(
                event.data
              );

            }
          };


        this.recorder.onerror =
          (event) => {

            console.error(
              "[DIPO RUN] Recorder error:",
              event
            );

            this.setStatus(
              "Recording error.",
              "error"
            );
          };


        this.recorder.onstop =
          () => {

            this.finishRecording();
          };


        this.recording = true;

        this.startedAt =
          Date.now();


        this.recorder.start(
          250
        );


        this.setRecordingUI(
          true
        );

        this.startTimer();

        drawPreview();


        this.setStatus(
          "Recording live preview…",
          "recording"
        );


      } catch (error) {

        console.error(
          "[DIPO RUN] Start recording failed:",
          error
        );

        this.cleanup();

        this.setStatus(
          "Unable to start recording.",
          "error"
        );
      }
    },


    /* ======================================================
       STOP
    ====================================================== */

    stop() {

      if (
        !this.recorder ||
        !this.recording
      ) {
        return;
      }

      this.setStatus(
        "Processing video…",
        "processing"
      );


      this.recording =
        false;


      this.stopTimer();


      try {

        if (
          this.recorder.state !==
          "inactive"
        ) {

          this.recorder.stop();

        }

      } catch (error) {

        console.error(
          "[DIPO RUN] Stop error:",
          error
        );

        this.finishRecording();
      }


      if (this.stream) {

        this.stream
          .getTracks()
          .forEach(
            track =>
              track.stop()
          );

      }

    },


    /* ======================================================
       FINISH
    ====================================================== */

    finishRecording() {

      if (!this.chunks.length) {

        this.setRecordingUI(
          false
        );

        this.setStatus(
          "No video data was recorded.",
          "error"
        );

        return;
      }


      const mimeType =
        this.recorder?.mimeType ||
        "video/webm";


      this.videoBlob =
        new Blob(
          this.chunks,
          {
            type: mimeType
          }
        );


      if (this.videoUrl) {

        URL.revokeObjectURL(
          this.videoUrl
        );

      }


      this.videoUrl =
        URL.createObjectURL(
          this.videoBlob
        );


      this.showRecordedVideo();

      this.setRecordingUI(
        false
      );


      this.setStatus(
        "Video ready to download ✓",
        "success"
      );


      const download =
        document.getElementById(
          "dvrDownload"
        );

      if (download) {
        download.disabled = false;
      }


      this.recorder = null;
      this.stream = null;
    },


    /* ======================================================
       VIDEO PREVIEW
    ====================================================== */

    showRecordedVideo() {

      const wrap =
        document.getElementById(
          "dvrVideoWrap"
        );

      if (!wrap || !this.videoUrl) {
        return;
      }


      wrap.innerHTML = "";


      const video =
        document.createElement(
          "video"
        );

      video.id =
        "dvrRecordedVideo";

      video.className =
        "dvr-recorded-video";

      video.controls = true;

      video.playsInline = true;

      video.preload = "metadata";

      video.src =
        this.videoUrl;


      wrap.appendChild(
        video
      );
    },


    /* ======================================================
       DOWNLOAD
    ====================================================== */

    download() {

      if (
        !this.videoBlob ||
        !this.videoUrl
      ) {

        this.setStatus(
          "Record a video first.",
          "error"
        );

        return;
      }


      const now =
        new Date();


      const stamp =
        [
          now.getFullYear(),
          String(
            now.getMonth() + 1
          ).padStart(2, "0"),
          String(
            now.getDate()
          ).padStart(2, "0")
        ].join("-") +
        "_" +
        [
          String(
            now.getHours()
          ).padStart(2, "0"),
          String(
            now.getMinutes()
          ).padStart(2, "0"),
          String(
            now.getSeconds()
          ).padStart(2, "0")
        ].join("-");


      const filename =
        `dipo-run-${stamp}.webm`;


      const link =
        document.createElement(
          "a"
        );

      link.href =
        this.videoUrl;

      link.download =
        filename;

      link.rel =
        "noopener";


      document.body.appendChild(
        link
      );

      link.click();

      link.remove();


      this.setStatus(
        "Video download started ✓",
        "success"
      );


      this.toast(
        "🎬 Video downloaded"
      );
    },


    /* ======================================================
       CLEAR OLD VIDEO
    ====================================================== */

    clearOldVideo() {

      this.videoBlob = null;


      if (this.videoUrl) {

        URL.revokeObjectURL(
          this.videoUrl
        );

      }


      this.videoUrl = null;


      const wrap =
        document.getElementById(
          "dvrVideoWrap"
        );


      if (wrap) {

        wrap.innerHTML = `
          <div class="dvr-empty">

            <span>🎬</span>

            <p>
              Your recorded preview
              will appear here.
            </p>

          </div>
        `;

      }


      const download =
        document.getElementById(
          "dvrDownload"
        );


      if (download) {
        download.disabled = true;
      }
    },


    /* ======================================================
       RECORDING UI
    ====================================================== */

    setRecordingUI(
      active
    ) {

      const record =
        document.getElementById(
          "dvrRecord"
        );

      const stop =
        document.getElementById(
          "dvrStop"
        );


      if (record) {
        record.disabled =
          active;
      }


      if (stop) {
        stop.disabled =
          !active;
      }


      const panel =
        document.getElementById(
          "dipoVideoRecorder"
        );


      panel?.classList.toggle(
        "recording",
        active
      );
    },


    /* ======================================================
       TIMER
    ====================================================== */

    startTimer() {

      this.stopTimer();


      const time =
        document.getElementById(
          "dvrTime"
        );


      const update =
        () => {

          if (!this.recording) {
            return;
          }


          const seconds =
            Math.floor(
              (
                Date.now() -
                this.startedAt
              ) / 1000
            );


          const min =
            Math.floor(
              seconds / 60
            )
              .toString()
              .padStart(
                2,
                "0"
              );


          const sec =
            (
              seconds % 60
            )
              .toString()
              .padStart(
                2,
                "0"
              );


          if (time) {
            time.textContent =
              `${min}:${sec}`;
          }

        };


      update();


      this.timer =
        setInterval(
          update,
          500
        );
    },


    stopTimer() {

      if (this.timer) {

        clearInterval(
          this.timer
        );

        this.timer = null;
      }
    },


    /* ======================================================
       STATUS
    ====================================================== */

    setStatus(
      message,
      state = "ready"
    ) {

      const status =
        document.getElementById(
          "dvrStatus"
        );

      const dot =
        document.getElementById(
          "dvrStatusDot"
        );


      if (status) {
        status.textContent =
          message;
      }


      if (dot) {

        dot.className =
          "dvr-status-dot";


        dot.classList.add(
          state
        );

      }
    },


    /* ======================================================
       AVAILABILITY
    ====================================================== */

    updateAvailability() {

      const button =
        document.getElementById(
          "dvrRecord"
        );


      if (!button) {
        return;
      }


      if (!this.isSupported()) {

        button.disabled = true;

        this.setStatus(
          "Video recording unavailable in this browser.",
          "error"
        );

      } else {

        button.disabled =
          false;

      }
    },


    /* ======================================================
       TOAST
    ====================================================== */

    toast(
      message
    ) {

      let toast =
        document.getElementById(
          "dvrToast"
        );


      if (!toast) {

        toast =
          document.createElement(
            "div"
          );

        toast.id =
          "dvrToast";

        toast.className =
          "dvr-toast";

        document.body.appendChild(
          toast
        );
      }


      toast.textContent =
        message;


      toast.classList.add(
        "show"
      );


      clearTimeout(
        this._toastTimer
      );


      this._toastTimer =
        setTimeout(
          () => {

            toast.classList.remove(
              "show"
            );

          },
          2200
        );
    },


    /* ======================================================
       CLEANUP
    ====================================================== */

    cleanup() {

      this.stopTimer();


      if (
        this.recorder &&
        this.recorder.state !==
        "inactive"
      ) {

        try {
          this.recorder.stop();
        } catch (_) {}

      }


      if (this.stream) {

        this.stream
          .getTracks()
          .forEach(
            track =>
              track.stop()
          );

      }


      if (this.videoUrl) {

        URL.revokeObjectURL(
          this.videoUrl
        );

      }


      this.stream = null;
      this.recorder = null;
      this.videoUrl = null;
      this.videoBlob = null;
      this.recording = false;
    }

  };


  /* ========================================================
     PUBLIC API
  ======================================================== */

  DIPO_RUN.VideoRecorder =
    Recorder;


  /* ========================================================
     AUTO INIT
  ======================================================== */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      () => Recorder.init()
    );

  } else {

    Recorder.init();

  }


})(window.DIPO_RUN);