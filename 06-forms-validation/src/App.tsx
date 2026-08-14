import { useState } from 'react'
import './App.css'

function WorkoutForm() {
  const [sport, setSport] = useState("");
  const [distance, setDistance] = useState("");

  const allowedSports = ["run", "swim", "cycle", "badminton", "strength", "rest"];
  // compute an error message (or empty) from the current state
  const sportError = sport !== "" && !allowedSports.includes(sport)
  ? "Sport must be one of: run, swim, cycle, badminton, strength, rest"
  : "";
  const distanceError = distance !== "" && (Number(distance) < 0 || isNaN(Number(distance)))
  ? "Distance must be a positive number"
  : "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // handlers DO things — they don't return JSX
    if (sportError || distanceError || sport === "") {
      return;   // there are errors (or empty) — don't submit
    }
    // valid — do something with the data
    console.log("Submitting workout:", { sport, distance: Number(distance) });
  }

  return ( 
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="sport">Sport: </label>
        <input
          type="text"
          id="sport"
          value={sport}
          onChange={(e) => setSport(e.target.value)}
          placeholder="Enter a sport"
        />
        <p>You typed: {sport}</p>
        <label htmlFor="distance">Distance: </label>
          <input
            type="text"
            id="distance"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Enter a distance"
          />
        <p>You typed: {distance}</p>  
        <button type="submit">Add Workout</button>
      </form>
      {sportError && <p style={{ color: "red" }}>{sportError}</p>}
      {distanceError && <p style={{ color: "red" }}>{distanceError}</p>}
    </>
  )
}

function App() {

  return (
    <>
      <WorkoutForm />
    </>
  )
}

export default App
