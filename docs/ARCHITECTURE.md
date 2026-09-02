# DIPO WORLD — Architecture Specification
> Production Architecture Document  
> Version: 1.0  
> Status: Locked Foundation  
> Brand: DIPO WORLD  
> Products: DIPO BIO · DIPO QR
---
## 1. Overview
DIPO WORLD is a modular web platform designed to provide lightweight, fast, privacy-conscious and mobile-first digital tools.
The platform currently contains two primary products:
- DIPO BIO
- DIPO QR
The architecture is intentionally modular so that additional DIPO WORLD products can be added without rewriting the existing foundation.
---
## 2. Architecture Goals
The system is designed around the following principles:
1. Modular architecture
2. Mobile-first UI
3. Progressive enhancement
4. Reusable components
5. Separation of concerns
6. Minimal dependencies
7. Fast loading
8. Accessibility
9. SEO readiness
10. Privacy by design
11. Safe client-side state handling
12. Easy maintenance
13. Future extensibility
14. Production-ready deployment
15. No unnecessary framework dependency
---
# 3. High-Level Architecture
```text
DIPO WORLD
│
├── Presentation Layer
│   ├── index.html
│   ├── pages/
│   └── components/
│
├── Styling Layer
│   └── assets/css/
│
├── Application Layer
│   └── assets/js/
│       ├── core/
│       ├── data/
│       ├── dipo-bio/
│       ├── dipo-qr/
│       └── services/
│
├── Configuration Layer
│   └── config/
│
├── Content/Data Layer
│   ├── data/
│   └── assets/js/data/
│
├── Library Layer
│   └── lib/
│
├── SEO Layer
│   └── seo/
│
├── Documentation Layer
│   └── docs/
│
└── Quality Layer
    └── tests/

⸻

4. Project Structure

Dipo-world/
│
├── .vscode/
│
├── assets/
│   │
│   ├── css/
│   │   ├── variables.css
│   │   ├── reset.css
│   │   ├── base.css
│   │   ├── typography.css
│   │   ├── animations.css
│   │   ├── components.css
│   │   ├── responsive.css
│   │   ├── accessibility.css
│   │   └── app.css
│   │
│   ├── fonts/
│   │
│   ├── icons/
│   │
│   ├── images/
│   │
│   └── js/
│       │
│       ├── core/
│       │   ├── app.js
│       │   ├── clipboard.js
│       │   ├── download.js
│       │   ├── error-handler.js
│       │   ├── events.js
│       │   ├── lazy-loader.js
│       │   ├── modal.js
│       │   ├── router.js
│       │   ├── share.js
│       │   ├── state.js
│       │   ├── storage.js
│       │   ├── theme.js
│       │   ├── toast.js
│       │   └── utils.js
│       │
│       ├── data/
│       │   ├── barcode-presets.js
│       │   ├── bio-templates.js
│       │   ├── categories.js
│       │   ├── font-mapping.js
│       │   ├── hindi-styles.js
│       │   ├── kaomoji.js
│       │   ├── qr-presets.js
│       │   └── symbols.js
│       │
│       ├── dipo-bio/
│       │
│       ├── dipo-qr/
│       │
│       └── services/
│           ├── accessibility.js
│           ├── analytics.js
│           ├── performance.js
│           ├── pwa.js
│           └── seo.js
│
├── components/
│
├── config/
│
├── data/
│
├── docs/
│
├── lib/
│
├── pages/
│
├── seo/
│
├── tests/
│
├── favicon.ico
├── index.html
├── LICENSE
├── manifest.json
├── README.md
├── robots.txt
└── service-worker.js

⸻

5. Layer Responsibilities

5.1 Presentation Layer

Responsible for:

* HTML structure
* Page layout
* Semantic markup
* User interaction targets
* Accessibility attributes
* Component placement

Presentation code must not contain complex business logic.

⸻

5.2 Styling Layer

Location:

assets/css/

The CSS architecture is divided by responsibility.

variables.css

Contains:

* Colors
* Spacing tokens
* Radius tokens
* Shadows
* Typography variables
* Z-index values
* Layout variables
* Transition values

⸻

reset.css

Contains:

* Browser normalization
* Box sizing
* Default margin removal
* Form normalization
* Image normalization
* Button normalization

⸻

base.css

Contains:

* Body
* Main layout
* Containers
* Global surfaces
* Base elements

⸻

typography.css

Contains:

* Font families
* Heading styles
* Paragraph styles
* Labels
* Captions
* Links
* Text utilities

⸻

animations.css

Contains:

* Page transitions
* Fade animations
* Scale animations
* Slide animations
* Loading animations
* Reduced-motion compatibility

Animations must never block application functionality.

⸻

components.css

Contains reusable visual components:

* Buttons
* Cards
* Inputs
* Selects
* Modals
* Toasts
* Navigation
* Footer
* Badges
* Tabs
* Empty states
* Error states

⸻

responsive.css

Contains responsive rules for:

* Small phones
* Large phones
* Tablets
* Desktop
* Large desktop displays

⸻

accessibility.css

Contains accessibility-specific styling:

* Focus states
* Skip links
* Reduced motion
* High contrast support
* Screen-reader utilities
* Keyboard navigation indicators

⸻

app.css

Application-level stylesheet entry point.

This file coordinates the complete CSS architecture.

⸻

6. JavaScript Architecture

The JavaScript system is divided into independent modules.

assets/js/
│
├── core/
├── data/
├── dipo-bio/
├── dipo-qr/
└── services/

⸻

7. Core JavaScript

Location:

assets/js/core/

Core modules provide infrastructure used throughout DIPO WORLD.

⸻

app.js

Application bootstrap.

Responsibilities:

* Initialize application
* Load configuration
* Initialize global services
* Initialize router
* Initialize theme
* Initialize state
* Start required modules

The bootstrap should remain lightweight.

⸻

router.js

Responsible for:

* Route detection
* Navigation
* Page loading
* Route guards
* Browser history
* Back/forward navigation

Product-specific logic must not be placed directly inside the router.

⸻

state.js

Provides centralized application state.

Responsibilities:

* Read current state
* Update state
* Subscribe to state changes
* Notify dependent modules

State should remain predictable and minimal.

⸻

storage.js

Responsible for safe browser storage.

Supported storage:

* localStorage
* sessionStorage

Storage keys must use a consistent DIPO WORLD namespace.

Example:

dipo_world_theme
dipo_world_preferences
dipo_bio_recent
dipo_qr_recent

Sensitive information must not be stored without a clear requirement.

⸻

events.js

Provides a centralized event system.

Responsibilities:

* Custom events
* Event delegation
* Cross-module communication

Modules should communicate through controlled events instead of creating unnecessary direct dependencies.

⸻

clipboard.js

Responsible for:

* Copy text
* Copy generated content
* Clipboard permission handling
* Clipboard error handling

⸻

download.js

Responsible for:

* Downloading generated files
* Blob handling
* Filename generation
* MIME types
* Browser compatibility

⸻

modal.js

Responsible for:

* Open modal
* Close modal
* Focus management
* Escape key handling
* Background interaction control

⸻

toast.js

Responsible for temporary user notifications.

Examples:

* Copied
* Saved
* Downloaded
* Error
* Success
* Warning

⸻

share.js

Responsible for:

* Web Share API
* Share fallback
* Copy-to-clipboard fallback

⸻

theme.js

Responsible for:

* Light/dark theme
* System preference
* Theme persistence
* Theme switching

⸻

lazy-loader.js

Responsible for:

* Lazy loading
* Deferred resources
* Image loading
* Optional module loading

⸻

error-handler.js

Central application error handling.

Responsibilities:

* Catch unexpected errors
* Prevent broken UI
* Provide user-friendly messages
* Log safe diagnostic information

Never expose sensitive internal information to users.

⸻

utils.js

Contains small reusable utilities.

Examples:

* String helpers
* ID generation
* Validation helpers
* Formatting
* DOM helpers
* Type checks
* Safe parsing

Large business logic must not be placed here.

⸻

8. DIPO BIO Architecture

Location:

assets/js/dipo-bio/

DIPO BIO is responsible for creating and managing professional bio/profile content.

The DIPO BIO system should remain independent from DIPO QR.

Typical responsibilities include:

* Bio generation
* Template selection
* Character/symbol tools
* Hindi styling
* Font conversion
* Preview
* Recent items
* Search
* Filtering
* Sharing
* Exporting

DIPO BIO must use shared core modules wherever possible.

⸻

9. DIPO QR Architecture

Location:

assets/js/dipo-qr/

DIPO QR is responsible for QR code generation and customization.

Typical responsibilities include:

* QR generation
* QR presets
* QR customization
* Frames
* Logos
* Colors
* Error correction
* Preview
* Scanner integration
* PNG export
* SVG export
* Printing
* Recent QR items

The QR engine must remain isolated from the DIPO BIO engine.

⸻

10. Data Architecture

There are two types of data.

Static Application Data

Location:

data/

Examples:

categories.json
fonts.json
templates.json
qr-presets.json
symbols.json

Static JSON should contain configuration/content rather than application logic.

⸻

JavaScript Data Modules

Location:

assets/js/data/

These modules provide application-friendly access to predefined data.

Examples:

barcode-presets.js
bio-templates.js
categories.js
font-mapping.js
hindi-styles.js
kaomoji.js
qr-presets.js
symbols.js

⸻

11. Configuration Architecture

Location:

config/

Configuration controls application-level behavior.

Typical files:

app-config.js
branding.js
features.js
routes.js

⸻

app-config.js

Contains global application configuration.

Examples:

* Application name
* Version
* Environment
* Feature defaults
* Storage namespace

⸻

branding.js

Contains centralized branding.

Examples:

DIPO WORLD
DIPO BIO
DIPO QR
dipolabs.io

Brand information should not be duplicated across dozens of files.

⸻

features.js

Contains feature flags.

Example:

{
  bio: true,
  qr: true,
  sharing: true,
  downloads: true,
  scanner: true
}

Feature flags allow future features to be enabled or disabled without rewriting unrelated modules.

⸻

routes.js

Central route definitions.

Routes must be declared in one place whenever possible.

⸻

12. Components Architecture

Location:

components/

Components are reusable UI fragments.

Examples:

navbar.html
footer.html
bottom-nav.html
modal.html
toast.html
share-card.html
loading-screen.html
empty-state.html
error-state.html
legal-footer.html
instagram-follow.html
install-banner.html

Components should be:

* Reusable
* Small
* Accessible
* Independent
* Easy to maintain

⸻

13. Page Architecture

Location:

pages/

Pages represent complete user-facing experiences.

A page may compose:

Page
 ├── Navbar
 ├── Main Content
 │   ├── Components
 │   └── Product Module
 ├── Footer
 └── Legal Footer

Pages should not duplicate shared components.

⸻

14. Library Architecture

Location:

lib/

This directory is reserved for third-party libraries.

Current planned libraries:

lib/
├── jsbarcode/
└── qr-code-styling/

Third-party libraries must remain isolated.

Application-specific code must not be mixed into vendor libraries.

Third-party licenses and copyright notices must be respected.

⸻

15. Service Layer

Location:

assets/js/services/

Services provide cross-cutting application functionality.

⸻

accessibility.js

Responsible for:

* Accessibility checks
* Focus handling
* ARIA helpers
* Keyboard interaction support

⸻

analytics.js

Responsible for optional analytics integration.

Rules:

* Privacy-conscious
* No unnecessary tracking
* No sensitive data collection
* Analytics must never block application startup

⸻

performance.js

Responsible for:

* Performance measurement
* Lazy loading support
* Resource timing
* Performance diagnostics

⸻

pwa.js

Responsible for:

* PWA initialization
* Installation support
* Service worker communication

⸻

seo.js

Responsible for dynamic SEO-related behavior where required.

Static SEO metadata should remain in HTML where possible.

⸻

16. Service Worker Architecture

Location:

service-worker.js

Responsibilities:

* Cache management
* Offline fallback
* Static asset caching
* Versioned cache cleanup

The service worker must never cache sensitive user information.

Cache versions must be updated when critical application assets change.

⸻

17. PWA Architecture

DIPO WORLD is designed to support Progressive Web App behavior.

Required foundation:

manifest.json
service-worker.js
favicon.ico

PWA goals:

* Installable experience
* Fast repeat visits
* Offline-friendly shell
* App-like navigation
* Mobile usability

Offline behavior must fail gracefully when a feature requires network access.

⸻

18. UI Design System

The visual direction follows a modern editorial/product-card aesthetic inspired by the provided DIPO reference design.

Primary characteristics:

* Clean layout
* Soft neutral surfaces
* Muted green/teal accent
* Strong black typography
* Rounded cards
* High whitespace
* Premium minimal appearance
* Clear hierarchy
* Mobile-first composition

The design system must be token-based.

Colors must be controlled from:

assets/css/variables.css

Do not hard-code the same color repeatedly across CSS files.

⸻

19. Design Tokens

The system should use centralized tokens for:

* Color
* Spacing
* Typography
* Radius
* Shadow
* Border
* Transition
* Z-index
* Container width

Example:

:root {
  --color-primary: ...;
  --color-background: ...;
  --color-surface: ...;
  --color-text: ...;
  --space-xs: ...;
  --space-sm: ...;
  --space-md: ...;
  --space-lg: ...;
  --space-xl: ...;
  --radius-sm: ...;
  --radius-md: ...;
  --radius-lg: ...;
  --shadow-sm: ...;
  --shadow-md: ...;
}

Actual values belong in variables.css.

⸻

20. Accessibility Requirements

DIPO WORLD must target WCAG-compatible accessible behavior.

Requirements:

* Semantic HTML
* Keyboard navigation
* Visible focus indicators
* Accessible buttons
* Accessible form labels
* Proper heading hierarchy
* Sufficient contrast
* Alt text for meaningful images
* Decorative images marked appropriately
* Reduced motion support
* Screen-reader compatibility
* Touch targets suitable for mobile

Accessibility must be treated as a core feature.

⸻

21. Responsive Design

The platform is mobile-first.

Priority:

Mobile
   ↓
Tablet
   ↓
Desktop
   ↓
Large Desktop

The UI must not depend on a desktop-only interaction model.

All primary features must remain usable on small phone screens.

⸻

22. Performance Requirements

Performance goals:

* Minimal blocking resources
* Optimized images
* Lazy-loaded non-critical media
* Deferred non-critical JavaScript
* Minimal third-party dependencies
* Efficient DOM updates
* Avoid unnecessary re-renders
* Avoid large synchronous operations
* Cache static resources safely

The application should remain usable on slower mobile networks.

⸻

23. Security Principles

DIPO WORLD follows a defense-in-depth approach.

Rules:

1. Never trust user input.
2. Validate input before processing.
3. Sanitize content before inserting into HTML.
4. Avoid unsafe innerHTML where unnecessary.
5. Never expose secrets in frontend code.
6. Never place API keys directly in public JavaScript.
7. Do not store sensitive information in localStorage.
8. Do not execute arbitrary user-provided JavaScript.
9. Validate generated/downloaded content.
10. Keep third-party dependencies isolated and updated.

⸻

24. Privacy Principles

DIPO WORLD should collect the minimum information required for a feature.

Default principles:

* No unnecessary personal data
* No unnecessary tracking
* No hidden data collection
* Clear user controls
* Transparent privacy documentation
* Local-first behavior where practical

If a future feature requires a backend, privacy requirements must be documented before implementation.

⸻

25. SEO Architecture

SEO-related files:

seo/
robots.txt
index.html
assets/js/services/seo.js

SEO requirements include:

* Unique page titles
* Meta descriptions
* Canonical URLs
* Open Graph metadata
* Social preview metadata
* Semantic headings
* Descriptive links
* Structured data where appropriate

SEO content should be meaningful and not keyword-stuffed.

⸻

26. Error Handling

Errors are divided into three levels.

User Errors

Examples:

* Invalid input
* Missing required value
* Unsupported format

Show a clear user-friendly message.

⸻

Recoverable Application Errors

Examples:

* Failed download
* Clipboard unavailable
* Share API unavailable

Use fallback behavior where possible.

⸻

Critical Errors

Examples:

* Application bootstrap failure
* Broken module
* Unexpected runtime exception

Show the global error state and preserve as much functionality as possible.

⸻

27. State Management Rules

State should be:

* Minimal
* Predictable
* Serializable where possible
* Scoped appropriately

Avoid global variables.

Prefer:

Component State
      ↓
Product State
      ↓
Application State

Only truly global information belongs in global application state.

⸻

28. Module Dependency Rules

The dependency direction should remain:

UI
 ↓
Product Modules
 ↓
Core Modules
 ↓
Browser APIs

Core modules must not depend on product-specific modules.

For example:

core/router.js

must not directly depend on:

dipo-bio/*

or:

dipo-qr/*

Instead, product modules register themselves with the application.

⸻

29. Naming Conventions

Files

Use lowercase kebab-case.

Correct:

error-handler.js
bottom-nav.html
bio-templates.js
qr-presets.js

Avoid:

ErrorHandler.js
BottomNav.HTML
bioTemplates.js

⸻

CSS Classes

Use descriptive kebab-case.

Example:

.bio-card
.bio-card__title
.bio-card__actions

⸻

JavaScript

Use camelCase.

Example:

createBio()
generateQr()
openModal()

⸻

Constants

Use uppercase where appropriate.

Example:

const APP_VERSION = "1.0.0";

⸻

30. HTML Rules

Use semantic elements whenever possible.

Prefer:

<header>
<nav>
<main>
<section>
<article>
<footer>

Avoid excessive nested <div> elements.

Every interactive element must be keyboard accessible.

⸻

31. CSS Rules

CSS must follow the existing architecture.

Do not put:

* JavaScript logic in CSS
* Product-specific giant stylesheets into base.css
* Random global styles into app.css

Use the correct layer.

⸻

32. JavaScript Rules

JavaScript should follow:

One module = One responsibility

Avoid:

* Giant files
* Duplicate functions
* Global variables
* Inline JavaScript
* Unnecessary dependencies
* Circular dependencies

⸻

33. Data Rules

Static data must not contain executable code.

Good:

{
  "id": "modern",
  "title": "Modern",
  "description": "Modern bio template"
}

Avoid storing executable JavaScript inside data files.

⸻

34. Local Storage Rules

All application storage keys should use a namespace.

Recommended format:

dipo_world_<product>_<feature>

Examples:

dipo_world_theme
dipo_world_bio_recent
dipo_world_qr_recent
dipo_world_preferences

Storage should have:

* Versioning
* Safe parsing
* Error recovery
* Migration support when required

⸻

35. Browser Compatibility

The application should support modern browsers.

Primary targets:

* Safari
* Chrome
* Edge
* Firefox
* iOS Safari
* Android Chrome

Progressive enhancement should be used for optional browser APIs.

Example:

Web Share API
      ↓
Clipboard fallback
      ↓
Manual copy instructions

⸻

36. Offline Strategy

Offline functionality should prioritize:

1. Application shell
2. Static CSS
3. Static JavaScript
4. Local data
5. Previously available UI resources

Network-dependent functionality should provide a graceful fallback.

⸻

37. Testing Architecture

Location:

tests/

Testing should eventually cover:

* Unit Tests
* Integration Tests
* UI Tests
* Accessibility Tests
* Performance Tests
* Browser Tests
* Regression Tests

Critical product functionality must be tested before production releases.

⸻

38. Testing Priorities

Highest priority:

1. DIPO BIO generation
2. DIPO QR generation
3. Download/export
4. Copy functionality
5. Sharing
6. Routing
7. State persistence
8. Error handling
9. Accessibility
10. Responsive behavior

⸻

39. Documentation Architecture

Location:

docs/

Documentation should include:

ARCHITECTURE.md
DATA-SYSTEM.md
DEPLOYMENT.md
DIPO-BIO.md
DIPO-QR.md
PRIVACY.md
SECURITY.md
TESTING.md
UI-SYSTEM.md

Documentation is part of the product architecture.

Every major system change should update the relevant document.

⸻

40. Deployment Architecture

The application is designed to work with static hosting.

Potential deployment environments include:

* GitHub Pages
* Cloudflare Pages
* Netlify
* Vercel
* Other static hosting providers

Deployment must serve:

index.html
assets/
components/
config/
data/
pages/
seo/

Correct MIME types must be configured for all assets.

⸻

41. Environment Separation

Future environments may include:

development
staging
production

Environment-specific configuration must never require editing dozens of application files.

Use centralized configuration.

⸻

42. Versioning

Application version should be centralized.

Recommended format:

MAJOR.MINOR.PATCH

Example:

1.0.0

Version changes:

MAJOR

Breaking architecture or API changes.

MINOR

New backward-compatible functionality.

PATCH

Bug fixes and small improvements.

⸻

43. Release Process

Before production release:

1. Run tests
2. Check console errors
3. Check broken links
4. Check mobile layout
5. Check desktop layout
6. Check accessibility
7. Check SEO metadata
8. Check PWA behavior
9. Check downloads
10. Check sharing
11. Check QR generation
12. Check BIO generation
13. Check performance
14. Update version
15. Update documentation
16. Deploy

⸻

44. Git Workflow

Recommended branch structure:

main
│
├── develop
│
├── feature/*
├── fix/*
└── release/*

Production code should be merged into main only after validation.

Commit messages should describe the actual change.

Examples:

feat: add QR frame presets
fix: repair bio copy action
docs: update architecture
perf: optimize image loading
style: improve mobile card spacing

⸻

45. Code Review Rules

Before merging code:

* Check naming
* Check duplication
* Check accessibility
* Check responsive behavior
* Check error handling
* Check browser compatibility
* Check performance
* Check security
* Check documentation

⸻

46. Dependency Rules

Third-party dependencies should be kept to a minimum.

Before adding a dependency, ask:

1. Is it actually required?
2. Can native browser APIs solve the problem?
3. Is the package maintained?
4. Is the license compatible?
5. Does it increase bundle size significantly?
6. Does it introduce security risk?
7. Can it remain isolated?

⸻

47. Third-Party Library Isolation

Third-party libraries belong only in:

lib/

Application wrappers belong in:

assets/js/

Example:

lib/jsbarcode/
        ↓
assets/js/dipo-qr/
        ↓
DIPO QR UI

This prevents vendor code from becoming tightly coupled to the application.

⸻

48. Branding Architecture

Brand information must remain centralized.

Primary brand:

DIPO WORLD

Products:

DIPO BIO
DIPO QR

Website/domain references may be managed centrally through branding configuration.

Social links and brand links should not be duplicated unnecessarily.

⸻

49. Legal Architecture

Legal information should be maintained through dedicated documents and reusable UI components.

Required areas:

* Privacy
* Terms
* Copyright
* Third-party licenses
* Cookie/analytics disclosure where applicable

Reusable legal UI:

components/legal-footer.html

The legal footer should be included consistently across applicable pages.

⸻

50. Copyright

DIPO WORLD application code, original UI, original content and original assets remain subject to the project’s license and copyright notices.

Third-party libraries remain owned by their respective authors.

Do not remove third-party copyright or license notices.

⸻

51. Footer Branding

The website may display the following brand footer content:

Made With ❤️ in India
𝔄 𝔇𝔐 𝔭𝔯𝔬𝔡𝔲𝔠𝔱
All copyrights reserved
@ 𝔄 𝔇𝔐 𝔭𝔯𝔬𝔡𝔲𝔠𝔱

The final legal wording must remain consistent with the project’s actual ownership and license configuration.

⸻

52. Social Links

Official social links should be maintained centrally.

Current planned social reference:

Instagram:
dipolabs.io

Social links should be configured rather than hard-coded repeatedly throughout the application.

⸻

53. Accessibility + UX Rule

No visual effect is more important than usability.

If an animation, component or visual effect causes:

* Poor readability
* Keyboard problems
* Slow performance
* Motion discomfort
* Touch problems

the functionality must take priority over the visual effect.

⸻

54. Mobile UX Rules

DIPO WORLD is designed primarily for mobile users.

Requirements:

* Thumb-friendly controls
* Large tap targets
* Clear primary actions
* Bottom navigation where appropriate
* Minimal horizontal scrolling
* Readable text
* Fast interactions
* Sticky controls only when useful

⸻

55. Empty States

Every list/grid-based feature should have an intentional empty state.

Examples:

No recent bios yet.
No saved QR codes yet.
No templates found.
No results found.

Avoid leaving blank UI regions.

⸻

56. Loading States

Long-running operations must provide feedback.

Examples:

Generating...
Loading...
Preparing download...
Creating QR...

Loading states must not trap users.

⸻

57. Error States

Errors must be understandable.

Bad:

Error 500

Better:

Something went wrong.
Please try again.

Technical information may be logged for diagnostics but should not unnecessarily appear in the user interface.

⸻

58. Empty / Loading / Error System

All major features should support:

LOADING
   ↓
SUCCESS
   ↓
EMPTY
   ↓
ERROR

This state model should be consistent across DIPO BIO and DIPO QR.

⸻

59. Export Architecture

Export functionality should use a common abstraction.

Product
   ↓
Export Service
   ↓
Browser/File API
   ↓
Downloaded File

Supported formats depend on the product.

Examples:

PNG
SVG
TXT

Future formats may be added without rewriting product generation logic.

⸻

60. Share Architecture

Sharing should follow progressive enhancement:

Native Share
     ↓
Clipboard
     ↓
Share URL
     ↓
Manual fallback

The application must continue functioning when the Web Share API is unavailable.

⸻

61. Future Expansion

DIPO WORLD can later support additional products.

Example:

DIPO WORLD
│
├── DIPO BIO
├── DIPO QR
├── DIPO TAPE
├── Future Product
└── Future Product

New products should follow the existing modular structure.

A new product should not modify unrelated product logic.

⸻

62. Adding a New Product

Recommended structure:

assets/js/new-product/
components/new-product/
pages/new-product/
data/new-product/
docs/NEW-PRODUCT.md

Register the product through:

config/features.js
config/routes.js
config/branding.js

Only shared functionality should be added to core/.

⸻

63. Architecture Stability Rule

Once a core module is used by multiple products, it should not be rewritten casually.

Changes to core systems must consider:

DIPO BIO
DIPO QR
Future Products

Backward compatibility should be preferred.

⸻

64. No Duplicate Logic Rule

If two products require the same functionality, evaluate whether it belongs in core/.

Examples:

* copy
* download
* share
* modal
* toast
* storage
* theme
* routing
* error handling

Do not create multiple copies of the same utility unless there is a strong architectural reason.

⸻

65. Source of Truth

Each type of information should have one primary source of truth.

Brand → config/branding.js
Routes → config/routes.js
Features → config/features.js
Global settings → config/app-config.js
Design tokens → assets/css/variables.css
Static data → data/
Core behavior → assets/js/core/
Product behavior → assets/js/dipo-bio/ and assets/js/dipo-qr/
Reusable UI → components/
Documentation → docs/

⸻

66. Production Readiness Checklist

Before declaring the platform production-ready:

[ ] Architecture documented
[ ] CSS architecture complete
[ ] Core JS complete
[ ] Product modules complete
[ ] Components complete
[ ] Configuration centralized
[ ] Static data validated
[ ] Third-party libraries isolated
[ ] Error handling implemented
[ ] Accessibility implemented
[ ] Responsive design verified
[ ] SEO implemented
[ ] PWA verified
[ ] Security reviewed
[ ] Privacy reviewed
[ ] Tests passing
[ ] Console clean
[ ] Broken links checked
[ ] Download tested
[ ] Share tested
[ ] DIPO BIO tested
[ ] DIPO QR tested
[ ] Mobile tested
[ ] Desktop tested
[ ] Documentation updated
[ ] Production deployment tested

⸻

67. Development Rule

The project should be built in dependency order.

Recommended order:

1. CSS Foundation
2. HTML Foundation
3. Core JavaScript
4. Static Data
5. Configuration
6. Shared Components
7. Services
8. DIPO BIO
9. DIPO QR
10. Pages
11. SEO
12. PWA
13. Testing
14. Deployment

Do not build a feature before its required foundation exists.

⸻

68. Final Architecture Principle

DIPO WORLD should remain:

Simple
     +
Modular
     +
Fast
     +
Accessible
     +
Maintainable
     +
Privacy-conscious
     +
Scalable

The objective is not to create the largest codebase.

The objective is to create a clean system where every file has a clear responsibility and future features can be added without breaking existing functionality.

⸻

69. Architecture Status

Project: DIPO WORLD
Architecture: LOCKED
CSS Foundation: LOCKED
Core JS Structure: LOCKED
DIPO BIO Structure: LOCKED
DIPO QR Structure: LOCKED
Component Structure: LOCKED
Configuration Structure: LOCKED
Documentation Structure: LOCKED
Status:
PRODUCTION ARCHITECTURE FOUNDATION

⸻

DIPO WORLD

DIPO BIO · DIPO QR

Made With ❤️ in India

𝔄 𝔇𝔐 𝔭𝔯𝔬𝔡𝔲𝔠𝔱
All copyrights reserved
@ 𝔄 𝔇𝔐 𝔭𝔯𝔬𝔡𝔲𝔠𝔱