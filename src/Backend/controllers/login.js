const express = require('express');
const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt')
require('dotenv').config();
var path = require('path');
const cors = require("cors");
const jwt = require('jsonwebtoken')


process.env.JWT_SECRET
/* console.log(process.env.URL_STRING) */


const data_users = require('../models/User-schema')
//solicitamos la ubicacion de las variables dentro de dev
require('dotenv').config()

//utilizamos la variable que necesitamos en env
//const port = process.env.PORT || 5000;

const app = express();
app.use(cors())
//app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(express.static(path.join(__dirname,'/../','/../', 'Pages/Login')));

app.post('/registro',(req,res)=>{
    //traemos los input del body del html
    const {username,email,password,photo} = req.body;
    //traemos los datos del squema para usarlos
    const dataUsers = new data_users({username,email,password,photo})

    dataUsers.save(err=>{
        if(err){
            res.status(500).json({'msg':'ERROR AL REGISTRAR AL USUSARIO'})
            console.log(err)
        }else{
            res.status(200).json({'msg':'USUARIO REGISTRADO'})
        }
    })
 
}) 


app.post('/login',(req,res)=>{
    //traemos los input del body del html
    const {email,password} = req.body;
   const loginUser = data_users.findOne({email},(err,user)=>{
        if(err){
            res.status(500).json({'msg':'ERROR AL AUTENTICAR AL USUARIO'})

        }else if(!user){
            res.status(400).json({'msg':'EL USUARIO NO EXISTE'}) 
        }else{
            user.inCorrectpasswordCreada(password,(err,result)=>{
                if(err){
                    res.status(500).json({"msg":"ERROR AL AUTENTICAR"})
                }else if(result){
                    res.status(200).json(user)
                }else{
                    res.status(500).json({"msg":'EL USUARIO Y/O CONTRAÑA INCORRECTA'})   
                }
            })
        }
    })
})

app.post('/home',(req,res)=>{
    //traemos los input del body del html
    const {task,state,date,uid} = req.body;
    //traemos los datos del squema para usarlos
    const find  = data_users.findOneAndUpdate({_id: uid},{
        $push:{tasks: {task,state,date}}
    }).then(function (err) {
        console.log("err: ", err)

      })
    console.log('aca esta el find ' + find)
    res.status(200).json({'msg':'dato guardado'})
}) 








app.get('/auth',(req,res)=>{
    const {email, password} = req.body;

    //consultar db y validar que existen email y password
    //estamos incriptando los datos del user(email)
    const user = {email: email};
    //traemos la funcion generateAccessToken que crea una firma al token y user es para sumarlo a esa firma encriptado
    const accessToken = generateAccessToken(user)

    res.header('authorization', accessToken).json({
        message: 'Usuario autenticado',
        token:accessToken
    })
})

function generateAccessToken(user){
    return jwt.sign(user,process.env.JWT_SECRET)

}


function validateToken(req,res,next){
    const accessToken = req.headers['authorization']
    if(!accessToken) res.status(403).json({msg:'access denied'});

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            res.send('Access denied token incorrect')
        }else{
            console.log(req.user + 'aqui validacion')
            res.status(200).json({msg:'Exito'})
            next()
        }
    })
}


  module.exports = app;