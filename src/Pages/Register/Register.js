import React from 'react';
import { useState,useRef } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';

function Users() {

const usernameRef = useRef();
const emailnameRef = useRef();
const passwordRef = useRef();
const photoRef = useRef();

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
  const username = usernameRef.current.value;
  const email = emailnameRef.current.value;
  const password = passwordRef.current.value;
  const photo = photoRef.current.value;
  console.log({email,password})
  fetch("http://localhost:5000/registro",{
    method:"POST",
    headers:{"content-type":"application/json"},
    //solicitamos email y password del ref
    body: JSON.stringify({username,email, password,photo})
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
        <h1>Mundo registro</h1>
    <form onSubmit={onSubmit}>
        <h2>Registrarse</h2>
        <div className="section">
            <div className="title">username</div>
            <div className="field"><input id="username" type="text" name="username" ref={usernameRef}/></div>
        </div>
        <div className="section">
            <div className="title">email</div>
            <div className="field"><input id="email" type="text" name="email" ref={emailnameRef}/></div>
        </div>

        <div className="section">
            <div className="title">Pasword</div>
            <div className="field"><input id="password" type="text" name="password" ref={passwordRef}/></div>
        </div>

        <div className="section">
            <div className="title">Photo</div>
            <div className="field"><input id="photo" type="text" name="photo"ref={photoRef} /></div>
        </div>

        <div className="section">
            <div className="button"><input type="submit" value="Registro de usuario"/></div>
            <div className="button"><Link to={"../Users/Users"}/>Iniciar</div>
        </div>
    </form>
      </>
    )
  }

export default Users;
