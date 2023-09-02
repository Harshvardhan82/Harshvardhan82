const mongoose = require("mongoose");

const channel = new mongoose.Schema({
  Name: String,
  Product_id: String,
  Token: String,
  Phone_id: Number,
  User_id: String,
});
module.exports = mongoose.model("Channel", channel, "Channels");
