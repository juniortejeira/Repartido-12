const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors())


app.use(express.json(), express.urlencoded({ extended: false }));
app.use((req,res,next)=>{
console.log('es un middiewere')
next()
})

app.use("/", require("./routes"));
