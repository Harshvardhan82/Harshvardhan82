const jwt = require("jsonwebtoken");
const user = require("../models/user");
require("dotenv").config();
// var token;
const createToken = (User, res) => {
  const token = jwt.sign({ User }, process.env.APP_SECRET, { expiresIn: "3d" });
  res.send(token);
};

const verifyToken = (req, res) => {
  const tkn = req.headers.authorization;
  const intoken = tkn.split(" ")[1];
  if (jwt.verify(intoken, process.env.APP_SECRET)) {
    return true;
  } else {
    res.status(401).send("Invalid Token");
  }
  return false;
};
module.exports = { createToken, verifyToken };
