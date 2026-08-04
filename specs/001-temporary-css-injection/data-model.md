# Data Model: Temporary CSS Injection

## Entities

### CSS Draft
- **Purpose**: Represents the CSS text the user enters in the popup before confirmation.
- **Fields**:
  - `content`: the entered stylesheet text.
  - `validationState`: whether the current input is empty, valid, or invalid.
- **Rules**:
  - Must be non-empty before submission is allowed.
  - Must be valid before submission is allowed.

### Temporary Injection Session
- **Purpose**: Represents one temporary application of CSS to the active tab.
- **Fields**:
  - `targetTab`: the active tab receiving the styles.
  - `appliedStyles`: the CSS associated with the current temporary state.
  - `lifetime`: temporary only.
- **Rules**:
  - Exists only for the current browsing context.
  - Must end on refresh, navigation, tab close, or browser restart.

### Active Tab Target
- **Purpose**: Represents the currently focused browser tab at the moment of confirmation.
- **Fields**:
  - `tabState`: current active browser tab context.
  - `eligibility`: whether the page can receive the temporary style action.
- **Rules**:
  - The active tab at confirmation time is the only intended target.
  - If the tab cannot accept the action, the page must remain usable and the user must be informed.

## Relationships

- A CSS Draft may become a Temporary Injection Session when the user confirms a valid submission.
- A Temporary Injection Session is bound to exactly one Active Tab Target at a time.
- Temporary Injection Sessions do not persist beyond the current tab context.

## Validation Rules

- Empty drafts are not eligible for submission.
- Invalid drafts are not eligible for submission.
- Temporary state must not survive page reload or navigation.
- Temporary state must not survive tab closure or browser restart.
