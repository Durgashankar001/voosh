import { useState } from 'react'
import Navbar from './Components/Navbar'
import Router from './Router/Router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
     <Navbar/>
     <Router/>
    </div>
  )
}

export default App
