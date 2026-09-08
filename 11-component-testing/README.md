# 11 — Component Testing

Testing React components with **Vitest** (the test runner) and **React
Testing Library** (RTL, for rendering and querying components). The pytest
arrange-act-assert rhythm carries over from the Python lab; what's new is
rendering UI in tests and RTL's philosophy of testing *behaviour*, not
implementation.

## Run it

```powershell
cd 11-component-testing
npm install
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @testing-library/user-event
npm test        # runs Vitest in watch mode; press q to quit
```

## Setup

- `vitest.config.ts` — sets `environment: 'jsdom'` (a fake browser so
  components can render without a real one), `globals: true` (so `test` /
  `expect` need no import), and `setupFiles: './src/setup.ts'`.
- `src/setup.ts` — `import '@testing-library/jest-dom/vitest';` (registers
  jest-dom matchers like `toBeInTheDocument` **with Vitest's types** — the
  `/vitest` suffix is what stops the `ts(2339)` "toBeInTheDocument does not
  exist" type error).
- `package.json` — `"test": "vitest"` in scripts.

## The tools, mapped to pytest

- **Vitest** = the test runner (like pytest). Finds `*.test.tsx` files, runs
  them, reports pass/fail, watches for changes.
- **React Testing Library** = renders a component into the fake DOM and lets
  you query it *as a user would*. This is the new part — backend tests
  checked return values; here you render UI and inspect what the user sees.

## Rendering tests

Render a component, then assert the expected content is on screen:

```tsx
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import WorkoutCard from './WorkoutCard';

test('displays the workout sport and distance', () => {
  render(<WorkoutCard sport="swim" distance={0.6} />);
  expect(screen.getByText('swim')).toBeInTheDocument();
  expect(screen.getByText('0.6 km')).toBeInTheDocument();
});
```

- `render(<Component />)` — mounts it in the jsdom DOM (arrange + act).
- `screen.getByText('swim')` — finds an element by its **visible text**, the
  way a user reads the screen.
- `expect(...).toBeInTheDocument()` — a jest-dom assertion.

## Interaction tests

Simulate a real user action, then assert the UI changed — the most valuable
kind of test:

```tsx
import userEvent from '@testing-library/user-event';

test('increments the count when the button is clicked', async () => {
  const user = userEvent.setup();          // arrange
  render(<Counter />);
  expect(screen.getByText('Count: 0')).toBeInTheDocument();

  await user.click(screen.getByRole('button'));   // act (async!)

  expect(screen.getByText('Count: 1')).toBeInTheDocument();  // assert
});
```

- The test is **`async`** — simulated events take a tick, so `await` the click.
- `userEvent.setup()` + `user.click(...)` — simulates a **real** user click
  (dispatches the actual browser events, so `onClick` fires and state
  updates).
- `screen.getByRole('button')` — finds elements by accessibility **role**
  (`button`, `textbox`, `heading`); RTL's preferred query, mirroring how users
  and assistive tech perceive the page.
- The before/after assertions bracket the action: 0 before the click, 1 after
  — proving the behaviour.

## The RTL philosophy: behaviour, not implementation

Query by what the user *perceives* (`getByText`, `getByRole`), never by
internal state or implementation details. Two payoffs:

1. **Tests survive refactoring** — change *how* a component works internally,
   and as long as it still behaves the same, the tests pass.
2. **Tests verify what matters** — the user's experience (what shows, what
   happens on click), not incidental internals.

## Tests vs assertions

Vitest counts **`test()` blocks**, not `expect`s. One `test()` with three
`expect`s reports as **1 test** — a single behaviour verified by several
checks (same model as one pytest `def test_...` with multiple `assert`s).
Split into multiple `test()` blocks only when they're genuinely distinct
behaviours.

## What I learned

> - Why test behaviour (what the user sees/does) over implementation?
> - What are the three phases of the interaction test, and what does
>   `userEvent` simulate?_
> - Why does `getByRole` / `getByText` reflect the RTL philosophy?
> - Why is "1 test" reported when a block has several assertions?
> - What carried over from pytest, and what was new?]

## Concepts touched

Vitest (runner, watch mode, jsdom), React Testing Library, `render` and
`screen`, `getByText` / `getByRole` (user-centric queries), jest-dom matchers
(`toBeInTheDocument`), `userEvent` for simulating interactions, async tests,
arrange-act-assert for UI, testing behaviour over implementation, tests vs
assertions.
