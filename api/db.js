const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/Project1")
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log("Error while connecting to db /n", err);
  });
require("./models/channels");
require("./models/user");
require("./models/webhookmod");
require("./models/msg");
require("./models/Contacts");
