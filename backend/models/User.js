const mongoose = require("mongoose");

// Define a user schema, it describes how a user will be saved in the mongodb database
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

// When you call mongoose.model() on a schema, Mongoose compiles a model for you.
// The .model() function makes a copy of schema. The first argument is the singular name of the collection your model is for.
// const userModel = mongoose.model("User", userSchema);
module.exports = mongoose.model("Users", userSchema);
