import { getToken, isAuth } from "../util";
const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Handle POST request on /api/users/signin
router.post("/signin", async (req, res) => {
  // Find user based on email and password from req
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  // If email password correct
  if (signinUser) {
    // Send back data of user
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      phone: signinUser.phone,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
      // ^ getToken (from util.js) generates new token
    });
  } else {
    res.status(401).send({ msg: "Invalid Email or Password" });
  }
});

// Handle POST request on /api/users/register
router.post("/register", async (req, res) => {
  // Create a user based on data from req
  const user = User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  });
  try {
    // Save user
    const newSavedUser = await user.save();
    // Send back data
    res.send({
      _id: newSavedUser.id,
      name: newSavedUser.name,
      email: newSavedUser.email,
      phone: newSavedUser.phone,
      isAdmin: newSavedUser.isAdmin,
      token: getToken(newSavedUser),
      // ^ getToken (from util.js) generates new token
    });
  } catch (error) {
    res.json({ message: error });
  }
});

// Handle PUT request on /api/users/idHere, requires authenticatoni
router.put("/:id", isAuth, async (req, res) => {
  const userId = req.params.id;
  // Find user by the id
  const user = await User.findById(userId);
  // User exists:
  if (user) {
    // Update name/email/phone/password || leave it as what it was
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.password = req.body.password || user.password;
    // Save user
    const updatedUser = await user.save();
    // Send updated info
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
      // ^ getToken (from util.js) generates new token
    });
  } else {
    res.status(404).send({ msg: "User Not Found" });
  }
});

// Handle GET request on /api/users/. Returns all users
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    res.json({ msg: error });
  }
});

// Handle GET request on /api/users/createadmin
router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "Mark",
      email: "markliu202@gmail.com",
      phone: "6479945422",
      password: "1234",
      isAdmin: true,
    });
    // Save user
    const newUser = await user.save();
    // Send back user
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

export default router;
