const mongoose = require("mongoose");

const Contact = new mongoose.Schema({
  id: String,
  Name: String,
  Phone_number: String,
  Created_at: String,
  Channel_id: String,
  //   User_id: String,
});
module.exports = mongoose.model("Contact", Contact, "Contacts");
