const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    unique: true,
  },
  name: String,
  pass: String,
});
module.exports = mongoose.model("User", userSchema);
