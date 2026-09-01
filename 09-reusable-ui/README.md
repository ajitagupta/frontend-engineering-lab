# 09 — Reusable UI Components

Building generic, reusable building blocks — a `Card`, a `Button` — that
aren't tied to any particular data, the way a real component library works.
Two core patterns: the **`children`** prop (flexible *content*) and
**variants** (flexible *appearance*).

## Run it

```powershell
cd 09-reusable-ui
npm install
npm run dev
```

## The `children` prop — components that wrap content

`children` is whatever content is placed **between** a component's opening and
closing tags. The component receives it as the `children` prop and renders it
inside itself:

```tsx
interface CardProps {
  children: React.ReactNode;   // "any renderable content"
}

function Card({ children }: CardProps) {
  return <div style={{ /* box styling */ }}>{children}</div>;
}
```

Used with any content — the caller decides what goes inside:

```tsx
<Card>
  <h3>Workout</h3>
  <p>Swim — 0.6km</p>
  <Button variant="danger">Delete</Button>
</Card>
```

The `<h3>`, `<p>`, and `<Button>` are the Card's `children`. **Content flows
from the caller into the component** — the Card doesn't know or care what's
inside; it just provides the box. That's what makes it reusable: one `Card`
wraps a heading, a workout, a form, anything. The component supplies
*structure*; the caller supplies *content*.

`React.ReactNode` is the standard type for children (JSX, text, components —
anything React can render).

## Variants — one component, many looks

A `variant` prop selects which styling to apply, so one `Button` produces
several appearances:

```tsx
type ButtonVariant = "primary" | "secondary" | "danger";   // union type (concept 01)

const styles: Record<ButtonVariant, React.CSSProperties> = {
  primary:   { backgroundColor: "#2563eb", color: "white" },
  secondary: { backgroundColor: "#e5e7eb", color: "black" },
  danger:    { backgroundColor: "#dc2626", color: "white" },
};

<button style={{ ...baseStyles, ...styles[variant] }}>{children}</button>
```

There's **one** button element and a lookup of styles keyed by variant.
`styles[variant]` picks the matching style; the spread applies it on top of
shared base styles. The `variant` prop chooses the appearance; `children` is
the label — two separate axes (appearance vs content).

## `Record` and the indexing error

Indexing `styles[variant]` first gave `ts(7053)` — TypeScript couldn't
guarantee `styles` had an entry for every `ButtonVariant`. The fix annotates
the object:

```tsx
const styles: Record<ButtonVariant, React.CSSProperties> = { ... };
```

`Record<K, V>` = "an object with keys `K` and values `V`". Now TypeScript
knows there's a style for every variant, so the lookup is provably safe — and
it will **error if a variant is missing**, keeping variants and styles in
sync. (`Record` is a concept-01 utility type, like `Partial`.)

## Optional props with a default

Make a prop optional and give it a fallback so common cases stay terse:

```tsx
interface ButtonProps {
  variant?: ButtonVariant;              // ? = optional (concept 01)
  children: React.ReactNode;
}

function Button({ variant = "primary", children }: ButtonProps) { ... }
```

The `?` makes it optional *at the type level* (callers may omit it); the
`= "primary"` supplies a value *at runtime* when omitted. Both are needed —
`?` alone would leave `variant` possibly `undefined`; the default alone would
still be required by the type. So `<Button>Save</Button>` defaults to primary,
`<Button variant="danger">Delete</Button>` overrides it.

## Composition

Reusable components nest: a `Button` inside a `Card` (as part of its
`children`). Small, single-purpose components combine into larger UI — the
essence of a component library.

## What I learned

> - What is `children`? All JSX elements inside a REACT component.
> - How does one Button produce three looks? What does `variant` do? Button component has 1 button element and a styles 
> object holding 3 style definitions (one per variant). The variant specifies which one to use.
> - Why do optional-prop-with-default need BOTH the `?` and the `=`? Optional props must first be defined with `?` and then their default values must be set with `=`.


## Concepts touched

The `children` prop and `React.ReactNode`, components that wrap content,
variants via a typed prop, union types, optional props with default values,
composition of reusable components.
