# DIPO WORLD

DIPO WORLD is a digital tools ecosystem.

## Products

### DIPO BIO

DIPO BIO is a digital bio/profile creation tool.

Features include:

- Bio generation
- Bio remixing
- Fonts
- Symbols
- Kaomoji
- Templates
- Preview
- Profile customization

### DIPO QR

DIPO QR is a QR and barcode creation toolkit.

Features include:

- QR generation
- Artistic QR
- Barcode generation
- QR frames
- QR preview
- Export tools

## Project Structure

```text
DIPO-WORLD/
├── assets/
├── components/
├── config/
├── data/
├── docs/
├── lib/
├── pages/
├── seo/
├── tests/
├── index.html
├── manifest.json
├── robots.txt
├── service-worker.js
└── sitemap.xml
Architecture

The project follows a modular architecture.

components/

Reusable UI components.

lib/

Core application logic and utilities.

pages/

User-facing pages and product interfaces.

data/

Static and structured application data.

config/

Project configuration.

seo/

SEO metadata and structured SEO resources.

tests/

Automated tests for core functionality.

Development

DIPO WORLD is designed so that UI pages remain separate from the underlying
application logic.

The actual generators and engines should be connected through the existing
lib/ and components/ modules rather than duplicating their logic inside
individual pages.

Products

* DIPO WORLD
* DIPO BIO
* DIPO QR