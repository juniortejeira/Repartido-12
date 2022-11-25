const express = require('express');
const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt')
require('dotenv').config();
var path = require('path');
const jwt = require('jsonwebtoken')

process.env.JWT_SECRET
/* console.log(process.env.URL_STRING) */

const url = mongoose.connect('mongodb://localhost/seguridad');


const data_users = require('./module_Schema/module')
//solicitamos la ubicacion de las variables dentro de dev
require('dotenv').config()

//utilizamos la variable que necesitamos en env
const port = process.env.PORT || 5000;

const app = express();
//app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/public'))


app.post('/registro',(req,res)=>{
    //traemos los input del body del html
    const {username,password} = req.body;
    //traemos los datos del squema para usarlos
    const dataUsers = new data_users({username,password})

    dataUsers.save(err=>{
        if(err){
            res.status(500).send('ERROR AL REGISTRAR AL USUSARIO')
            console.log(err)
        }else{
            res.status(200).send('USUARIO REGISTRADO')
        }
    })

   /*  res.sendFile((__dirname+'/public/home.html' )) */
})

app.post('/',(req,res)=>{
    //traemos los input del body del html
    const {username,password} = req.body;
   const loginUser = data_users.findOne({username},(err,user)=>{
        if(err){
            res.status(500).send('ERROR AL AUTENTICAR AL USUARIO')
        }else if(!user){
            res.status(500).send('EL USUARIO NO EXISTE') 
        }else{
            user.inCorrectpasswordCreada(password,(err,result)=>{
                if(err){
                    res.status(500).send('ERROR AL AUTENTICAR')
                }else if(result){
                    res.redirect('/auth')
                    //res.sendFile((__dirname + '/next'))
                    //res.status(200).send('USUARIO AUTENTIFICADO CORRECTAMENTE')
                }else{
                    res.status(500).send('EL USUARIO Y/O CONTRAÑA INCORRECTA')   
                }
            })
        }
    })
    //console.log(loginUser)
/*     res.sendFile((__dirname+'/public/home.html' )) */
})

app.get('/auth',(req,res)=>{
    const {username, password} = req.body;

    //consultar db y validar que existen username y password
    const user = {username: username};
    //estamos incriptando los datos del user(username)
    const accessToken = generateAccessToken(user)

    res.header('authorization', accessToken).json({
        message: 'Usuario autenticado',
        token:accessToken
    })
})

function generateAccessToken(user){
    //hacemos la firma del token
    //user: informacion a encripar
    //JWT_SECRET palabra secreta
    return jwt.sign(user,process.env.JWT_SECRET/* ,{expiresIn: '5m'} */)

}

function validateToken(req,res,next){
    const accessToken = req.header['authorization'] || req.query.accessToken;
    if(!accessToken) res.send('access denied');

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            res.send('Access denied token incorrect')
        }else{
            //req.user = user;
            //accessToken
            console.log(req.user + 'aqui validacion')
            next()
        }
    })
}







app.get('/prueba',async(req,res)=>{
    const prueba = await data_users.find()
    console.log(prueba);
    res.json(prueba)
})

app.get('/',(req,res)=>{
    /* res.sendFile((__dirname+'/../Frontend/public/home.html' )) */
    res.sendFile(path.join(__dirname, '/../', 'Frontend/public/home.html' ))
})

app.get('/registro',(req,res)=>{
    res.sendFile(path.join(__dirname, '/../', 'Frontend/public/registro.html' ))
})

app.get('/next',validateToken,(req,res)=>{
    //res.sendFile((__dirname+'/public/NextOfLogin.html' ))
    res.sendFile(path.join(__dirname, '/../', 'Frontend/public/NextOfLogin.html' ))
})

app.get('/login',(req,res)=>{
    //res.sendFile((__dirname+'/public/login.html' ))
    res.sendFile(path.join(__dirname, '/../', 'Frontend/public/login.html' ))

})



/*
const token = jwt.sing((
    //firma,
id : module._id),
//secreto
process.env.JWT_SECRET
)


*/



/* app.post('/registro',async(req,res)=>{
    //datos requeridos en el cuerpo
    const usuario = req.body.usuario;
    const contraseña = req.body.contraseña;
    
    //debe ser async                      (dato a incriptar, cantidad de incriptacion)
    let contraseña_Hash = await bcrypt.hash(contraseña,8)
    let createUsers = await data_users.create({password:contraseña_Hash,user:usuario})
    console.log(createUsers + 'creado correctamente')
 
    res.sendFile((__dirname+'/public/Registro.html' ))
    
})
 */

app.listen(port, async () => {
    console.log("server start on port ", port);
  });