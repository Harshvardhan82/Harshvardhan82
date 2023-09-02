const mongoose = require("mongoose");
// const date = require("date-and-time");
const Channel = mongoose.model("Channel");
const { verifyToken } = require("../tokens/tokens");
const Chat = mongoose.model("Chat");
const { validateviewMsg } = require("../validators/msgvalidator");

const viewChat = async (req, res) => {
  if (validateviewMsg(req, res)) {
    if (verifyToken(req, res)) {
      const chan = await Channel.findOne({ _id: req.body.Channel_id });
      if (!chan) {
        res.send("Channel Doesn't Exist");
      } else {
        const chat = await Chat.find({
          channel_id: req.body.Channel_id,
          phno: req.body.Ph_no,
        });
        if (chat) res.status(200).json(chat);
        else res.send("no messages from Phone No. : ", req.body.Ph_no);
      }
    }
  }
};
module.exports = { viewChat };
