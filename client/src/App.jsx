import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App () {
  return(
    //contenedor
    <BrowserRouter> 
      <Routes> //voy a crear multiples rutas 
        <Route path="/" element={<h1>Home Page</h1>}/>//ruta path, q es la inicial
        <Route path="/login" element={<h1>Login</h1>}/> 
        <Route path="/register" element={<h1>Register</h1>}/> 
        <Route path="/tasks" element={<h1>Tasks page</h1>}/> 
        <Route path="/add-task" element={<h1>new task</h1>}/> 
        <Route path="/task/:id" element={<h1>update task</h1>}/> //mostrar tarea especifica
        <Route path="/profile" element={<h1>profile</h1>}/> 
        
      </Routes>
    </BrowserRouter>
  )
}

export default App;