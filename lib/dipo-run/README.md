# DIPO RUN
DIPO WORLD's next-generation code playground.
## Product
DIPO RUN
## Tagline
Run. Test. Preview. Ship.
## Core Features
- Live Code Editor
- Automatic Code Detection
- Automatic Run
- Live Preview
- Auto Reload
- Error Console
- Project Run
- Responsive Preview
- Shareable Preview
- Local Project Storage
- Smooth Gen-Z Animations
## Architecture
DIPO RUN is divided into three layers:
1. Editor
2. Runner
3. Preview
User flow:
```text
WRITE / PASTE CODE
        ↓
AUTO DETECT
        ↓
AUTO RUN
        ↓
LIVE PREVIEW
        ↓
EDIT
        ↓
AUTO UPDATE

Automatic Code Detection

DIPO RUN should automatically recognize common web code.

Supported formats:

* HTML
* CSS
* JavaScript
* JSON
* SVG
* Markdown
* JSX
* TypeScript
* XML

The user should not need to manually select a language for normal web projects.

Automatic Preview

Typing or pasting code should automatically update the preview.

The user should not need to press Run after every change.

Recommended flow:

CODE CHANGE
    ↓
SHORT DEBOUNCE
    ↓
RUNNER
    ↓
SANDBOX
    ↓
LIVE PREVIEW

Preview

Preview should support:

* Desktop
* Laptop
* Tablet
* Mobile
* Full Width

Preview should include:

* Loading state
* Empty state
* Error state
* Refresh
* Fullscreen

Console

Console should display:

* LOG
* INFO
* WARNING
* ERROR
* SUCCESS

Runtime errors should appear inside the DIPO RUN console without destroying the editor.

Security

User code must be treated as untrusted.

Use sandboxed iframe execution where possible.

Never expose private API keys or DIPO WORLD secrets to user code.

Never execute user code directly inside the DIPO RUN parent page when sandbox isolation can be used.

Storage

Use browser-native storage for the initial version.

Store:

* Code
* Project title
* Device mode
* Editor settings
* Last project

Possible technologies:

* localStorage
* IndexedDB

Sharing

DIPO RUN should support shareable project/preview links.

Future versions can add:

* Public projects
* Private projects
* Remix
* Fork
* Version history
* Collaboration

Animation

DIPO RUN follows the DIPO WORLD motion style:

* Smooth
* Fast
* Premium
* Minimal
* Gen-Z
* Responsive

Animations may be used for:

* Run status
* Preview loading
* Device switching
* Panel transitions
* Buttons
* Success states
* Error states
* Micro interactions

Animations must never interfere with coding.

Mobile First

DIPO RUN must work smoothly on:

* iPhone
* Android
* Tablet
* Laptop
* Desktop

Mobile controls should use large touch targets and compact layouts.

Design Language

DIPO RUN must visually belong to DIPO WORLD.

Style:

* Deep navy
* Soft ice blue
* Muted teal
* White
* Soft black
* Rounded cards
* Smooth shadows
* Glass effects where appropriate
* Clean typography
* Premium spacing
* Lightweight animations

The product should feel like:

DIPO WORLD
     +
Developer Tool
     +
Creative Playground

Performance

Keep DIPO RUN lightweight.

Prefer:

* Browser-native APIs
* Debouncing
* requestAnimationFrame
* Event delegation
* Lazy initialization
* Minimal DOM updates

Avoid unnecessary libraries and excessive network requests.

Future AI Layer

DIPO RUN may later support:

* Explain Code
* Fix Code
* Debug Error
* Improve UI
* Generate Code
* Convert Design to Code
* Optimize Code
* Generate Components

Future Project System

My Projects
├── Recent
├── Drafts
├── Favorites
├── Shared
└── Templates

Project Files

pages/dipo-run/
├── index.html
├── preview.html
└── share.html
assets/css/dipo-run/
├── run.css
├── editor.css
├── preview.css
├── console.css
└── animation.css
assets/js/dipo-run/
├── app.js
├── editor.js
├── runner.js
├── preview.js
├── console.js
├── devices.js
├── language-detector.js
├── auto-run.js
├── share.js
├── storage.js
└── animation.js
lib/dipo-run/
└── README.md

Philosophy

Write less.

Create more.

DIPO RUN should remain simple for beginners while becoming powerful enough for advanced creators.

Brand

DIPO WORLD

DIPO RUN

Run. Test. Preview. Ship.

Made With ❤️ in India

𝔄 𝔇𝔐 𝔭𝔯𝔬𝔡𝔲𝔠𝔱