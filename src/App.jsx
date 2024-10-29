import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './components/Login/Login'
import { Routes, Route} from 'react-router-dom'

function App() {


  return (
      <Routes>
       <Route path="/" element={<Login/>}/>
       


      </Routes>
  )
}

export default App
