// Shared types for popup <-> background communication and CSS draft state.

export type CssValidationState = "empty" | "valid" | "invalid";

export interface CssDraft {
  content: string;
  validationState: CssValidationState;
}

export interface ApplyCssRequest {
  type: "apply-css";
  tabId: number;
  css: string;
}

export type BackgroundRequest = ApplyCssRequest;

export interface ApplyCssResponse {
  ok: boolean;
  error?: string;
}
