import React from 'react';
import { useState,useRef } from 'react'
import { useEffect } from 'react'

function Login() {

const emailnameRef = useRef();
const passwordRef = useRef();

useEffect(()=>{
  async function encontrar(){
    //estamos trayendo la base de datos de usuarios
    const response = await fetch("http://localhost:5000");
    //le decimos que la response sera un metodo json  
    const data = response.json()
    console.log(data)
  };
  encontrar().catch(console.log);
},[])

const onSubmit =(e)=>{
  e.preventDefault();
  const email = emailnameRef.current.value;
  const password = passwordRef.current.value;
  console.log({email,password})
  fetch("http://localhost:5000/login",{
    method:"POST",
    headers:{"content-type":"application/json"},
    //solicitamos email y password del ref
    body: JSON.stringify({email, password})
  })//".then" the an promize is the same that line 14
  //.then(response => response.json())
  .then(function(response){
    return response.json()
  }).then(function(data){
    console.log(data)
  })
}



  //render() 
    return (
      <>
        <form onSubmit={onSubmit}>
          <h2>Login</h2>
          <div className="section">
            <div className="title">email</div>
            <div className="field"><input id="email" type="text" name="email" ref={emailnameRef}/></div>
          </div>

          <div className="section">
            <div className="title">Pasword</div>
            <div className="field"><input id="password" type="text" name="password" ref={passwordRef}/></div>
          </div>

          <div className="section">
            <div className="button"><input type="submit" value="Registro de usuario" /></div>
            <div className="button"><a href="../Users/Users.js" />Login</div>
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