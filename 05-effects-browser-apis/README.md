# 05 — Effects & Browser APIs

`useEffect` — the other major hook (alongside `useState`). It runs
side-effect code that **synchronizes a component with an external system**:
the browser's timer, the document title, event listeners, network requests —
things that live *outside* React.

The concept is small in syntax but easy to get backwards, so the focus is the
mental model.

## Run it

```powershell
cd 05-effects-browser-apis
npm install
npm run dev
```

A timer counts up once per second, and the browser tab tite stays in sync.

## The mental model (the important part)

**Effects run *after* render — rendering triggers the effect, not the other
way around.** `useEffect` does **not** cause re-renders. State changes cause
re-renders (concept 04); effects *respond* to renders by running afterward.
Getting this direction right avoids the classic infinite loop (an effect that
sets state → triggers a render → runs the effect → sets state → ...).

Effects exist because rendering must be **pure** (only compute JSX, no side
effects). Touching external systems during render is unsafe, so `useEffect`
is the designated place for it — code that runs safely *after* the render.

## The shape

```tsx
useEffect(() => {
  // side-effect code (runs after render)
  return () => { /* optional cleanup */ };
}, [dependencies]);
```

## The dependency array controls *when* the effect re-runs

- `[]` — run **once**, after the first render (mount). Used by the timer
  effect (set the interval up a single time).
- `[seconds]` — re-run **whenever `seconds` changes**. Used by the title
  effect (update the tab every time the count changes).
- *no array* — run after **every** render (usually a mistake).

Two effects in the same component show both:

```tsx
useEffect(() => {                    // runs once
  const id = setInterval(() => setSeconds(s => s + 1), 1000);
  return () => clearInterval(id);    // cleanup
}, []);

useEffect(() => {                    // runs whenever seconds changes
  document.title = `${seconds}s elapsed`;
}, [seconds]);                       // no cleanup needed
```

## Cleanup — needed only for ongoing resources

The effect can **return a cleanup function**, which runs on unmount (and
before the effect re-runs).

- **Timer effect needs cleanup** — `setInterval` sets up an ongoing resource
  that must be stopped with `clearInterval`. Same for event listeners
  (remove them) and subscriptions (unsubscribe).
- **Title effect needs no cleanup** — setting `document.title` is a one-off
  assignment; it creates nothing that needs tearing down.

Rule: **if the effect sets up something ongoing, clean it up; if it just
assigns or reads once, it doesn't.**

## Seeing cleanup matter

Removing the timer's cleanup makes the counter jump by 2. React Strict Mode
(on in dev) deliberately mounts components twice to surface exactly this bug:
without cleanup, the first interval is never cleared, so two intervals run at
once. Restoring the cleanup clears the old interval before starting the new
one — back to one clean tick per second. Missing cleanup leaks resources.

## The function-form setter

The timer uses `setSeconds(s => s + 1)`, not `setSeconds(seconds + 1)`. The
effect runs once (`[]`) and captures `seconds` as `0` at that moment, so
`seconds + 1` would always be `1` (a stale-closure bug). The function form
always receives the latest value.

## When NOT to use an effect

Modern React uses `useEffect` *less* than developers once did. It's for
genuine synchronization with an external system. If you're not syncing with
something outside React, you probably don't need an effect. (Data fetching —
a common effect use — is its own concept, 07.)

## What I learned

> - What is useEffect for, and why does "it triggers re-renders" get the
>   direction backwards? Right direction: new component is rendered -> useEffect is called
> - What does the dependency array control? `[]` vs `[x]` vs none?
> - When does an effect need cleanup, and when doesn't it? When a persistent resource is created. No cleaup -> erratic behavior
> - Why the function-form setter inside the interval? Pass value as variable, not value (otherwise stale closure)

## Concepts touched

`useEffect`, synchronizing with external systems, effects running after (not
causing) render, the dependency array (`[]`, `[dep]`, none), cleanup
functions and resource leaks, React Strict Mode's double-mount, the
function-form setter and stale closures, when not to reach for an effect.
