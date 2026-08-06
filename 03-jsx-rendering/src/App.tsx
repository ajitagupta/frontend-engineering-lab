import './App.css'

interface Workout {
  id: number;
  sport: string;
  distance?: number;
  duration?: number;
  isRestDay: boolean;
}

interface WorkoutCardProps {
  workout: Workout;
}



function Welcome() {
  return <h2>--- Welcome to my workout tracker ---</h2>
}

function WorkoutCard(props: WorkoutCardProps) {
  const workout = props.workout;

  if (workout.isRestDay) {
    return <p><b>Workout</b> {workout.id} - Rest day - recover well!</p>
  }
  return <p><b>Workout</b> {workout.id} - Sport: {workout.sport}{workout.distance != null && `, Distance: ${workout.distance}km`}{workout.duration != null && `, Duration: ${workout.duration}min`}</p>
}


function App() {

  const workouts: Workout[] = [
    {id: 1,sport: "swim", distance: 0.6, duration: 23, isRestDay: false},
    {id: 2, sport: "cycle", distance: 10, duration: 20, isRestDay: false},
    {id: 3, sport: "rest", isRestDay: true},
    {id: 4, sport: "badminton", duration: 120, isRestDay: false}
  ]
  /*const workouts: Workout[] = []*/
  
  return (
    <>
      <h1>My Workout Tracker</h1>
      <Welcome />
      {
        workouts.length === 0 ? <p>No workouts planned</p> :
        workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
      )
      )}
    </>
  )
}

export default App
