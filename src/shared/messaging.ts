import type { ApplyCssResponse, BackgroundRequest } from "./types.js";

// Sends a typed request from the popup to the background service worker.
export async function sendBackgroundRequest(
  request: BackgroundRequest
): Promise<ApplyCssResponse> {
  return (await chrome.runtime.sendMessage(request)) as ApplyCssResponse;
}
