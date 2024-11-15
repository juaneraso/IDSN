import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './components/Login/Login'
import { Routes, Route} from 'react-router-dom'
import Prueba from './components/Prueba/Prueba.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx'
import RegistroUsuario from './components/Registro/RegistroUsuario.jsx'

function App() {


  return (
      <Routes>
       <Route path="/" element={<Login/>}/>
       <Route path="/login" element={<Prueba/>}/>
       <Route path="/dashboard" element={<Dashboard/>}/>
       <Route path="/register" element={<RegistroUsuario/>}/>
       


      </Routes>
  )
}

export default App
