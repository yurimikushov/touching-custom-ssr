import { useEffect, useState } from 'react'
import './App.css'

const Greeting = () => {
  return <h1>Hello world!</h1>
}

const Counter = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count > 10) {
      setCount(0)
    }
  }, [count])

  const handleIncrement = () => {
    setCount(count => count + 1)
  }

  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  )
}

const App = () => {
  return (
    <>
      <Greeting />
      <Counter />
    </>
  )
}

export default App
