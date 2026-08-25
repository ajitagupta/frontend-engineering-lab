# 08 — Routing & Layouts

Turning a single-screen app into a multi-page one — with navigation, a shared
layout, and dynamic detail pages — all client-side (no full page reloads),
using React Router.

## Run it

```powershell
cd 08-routing-layouts
npm install
npm install react-router-dom
npm run dev
```

## Client-side routing

A traditional site reloads the whole page from the server for each URL. A
single-page app (SPA) instead changes the URL and swaps *which component
renders* — instantly, in the browser, no reload, keeping app state alive.
React Router watches the URL and renders the matching component.

Three nested pieces, all required:

```tsx
<BrowserRouter>          {/* watches the URL */}
  <Routes>               {/* picks the matching Route */}
    <Route path="/" element={<HomePage />} />   {/* URL -> component mapping */}
  </Routes>
</BrowserRouter>
```

A `<Route>` alone does nothing — it needs `Routes` (to select a match) inside
`BrowserRouter` (to watch the URL). Like `case`s needing a `switch`.

## `<Link>`, not `<a>`

Navigate with `<Link to="/workouts">`, never a plain `<a href="/workouts">`.

- `<a>` triggers a **full page reload** — the browser refetches from the
  server and wipes all React state.
- `<Link>` intercepts the click, prevents the reload, changes the URL, and
  swaps only the matched component **in place** — no reload, state preserved.

That no-reload swap (URL changes, content changes, no flicker) is the whole
point of an SPA.

## Layouts (shared UI via nested routes)

Shared chrome (a nav bar) shouldn't be repeated in every page. A `Layout`
component holds the shared parts plus an `<Outlet />` — the slot where the
current page renders:

```tsx
function Layout() {
  return (
    <div>
      <nav><Link to="/">Home</Link> | <Link to="/workouts">Workouts</Link></nav>
      <hr />
      <Outlet />        {/* the matched child page renders here */}
    </div>
  );
}
```

Nest the page routes inside the layout route:

```tsx
<Route path="/" element={<Layout />}>
  <Route index element={<HomePage />} />          {/* index = default child */}
  <Route path="workouts" element={<WorkoutsPage />} />
  <Route path="workouts/:id" element={<WorkoutDetailPage />} />
</Route>
```

The nav bar stays fixed; only the `<Outlet />` content swaps as you navigate.

## URL params (dynamic detail pages)

A detail page shows one item based on the URL. One route with a dynamic
segment handles any id:

```tsx
<Route path="workouts/:id" element={<WorkoutDetailPage />} />
```

`:id` matches any value. Read it with `useParams`:

```tsx
function WorkoutDetailPage() {
  const { id } = useParams();     // id comes from the URL (a string)
  return <h1>Workout #{id}</h1>;
}
```

`/workouts/3` -> "Workout #3". Reach detail pages *from the list*, each item
supplying its real id:

```tsx
<Link to={`/workouts/${workout.id}`}>{workout.sport}</Link>
```

**Key rule:** `:id` is a *pattern* — it belongs **only** in the `<Route>`
definition. A `<Link>` must supply a *real* id (`/workouts/3`), never the
pattern. Linking to the literal `/workouts/:id` makes `useParams` read `id`
as the string `":id"` ("Workout #:id" — a bug hit here).

`useParams` only returns params the **route defines**. The route defines
`:id`, so you get `id` — the URL carries the *identifier*; to show the full
workout (sport, distance) you'd look it up / fetch it by that id (combining
with concept 07 — the frontend mirror of Flask's `/workouts/<int:id>`).
Deferred here to keep the focus on routing.

## Gotchas hit

- **`//` comments don't work inside JSX** — use `{/* ... */}`.
- **`return` alone on a line, JSX below** → JavaScript auto-inserts a
  semicolon (`return;`), so the component returns nothing. Start the JSX on
  the same line: `return (`.

## What I learned

> - <BrowserRouter>, <Routes>, <Route> tag hierarchy. Concrete Link over <Link>
> - Why `<Link>` over `<a>` in an SPA? What does each do on click?
> - Where does `:id` belong, and why did a Link with `:id` break?
> - What does `<Outlet />` do in a layout? Renders current page.
> - A Details page with connection over id for each workout is a common application for a multi-page app.

## Concepts touched

Client-side routing, `BrowserRouter` / `Routes` / `Route`, `<Link>` vs `<a>`
and no-reload navigation, layouts with `<Outlet />` and nested routes,
`index` routes, URL params (`:id`) and `useParams`, pattern-in-Route vs
real-value-in-Link, list-to-detail navigation.
