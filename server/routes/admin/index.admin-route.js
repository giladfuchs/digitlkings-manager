const router = require("express").Router();

router.use("/target", require("../target/target-route"));

module.exports = router;
