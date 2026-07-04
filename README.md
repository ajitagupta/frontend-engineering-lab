# Frontend Engineering Lab

![Frontend Engineering Lab — UI concepts assembled one component at a time](assets/title.png)

A focused frontend engineering lab where I consolidate my React, TypeScript,
and UI engineering fundamentals by implementing one frontend concept at a
time — from scratch, by hand — and writing down the design decisions behind
each implementation.

Each concept lives in its own folder and focuses on one practical frontend
pattern at a time, with runnable code, concise documentation, and notes on
implementation decisions.

## How this lab works

* One concept per folder, numbered in order (`01-...`, `02-...`).
* I write the first version myself before looking at any reference solution.
  The point is understanding, not copying.
* Each concept folder has its own README with run instructions and notes.
* The examples stay intentionally small so each pattern can be understood,
  tested, and revisited later.

## Getting started

You'll need Node.js and npm installed.

```powershell
# Clone and enter the repo
git clone https://github.com/ajitagupta/frontend-engineering-lab.git
cd frontend-engineering-lab
```

Each concept folder is self-contained. Open the folder you want to run and
follow its README.

A typical setup will look like this:

```powershell
# Enter a concept folder
cd 01-component-architecture

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Roadmap

| Concept                            | Skill                                          | Status    | Folder        |
| ---------------------------------- | ---------------------------------------------- | --------- | ------------- |
| 01 — Component Architecture        | Breaking UI into reusable components           | ⬜ Planned | *coming soon* |
| 02 — JSX & Rendering Logic         | Conditional rendering, lists, composition      | ⬜ Planned | *coming soon* |
| 03 — TypeScript Props & Interfaces | Typed props, component contracts               | ⬜ Planned | *coming soon* |
| 04 — Events & User Interaction     | Clicks, inputs, handlers, UI behavior          | ⬜ Planned | *coming soon* |
| 05 — State Management Basics       | `useState`, derived state, lifting state up    | ⬜ Planned | *coming soon* |
| 06 — Effects & External Systems    | `useEffect`, browser APIs, synchronization     | ⬜ Planned | *coming soon* |
| 07 — Forms & Validation            | Controlled inputs, validation, error messages  | ⬜ Planned | *coming soon* |
| 08 — API Integration               | Fetching data, async state, API boundaries     | ⬜ Planned | *coming soon* |
| 09 — Loading, Empty & Error States | Realistic frontend state handling              | ⬜ Planned | *coming soon* |
| 10 — Routing & Layouts             | Pages, navigation, layout structure            | ⬜ Planned | *coming soon* |
| 11 — Reusable UI Components        | Buttons, cards, tables, modals                 | ⬜ Planned | *coming soon* |
| 12 — Component Testing             | Testing visible behavior and user interactions | ⬜ Planned | *coming soon* |

*Scoped to twelve concepts for now; advanced topics like design systems,
performance optimisation, authentication flows, and full-stack integration
can be planned once the core frontend patterns are solid.*

---

## Tech Stack

This lab will mainly use:

* React
* TypeScript
* Vite
* Next.js where useful
* CSS Modules / Tailwind CSS
* React Testing Library
* Playwright

The focus is not on chasing frontend trends, but on understanding the
engineering patterns behind reliable user interfaces.

---

*A frontend engineering practice project, updated as I work through it.
Progress over speed — one concept genuinely understood beats five rushed.*
