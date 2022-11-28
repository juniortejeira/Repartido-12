import React from 'react';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

function Users() {

const usernameRef = useRef();
const emailnameRef = useRef();
const passwordRef = useRef();
const photoRef = useRef();

/* useEffect(()=>{
  async function encontrar(){
    //estamos trayendo la base de datos de usuarios
    const response = await fetch("http://localhost:5000");
    //le decimos que la response sera un metodo json  
    const data = response.json()
    console.log(data)
  };
  encontrar().catch(console.log);
},[]) */

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

      <div className='background-R'>
        <div className='shape-R'></div>
        <div className='shape-R'></div>
      </div>

      <form className='form-Register' onSubmit={onSubmit}>
        <h3>Registrarse</h3>
        <div className="section">
        <label className='Label'>Nombre</label>
          <div className="field"><input className='Input' id="username" type="text" name="username" ref={usernameRef} /></div>
        </div>
        <div className="section">
        <label className='Label'>Email</label>
          <div className="field"><input className='Input' id="email" type="email" name="email" ref={emailnameRef} /></div>
        </div>

        <div className="section">
        <label className='Label'>Contraseña</label>
          <div className="field"><input className='Input' id="password" type="password" name="password" ref={passwordRef} /></div>
        </div>

        <div className="section">
        <label className='Label'>Foto</label>
          <div className='File' id='Filed1'><input className='Input' id="photo" type="file" name="file-foto" ref={photoRef} /></div>
        </div>

        <div className="section">
          <input className='Boton-register' type="submit" value="Registro de usuario" />
          <br></br>
          <br></br>
          <br></br>
          <Link className='Boton-Iniciar' to={"../Users/Users"}>Iniciar</Link>
        </div>
      </form>
    </>
  )
}

export default Users;
