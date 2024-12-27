import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Login from "./components/Login/Login";
import { Routes, Route } from "react-router-dom";
import Prueba from "./components/Prueba/Prueba.jsx";
import RegistroUsuario from "./components/Registro/RegistroUsuario.jsx";
import Dashbo from "./components/Dashbo/Dashbo.jsx";
import ReportForm from "./components/Report/ReportForm.jsx";
import ReportView from "./components/ReportView/ReportView.jsx";

function App() {
  return (
    <Routes>
      <Route path="/repo" element={<Prueba />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegistroUsuario />} />
      <Route path="/dashbo" element={<Dashbo />} />
      <Route path="/" element={<ReportForm />} />
      <Route path="/view" element={<ReportView />} />
    </Routes>
  );
}

export default App;
