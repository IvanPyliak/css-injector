# CSS Injector

A minimal Manifest V3 browser extension for temporarily injecting custom CSS into the active browser tab.

## Features

- Enter CSS in the popup and apply it immediately to the current page.
- Injected styles are temporary: they do not survive page refresh, navigation, tab close, or browser restart.
- A Reset button removes the injected styles from the page and clears the popup textarea.
- Unsent draft CSS text is kept while the popup is closed and reopened (cleared on browser restart).
- Submission is blocked until the entered CSS is non-empty and valid.

## Prerequisites

- Chrome or another Chromium-based browser that supports Manifest V3 extensions.
- Node.js LTS for dependency installation and build scripts.

## Setup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Build the extension:

   ```sh
   npm run build
   ```

   This compiles the TypeScript sources and copies static assets into `dist/`.

3. Load the unpacked extension:
   - Open `chrome://extensions`.
   - Enable Developer mode.
   - Click "Load unpacked" and select the `dist/` folder.

## Usage

1. Open a page in the browser.
2. Click the extension icon to open the popup.
3. Enter CSS in the textarea.
4. Click **OK** to apply the styles to the current tab immediately.
5. Click **Reset** to remove the injected styles and clear the textarea.

## Development

- `npm run build` — compile TypeScript and copy static assets into `dist/`.
- `npm run watch` — recompile TypeScript on change.

## Project Structure

```
manifest.json           Extension manifest
src/
  background/            Background service worker (applies/removes CSS via chrome.scripting)
  injection/             Temporary CSS injection/removal logic
  popup/                 Popup UI (textarea, OK, and Reset controls)
  shared/                 Shared types, messaging, and CSS validation helpers
specs/                   Spec Kit feature documentation
```

## Documentation

See [specs/001-temporary-css-injection](specs/001-temporary-css-injection/spec.md) for the full feature specification, and [quickstart.md](specs/001-temporary-css-injection/quickstart.md) for validation scenarios.
