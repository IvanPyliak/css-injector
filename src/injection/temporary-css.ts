import type { ApplyCssResponse } from "../shared/types.js";

// Injected styles live only in the page's current document, so they
// disappear on their own on refresh, navigation, tab close, or browser
// restart (FR-005 - FR-008). Replacing a prior apply requires removing the
// old stylesheet first, since insertCSS calls are additive (FR-012).
export async function applyTemporaryCss(
  tabId: number,
  css: string,
  previousCss: string | undefined
): Promise<ApplyCssResponse> {
  if (previousCss) {
    try {
      await chrome.scripting.removeCSS({ target: { tabId }, css: previousCss });
    } catch {
      // The previous stylesheet may already be gone (e.g. the page
      // navigated); that is not a failure for the new apply attempt.
    }
  }

  try {
    await chrome.scripting.insertCSS({ target: { tabId }, css });
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}
