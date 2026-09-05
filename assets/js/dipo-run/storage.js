"use strict";

/*
=========================================================
DIPO RUN — STORAGE ENGINE
Version: 3.0.0
Run. Test. Preview. Ship.
=========================================================

Features
- Zero-cost browser storage
- localStorage
- Explicit save/load only
- NO automatic demo code
- NO automatic code injection
- Draft storage
- Project storage
- Settings storage
- Share payload support
- Export/import JSON
- Safe storage handling
- Storage events
=========================================================
*/

(function () {

  const root = window.DipoRun = window.DipoRun || {};

  root.storage = root.storage || {};


  /* =====================================================
     CONFIG
  ===================================================== */

  const CONFIG = {

    prefix:
      "dipo-run",

    version:
      "3.0.0",

    keys: {

      draft:
        "dipo-run:draft",

      project:
        "dipo-run:project",

      settings:
        "dipo-run:settings",

      lastLanguage:
        "dipo-run:last-language"

    }

  };


  /* =====================================================
     SAFE JSON
  ===================================================== */

  function safeParse(value, fallback = null) {

    if (!value) {
      return fallback;
    }

    try {
      return JSON.parse(value);
    } catch (error) {

      console.warn(
        "DIPO RUN storage parse error:",
        error
      );

      return fallback;
    }

  }


  function safeStringify(value) {

    try {
      return JSON.stringify(value);
    } catch (error) {

      console.warn(
        "DIPO RUN storage stringify error:",
        error
      );

      return null;
    }

  }


  /* =====================================================
     STORAGE AVAILABLE
  ===================================================== */

  function available() {

    try {

      const testKey =
        `${CONFIG.prefix}:test`;

      localStorage.setItem(
        testKey,
        "1"
      );

      localStorage.removeItem(
        testKey
      );

      return true;

    } catch (error) {

      return false;

    }

  }


  /* =====================================================
     BASIC SET
  ===================================================== */

  function set(key, value) {

    if (!available()) {
      return false;
    }

    try {

      localStorage.setItem(
        key,
        value
      );

      return true;

    } catch (error) {

      console.warn(
        "DIPO RUN storage write failed:",
        error
      );

      return false;
    }

  }


  /* =====================================================
     BASIC GET
  ===================================================== */

  function get(key, fallback = null) {

    if (!available()) {
      return fallback;
    }

    try {

      const value =
        localStorage.getItem(key);

      return value === null
        ? fallback
        : value;

    } catch (error) {

      console.warn(
        "DIPO RUN storage read failed:",
        error
      );

      return fallback;
    }

  }


  /* =====================================================
     REMOVE
  ===================================================== */

  function remove(key) {

    if (!available()) {
      return false;
    }

    try {

      localStorage.removeItem(key);

      return true;

    } catch (error) {

      return false;

    }

  }


  /* =====================================================
     SAVE DRAFT
  ===================================================== */

  function saveDraft(code, language = "Auto Detect") {

    const payload = {

      code:
        typeof code === "string"
          ? code
          : "",

      language:
        language || "Auto Detect",

      updatedAt:
        Date.now(),

      version:
        CONFIG.version

    };

    const serialized =
      safeStringify(payload);

    if (!serialized) {
      return false;
    }

    const success =
      set(
        CONFIG.keys.draft,
        serialized
      );

    if (success) {

      window.dispatchEvent(
        new CustomEvent(
          "dipo:storage-saved",
          {
            detail: {
              type: "draft",
              payload
            }
          }
        )
      );

    }

    return success;
  }


  /* =====================================================
     LOAD DRAFT
  ===================================================== */

  function loadDraft() {

    const raw =
      get(
        CONFIG.keys.draft,
        null
      );

    if (!raw) {
      return null;
    }

    const data =
      safeParse(raw, null);

    if (
      !data ||
      typeof data !== "object"
    ) {
      return null;
    }

    return {

      code:
        typeof data.code === "string"
          ? data.code
          : "",

      language:
        data.language ||
        "Auto Detect",

      updatedAt:
        data.updatedAt ||
        0,

      version:
        data.version ||
        CONFIG.version

    };

  }


  /* =====================================================
     CLEAR DRAFT
  ===================================================== */

  function clearDraft() {

    const success =
      remove(
        CONFIG.keys.draft
      );

    if (success) {

      window.dispatchEvent(
        new CustomEvent(
          "dipo:storage-cleared",
          {
            detail: {
              type: "draft"
            }
          }
        )
      );

    }

    return success;
  }


  /* =====================================================
     SAVE PROJECT
  ===================================================== */

  function saveProject(project = {}) {

    const payload = {

      id:
        project.id ||
        `project-${Date.now()}`,

      name:
        project.name ||
        "Untitled Project",

      code:
        typeof project.code === "string"
          ? project.code
          : "",

      language:
        project.language ||
        "Auto Detect",

      createdAt:
        project.createdAt ||
        Date.now(),

      updatedAt:
        Date.now(),

      version:
        CONFIG.version

    };

    const serialized =
      safeStringify(payload);

    if (!serialized) {
      return false;
    }

    return set(
      CONFIG.keys.project,
      serialized
    );

  }


  /* =====================================================
     LOAD PROJECT
  ===================================================== */

  function loadProject() {

    const raw =
      get(
        CONFIG.keys.project,
        null
      );

    if (!raw) {
      return null;
    }

    return safeParse(
      raw,
      null
    );

  }


  /* =====================================================
     CLEAR PROJECT
  ===================================================== */

  function clearProject() {

    return remove(
      CONFIG.keys.project
    );

  }


  /* =====================================================
     SETTINGS
  ===================================================== */

  function saveSettings(settings = {}) {

    const current =
      loadSettings();

    const merged = {

      ...current,
      ...settings,

      updatedAt:
        Date.now()

    };

    const serialized =
      safeStringify(merged);

    if (!serialized) {
      return false;
    }

    return set(
      CONFIG.keys.settings,
      serialized
    );

  }


  function loadSettings() {

    const raw =
      get(
        CONFIG.keys.settings,
        null
      );

    if (!raw) {
      return {};
    }

    return safeParse(
      raw,
      {}
    );

  }


  /* =====================================================
     LANGUAGE
  ===================================================== */

  function saveLastLanguage(language) {

    if (!language) {
      return false;
    }

    return set(
      CONFIG.keys.lastLanguage,
      language
    );

  }


  function loadLastLanguage() {

    return get(
      CONFIG.keys.lastLanguage,
      "Auto Detect"
    );

  }


  /* =====================================================
     EXPLICIT LOAD INTO EDITOR
  ===================================================== */

  function loadDraftIntoEditor() {

    const draft =
      loadDraft();

    if (!draft) {
      return false;
    }

    /*
      Loading is ALWAYS explicit.
      Storage never injects code automatically
      when DIPO RUN opens.
    */

    window.dispatchEvent(
      new CustomEvent(
        "dipo:set-code",
        {
          detail: {
            code:
              draft.code || "",

            source:
              "storage",

            language:
              draft.language ||
              "Auto Detect"
          }
        }
      )
    );

    return true;

  }


  /* =====================================================
     EXPORT PROJECT
  ===================================================== */

  function exportProject(project = {}) {

    const payload = {

      type:
        "DIPO_RUN_PROJECT",

      version:
        CONFIG.version,

      exportedAt:
        new Date().toISOString(),

      project: {

        name:
          project.name ||
          "Untitled Project",

        code:
          typeof project.code === "string"
            ? project.code
            : "",

        language:
          project.language ||
          "Auto Detect"

      }

    };

    return safeStringify(
      payload
    );

  }


  /* =====================================================
     IMPORT PROJECT
  ===================================================== */

  function importProject(json) {

    const data =
      typeof json === "string"
        ? safeParse(json, null)
        : json;

    if (!data) {
      return null;
    }

    if (
      data.type !==
      "DIPO_RUN_PROJECT"
    ) {
      return null;
    }

    const project =
      data.project || {};

    return {

      name:
        project.name ||
        "Imported Project",

      code:
        typeof project.code === "string"
          ? project.code
          : "",

      language:
        project.language ||
        "Auto Detect"

    };

  }


  /* =====================================================
     CLEAR ALL DIPO RUN DATA
  ===================================================== */

  function clearAll() {

    if (!available()) {
      return false;
    }

    try {

      Object.values(
        CONFIG.keys
      ).forEach(key => {

        localStorage.removeItem(
          key
        );

      });

      window.dispatchEvent(
        new CustomEvent(
          "dipo:storage-all-cleared"
        )
      );

      return true;

    } catch (error) {

      console.warn(
        "DIPO RUN storage clear failed:",
        error
      );

      return false;
    }

  }


  /* =====================================================
     PUBLIC API
  ===================================================== */

  root.storage.config =
    CONFIG;

  root.storage.available =
    available;

  root.storage.set =
    set;

  root.storage.get =
    get;

  root.storage.remove =
    remove;

  root.storage.saveDraft =
    saveDraft;

  root.storage.loadDraft =
    loadDraft;

  root.storage.loadDraftIntoEditor =
    loadDraftIntoEditor;

  root.storage.clearDraft =
    clearDraft;

  root.storage.saveProject =
    saveProject;

  root.storage.loadProject =
    loadProject;

  root.storage.clearProject =
    clearProject;

  root.storage.saveSettings =
    saveSettings;

  root.storage.loadSettings =
    loadSettings;

  root.storage.saveLastLanguage =
    saveLastLanguage;

  root.storage.loadLastLanguage =
    loadLastLanguage;

  root.storage.exportProject =
    exportProject;

  root.storage.importProject =
    importProject;

  root.storage.clearAll =
    clearAll;


  /* =====================================================
     STORAGE READY
  ===================================================== */

  window.dispatchEvent(
    new CustomEvent(
      "dipo:storage-ready",
      {
        detail: {
          version:
            CONFIG.version
        }
      }
    )
  );


})();