import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Header from './Component/Header/Header';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Footer from './Component/Footer/Footer';
import Error404 from './Pages/E404/Error404';
import Register from './Pages/Register/Register';
import Users from './Pages/Users/Users';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <> 
  <BrowserRouter>    
  <Header/>
    <Routes>
    <Route path="/Home" element={<Home />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/Register" element={<Register />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/Users" element={<Users />} />
    <Route path="/*" element={<Error404 />} />
    </Routes>
  <Footer/>
  </BrowserRouter>
  </>
);


reportWebVitals();
