# 07 — Data Fetching

Loading data from a server API — where the frontend finally talks to a
backend. The real substance isn't the fetch itself; it's modelling that
fetched data is **asynchronous and fallible**, so it's always in one of three
states: **loading**, **error**, or **success**.

## Run it

```powershell
cd 07-data-fetching
npm install
npm run dev
```

Fetches users from a public test API (`jsonplaceholder.typicode.com`) and
displays them.

## Why three states

A local array is just *there* — synchronous, guaranteed. Server data has a
**lifecycle**: it's requested, it's pending, then it either arrives or fails.
So at any moment the component is in one of three states, and each needs its
own UI:

- **loading** — the request is in flight; data isn't here yet.
- **error** — the request failed; show a message, not a blank page.
- **success** — data arrived; show it.

Handling all three is what separates a real app from one that shows a blank
screen while waiting and another blank screen on failure.

## The fetch (inside an effect)

Fetching is a side effect (reaching out to the network), so it lives in
`useEffect`. The effect callback can't be `async` itself, so an async function
is defined inside and called:

```tsx
const [data, setData] = useState<User[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  async function loadUsers() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) throw new Error("Server error");   // see gotcha below
      const users: User[] = await response.json();
      setData(users);
    } catch (err) {
      setError("Could not load users");
    } finally {
      setLoading(false);   // always stop loading — success or fail
    }
  }
  loadUsers();
}, []);
```

`try` sets data on success, `catch` sets the error on failure, and `finally`
stops loading either way (that's exactly what `finally` is for).

## The `fetch` gotcha: it doesn't throw on HTTP errors

`fetch` only rejects on a **network failure** (no connection). If the request
reaches the server and it responds — **even with a 500 or 404** — `fetch`
treats that as success and does **not** throw. So a server error would sail
past `catch` unless you check the status yourself:

```tsx
if (!response.ok) throw new Error("Server error");
```

`response.ok` is true only for 2xx statuses. This converts an HTTP error
status into a thrown error the `catch` can handle. (Having sent 400s and 500s
from a Flask API in the Python lab makes this concrete — the server *does*
respond on error; `fetch` just counts that response as "success".)

## Rendering the three states

Early-return guards in the function body — one per state (concept 03's
branching, on async state):

```tsx
if (loading) return <p>Loading users...</p>;
if (error)   return <p style={{ color: "red" }}>{error}</p>;

return (
  <div>{data.map((u) => <p key={u.id}>{u.name}</p>)}</div>
);
```

The first guard whose condition is true wins; if neither loading nor error,
we're in the success case. Note these `if`/`return` statements go in the
**function body**, before the JSX — not inside the returned markup.

## Testing all three

- **Success** — loads and shows the data.
- **Loading** — throttle the network (DevTools -> Network -> Slow 3G) to see
  "Loading..." linger before the data arrives.
- **Error** — break the URL (`/users` -> `/userzzz`) and watch the red error
  message appear instead of a blank page. The app degrades gracefully.

## What I learned

> _- Why does fetched data need three states when a local array needs one? Property of asynchronous programming.
> - Why check response.ok — doesn't fetch throw on a 500 by itself? response only throws network failure, everything else is considered a success.
> - Why does the fetch go in an effect, and why the async function inside? Fetching is a side effect, rendering must stay pure, with [] (empty deps), the fetch runs once, when the component mounts.
> - Why does setLoading(false) go in `finally`? Before the cycle starts again the initial setup is always false.

## Concepts touched

`fetch`, async/await, fetching inside `useEffect`, three-state async modelling
(loading / error / success), `response.ok` and why `fetch` doesn't throw on
HTTP errors, `try`/`catch`/`finally`, early-return guards for rendering
states, typing fetched data.
