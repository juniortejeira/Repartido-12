const router = require("express").Router();
const regControllers = require("../controllers");

router.post("/", regControllers.app);


module.exports = router;