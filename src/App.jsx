import { useState } from 'react'
import './App.css'
import FormPage from "./components/FormPage.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <br/><br/>
      <FormPage/>
    </>
  )
}

export default App
