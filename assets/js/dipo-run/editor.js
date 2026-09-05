"use strict";

/*
=========================================================
DIPO RUN — EDITOR ENGINE
Version: 3.0.0
Run. Test. Preview. Ship.
=========================================================

Features
- Empty editor on fresh open
- No default/demo code
- Live typing
- Paste support
- Line numbers
- Tab indentation
- Auto language detection hook
- Auto-run hook
- Ctrl/Cmd + Enter
- Clear/X support
- Save hook
- Share hook
- Download hook
- Mobile friendly
- Custom events for other DIPO RUN modules
=========================================================
*/

(function () {

  const root = window.DipoRun = window.DipoRun || {};

  root.editor = root.editor || {};

  const state = {
    initialized: false,
    editor: null,
    lineNumbers: null,
    languageBadge: null,
    autoRunStatus: null,
    lastValue: "",
    suppressInput: false
  };


  /* =====================================================
     HELPERS
  ===================================================== */

  function $(selector, parent = document) {
    return parent.querySelector(selector);
  }

  function $all(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
  }

  function dispatch(name, detail = {}) {
    window.dispatchEvent(
      new CustomEvent(name, {
        detail
      })
    );
  }


  /* =====================================================
     FIND EDITOR
  ===================================================== */

  function findEditor() {

    state.editor =
      document.getElementById("codeEditor") ||
      document.querySelector(
        "#editor, textarea[data-editor], textarea.code-editor, .code-editor textarea, textarea"
      );

    return state.editor;
  }


  /* =====================================================
     FIND UI
  ===================================================== */

  function findUI() {

    state.lineNumbers =
      document.getElementById("lineNumbers") ||
      document.querySelector(".line-numbers");

    state.languageBadge =
      document.getElementById("languageBadge") ||
      document.querySelector("[data-language-badge]");

    state.autoRunStatus =
      document.getElementById("autoRunStatus") ||
      document.querySelector("[data-auto-run-status]");
  }


  /* =====================================================
     GET CODE
  ===================================================== */

  function getCode() {

    if (!state.editor) {
      return "";
    }

    return String(state.editor.value || "");
  }


  /* =====================================================
     SET CODE
  ===================================================== */

  function setCode(code, options = {}) {

    if (!state.editor) {
      return;
    }

    const value =
      typeof code === "string"
        ? code
        : "";

    state.suppressInput = true;

    state.editor.value = value;

    state.lastValue = value;

    updateLineNumbers();
    updateEditorState();

    state.suppressInput = false;

    if (!options.silent) {

      dispatch(
        "dipo:editor-change",
        {
          code: value,
          source: options.source || "programmatic"
        }
      );

    }
  }


  /* =====================================================
     CLEAR EDITOR
  ===================================================== */

  function clear(options = {}) {

    if (!state.editor) {
      return;
    }

    setCode("", {
      silent: false,
      source: "clear"
    });

    state.editor.focus();

    dispatch(
      "dipo:editor-clear",
      {
        code: ""
      }
    );

    if (typeof root.showToast === "function") {
      root.showToast("Code cleared");
    }

  }


  /* =====================================================
     LINE NUMBERS
  ===================================================== */

  function updateLineNumbers() {

    if (!state.editor || !state.lineNumbers) {
      return;
    }

    const code = getCode();

    const lineCount =
      Math.max(
        1,
        code.split("\n").length
      );

    let html = "";

    for (let i = 1; i <= lineCount; i++) {

      html +=
        `<span>${i}</span>`;

    }

    state.lineNumbers.innerHTML = html;

    syncScroll();

  }


  /* =====================================================
     SCROLL SYNC
  ===================================================== */

  function syncScroll() {

    if (!state.editor || !state.lineNumbers) {
      return;
    }

    state.lineNumbers.scrollTop =
      state.editor.scrollTop;

  }


  /* =====================================================
     EDITOR VISUAL STATE
  ===================================================== */

  function updateEditorState() {

    if (!state.editor) {
      return;
    }

    const hasCode =
      getCode().trim().length > 0;

    state.editor.classList.toggle(
      "has-code",
      hasCode
    );

    document.body.classList.toggle(
      "dipo-run-has-code",
      hasCode
    );

    document.body.classList.toggle(
      "dipo-run-empty-editor",
      !hasCode
    );

  }


  /* =====================================================
     LANGUAGE BADGE
  ===================================================== */

  function setLanguage(language) {

    if (!state.languageBadge) {
      return;
    }

    const value =
      language ||
      "Auto Detect";

    state.languageBadge.textContent =
      value;

    state.languageBadge.dataset.language =
      String(value).toLowerCase();

  }


  /* =====================================================
     AUTO LANGUAGE DETECTION
  ===================================================== */

  function detectLanguage(code) {

    if (!code || !code.trim()) {
      return "Auto Detect";
    }

    try {

      if (
        root.languageDetector &&
        typeof root.languageDetector.detect === "function"
      ) {

        return root.languageDetector.detect(code);

      }

      if (
        typeof root.detectLanguage === "function"
      ) {

        return root.detectLanguage(code);

      }

    } catch (error) {

      console.warn(
        "DIPO RUN language detection error:",
        error
      );

    }

    const text = code.trim();

    if (
      /<!doctype\s+html/i.test(text) ||
      /<html[\s>]/i.test(text)
    ) {
      return "HTML";
    }

    if (
      /<style[\s>]/i.test(text) ||
      /[.#][\w-]+\s*\{[\s\S]*\}/.test(text)
    ) {
      return "CSS";
    }

    if (
      /<svg[\s>]/i.test(text)
    ) {
      return "SVG";
    }

    if (
      /^(?:\s*[\[{])/.test(text) &&
      /["'][\w-]+["']\s*:/.test(text)
    ) {
      return "JSON";
    }

    if (
      /\b(const|let|var|function|document\.|window\.|console\.|=>)\b/.test(text)
    ) {
      return "JavaScript";
    }

    if (
      /^(#|\*\*|[-*]\s)/.test(text)
    ) {
      return "Markdown";
    }

    return "Code";

  }


  /* =====================================================
     UPDATE LANGUAGE
  ===================================================== */

  function updateLanguage() {

    const code = getCode();

    const language =
      detectLanguage(code);

    setLanguage(language);

    dispatch(
      "dipo:language-detected",
      {
        code,
        language
      }
    );

    return language;
  }


  /* =====================================================
     INPUT HANDLER
  ===================================================== */

  function handleInput(event) {

    if (state.suppressInput) {
      return;
    }

    const code =
      getCode();

    state.lastValue =
      code;

    updateLineNumbers();
    updateEditorState();
    updateLanguage();

    dispatch(
      "dipo:editor-change",
      {
        code,
        source: event?.type || "input"
      }
    );

  }


  /* =====================================================
     PASTE HANDLER
  ===================================================== */

  function handlePaste() {

    /*
      Browser paste is intentionally NOT prevented.
      Native paste remains fast and reliable.
    */

    setTimeout(() => {

      const code =
        getCode();

      updateLineNumbers();
      updateEditorState();
      updateLanguage();

      dispatch(
        "dipo:editor-paste",
        {
          code
        }
      );

      dispatch(
        "dipo:editor-change",
        {
          code,
          source: "paste"
        }
      );

    }, 0);

  }


  /* =====================================================
     KEYBOARD ENGINE
  ===================================================== */

  function handleKeydown(event) {

    if (!state.editor) {
      return;
    }


    /* -----------------------------------------------
       CTRL/CMD + ENTER
    ----------------------------------------------- */

    if (
      event.key === "Enter" &&
      (event.ctrlKey || event.metaKey)
    ) {

      event.preventDefault();

      dispatch(
        "dipo:run-request",
        {
          code: getCode(),
          source: "keyboard"
        }
      );

      return;
    }


    /* -----------------------------------------------
       TAB
    ----------------------------------------------- */

    if (event.key === "Tab") {

      event.preventDefault();

      const start =
        state.editor.selectionStart;

      const end =
        state.editor.selectionEnd;

      const value =
        state.editor.value;

      state.editor.value =
        value.substring(0, start) +
        "  " +
        value.substring(end);

      state.editor.selectionStart =
        start + 2;

      state.editor.selectionEnd =
        start + 2;

      handleInput({
        type: "tab"
      });

      return;
    }


    /* -----------------------------------------------
       AUTO CLOSE BRACKETS
    ----------------------------------------------- */

    const pairs = {
      "(": ")",
      "[": "]",
      "{": "}",
      "'": "'",
      '"': '"',
      "`": "`"
    };

    if (
      pairs[event.key] &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey
    ) {

      const start =
        state.editor.selectionStart;

      const end =
        state.editor.selectionEnd;

      if (start === end) {

        const closing =
          pairs[event.key];

        const value =
          state.editor.value;

        state.editor.value =
          value.substring(0, start) +
          event.key +
          closing +
          value.substring(end);

        state.editor.selectionStart =
          start + 1;

        state.editor.selectionEnd =
          start + 1;

        event.preventDefault();

        handleInput({
          type: "auto-pair"
        });

      }

    }

  }


  /* =====================================================
     SCROLL
  ===================================================== */

  function handleScroll() {
    syncScroll();
  }


  /* =====================================================
     AUTO RUN BRIDGE
  ===================================================== */

  function requestAutoRun(source = "editor") {

    const code =
      getCode();

    if (!code.trim()) {
      return;
    }

    dispatch(
      "dipo:auto-run-request",
      {
        code,
        language: detectLanguage(code),
        source
      }
    );

  }


  /* =====================================================
     STATUS
  ===================================================== */

  function setAutoRunStatus(active) {

    if (!state.autoRunStatus) {
      return;
    }

    state.autoRunStatus.classList.toggle(
      "active",
      Boolean(active)
    );

    state.autoRunStatus.textContent =
      active
        ? "Auto Run ON"
        : "Auto Run OFF";

  }


  /* =====================================================
     BUTTON BINDING
  ===================================================== */

  function bindButtons() {

    /*
      Clear / X
    */

    const clearButtons =
      $all(
        [
          "#clearCode",
          "#clearEditor",
          "#deleteCode",
          "#closeEditor",
          "[data-action='clear']",
          "[data-action='clear-code']",
          "[data-editor-clear]"
        ].join(",")
      );

    clearButtons.forEach(button => {

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();

          clear();

        }
      );

    });


    /*
      Run
    */

    const runButtons =
      $all(
        [
          "#runCode",
          "#runButton",
          "[data-action='run']",
          "[data-run]"
        ].join(",")
      );

    runButtons.forEach(button => {

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();

          dispatch(
            "dipo:run-request",
            {
              code: getCode(),
              source: "button"
            }
          );

        }
      );

    });


    /*
      Save
    */

    const saveButtons =
      $all(
        [
          "#saveCode",
          "#saveButton",
          "[data-action='save']",
          "[data-save]"
        ].join(",")
      );

    saveButtons.forEach(button => {

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();

          dispatch(
            "dipo:save-request",
            {
              code: getCode()
            }
          );

        }
      );

    });


    /*
      Share
    */

    const shareButtons =
      $all(
        [
          "#shareCode",
          "#shareButton",
          "[data-action='share']",
          "[data-share]"
        ].join(",")
      );

    shareButtons.forEach(button => {

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();

          dispatch(
            "dipo:share-request",
            {
              code: getCode(),
              language: detectLanguage(getCode())
            }
          );

        }
      );

    });


    /*
      Download
    */

    const downloadButtons =
      $all(
        [
          "#downloadCode",
          "#downloadButton",
          "[data-action='download']",
          "[data-download]"
        ].join(",")
      );

    downloadButtons.forEach(button => {

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();

          dispatch(
            "dipo:download-request",
            {
              code: getCode(),
              language: detectLanguage(getCode())
            }
          );

        }
      );

    });

  }


  /* =====================================================
     PUBLIC API
  ===================================================== */

  root.editor.getCode =
    getCode;

  root.editor.setCode =
    setCode;

  root.editor.clear =
    clear;

  root.editor.getLanguage =
    () => detectLanguage(getCode());

  root.editor.detectLanguage =
    detectLanguage;

  root.editor.setLanguage =
    setLanguage;

  root.editor.run =
    () => {

      dispatch(
        "dipo:run-request",
        {
          code: getCode(),
          source: "api"
        }
      );

    };

  root.editor.focus =
    () => {

      if (state.editor) {
        state.editor.focus();
      }

    };


  /* =====================================================
     INITIALIZE
  ===================================================== */

  function init() {

    if (state.initialized) {
      return;
    }

    findEditor();
    findUI();

    if (!state.editor) {
      return;
    }

    /*
      IMPORTANT:
      Fresh DIPO RUN opens EMPTY.
      No demo/default/sample code is inserted here.
    */

    state.editor.value = "";
    state.lastValue = "";

    updateLineNumbers();
    updateEditorState();
    setLanguage("Auto Detect");

    state.editor.addEventListener(
      "input",
      handleInput
    );

    state.editor.addEventListener(
      "paste",
      handlePaste
    );

    state.editor.addEventListener(
      "keydown",
      handleKeydown
    );

    state.editor.addEventListener(
      "scroll",
      handleScroll
    );

    bindButtons();

    setAutoRunStatus(true);

    state.initialized = true;

    dispatch(
      "dipo:editor-ready",
      {
        code: ""
      }
    );

  }


  /* =====================================================
     GLOBAL EVENTS
  ===================================================== */

  window.addEventListener(
    "dipo:editor-init",
    init
  );

  window.addEventListener(
    "dipo:set-code",
    event => {

      setCode(
        event.detail?.code || "",
        {
          source: "external"
        }
      );

    }
  );

  window.addEventListener(
    "dipo:clear-editor",
    clear
  );


  /* =====================================================
     DOM READY
  ===================================================== */

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      init,
      {
        once: true
      }
    );

  } else {

    init();

  }


})();