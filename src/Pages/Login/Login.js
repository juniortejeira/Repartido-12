import React from 'react';
import { useState, useRef } from 'react'
import { useEffect } from 'react'
import './Login.css';
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const emailnameRef = useRef();
  const passwordRef = useRef();

 /*  useEffect(() => {
    async function encontrar() {
      //estamos trayendo la base de datos de usuarios
      const response = await fetch("http://localhost:5000");
      //le decimos que la response sera un metodo json  
      const data = response.json()
      console.log(data)
    };
    encontrar().catch(console.log);
  }, []) */

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
    })//".then" the an promize is the same that line 14
      //.then(response => response.json())
      .then(function (response) {
        //decodificar formato json
        return response.json()
      }).then(function (data) {
        console.log("Data: ", data)
        navigate("/Home");
        //utilizamos la propiedad cookie
        //document.cookie = data.token //esto da error ya que no estamos utilizando la cookie bien
        document.cookie = `token=${data.token};path=/; samesite=strict`
        console.log(document.cookie)
      })
  }
    const probando = () => {
      const token = document.cookie.replace('token=', '')
      //console.log('probando  :  ' + token )
      fetch("http://localhost:5000/pruebaDatos", {
        method: "POST",
        headers: { 'authorization': token }
      }).then((res) => res.json()).then(data => {
        console.log(data)
      })
    }
   /* const redirection =  ()=>{
    const correcto = document.header("OK");
    fetch("http://localhost:5000/login", {
      method:"POST",
      headers:{"OK":correcto}
    }).then(function (response) {
      console.log("Bien hecho")
      return response.json()
    }).then(data =>{
      console.log(data)
    })
  } */


  //render() 
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
/* 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Mundo home</h1>
    <form action="/" method="POST">
        <h2>Login</h2>
        <div class="section">
            <div class="title">email</div>
            <div class="field"><input id="email" type="text" name="email" ></div>
        </div>

        <div class="section">
            <div class="title">Pasword</div>
            <div class="field"><input id="password" type="text" name="password" ></div>
        </div>

        <div class="section">
            <div class="button"><input type="submit" value="Login"></div>
            <div class="button"><a href="registro.html">Registro</div>
        </div>
    </form>
    
</body>

<script>
    document.querySelector("#btn_register").addEventListener("click",()=>{
        location.href = '/registro.html'
    })
</script>    
</html> */