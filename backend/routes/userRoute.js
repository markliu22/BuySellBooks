import express from "express";
import User from "../models/userModel";
import { getToken } from "../util";

// get access to Router from express
const router = express.Router();

// Handle POST request on /api/users/signin
router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  // If signinUser exists, that means email and password were correct
  if (signinUser) {
    // send back the data of this user, dont send the password back bc not secure
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      phone: signinUser.phone,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
      // ^ Also need to send back a token, use getToken function from util.js. Is an identifier which i can recognize if the next request is authenticated or not
    });
  } else {
    res.status(401).send({ msg: "Invalid Email or Password" });
  }
});

// Handle POST request on /api/users/register
router.post("/register", async (req, res) => {
  // Create a user based on data from req
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  });
  // Save newUser
  const newUser = await user.save();
  // if the newUser exist, send back the data about the user & token
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
    res.status(401).send({ msg: "Invalid User Data." });
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
    // Save newUser
    const newUser = await user.save();
    // Send back new user
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

export default router;
