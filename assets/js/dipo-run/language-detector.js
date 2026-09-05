/* =========================================================
   DIPO RUN — LANGUAGE DETECTOR
   Automatic language detection for DIPO RUN
   ========================================================= */

(function (window) {
  "use strict";

  const DipoRun = window.DipoRun = window.DipoRun || {};

  const LanguageDetector = {

    detect(code = "") {
      const source = String(code || "").trim();

      if (!source) {
        return {
          language: "empty",
          label: "Empty",
          confidence: 1
        };
      }

      /* HTML */
      if (
        /<!doctype\s+html/i.test(source) ||
        /<html[\s>]/i.test(source) ||
        /<head[\s>]/i.test(source) ||
        /<body[\s>]/i.test(source)
      ) {
        return {
          language: "html",
          label: "HTML",
          confidence: 0.99
        };
      }

      /* SVG */
      if (/<svg[\s>]/i.test(source)) {
        return {
          language: "svg",
          label: "SVG",
          confidence: 0.99
        };
      }

      /* CSS */
      if (
        /(^|\})\s*[.#a-zA-Z][\w-]*\s*\{[\s\S]*:[\s\S]*;[\s\S]*\}/.test(source) ||
        /@media\s*\(/i.test(source) ||
        /@keyframes\s+/i.test(source) ||
        /--[\w-]+\s*:/i.test(source)
      ) {
        return {
          language: "css",
          label: "CSS",
          confidence: 0.90
        };
      }

      /* JSON */
      if (
        (
          source.startsWith("{") &&
          source.endsWith("}")
        ) ||
        (
          source.startsWith("[") &&
          source.endsWith("]")
        )
      ) {
        try {
          JSON.parse(source);

          return {
            language: "json",
            label: "JSON",
            confidence: 0.99
          };
        } catch (_) {}
      }

      /* Markdown */
      if (
        /^#{1,6}\s+/m.test(source) ||
        /^\s*[-*+]\s+/m.test(source) ||
        /\[[^\]]+\]\([^)]+\)/.test(source)
      ) {
        return {
          language: "markdown",
          label: "Markdown",
          confidence: 0.80
        };
      }

      /* Python */
      if (
        /^\s*(def|class|import|from)\s+/m.test(source) ||
        /print\s*\(/.test(source) ||
        /if\s+.+:\s*$/m.test(source)
      ) {
        return {
          language: "python",
          label: "Python",
          confidence: 0.86
        };
      }

      /* TypeScript */
      if (
        /\b(interface|type)\s+\w+/.test(source) ||
        /\b(public|private|protected)\s+\w+/.test(source) ||
        /:\s*(string|number|boolean|any)\b/.test(source)
      ) {
        return {
          language: "typescript",
          label: "TypeScript",
          confidence: 0.82
        };
      }

      /* JavaScript */
      if (
        /\b(const|let|var|function|class|async|await)\b/.test(source) ||
        /console\.(log|error|warn)\s*\(/.test(source) ||
        /=>/.test(source) ||
        /document\.(querySelector|getElementById)/.test(source)
      ) {
        return {
          language: "javascript",
          label: "JavaScript",
          confidence: 0.90
        };
      }

      /* JSX / React */
      if (
        /import\s+React/.test(source) ||
        /<[A-Z][A-Za-z0-9]*/.test(source) ||
        /return\s*\(\s*</.test(source)
      ) {
        return {
          language: "jsx",
          label: "JSX",
          confidence: 0.82
        };
      }

      /* SQL */
      if (
        /\b(SELECT|INSERT|UPDATE|DELETE|CREATE TABLE|ALTER TABLE)\b/i.test(source)
      ) {
        return {
          language: "sql",
          label: "SQL",
          confidence: 0.90
        };
      }

      /* Bash */
      if (
        /^#!\/bin\/(bash|sh)/.test(source) ||
        /\b(echo|chmod|mkdir|grep|sudo)\b/.test(source)
      ) {
        return {
          language: "bash",
          label: "Bash",
          confidence: 0.75
        };
      }

      /* C / C++ */
      if (
        /#include\s*<[^>]+>/.test(source) ||
        /\b(int|char|float|double|void)\s+\w+\s*\(/.test(source)
      ) {
        return {
          language: "cpp",
          label: "C / C++",
          confidence: 0.85
        };
      }

      /* Java */
      if (
        /\bpublic\s+class\s+\w+/.test(source) ||
        /System\.out\.println/.test(source)
      ) {
        return {
          language: "java",
          label: "Java",
          confidence: 0.92
        };
      }

      return {
        language: "javascript",
        label: "JavaScript",
        confidence: 0.40
      };
    },

    isWebLanguage(language) {
      return [
        "html",
        "css",
        "javascript",
        "svg",
        "json",
        "markdown"
      ].includes(language);
    },

    getLabel(language) {
      const labels = {
        html: "HTML",
        css: "CSS",
        javascript: "JavaScript",
        typescript: "TypeScript",
        jsx: "JSX",
        python: "Python",
        json: "JSON",
        svg: "SVG",
        markdown: "Markdown",
        sql: "SQL",
        bash: "Bash",
        cpp: "C / C++",
        java: "Java",
        empty: "Empty"
      };

      return labels[language] || language;
    }
  };

  DipoRun.LanguageDetector = LanguageDetector;

})(window);