# 03 — JSX & Rendering

How to make UI **respond to data** — showing different markup depending on
what's there. Builds on concept 02's components and lists, adding
**conditional rendering**: the piece that decides *whether* and *which* UI to
show.

This solves the "undefinedkm" problem from concept 02 — a rest day with no
distance should render cleanly, not show "undefinedkm".

## Run it

```powershell
cd 03-jsx-rendering
npm install
npm run dev
```

## The three conditional-rendering patterns

Each suits a different situation — and this concept uses all three, each where
it fits.

**1. `&&` — show something *only if* a condition is true.** For optional
fields:

```tsx
{workout.distance != null && `, Distance: ${workout.distance}km`}
```

Shows the distance only when it exists; a badminton session (no distance)
simply omits it. Use `&&` when the choice is "show or don't".

**2. Ternary `? :` — show A *or* B.** For the empty state (in `App`, which
owns the list):

```tsx
{workouts.length === 0
  ? <p>No workouts planned</p>
  : workouts.map((w) => <WorkoutCard key={w.id} workout={w} />)}
```

Use a ternary when you always render *something*, but *which* depends on the
condition.

**3. Early return — branch the whole component.** When the two cases look
fundamentally different (a rest day vs a real workout):

```tsx
function WorkoutCard(props: WorkoutCardProps) {
  const workout = props.workout;
  if (workout.isRestDay) {
    return <p><b>Workout</b> {workout.id} - Rest day - recover well!</p>
  }
  return <p>...full stats...</p>
}
```

Cleaner than cramming both cases into one return with nested ternaries.

## The `&&` zero-trap

A classic React bug: `{workout.distance && ...}` renders a literal **`0`** on
screen when `distance` is `0`, because `0 && x` evaluates to `0` — which is
falsy but *renderable*. The fix is an explicit existence check:

```tsx
{workout.distance != null && ...}   // true for any real value, incl. 0
```

`!= null` is false only for `null`/`undefined`, so it means "if it exists at
all" — which is what "optional field" actually means.

## Which component owns which decision

A useful architectural point: **each component makes the decisions it has the
data for.**

- `WorkoutCard` has *one workout*, so it decides how to display that workout
  (the rest-day early return, the optional-field checks).
- `App` has *the list*, so it decides list-level things — the empty state.
  `WorkoutCard` can't decide "is the list empty?" because it never sees the
  empty case; no card renders when there's nothing to show.

## Python -> TypeScript note

"No value" is `null` (or an omitted optional field), **not** `None`. Booleans
are lowercase `true`/`false`, not `True`/`False`. An optional field marked
`distance?` can simply be left out of the object.

## What I learned

> - The three conditional-rendering patterns — when do you use each and how to write them out?
> - Leave out parameters instead of setting them to 0 or null.
> - What is the `&&` zero-trap, and how does `!= null` avoid it?
> - Why does the empty-state check belong in `App`, not `WorkoutCard`?

## Concepts touched

Conditional rendering (`&&`, ternary, early return), the `&&` zero-trap and
`!= null`, empty states, which component owns which rendering decision,
reusing lists (`.map()`, keys) and composition from concept 02.
