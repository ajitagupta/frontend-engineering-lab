import './App.css'

interface Workout {
  id: number;
  sport: string;
  distance?: number;
  duration?: number;
}

interface WorkoutCardProps {
  workout: Workout;
}



function Welcome() {
  return <h2>--- Welcome to my workout tracker ---</h2>
}

function WorkoutCard(props: WorkoutCardProps) {
  return <p><b>Workout</b> {props.workout.id} - Sport: {props.workout.sport}, Distance: {props.workout.distance}km, Duration: {props.workout.duration}min</p>
}


function App() {

  const workouts: Workout[] = [
    {id: 1,sport: "swim", distance: 0.6, duration: 23},
    {id: 2, sport: "cycle", distance: 10, duration: 20},
    {id: 3, sport: "run", distance: 5, duration: 31}
  ]
  return (
    <>
      <h1>My Workout Tracker</h1>
      <Welcome />
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </>
  )
}

export default App
