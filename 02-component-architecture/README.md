# 02 — Component Architecture

Where the TypeScript from concept 01 becomes real UI. A React component is a
function that returns markup (JSX); components take typed **props** as input
and **compose** into larger components. This concept builds a small
workout-tracker UI from the ground up — typed cards rendered from data.

First concept using the full React + TypeScript + Vite setup (concept 01 was
TypeScript only).

## Run it

```powershell
cd 02-component-architecture
npm install
npm run dev        # dev server at http://localhost:5173, live-reloads on save
```

## The core ideas

**A component is a function that returns JSX.**

```tsx
function Welcome() {
  return <h2>Welcome to my workout tracker</h2>
}
```

Component names are **Capitalized** (React uses the capital to tell your
components apart from HTML tags). JSX looks like HTML but is TypeScript — the
file is `.tsx` (TypeScript + JSX). A component must return a **single root**;
to return siblings, wrap them in a Fragment `<>...</>` (which groups without
adding a real element).

**Props pass data into a component — and are typed with an interface.** This
is where concept 01 pays off: props are just a function parameter, typed with
a TypeScript interface.

```tsx
interface Workout {
  id: number;
  sport: string;
  distance?: number;
  duration?: number;
}

interface WorkoutCardProps {
  workout: Workout;
}

function WorkoutCard(props: WorkoutCardProps) {
  return <p>{props.workout.sport} — {props.workout.distance}km</p>
}
```

Used like an HTML attribute, passing an object with `{{ }}` (outer braces =
"a JS expression", inner braces = the object literal):

```tsx
<WorkoutCard workout={{ id: 1, sport: "swim", distance: 0.6, duration: 23 }} />
```

**Why type props:** the interface is an enforced **contract**. The component
declares exactly what data it needs, and TypeScript checks every use at
compile time — catching a missing, misspelled, or wrong-typed prop before the
code runs. (Accessing `props.sport` instead of `props.workout.sport` was
caught instantly this way.) Grouping data is what an interface does; *typing*
the props is what makes the contract safe.

**Rendering a list from data with `.map()`** — the fundamental React pattern:

```tsx
const workouts: Workout[] = [ /* ... */ ];

{workouts.map((workout) => (
  <WorkoutCard key={workout.id} workout={workout} />
))}
```

`.map()` turns each data item into a component, so an array of workouts
becomes a list of cards. Data in, many components out.

**Keys.** Each item in a mapped list needs a unique `key` so React can track
it across renders (add/remove/reorder) and update efficiently. The key should
be a **stable unique id** — `key={workout.id}` — the same stable-identity idea
as database ids in the Python lab. Using the array index is a known
anti-pattern for lists that can change, because indices shift.

**Composition.** Larger components are built from smaller, single-purpose
ones. A `SportBadge` that just displays a sport can live inside
`WorkoutCard`, which lives inside `App`. Each component does one thing, is
reusable, and is understandable on its own — that decomposition is the
"architecture" in component architecture.

## Gotchas hit

- **Defining a component inside another component** (`Welcome` nested in
  `App`) is an anti-pattern — it recreates the component every render,
  breaking state and performance. Components go at the **top level** of the
  file, never nested inside another.
- **Unused starter imports** from the Vite template (logos, `useState`,
  `count`) show as warnings until removed. Keep only what's used.

## What I learned

> - Creating and setting up a Vita + React + TS project
> - What is a component, in one sentence? A UI function that is directly rendered and that is reusable and composable.
> - Each component is defined within a function. It's content is called JSX: HTML in Typescript file.
> - Why must components be defined at the top level, not nested? So they don't get rendere with the main App component at every update / change.
> - Why type props with an interface — what does it protect against? Enforced Compile-time safety.
> - What's a mapped list / array in JSX and how to write it out.
> - Why does a mapped list need a `key`, and why a stable id over the index? No mix-ups in case of deletions (similar to database ids).

## Concepts touched

React components, JSX/TSX, Fragments, props, typing props with an interface
(the concept-01 payoff), composition, rendering lists with `.map()`, `key`
and stable identity, the nested-component anti-pattern, Vite + React + TS
setup.
