const router = require("express").Router();
const regControllers = require("../controllers");

router.post("/login", regControllers.app);


module.exports = router;