<!--
Sync Impact Report
Version change: unversioned template -> 1.0.0

Modified principles:
- Lightweight by Default
- Security First
- TypeScript and Readability
- Modular Features, Small Surface Area
- Browser Performance and Testability

Added sections:
- Project Structure and Conventions
- Browser Extension Standards
- Feature Development, Testing, and Documentation
- Governance

Removed sections:
- None

Deferred items:
- None
-->

# css-injector Constitution

## Core Principles

### Lightweight by Default

css-injector MUST remain lightweight in scope, runtime cost, and bundle size. Every dependency,
asset, abstraction, or new feature MUST justify its existence by providing clear value.
The simplest solution that satisfies the requirements SHOULD always be preferred over a more
generic or extensible implementation.

---

### Security First

Security takes priority over convenience.

The project MUST follow the principle of least privilege.

Browser permissions MUST be kept to the absolute minimum required by implemented features.
New permissions MUST be explicitly justified in documentation and reviewed carefully before
being introduced.

Unsafe browser APIs, arbitrary code execution, or behavior that expands the attack surface
MUST NOT be introduced without a compelling technical reason.

User data MUST never be collected, transmitted, or persisted unless explicitly required by a
feature specification.

---

### TypeScript and Readability

TypeScript is the default language for application code.

Code MUST prioritize readability over cleverness.

Contributors unfamiliar with the repository SHOULD be able to understand a feature by reading
only its local implementation.

Small functions, descriptive names, explicit control flow, and predictable behavior are
preferred over complex abstractions.

AI-generated code MUST meet the same quality standards as manually written code.

---

### Modular Features, Small Surface Area

Features SHOULD remain independent and composable.

Modules MUST have clear responsibilities and minimal coupling.

Shared utilities SHOULD only be introduced after multiple real use cases justify their
existence.

The repository MUST avoid building frameworks for hypothetical future requirements.

---

### Browser Performance and Testability

Browser performance is a first-class concern.

Features MUST avoid unnecessary DOM operations, observers, timers, listeners, or global state.

Implementations SHOULD perform work only when necessary.

Every feature MUST be independently testable using focused unit or integration tests.

Performance regressions SHOULD be treated as defects.

---

## Project Structure and Conventions

The repository MUST remain easy to navigate.

Source code, tests, documentation, assets, and tooling SHOULD be organized by purpose.

Naming conventions MUST be descriptive, consistent, and stable.

Folders SHOULD represent features rather than implementation details.

Comments SHOULD explain intent, assumptions, or non-obvious constraints rather than describing
what the code already expresses.

---

## Browser Extension Standards

This project targets **Chrome Manifest V3**.

Manifest V2 APIs MUST NOT be introduced.

Official browser APIs SHOULD always be preferred over third-party libraries when they provide
equivalent functionality.

Extension permissions, content scripts, service workers, and injected resources MUST follow
Chrome Extension best practices.

The primary target platform is Chromium-based browsers.

Cross-browser compatibility MAY be introduced only when it does not significantly increase
complexity or maintenance cost.

---

## Dependencies

Every dependency increases maintenance cost.

Before adding a dependency, contributors MUST demonstrate that:

- native browser APIs are insufficient;
- the dependency provides significant long-term value;
- maintenance and bundle-size impact are acceptable.

Removing unnecessary dependencies SHOULD always be preferred over adding new ones.

---

## Feature Development, Testing, and Documentation

Each feature MUST have:

- a clear purpose;
- a defined scope;
- an implementation plan;
- a verification strategy.

Features SHOULD be implemented independently whenever practical.

Every change MUST include an appropriate level of testing.

Documentation MUST remain synchronized with user-facing behavior, setup instructions,
architecture decisions, and notable limitations.

Pull requests MUST explain:

- what changed;
- why it changed;
- how it was tested;
- any known limitations or follow-up work.

---

## Governance

This constitution governs repository-wide engineering decisions.

When this constitution conflicts with existing practices, the constitution takes precedence.

Changes to this constitution require:

- an explicit rationale;
- semantic versioning of the constitution;
- updates to amendment metadata.

Versioning follows Semantic Versioning:

- MAJOR — incompatible governance changes;
- MINOR — new principles or significant expansions;
- PATCH — wording improvements and clarifications.

Every pull request SHOULD be reviewed for compliance with this constitution before merge.

Any intentional deviation MUST be documented and treated as temporary.

---

**Version:** 1.0.0  
**Ratified:** 2026-08-04  
**Last Amended:** 2026-08-04