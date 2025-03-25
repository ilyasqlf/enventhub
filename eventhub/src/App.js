import React from 'react';
import { BrowserRouter, Routes, Route } from'react-router-dom';
import Conexion  from './pages/conexion';
import Inscription from './pages/inscription';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/'element={<Home />}  />     
      <Route path='/conexion'element={<Conexion />} />
        <Route path='/Inscription'element={<Inscription/>} />
        <Route path='ForgotPassword'element={<ForgotPassword/>} />
        </Routes>
      </BrowserRouter> 
    </div>
  );
};









export default App;
