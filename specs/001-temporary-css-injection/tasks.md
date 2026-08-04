# Tasks: Temporary CSS Injection

**Input**: Design documents from `/specs/001-temporary-css-injection/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and delivery of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic extension structure

- [X] T001 Create the base extension project structure and source folders in `manifest.json`, `src/popup/`, `src/background/`, `src/injection/`, `src/shared/`, `tests/unit/`, and `tests/integration/`
- [X] T002 Initialize the TypeScript project scaffolding and build scripts in `package.json` and `tsconfig.json`
- [X] T003 [P] Add the initial extension manifest and entry-point wiring in `manifest.json` and `src/shared/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core shared behavior that all user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Define shared feature types for CSS drafts, validation state, and injection state in `src/shared/types.ts`
- [X] T005 [P] Implement shared CSS validation and normalization helpers in `src/shared/css-validation.ts`
- [X] T006 [P] Implement shared message or state utilities for popup-to-background coordination in `src/shared/messaging.ts`
- [X] T007 Establish the temporary injection lifecycle model used by all stories in `src/injection/temporary-css.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Apply CSS to the current tab (Priority: P1) 🎯 MVP

**Goal**: Let the user enter CSS in the popup and apply it immediately to the currently active tab.

**Independent Test**: Open the popup, enter valid CSS, click OK, and confirm the active page reflects the new styles immediately.

### Implementation for User Story 1

- [X] T008 [US1] Build the popup CSS entry view with textarea and OK control in `src/popup/popup.ts` and `src/popup/popup.html`
- [X] T009 [US1] Connect popup submission to the active-tab style application flow in `src/popup/popup.ts` and `src/background/background.ts`
- [X] T010 [US1] Implement the active-tab style application behavior in `src/injection/temporary-css.ts`
- [X] T011 [US1] Wire the popup to block submission until CSS is non-empty and valid in `src/popup/popup.ts`

**Checkpoint**: User Story 1 should be fully functional and independently demonstrable.

---

## Phase 4: User Story 2 - Reversible temporary styling (Priority: P1)

**Goal**: Ensure the injected styles disappear when the page context changes or the browser session ends.

**Independent Test**: Apply CSS, then refresh, navigate away and back, close the tab, or restart the browser, and confirm the styling is gone.

### Implementation for User Story 2

- [X] T012 [US2] Implement temporary style removal behavior for page refresh and navigation in `src/injection/temporary-css.ts`
- [X] T013 [US2] Implement tab-close and browser-restart reset handling in `src/background/background.ts`
- [X] T014 [US2] Ensure the active page remains usable after style reset or failed restoration in `src/injection/temporary-css.ts`

**Checkpoint**: User Stories 1 and 2 should now both work independently.

---

## Phase 5: User Story 3 - Simple popup interaction (Priority: P2)

**Goal**: Provide a minimal popup interface that is easy to understand and use without setup.

**Independent Test**: Open the popup and verify it contains only the multiline textarea and the OK button required for the feature flow.

### Implementation for User Story 3

- [X] T015 [US3] Refine the popup layout and minimal interaction states in `src/popup/popup.html` and `src/popup/popup.ts`
- [X] T016 [US3] Add user-facing feedback for blocked submission or failed application in `src/popup/popup.ts`
- [X] T017 [US3] Keep the popup flow focused and free of extra configuration or persistence controls in `src/popup/popup.html`

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T018 [P] Update feature documentation and usage notes in `specs/001-temporary-css-injection/quickstart.md`
- [X] T019 [P] Review source files for readability, naming consistency, and duplicate logic in `src/shared/`, `src/popup/`, and `src/injection/`
- [X] T020 Validate the feature against the scenarios in `specs/001-temporary-css-injection/spec.md` and `specs/001-temporary-css-injection/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in priority order or in parallel once their shared prerequisites are complete
- **Polish (Final Phase)**: Depends on the desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Builds on the same shared foundation and should remain independently demonstrable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Focuses on the popup experience and should remain independently usable

### Within Each User Story

- Shared foundation before story-specific implementation
- User Story 1 before the broader temporary-behavior polish, because it establishes the primary apply flow
- User Story 2 before final cleanup, because temporary behavior is part of the feature definition
- User Story 3 can be completed after the core interaction exists without changing the primary user flow

### Parallel Opportunities

- Setup tasks marked [P] can run in parallel where they touch different files
- Foundational tasks marked [P] can run in parallel where they touch different files
- Once Foundation is complete, User Story 1, User Story 2, and User Story 3 can be worked on independently
- Polish tasks marked [P] can run in parallel

---

## Parallel Example: User Story 1

```text
Task: T008 Build the popup CSS entry view with textarea and OK control in src/popup/popup.ts and src/popup/popup.html
Task: T010 Implement the active-tab style application behavior in src/injection/temporary-css.ts
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Stop and validate the apply flow independently

### Incremental Delivery

1. Complete Setup + Foundational
2. Deliver User Story 1 as the MVP
3. Add User Story 2 for temporary-only behavior
4. Add User Story 3 for minimal popup usability refinement
5. Finish with polish and documentation

### Parallel Team Strategy

1. Complete Setup and Foundational work first
2. Split User Story 1, User Story 2, and User Story 3 across contributors after the foundation is in place
3. Merge only when each story remains independently usable

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] labels map tasks to specific user stories for traceability
- Each user story should remain independently completable and testable
- Avoid vague tasks, same-file conflicts, and cross-story dependencies that break independence
