// import express from "express";
// import User from "../models/userModel";
import { getToken, isAuth } from "../util";
const express = require("express");
const User = require("../models/User");

// get access to Router from express
const router = express.Router();

// Handle POST request on /api/users/signin
router.post("/signin", async (req, res) => {
  // Find user based on email and password from req
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
  const user = User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  });
  try {
    // save user
    const newSavedUser = await user.save();
    // Send back data
    res.send({
      _id: newSavedUser.id,
      name: newSavedUser.name,
      email: newSavedUser.email,
      phone: newSavedUser.phone,
      isAdmin: newSavedUser.isAdmin,
      token: getToken(newSavedUser),
      // ^ Also need to send back a token, use getToken function from util.js. Is an identifier which i can recognize if the next request is authenticated or not
    });
  } catch (error) {
    res.json({ message: error });
  }
});

// Handle PUT request on /api/users/idHere, requires authenticatoni
router.put("/:id", isAuth, async (req, res) => {
  // set userId to the id from request
  const userId = req.params.id;
  // Find user by the id, set the user to variable user
  const user = await User.findById(userId);
  // If user exists,
  if (user) {
    // Update name/email/phone/password if they are in the req.body, else, just set to what it already was
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.password = req.body.password || user.password;
    // save user
    const updatedUser = await user.save();
    // res send updated info
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
      // ^ Also need to send back a token, which is an identifier which i can recognize if the next request is authenticated or not
    });
  } else {
    res.status(404).send({ msg: "User Not Found" });
  }
});

// Handle GET request on /api/users/ < Returns all users
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
    // Save newUser
    const newUser = await user.save();
    // Send back new user
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

export default router;
