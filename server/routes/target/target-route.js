const router = require("express").Router();

const targetController = require("../../controller/target");
const isAuth = require("../../middleware/is-auth");

router.post("/add", targetController.readTargetFromApiAndAddForUser);
router.post("/", targetController.addTarget);

router.get("/", targetController.getAllProfile);

module.exports = router;
