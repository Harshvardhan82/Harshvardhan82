const mongoose = require("mongoose");

var webhookschema = new mongoose.Schema({
  product_id: String,
  phone_id: Number,
  message: Object,
  user: Object,
  conversation: String,
  conversation_name: String,
  receiver: String,
  timestamp: Number,
  type: String,
  reply: String,
  productId: String,
  phoneId: Number,
});
module.exports = mongoose.model("wbhks", webhookschema, "webhooks");
