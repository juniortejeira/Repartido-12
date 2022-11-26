const router = require("express").Router();

router.use("/registro", require("./rutRegistro"));
router.use("/login", require("./rutLogin"));

module.exports = router;
