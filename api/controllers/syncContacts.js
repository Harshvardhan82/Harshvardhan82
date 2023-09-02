const axios = require("axios");
const mongoose = require("mongoose");
const Channel = mongoose.model("Channel");
const Contact = mongoose.model("Contact");
// const { validatesendMsg } = require("../validators/msgvalidator");
const { verifyToken } = require("../tokens/tokens");

const allContacts = async (req, res) => {
  //   if (validatesendMsg(req, res)) {
  if (verifyToken(req, res)) {
    const chan = await Channel.findOne({ _id: req.body.Channel_id });

    try {
      const config = {
        method: "get",
        url: `https://api.maytapi.com/api/${chan.Product_id}/${chan.Phone_id}/contacts`,
        headers: {
          "x-maytapi-key": chan.Token,
          "Content-Type": "application/json",
        },
        // json: true,
      };
      const response = await axios(config);
      console.log(response.data.data);
      const data = response.data.data;
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === "group") {
          continue;
        } else {
          try {
            const number = data[i].id.split("@")[0];
            const newContact = {
              id: data[i].id,
              Name: data[i].name,
              Phone_number: number,
              Created_at: new Date(),
              Channel_id: req.body.Channel_id,
            };
            Contact.create(newContact);
          } catch (error) {
            console.log("error =>", error);
          }
        }
      }
    } catch (err) {
      res.status(400).json({ success: false });
      console.log("error==>   ", err);
    }
    res
      .status(200)
      .json({ success: true, data: { message: "Contacts Sync Successful" } });
  }
  //   }
};
module.exports = { allContacts };
