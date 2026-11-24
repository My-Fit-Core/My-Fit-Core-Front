# MAPIKO Agent Development Rules

## 1. Project Overview and Scope

MAPIKO is an AI-powered fashion styling and digital wardrobe service. This repository contains its mobile-first React web frontend.

### Project references

- GitHub: https://github.com/My-Fit-Core/My-Fit-Core-Front
- Notion shared development rules: https://app.notion.com/p/422ff3436dff801d899bf4dabdff399a
- Figma: https://www.figma.com/design/XhhPLJSwkdCMAJgzqFLELf/마피코?node-id=2-6&p=f&m=draw

### Schedule

- 2026-11-24 to 2026-12-02: complete pages and primary interactions.
- 2026-12-03 to 2026-12-10: integrate backend APIs and AI features.
- Before the final presentation: run full integration tests and physical mobile-device tests.

Use mock data for pages and interactions until APIs are available. Clearly distinguish mock implementations from actual API integrations.

## 2. Tech Stack

- React
- TypeScript (strict mode)
- Vite
- React Router
- Tailwind CSS v4
- ESLint (flat config)
- Prettier
- npm

Use `package.json` and `package-lock.json` as the source of truth for dependency versions. Preserve the existing project structure and lockfile.

Mobile app packaging is subject to the team's final decision. Evaluate Capacitor first; do not install or implement an unapproved mobile framework.

## 3. Figma Design References

### Figma project

- File key: `XhhPLJSwkdCMAJgzqFLELf`
- Project: https://www.figma.com/design/XhhPLJSwkdCMAJgzqFLELf/마피코?node-id=2-6&p=f&m=draw

| Figma page (original name)       | Node ID | Purpose                                             |
| -------------------------------- | ------- | --------------------------------------------------- |
| 디자인 시스템 (Design System)    | `2:4`   | Design tokens and shared component specifications   |
| 와이어프레임 ~11/18 (Wireframes) | `2:5`   | Initial screen structure and user flows             |
| 디자인 ~11/5 (Final Designs)     | `2:6`   | Final UI and page-specific component specifications |

### 3.1. Design System

- URL: https://www.figma.com/design/XhhPLJSwkdCMAJgzqFLELf/마피코?node-id=2-4
- Node ID: `2:4`

This page defines project-wide design tokens and shared components. Refer to it for colors, typography, spacing, icons, component states, and variants. The other frontend developer owns the components and design tokens defined on this page.

### 3.2. Wireframes (~11/18)

- URL: https://www.figma.com/design/XhhPLJSwkdCMAJgzqFLELf/마피코?node-id=2-5
- Node ID: `2:5`

Use these early wireframes only as supplemental references for screen structure, service features, and user flows. They are not final UI designs and must not be used as the visual implementation standard.

### 3.3. Final Designs (~11/5)

- URL: https://www.figma.com/design/XhhPLJSwkdCMAJgzqFLELf/마피코?node-id=2-6
- Node ID: `2:6`

This page is the source of truth for production UI and page-specific components originating there. If wireframes and final designs differ, follow the final designs for visual implementation. If the requirements specification conflicts with the final design functionally, ask the user instead of making assumptions.

## 4. Design and Component Ownership

Two frontend developers collaborate on this project. Distinguish ownership of Figma source components from ownership of service pages.

### 4.1. Ownership matrix

| Area                                                   | Owner                    |
| ------------------------------------------------------ | ------------------------ |
| Splash pages                                           | User                     |
| Login pages                                            | User                     |
| Digital wardrobe pages                                 | User                     |
| My Page/account pages                                  | User                     |
| Onboarding pages                                       | Other frontend developer |
| Components originating on Design System (`2:4`)        | Other frontend developer |
| Design System tokens                                   | Other frontend developer |
| Source components originating on Final Designs (`2:6`) | User                     |

For pages not listed here, verify ownership against the current issue and team agreements.

### 4.2. Design System and shared components

The other frontend developer implements components and tokens originating on Design System (`2:4`). Their primary areas include:

- `src/components/common/`
- Shared layouts in `src/components/layout/`
- `src/styles/tokens.css`
- Other agreed Design System files

Examples: Button, Input, Modal, Chip, AppBar, BottomNavigation, Typography, and other shared components defined in Figma. This list is illustrative; verify actual scope in the Design System page.

The assigned owner defines props, variants, state-specific styles, and tokens. Do not independently implement or modify shared components or tokens without explicit user direction or team agreement.

### 4.3. Page-specific components

The user owns source Components and Component Sets originating on Final Designs (`2:6`). Reuse existing shared React components for Design System instances instead of duplicating them.

Component ownership and page ownership are separate. For example, if onboarding uses a source component defined on Final Designs, the user implements that component, while the other developer implements the onboarding page. Ownership of source components on `2:6` does not authorize implementing every service page. Limit page work to the user's assigned areas and the current issue.

### 4.4. User-owned service areas

#### Splash

- Initial splash screen on app launch.
- MAPIKO logo and related design.
- Initial loading state.
- Initial navigation based on login and authentication status.
- Splash interactions defined in Figma.

Distinguish the React splash page from the native OS splash screen. Implement the native splash screen only after mobile packaging technology is finalized.

#### Login

- Main login screen and Figma-defined login buttons/UI.
- Login request and response states.
- Success, failure, cancellation, and error handling.
- Navigation based on authentication state.
- Confirmed social login method (Kakao Login) and authentication API integration.

Before API integration, mock authentication may be used for UI and interaction development. Do not report authentication as complete until real authentication is implemented. Coordinate navigation from login to onboarding with the other developer; do not implement onboarding itself.

#### My Page

- Main My Page screen.
- View and edit user profiles.
- Manage style preferences/aesthetic goals (추구미).
- Liked outfits.
- User's own posts.
- Notification settings.
- Account settings.
- Logout and account deletion.

#### Digital wardrobe

- Main wardrobe screen.
- Clothing list and category filtering.
- Clothing image registration.
- Camera capture and gallery selection.
- Image preview.
- AI image analysis.
- Review clothing detection results.
- Edit and save detected clothing information.
- View clothing details.
- Edit and delete clothing information.

Verify detailed features and screen scope against the requirements specification, final Figma designs, and current issue.

### 4.5. Areas outside the user's ownership

Onboarding belongs to the other frontend developer. Do not independently implement the entire onboarding page, change its business logic or interactions, or modify other developers' pages and features.

A user-owned Figma source component used in onboarding may be implemented within the assigned task scope. Coordinate routing, authentication state, and data transfer between login and onboarding with the responsible developer.

### 4.6. Primary working directories

Implement user-owned pages and domain-specific components primarily in:

- `src/components/splash/`
- `src/components/login/`
- `src/components/closet/`
- `src/components/mypage/`
- `src/pages/splash/`
- `src/pages/login/`
- `src/pages/closet/`
- `src/pages/mypage/`

Create missing directories only when needed. Add relevant files under `hooks`, `types`, `mocks`, `apis`, `utils`, or `constants` as necessary. If instructed to implement a page-specific component used in another domain, use that domain's appropriate directory.

Do not classify every Figma Component or Component Set as shared UI. Components specific to a page or domain belong in that domain's component directory.

## 5. Figma Analysis and UI Implementation

1. Implement production screens using Final Designs (`2:6`).
2. Refer to Design System (`2:4`) for shared components and tokens.
3. Use Wireframes (`2:5`) only for structure and user flows.
4. Verify the exact target Frame or Component node ID before implementation. Do not confuse page IDs with individual screen IDs.
5. If Figma MCP is available, inspect the actual:
   - Frame and component hierarchy
   - Layout and Auto Layout
   - Width and height
   - Padding and gaps
   - Colors and design tokens
   - Typography
   - Border radius
   - Component variants and states
   - Icons and image assets
   - Navigation and interactions
6. Distinguish Design System source Components from their Instances on the final design page.
7. Reuse existing shared React components for sources defined in Design System.
8. Implement components originating on Final Designs in appropriate domain directories.
9. Do not arbitrarily change or reinterpret finalized layouts, styles, or interactions.
10. Never claim to have analyzed inaccessible or uninspected Figma designs.
11. Ask the user when design information or ownership is unclear.
12. Prefer Figma-provided images and icons; do not substitute arbitrary assets or emoji.
13. Use Figma frame dimensions as references while ensuring functionality across actual mobile screen sizes.

## 6. Shared Component Reuse

Before implementing a page or domain component, check:

- Existing shared components, props, and usage.
- Shared design tokens.
- Figma source component/instance relationships.
- Related component implementation status.
- Current issue and prerequisite work.

Reuse existing shared components first. Do not reimplement Button, Input, Modal, Chip, AppBar, BottomNavigation, Typography, or similar shared UI on each page.

If a shared component is not yet available, document the dependency and prioritize independent work:

- Page structure and routing.
- TypeScript types and mock data.
- State management and business logic.
- Page-specific components.
- API integration preparation.

Clearly distinguish temporary UI from real shared components and identify what must be replaced later. Do not arbitrarily modify shared props, variants, or tokens. If a shared component needs changes, explain the reason and affected areas, then obtain confirmation from the user or responsible developer.

## 7. Project Directory Structure

Preserve the existing structure. The following target structure extends it with splash and login directories. Create missing directories only when needed.

```text
src/
├── assets/
│   ├── fonts/
│   ├── icons/
│   └── images/
├── components/
│   ├── common/
│   ├── layout/
│   ├── splash/
│   ├── login/
│   ├── onboarding/
│   ├── home/
│   ├── closet/
│   ├── calendar/
│   ├── feed/
│   └── mypage/
├── pages/
│   ├── splash/
│   ├── login/
│   ├── onboarding/
│   ├── home/
│   ├── closet/
│   ├── calendar/
│   ├── feed/
│   └── mypage/
├── apis/
├── hooks/
├── types/
├── constants/
├── mocks/
├── utils/
├── styles/
├── routes/
├── App.tsx
└── main.tsx
```

| Directory              | Purpose                                       |
| ---------------------- | --------------------------------------------- |
| `assets/`              | Static images, icons, fonts, and other assets |
| `components/common/`   | Project-wide shared UI                        |
| `components/layout/`   | Shared screen layouts                         |
| `components/{domain}/` | Domain- or page-specific components           |
| `pages/`               | Routable pages                                |
| `apis/`                | Server API requests                           |
| `hooks/`               | Reusable React hooks                          |
| `types/`               | TypeScript types and interfaces               |
| `constants/`           | Constants and fixed configuration             |
| `mocks/`               | Development and test mock data                |
| `utils/`               | Shared utility functions                      |
| `styles/`              | Global styles and design tokens               |
| `routes/`              | Route definitions                             |

Do not introduce a new architecture that disregards the existing structure. Avoid unnecessary file splitting, excessive abstraction, and complex directory hierarchies.

## 8. Tailwind CSS and Styling

Tailwind CSS v4 is the default styling approach. Verify that its setup exists on the working branch. If it has not been merged, do not introduce an alternative styling system independently.

### Styling principles

- Prefer Tailwind utility classes.
- Do not use CSS Modules as the default approach.
- Reuse existing design tokens.
- Do not repeatedly hardcode identical style values.
- Follow Figma colors, typography, spacing, and border radii.
- Avoid unnecessary inline styles.
- Use CSS where Tailwind is insufficient, limited to the necessary scope.
- Use mobile-first layouts.

### Global styles

- `src/styles/global.css`: Tailwind entry point and global styles.
- `src/styles/tokens.css`: Design System tokens.

Follow the token approach finalized by the shared component owner. Prefer considering Tailwind CSS v4 `@theme` and CSS-variable-based token management. Do not introduce unapproved tokens or change existing values arbitrarily.

## 9. React and TypeScript Conventions

Keep TypeScript strict mode enabled.

### Naming

| Item                    | Convention                  | Example             |
| ----------------------- | --------------------------- | ------------------- |
| Components              | PascalCase                  | `ClothingCard`      |
| Pages                   | PascalCase                  | `ClosetPage`        |
| Variables               | camelCase                   | `userName`          |
| Functions               | camelCase                   | `getClothingItems`  |
| Arrays                  | Plural                      | `clothingItems`     |
| Booleans                | `is`, `has`, `can` prefixes | `isLoading`         |
| Constants               | UPPER_SNAKE_CASE            | `MAX_UPLOAD_COUNT`  |
| Types/interfaces        | PascalCase                  | `ClothingItem`      |
| Props types             | PascalCase + Props          | `ClothingCardProps` |
| Internal event handlers | `handle` prefix             | `handleClick`       |
| Event props             | `on` prefix                 | `onClick`           |
| Custom hooks            | `use` prefix                | `useClothingUpload` |

### Coding rules

- Prefer `function` declarations for ordinary React components.
- Define explicit types for component props and API data.
- Avoid unnecessary `any`, indiscriminate type assertions, and non-null assertions.
- Follow the Rules of Hooks.
- Keep state scoped as narrowly as practical.
- Do not add a global state management library without approval.
- Separate UI rendering from complex business logic where appropriate.
- Avoid unnecessary duplication, premature optimization, and excessive abstraction.

### Imports

`@/` maps to `src/`. Use path aliases as appropriate. Default import order:

1. External libraries.
2. Internal modules via `@/`.
3. Relative modules.
4. Style files.

Avoid circular dependencies.

### Formatting

Follow existing `.prettierrc` and ESLint settings:

- Indentation: 2 spaces.
- Semicolons: enabled.
- JavaScript/TypeScript strings: single quotes.
- JSX attributes: double quotes.
- Trailing commas: all.
- Print width: 100.
- End of line: LF.

Do not change project settings to impose personal coding preferences.

## 10. Routing

Use React Router.

### Base routes

| Path          | Page                      |
| ------------- | ------------------------- |
| `/`           | Initial entry and routing |
| `/splash`     | Splash (planned route)    |
| `/login`      | Login                     |
| `/onboarding` | Onboarding                |
| `/home`       | Home                      |
| `/closet`     | Digital wardrobe          |
| `/calendar`   | Style mix and calendar    |
| `/feed`       | Social feed               |
| `/mypage`     | My Page                   |

Inspect existing routes before adding subroutes. Base detailed routes on actual Figma screens and user flows. Do not independently modify or delete another owner's routes. Check existing implementations and team agreements before adding shared layouts or authentication-based routing.

### Initial entry and authentication flow

Consider this baseline design, subject to the requirements specification and finalized authentication policy:

```text
App launch
  ↓
Splash
  ↓
Check authentication
  ├── Unauthenticated → Login
  │                      ↓
  │                   Login success
  │                      ↓
  └── Authenticated ──→ Check onboarding completion
                          ├── Incomplete → Onboarding
                          └── Complete   → Home
```

- The user owns splash and login; the other frontend developer owns onboarding.
- Coordinate post-login navigation conditions with the other frontend developer and backend developer.
- Do not independently finalize authentication checks, token management, or new-user identification.
- Before API integration, use mock authentication to test navigation if needed.
- Keep mock authentication separate so it cannot bypass production authentication.
- Follow the finalized authentication policy for protected routes and post-logout navigation.
- Prevent redirect loops and unnecessary screen flicker.

## 11. APIs and Mock Data

Actual API and AI integration is scheduled for 2026-12-03 to 2026-12-10. Before integration, use mock data for pages and interactions.

### Mock data

- Store mock data in `src/mocks/` by default.
- Avoid excessive hardcoding inside page code.
- Follow confirmed API specifications when available.
- If specifications are unconfirmed, label data as temporary UI fixtures.
- Do not assume the actual API response format is finalized.
- Make mocks easy to replace with real APIs.

### API integration

- Use `src/apis/` for server requests.
- Verify actual API specifications and Swagger/OpenAPI documents.
- Define request and response types.
- Do not invent endpoints, authentication methods, request fields, or response structures.
- Handle loading, error, and empty states.
- Prevent duplicate requests and submissions.
- For image uploads, handle file type, size limits, selection cancellation, and upload failures.
- Clearly distinguish real AI analysis from mock results.

### Login and authentication APIs

- Follow specifications supplied by the backend developer.
- Distinguish login success, failure, cancellation, and loading.
- Distinguish authentication from onboarding completion.
- Decide access/refresh token storage and renewal according to security requirements and team agreements.
- Never embed social login client secrets in frontend code.
- Coordinate post-login navigation with the onboarding owner.
- Implement logout and account deletion according to finalized authentication policies.

Do not report API integration as complete when the real API is not connected.

## 12. Mobile Environment and Testing

MAPIKO is mobile-first. Consider mobile screen sizes, touch interactions, scrolling, safe areas, status bar and bottom areas, mobile keyboards, navigation and back behavior, app launch and splash, return to the app after social login, image registration and preview, camera/gallery access, and permission requests and denials.

Avoid implementations that only work at one fixed mobile viewport size. Once mobile packaging is finalized, use its official APIs and plugins.

Where possible, test camera capture, gallery access, and image registration on physical mobile devices. Also verify splash, login, authentication persistence, and return to the app after login in the mobile environment.

Do not claim physical-device testing when verification was limited to simulators or browsers.

## 13. Git Branch Strategy

Use `main`, `develop`, and task branches.

### `main`

- Contains stable, integration-tested code.
- Serves as the presentation/demo baseline.
- No direct feature development or direct pushes.
- Merge verified `develop` through a dedicated PR.

### `develop`

- Baseline for frontend development and integration testing.
- GitHub default branch.
- Create new task branches from the latest `develop`.
- Base branch for ordinary development PRs.
- No direct feature development or direct pushes.

### Task branches

Format: `type/issue-number-task-name`. Use the actual GitHub issue number.

| Prefix      | Purpose                               |
| ----------- | ------------------------------------- |
| `feat/`     | New features                          |
| `fix/`      | Bug fixes                             |
| `ui/`       | UI and design changes                 |
| `chore/`    | Project environment and configuration |
| `refactor/` | Code structure improvements           |
| `docs/`     | Documentation changes                 |
| `test/`     | Test additions or changes             |

Examples:

- `feat/12-common-button`
- `feat/13-mypage`
- `feat/14-closet`
- `fix/15-image-upload`
- `chore/16-tailwind-setup`
- `feat/17-splash`
- `feat/18-login`

These issue numbers are examples only. Never invent an issue number or delete/change an existing task branch without authorization.

## 14. Git Collaboration

### Before starting

- Check the current branch and working tree.
- Check the related GitHub issue and task scope.
- Preserve existing changes; do not overwrite them without permission.
- Work from the latest `develop`.
- Check other developers' work and prerequisite PRs.

To create a task branch:

```bash
git status
git switch develop
git pull --ff-only origin develop
git switch -c feat/<actual-issue-number>-<task-name>
```

Replace placeholders with actual values before running the command.

To incorporate the latest `develop` during development, safely preserve in-progress changes first, then run on the task branch:

```bash
git fetch origin
git merge origin/develop
```

During conflicts, do not arbitrarily delete or overwrite another developer's code.

### Commits

Format: `type: task description`.

Examples (translated for reference):

- `feat: implement splash page`
- `feat: implement login screen`
- `feat: implement digital wardrobe main screen`
- `fix: handle image selection cancellation`
- `ui: update profile card styles`
- `chore: add Tailwind CSS setup`
- `docs: update Figma design reference rules`
- `refactor: extract clothing registration logic`
- `test: add image registration tests`

Keep each commit logically cohesive. Do not include unrelated changes.

### Pull requests

- Ordinary development PR: base `develop`, compare task branch.
- Stable release PR: base `main`, compare `develop`.
- Title format: `[type] #issue-number task description`.

Include the purpose and key changes, screenshots or demo views, verification results, related issue, incomplete items and dependencies, and review requests.

Use `Closes #issue-number` when the entire issue is complete; use `Refs #issue-number` for partial completion.

### Review and merge

- One approval from the other frontend developer is the default requirement.
- Resolve required changes and pass verification before merging.
- Prefer Squash and Merge for task branches into `develop`.
- Prefer Create a Merge Commit for `develop` into `main`.
- Never push directly to `main` or `develop`.

## 15. Dependencies and Environment Variables

Use npm consistently.

- Preserve `package-lock.json`.
- Do not upgrade dependencies arbitrarily or add unnecessary libraries.
- Explain the purpose and necessity of any proposed new library.
- Avoid new dependencies when the existing stack suffices.
- Check the scope and impact of configuration changes.

Never track real environment variables in Git.

- `.env.example`: example environment configuration.
- `.env.local`: actual local environment variables.
- `VITE_API_BASE_URL`: API base URL.

Variables prefixed with `VITE_` may be exposed to client code; never store secrets in them.

Do not include API secret keys, passwords, authentication tokens, personal credentials, personal data, or other confidential information in source code, GitHub issues, PRs, or logs.

## 16. Post-Implementation Verification

After code or configuration changes, run:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
```

If a check fails, investigate, fix within the task scope, and rerun it. Do not weaken ESLint or TypeScript rules just to pass verification.

### UI verification

- Match the Figma design.
- Verify component styles and layouts.
- Verify mobile responsiveness, scrolling, and clipping.
- Verify buttons, navigation, state changes, and interactions.
- Verify loading, error, and empty states.
- Check for regressions in existing features.

### Splash and login verification

When these features change, also verify:

- Splash display on initial launch and subsequent navigation.
- Login success, failure, and cancellation.
- Navigation based on authentication state.
- Connection to the onboarding owner's pages.
- Authentication state and navigation after logout.
- Separation of mock and actual authentication logic.

Never report unperformed checks as passed. Clearly identify functions without API integration, mock implementations, and features needing further testing.

## 17. AI Development Agent Rules

Codex and other AI development agents must:

1. Read `AGENTS.md`, `README.md`, relevant existing code, and the associated issue before starting.
2. Prioritize the user-defined task scope.
3. Follow the existing project structure and coding conventions.
4. Use the finalized Figma design page for actual UI implementation.
5. Respect the ownership boundaries between Design System and page-specific components.
6. Limit the user's assigned page development to splash, login, digital wardrobe, and My Page.
7. Do not independently implement or modify onboarding, which belongs to another developer.
8. Distinguish page ownership from Figma source component ownership.
9. Reuse existing shared components and design tokens first.
10. Do not independently modify other developers' code or assigned areas.
11. Do not refactor unrelated code.
12. Do not invent unconfirmed API specifications, design tokens, or service requirements.
13. Avoid unnecessary dependencies and excessive architecture.
14. Do not change settings to conceal errors.
15. Preserve existing Git changes and history.
16. Do not commit, push, create PRs, or merge without user approval.
17. Do not force-push or run destructive Git commands.
18. Do not delete existing files or branches without user approval.
19. Report actual verification results after completing the task.
20. Never misrepresent uninspected Figma designs, APIs, or test results.
21. Clearly report blocking dependencies and unresolved decisions to the user.

## 18. Completion Report

Report the following in Korean after completing a task:

- Work performed and features implemented.
- Files created or modified.
- Referenced Figma Frames and node IDs.
- Shared components reused.
- Newly implemented page-specific components.
- Mock data and actual API integration status.
- Results of each verification command.
- Items requiring coordination with other developers.
- Incomplete items and issues requiring further confirmation.
- Current Git branch and changes.

Do not independently start follow-up work not requested by the user.

## 19. Final Development Principles

- Implement from finalized Figma designs.
- Respect ownership of Design System and shared components.
- Distinguish page ownership from component ownership.
- Maximize reuse of existing components and code.
- Minimize code conflicts and duplicate implementations between developers.
- Determine completion from actual behavior and verified results.
- Avoid unnecessary technical complexity.
- Respect the development schedule and current task scope.

Prioritize stable, consistent development while preserving the existing project and other developers' work.

## 20. Token and Context Optimization

Optimize token usage throughout every task without compromising accuracy, code quality, or verification.

### General rules

- Read `AGENTS.md` and existing task-relevant documentation before starting.
- Reuse existing code, analysis, specifications, and work records first.
- Inspect only relevant files instead of repeatedly scanning the entire repository.
- Avoid unnecessary repeated reads of files, external resources, and tool results.
- Scope MCP requests to the required data.
- Split large tasks into independently manageable work units.
- Avoid repeating code, analysis, or explanations in outputs.
- Do not modify files, implement features, or refactor outside the current task scope.
- Keep chat responses concise: key results, changed files, verification results, and necessary follow-up actions.

### Context and documentation

- Store reusable analysis, design decisions, and implementation specifications in repository Markdown files.
- Update existing documents rather than creating duplicates.
- Use relative links instead of duplicating information across documents.
- For long or complex tasks, record progress, completed work, remaining work, and key decisions as needed.
- In new sessions, consult existing documents to avoid unnecessary repetition of prior analysis and verification.
- If documentation conflicts with actual code, use current code and verified information as the basis for decisions and update the relevant documents.

Never omit required tests, security checks, error analysis, or completion criteria to save tokens.

## 21. Repeated Error Handling and Recovery

### 21.1. Detect repeated errors

If the same error, or an error with substantially the same cause, occurs three times at the same work step, immediately stop executing and retrying that step.

Treat different error messages as repeated errors if they indicate the same underlying cause. Do not repeat the same command or code modification approach without a fundamental change.

### 21.2. Analyze the cause

Before further modifications or retries, investigate:

- Failed task and execution step.
- Relevant files, functions, components, or commands.
- Actual error messages and logs.
- Environment and reproduction conditions.
- Previous resolution attempts and why they failed.
- Root cause.
- Dependencies and potential impact.
- Alternative solutions and the recommended approach.

Distinguish verified facts from hypotheses. Do not present an unconfirmed cause as fact.

### 21.3. Write an error report

Before resuming resolution work, document the analysis and proposed solution in a Markdown error report. Use the existing error report directory if available; otherwise use:

```text
docs/error-reports/YYYY-MM-DD-[error-keyword].md
```

Use this structure:

```markdown
# Error Report: [Error title]

## 1. Basic Information

- Date and time:
- Task:
- Branch:
- Related files:
- Occurrence count:
- Status: Investigating / Identified / Resolved / Blocked

## 2. Error Details

- Error message:
- Location:
- Reproduction conditions:
- Expected behavior:
- Actual behavior:

## 3. Previous Resolution Attempts

| Attempt | Action | Result | Reason for failure |
| ------- | ------ | ------ | ------------------ |
| 1       |        |        |                    |
| 2       |        |        |                    |
| 3       |        |        |                    |

## 4. Root Cause Analysis

- Verified facts:
- Root cause:
- Hypotheses and outstanding checks:
- Impact:

## 5. Resolution Plan

- Recommended solution:
- Related files to change:
- Resolution steps:
- Alternatives and precautions:

## 6. Verification Plan

- Error reproduction check:
- Related feature tests:
- Regression tests:
- Acceptance criteria:

## 7. Resume Point

- Interrupted task:
- Completed prerequisites:
- Resume location:
- Remaining work:

## 8. Final Resolution

- Solution applied:
- Verification results:
- Final status:
- Resolution date and time:
```

Update an existing report for the same error instead of creating a duplicate. Never include authentication tokens, API keys, passwords, personally identifiable information, or other sensitive data.

### 21.4. Resolve and verify

Use the root cause analysis and resolution plan in the report to:

1. Apply the recommended solution.
2. Check whether the original error still occurs.
3. Verify related features and code behavior.
4. Run necessary regression tests.
5. Record the actual solution and verification results in the report.

Do not perform pointless retries or use temporary workarounds to conceal unresolved errors.

If the same error occurs three more times after applying the report-based resolution plan, stop again and update the existing report. If further progress requires additional information, permissions, or user judgment, set the status to `Blocked` and notify the user.

### 21.5. Resume work

Once the error is resolved and normal behavior verified, resume from the recorded interruption point.

- Do not unnecessarily repeat completed work from the beginning.
- Preserve the original task scope and implementation plan.
- Account for changes introduced during error resolution.
- Update the report status to `Resolved`.
- Do not mark work complete while unresolved issues remain.

If no additional user decision or permission is required, proceed continuously from report creation through resolution, verification, and task resumption.
