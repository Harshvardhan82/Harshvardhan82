const express = require("express");
const router = express.Router();

const usercontroller = require("../controllers/usercontroller");
const channelcontroller = require("../controllers/channelcontroller");

router.post("/UserSignup/", usercontroller.UserSignup);
router.post("/UserLogin/", usercontroller.UserLogin);
router.post("/newChannel/", channelcontroller.createChannel);
module.exports = router;
