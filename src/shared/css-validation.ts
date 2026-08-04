import type { CssValidationState } from "./types.js";

// Uses the browser's own CSS parser (CSSStyleSheet) instead of a hand-rolled
// one, per FR-010: submission must stay blocked until input is non-empty
// and valid.
export function validateCss(input: string): CssValidationState {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    return "empty";
  }

  try {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(trimmed);
    // The parser drops unparseable rules instead of throwing, so a
    // non-empty input that produced zero rules is treated as invalid.
    return sheet.cssRules.length > 0 ? "valid" : "invalid";
  } catch {
    return "invalid";
  }
}
