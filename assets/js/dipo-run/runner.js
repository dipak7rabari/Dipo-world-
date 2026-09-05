/* =========================================================
   DIPO RUN — RUNNER
   Sandboxed browser execution engine
   ========================================================= */

(function (window) {
  "use strict";

  const DipoRun = window.DipoRun = window.DipoRun || {};

  const Runner = {

    running: false,

    buildHTML({
      html = "",
      css = "",
      js = ""
    } = {}) {

      const safeJS = String(js)
        .replace(/<\/script>/gi, "<\\/script>");

      return `
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width,initial-scale=1,maximum-scale=1"
/>

<style>
${css}
</style>

<style>
html,body{
  margin:0;
  min-height:100%;
}
</style>

</head>

<body>

${html}

<script>
(function(){

  const send = (type, args) => {
    try {
      parent.postMessage({
        source: "DIPO_RUN",
        type,
        args: args.map(value => {
          try {
            if(typeof value === "object"){
              return JSON.stringify(value);
            }
          } catch(e){}

          return String(value);
        })
      }, "*");
    } catch(e){}
  };

  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;

  console.log = (...args) => {
    originalLog(...args);
    send("console", args);
  };

  console.warn = (...args) => {
    originalWarn(...args);
    send("warn", args);
  };

  console.error = (...args) => {
    originalError(...args);
    send("error", args);
  };

  window.addEventListener("error", event => {
    send("error", [
      event.message || "Unknown runtime error"
    ]);
  });

  window.addEventListener(
    "unhandledrejection",
    event => {
      send("error", [
        event.reason?.message ||
        event.reason ||
        "Unhandled promise rejection"
      ]);
    }
  );

})();
</script>

<script>
${safeJS}
<\/script>

</body>
</html>
`;
    },

    async run(project = {}) {

      this.running = true;

      if (DipoRun.Console) {
        DipoRun.Console.clear();
        DipoRun.Console.info("Starting DIPO RUN...");
      }

      const language =
        project.language ||
        DipoRun.LanguageDetector?.detect(project.code || "").language ||
        "javascript";

      if (!["html", "css", "javascript", "svg", "json", "markdown"].includes(language)) {

        if (DipoRun.Console) {
          DipoRun.Console.warn(
            `${language} detected. Web runtime adapter required.`
          );
        }

        this.running = false;

        return {
          success: false,
          language,
          unsupported: true
        };
      }

      let html = project.html || "";
      let css = project.css || "";
      let js = project.js || "";

      /*
       * Single HTML document
       */
      if (
        language === "html" ||
        /<html[\s>]/i.test(project.code || "") ||
        /<!doctype\s+html/i.test(project.code || "")
      ) {

        const source = project.code || "";

        const styleMatches = [
          ...source.matchAll(
            /<style[^>]*>([\s\S]*?)<\/style>/gi
          )
        ];

        const scriptMatches = [
          ...source.matchAll(
            /<script[^>]*>([\s\S]*?)<\/script>/gi
          )
        ];

        css += styleMatches
          .map(match => match[1])
          .join("\n");

        js += scriptMatches
          .map(match => match[1])
          .join("\n");

        html = source
          .replace(
            /<style[^>]*>[\s\S]*?<\/style>/gi,
            ""
          )
          .replace(
            /<script[^>]*>[\s\S]*?<\/script>/gi,
            ""
          )
          .replace(
            /<!doctype[^>]*>/gi,
            ""
          )
          .replace(
            /<\/?(html|head|body)[^>]*>/gi,
            ""
          );
      }

      /*
       * CSS-only
       */
      if (language === "css") {
        html = `
          <div class="dipo-css-preview">
            DIPO RUN
          </div>
        `;
        css = project.code || "";
      }

      /*
       * JavaScript-only
       */
      if (language === "javascript") {
        html = `
          <div style="
            min-height:100vh;
            display:grid;
            place-items:center;
            background:#10131b;
            color:white;
            font-family:system-ui;
          ">
            <div>
              <strong>DIPO RUN</strong>
              <div style="
                margin-top:8px;
                opacity:.55;
              ">
                JavaScript Running...
              </div>
            </div>
          </div>
        `;

        js = project.code || "";
      }

      /*
       * SVG
       */
      if (language === "svg") {
        html = project.code || "";
      }

      /*
       * JSON
       */
      if (language === "json") {
        let output;

        try {
          output = JSON.stringify(
            JSON.parse(project.code || "{}"),
            null,
            2
          );
        } catch (error) {
          output = String(project.code || "");
        }

        html = `
          <pre style="
            margin:0;
            padding:24px;
            white-space:pre-wrap;
            font-family:ui-monospace,SFMono-Regular,monospace;
            color:#e8edf7;
            background:#10131b;
            min-height:100vh;
          ">${this.escapeHTML(output)}</pre>
        `;
      }

      /*
       * Markdown
       */
      if (language === "markdown") {
        html = `
          <article style="
            max-width:760px;
            margin:auto;
            padding:32px;
            font-family:system-ui;
            line-height:1.7;
            color:#17202b;
          ">
            ${this.markdownToHTML(project.code || "")}
          </article>
        `;
      }

      const documentHTML = this.buildHTML({
        html,
        css,
        js
      });

      const rendered =
        DipoRun.Preview?.render(documentHTML);

      this.running = false;

      if (DipoRun.Console) {
        if (rendered) {
          DipoRun.Console.success("Preview updated.");
        } else {
          DipoRun.Console.error("Preview frame not found.");
        }
      }

      return {
        success: !!rendered,
        language,
        html,
        css,
        js
      };
    },

    escapeHTML(value) {
      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    },

    markdownToHTML(markdown) {

      let output = this.escapeHTML(markdown);

      output = output.replace(
        /^###### (.*)$/gm,
        "<h6>$1</h6>"
      );

      output = output.replace(
        /^##### (.*)$/gm,
        "<h5>$1</h5>"
      );

      output = output.replace(
        /^#### (.*)$/gm,
        "<h4>$1</h4>"
      );

      output = output.replace(
        /^### (.*)$/gm,
        "<h3>$1</h3>"
      );

      output = output.replace(
        /^## (.*)$/gm,
        "<h2>$1</h2>"
      );

      output = output.replace(
        /^# (.*)$/gm,
        "<h1>$1</h1>"
      );

      output = output.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
      );

      output = output.replace(
        /\*(.*?)\*/g,
        "<em>$1</em>"
      );

      output = output.replace(
        /`([^`]+)`/g,
        "<code>$1</code>"
      );

      output = output.replace(
        /\n/g,
        "<br>"
      );

      return output;
    }
  };

  DipoRun.Runner = Runner;

})(window);