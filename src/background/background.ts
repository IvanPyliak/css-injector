import type { ApplyCssResponse, BackgroundRequest } from "../shared/types.js";
import { applyTemporaryCss, removeTemporaryCss } from "../injection/temporary-css.js";

// In-memory only: wiped on browser restart and cleared per-tab below, which
// is what keeps injected CSS temporary (FR-008).
const lastAppliedCssByTab = new Map<number, string>();

chrome.runtime.onMessage.addListener((message: BackgroundRequest, _sender, sendResponse) => {
  if (message.type === "apply-css") {
    const previousCss = lastAppliedCssByTab.get(message.tabId);

    applyTemporaryCss(message.tabId, message.css, previousCss).then((result: ApplyCssResponse) => {
      if (result.ok) {
        lastAppliedCssByTab.set(message.tabId, message.css);
      }
      sendResponse(result);
    });

    return true; // keep the message channel open for the async response
  }

  if (message.type === "reset-css") {
    const previousCss = lastAppliedCssByTab.get(message.tabId);

    removeTemporaryCss(message.tabId, previousCss).then((result: ApplyCssResponse) => {
      if (result.ok) {
        lastAppliedCssByTab.delete(message.tabId);
      }
      sendResponse(result);
    });

    return true;
  }

  return false;
});

chrome.tabs.onRemoved.addListener((tabId) => {
  lastAppliedCssByTab.delete(tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  // A new navigation/refresh drops any previously injected styles, so stop
  // tracking them here too (FR-005, FR-006).
  if (changeInfo.status === "loading") {
    lastAppliedCssByTab.delete(tabId);
  }
});
