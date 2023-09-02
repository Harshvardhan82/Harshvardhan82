const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema({
  channel_id: String,
  phno: String,
  Mark: String,
  Date_Time: String,
  message: String,
});
module.exports = mongoose.model("Chat", msgSchema, "Chats");
