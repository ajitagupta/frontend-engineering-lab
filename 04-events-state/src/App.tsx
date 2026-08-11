import { useState } from 'react'

import './App.css'

interface Workout {
  id: number;
  sport: string;
  distance?: number;
  duration?: number;
  isRestDay: boolean;
}


function Counter() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count+1) // change state THROUGH the setter
  }

  return <button onClick={handleClick}>Count: {count}</button>;
}

function WorkoutList() {
  const [workouts, setWorkouts] = useState<Workout[]>([{id: 1, sport: "strength", distance: 0, duration: 35, isRestDay: false}])
  
  function handleClick() {
    const newId = workouts.length > 0 ? workouts[workouts.length - 1].id + 1 : 1;
    const newWorkout: Workout = { id: newId, sport: "running", distance: 5, duration: 30, isRestDay: false };
    setWorkouts([...workouts, newWorkout]);
}

  return (
    <>
      <button onClick={handleClick}>Add Workout</button>
      {workouts.map((workout) => (<p key={workout.id}>{workout.id}: {workout.sport} - {workout.distance} km - {workout.duration} min</p>))
      }
      
    </>
  )
}

function AddWorkoutButton({ onAdd }: { onAdd: () => void }) {
  return <button onClick={onAdd}>Add Workout</button>
}

function WorkoutDisplay({ workouts }: { workouts: Workout[] }) {
  return (
    <>
      {
      workouts.map((workout) => (<p key={workout.id}>{workout.id}: {workout.sport} - {workout.distance} km - {workout.duration} min</p>))
      }
    </>
  )
}

function WorkoutTracker() {
  const [workouts, setWorkouts] = useState<Workout[]>([{id: 1, sport: "strength", distance: 0, duration: 35, isRestDay: false}])

    function handleAdd() {
      const newId = workouts.length > 0 ? workouts[workouts.length - 1].id + 1 : 1;
      const newWorkout: Workout = { id: newId, sport: "running", distance: 5, duration: 30, isRestDay: false };
      setWorkouts([...workouts, newWorkout]);
    }
    return (
      <>
        <AddWorkoutButton onAdd={handleAdd} />
        <WorkoutDisplay workouts={workouts} />
      </>
    )
}


function App() {
  return (
    <>
      <h1>My Workout Tracker</h1>
      {/*<Counter />*/}
      {/*<WorkoutList />*/}
      <WorkoutTracker />
    </>
  );
}

export default App
