# 10 — Responsive Layouts

More CSS than React: arranging elements on the page and making the layout
adapt to screen size. Flexbox (1D), Grid (2D), responsive breakpoints via
`@media`, and how Tailwind expresses all of it as utility classes.

Learned in plain CSS first (to understand the mechanics), then translated to
Tailwind.

## Run it

```powershell
cd 10-responsive-layouts
npm install
npm run dev
```

## Flexbox — one-dimensional layout

`display: flex` on a container arranges its direct children along **one
axis** — a row or a column. Set on the *container*:

```css
.card-container {
  display: flex;
  flex-direction: row;         /* row (default) or column */
  gap: 16px;                   /* space between items */
  justify-content: space-around;  /* alignment ALONG the main axis */
  align-items: center;         /* alignment ACROSS the cross axis */
}
```

- `flex-direction` — the direction items flow (row = horizontal, column =
  vertical).
- `gap` — space between items.
- `justify-content` — placement along the **main axis** (the flow direction).
- `align-items` — placement along the **cross axis** (perpendicular).

**The two-axis subtlety:** `justify-content` and `align-items` track the
main/cross axes, and those **swap** when `flex-direction` changes. In a row,
`justify-content` is horizontal; in a column, it's vertical. And
`align-items: center` only *looks* like it does something when the container
is **taller than its items** — with no extra cross-axis space, centered looks
the same as top-aligned. (Hit this: centering seemed broken until the
container was given a `height`.)

## Grid — two-dimensional layout

`display: grid` arranges items in a **matrix** of rows and columns:

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);   /* 3 equal columns */
  gap: 16px;
}
```

`repeat(3, 1fr)` = three columns, each `1fr` (an equal fraction of the space).
Six cards flow into a clean 3x2 grid, aligned both across and down — something
flexbox (single-line) can't do.

**Flexbox vs Grid:** one axis -> flexbox (nav bar, button row, a stack); two
axes -> grid (card gallery, dashboard, image grid).

## Responsive design — adapting to viewport width

Write default styles, then override them at certain **viewport widths** with
`@media`:

```css
.card-container { flex-direction: row; }         /* default: wide screens */

@media (max-width: 600px) {
  .card-container { flex-direction: column; }    /* <=600px: stack */
}

@media (max-width: 600px) {
  .grid-container { grid-template-columns: 1fr; } /* <=600px: single column */
}
```

The **breakpoint** (600px) is where the layout switches. It responds to the
window/viewport **width** — dragging the browser narrower triggers it on the
same physical screen. Seen live: the row flips to a column, and the 3x2 grid
collapses to one column, as the window narrows past 600px.

## Tailwind — the same thing as utility classes

Tailwind maps these CSS properties to classes written directly in the JSX:

| Plain CSS | Tailwind class |
|---|---|
| `display: flex` | `flex` |
| `gap: 16px` | `gap-4` (scale: 4 = 1rem = 16px) |
| `justify-content: space-around` | `justify-around` |
| `display: grid` | `grid` |
| `grid-template-columns: repeat(3, 1fr)` | `grid-cols-3` |

Responsive uses **breakpoint prefixes** instead of `@media` (mobile-first):

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
```

`grid-cols-1` by default (mobile), `md:grid-cols-3` at medium screens and up.
Because the underlying Flexbox/Grid/media-query concepts came first, Tailwind
reads as shorthand for known CSS — not magic. (Not set up here; the value was
seeing the translation.)

## What I learned

> - Flexbox vs Grid — when do you reach for each? Flexbox is 1D, whereas Grid is 2D.
> - Why did `align-items: center` seem to do nothing until the container had
>  a height? Because the container wraps aroudn the items immediately without space.
> - What does a media query respond to, and what's a breakpoint? A media query responds to the viewport width — the width of the browser's visible area (the window, essentially). Not the physical screen size, not "resolution" exactly — the current width of the viewport.
> A breakpoint is the width value where the layout switches — here, 600px.
> - How does Tailwind express a responsive layout? Tailwind replaces the @media block with breakpoint prefixes on utility classes, written right in the className.

## Concepts touched

Flexbox (`display: flex`, `flex-direction`, `gap`, `justify-content`,
`align-items`, main vs cross axis), Grid (`display: grid`,
`grid-template-columns`, `1fr`, `repeat`), 1D vs 2D layout, responsive
`@media` breakpoints, viewport width, `className` in React, Tailwind utility
classes and breakpoint prefixes.
