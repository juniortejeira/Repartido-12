const app = require("./controllers/login");
const mongoose = require("mongoose");
require("dotenv").config();
const port = 5000;

mongoose
  .connect('mongodb://localhost:27017/TODO')
  .then(() => {
    app.listen(port, () => console.log("Server running"));
  })
  .catch(console.log);
