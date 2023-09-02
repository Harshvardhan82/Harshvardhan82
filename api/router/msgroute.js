const express = require("express");
const router = express.Router();

const Chatcontrol = require("../controllers/chat");
const sendmsg = require("../controllers/sendmsg");
const wbhook = require("../controllers/crtWbhook");

router.post("/sendmsg/", sendmsg.sendmsg);
router.post("/maytapi/recvMsg/", wbhook.CreateWebhook);
router.get("/ShowChat/", Chatcontrol.viewChat);
module.exports = router;
