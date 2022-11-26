const router = require("express").Router();
//const loginControllers = require("../controllers/login");
const loginControllers = require("../controllers");

router.post("/", loginControllers.app);
module.exports = router;
