const express = require("express");
const bcrypt = require("bcryptjs");
require("../db/conn.js");
const User = require("../model/user.js");
const auth = require("../middleware/auth.js");
const router = express.Router();

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (isMatch) {
        const token = await userLogin.generateAuthToken();

        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });

        res.status(200).send({ Token: token, userId: userLogin._id });
      } else {
        res.status(400).send({ status: "Failed", message: "Invalid Password" });
      }
    } else {
      res.status(400).send("Invalid Email");
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    res.clearCookie("jwtoken");
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send({ msg: "Logout Succesfully!!!", user: req.user });
  } catch (error) {
    res.status(501).send({ msg: "Error in Logout", error: error.message });
  }
});

module.exports = router;
