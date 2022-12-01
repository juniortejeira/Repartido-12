import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import  Router from './Pages/Rutas/rutas';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>

    <BrowserRouter>
      <Router /> 
    </BrowserRouter>
  </>
);


reportWebVitals();
