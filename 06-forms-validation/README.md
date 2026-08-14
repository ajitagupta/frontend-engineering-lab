# 06 — Forms & Validation

Handling user input with **controlled inputs**, validating it reactively, and
submitting. Brings the validation instincts from the Python lab (allowed
values, positive numbers) into the frontend, where the user types in real
time.

## Run it

```powershell
cd 06-forms-validation
npm install
npm run dev
```

## Controlled inputs — the core idea

An input is **controlled** when React state is the single source of truth for
its value. The input *displays* the state, and every keystroke updates it:

```tsx
const [sport, setSport] = useState("");

<input value={sport} onChange={(e) => setSport(e.target.value)} />
```

- `value={sport}` — the input shows whatever is in state.
- `onChange` — typing pushes the new value (`e.target.value`) back into state.
- State updates -> re-render -> the input reflects the new state.

The loop: **type -> onChange -> setState -> re-render -> input shows state.**
The value lives in *state*, not in the DOM — that's what "controlled" means.
An *uncontrolled* input holds its own value and React doesn't know it;
a controlled input's value is always in React state.

**Why it's useful:** because the value lives in state, you can validate it,
show errors, transform it, disable submit, or reset it — all things that
follow *from* the value being in state.

## Inputs are always strings

Even a numeric field gives a **string** in `e.target.value` (`"5"`, not `5`).
Same string-vs-number issue as query params and CSV in the Python lab. Convert
when validating/submitting: `Number(distance)` (or `NaN` if not numeric).

## Validation (reactive)

Errors are computed from state, so they update live as the user types — the
Python allowed-list and positive-number checks, now reactive:

```tsx
const allowedSports = ["run", "swim", "cycle", "badminton", "strength", "rest"];

const sportError = sport !== "" && !allowedSports.includes(sport)
  ? "Sport must be one of: ..." : "";

const distanceError = distance !== "" && (Number(distance) < 0 || isNaN(Number(distance)))
  ? "Distance must be a positive number" : "";
```

The `!== ""` guard avoids showing an error before the user has typed anything.
Errors display with conditional rendering (concept 03):

```tsx
{sportError && <p style={{ color: "red" }}>{sportError}</p>}
```

Error text is **red** — the colour should match the meaning (red = problem;
green would falsely signal success).

## Submission

Attach `onSubmit` to the **form** (not the button's onClick), and the submit
button goes **inside** the form:

```tsx
function handleSubmit(e: React.FormEvent) {
  e.preventDefault();                       // stop the page reload
  if (sportError || distanceError || sport === "") return;   // block if invalid
  console.log("Submitting:", { sport, distance: Number(distance) });
}
```

**`e.preventDefault()` is essential.** A form's default submit behaviour is to
**reload the page** — which wipes all React state and breaks the SPA. Preventing
it keeps submission inside React. Forgetting it is the most common React-forms
bug (submit -> page reloads -> everything resets).

## Handlers *do*, JSX *shows*

A key separation, learned the hard way here: an **event handler** runs logic
(validate, process, block) — it does **not** return JSX. **Rendering** (the
error messages, the inputs) lives in the **component's return**, where it
displays reactively from state. Returning JSX from a handler does nothing.

## Design decision: when to validate

This form validates **on change** (errors appear as you type). That's
immediate but can feel naggy mid-typing ("ru" on the way to "run" flashes an
error). Alternatives — validate **on blur** (leaving the field) or **on
submit** — are calmer but delay feedback. On-change is a deliberate choice, not
the only correct one.

## What I learned

> - What makes an input "controlled"? React state(controlled), DOM (uncontrolled)
> - What is the onChange function and what is e.target.value?
> - Why are input values always strings, and what did you do about it?
> - What does e.preventDefault() do, and what happens without it?
> - Why can't an event handler return JSX to show error messages?

## Concepts touched

Controlled inputs (state as source of truth), `value`/`onChange` binding,
input values as strings, reactive validation, conditional error display,
form submission, `onSubmit` and `e.preventDefault()`, handlers-do-vs-JSX-shows,
validate-on-change as a design choice, accessible labels (`htmlFor`).
