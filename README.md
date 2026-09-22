# Frontend Engineering Lab

![Frontend Engineering Lab — engineering reliable user interfaces one concept at a time](assets/title.png)

A completed learning project showing how I build modern, reliable, and user-friendly web interfaces from the ground up.

I created a workout-tracker application and expanded it step by step across 12 focused stages. It begins with the foundations of TypeScript and develops into a responsive, multi-page React application that accepts user input, retrieves data, handles errors, and is tested from individual components through to complete user journeys.

The purpose of this lab was not simply to make an application that works. It was to understand what makes a frontend maintainable: clear structure, reusable components, predictable behaviour, helpful validation, responsive design, and automated quality checks.

## What this project demonstrates

For a recruiter, hiring manager, or project lead, this repository provides evidence that I can:

- break a larger technical subject into manageable learning and delivery stages;
- build a complete frontend application independently;
- turn requirements into clear and reusable interface components;
- anticipate loading, error, empty, and invalid-input scenarios;
- test both individual features and complete user workflows;
- investigate problems, explain their causes, and document my decisions; and
- learn new technologies systematically rather than relying on generated code I cannot explain.

## The project: a workout tracker

The running example is a workout tracker for activities such as running, swimming, cycling, badminton, and strength training.

It is intentionally a small and familiar product so that the engineering remains the focus. As the project develops, a user can navigate between pages, view workout information, enter and validate data, retrieve information from an API, and use the application on different screen sizes.

Using one application throughout all 12 stages also shows how software grows over time: new capabilities must fit cleanly into the existing structure instead of being added as isolated demonstrations.

## How the application is structured

![Architecture and learning stack](assets/architecture.png)

The diagram presents two related views:

- **Application structure — left:** how the browser opens the application, navigation selects the correct page, reusable interface components display information, and state and data handling keep the screen up to date.
- **Learning progression — right:** how the 12 concepts build on one another, from TypeScript foundations to complete browser-based tests.

The colours connect each learning stage to the part of the finished application it supports. The [editable draw.io diagram](assets/architecture.drawio) can be opened in [diagrams.net](https://app.diagrams.net/).

## How I worked

Each concept has its own folder with runnable code, setup instructions, and learning notes. Every stage builds on the knowledge developed before it.

My approach was to:

1. study one engineering concept at a time;
2. implement it myself before consulting reference solutions;
3. investigate failures until I understood the cause;
4. request review only after producing my own working version; and
5. document what worked, what I learned, and what I deliberately left for a later stage.

This matters in an AI-assisted development environment: modern tools can generate code quickly, but a software engineer still needs to understand, assess, debug, and maintain the result.

## What the 12 stages add

| Stage | Capability added to the application | Engineering skill demonstrated |
|---|---|---|
| 01 — TypeScript Fundamentals | A dependable foundation for application data | Preventing common mistakes through clear types and data models |
| 02 — Component Architecture | Pages assembled from smaller building blocks | Structuring an interface into reusable, maintainable components |
| 03 — JSX & Rendering | Different content for different situations | Handling conditions, lists, and empty states clearly |
| 04 — Events & State | An interface that responds to user actions | Managing changing data without unpredictable side effects |
| 05 — Effects & Browser APIs | Safe interaction with browser features | Coordinating external behaviour and cleaning up resources correctly |
| 06 — Forms & Validation | Guided data entry with immediate feedback | Preventing invalid submissions and making errors understandable |
| 07 — Data Fetching | Information retrieved from an external service | Managing loading, success, and failure states reliably |
| 08 — Routing & Layouts | Multiple pages with consistent navigation | Organising a larger application and supporting direct URLs |
| 09 — Reusable UI Components | Flexible cards and buttons used consistently | Reducing duplication and creating a coherent interface |
| 10 — Responsive Layouts | A layout that adapts to different screens | Building usable interfaces with Flexbox, Grid, and Tailwind CSS |
| 11 — Component Testing | Automated checks for individual interface features | Testing what users can see and do rather than internal implementation details |
| 12 — End-to-End Testing | Complete user journeys tested in a real browser | Verifying that the application works as one connected system |

All 12 stages are complete. ✅

## Repository structure

Each stage is self-contained and includes its own README:

| Folder | Topic |
|---|---|
| [01-typescript-fundamentals](01-typescript-fundamentals/) | TypeScript fundamentals |
| [02-component-architecture](02-component-architecture/) | Component architecture |
| [03-jsx-rendering](03-jsx-rendering/) | JSX and conditional rendering |
| [04-events-state](04-events-state/) | Events and application state |
| [05-effects-browser-apis](05-effects-browser-apis/) | Effects and browser APIs |
| [06-forms-validation](06-forms-validation/) | Forms and validation |
| [07-data-fetching](07-data-fetching/) | Data fetching and asynchronous states |
| [08-routing-layouts](08-routing-layouts/) | Routing and shared layouts |
| [09-reusable-ui](09-reusable-ui/) | Reusable UI components |
| [10-responsive-layouts](10-responsive-layouts/) | Responsive layouts |
| [11-component-testing](11-component-testing/) | Component testing |
| [12-e2e-testing](12-e2e-testing/) | End-to-end testing |

## Technical implementation

The technology set was intentionally kept focused:

- **React and TypeScript** for a typed, component-based user interface;
- **Vite** for local development and production builds;
- **React Router** for navigation and page layouts;
- **Tailwind CSS**, used after learning responsive layout with standard CSS Flexbox and Grid;
- **Vitest and React Testing Library** for component-level tests; and
- **Playwright** for testing complete user journeys in a real browser.

Keeping the toolset small allowed me to concentrate on transferable engineering principles rather than accumulating libraries.

## What I can now build and explain

After completing the lab, I can independently:

- build a typed React application from an empty project;
- design reusable components and consistent layouts;
- manage user interaction and changing application data;
- create forms with clear validation and feedback;
- connect an interface to a REST API and handle loading or failure gracefully;
- structure a multi-page application with navigation and URL parameters;
- create responsive interfaces for different screen sizes; and
- test individual components as well as complete browser-based workflows.

More importantly, I can explain why each part exists, how the pieces work together, and how I would investigate them when something breaks.

## Running the project

You will need Node.js and npm.

```powershell
git clone https://github.com/ajitagupta/frontend-engineering-lab.git
cd frontend-engineering-lab
```

Then open the stage you want to explore:

```powershell
cd 01-typescript-fundamentals
npm install
npm run dev
```

The README in each folder contains its setup instructions and detailed learning notes.

## Next steps

This project establishes the frontend fundamentals needed for more advanced topics, including accessibility, authentication, design systems, application-wide state management, performance optimisation, and production engineering.

---

*A completed frontend engineering practice project: one application, 12 stages, and every concept understood well enough to build, test, and explain.*

Sequel to the [Python Engineering Lab](https://github.com/ajitagupta/python-engineering-lab).
