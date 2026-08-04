import { validateCss } from "../shared/css-validation.js";
import { sendBackgroundRequest } from "../shared/messaging.js";
import type { CssDraft } from "../shared/types.js";

const textarea = document.querySelector<HTMLTextAreaElement>("#css-input")!;
const applyButton = document.querySelector<HTMLButtonElement>("#apply-button")!;
const resetButton = document.querySelector<HTMLButtonElement>("#reset-button")!;
const statusMessage = document.querySelector<HTMLParagraphElement>("#status-message")!;

// Popups are destroyed on close, so the draft is kept in session storage
// (cleared on browser restart) rather than the popup's own DOM state.
const DRAFT_STORAGE_KEY = "cssDraft";

function saveDraft(): void {
  const draft: CssDraft = { content: textarea.value, validationState: validateCss(textarea.value) };
  void chrome.storage.session.set({ [DRAFT_STORAGE_KEY]: draft });
}

async function restoreDraft(): Promise<void> {
  const stored = await chrome.storage.session.get(DRAFT_STORAGE_KEY);
  const draft = stored[DRAFT_STORAGE_KEY] as CssDraft | undefined;
  if (draft?.content) {
    textarea.value = draft.content;
  }
  updateValidationState();
}

function updateValidationState(): void {
  const state = validateCss(textarea.value);
  applyButton.disabled = state !== "valid";

  if (state === "empty") {
    statusMessage.textContent = "Enter CSS to apply.";
  } else if (state === "invalid") {
    statusMessage.textContent = "CSS could not be parsed.";
  } else {
    statusMessage.textContent = "";
  }
}

async function applyCss(): Promise<void> {
  if (validateCss(textarea.value) !== "valid") {
    return;
  }

  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!activeTab?.id) {
    statusMessage.textContent = "No active tab available.";
    return;
  }

  applyButton.disabled = true;
  const response = await sendBackgroundRequest({
    type: "apply-css",
    tabId: activeTab.id,
    css: textarea.value,
  });

  statusMessage.textContent = response?.ok
    ? "Applied."
    : response?.error ?? "Could not apply CSS to this page.";
  applyButton.disabled = false;
}

async function resetCss(): Promise<void> {
  textarea.value = "";
  void chrome.storage.session.remove(DRAFT_STORAGE_KEY);
  updateValidationState();

  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!activeTab?.id) {
    statusMessage.textContent = "No active tab available.";
    return;
  }

  resetButton.disabled = true;
  const response = await sendBackgroundRequest({ type: "reset-css", tabId: activeTab.id });
  statusMessage.textContent = response?.ok
    ? "Styles removed."
    : response?.error ?? "Could not remove styles from this page.";
  resetButton.disabled = false;
}

textarea.addEventListener("input", () => {
  updateValidationState();
  saveDraft();
});
applyButton.addEventListener("click", () => {
  void applyCss();
});
resetButton.addEventListener("click", () => {
  void resetCss();
});

void restoreDraft();
