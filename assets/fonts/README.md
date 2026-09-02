# DIPO WORLD Fonts

This directory contains fonts used by the DIPO WORLD website and its
different tools, pages, components, and generated content.

---

## Purpose

The `assets/fonts/` directory is reserved for locally hosted fonts.

Using local fonts helps provide:

- Consistent typography
- Faster visual consistency
- Better branding
- Offline-friendly rendering
- Reduced dependency on external font providers
- Better control over font loading

---

## Recommended Structure

```text
assets/
└── fonts/
    ├── README.md
    ├── Inter/
    │   ├── Inter-Regular.woff2
    │   ├── Inter-Medium.woff2
    │   ├── Inter-SemiBold.woff2
    │   └── Inter-Bold.woff2
    │
    ├── Poppins/
    │   ├── Poppins-Regular.woff2
    │   ├── Poppins-Medium.woff2
    │   ├── Poppins-SemiBold.woff2
    │   └── Poppins-Bold.woff2
    │
    └── Mono/
        ├── JetBrainsMono-Regular.woff2
        └── JetBrainsMono-Medium.woff2

        The exact font files can be added later without changing this README.

⸻

Font Roles

Inter

Primary interface font.

Recommended for:

* Navigation
* Buttons
* Forms
* Dashboard UI
* General body text
* Settings
* Tool interfaces

Poppins

Brand and display font.

Recommended for:

* Headings
* Hero sections
* Marketing pages
* Feature titles
* Promotional sections

JetBrains Mono

Monospace font for developer-oriented interfaces.

Recommended for:

* Code editor
* Terminal
* Code blocks
* File names
* Developer tools
* Technical output

⸻

Loading Local Fonts

When actual font files are added, load them through CSS using
@font-face.

@font-face {
  font-family: "Inter";
  src: url("/assets/fonts/Inter/Inter-Regular.woff2")
    format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Inter";
  src: url("/assets/fonts/Inter/Inter-Medium.woff2")
    format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Inter";
  src: url("/assets/fonts/Inter/Inter-SemiBold.woff2")
    format("woff2");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Inter";
  src: url("/assets/fonts/Inter/Inter-Bold.woff2")
    format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

Font Format

Preferred format:

WOFF2

WOFF2 should be preferred because it provides good compression and
modern browser support.

Avoid adding unnecessary font formats unless browser compatibility
requires them.

⸻

Font Weight Convention

Use the following standard:

Weight	Name
400	Regular
500	Medium
600	SemiBold
700	Bold

Do not create unnecessary duplicate font weights.

⸻

Performance Rules

Fonts should be loaded carefully.

Recommended practices:

1. Prefer WOFF2.
2. Use font-display: swap.
3. Avoid loading fonts that are not actually used.
4. Avoid loading every available font weight.
5. Keep font files optimized.
6. Use local fonts for important UI typography.
7. Do not block the initial page render unnecessarily.

⸻

Accessibility

Typography must remain readable on:

* Mobile
* Tablet
* Desktop
* High-resolution displays

Do not use extremely small font sizes for important content.

Maintain sufficient contrast between text and background.

⸻

Branding

DIPO WORLD typography should remain consistent across:

* DIPO WORLD
* DIPO BIO
* DIPO QR
* Developer tools
* Utility pages
* Documentation
* Marketing pages

Individual tools may use specialized typography where required,
especially code and terminal interfaces.

⸻

Future Font Additions

New fonts should only be added when there is a clear design or
functional requirement.

Before adding a new font:

1. Confirm that an existing font cannot fulfil the requirement.
2. Add the font under its own directory if appropriate.
3. Use WOFF2 where possible.
4. Define the required weights only.
5. Update the relevant CSS.
6. Keep this documentation accurate.

⸻

License

Every third-party font added to this directory must have a license
compatible with the DIPO WORLD project.

Keep the original license information when required by the font
license.

Do not add copyrighted font files without appropriate permission.

⸻

Status

This directory is part of the DIPO WORLD asset system.

The actual font files may be added independently without changing
the application architecture.

**अभी इसमें और कुछ डालने की जरूरत नहीं है।** `README.md` को save कर दो। इसके बाद `assets/fonts` का काम complete मान सकते हैं।