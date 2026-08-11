# 04 — Events & State

Where the UI becomes **interactive** — responding to the user and changing
over time, instead of just rendering static data. The biggest conceptual leap
in the lab so far: state, re-rendering, and how components share state.

## Run it

```powershell
cd 04-events-state
npm install
npm run dev
```

Click "Add Workout" — the list grows. That's state driving the UI.

## State and re-rendering (`useState`)

A plain variable doesn't work for changing UI:

```tsx
let count = 0;
function handleClick() { count = count + 1; }   // changes the variable...
// ...but the screen NEVER updates — React doesn't know anything changed.
```

The variable does change (a `console.log` proves it), but the screen stays
stale. React only re-renders when notified. `useState` is that mechanism:

```tsx
const [count, setCount] = useState(0);
setCount(count + 1);   // updates the value AND tells React to re-render
```

**The key idea:** calling the **setter** is what notifies React to
re-render — not the value changing. Reassigning a variable changes it
silently; the setter is the signal that updates the screen. `useState` returns
`[value, setter]` (array destructuring), and the setter can be typed with a
generic: `useState<Workout[]>([...])`.

## Immutable updates

To add to a state array, create a **new** array — don't mutate the old one:

```tsx
setWorkouts([...workouts, newWorkout]);   // ✓ new array (spread)
// NOT: workouts.push(newWorkout); setWorkouts(workouts);  ✗
```

**Why — and it's not what it first seems:** JavaScript arrays *are* mutable;
`push` works. The reason to make a new array is that **React detects state
changes by reference** — it checks "is this a different array than before?" If
you `push` into the same array, it's the same reference, so React may not
notice and won't re-render. A new array (via spread) is a new reference, so
React sees the change. You treat state as immutable *for React's sake*, not
because arrays can't change.

## Events

`onClick={handleClick}` runs a function on click. Pass the function itself
(`handleClick`), not a call (`handleClick()`, which would fire on render).

## Lifting state up

When two sibling components need to share state, it can't live in either —
it lives in their common **parent**, and flows down as props.

The app is split into a parent that owns state plus two children:

```tsx
function WorkoutTracker() {
  const [workouts, setWorkouts] = useState<Workout[]>([...]);

  function handleAdd() {
    const newId = workouts.length ? workouts[workouts.length - 1].id + 1 : 1;
    setWorkouts([...workouts, { id: newId, sport: "run", /* ... */ }]);
  }

  return (
    <>
      <AddWorkoutButton onAdd={handleAdd} />     {/* function flows down */}
      <WorkoutDisplay workouts={workouts} />      {/* data flows down */}
    </>
  );
}
```

**The two principles:**

- **Data flows down.** State lives in one place; children receive it as props.
- **To change parent state, a child calls a function the parent passed down.**
  The button gets `onAdd` and calls it; the update happens in the parent. So
  data flows down, and "events" flow up via function calls.

**Typing a function prop:** `onAdd: () => void` — a function taking no
arguments, returning nothing. (New: typing a *function* as a prop, not just
data.)

Shared state lives at the **lowest common parent** of everyone who needs it —
that's the answer to "where should this state live?"

## Context (concept only)

When data is needed **deeply** — by a descendant many levels down, forcing it
to be threaded through intermediate components that don't use it (**prop
drilling**) — Context shares it without the threading:

```tsx
const WorkoutContext = createContext<Workout[]>([]);
// provide high up:  <WorkoutContext.Provider value={workouts}>...</Provider>
// consume anywhere:  const workouts = useContext(WorkoutContext);
```

A Provider makes a value available; any descendant grabs it with
`useContext`, skipping the middle layers. **Use it for widely-shared data**
(theme, user, language) — not everything. The trigger is *intermediate
components relaying props they don't use*, not merely depth. Props first;
Context only when drilling genuinely hurts. Not built here (the app is too
shallow to need it) — deferred to when a deeper tree motivates it.

## What I learned

> - What is useState?
> - Why doesn't a plain variable update the screen, but the setter does?
> - Why create a new array instead of pushing despite arrays being mutable? Because React holds the reference only.
> - Where does shared state live, and why? How do children change it?
> - What is the concept of lifting? Storing a state in a common parent component.
> - What problem does Context solve, and when would you reach for it? Prop-drilling - too many intermediate layers where props are passed through.

## Concepts touched

`useState`, the setter-triggers-re-render model, events (`onClick`),
immutable updates and reference-based change detection, lifting state up,
data-down / functions-up flow, typing function props (`() => void`), Context
(prop drilling, Provider/`useContext`) at a conceptual level.
