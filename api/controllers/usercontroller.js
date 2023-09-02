const mongoose = require("mongoose");
const User = mongoose.model("User");
const tkn = require("../tokens/tokens");
const { validateUser } = require("../validators/uservalidators");
// For User Registration
const UserSignup = (req, res) => {
  try {
    if (validateUser(req, res)) {
      const { UserId, UserName, Password } = req.body;
      const newUserObject = {
        user_id: UserId,
        name: UserName,
        pass: Password,
      };

      User.create(newUserObject).then((createdData) => {
        res.send("User Added");
      });
    }
  } catch (error) {
    console.log("error =>", error);
  }
};

// for user Login and Token Generation
const UserLogin = async (req, res) => {
  const user = await User.findOne({ user_id: req.body.UserId });
  console.log(user);
  if (!user) {
    res.send("USER NOT FOUND");
  } else {
    if (req.body.Password == user.pass) {
      tkn.createToken(user, res);
    } else {
      console.log(req.body.Password, "\n", user.pass);
      res.send("INCORRECT PASSWORD");
    }
  }
};

module.exports = { UserSignup, UserLogin };
