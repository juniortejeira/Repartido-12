import React from 'react';
import { useState, useRef } from 'react'
import { useEffect } from 'react'
import './Login.css';
import { useNavigate, Link } from "react-router-dom";

function Login({setUSer}) {
  
  const navigate = useNavigate();
  const emailnameRef = useRef();
  const passwordRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailnameRef.current.value;
    const password = passwordRef.current.value;
    //console.log({ email, password })
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      //solicitamos email y password del ref
      body: JSON.stringify({ email, password })
    }).then(function (response) {
        //decodificar formato json
        return response.json()
      }).then(function (data) {
        setUSer(data)
        console.log("Data: ", data)
        navigate("/Home");
      })
  }

  return (
    <>

      <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>

      <form className='Form-Login' onSubmit={onSubmit}>

        <h3>Login</h3>

        <label className='Label' for="username">Email</label>
        <input className='Input' id='email' type='text' name='email' ref={emailnameRef} />

        <label for="password">Contraseña</label>
        <input className='Input' id='password' type='text' name='password' ref={passwordRef} />

        <button className='BotonI'>Iniciar sesión</button>

        <div className='Register'>  
        <Link className='BotonR' to={'/Register'}>Registro</Link>
        </div>


      </form>

    </>
  )
}

export default Login;
