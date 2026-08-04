# 01 — TypeScript Fundamentals

The first concept of the frontend lab. TypeScript is JavaScript **plus a type
layer**: you annotate what kind of value each thing holds, and the compiler
catches mismatches *before the code runs*. This concept covers the core, from
typed variables up to generics and utility types — the 80% of TypeScript that
real React code is mostly made of.

Written from scratch by hand, in the workout domain from the Python lab, so
the *concepts* stay familiar while the *language* is new.

## Run it

```powershell
cd 01-typescript-fundamentals
npm install
npx tsc --noEmit      # type-check without producing output
npx tsx basics.ts     # actually run the file
```

`tsc --noEmit` is the one to watch — it reports type errors across the file.
A clean run (no output) means the types all check out.

## What's covered

**Typed variables** — `let sport: string = "run"`. The `: type` annotation
is enforced; assigning a wrong type is a compile error.

**Functions** — parameters and return type are annotated:
`function logWorkout(sport: string, distance: number): void`. `void` means
"returns nothing". TypeScript checks both the call site (right argument types)
and that the body returns what it claims.

**Interfaces** — describe the shape of an object. `?` marks a property
optional:

```typescript
interface Workout {
  sport: Sport;
  distance?: number;   // optional — a rest day has none (like Python's None)
  duration?: number;
  isRestDay: boolean;
}
```

**Union / literal types** — constrain a value to an allowed set, enforced at
compile time (the type-level version of the Python allowed-sports list):

```typescript
type Sport = "run" | "swim" | "cycle" | "badminton" | "strength" | "rest";
```

**Generics** — a type *parameter* `<T>` lets one function work with many
types while staying type-safe (unlike `any`, which throws safety away):

```typescript
function identity<T>(value: T): T { return value; }
```

The type is *preserved through* the function: `identity(6.5)` returns a
`number`, so calling `.toUpperCase()` on the result is a compile error. That
preservation is the whole point of generics over `any`.

**Generic constraints** — `<T extends { sport: string }>` means "any type,
*as long as* it has a `sport`". The constraint both restricts what can be
passed and makes `item.sport` safe to access inside.

**Utility types** — pre-built generic types. `Partial<Workout>` makes every
field optional (useful for updates that send only changed fields). It's just
a generic applied to a type — the `<Workout>` is the same `<T>` mechanism.


## Not covered (future / as-needed)

The advanced type-level features — conditional types, mapped types (how
`Partial` is actually built), `keyof`, `Record`, template literal types — are
genuinely advanced and rarely *written* in everyday frontend work. Worth
learning when a specific need arises; deliberately skipped here to keep the
focus on the practical core. `Pick` / `Omit` / `Required` follow the same
pattern as `Partial` and can be picked up in minutes when needed.

## What I learned

> - How is TypeScript different from JavaScript, in one sentence: It is strongly-typed JavaScript.
> - How to define constants, functions, interfaces in TypeScript and use them.
> - What is a union and how it can be used in an interface.
> - Why is a generic `<T>` better than `any` for a function that works with
>  many types?
> - What does a generic *constraint* (`T extends ...`) let you do that plain
>  `<T>` doesn't?_

## Concepts touched

Typed variables, function parameter/return types, `void`, interfaces,
optional properties, union and literal types, generics, generic constraints,
the `Partial` utility type.
