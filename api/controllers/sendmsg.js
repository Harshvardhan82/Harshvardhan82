const axios = require("axios");
const mongoose = require("mongoose");
const date = require("date-and-time");
const Channel = mongoose.model("Channel");
const { validatesendMsg } = require("../validators/msgvalidator");
const Chat = mongoose.model("Chat");
const { verifyToken } = require("../tokens/tokens");
const sendmsg = async (req, res) => {
  if (validatesendMsg(req, res)) {
    if (verifyToken(req, res)) {
      const chan = await Channel.findOne({ _id: req.body.Channel_id });

      for (let i = 0; i < req.body.phno.length; i++) {
        try {
          const config = {
            method: "post",
            url: `https://api.maytapi.com/api/${chan.Product_id}/${chan.Phone_id}/sendMessage`,
            headers: {
              "x-maytapi-key": chan.Token,
              "Content-Type": "application/json",
            },
            data: {
              to_number: req.body.phno[i],
              type: "text",
              preview_url: true,
              skip_filter: true,
              message: req.body.message,
            },
            json: true,
          };
          const response = await axios(config);
          const now = new Date();
          date.format(now, "ddd, DD/MM/YYYY HH:mm:ss");
          try {
            const newmsg = {
              channel_id: req.body.Channel_id,
              phno: req.body.phno[i],
              Mark: "Sent",
              Date_Time: now,
              message: req.body.message,
            };
            Chat.create(newmsg);
          } catch (error) {
            console.log("error =>", error);
          }
        } catch (err) {
          res.status(400).json({ success: false });
          console.log("error==>   ", err);
        }
      }
      res
        .status(200)
        .json({ success: true, data: { message: "Messages Sent !" } });
    }
  }
};
module.exports = { sendmsg };
