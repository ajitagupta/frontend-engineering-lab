import { useState } from 'react'
import { useEffect } from 'react'

import './App.css'

function Timer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1)
    }, 1000)

    return () => clearInterval(timer) // cleanup function to clear the interval when the component unmounts
  }, [])

  useEffect(() => {
    document.title = `${seconds}s elapsed`;
  }, [seconds]);

  return (
    <>
      <p>Elapsed time: {seconds} seconds</p>
    </>
  )
}

function App() {
  return (
    <>
      <h1>My Workout Timer</h1>
      <Timer/>
    </>
  )
}

export default App
