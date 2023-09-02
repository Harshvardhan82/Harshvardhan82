const express = require("express");
const app = express();
require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());

const port = 4000;

app.listen(port, () => {
  console.log("server is listening");
});

const userroute = require("./router/userrouter");
const msgroute = require("./router/msgroute");
const ContactRoute = require("./router/contactroute");
app.use("/api/user", userroute);
app.use("/api/message", msgroute);
app.use("/api/Contacts", ContactRoute);
