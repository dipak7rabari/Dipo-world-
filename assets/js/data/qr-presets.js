/**
 * DIPO QR — QR Presets
 *
 * Client-side QR styling configuration.
 */

const qrPresets = [

  {
    id: "modern",
    name: "Modern",
    description: "Clean modern QR",
    dots: "rounded",
    cornersSquare: "extra-rounded",
    cornersDot: "dot",
    background: "#ffffff",
    foreground: "#111827",
    errorCorrection: "H"
  },

  {
    id: "instagram",
    name: "Instagram",
    description: "Instagram-inspired QR",
    dots: "rounded",
    cornersSquare: "extra-rounded",
    cornersDot: "dot",
    background: "#ffffff",
    foreground: "#833AB4",
    errorCorrection: "H",
    social: "instagram"
  },

  {
    id: "whatsapp",
    name: "WhatsApp",
    description: "WhatsApp-inspired QR",
    dots: "rounded",
    cornersSquare: "rounded",
    cornersDot: "dot",
    background: "#ffffff",
    foreground: "#128C7E",
    errorCorrection: "H",
    social: "whatsapp"
  },

  {
    id: "telegram",
    name: "Telegram",
    description: "Telegram-inspired QR",
    dots: "rounded",
    cornersSquare: "rounded",
    cornersDot: "dot",
    background: "#ffffff",
    foreground: "#229ED9",
    errorCorrection: "H",
    social: "telegram"
  },

  {
    id: "youtube",
    name: "YouTube",
    description: "YouTube-inspired QR",
    dots: "square",
    cornersSquare: "extra-rounded",
    cornersDot: "square",
    background: "#ffffff",
    foreground: "#FF0000",
    errorCorrection: "H",
    social: "youtube"
  },

  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Neon cyber aesthetic",
    dots: "dots",
    cornersSquare: "extra-rounded",
    cornersDot: "dot",
    background: "#080B14",
    foreground: "#67E8F9",
    errorCorrection: "H"
  },

  {
    id: "luxury",
    name: "Gold Luxury",
    description: "Premium luxury style",
    dots: "classy-rounded",
    cornersSquare: "extra-rounded",
    cornersDot: "dot",
    background: "#111111",
    foreground: "#D6B56E",
    errorCorrection: "H"
  },

  {
    id: "pastel",
    name: "Pastel",
    description: "Soft pastel aesthetic",
    dots: "rounded",
    cornersSquare: "rounded",
    cornersDot: "dot",
    background: "#FFF7FB",
    foreground: "#A66C91",
    errorCorrection: "H"
  },

  {
    id: "classic",
    name: "Classic",
    description: "Standard high-contrast QR",
    dots: "square",
    cornersSquare: "square",
    cornersDot: "square",
    background: "#FFFFFF",
    foreground: "#000000",
    errorCorrection: "H"
  }

];

export default qrPresets;