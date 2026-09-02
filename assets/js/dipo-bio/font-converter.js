/* =========================================================
   DIPO WORLD — DIPO BIO
   Unicode Font Converter
   ========================================================= */

(function (window) {
  "use strict";

  window.DIPO = window.DIPO || {};
  window.DIPO.bio = window.DIPO.bio || {};

  const ranges = {
    bold: {
      normal: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      styled: "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳"
    },

    italic: {
      normal: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      styled: "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧"
    },

    boldItalic: {
      normal: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      styled: "𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛"
    },

    script: {
      normal: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      styled: "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏"
    },

    boldScript: {
      normal: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      styled: "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃"
    },

    fraktur: {
      normal: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      styled: "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷"
    },

    boldFraktur: {
      normal: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      styled: "𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟"
    },

    double: {
      normal: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      styled: "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫"
    },

    monospace: {
      normal: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      styled: "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿"
    }
  };

  function convertWithRange(text, type) {
    const set = ranges[type];

    if (!set) return text;

    const map = new Map();

    Array.from(set.normal).forEach((char, index) => {
      map.set(char, Array.from(set.styled)[index]);
    });

    return Array.from(text)
      .map(char => map.get(char) || char)
      .join("");
  }

  function circled(text) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const symbols = "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ";

    const map = new Map(
      Array.from(chars).map((c, i) => [
        c,
        Array.from(symbols)[i]
      ])
    );

    return Array.from(text)
      .map(c => map.get(c) || c)
      .join("");
  }

  function squared(text) {
    const map = {
      A: "🅰", B: "🅱", C: "🅲", D: "🅳",
      E: "🅴", F: "🅵", G: "🅶", H: "🅷",
      I: "🅸", J: "🅹", K: "🅺", L: "🅻",
      M: "🅼", N: "🅽", O: "🅾", P: "🅿",
      Q: "🆀", R: "🆁", S: "🆂", T: "🆃",
      U: "🆄", V: "🆅", W: "🆆", X: "🆇",
      Y: "🆈", Z: "🆉"
    };

    return Array.from(text)
      .map(c => map[c.toUpperCase()] || c)
      .join("");
  }

  function smallCaps(text) {
    const map = {
      a:"ᴀ", b:"ʙ", c:"ᴄ", d:"ᴅ", e:"ᴇ",
      f:"ғ", g:"ɢ", h:"ʜ", i:"ɪ", j:"ᴊ",
      k:"ᴋ", l:"ʟ", m:"ᴍ", n:"ɴ", o:"ᴏ",
      p:"ᴘ", q:"ǫ", r:"ʀ", s:"s", t:"ᴛ",
      u:"ᴜ", v:"ᴠ", w:"ᴡ", x:"x", y:"ʏ", z:"ᴢ"
    };

    return Array.from(text)
      .map(c => map[c.toLowerCase()] || c)
      .join("");
  }

  function underline(text) {
    return Array.from(text)
      .map(c => c === "\n" ? "\n" : `${c}\u0332`)
      .join("");
  }

  function strike(text) {
    return Array.from(text)
      .map(c => c === "\n" ? "\n" : `${c}\u0336`)
      .join("");
  }

  const Converter = {
    convert(text = "", style = "bold") {
      if (!text) return "";

      switch (style) {
        case "circled":
          return circled(text);

        case "squared":
          return squared(text);

        case "smallCaps":
          return smallCaps(text);

        case "underline":
          return underline(text);

        case "strike":
          return strike(text);

        default:
          return convertWithRange(text, style);
      }
    },

    all(text = "") {
      return {
        original: text,
        bold: this.convert(text, "bold"),
        italic: this.convert(text, "italic"),
        boldItalic: this.convert(text, "boldItalic"),
        script: this.convert(text, "script"),
        boldScript: this.convert(text, "boldScript"),
        fraktur: this.convert(text, "fraktur"),
        boldFraktur: this.convert(text, "boldFraktur"),
        double: this.convert(text, "double"),
        monospace: this.convert(text, "monospace"),
        circled: this.convert(text, "circled"),
        squared: this.convert(text, "squared"),
        smallCaps: this.convert(text, "smallCaps"),
        underline: this.convert(text, "underline"),
        strike: this.convert(text, "strike")
      };
    },

    supportsUnicodeStyle(style) {
      return Boolean(ranges[style]);
    }
  };

  window.DIPO.bio.fontConverter = Converter;

})(window);