const axios = require("axios");
const mongoose = require("mongoose");
const Channel = mongoose.model("Channel");
const { verifyToken } = require("../tokens/tokens");

const CreateGroup = async (req, res) => {
  if (verifyToken(req, res)) {
    try {
      const chan = await Channel.findOne({ _id: req.body.Channel_id });
      const config = {
        method: "post",
        url: `https://api.maytapi.com/api/${chan.Product_id}/${chan.Phone_id}/createGroup`,
        headers: {
          "x-maytapi-key": chan.Token,
          "Content-Type": "application/json",
        },
        data: {
          name: req.body.title,
          numbers: req.body.members,
        },
        json: true,
      };
      const response = await axios(config);
    } catch (err) {
      res.status(400).json({ success: false });
      console.log("error==>   ", err);
    }
    res.status(200).json({ success: true, data: { message: "Group Created" } });
  }
};
module.exports = { CreateGroup };
