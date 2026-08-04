# Quickstart: Temporary CSS Injection

## Prerequisites

- Chrome or another Chromium-based browser that supports Manifest V3 extensions.
- Node.js LTS for dependency installation and build scripts.

## Setup

1. Install dependencies: `npm install`
2. Build the extension: `npm run build` (compiles TypeScript and copies static assets into `dist/`)
3. Load the unpacked extension: open `chrome://extensions`, enable Developer mode, click "Load unpacked", and select the `dist/` folder.

## Validation Scenarios

### Scenario 1: Apply temporary CSS to the active tab
1. Open a page in the browser.
2. Open the extension popup.
3. Enter valid CSS in the textarea.
4. Click OK.
5. Confirm the page updates immediately.

### Scenario 2: Temporary state disappears on reset
1. Apply CSS using Scenario 1.
2. Refresh the page, navigate away and back, close the tab, or restart the browser.
3. Confirm the styling is gone.

### Scenario 3: Empty or invalid CSS cannot be submitted
1. Open the popup.
2. Leave the textarea empty or enter invalid CSS.
3. Confirm the submission remains blocked and the page stays unchanged.

### Scenario 4: Draft CSS text survives popup close
1. Open the popup and type CSS into the textarea without clicking OK.
2. Close the popup, then reopen it.
3. Confirm the previously typed CSS text is still present in the textarea.
4. Restart the browser and confirm the draft text is cleared.

### Scenario 5: Reset removes styles from the page and the textarea
1. Apply CSS using Scenario 1.
2. Click Reset.
3. Confirm the page's injected styles are removed immediately and the textarea is cleared.

## Expected Outcomes

- The popup presents exactly the minimal input flow defined by the spec.
- Valid CSS is applied immediately to the active tab.
- Temporary styling does not survive page refresh, navigation, tab close, or browser restart.
- The user cannot submit empty or invalid CSS.
- Unsent draft CSS text in the textarea survives closing and reopening the popup within the same browser session, but not a browser restart.
- Clicking Reset removes injected styles from the active tab and clears the textarea and its saved draft.
