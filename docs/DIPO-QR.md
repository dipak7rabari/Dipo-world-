DIPO WORLD — DIPO QR Specification

Product Specification Document
Version: 1.0
Status: Locked Foundation
Product: DIPO QR
Parent Brand: DIPO WORLD

⸻

1. Overview

DIPO QR is a lightweight, fast and mobile-first QR code generation and customization tool within DIPO WORLD.

The product is designed to allow users to create, customize, preview, download, share and print QR codes without unnecessary complexity.

DIPO QR should remain modular and independent from DIPO BIO while using shared DIPO WORLD core infrastructure.

⸻

2. Product Goals

DIPO QR is designed around the following principles:

1. Simple QR creation
2. Fast generation
3. Mobile-first UX
4. Easy customization
5. High-quality output
6. Multiple export formats
7. Progressive enhancement
8. Accessibility
9. Privacy-conscious behavior
10. Minimal dependencies
11. Reusable architecture
12. Offline-friendly behavior where practical
13. Safe input handling
14. Future extensibility

⸻

3. Core Features

DIPO QR should support:

* QR code generation
* Multiple QR content types
* QR presets
* Custom colors
* Custom styles
* Frames
* Logos
* Error correction
* Live preview
* Download
* PNG export
* SVG export
* Print
* Share
* Copy
* Recent QR items
* Reset controls
* Validation
* Error handling
* Responsive interface

⸻

4. QR Content Types

The architecture should support multiple QR data types.

Initial supported types may include:

* Plain text
* URL
* Phone number
* Email
* SMS
* Wi-Fi
* Contact information
* Location
* WhatsApp
* Custom text

Each content type should have its own validation rules.

The QR engine should receive normalized data rather than raw UI values.

⸻

5. QR Generation Flow

The standard generation flow is:

User Input
    ↓
Input Validation
    ↓
Data Normalization
    ↓
QR Configuration
    ↓
QR Engine
    ↓
Preview
    ↓
Export / Share / Print

Generation logic must remain separate from the UI.

⸻

6. DIPO QR JavaScript Architecture

Location:

assets/js/dipo-qr/

Recommended structure:

assets/js/dipo-qr/
│
├── qr.js
├── generator.js
├── validator.js
├── formatter.js
├── presets.js
├── customization.js
├── preview.js
├── export.js
├── scanner.js
├── history.js
└── index.js

Each module must have a single clear responsibility.

⸻

7. qr.js

Main DIPO QR product controller.

Responsibilities:

* Initialize DIPO QR
* Connect UI with product modules
* Manage QR generation flow
* Coordinate validation
* Coordinate preview
* Coordinate export
* Coordinate sharing
* Coordinate recent items

Product orchestration belongs here.

The file should not contain third-party library implementation code.

⸻

8. generator.js

Responsible for generating QR codes.

Responsibilities:

* Receive normalized QR data
* Receive QR configuration
* Generate QR output
* Handle generation errors
* Return generated QR instance/output

The generator should remain independent from page-specific HTML.

⸻

9. validator.js

Responsible for validating QR input.

Validation examples:

* Empty input
* Invalid URL
* Invalid email
* Invalid phone number
* Invalid Wi-Fi data
* Invalid location data
* Unsupported content

Validation errors must be user-friendly.

Technical validation logic must remain inside the validation module.

⸻

10. formatter.js

Responsible for converting user input into QR-compatible data.

Examples:

URL
↓
https://example.com
Wi-Fi
↓
WIFI:T:WPA;S:Network;P:Password;;
Email
↓
mailto:user@example.com

Formatting must happen before QR generation.

⸻

11. presets.js

Responsible for applying predefined QR configurations.

Presets may define:

* Dot style
* Corner style
* Eye style
* Color combination
* Background
* Frame
* Margin
* Error correction
* Logo settings

Preset data should remain separate from generation logic.

⸻

12. customization.js

Responsible for custom QR appearance.

Supported customization areas may include:

* Foreground color
* Background color
* Dot style
* Corner style
* Eye style
* Margin
* Size
* Error correction
* Logo
* Frame

Customization must not modify the original preset data directly.

Use copied configuration objects when applying user changes.

⸻

13. Preview Architecture

The QR preview should update whenever relevant configuration changes.

User Change
    ↓
Validate
    ↓
Update State
    ↓
Regenerate QR
    ↓
Update Preview

Preview updates should avoid unnecessary DOM operations.

Large synchronous operations should be minimized.

⸻

14. QR Styling

DIPO QR should support a flexible styling system.

Possible visual elements:

* Square modules
* Rounded modules
* Dots
* Rounded corners
* Custom eyes
* Frames
* Labels
* Logos

Visual customization must never make the QR unreadable.

⸻

15. QR Error Correction

The QR system should support standard error correction levels.

Recommended levels:

L
M
Q
H

Higher error correction may be required when logos or visual customization cover part of the QR code.

The application should provide sensible defaults.

⸻

16. Logo Support

DIPO QR may support QR logos.

Logo handling must include:

* Image validation
* Size limits
* Transparent background support where appropriate
* Safe rendering
* Error correction consideration
* Preview validation

The logo must not cover an unsafe amount of QR data.

⸻

17. Frame System

Frames may be provided as predefined presets.

Examples:

* Simple
* Rounded
* Scan Me
* Website
* Contact
* Social
* Custom

Frame definitions should remain data-driven.

Frame content must remain separate from QR generation logic.

⸻

18. QR Presets

Preset definitions belong in:

assets/js/data/qr-presets.js

Presets should use stable IDs.

Example:

{
  id: "modern-dark",
  name: "Modern Dark",
  description: "Clean dark QR style",
  config: {}
}

IDs must remain stable after release unless a migration is provided.

⸻

19. QR State

DIPO QR should maintain minimal product state.

Example:

contentType
inputData
formattedData
preset
foregroundColor
backgroundColor
dotStyle
cornerStyle
eyeStyle
logo
frame
size
margin
errorCorrection

Only required state should be stored.

Temporary UI state should not be persisted unnecessarily.

⸻

20. Recent QR Items

Recent QR items may be stored locally.

Recommended storage key:

dipo_world_qr_recent

Recent items should not contain unnecessary sensitive information.

Users should be able to clear recent items.

Storage failures must not break QR generation.

⸻

21. QR History Rules

History should:

* Have a reasonable maximum size
* Remove oldest items when required
* Handle corrupted storage safely
* Support clearing
* Avoid sensitive information where practical

History should never be required for core QR generation.

⸻

22. Export Architecture

DIPO QR export should use the shared export architecture.

DIPO QR
   ↓
Export Module
   ↓
Generated QR
   ↓
Browser/File API
   ↓
Downloaded File

Supported formats:

PNG
SVG

Future formats may be added without rewriting the QR generator.

⸻

23. PNG Export

PNG export should provide:

* High-quality raster output
* Correct dimensions
* Correct background
* Applied customization
* Applied frame where supported
* Predictable filename

Example filename:

dipo-qr.png

Product-specific filenames may be generated from safe user-provided names.

⸻

24. SVG Export

SVG export should provide:

* Vector output
* Scalable QR graphics
* Applied QR configuration
* Correct dimensions
* Safe SVG generation

User-controlled values must not be inserted into SVG markup unsafely.

⸻

25. Print Architecture

Print functionality should provide a clean printable QR output.

Print mode should prioritize:

* QR readability
* Correct scaling
* Clear margins
* Minimal unnecessary UI
* Printer-friendly layout

The application should not require the entire application interface to be printed.

⸻

26. Share Architecture

DIPO QR should use progressive enhancement.

Web Share API
      ↓
Clipboard
      ↓
Share URL / Generated Content
      ↓
Manual Fallback

Sharing must continue to work when the Web Share API is unavailable.

⸻

27. Copy Functionality

DIPO QR may allow users to copy:

* Original content
* Formatted QR data
* QR-related text

Clipboard functionality must use the shared:

assets/js/core/clipboard.js

Do not duplicate clipboard logic inside DIPO QR.

⸻

28. Scanner Architecture

Scanner functionality should remain isolated inside:

assets/js/dipo-qr/scanner.js

Responsibilities:

* Camera permission handling
* QR detection
* Scan result handling
* Camera errors
* Permission errors
* Stop/start scanner
* Graceful fallback

Camera access must only occur after an intentional user action.

⸻

29. Scanner Privacy

Scanner functionality should follow privacy-first behavior.

Rules:

* Do not upload camera frames unnecessarily.
* Process scan data locally where practical.
* Do not store scanned content automatically.
* Clearly indicate camera usage.
* Stop camera access when scanning ends.
* Handle permission denial gracefully.

⸻

30. QR Accessibility

DIPO QR must support:

* Keyboard navigation
* Accessible labels
* Visible focus states
* Screen-reader-friendly controls
* Accessible form fields
* Accessible error messages
* Sufficient contrast
* Large touch targets

Color selection must not be the only way to communicate state.

⸻

31. QR Readability

Customization must preserve QR readability.

Before export, the system should validate important configuration constraints where practical.

Avoid combinations that create insufficient contrast.

Avoid excessive logo coverage.

Avoid styling that makes QR modules difficult to distinguish.

The QR code must remain the primary functional element.

⸻

32. Mobile UX

DIPO QR is mobile-first.

The interface should prioritize:

Content
   ↓
Generate
   ↓
Preview
   ↓
Customize
   ↓
Download / Share

Controls should be thumb-friendly.

Important actions should remain easy to reach.

⸻

33. Responsive Layout

Recommended layout behavior:

Mobile

Single-column experience.

Tablet

Flexible two-column layout where appropriate.

Desktop

Input/customization and preview may be displayed side-by-side.

The QR preview must remain visible and usable at all supported screen sizes.

⸻

34. Loading States

QR generation or scanner initialization may require loading feedback.

Examples:

Generating QR...
Preparing download...
Starting scanner...
Processing...

Loading states must not block unrelated navigation.

⸻

35. Error States

Common errors include:

* Invalid input
* QR generation failure
* Download failure
* Clipboard failure
* Share failure
* Scanner permission denied
* Scanner initialization failure
* Unsupported browser API

Messages should explain what the user can do next.

⸻

36. Empty States

Recent QR history should provide an intentional empty state.

Example:

No recent QR codes yet.
Create your first QR code to see it here.

Blank areas should not be used as empty states.

⸻

37. Third-Party QR Engine

Third-party QR libraries belong only in:

lib/

The application must access them through DIPO QR application modules.

Example:

lib/qr-code-styling/
        ↓
assets/js/dipo-qr/generator.js
        ↓
DIPO QR

Vendor code must never be mixed into application modules.

⸻

38. QR Engine Isolation

The QR engine must remain independent from:

* DIPO BIO
* Page-specific HTML
* Navigation
* Global UI components
* Analytics
* SEO

The engine should receive configuration and data and return QR output.

⸻

39. Configuration

DIPO QR feature availability should be controlled through:

config/features.js

Routes should be controlled through:

config/routes.js

Brand information should be controlled through:

config/branding.js

Do not duplicate these values inside DIPO QR modules.

⸻

40. Data Sources

DIPO QR may use:

data/
assets/js/data/

Static data should contain:

* Presets
* Categories
* Frame definitions
* Style definitions
* Default configurations

Executable business logic must remain inside JavaScript modules.

⸻

41. Security Rules

DIPO QR must:

1. Validate all user input.
2. Avoid unsafe HTML insertion.
3. Avoid unsafe SVG insertion.
4. Validate uploaded logos.
5. Avoid arbitrary code execution.
6. Never expose API secrets.
7. Avoid unnecessary data storage.
8. Safely generate filenames.
9. Handle malformed data.
10. Isolate third-party libraries.

⸻

42. Privacy Rules

DIPO QR should work locally whenever practical.

Default behavior:

* QR generation should not require sending content to a server.
* User content should not be collected unnecessarily.
* Recent items should remain local unless the user explicitly uses a future cloud feature.
* Camera data should not be uploaded unnecessarily.
* Analytics must not collect QR content.

Privacy requirements must be reviewed before adding backend functionality.

⸻

43. Performance

DIPO QR should prioritize:

* Fast initial load
* Lazy loading of scanner functionality
* Deferred third-party code where possible
* Efficient QR regeneration
* Minimal DOM updates
* Optimized preview rendering
* Small application footprint

Scanner resources should not load unnecessarily when the scanner is not being used.

⸻

44. Browser Compatibility

Primary browser targets:

* Safari
* iOS Safari
* Chrome
* Android Chrome
* Edge
* Firefox

Optional browser APIs must use progressive enhancement.

Example:

Web Share
   ↓
Clipboard
   ↓
Manual fallback

⸻

45. Offline Behavior

Where supported, basic QR generation should continue to work without network access after required application resources are available.

Offline functionality should prioritize:

1. QR generator
2. Local presets
3. Customization
4. Preview
5. Export
6. Recent items

Network-dependent features must fail gracefully.

⸻

46. Product/Core Dependency Rules

DIPO QR may use:

assets/js/core/

Examples:

* state.js
* storage.js
* clipboard.js
* download.js
* modal.js
* toast.js
* share.js
* error-handler.js
* utils.js

DIPO QR must not modify core behavior only for a product-specific requirement without evaluating impact on DIPO BIO.

⸻

47. No Duplicate Logic

Do not duplicate shared functionality.

For example:

Do not create:

dipo-qr/qr-toast.js

when:

core/toast.js

already provides the required functionality.

Shared behavior belongs in core.

QR-specific behavior belongs in DIPO QR.

⸻

48. Naming Conventions

Use lowercase kebab-case.

Correct:

qr-generator.js
qr-presets.js
scanner.js
qr-history.js

Avoid:

QRGenerator.js
QRPreset.js
QRScanner.js

JavaScript functions should use camelCase.

Examples:

generateQr()
validateQrInput()
downloadQr()
startScanner()

⸻

49. Component Integration

DIPO QR should reuse shared components where appropriate.

Examples:

components/navbar.html
components/footer.html
components/modal.html
components/toast.html
components/empty-state.html
components/error-state.html

Product-specific UI components should be created only when reusable shared components are insufficient.

⸻

50. Page Integration

DIPO QR pages should follow:

Page
 ├── Navbar
 ├── QR Input
 ├── QR Controls
 ├── QR Preview
 ├── Export Actions
 ├── Share Actions
 ├── Recent QR
 └── Footer

Pages should compose modules rather than contain business logic.

⸻

51. SEO

DIPO QR pages should provide:

* Unique title
* Meta description
* Canonical URL
* Open Graph metadata
* Descriptive headings
* Accessible links
* Structured data where appropriate

SEO text should describe the actual DIPO QR functionality.

Do not keyword-stuff the page.

⸻

52. Analytics

If analytics are enabled, DIPO QR must not send:

* QR content
* URLs entered by users
* Wi-Fi credentials
* Contact details
* Phone numbers
* Email addresses
* Scanner results

Only privacy-safe product events should be considered.

⸻

53. Testing Requirements

DIPO QR testing should cover:

Generation

* Valid URL
* Invalid URL
* Text
* Email
* Phone
* Wi-Fi
* Contact
* Location

Customization

* Colors
* Styles
* Frames
* Logos
* Error correction
* Size
* Margin

Export

* PNG
* SVG
* Print

Sharing

* Web Share
* Clipboard
* Fallback

Scanner

* Camera permission
* Valid QR
* Invalid scan
* Camera failure
* Permission denial

⸻

54. Regression Testing

Every major DIPO QR change should verify:

* QR generation
* Preview
* Customization
* Download
* Share
* Print
* Scanner
* Recent items
* Mobile layout
* Desktop layout
* Accessibility
* Console errors

Changes must not break DIPO BIO or shared core modules.

⸻

55. Release Checklist

Before releasing a DIPO QR update:

[ ] QR generation tested
[ ] Input validation tested
[ ] Presets tested
[ ] Customization tested
[ ] Logo tested
[ ] Frames tested
[ ] PNG export tested
[ ] SVG export tested
[ ] Print tested
[ ] Share tested
[ ] Copy tested
[ ] Scanner tested
[ ] Recent QR tested
[ ] Error states tested
[ ] Empty states tested
[ ] Mobile tested
[ ] Desktop tested
[ ] Accessibility tested
[ ] Performance checked
[ ] Security reviewed
[ ] Privacy reviewed
[ ] Console clean
[ ] Documentation updated

⸻

56. Future Expansion

DIPO QR may later support:

* Additional QR content types
* More presets
* More frames
* Advanced styling
* Batch QR generation
* QR history improvements
* Advanced export formats
* Additional scanner capabilities
* Cloud synchronization
* User accounts
* Advanced branding

Future functionality must be added without unnecessarily restructuring the existing QR foundation.

⸻

57. Architecture Stability Rule

Once DIPO QR core modules are used in production, they should not be casually rewritten.

Changes must consider:

DIPO QR
   +
DIPO WORLD Core
   +
Future Products

Backward compatibility should be preferred.

⸻

58. Source of Truth

DIPO QR follows these sources of truth:

QR Routes
→ config/routes.js
QR Feature Flags
→ config/features.js
Brand
→ config/branding.js
QR Presets
→ assets/js/data/qr-presets.js
Static QR Data
→ data/
QR Behavior
→ assets/js/dipo-qr/
Shared Behavior
→ assets/js/core/
Reusable UI
→ components/
Third-Party QR Engine
→ lib/
Documentation
→ docs/DIPO-QR.md

No important configuration should be duplicated across unrelated files.

⸻

59. Development Order

DIPO QR should be developed in this order:

1. QR data definitions
2. QR validator
3. QR formatter
4. QR generator
5. QR state integration
6. QR preview
7. QR presets
8. QR customization
9. Export
10. Share
11. Recent history
12. Scanner
13. Product UI
14. Accessibility
15. Testing
16. Performance optimization
17. SEO
18. Final production validation

Do not implement a dependent feature before its required foundation exists.

⸻

60. Final Product Principle

DIPO QR should remain:

Simple
    +
Fast
    +
Reliable
    +
Customizable
    +
Accessible
    +
Private
    +
Maintainable

The objective is to provide a professional QR creation experience without turning the product into an unnecessarily complex system.

Every module should have a clear responsibility.

Every shared capability should remain reusable.

Every future feature should fit into the existing architecture without breaking established functionality.

⸻

61. Product Status

Product: DIPO QR
Parent Brand: DIPO WORLD
QR Architecture: LOCKED
Generation Architecture: LOCKED
Customization Architecture: LOCKED
Export Architecture: LOCKED
Scanner Architecture: LOCKED
State Architecture: LOCKED
Data Architecture: LOCKED
Testing Direction: LOCKED
Status:
PRODUCTION PRODUCT FOUNDATION

⸻

DIPO WORLD

DIPO QR

Made With ❤️ in India

𝔄 𝔇𝔐 𝔭𝔯𝔬𝔡𝔲𝔠𝔱

All copyrights reserved

@ 𝔄 𝔇𝔐 𝔭𝔯𝔬𝔡𝔲𝔠𝔱