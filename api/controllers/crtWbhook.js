const mongoose = require("mongoose");
const wbhk = mongoose.model("wbhks");
const Channel = mongoose.model("Channel");
const date = require("date-and-time");
const Chat = mongoose.model("Chat");

const CreateWebhook = async (req, res) => {
  var DandT = new Date(req.body.timestamp * 1000);
  date.format(DandT, "ddd, DD/MM/YYYY HH:mm:ss");
  try {
    const chan = await Channel.findOne({
      Product_id: req.body.productId,
      Phone_id: req.body.phoneId,
    });
    const newmsg = {
      channel_id: chan._id,
      phno: req.body.user.phone,
      Mark: "Received",
      Date_Time: DandT,
      message: req.body.message.text,
    };
    Chat.create(newmsg);
  } catch (error) {
    console.log("error =>", error);
  }
  try {
    const newhook = {
      product_id: req.body.product_id,
      phone_id: req.body.phone_id,
      message: req.body.message,
      user: req.body.user,
      conversation: req.body.conversation,
      conversation_name: req.body.conversation_name,
      receiver: req.body.receiver,
      timestamp: req.body.timestamp,
      type: req.body.type,
      reply: req.body.reply,
      productId: req.body.productId,
      phoneId: req.body.phoneId,
    };

    wbhk.create(newhook).then((createdData) => {
      res.send("message received");
    });
  } catch (error) {
    console.log("error =>", error);
  }
};

module.exports = { CreateWebhook };
