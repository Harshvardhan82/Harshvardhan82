const mongoose = require("mongoose");
const Channel = mongoose.model("Channel");
const { verifyToken } = require("../tokens/tokens");

const createChannel = async (req, res) => {
  if (verifyToken(req, res)) {
    const data = await Channel.findOne({
      Phone_id: req.body.PhoneId,
      Product_id: req.body.ProductId,
    });
    console.log(data);
    if (!data) {
      try {
        const newchannel = {
          Name: req.body.Name,
          Product_id: req.body.ProductId,
          Token: req.body.Token,
          Phone_id: req.body.PhoneId,
          User_id: req.body.UserId,
        };

        Channel.create(newchannel).then((createdData) => {
          res.send("Channel Created");
        });
      } catch (error) {
        console.log("error =>", error);
      }
    } else {
      res.send("Channel already exists");
    }
  }
};

module.exports = { createChannel };
