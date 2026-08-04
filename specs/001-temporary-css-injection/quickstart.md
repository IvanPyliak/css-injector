# Quickstart: Temporary CSS Injection

## Prerequisites

- Chrome or another Chromium-based browser that supports Manifest V3 extensions.
- A local build of the extension source once implementation exists.
- Node.js LTS for dependency installation and build scripts.

## Setup

1. Install dependencies.
2. Build the extension.
3. Load the unpacked extension into Chromium.

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

## Expected Outcomes

- The popup presents exactly the minimal input flow defined by the spec.
- Valid CSS is applied immediately to the active tab.
- Temporary styling does not survive page refresh, navigation, tab close, or browser restart.
- The user cannot submit empty or invalid CSS.
