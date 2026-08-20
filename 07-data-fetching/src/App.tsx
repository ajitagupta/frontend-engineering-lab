
import { useEffect, useState } from 'react';
import './App.css'

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);   // starts true — we're loading immediately
  const [error, setError] = useState("");

    useEffect(() => {
      async function loadWorkouts() {
        try {
          const response = await fetch("https://jsonplaceholder.typicode.com/users");
          if (!response.ok) {
            throw new Error("Server error");
          }

          const data: User[] = await response.json();
          setData(data);
        } catch (error) {
          setError("Could not load users");
        } finally {
          setLoading(false);   // always stop loading, success or fail
        }
      }
      loadWorkouts();
    }, []);

    if (loading)  return <p>Loading users...</p>
    if (error)  return <p style={{ color: "red" }}>{error}</p>

    return (
      <div>
        <h1>Users</h1>
          <div>
            {data.map((user) => (
              <p key={user.id}>
                <strong>{user.name}</strong> - {user.email}
              </p>
            ))}
          </div>
      </div>
    )
}

export default App
