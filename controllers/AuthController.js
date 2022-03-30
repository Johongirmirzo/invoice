const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { username, email, password, c_password } = req.body;
  const errors = [];
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      errors.push({ error: "Email is already taken" });
    }
    if (user?.username === username) {
      errors.push({ error: "Username already exists" });
    }

    if (password !== c_password) {
      errors.push({ error: "Password did not match" });
    }
    if (errors.length > 0) {
      return res.json(errors);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      req.user = user;
      await User.create({
        username: username,
        email: email,
        password: hashedPassword,
      });
      return res.json({ success: true });
    }
  } catch (err) {
    next(err);
  }
};
const login = async (req, res, next) => {
  const { email, password, remember } = req.body;
  const errors = [];
  console.log(req.body);
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      errors.push({ error: "Email does not exist" });
    }
    if (user) {
      if (!(await bcrypt.compare(password, user.password))) {
        errors.push({ error: "Password does not match" });
      }
    }
    if (errors.length > 0) {
      return res.json(errors);
    } else {
      if (remember) {
        const token = jwt.sign(
          {
            userId: user._id,
          },
          "secret key"
        );
        res.json({
          success: true,
          user: {
            email: user.email,
            password: password,
            username: user.username,
          },
          token: token,
        });
      } else {
        const token = jwt.sign(
          {
            userId: user._id,
          },
          "secret key"
        );
        res.json({
          success: true,
          user: { id: user._id, username: user.username },
          token: token,
        });
      }
    }
  } catch (err) {
    next(err);
  }
};
const resetPassword = async (req, res, next) => {
  const { email, password, c_password } = req.body;
  const errors = [];
  console.log(req.body);
  try {
    const user = await User.findOne({ email: email });
    console.log(user, email);
    if (!user) {
      errors.push({ error: "Email does not exist" });
    }
    if (password !== c_password) {
      errors.push({ error: "Password does not match" });
    }
    if (errors.length > 0) {
      return res.json(errors);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.updateOne(
        { _id: user._id },
        { $set: { password: hashedPassword } }
      );
      return res.json({ success: true });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  resetPassword,
};
