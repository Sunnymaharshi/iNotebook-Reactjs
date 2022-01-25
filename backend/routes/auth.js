const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
//Route:1 creating user using POST "/api/auth/createuser"
router.post(
  "/createuser",
  [
    body("name", "name must contain atleast 5 characters").isLength({ min: 5 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "password must contain atleast 5 characters").isLength({
      min: 5
    })
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    // check if user with this email already exist
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "user with this email already exist"
        });
      }
      const salt = await bcrypt.genSalt(10);
      const secure = await bcrypt.hash(req.body.password, salt);
      // creating new user
      user = await User.create({
        name: req.body.name,
        password: secure,
        email: req.body.email
      });
      data = {
        user: {
          id: user.id
        }
      };
      const JWT_SECRET = "shhhh";
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({
        success,
        authToken
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error occured");
    }
  }
);

module.exports = router;

//Route:2 Authenticate the user using POST "/api/auth/login"

router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success, error: "incorrect email" });
      }
      const correctPassword = await bcrypt.compare(password, user.password);
      if (!correctPassword) {
        return res.status(400).json({ success, error: "incorrect password" });
      }
      const data = {
        user: {
          id: user.id
        }
      };
      const JWT_SECRET = "shhhh";
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({
        success,
        authToken
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error occured");
    }
  }
);

// Route:3 get user details using : POST:/api/auth/getuser login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error occured");
  }
});
