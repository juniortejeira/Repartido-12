const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors())
//const errorController = require("./controllers/error-controller");
//const HttpError = require("./models/http-error");
//const router = require("./controllers/index")
//se usa para conectar bases de datos con otros lenguajes

app.use(express.json(), express.urlencoded({ extended: false }));
app.use((req,res,next)=>{
console.log('es un middiewere')
next()
})

app.use("/", require("./routes"));
/* 
app.all("*", (req, res, next) => {
  return next(
    new HttpError(
      `La ruta ${req.originalUrl} no pertenece a este servidor`,
      404
    )
  );
}); */